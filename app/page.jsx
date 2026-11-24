import FieldPlate from "./field-plate";
import { isLiveHost, productionOrigin } from "./release";

export const metadata={title:{absolute:"NowCharged | EV Charging Valet in Mississauga & the GTA"},description:"Get time back with NowCharged. We pick up your EV, take it to a compatible fast charger and bring it back in Mississauga, Toronto and the GTA.",alternates:{canonical:"/"}};

const siteIdentity = {
 "@context": "https://schema.org",
 "@graph": [
  { "@type": "Organization", "@id": productionOrigin + "/#organization", name: "NowCharged", url: productionOrigin + "/", logo: productionOrigin + "/nowcharged-logo.svg" },
  { "@type": "WebSite", "@id": productionOrigin + "/#website", name: "NowCharged", url: productionOrigin + "/", publisher: { "@id": productionOrigin + "/#organization" } }
 ]
};

export default async function Introduction(){
 const live = await isLiveHost();
 return <main className="intro-screen"><div className="intro-wrap">
 {live && <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(siteIdentity).replace(/</g,"\\u003c")}}/>}
 <div className="intro-scene"><div className="intro-caption"><p className="intro-brand">NowCharged</p><h1>Meet your<br/><em>EV valet.</em></h1><p>We pick up your EV, fast-charge it and bring it back. Serving Mississauga, Toronto and the GTA.</p><a className="nc-button lab-primary intro-enter" href="/home">Enter NowCharged <span aria-hidden="true">→</span></a></div><FieldPlate/></div>
 </div></main>
}
