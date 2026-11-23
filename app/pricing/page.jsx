import Link from "next/link";
import s from "../services/valet.module.css";

export const metadata = {title:"Pricing",description:"Compare NowCharged EV charging valet and dealership pickup and return pricing in Canadian dollars."};

export default function Pricing(){
const tiers=[["Scheduled","$50","per visit","Plan your pickup ahead of time."],["Same-day priority","$75","per visit","For a pickup today when a slot is available."],["Monthly","Custom","recurring plan","Ask about repeat pickups. Pricing depends on frequency."]];
return <main id="main" className={s.page+" "+s.prices}>
 <section className={s.intro}><div className={s.wrap}><p className={s.eyebrow}>Pricing / Canadian dollars</p><h1 className={s.title}>Two services. <em>Two ways to pay.</em></h1><p className={s.deck}>EV charging valet is priced per visit or on a custom monthly plan. Dealership pickup and return is billed by the hour.</p><div className={s.actions}><a className={s.link} href="#ev">EV charging rates ↓</a><a className={s.link} href="#dealer">Dealership transport rate ↓</a></div></div></section>
 <section id="ev" className={s.band+" "+s.line}><div className={s.wrap}><p className={s.eyebrow}>01 / EV charging valet</p><h2 className={s.subhead}>Choose your pickup.</h2><div className={s.lane}>{tiers.map(([title,price,unit,copy])=><article key={title}><p className={s.tag}>{title}</p><div className={s.money}>{price}</div><h3>{unit}</h3><p>{copy}</p></article>)}</div>
 <div className={s.split}><div><h3><strong>In the valet fee</strong></h3><p className={s.notes}>Pickup, driving to the charger, supervision during charging and return to the agreed spot.</p><div className={s.actions}><Link className={s.cta} href="/request?service=ev">Request EV charging ↗</Link><Link className={s.link} href="/services/ev-charging">How it works</Link></div></div>
 <aside className={s.paper}><h3><strong>Charged separately</strong></h3><p className={s.notes}>Electricity is billed at cost. Any applicable parking, tolls or special access fees are separate, and HST is added to the final invoice.</p><p className={s.notes}><strong>Cancellation:</strong> More than 2 hours before pickup is free. Within 2 hours, a cancellation fee may apply.</p></aside></div>
 </div></section>
 <section id="dealer" className={s.band+" "+s.last}><div className={s.wrap+" "+s.split}><div><p className={s.eyebrow}>02 / Dealership pickup &amp; return</p><h2 className={s.subhead}>Pay for transport. Pay the dealer for service.</h2><p className={s.copy}>We drive your car to the dealership you choose and return it once the work is done. The dealership handles the work and bills you separately.</p><div className={s.actions}><Link className={s.cta} href="/request?service=dealer">Request dealership pickup ↗</Link><Link className={s.link} href="/services/dealership-pickup">How it works</Link></div></div>
 <aside className={s.receipt}><p className={s.kicker}>Dealership transport only</p><p className={s.money}>$80</p><p>CAD per hour</p><p>Dealer parts, labour and other dealership charges are not included in this transport rate.</p></aside></div></section>
</main>;
}
