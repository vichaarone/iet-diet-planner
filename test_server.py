import http.client
import importlib
import json
import os
from pathlib import Path
import tempfile
import threading
import unittest

class ServerCheck(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tmp=tempfile.TemporaryDirectory()
        os.environ['IET_DATA']=cls.tmp.name
        cls.app=importlib.import_module('server')
        cls.http=cls.app.ThreadingHTTPServer(('127.0.0.1',0),cls.app.Handler)
        cls.thread=threading.Thread(target=cls.http.serve_forever,daemon=True)
        cls.thread.start()
        cls.port=cls.http.server_port
    @classmethod
    def tearDownClass(cls):
        cls.http.shutdown();cls.http.server_close();cls.tmp.cleanup()
    def request(self,path,body=None,cookie='',origin=None):
        conn=http.client.HTTPConnection('127.0.0.1',self.port)
        headers={'Content-Type':'application/json','Cookie':cookie}
        if origin: headers['Origin']=origin
        conn.request('GET' if body is None else 'POST',path,None if body is None else json.dumps(body),headers)
        res=conn.getresponse();data=res.read();out=(res.status,json.loads(data),res.getheader('Set-Cookie'));conn.close();return out
    def test_all_frontend_recipes_can_be_saved(self):
        source=(Path(__file__).parent/'public/core.js').read_text()
        catalog=json.loads(source.split('export const recipes = ',1)[1].split(';\nexport function recipeItems',1)[0])
        cookie=self.request('/api/login',{'code':self.app.KEY})[2]
        for recipe_id, recipe in catalog.items():
            slot=recipe['slot'] if recipe['slot'] in ('breakfast','snack') else 'lunch'
            record={'kind':'plan','id':'2026-10-01:'+slot,'value':{'recipe':recipe_id}}
            self.assertEqual(self.request('/api/record',record,cookie)[0],200,recipe_id)
            self.assertEqual(self.request('/api/state',cookie=cookie)[1]['plan'][record['id']]['recipe'],recipe_id)
            self.request('/api/record',{**record,'value':None},cookie)

    def test_auth_persistence_validation_and_device_sync(self):
        self.assertEqual(self.request('/api/state')[0],401)
        self.assertEqual(self.request('/api/login',{'code':'wrong'})[0],401)
        status,_,cookie=self.request('/api/login',{'code':self.app.KEY})
        self.assertEqual(status,200)
        self.assertEqual(self.request('/api/record',{},cookie,'http://evil.example')[0],403)
        self.assertEqual(self.request('/api/record',{'kind':[],'id':'bad'},cookie)[0],400)
        self.assertEqual(self.request('/api/record',{'kind':'plan','id':'2026-09-30:lunch','value':{'recipe':[]}},cookie)[0],400)
        record={'kind':'logs','id':'2026-09-30','value':{'weight':80,'waist':None,'protein':132,'workout':True,'prep':False,'notes':'test'}}
        self.assertEqual(self.request('/api/record',record,cookie)[0],200)
        cookie2=self.request('/api/login',{'code':self.app.KEY})[2]
        self.assertEqual(self.request('/api/state',cookie=cookie2)[1]['logs']['2026-09-30']['protein'],132)
        bad={**record,'value':{**record['value'],'weight':-20}}
        self.assertEqual(self.request('/api/record',bad,cookie)[0],400)
        bad={**record,'value':{**record['value'],'weight':float('nan')}}
        self.assertEqual(self.request('/api/record',bad,cookie)[0],400)
        self.assertEqual(self.request('/api/state',cookie=cookie)[1]['logs']['2026-09-30']['weight'],80)
        self.assertEqual(self.request('/api/record',{'kind':'expenses','id':'r1','value':{'date':'2026-09-30','amount':12.30,'store':'Lidl'}},cookie2)[0],200)
        data=self.request('/api/state',cookie=cookie)[1]
        self.assertEqual(len(data['logs']),1);self.assertEqual(data['expenses']['r1']['amount'],12.30)
        with self.app.sqlite3.connect(self.app.DB) as db:
            self.assertEqual(db.execute('SELECT count(*) FROM records').fetchone()[0],2)
        self.assertEqual(self.request('/api/record',{**record,'value':None},cookie)[0],200)
        self.assertEqual(self.request('/api/state',cookie=cookie)[1]['logs'],{})
        self.assertEqual(self.request('/api/record',{'kind':'plan','id':'2026-09-30:lunch','value':{'recipe':'unknown'}},cookie)[0],400)

if __name__=='__main__': unittest.main()
