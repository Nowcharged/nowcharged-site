import { isLiveHost } from "./release";
import FieldPlate from "./field-plate";

export const metadata = { title:"Southern Ontario Charging Solutions | NowCharged", description:"Door-to-door EV charging valet in Toronto and the GTA. Explore pickup, charging prices and how the round trip works.", alternates:{canonical:"/"} };

function Arrow({down=false}){return <svg viewBox="0 0 18 18" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={down?{transform:"rotate(90deg)"}:undefined}><path d="M2 9h13M9 3l6 6-6 6"/></svg>}
function Spot({dealer=false}){
 return <svg className="spot" viewBox="0 0 140 90" fill="none" aria-hidden="true">
 <g stroke="#16382a" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
 {dealer ? <><path fill="#b78f66" stroke="none" d="M15 77l87 8 27-8-43-8z"/><path d="m77 45 30-28 8 2 2 9-11 10-7-1-3 9-10 7z" fill="#d6dfbe"/><path d="m84 46 25-24" strokeWidth="1.6"/><path d="m24 46 19-23q6-6 15-4l26 12q6 4 2 12L64 68q-4 5-11 4L26 59q-6-3-2-13z" fill="#28503b"/><path d="m23 40 19-23q5-6 14-3l27 12q6 4 2 11L64 63q-4 5-11 3L26 54q-6-3-3-14z" fill="#f7f0d0"/><path d="m37 42 13-15 20 9-14 16z" fill="#a6c28f"/><path d="m44 40 12 5m7-24 9 4"/><path d="M27 47c-14-14-28 12-12 17 7 2 15-3 18-10" strokeWidth="4"/></> :
 <><path fill="#8baf83" stroke="none" d="M5 75l99 7 30-10-45-7z"/><path fill="#d9e7ae" d="m14 54 12-7 18-20q3-4 11-4l30 2q7 1 13 8l10 11 15 5 5 11-4 9H20l-8-4z"/><path d="m36 46 13-16 15-3-3 16zm34-18 13 2 15 14-31-1z" fill="#385640"/><path d="M15 57h12l4-6-13 3zm91-9 10 2 6 5h-15z" fill="#f6e7b2"/><path d="m35 53 54 1m-18-5h9" strokeWidth="1.5"/><path d="M14 64h113"/><g fill="#273e34"><circle cx="37" cy="67" r="11"/><circle cx="103" cy="66" r="11"/></g><g fill="#e4e6c8" strokeWidth="2"><circle cx="37" cy="67" r="5"/><circle cx="103" cy="66" r="5"/></g></>}
 </g></svg>
}
const services=[
 {id:"01",name:"EV charging valet",lede:"Your EV goes to a compatible fast charger and comes back to your parking spot.",rate:"$50",unit:"CAD / scheduled visit",note:"Electricity billed separately.",href:"/services/ev-charging",link:"Explore EV charging"},
 {id:"02",name:"Dealership pickup",lede:"A round trip to your chosen dealership for a service appointment. Your dealer handles the work.",rate:"$80",unit:"CAD / hour",note:"Information only. Not booking yet.",href:"/services/dealership-pickup",link:"See dealership service"}
];
export default async function HomePage(){
 const live=await isLiveHost();
 return <main className="lab-home">
 <section className="lab-hero nc-shell" aria-labelledby="home-intro">
 <div className="lab-copy"><p className="lab-over"><span className="print-notch"/> EV CHARGING VALET <b>/</b> TORONTO + GTA</p>
 <h1 id="home-intro" aria-label="Southern Ontario Charging Solutions"><span>Southern Ontario</span><strong>Charging</strong><em>Solutions<span>.</span></em></h1>
 <p className="lab-lede">We pick up your EV, take it to charge, and bring it back. You keep your day.</p>
 <div className="lab-hero-links"><a href="/services/ev-charging" className="nc-button lab-primary">Explore EV charging <Arrow/></a><a className="lab-link" href="/pricing">See pricing</a></div></div>
 <FieldPlate/>
 </section>
 <section id="valet-services" className="lab-directory nc-shell" aria-labelledby="directory-heading"><header className="lab-section-header"><div className="lab-over"><span className="print-notch"/> SERVICE DIRECTORY</div><h2 id="directory-heading">Choose your valet service.</h2></header>
 <div className="service-plates">{services.map((s,i)=><article key={s.id} className={"service-plate sheet-"+s.id}><div className="service-tag"><span>SERVICE NO. {s.id}</span><span>{i?"DEALERSHIP":"ELECTRIC"}</span></div><div className="spot-line"><Spot dealer={!!i}/></div><h3>{s.name}</h3><p>{s.lede}</p><div className="service-tariff"><b>{s.rate}</b><span>{s.unit}<br/>{s.note}</span></div><a href={s.href}>{s.link} <Arrow/></a></article>)}</div></section>
 <section className="lab-route" aria-labelledby="route-title"><div className="nc-shell route-grid"><div><p className="lab-over"><span className="print-notch"/> THE HANDOFF</p><h2 id="route-title">One charge.<br/><em>Three stops.</em></h2><a href="/trust" className="lab-link">How we handle your car <Arrow/></a></div><ol>{[["Pickup","Agree on the handoff time and meet your driver at your parking spot."],["Plug in","Your driver takes your EV to a compatible charger for the agreed top-up."],["Return","Get your keys back at the agreed spot, along with an update on the charge."]].map(([a,b],i)=><li key={a}><span>0{i+1}</span><div><h3>{a}</h3><p>{b}</p></div></li>)}</ol></div></section>
 <section className="nc-shell lab-guide" aria-labelledby="guide-title"><header className="lab-section-header"><p className="lab-over"><span className="print-notch"/> DRIVER RESOURCES</p><h2 id="guide-title">The field guide.</h2></header><div className="lab-index">{[["01","Charging 101","Understand levels, plugs and charge times.","/chargers"],["02","EV tools","Estimate the energy and time for your next charge.","/tools"],["03","Service area","Check EV pickup coverage in Toronto and the GTA.","/coverage"]].map(([n,t,d,h])=><a key={n} href={h}><small>{n} / GUIDE</small><strong>{t}</strong><span>{d}</span><Arrow/></a>)}</div></section>
 <section id="callback" className="nc-shell callback-plate" aria-labelledby="callback-title"><div><p className="lab-over">FIRST EV PICKUP</p><h2 id="callback-title">Start with a callback.</h2><p>Tell us where you’re parked. We’ll confirm the location, cost and timing before anything is booked.</p></div><a className="nc-button lab-primary" href="/request?service=ev">{live?"Request an EV callback":"Preview an EV callback"} <Arrow/></a></section>
 </main>
}
