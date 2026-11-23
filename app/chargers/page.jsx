import styles from "./learning.module.css";

export const metadata = { title: 'Charging 101', alternates: { canonical: "/chargers" } };

const levels = [
  ['01', 'Level 1', 'Standard 120 V outlet', 'A slow top-up when you can leave the car plugged in for a long time.', 'Low daily mileage or a backup at home'],
  ['02', 'Level 2', 'Dedicated 208–240 V equipment', 'Charge while you sleep, work or shop. Your car’s onboard charger can limit speed.', 'Overnight charging and longer stops'],
  ['03', 'DC fast', 'Public fast-charging station', 'The quickest option when the car and station are compatible. Speed usually drops as the battery fills.', 'Road trips and shorter charging stops'],
];

export default function ChargingGuide() {
  return <main className={styles.learning} id="main-content">
    <header className={"guide-mast "+styles.guideMast}>
      <div><p className="learning-label">Charging 101 / The field guide</p><h1>EV charging, decoded.</h1><p className={styles.guideDeck}>The three kinds of chargers, the plugs that fit, and how to estimate the time you’ll actually spend plugged in.</p>
      <nav aria-label="In this guide"><a href="#levels">01 Charger levels</a><a href="#connectors">02 Plugs</a><a href="#timing">03 Time</a></nav></div>
      <aside className={styles.batteryCard} aria-label="Reading a charge">
        <p className="learning-label">01 / Read the battery</p>
        <div className={styles.batteryIcon} aria-hidden="true"><i/><i/><i/><i/><i/></div>
        <strong>20% <span aria-hidden="true">→</span><span className="sr-only">to</span> 80%</strong>
        <p>On a 60 kWh usable battery, that’s 36 kWh added.</p>
        <a href="/tools">Try your numbers <span aria-hidden="true">↗</span></a>
      </aside>
    </header>
    <section className="guide-section" id="levels"><p className="learning-label">01 / The charger</p><h2>Where are you stopping?</h2>
      <div className="guide-comparison">{levels.map(([num, name, supply, description, use]) => <article key={num}><span aria-hidden="true">{num}</span><h3>{name}</h3><p><strong>{supply}</strong></p><p>{description}</p><p className="guide-use"><strong>Best for</strong><br/>{use}</p></article>)}</div>
    </section>
    <section className="guide-section guide-split" id="connectors"><div><p className="learning-label">02 / The connector</p><h2>A fast charger isn’t useful if the plug doesn’t fit.</h2><p>Check your exact vehicle and the station’s connector before you head out.</p></div>
      <dl><div><dt>J1772</dt><dd>AC charging on many North American EVs, often at Level 2.</dd></div><div><dt>CCS1</dt><dd>A DC fast-charging connector with two extra pins below the J1772-style section.</dd></div><div><dt>NACS / J3400</dt><dd>The same compact connector shape can support AC and DC. A matching plug doesn’t guarantee access to a specific station or network.</dd></div><div><dt>CHAdeMO</dt><dd>A separate DC fast-charging connector used by some older vehicles. Check station availability before leaving.</dd></div></dl>
    </section>
    <section className="guide-section guide-split" id="timing"><div><p className="learning-label">03 / The clock</p><h2>Power isn’t energy.</h2><p><strong>kW</strong> tells you how quickly electricity is flowing. <strong>kWh</strong> tells you how much energy you’ve added.</p><a className="learning-cta" href="/tools">Open the charging estimator ↗</a></div>
      <div className="guide-example"><p className="learning-label">A worked example</p><b>36 kWh</b><p>Added to a 60 kWh usable battery charging from 20% to 80%. At a sustained 60 kW <em>into the battery</em>, that’s 36 minutes plugged in. A station’s advertised peak is not the rate your car gets throughout a session.</p></div>
    </section>
    <p className="guide-source">More on charging options and connectors: <a href="https://natural-resources.canada.ca/energy-efficiency/transportation-energy-efficiency/electric-vehicles/electric-vehicle-charging" rel="noreferrer">Natural Resources Canada</a>.</p>
  </main>;
}
