import Link from "next/link";
import s from "../valet.module.css";

export const metadata = {title:"EV Charging Valet",description:"A driver picks up your EV, takes it to a DC fast charger and brings it back. Toronto and the GTA."};

export default function EvCharging(){
 const steps=[["Meet your driver","Confirm the pickup window, parking access and how to hand off your keys."],["We take it to charge","Your driver uses a nearby DC fast charger, aiming for the battery target you agree on beforehand."],["Get your car back","Your driver returns your EV to the agreed spot and updates you on the completed charge."]];
 return <main id="main" className={s.page}>
  <section className={s.intro}><div className={s.wrap+" "+s.split}>
   <div><p className={s.eyebrow}>01 / EV charging valet</p><h1 className={s.title}>Skip the trip to the <em>charger.</em></h1><p className={s.deck}>We pick up your EV, take it to a DC fast charger, and bring it back to your agreed spot. You can get on with your day.</p><div className={s.actions}><Link className={s.cta} href="/request?service=ev">Request EV charging <span aria-hidden="true">↗</span></Link><Link className={s.link} href="/pricing#ev">See charging prices</Link></div></div>
   <figure><img className={s.photo} src="/ev-charging.png" width="1254" height="1254" alt="Illustration of an electric car beside a fast charger"/><figcaption className={s.caption}>Pickup, fast charging and return from one request.</figcaption></figure>
  </div></section>
  <section className={s.band+" "+s.line}><div className={s.wrap}><p className={s.eyebrow}>The round trip</p><h2 className={s.subhead}>From your spot, back to your spot.</h2><ol className={s.route}>{steps.map(([title,copy],i)=><li key={title}><span className={s.kicker}>0{i+1}</span><strong>{title}</strong><p>{copy}</p></li>)}</ol></div></section>
  <section className={s.band+" "+s.last}><div className={s.wrap+" "+s.split}>
   <div><p className={s.eyebrow}>A good fit if…</p><h2 className={s.subhead}>Home charging isn’t an option.</h2><p className={s.copy}>No plug in your condo garage, or no time to sit at a station? This service is for drivable EVs that can reach a charger safely. It isn’t an on-site charger or roadside recovery.</p><div className={s.actions}><Link className={s.link} href="/chargers">Learn how EV charging works ↗</Link></div></div>
   <aside className={s.receipt}><p className={s.kicker}>EV valet fees · CAD</p><dl><div><dt>Scheduled</dt><dd>$50 / visit</dd></div><div><dt>Same-day priority, if available</dt><dd>$75 / visit</dd></div><div><dt>Monthly</dt><dd>Custom</dd></div></dl><p>Charging electricity is billed separately at cost. Parking, tolls or special access fees may apply. HST is added to the final invoice.</p></aside>
  </div></section>
 </main>;
}
