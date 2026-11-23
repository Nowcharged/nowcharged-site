import "./globals.css";
import { isLiveHost, productionOrigin } from "./release";

export async function generateMetadata() {
  const isLive = await isLiveHost();
  return {
  metadataBase: new URL(productionOrigin),
  title: { default: "NowCharged | Toronto & GTA Car Valet", template: "%s | NowCharged" },
  description: "Door-to-door EV charging valet and dealership pickup and return in Toronto and the Greater Toronto Area.",
  icons: { icon: "/dispatch-icon.svg" },
  robots: { index: isLive, follow: isLive },
  formatDetection: { telephone: false, email: false, address: false },
  };
}

const services = [
  ["EV charging", "/services/ev-charging"],
  ["Dealership pickup", "/services/dealership-pickup"],
];
const resources = [
  ["Charging 101", "/chargers"],
  ["EV tools", "/tools"],
  ["Service area", "/coverage"],
  ["How we handle your car", "/trust"],
  ["FAQ", "/faq"],
  ["Careers", "/careers"],
];

function Brand() {
  return <a href="/" className="nc-brand" aria-label="NowCharged home"><svg width="34" height="34" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="6" fill="currentColor"/><path d="M17.5 4.8 8 17h7.1l-.7 10.2 9.6-12.7h-7.2z" fill="#def56a"/></svg><span>Now<span className="nc-brand-end">Charged</span></span></a>;
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
            <details className="nc-nav-more"><summary>Driver resources <span aria-hidden="true">+</span></summary><div>{resources.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div></details>
          </nav>
          <a className="nc-button nc-button--dark nc-head-cta" href={isLive ? "/request?service=ev" : "/request"}>{isLive ? "Request EV charging" : "Explore a pickup"} <span aria-hidden="true">↗</span></a>
          <details className="nc-mobile-menu"><summary>Menu <span aria-hidden="true">+</span></summary><nav aria-label="Mobile navigation">{[...services, ["Pricing", "/pricing"], ...resources, [isLive ? "Request EV charging" : "Explore a pickup", isLive ? "/request?service=ev" : "/request"]].map(([label,href]) => <a key={href} href={href}>{label}<span aria-hidden="true">↗</span></a>)}</nav></details>
        </div></header>
        <div id="content" tabIndex={-1}>{children}</div>
        <footer className="nc-footer"><div className="nc-shell">
          <div className="nc-foot-top"><div><Brand /><p>We take the car.<br/>You keep your day.</p></div><nav aria-label="Services"><h2>THE VALET</h2>{[...services, ["Pricing", "/pricing"], ["Service area", "/coverage"]].map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav><nav aria-label="Help"><h2>DRIVER RESOURCES</h2>{resources.filter(([,href]) => href !== "/coverage").map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav></div>
          <div className="nc-foot-bottom"><span>NOWCHARGED · TORONTO &amp; GTA</span>{!isLive && <span>PREVIEW ONLY · NOT TAKING BOOKINGS</span>}</div>
        </div></footer>
      </body>
    </html>
  );
}
