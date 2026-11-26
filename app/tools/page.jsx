'use client';
import { useState } from 'react';
import EvLibraryNav from '../ev-library-nav';
import styles from "../chargers/learning.module.css";


const modes = [
  { name: 'Level 1', power: '1.4', efficiency: '85' },
  { name: 'Level 2', power: '7.2', efficiency: '90' },
  { name: 'DC fast', power: '65', efficiency: '95' },
];
const format = new Intl.NumberFormat('en-CA', { maximumFractionDigits: 1 });
function duration(hours) {
  const minutes = Math.ceil(hours * 60 - 1e-9);
  return [minutes >= 60 && `${Math.floor(minutes / 60)} h`, minutes % 60 > 0 && `${minutes % 60} min`].filter(Boolean).join(' ') || '<1 min';
}
function number(value, min, max) {
  return value !== '' && Number.isFinite(Number(value)) && Number(value) >= min && Number(value) <= max ? Number(value) : null;
}

function TargetDial({ target }) {
  const rotation = -78 + 156 * target / 100;
  return <svg className="field-target-dial" viewBox="0 0 220 112" aria-hidden="true">
    <rect x="1.5" y="1.5" width="217" height="109" rx="34" fill="#d1dbba" stroke="#0e271b" strokeWidth="3"/>
    <path d="M35 87a75 75 0 0 1 150 0" fill="none" stroke="#142e25" strokeWidth="2"/>
    <path d="M46 82a64 64 0 0 1 128 0" fill="none" stroke="#788c65" strokeWidth="1" strokeDasharray="2 3"/>
    <path d="M169 33a75 75 0 0 1 16 53" fill="none" stroke="#64803a" strokeWidth="7"/>
    <path d="M50 56l7 4m12-31 6 7m35-19v10m41 2-6 7m25 20-7 4" stroke="#142e25" strokeWidth="2" strokeLinecap="round"/>
    <path d="M107 88 110 37l3 51z" fill="#a44423" stroke="#82381e" className={styles.dialNeedle} style={{transform:'rotate('+rotation+'deg)'}}/>
    <circle cx="110" cy="88" r="6" fill="#142e25"/><circle cx="110" cy="88" r="2" fill="#b7c5a0"/>
    <g fill="#142e25" fontFamily="monospace" fontWeight="700" fontSize="10"><text x="24" y="93">0</text><text x="98" y="45">50</text><text x="186" y="93">100</text></g>
    <path d="M11 54h7m-3-3v6m188-3h7m-4-3v6" stroke="#142e25" strokeWidth="1"/>
  </svg>;
}

export default function ChargingTools() {
  const [capacity, setCapacity] = useState('60');
  const [from, setFrom] = useState('20');
  const [target, setTarget] = useState('80');
  const [power, setPower] = useState(modes[1].power);
  const [eff, setEff] = useState(modes[1].efficiency);
  const [rate, setRate] = useState('');
  const c=number(capacity,1,500), a=number(from,0,100), b=number(target,0,100), p=number(power,0.1,500), e=number(eff,10,100), r=number(rate,0,100);
  const activePreset = modes.findIndex((preset) => Number(preset.power) === p && Number(preset.efficiency) === e);
  const issue = [c,a,b,p,e].includes(null) ? 'Enter a value within the range shown for each field.' : b <= a ? 'Your target must be higher than your starting charge.' : rate !== '' && r === null ? 'Enter a valid electricity rate from $0 to $100 per kWh.' : '';
  const stored = issue ? null : c*(b-a)/100;
  const supplied = issue ? null : stored/(e/100);
  const items = [
    ['capacity','Usable battery capacity',capacity,setCapacity,1,500,'kWh'],
    ['start','Starting charge',from,setFrom,0,100,'%'],
    ['target','Target charge',target,setTarget,0,100,'%'],
    ['power','Average charger power',power,setPower,0.1,500,'kW'],
    ['efficiency','Charging efficiency',eff,setEff,10,100,'%'],
    ['rate','Electricity rate (optional)',rate,setRate,0,100,'CAD/kWh'],
  ];
  const renderFields=(fields)=><div className="estimate-fields">{fields.map(([id,label,value,set,min,max,unit])=><div key={id}><label htmlFor={id}>{label}</label><div className="estimate-field"><input id={id} type="number" step="any" min={min} max={max} value={value} onChange={e=>set(e.target.value)} aria-describedby={`${id}-hint`}/><span aria-hidden="true">{unit}</span></div><small id={`${id}-hint`}>{min}–{max} {unit}</small></div>)}</div>;
  return <><EvLibraryNav current="/tools" /><main data-field-page="tools" className={styles.learning} id="main-content">
    <header className="guide-mast"><p className="learning-label">The charging desk / 02</p><h1>Estimate your charging stop.</h1><p>Pick a charger, enter your battery and charge target, and get a planning estimate.</p></header>
    <div className="estimate-layout">
      <section className="estimate-inputs" aria-labelledby="est-setup"><h2 id="est-setup">Set up your charge</h2>
        <fieldset><legend>Charger preset</legend><div className="charge-presets">{modes.map((item,i)=><button key={item.name} type="button" aria-pressed={activePreset===i} onClick={()=>{setPower(item.power);setEff(item.efficiency)}}>{item.name}</button>)}</div></fieldset>
        <p>Presets are examples. Enter the average power drawn from the charger, not its advertised maximum. Use your car’s usable battery capacity if you know it.</p>
        {renderFields(items.slice(0,3))}
        <details className={styles.calculatorAdvanced}><summary>Power, efficiency and price</summary><p>Change the preset assumptions or add your electricity rate.</p>{renderFields(items.slice(3))}</details>
      </section>
      <section className="estimate-result" aria-labelledby="est-summary"><p className="learning-label">Your scenario</p><h2 id="est-summary">Charging estimate</h2><div aria-live="polite" aria-atomic="true">{issue ? <p>{issue}</p> : <>
        <TargetDial target={b}/>
        <div className="charge-gauge" aria-hidden="true"><span style={{width:`${b}%`}}/><i style={{width:`${a}%`}}/></div>
        <p>{a}% → {b}% battery charge</p>
        <dl><div><dt>Time plugged in</dt><dd>{duration(supplied/p)}</dd></div><div><dt>Energy added to battery</dt><dd>{format.format(stored)} kWh</dd></div><div><dt>Energy supplied by charger</dt><dd>{format.format(supplied)} kWh</dd></div><div><dt>Estimated electricity cost</dt><dd>{r===null ? 'Add a rate' : `$${(supplied*r).toFixed(2)} CAD`}</dd></div></dl>
      </>}</div><p>Actual time varies with your vehicle, battery temperature, station and charging curve. Near full, DC fast charging often slows down. Driving, waiting, parking, idle fees and other session fees aren’t included.</p></section>
    </div>
    <section className="guide-section guide-split"><div><p className="learning-label">How it works</p><h2>What the estimate counts.</h2></div><div><p>Battery energy is usable capacity × change in charge. Charger energy is battery energy ÷ efficiency. Time is charger energy ÷ average charger power. Electricity cost is charger energy × your entered price per kWh.</p><a className="learning-cta" href="/chargers">Read Charging 101</a></div></section>
    <section className="guide-section guide-split"><div><p className="learning-label">Canadian vehicle ratings</p><h2>Compare official efficiency.</h2></div><div><p>Look up rated range and energy consumption by year, make and model. An efficiency rating does not tell you battery capacity or how fast your car will charge.</p><a className="learning-cta" href="/ev-database">Open the vehicle database</a></div></section>
    <section className="guide-section guide-split" aria-labelledby="locator-heading"><div><p className="learning-label">Station finder / Canada</p><h2 id="locator-heading">Find a charger near you.</h2></div><div><p>Use Natural Resources Canada’s map to find public charging stations. Check connector compatibility and live availability with the station operator. NowCharged does not collect your location for this tool.</p><a className="learning-cta" href="https://natural-resources.canada.ca/energy-efficiency/transportation-energy-efficiency/electric-charging-alternative-fuelling-stationslocator-map" rel="noreferrer">Open the Canada charging station map</a></div></section>
  </main></>;
}
