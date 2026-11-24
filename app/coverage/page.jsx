import { isLiveHost } from "../release";

export const metadata = { title: "EV Charging Pickup Areas: Mississauga, Toronto & GTA", description: "Check where NowCharged offers EV charging pickup and return, including Mississauga, Toronto, Brampton and nearby GTA communities. Availability is confirmed by address.", alternates: { canonical: "/coverage" } };

const areas = [
  ["01", "Toronto", "City of Toronto"],
  ["02", "West", "Mississauga · Brampton · Oakville · Burlington"],
  ["03", "North", "Vaughan · Richmond Hill · Markham"],
  ["04", "East", "Pickering · Ajax · Oshawa"],
];

export default async function CoveragePage() {
  const isLive = await isLiveHost();
  return <main data-field-page="coverage" className="nc-shell nc-section nc-coverage">
    <div className="nc-coverage-main">
      <p className="nc-kicker">TORONTO + GREATER TORONTO AREA</p>
      <h1 className="nc-h1">EV pickup areas.</h1>
      <p className="nc-lede">We review EV charging pickup and return requests in Mississauga, Toronto, Brampton and other GTA communities. Availability depends on your pickup address.</p>
      <div className="nc-coverage-note"><p className="nc-kicker">START WITH YOUR POSTAL CODE</p><h2>See if your address fits.</h2><p>Share your pickup postal code through the EV callback form. We’ll review your location and discuss timing and cost. Your request doesn’t book a pickup.</p><a className="nc-button" href="/request?service=ev">{isLive ? "Request an EV callback" : "Preview an EV callback"} <span aria-hidden="true">↗</span></a><p><a href="/pricing#ev" className="nc-jump">See EV valet prices</a> · <a href="/services/ev-charging" className="nc-jump">How EV charging pickup works</a></p></div>
    </div>
    <section className="nc-coverage-list" aria-labelledby="coverage-list-title">
      <p className="nc-kicker" id="coverage-list-title">EXAMPLES / SERVICE AREA</p>
      {areas.map(([number, region, cities])=><div className="nc-coverage-row" key={number}><b>{number}</b><div><h2>{region}</h2><p>{cities}</p></div></div>)}
      <p className="nc-muted">These cities are examples, not a guarantee. Some nearby addresses may also be eligible.</p>
    <p className="nc-muted">Looking for transport to a dealer? <a href="/services/dealership-pickup" className="nc-jump">Check dealership pickup status</a>.</p>
    </section>
  </main>;
}
