import EvLibraryNav from '../ev-library-nav';
import learning from '../chargers/learning.module.css';
import css from './handbook.module.css';
import { checked, glossary, sources } from './reference.mjs';

export const metadata = {
  title: 'EV 101 Canada: buying, range, winter driving and used EVs',
  description: 'A Canadian electric car handbook. Compare EV types and energy ratings, plan where to charge, prepare for winter and check a used EV before buying.',
  alternates: { canonical: '/ev-101' },
};

const chapters = [
  ['powertrains','Choose a powertrain'], ['charging-access','Plan your charging'],
  ['range','Compare range'], ['winter','Drive in winter'], ['buying-used','Check a used EV'],
  ['road-trips','Plan a road trip'], ['glossary','Look up a term'],
];

function Cite({ id, children }) {
  const [title, url, publisher] = sources[id];
  return <a className={css.source} href={url}>{children || publisher + ': ' + title}</a>;
}

function FieldPlate() {
  return <aside className={css.plate} aria-label="Example: weekly driving energy">
    <span className={css.eyebrow}>Field calculation / A typical week</span>
    <svg viewBox="0 0 288 108" role="img" aria-label="Electric car above a strip of five commute days">
      <path d="M8 76h272M24 83h22m9 0h25m156 0h27" stroke="#617859" strokeWidth="2" fill="none"/>
      <g fill="#e9e4ce" stroke="#20362b" strokeWidth="3" strokeLinejoin="round">
        <path d="m42 61 12-16 44-5 26-22h51l28 25 34 7 12 16-5 7H39z"/>
        <path d="m108 40 20-17h18l1 17zm45-17h18l23 20-40-3z" fill="#9db5a0"/>
        <path d="M56 49h24l-5 9H48m170-7 15 4 6 6h-18z" fill="#d1f55a"/>
        <circle cx="83" cy="69" r="14" fill="#20362b"/><circle cx="83" cy="69" r="6" fill="#d9d8ba"/>
        <circle cx="207" cy="69" r="14" fill="#20362b"/><circle cx="207" cy="69" r="6" fill="#d9d8ba"/>
      </g>
      {[0,1,2,3,4].map(i=><path key={i} d={`M${32+i*46} 100h35`} stroke="#698b49" strokeWidth="4"/>)}
    </svg>
    <strong>40 km/day × 5 days = 200 km</strong>
    <p>At an illustrative 20 kWh/100 km, that week uses 40 kWh on the same measurement basis. Start with your commute, not a brochure’s maximum range.</p>
  </aside>;
}

export default function Ev101() {
  return <><EvLibraryNav current="/ev-101" /><main className={learning.learning} id="main-content" data-field-page="ev-101">
    <header className={'guide-mast '+css.hero}>
      <div><p className="learning-label">NowCharged reference desk / EV 101</p>
        <h1>EV 101<span>.</span></h1>
        <p className={learning.guideDeck}>Start with three questions: what should I buy, where will I charge, and how far will it go?</p>
        <div className={css.actions}><a href="/ev-database">Look up a vehicle</a><a href="/chargers">Understand charging</a></div>
      </div>
      <FieldPlate/>
    </header>
    <section className={css.chapterIndex} aria-labelledby="ev101-start"><p className="learning-label">Pick a question</p><h2 id="ev101-start">Start here.</h2>
      <nav className={css.chapterNav} aria-label="Start with the basics">{chapters.slice(0,3).map(([id,title])=><a key={id} href={'#'+id}>{title}</a>)}</nav>
      <details className={css.moreChapters}><summary>More chapters and glossary</summary><nav className={css.chapterNav} aria-label="More handbook chapters">{chapters.slice(3).map(([id,title])=><a key={id} href={'#'+id}>{title}</a>)}</nav></details>
    </section>

    <section id="powertrains" className="guide-section"><p className="learning-label">01 / Powertrains</p><h2>Which cars actually plug in?</h2>
      <div className="guide-comparison">
        <article><span>BEV</span><h3>Battery electric</h3><p>No gasoline engine. Plugging in supplies the energy for your next trip.</p><p className="guide-use"><strong>Ask first:</strong> Where will I charge most weeks, and what’s my backup?</p></article>
        <article><span>PHEV</span><h3>Plug-in hybrid</h3><p>A rechargeable battery and a gasoline engine share the work. Some can use the engine even with charge remaining, depending on conditions and settings.</p><p className="guide-use"><strong>Compare both:</strong> Electric driving range and gasoline consumption after the plug-in charge is used.</p></article>
        <article><span>HEV</span><h3>Conventional hybrid</h3><p>The engine and regenerative braking supply energy to the hybrid system. There is no charging port to plug in.</p><p className="guide-use"><strong>Different comparison:</strong> Look at litres per 100 km, not a public charging time.</p></article>
      </div>
      <Cite id="guide">Check the powertrain definitions in Canada’s Fuel Consumption Guide (PDF)</Cite>
    </section>

    <section id="charging-access" className="guide-section guide-split">
      <div><p className="learning-label">02 / Your weekly routine</p><h2>Find an outlet in your schedule.</h2><p>You don’t need to own a driveway to consider an EV. You do need to know which parking stop can reliably double as a charging stop.</p>
        <a href="/chargers#levels" className="learning-cta">Compare charging levels</a></div>
      <ol className={css.steps}>
        <li><strong>Track one ordinary week.</strong>Write down your kilometres and where the car sits for several hours. Include the unglamorous trips: school pickup, groceries, late shifts.</li>
        <li><strong>At home or in a condo:</strong>Confirm permission to charge, whose circuit or station it is, and how electricity will be billed. For a new installation in an Ontario condo, start with the board or property manager. <Cite id="condo">Read the Ontario condo installation guide</Cite></li>
        <li><strong>At work or a public site:</strong>Check who may use it, hours, parking limits, price, connector and whether the car can stay long enough. A pin beside your office is not permission to park there.</li>
        <li><strong>Try your backup in person.</strong>Visit at the time you’d need it. Can you find the entrance, reach the cable, pay and leave? What would you do if all stalls were occupied?</li>
      </ol>
    </section>

    <section id="range" className="guide-section guide-split">
      <div><p className="learning-label">03 / Reading the numbers</p><h2>Range and efficiency answer different questions.</h2>
        <p><strong>Range (km)</strong> is distance under specified test conditions. <strong>Consumption (kWh/100 km)</strong> is energy for a given distance. A larger battery can take a less efficient vehicle farther, so compare both numbers.</p>
        <p>Use the Canadian listing for the exact model year and configuration. A U.S. EPA estimate or a European WLTP figure is not a like-for-like comparison with a Canadian rating.</p><Cite id="ratings">Check a model’s Canadian ratings</Cite></div>
      <aside className={css.math}><span className={css.eyebrow}>Worked example / Not a vehicle rating</span><b>180 km</b><p>A car with <strong>60 kWh usable</strong> goes from 80% to 20%: 36 kWh of battery energy is available. At a steady <strong>20 kWh/100 km drawn from the battery</strong>, 36 ÷ 20 × 100 = 180 km.</p>
        <p>That is planning arithmetic, not a safe distance guarantee. Wind, temperature, speed, load and elevation can change it. Don’t mix a battery-side number with a wall-meter measurement that already includes charging losses.</p><a href="/tools">Estimate energy, time and cost</a></aside>
    </section>

    <section id="winter" className="guide-section guide-split">
      <div><p className="learning-label">04 / Canadian winter</p><h2>The same battery, a different trip.</h2><p>In CAA’s 2025 Ottawa–Mont-Tremblant test, the vehicles in its range comparison travelled 14% to 39% less than their Canadian rated range in temperatures from −7°C to −15°C. That is one route and test, not a winter discount to apply to every car.</p><Cite id="winter">See CAA’s individual results and test conditions</Cite></div>
      <ol className={css.steps}>
        <li><strong>Before leaving:</strong>Warm the cabin while plugged in if the vehicle supports it. Check the forecast and your usual energy use on similar roads.</li>
        <li><strong>Before a fast-charge stop:</strong>Check the owner’s manual for battery preconditioning. A departure timer for cabin heat isn’t necessarily the same as battery preparation for fast charging.</li>
        <li><strong>During the drive:</strong>Watch the predicted arrival charge, not just the dashboard range. If the margin is shrinking, choose an earlier safe charging stop with an alternative nearby.</li>
      </ol>
    </section>

    <section id="buying-used" className="guide-section guide-split">
      <div><p className="learning-label">05 / Used EV inspection</p><h2>What a full battery icon won’t tell you.</h2>
        <p>A car showing 100% after charging is telling you how full it is, not how much usable capacity remains compared with new. Build your shopping list around evidence tied to the actual car.</p>
        <Cite id="recalls">Start the Canadian recall check</Cite></div>
      <ol className={css.steps}>
        <li><strong>Identify the exact car.</strong>Match the VIN, year, trim, battery option and original market to the paperwork. Photograph the charge port with permission. Ask which cables and manufacturer-approved adapters are included.</li>
        <li><strong>Ask for a battery assessment.</strong>Request a dated, vehicle-specific report and an explanation of its method and units. If the seller has only a dashboard estimate, ask an EV-qualified shop what it can test before you buy.</li>
        <li><strong>Read the warranty that goes with this VIN.</strong>Ask for the in-service date, remaining time and kilometres, transfer terms, exclusions and any capacity threshold. A warranty against a defect is not automatically a promise of a particular remaining range. <Cite id="warranty">See how one manufacturer separates battery and vehicle coverage</Cite></li>
        <li><strong>Check charging and service history.</strong>With the seller’s permission, test the charging method you expect to rely on. Ask about repairs, warning lights, outstanding recalls and completed recall work. A successful AC session doesn’t establish DC fast-charging performance.</li>
      </ol>
    </section>

    <section id="road-trips" className="guide-section guide-split">
      <div><p className="learning-label">06 / Out of town</p><h2>Plan the stop, not just the route.</h2>
        <p>Choose a primary stop and a backup you can still reach if the first site is unavailable. A second stall on the same property is a poor backup for a site-wide outage.</p><div className={css.actions}><a href="/tools">Open the estimator and station finder</a><a href="/chargers#connectors">Check your connector</a></div></div>
      <ol className={css.steps}>
        <li><strong>Before setting off:</strong>Match the connector, AC or DC capability and any approved adapter to your exact car. Check the operator’s access instructions and price, including parking, time-based or idle fees if listed.</li>
        <li><strong>As you approach:</strong>Check the operator’s current station status when safely parked or have a passenger check. A map entry doesn’t guarantee a working stall or space when you arrive.</li>
        <li><strong>At the station:</strong>Use the operator’s directions to start the session and verify the car is receiving energy. If it fails, note the stall ID and displayed error for the operator. Do not use visibly damaged equipment.</li>
        <li><strong>If the backup is no longer reachable:</strong>Park safely and contact roadside assistance rather than aiming for a charger outside your remaining range.</li>
      </ol>
    </section>

    <section id="glossary" className="guide-section"><p className="learning-label">07 / Owner’s glossary</p><h2>Decode the spec sheet.</h2>
      <dl className={css.glossary}>{glossary.map(([term,definition])=><div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}</dl>
    </section>
    <section id="sources" className="guide-section guide-split"><div><p className="learning-label">Reference notes</p><h2>Where these answers come from.</h2>
      <p>Source review: <time dateTime={checked}>November 25, 2026</time>. Examples are illustrative. For compatibility, warranties and charging features, the Canadian manual and terms for the specific vehicle take precedence.</p></div>
      <ul className={css.sources}>{Object.entries(sources).map(([key,[title,url,publisher]])=><li key={key}><strong>{publisher}:</strong> <a href={url}>{title}</a></li>)}</ul>
    </section>
    <div className={css.actions}><a href="/ev-database">Compare vehicles in the database</a><a href="/chargers">Read Charging 101</a><a href="#main-content">Back to top</a></div>
  </main></>;
}
