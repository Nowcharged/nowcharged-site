import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { buildCatalogue,readState,searchCatalogue,href,SOURCES,PAGE_SIZE } from './catalogue.mjs';
const data=JSON.parse(readFileSync(new URL('ratings.json',import.meta.url)));
const db=buildCatalogue(data),state=p=>readState(p,db),lookup=p=>searchCatalogue(db,state(p));
test('pinned NRCan raw snapshot, unique IDs and complete rated configurations',()=>{
 const raw=readFileSync(new URL('nrcan-bev-2026-09-29.csv',import.meta.url));
 assert.equal(createHash('sha256').update(raw).digest('hex'),'d37f52ee8049e93b37f66ac233b037e6abe0218ef3635ef6cbddf8fb8c675f51');
 assert.equal(db.rows.length,1250);assert.equal(db.byId.size,1250);assert.equal(db.makes.length,36);
 assert.deepEqual([db.years[0],db.years.at(-1)],[2026,2012]);assert.equal(lookup({year:'2026'}).matches,277);
 assert.ok(db.rows.every(r=>[r.range,r.combined,r.highway,r.city,r.recharge].every(v=>Number.isFinite(v)&&v>0)));
 assert.match(SOURCES.csv,/^https:\/\/open.canada.ca\//);
});
test('exact source and trim-preserving identities',()=>{
 const sv=db.byId.get('2026-nissan-ariya-sv');
 assert.deepEqual([sv.range,sv.city,sv.highway,sv.combined,sv.recharge],[348,19.3,22.4,20.7,10]);
 assert.ok(db.byId.has('2026-nissan-ariya-sl-plus-e-4orce')); assert.ok(db.byId.has('2026-nissan-ariya-sl-e-4orce'));
 assert.equal(lookup({q:'2026 mach e',make:'Ford'}).rows.every(r=>r.make==='Ford' && r.year===2026),true);
});
test('combined facets sort, no-match, pagination boundaries and invalid params',()=>{
 assert.equal(lookup({}).rows.length,PAGE_SIZE); assert.equal(lookup({page:'900'}).page,Math.ceil(1250/PAGE_SIZE));
 assert.deepEqual(lookup({q:'no-vehicles-here'}).rows,[]);
 const r=lookup({make:'Tesla',range:'400',sort:'efficiency'});assert.ok(r.matches>0);
 assert.ok(r.rows.every((v,i,a)=>v.make==='Tesla' && v.range>=400 && (!i || v.combined>=a[i-1].combined)));
 assert.equal(state({sort:'__proto__',page:'-1',year:'1900',make:['Ford']}).sort,'recent');
 assert.equal(state({sort:'__proto__',page:'-1',year:'1900',make:['Ford']}).page,1);
 assert.equal(lookup({sort:'range'}).rows[0].range,Math.max(...db.rows.map(r=>r.range)));
});
test('shareable URL state, no prefix matching for trim IDs and at most three unique selections',()=>{
 const [a,b,c,d]=db.rows.map(r=>r.id);const x=state({q:'mAh & co',make:'Ford',compare:[a,a,'bogus',b,c,d].join(',')});
 assert.deepEqual(x.compare,[a,b,c]);
 const url=new URL(href(x,{page:2},'compare'),'https://example.test');
 assert.equal(url.pathname,'/ev-database');assert.equal(url.hash,'#compare');assert.equal(url.searchParams.get('q'),'mAh & co');
 assert.deepEqual(state(Object.fromEntries(url.searchParams)),{...x,page:2});
 assert.equal(href({compare:[]},{},'search'),'/ev-database#search');
});
