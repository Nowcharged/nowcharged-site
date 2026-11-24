import Link from "next/link";
import { isLiveHost, productionOrigin } from "../../release";
import s from "../valet.module.css";

export const metadata = {title:"EV Charging Pickup in Mississauga & GTA",description:"Skip the charger trip. NowCharged picks up your EV, fast-charges it and brings it back in Mississauga, Toronto and the GTA. Scheduled visits are $50 CAD, plus electricity at cost and applicable extras.", alternates: { canonical: "/services/ev-charging" } };

const serviceSchema = {
 "@context": "https://schema.org",
 "@type": "Service",
 "@id": productionOrigin + "/services/ev-charging#service",
 name: "NowCharged EV Charging Valet",
 serviceType: "EV charging pickup and return",
 url: productionOrigin + "/services/ev-charging",
 provider: { "@id": productionOrigin + "/#organization", "@type": "Organization", name: "NowCharged" },
 areaServed: ["Mississauga", "Toronto", "Greater Toronto Area"]
};

export default async function EvCharging(){
 const live = await isLiveHost();
 const steps=[["Request a callback","Share your postal code. We’ll review your location, availability and price with you. That call doesn’t book a pickup."],["Pickup and fast charging","For an arranged visit, a driver picks up your EV, drives it to a compatible fast charger and supervises the top-up."],["Return to your spot","The driver returns your EV and keys to the agreed spot and lets you know how much charge was added."]];
 return <main data-field-page="ev-charging" id="main" className={s.page+" field-valet-page"}>
  {live && <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(serviceSchema).replace(/</g,"\\u003c")}}/>}
  <section className={s.intro+" field-valet-intro"}><div className={s.wrap+" "+s.split}>
   <div><p className={s.eyebrow+" field-valet-eyebrow"}>EV charging valet / Mississauga, Toronto &amp; GTA</p><h1 className={s.title}>EV charging pickup <em>and return.</em></h1><p className={s.deck}>We pick up your EV at an agreed spot in Mississauga, Toronto or elsewhere in the GTA, take it to a compatible public DC fast charger and bring it back. Scheduled valet visits are $50 CAD plus electricity at cost and applicable extras. Start with a callback to talk through the details.</p><div className={s.actions}><Link className={s.cta+" field-valet-cta"} href="/request?service=ev">{live ? "Request an EV callback" : "Preview an EV callback"}</Link><Link className={s.link} href="/pricing#ev">See prices and extras</Link></div></div>
   <figure><img className={s.photo+" field-valet-photo"} src="/ev-charging.png" width="1254" height="1254" alt="Illustration of an electric car beside a fast charger"/><figcaption className={s.caption}>Pickup, fast charging and return from one request.</figcaption></figure>
  </div></section>
  <section className={s.band+" "+s.line}><div className={s.wrap}><p className={s.eyebrow+" field-valet-eyebrow"}>The round trip</p><h2 className={s.subhead}>From the first call to the return.</h2><ol className={s.route+" field-valet-route"}>{steps.map(([title,copy],i)=><li key={title}><span className={s.kicker+" field-valet-kicker"}>0{i+1}</span><strong>{title}</strong><p>{copy}</p></li>)}</ol><div className={s.actions}><Link className={s.link} href="/trust">See how the key handoff works</Link><Link className={s.link} href="/faq#ev">Read the EV charging FAQ</Link></div></div></section>
  <section className={s.band+" "+s.last+" field-valet-last"}><div className={s.wrap+" "+s.split}>
   <div><p className={s.eyebrow+" field-valet-eyebrow"}>A good fit if…</p><h2 className={s.subhead}>Get a charge without the station trip.</h2><p className={s.copy}>Whether you’re working, your condo doesn’t have a charger, or you just want the time back, start with your pickup postal code. We’ll confirm the pickup, parking access and timing before you book. This is a planned valet trip, not on-site charging or roadside recovery.</p><div className={s.actions}><Link className={s.cta+" field-valet-cta"} href="/request?service=ev">{live ? "Request an EV callback" : "Preview an EV callback"}</Link><Link className={s.link} href="/coverage">Check Mississauga and GTA pickup areas</Link></div></div>
   <aside className={s.receipt+" field-valet-receipt"}><p className={s.kicker+" field-valet-kicker"}>EV valet fees · CAD</p><dl><div><dt>Scheduled</dt><dd>$50 / visit</dd></div><div><dt>Same-day priority, if available</dt><dd>$75 / visit</dd></div><div><dt>Monthly</dt><dd>Custom</dd></div></dl><p>Charging electricity is billed separately at cost. Parking, tolls or special access fees may apply. HST is added to the final invoice.</p></aside>
  </div></section>
 </main>;
}
