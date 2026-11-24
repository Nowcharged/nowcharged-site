import FieldPlate from "./field-plate";

export const metadata={title:{absolute:"NowCharged | Southern Ontario Charging Solutions"},description:"Meet NowCharged, the EV charging valet for Toronto and the GTA.",alternates:{canonical:"/"}};

export default function Introduction(){
 return <main className="intro-screen"><div className="intro-wrap">
 <div className="intro-scene"><div className="intro-caption"><p className="intro-brand">NowCharged</p><h1>Meet your<br/><em>EV valet.</em></h1><p>Pickup, charging and return in Toronto and the GTA.</p><a className="nc-button lab-primary intro-enter" href="/home">Enter NowCharged <span aria-hidden="true">→</span></a></div><FieldPlate/></div>
 </div></main>
}
