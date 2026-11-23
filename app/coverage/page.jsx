export const metadata = { title: "Toronto & GTA service area" };

const areas = [
  ["01", "Toronto", "City of Toronto"],
  ["02", "West", "Mississauga · Brampton · Oakville · Burlington"],
  ["03", "North", "Vaughan · Richmond Hill · Markham"],
  ["04", "East", "Pickering · Ajax · Oshawa"],
];

export default function CoveragePage() {
  return <main className="nc-shell nc-section nc-coverage">
    <div className="nc-coverage-main">
      <p className="nc-kicker">TORONTO + GREATER TORONTO AREA</p>
      <h1 className="nc-h1">Where we pick up.</h1>
      <p className="nc-lede">We serve Toronto and the GTA. Availability depends on the pickup address and, for dealer valet, the dealership you choose.</p>
      <div className="nc-coverage-note"><p className="nc-kicker">BEFORE THE HANDOFF</p><h2>Two locations to confirm.</h2><p>For EV charging, share your pickup postal code. For dealership valet, share the pickup postal code and your dealership's location. Being in a listed city does not guarantee availability.</p><a className="nc-button" href="/request">Explore a pickup <span aria-hidden="true">↗</span></a></div>
    </div>
    <section className="nc-coverage-list" aria-labelledby="coverage-list-title">
      <p className="nc-kicker" id="coverage-list-title">EXAMPLES / SERVICE AREA</p>
      {areas.map(([number, region, cities])=><div className="nc-coverage-row" key={number}><b>{number}</b><div><h2>{region}</h2><p>{cities}</p></div></div>)}
      <p className="nc-muted">Some nearby addresses may also be eligible. Confirm exact locations before planning around a pickup.</p>
    </section>
  </main>;
}
