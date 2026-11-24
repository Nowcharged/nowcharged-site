import FieldPlate from "./field-plate";
import { isLiveHost } from "./release";

export const metadata={title:{absolute:"NowCharged | Southern Ontario Charging Solutions"},description:"Meet NowCharged, the EV charging valet for Toronto and the GTA. Enter to explore the service or request a callback.",alternates:{canonical:"/"}};

export default async function Introduction(){
 const live=await isLiveHost();
 return <main className="intro-screen"><div className="intro-wrap"><header className="intro-mast"><b>NowCharged</b><span>SOUTHERN ONTARIO CHARGING SOLUTIONS</span><a href="/home">Skip intro <span aria-hidden="true">↗</span></a></header>
 <div className="intro-scene"><div className="intro-caption"><p className="lab-over"><span className="print-notch"/> TORONTO + GTA</p><h1>Meet your<br/><em>EV valet.</em></h1><p>Your EV, picked up, charged and returned. You keep your day.</p><div className="intro-links"><a className="nc-button lab-primary" href="/home">Enter site <span aria-hidden="true">→</span></a><a className="lab-link" href="/request?service=ev">{live?"Request an EV callback":"Preview an EV callback"}</a></div></div><FieldPlate/></div>
 <footer className="intro-strip"><span>NOWCHARGED / FIELD SERIES</span><span>01 &nbsp; PICKUP &nbsp; / &nbsp; 02 &nbsp; CHARGE &nbsp; / &nbsp; 03 &nbsp; RETURN</span></footer></div></main>
}
