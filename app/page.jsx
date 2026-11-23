import { isLiveHost } from "./release";

export const metadata = { description: "Keep your day. NowCharged picks up your car for EV charging or service at your chosen dealership, then brings it back.", alternates: { canonical: "/" } };

function DispatchMap() {
  const nodes = <>
    <circle cx="110" cy="259" r="18" fill="#def56a"/><circle cx="110" cy="259" r="6" fill="#13201d"/>
    <circle cx="395" cy="100" r="15" fill="#def56a"/><path d="m397 92-8 10h6l-1 6 8-10h-6z" fill="#13201d"/>
    <circle cx="467" cy="267" r="15" fill="#ffc58e"/><path d="M461 269h12m-10 4v-8l4-4 4 4v8" fill="none" stroke="#13201d" strokeWidth="2"/>
    <g fill="#fff" fontFamily="system-ui,sans-serif" fontSize="13" fontWeight="700"><text x="78" y="291">YOUR SPOT</text><text x="414" y="97">CHARGER</text><text x="395" y="293">DEALERSHIP</text></g>
  </>;
  return <svg viewBox="0 0 550 330" className="nc-dispatch-map" role="img" aria-label="Illustrated round trips from your parking spot to an EV charger or your dealership and back. Not to scale." preserveAspectRatio="xMidYMid meet">
    <defs><pattern id="dispatch-grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" fill="none" stroke="#385048" strokeWidth="1"/></pattern><pattern id="dispatch-minor" width="55" height="55" patternUnits="userSpaceOnUse" patternTransform="rotate(31)"><path d="M0 0V55" fill="none" stroke="#335149" strokeWidth="3"/></pattern></defs>
    <rect width="550" height="330" fill="#172823"/><rect width="550" height="330" fill="url(#dispatch-grid)"/><path d="M0 141 206 154l59-40 51 16L500 0H0zM0 240l145 12 183 78H0zM548 80l-101 41-93 97 196 94z" fill="url(#dispatch-minor)" opacity=".58"/>
    <g fill="none" stroke="#4a6a60" strokeWidth="5" opacity=".65"><path d="M0 108c70 5 126-25 196-21s180 46 354 17"/><path d="M127 330 267 131l21-131"/><path d="m371 0-44 147 61 35 31 148"/><path d="m0 206 195 12 221-45 134 10"/></g>
    <path d="M40 0 68 89l53 33c58 12 66 65 121 72 31 6 58-17 92 0 21 11 21 25 47 32l169-22" fill="none" stroke="#568f7d" strokeWidth="13" opacity=".35"/>
    <path d="M110 259h63q29 0 44-28l44-69q11-18 30-18h50q22 0 36-17l18-27" fill="none" stroke="#def56a" strokeWidth="5" strokeLinecap="round"/>
    <path d="M110 259h139q21 0 35-16l24-25q12-12 27-12h64q22 0 40 21l28 40" fill="none" stroke="#ffc58e" strokeWidth="5" strokeLinecap="round"/>
    <path d="m382 96 15 3-1 15M451 267h16v-16" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round" opacity=".8"/>{nodes}
  </svg>;
}

const lanes = [
  { id:"01",slug:"ev-charging",kind:"EV CHARGING VALET",title:"Get it charged.",body:"We pick up your EV, take it to a compatible fast charger and bring it back to you.",price:"$50 CAD",qualifier:"scheduled visit · charging billed separately", link:"Explore EV charging",variant:"ev" },
  { id:"02",slug:"dealership-pickup",kind:"DEALERSHIP VALET",title:"Get it serviced.",body:"We drive your car to the dealership you choose, then pick it up when the work is done and return it.",price:"$80 CAD/hr",qualifier:"valet transport · dealership work billed separately",link:"Explore dealership pickup",variant:"dealer" }
];

export default async function HomePage() {
  const isLive = await isLiveHost();
  return <main className="nc-home">
    <section className="nc-shell nc-home-hero" aria-labelledby="home-intro">
      <div className="nc-home-copy"><div className="nc-kicker"><span className="nc-live-dot"/> TORONTO + GTA / CAR VALET</div><h1 id="home-intro">We take the car.<br/>You keep <em>your day.</em></h1><p>Need your EV charged or your car at the dealership? We pick it up at your spot and bring it back to you.</p><div className="nc-home-actions" aria-label="Choose your valet service"><a className="nc-button nc-home-action-ev" href="/services/ev-charging">EV charging <span aria-hidden="true">↗</span></a><a className="nc-button nc-home-action-dealer" href="/services/dealership-pickup">Dealership pickup <span aria-hidden="true">↗</span></a></div></div>
      <div className="nc-map-card">
        <div className="nc-map-top"><span>NOWCHARGED / SERVICE ROUTES</span><span aria-hidden="true">01–02</span></div>
        <DispatchMap />
        <div className="nc-map-foot"><span><i/> EV charger</span><span><i/> Your dealership</span><b>OUT &amp; BACK</b></div>
      </div>
    </section>
    <section id="valet-services" className="nc-shell nc-home-lanes" aria-label="Valet services">
      {lanes.map((lane) => <article className={"nc-lane nc-lane--"+lane.variant} key={lane.id}><div className="nc-lane-top"><span className="nc-kicker">{lane.kind}</span><span>/{lane.id}</span></div><h2>{lane.title}</h2><p>{lane.body}</p><div className="nc-lane-price"><b>{lane.price}</b><span>{lane.qualifier}</span></div><a href={"/services/"+lane.slug} className="nc-button nc-button--dark">{lane.link} <span aria-hidden="true">↗</span></a></article>)}
    </section>
    <section className="nc-shell nc-home-route nc-section" aria-labelledby="route-title">
      <div><p className="nc-kicker">THE HANDOFF</p><h2 id="route-title">Your keys go on a round trip.</h2><p>Choose a service and share your pickup area. Your pickup, handoff and return details are confirmed before you commit.</p><a href="/trust" className="nc-jump">How we handle your car <span aria-hidden="true">↗</span></a></div>
      <ol>{[["01","At your spot","Agree on when and where to hand over the keys."],["02","At the destination","We take your car to a compatible charger or your chosen dealership."],["03","Back with you","We return the car to the agreed spot."]].map(([n,title,copy])=><li key={n}><span>{n}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol>
    </section>
    <section id="callback" className="nc-shell nc-home-callback" aria-labelledby="callback-title"><div><p className="nc-kicker">FIRST EV PICKUP</p><h2 id="callback-title">Start with a callback.</h2><p>Tell us where you’re parked. We’ll confirm the location, charges and timing with you before anything is booked.</p></div><a className="nc-button" href="/request?service=ev">{isLive ? "Request an EV callback" : "Preview an EV callback"} <span aria-hidden="true">↗</span></a></section>
    <section className="nc-shell nc-home-reference" aria-label="Driver resources">
      <a href="/chargers"><span className="nc-kicker">LEARN / 01</span><strong>Charging 101</strong><span>Compare a wall outlet, a Level 2 charger and fast charging. ↗</span></a>
      <a href="/tools"><span className="nc-kicker">ESTIMATE / 02</span><strong>EV tools</strong><span>Estimate the energy and time for your next charge. ↗</span></a>
      <a href="/coverage"><span className="nc-kicker">CHECK / 03</span><strong>Service area</strong><span>See where we take requests in Toronto and the GTA. ↗</span></a>
    </section>
  </main>;
}
