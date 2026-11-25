import styles from "./learning.module.css";
import EvLibraryNav from "../ev-library-nav";
import TopicFinder from "./topic-finder";
import { chargingTopics } from "./topics.mjs";

export const metadata = { title: 'Charging 101: Canadian EV Charging Guide & Library', description: 'Browse practical Canadian EV charging guides on Level 1, Level 2, DC fast charging, connector compatibility, costs, home charging and charger outages.', alternates: { canonical: "/chargers" } };

const levels = [
  ['01', 'Level 1', 'Standard 120 V outlet', 'A slow top-up when you can leave the car plugged in for a long time.', 'Low daily mileage or a backup at home'],
  ['02', 'Level 2', 'Dedicated 208–240 V equipment', 'Charge while you sleep, work or shop. Your car’s onboard charger can limit speed.', 'Overnight charging and longer stops'],
  ['03', 'DC fast', 'Public fast-charging station', 'The quickest option when the car and station are compatible. Speed usually drops as the battery fills.', 'Road trips and shorter charging stops'],
];

function LevelDiagram({ number }) {
  return <svg viewBox="0 0 260 110" className="field-level-diagram" aria-hidden="true">
    <path d="M18 87h224M37 100h183" fill="none" stroke="currentColor" strokeWidth="1" opacity=".45"/>
    <path d="M28 22h13m-6-7v14M223 31h13m-6-6v12" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    {number === '01' ? <g stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
      <path d="M58 38h44v39H58z" fill="#f6edcf"/><path d="M72 48v7m15-7v7m-10 10h4" fill="none"/>
      <path d="M185 50c31-5 29 28 3 29-23 1-38-18-60-18m26-13h22v25h-22l-18-8V56z" fill="#bfceae"/><path d="M128 55h8m-8 11h8" fill="none"/>
    </g> : number === '02' ? <g stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
      <path d="M92 72h-9V35l8-9h45l7 11v35h-9" fill="#f6edcf"/><path d="M96 40h34v11H96z" fill="#d1f55a"/><path d="M104 59h17"/>
      <path d="M132 71c-6 20 16 23 34 19 14-3 23-13 13-28l-10-14" fill="none"/><path d="m155 37 14 4 4 11-9 7-10-6-5-10z" fill="#142e25"/>
    </g> : <g stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
      <path d="M101 17h48l12 9v57h-60z" fill="#8da282"/><path d="M92 23h57v61H92z" fill="#f6edcf"/><path d="M102 34h36v29h-36z" fill="#142e25"/><path d="M106 48q6 4 15 0t13 0v11h-28z" fill="#d1f55a" stroke="none"/>
      <path d="M103 73h34m-43 13h57m10-48c26-5 36 67 0 45-7-5-8-14-7-24" fill="none"/><path d="m159 66 13-6-4-9-10 2-6 4z" fill="#142e25"/>
    </g>}
  </svg>;
}

export default function ChargingGuide() {
  return <><EvLibraryNav current="/chargers"/><main data-field-page="chargers" className={styles.learning} id="main-content">
    <header className={"guide-mast "+styles.guideMast}>
      <div><p className="learning-label">NowCharged EV Library / Charging 101</p><h1>EV charging,<br/><em>decoded.</em></h1><p className={styles.guideDeck}>A Canadian driver’s reference for charging at home, on the road and everywhere in between. Start with a question or look up a vehicle.</p>
      <nav aria-label="In this guide"><a href="#guides">Find a guide</a><a href="#levels">Compare levels</a><a href="#connectors">Identify a plug</a><a href="#timing">Estimate time</a></nav></div>
      <aside className={styles.batteryCard+" field-learning-batteryCard"} aria-label="Reading a charge">
        <p className="learning-label">01 / Read the battery</p>
        <div className={styles.batteryIcon} aria-hidden="true"><i/><i/><i/><i/><i/></div>
        <strong>20% <span aria-hidden="true">→</span><span className="sr-only">to</span> 80%</strong>
        <p>On a 60 kWh usable battery, that’s 36 kWh added.</p>
        <a href="/tools">Try your numbers</a>
      </aside>
    </header>
    <section className="guide-section" id="guides">
      <p className="learning-label">Reference desk / Canadian charging</p><h2>Start with a question.</h2>
      <p>Get a quick answer, a practical checklist and the original sources for each guide.</p>
      <TopicFinder topics={chargingTopics.map(({slug,code,title,summary,tags})=>({slug,code,title,summary,tags}))}/>
    </section>
    <section className="guide-section" aria-labelledby="other-ev-resources">
      <p className="learning-label">The rest of the library</p><h2 id="other-ev-resources">Research your next move.</h2>
      <ul className={styles.topicGrid}><li><span className="learning-label">01 / VEHICLE DATA</span><a href="/ev-database">Compare Canadian EV ratings</a><p>Look up official rated range and energy use by model year, make and model.</p></li>
      <li><span className="learning-label">02 / OWNER HANDBOOK</span><a href="/ev-101">Start with EV 101</a><p>Buying, owning and road-tripping an EV in Canada, including winter planning.</p></li>
      <li><span className="learning-label">03 / PLANNING TOOL</span><a href="/tools">Calculate charging time and energy cost</a><p>Use your own battery, target and average charger power rather than a headline speed.</p></li></ul>
    </section>
    <section className="guide-section" id="levels"><p className="learning-label">01 / The charger</p><h2>Where are you stopping?</h2>
      <div className="guide-comparison">{levels.map(([num, name, supply, description, use]) => <article key={num}><p className="field-level-id" aria-hidden="true">FIG. {num} / CHARGE SOURCE</p><LevelDiagram number={num}/><h3>{name}</h3><p><strong>{supply}</strong></p><p>{description}</p><p className="guide-use"><strong>Best for</strong><br/>{use}</p></article>)}</div>
    </section>
    <section className="guide-section guide-split" id="connectors"><div><p className="learning-label">02 / The connector</p><h2>A fast charger isn’t useful if the plug doesn’t fit.</h2><p>Check your exact vehicle and the station’s connector before you head out.</p></div>
      <dl><div><dt>J1772</dt><dd>AC charging on many North American EVs, often at Level 2.</dd></div><div><dt>CCS1</dt><dd>A DC fast-charging connector with two extra pins below the J1772-style section.</dd></div><div><dt>NACS / J3400</dt><dd>The same compact connector shape can support AC and DC. A matching plug doesn’t guarantee access to a specific station or network.</dd></div><div><dt>CHAdeMO</dt><dd>A separate DC fast-charging connector used by some older vehicles. Check station availability before leaving.</dd></div></dl>
    </section>
    <section className="guide-section guide-split" id="timing"><div><p className="learning-label">03 / The clock</p><h2>Power isn’t energy.</h2><p><strong>kW</strong> tells you how quickly electricity is flowing. <strong>kWh</strong> tells you how much energy you’ve added.</p><a className="learning-cta" href="/tools">Open the charging estimator</a></div>
      <div className="guide-example"><p className="learning-label">A worked example</p><b>36 kWh</b><p>Added to a 60 kWh usable battery charging from 20% to 80%. At a sustained 60 kW <em>into the battery</em>, that’s 36 minutes plugged in. A station’s advertised peak is not the rate your car gets throughout a session.</p></div>
    </section>
    <section className="guide-section guide-split" id="station-finder"><div><p className="learning-label">Find a charger</p><h2>Use the map to plan. Use the network to confirm.</h2></div><div><p>Find a backup charger before you need it. Check the operator’s live status, connector, access hours and price for the exact site. The public map is a directory, not a live availability guarantee.</p><a className="learning-cta" href="https://natural-resources.canada.ca/energy-efficiency/transportation-energy-efficiency/electric-charging-alternative-fuelling-stationslocator-map" rel="noreferrer">Open Canada’s public charger map</a></div></section>
    <p className="guide-source">More on charging options and connectors: <a href="https://natural-resources.canada.ca/energy-efficiency/transportation-energy-efficiency/electric-vehicles/electric-vehicle-charging" rel="noreferrer">Natural Resources Canada</a>.</p>
  </main></>;
}
