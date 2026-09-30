import assert from 'node:assert/strict';
import {recipes,ingredients,iso,weekStart,addDays,inPeriod,nutrition,groceries,goalProgress,weekAverage} from './public/core.js';
const settings={milkMl:300,milkCalories:51,milkProtein:7.5,oats:100,peanutButter:25,protein:130};
assert.equal(weekStart('2026-10-04'),'2026-09-28');
assert.equal(addDays('2026-12-31',1),'2027-01-01');
assert.equal(inPeriod('2026-10-01','2026-09-01','month'),false);
assert.equal(weekStart('2026-01-01'),'2025-12-29');
const shake=nutrition('shake',settings);
assert.equal(shake.kcal,778);
assert.equal(shake.protein,43.05);
assert.equal(nutrition('shake',{...settings,milkMl:null}).incomplete,true);
assert.equal(nutrition('shake',{...settings,milkMl:0}).incomplete,false);
const state={settings:{profile:settings},plan:{},logs:{'2026-09-28':{weight:80,protein:130,workout:true},'2026-09-29':{weight:79,protein:null,workout:false},'2026-10-05':{weight:78,protein:140,workout:true}}};
const list=groceries(state,'2026-09-28');
assert.equal(list.milk,2100);
assert.equal(list.chicken,900);
state.plan['2026-09-28:lunch']={recipe:'tofu'};
const swapped=groceries(state,'2026-09-28');
assert.equal(swapped.chicken,720);assert.equal(swapped.tofu,750);
assert.equal(goalProgress({metric:'workout',period:'week',start:'2026-09-28'},state),1);
assert.equal(goalProgress({metric:'protein',period:'week',start:'2026-09-28'},state),1);
assert.equal(weekAverage(state.logs,'2026-10-01'),79.5);
assert.equal(weekAverage({},'2026-10-01'),null);
console.log('Core checks passed: shake, groceries, swaps, goals, date boundaries and weight averages.');

assert.equal('milk' in groceries({...state,settings:{profile:{...settings,milkMl:null}}},'2026-09-28'),false);

// Every selectable meal must have a usable recipe and calculable ingredients.
for(const [id,recipe] of Object.entries(recipes)){
 if(id==='none')continue;
 assert.ok(Array.isArray(recipe.steps)&&recipe.steps.length>=4,`${id}: full instructions`);
 assert.ok(recipe.equipment&&recipe.batch,`${id}: equipment and preparation notes`);
 for(const [key,q] of Object.entries(recipe.items))assert.ok(ingredients[key]&&q>=0,`${id}: known ingredient ${key}`);
 const n=nutrition(id,settings);assert.ok(Number.isFinite(n.kcal)&&n.kcal>0&&n.protein>0,`${id}: valid nutrition`);
}
const chillaPlan={...state,plan:{'2026-09-28:breakfast':{recipe:'chilla'}}};
const chillaList=groceries(chillaPlan,'2026-09-28');
assert.equal(chillaList.besan,70);
assert.equal(chillaList.milk,1800);
assert.equal(chillaList.oats,600);
assert.equal(chillaList.tofu,600);
assert.equal(nutrition('masala_oats',settings).incomplete,false);
console.log('Recipe checks passed: complete methods, nutrition, and new-meal grocery quantities.');
