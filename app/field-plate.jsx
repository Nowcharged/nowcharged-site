"use client";
import { useState } from "react";

export default function FieldPlate(){
 const [take,setTake]=useState(0);
 return <figure className="field-plate">
   <div className="plate-head"><span><i aria-hidden="true"/> EQUIPMENT PLATE</span><b>NC / 003</b></div>
   <picture><source media="(prefers-reduced-motion: reduce)" srcSet="/field-unit-still.svg"/><img className="plate-art" src={"/field-unit.svg"+(take ? "?replay="+take : "")} width="560" height="430" alt="A cutaway illustration of a Level 3 fast charger. Lime-green liquid rises and sloshes inside its glass chamber." fetchPriority="high"/></picture>
   <figcaption><div><small>FIG. 03</small><strong>DC fast charger</strong></div><button className="plate-replay" type="button" onClick={()=>setTake(Date.now())} aria-label="Replay charger animation"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 10a8 8 0 1 1 2 8M4 4v6h6"/></svg>Replay</button></figcaption>
 </figure>;
}
