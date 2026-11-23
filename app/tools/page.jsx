'use client';
import { useState } from 'react';
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

export default function ChargingTools() {
  const [mode, setMode] = useState(1);
  const [capacity, setCapacity] = useState('60');
  const [from, setFrom] = useState('20');
  const [target, setTarget] = useState('80');
  const [power, setPower] = useState(modes[1].power);
  const [eff, setEff] = useState(modes[1].efficiency);
  const [rate, setRate] = useState('');
  const c=number(capacity,1,500), a=number(from,0,100), b=number(target,0,100), p=number(power,0.1,500), e=number(eff,10,100), r=number(rate,0,100);
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
  return <main className={styles.learning} id="main-content">
    <header className="guide-mast"><p className="learning-label">The charging desk / 02</p><h1>Estimate your charging stop.</h1><p>See the energy, time and electricity cost of a charging session. This is a planning tool, not a NowCharged quote.</p></header>
    <div className="estimate-layout">
      <section className="estimate-inputs" aria-labelledby="est-setup"><h2 id="est-setup">Set up your charge</h2>
        <fieldset><legend>Charger preset</legend><div className="charge-presets">{modes.map((item,i)=><button key={item.name} type="button" aria-pressed={mode===i} onClick={()=>{setMode(i);setPower(item.power);setEff(item.efficiency)}}>{item.name}</button>)}</div></fieldset>
        <p>Presets are examples. Enter the average power drawn from the charger, not its advertised maximum. Use your car’s usable battery capacity if you know it.</p>
        <div className="estimate-fields">{items.map(([id,label,value,set,min,max,unit])=><div key={id}><label htmlFor={id}>{label}</label><div className="estimate-field"><input id={id} type="number" step="any" min={min} max={max} value={value} onChange={e=>set(e.target.value)} aria-describedby={`${id}-hint`}/><span aria-hidden="true">{unit}</span></div><small id={`${id}-hint`}>{min}–{max} {unit}</small></div>)}</div>
      </section>
      <section className="estimate-result" aria-labelledby="est-summary"><p className="learning-label">Your scenario</p><h2 id="est-summary">Charging estimate</h2><div aria-live="polite" aria-atomic="true">{issue ? <p>{issue}</p> : <>
        <div className="charge-gauge" aria-hidden="true"><span style={{width:`${b}%`}}/><i style={{width:`${a}%`}}/></div>
        <p>{a}% → {b}% battery charge</p>
        <dl><div><dt>Time plugged in</dt><dd>{duration(supplied/p)}</dd></div><div><dt>Energy added to battery</dt><dd>{format.format(stored)} kWh</dd></div><div><dt>Energy supplied by charger</dt><dd>{format.format(supplied)} kWh</dd></div><div><dt>Estimated electricity cost</dt><dd>{r===null ? 'Add a rate' : `$${(supplied*r).toFixed(2)} CAD`}</dd></div></dl>
      </>}</div><p>Actual time varies with your vehicle, battery temperature, station and charging curve. Near full, DC fast charging often slows down. Driving, waiting, session fees and valet fees aren’t included.</p></section>
    </div>
    <section className="guide-section guide-split"><div><p className="learning-label">How it works</p><h2>What the estimate counts.</h2></div><div><p>Battery energy is usable capacity × change in charge. Charger energy is battery energy ÷ efficiency. Time is charger energy ÷ average charger power. Electricity cost is charger energy × your entered price per kWh.</p><a className="learning-cta" href="/chargers">Read Charging 101 ↗</a></div></section>
  </main>;
}
