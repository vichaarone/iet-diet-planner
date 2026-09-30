"""IET: dependency-free private LAN app. Run python3 server.py."""
import hashlib
import hmac
import json
import math
import os
from pathlib import Path
import re
import secrets
import sqlite3
import time
from datetime import date
from http.cookies import SimpleCookie
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlsplit

ROOT = Path(__file__).parent
DATA = Path(os.environ.get('IET_DATA', ROOT / '.data'))
DATA.mkdir(exist_ok=True, mode=0o700)
DATA.chmod(0o700)
KEY_FILE = DATA / 'access-code.txt'
if not KEY_FILE.exists():
    KEY_FILE.write_text(secrets.token_urlsafe(12))
    KEY_FILE.chmod(0o600)
KEY = KEY_FILE.read_text().strip()
DB = DATA / 'iet.sqlite3'
with sqlite3.connect(DB) as conn:
    conn.execute('CREATE TABLE IF NOT EXISTS records (kind TEXT, id TEXT, data TEXT, PRIMARY KEY(kind,id))')
    conn.execute('PRAGMA journal_mode=WAL')
DB.chmod(0o600)

DEFAULTS = dict(calories=2100, protein=130, budget=200, startWeight=80, milkMl=None, milkCalories=51, milkProtein=7.5, oats=100, peanutButter=25)

def number(v, lo, hi):
    return type(v) in (int, float) and math.isfinite(v) and lo <= v <= hi

def valid_date(v):
    try:
        return isinstance(v, str) and date.fromisoformat(v).isoformat() == v
    except ValueError:
        return False

def validate(kind, ident, value):
    if not isinstance(value, dict) or not re.fullmatch(r'[a-zA-Z0-9_.:-]{1,100}', ident):
        return False
    if kind == 'settings':
        ranges = dict(calories=(1200,5000),protein=(40,250),budget=(20,2000),startWeight=(30,300),milkMl=(0,1500),milkCalories=(0,200),milkProtein=(0,30),oats=(0,250),peanutButter=(0,100))
        return ident == 'profile' and set(value) == set(ranges) and all((k == 'milkMl' and v is None) or number(v,*ranges[k]) for k,v in value.items())
    if kind == 'logs':
        return valid_date(ident) and set(value) == {'weight','waist','workout','prep','protein','notes'} and all(value[k] is None or number(value[k], *bounds) for k,bounds in [('weight',(30,300)),('waist',(30,250)),('protein',(0,500))]) and all(type(value[k]) is bool for k in ['workout','prep']) and isinstance(value['notes'],str) and len(value['notes'])<=1000
    if kind == 'goals':
        return set(value)=={'title','period','start','target','metric','done'} and isinstance(value['title'],str) and 0<len(value['title'].strip())<=120 and value['period'] in ('week','month') and valid_date(value['start']) and number(value['target'],1,1000) and value['metric'] in ('workout','prep','protein','manual') and number(value['done'],0,1000)
    if kind == 'plan':
        return valid_date(ident[:10]) and ident[10:] in (':breakfast',':lunch',':dinner',':snack') and set(value)=={'recipe'} and value['recipe'] in ('shake', 'cocoa', 'berry', 'eggs', 'chicken', 'saag', 'tofu', 'soya', 'khichdi', 'chana', 'snack', 'masala_oats', 'chilla', 'tofu_toast', 'egg_rice', 'chicken_wrap', 'rajma', 'soya_pulao', 'peanut_chaat', 'egg_chaat', 'none')
    if kind == 'shopping':
        return valid_date(ident[:10]) and set(value)=={'checked'} and type(value['checked']) is bool
    if kind == 'extras':
        return set(value)=={'week','name','quantity','checked'} and valid_date(value['week']) and all(isinstance(value[k],str) and 0<len(value[k].strip())<=100 for k in ('name','quantity')) and type(value['checked']) is bool
    if kind == 'expenses':
        return set(value)=={'date','amount','store'} and valid_date(value['date']) and number(value['amount'],0.01,2000) and isinstance(value['store'],str) and 0<len(value['store'].strip())<=100
    return False

class Handler(BaseHTTPRequestHandler):
    def send(self, code, data, content_type='application/json', cookie=None):
        body = json.dumps(data).encode() if content_type=='application/json' else data
        self.send_response(code)
        self.send_header('Content-Type',content_type)
        self.send_header('Content-Length',str(len(body)))
        self.send_header('Cache-Control','no-store')
        self.send_header('X-Content-Type-Options','nosniff')
        self.send_header('Referrer-Policy','no-referrer')
        self.send_header('Content-Security-Policy',"default-src 'self'; style-src 'self'; script-src 'self'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'")
        if cookie: self.send_header('Set-Cookie',cookie)
        self.end_headers()
        self.wfile.write(body)

    def authenticated(self):
        try:
            cookies=SimpleCookie(self.headers.get('Cookie',''))
            timestamp, signature=cookies['iet'].value.split('.')
            expected=hmac.new(KEY.encode(), timestamp.encode(), hashlib.sha256).hexdigest()
            return 0 <= time.time()-int(timestamp) < 60*60*24*30 and hmac.compare_digest(signature,expected)
        except (KeyError,ValueError): return False

    def do_GET(self):
        path=urlsplit(self.path).path
        if path=='/api/state':
            if not self.authenticated(): return self.send(401,{'error':'Enter your access code to connect.'})
            state={k:{} for k in ['settings','logs','goals','plan','shopping','expenses','extras']}
            state['settings']['profile']=DEFAULTS
            with sqlite3.connect(DB) as conn:
                for kind,ident,data in conn.execute('SELECT kind,id,data FROM records'):
                    state[kind][ident]=json.loads(data)
            return self.send(200,state)
        files={'/':('index.html','text/html; charset=utf-8'),'/app.js':('app.js','text/javascript'),'/core.js':('core.js','text/javascript'),'/style.css':('style.css','text/css'),'/icon.svg':('icon.svg','image/svg+xml')}
        if path not in files: return self.send(404,{'error':'Not found'})
        name,mime=files[path]
        self.send(200,(ROOT/'public'/name).read_bytes(),mime)

    def do_POST(self):
        origin=self.headers.get('Origin','')
        # Browser writes must originate on this exact host; no cross-origin API access.
        if origin and urlsplit(origin).netloc != self.headers.get('Host'):
            return self.send(403,{'error':'Cross-origin write rejected.'})
        if self.headers.get('Content-Type','').split(';')[0] != 'application/json':
            return self.send(415,{'error':'JSON required.'})
        try:
            length=int(self.headers.get('Content-Length','0'))
            if not 0<length<=16000: return self.send(413,{'error':'Request too large.'})
            body=json.loads(self.rfile.read(length))
            if not isinstance(body,dict): raise ValueError()
        except (ValueError, json.JSONDecodeError): return self.send(400,{'error':'Invalid JSON.'})
        if self.path=='/api/login':
            if not isinstance(body.get('code'),str) or not hmac.compare_digest(body['code'].encode(),KEY.encode()):
                return self.send(401,{'error':'That access code is not correct.'})
            stamp=str(int(time.time()))
            sig=hmac.new(KEY.encode(),stamp.encode(),hashlib.sha256).hexdigest()
            return self.send(200,{'ok':True},cookie=f'iet={stamp}.{sig}; HttpOnly; SameSite=Strict; Path=/; Max-Age=2592000')
        if not self.authenticated(): return self.send(401,{'error':'Please connect again.'})
        if self.path=='/api/logout': return self.send(200,{'ok':True},cookie='iet=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0')
        if self.path!='/api/record': return self.send(404,{'error':'Not found'})
        kind,ident,value=body.get('kind'),body.get('id'),body.get('value')
        if not isinstance(kind,str) or kind not in {'settings','logs','goals','plan','shopping','expenses','extras'} or not isinstance(ident,str): return self.send(400,{'error':'Invalid record.'})
        if value is not None and not validate(kind,ident,value): return self.send(400,{'error':'Check the values and try again.'})
        if value is None and (kind=='settings' or not re.fullmatch(r'[a-zA-Z0-9_.:-]{1,100}',ident)): return self.send(400,{'error':'Invalid deletion.'})
        try:
            with sqlite3.connect(DB, timeout=10) as conn:
                if value is None: conn.execute('DELETE FROM records WHERE kind=? AND id=?',(kind,ident))
                else: conn.execute('INSERT INTO records VALUES (?,?,?) ON CONFLICT(kind,id) DO UPDATE SET data=excluded.data',(kind,ident,json.dumps(value)))
        except sqlite3.Error: return self.send(500,{'error':'Could not save. Please retry; your input has been kept.'})
        self.send(200,{'ok':True})

if __name__=='__main__':
    port=int(os.environ.get('PORT','8765'))
    print(f'IET running at http://localhost:{port}\nAccess code: {KEY}\nFor phone: use this computer’s LAN IP and the same port/code. Keep this process running.',flush=True)
    ThreadingHTTPServer((os.environ.get('HOST','0.0.0.0'),port),Handler).serve_forever()
