const entries = [
  ["/chargers", "Charging 101"],
  ["/ev-101", "EV 101"],
  ["/ev-database", "Vehicle database"],
  ["/tools", "Charging calculator"],
];

export default function EvLibraryNav({ current }) {
  return <header className="ev-library-bar" data-ev-library>
    <div className="ev-library-bar__inner">
      <a className="ev-library-brand" href="/chargers"><span aria-hidden="true" className="ev-library-mark">NC</span><span>EV Library<span className="ev-library-by">by NowCharged</span></span></a>
      <nav aria-label="EV Library">{entries.map(([url,label]) => <a key={url} href={url} aria-current={current === url ? "page" : undefined}>{label}</a>)}</nav>
    </div>
  </header>;
}
