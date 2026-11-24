import Link from "next/link";
import { isLiveHost } from "../release";
import s from "../services/valet.module.css";

export const metadata = {title:"EV Charging Valet Pricing & Pickup Fees",description:"See pickup, charging and return fees for NowCharged EV valet in Toronto and the GTA. Scheduled visits are $50 CAD, plus electricity at cost and applicable extras.", alternates: { canonical: "/pricing" } };

export default async function Pricing(){
const live = await isLiveHost();
const tiers=[["Scheduled","$50","per visit","Plan your pickup ahead of time."],["Same-day priority","$75","per visit","Available only when there’s a same-day opening."],["Monthly","Custom","recurring plan","Ask about repeat pickups. Pricing depends on frequency."]];
return <main data-field-page="pricing" id="main" className={s.page+" "+s.prices+" field-valet-page"}>
 <section className={s.intro+" field-valet-intro"}><div className={s.wrap}><p className={s.eyebrow+" field-valet-eyebrow"}>Pricing / Canadian dollars</p><h1 className={s.title}>EV charging valet <em>from $50.</em></h1><p className={s.deck}>The valet fee covers pickup, the trip to a compatible charger, supervision during charging and return. Electricity is billed separately at cost.</p><div className={s.actions}><a className={s.link} href="#ev">See EV rates</a><a className={s.link} href="#dealer">Planned dealership transport</a></div></div></section>
 <section id="ev" className={s.band+" "+s.line}><div className={s.wrap}><p className={s.eyebrow+" field-valet-eyebrow"}>01 / EV charging valet</p><h2 className={s.subhead}>Scheduled, priority or monthly.</h2><div className={s.lane+" field-valet-lane"}>{tiers.map(([title,price,unit,copy])=><article key={title}><p className={s.tag+" field-valet-tag"}>{title}</p><div className={s.money}>{price}</div><h3>{unit}</h3><p>{copy}</p></article>)}</div>
 <div className={s.split}><div><h3><strong>Confirm the details first</strong></h3><p className={s.notes}>On the callback, we’ll review your postal code, availability and the costs for your request. A callback isn’t a booking.</p><div className={s.actions}><Link className={s.cta+" field-valet-cta"} href="/request?service=ev">{live ? "Request an EV callback" : "Preview an EV callback"}</Link><Link className={s.link} href="/services/ev-charging">How it works</Link></div></div>
 <aside className={s.paper+" field-valet-paper"}><h3><strong>Charged separately</strong></h3><p className={s.notes}>Electricity is billed at cost. Any applicable parking, tolls or special access fees are separate, and HST is added to the final invoice.</p><p className={s.notes}><strong>Cancellation:</strong> More than 2 hours before pickup is free. Within 2 hours, a cancellation fee may apply.</p></aside></div>
 </div></section>
 <section id="dealer" className={s.band+" "+s.last+" field-valet-last"}><div className={s.wrap+" "+s.split}><div><p className={s.eyebrow+" field-valet-eyebrow"}>02 / Dealership pickup &amp; return</p><h2 className={s.subhead}>Planned dealership transport.</h2><p className={s.copy}>This is a separate pickup and return service for dealership appointments. The dealership handles the work and bills you separately. We’re not accepting bookings while we confirm insurance for paid driving.</p><div className={s.actions}><Link className={s.link} href="/services/dealership-pickup">See dealership pickup details</Link></div></div>
 <aside className={s.receipt+" field-valet-receipt"}><p className={s.kicker+" field-valet-kicker"}>Planned transport rate</p><p className={s.money}>$80</p><p>CAD per hour</p><p>Dealer parts, labour and other dealership charges are not included in this transport rate.</p></aside></div></section>
</main>;
}
