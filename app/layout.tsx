import "./globals.css";
import "./field-lab.css";
import "./inner-lab.css";
import { isLiveHost, productionOrigin } from "./release";

export async function generateMetadata() {
  const isLive = await isLiveHost();
  return {
  metadataBase: new URL(productionOrigin),
  title: { default: "NowCharged | EV Charging Valet", template: "%s | NowCharged" },
  description: "NowCharged picks up your EV, takes it to a compatible public fast charger and returns it. Check pickup availability in Mississauga, Toronto and the GTA.",
  icons: { icon: "/nowcharged-logo.svg" },
  robots: { index: isLive, follow: isLive },
  formatDetection: { telephone: false, email: false, address: false },
  };
}

const services = [
  ["EV charging valet", "/services/ev-charging"],
  ["Service area", "/coverage"],
];
const resources = [
  ["EV Library", "/chargers"],
  ["EV vehicle database", "/ev-database"],
  ["Dealership pickup (planned)", "/services/dealership-pickup"],
  ["How we handle your car", "/trust"],
  ["FAQ", "/faq"],
  ["Careers", "/careers"],
];

function NavArrow(){return <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M3 13 13 3M4 3h9v9"/></svg>}

function Brand() {
  return <a href="/home" className="nc-brand" aria-label="NowCharged home"><svg width="46" height="38" viewBox="0 0 54 43" fill="none" aria-hidden="true"><ellipse cx="27" cy="21.5" rx="18" ry="18.8" transform="rotate(16 27 21.5)" fill="#cce967" stroke="#16392b" strokeWidth="2.7"/><path d="M11 17.5C3 21.6.9 24.8 2.7 27.4c2.3 3.4 16.6 2.5 30.2-1.5 12.6-3.7 21.2-8.4 18.2-12.3-1.1-1.5-5-1.7-9.6-1.4" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/><path d="m30 6-16 19 11-1-2 13 16-22-11 2z" fill="#17392d" stroke="#cce967" strokeWidth=".8"/></svg><span>Now<span className="nc-brand-end">Charged</span></span></a>;
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const isLive = await isLiveHost();
  return (
    <html lang="en-CA">
      <body>
        <a className="nc-skip" href="#content">Skip to content</a>
        {!isLive && <div className="nc-preview"><div className="nc-shell"><b>WEBSITE PREVIEW</b><span>Requests and bookings are disabled.</span></div></div>}
        <header className="nc-header"><div className="nc-shell nc-head-inner">
          <Brand />
          <nav className="nc-desktop-nav" aria-label="Main navigation">
            {services.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
            <a href="/pricing">Pricing</a>
            <details className="nc-nav-more"><summary>More <span aria-hidden="true">+</span></summary><div>{resources.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div></details>
          </nav>
          <a className="nc-button nc-button--dark nc-head-cta" href={"/request?service=ev"}>{isLive ? "Request EV callback" : "Preview EV callback"} <NavArrow/></a>
          <details className="nc-mobile-menu"><summary>Menu <span aria-hidden="true">+</span></summary><nav aria-label="Mobile navigation">{[...services, ["Pricing", "/pricing"], ...resources, [isLive ? "Request EV callback" : "Preview EV callback", "/request?service=ev"]].map(([label,href]) => <a key={href} href={href}>{label}<NavArrow/></a>)}</nav></details>
        </div></header>
        <div id="content" tabIndex={-1}>{children}</div>
        <footer className="nc-footer"><div className="nc-shell">
          <div className="nc-foot-top"><div><Brand /><p>Southern Ontario<br/>Charging Solutions.</p></div><nav aria-label="Services"><h2>THE VALET</h2>{[...services, ["Pricing", "/pricing"]].map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav><nav aria-label="Help"><h2>DRIVER RESOURCES</h2>{resources.filter(([,href]) => href !== "/coverage").map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav></div>
          <div className="nc-foot-bottom"><span>NOWCHARGED · TORONTO &amp; GTA</span>{!isLive && <span>PREVIEW ONLY · NOT TAKING BOOKINGS</span>}</div>
        </div></footer>
      </body>
    </html>
  );
}
