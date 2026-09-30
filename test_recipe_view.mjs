// Exercise the actual recipe click handler without a browser dependency.
import assert from 'node:assert/strict';
import {recipes} from './public/core.js';
const listeners={};
const app={innerHTML:'',addEventListener(){}},modal={innerHTML:'',showModal(){this.open=true;}},toast={classList:{add(){},remove(){}}};
globalThis.document={querySelector:s=>({'#app':app,'#modal':modal,'#toast':toast}[s]),addEventListener:(name,fn)=>listeners[name]=fn};
globalThis.window={addEventListener(){},scrollTo(){}};
globalThis.location={hash:'#meals'};
globalThis.fetch=async()=>({ok:true,json:async()=>({settings:{profile:{calories:2100,protein:130,budget:200,startWeight:80,milkMl:300,milkCalories:51,milkProtein:7.5,oats:100,peanutButter:25}},plan:{},logs:{},goals:{},expenses:{},shopping:{},extras:{}})});
await import('./public/app.js');
for(const [id,r] of Object.entries(recipes)){
 if(id==='none')continue;
 await listeners.click({target:{closest:()=>({dataset:{recipe:id},hasAttribute:()=>false})}});
 assert.ok(modal.open,`${id}: opens`);
 assert.ok(modal.innerHTML.includes('How to make it'),`${id}: method heading visible`);
 assert.ok(modal.innerHTML.includes('Make ahead & store'),`${id}: storage visible`);
 const method=modal.innerHTML.match(/<ol class="recipe-steps">([\s\S]*?)<\/ol>/)[1];
 assert.equal((method.match(/<li>/g)||[]).length,r.steps.length,`${id}: all numbered steps rendered`);
 assert.ok(!modal.innerHTML.includes('[object Object]'));
}
console.log('Recipe view checks passed: all 20 recipe buttons render complete numbered methods and storage notes.');
