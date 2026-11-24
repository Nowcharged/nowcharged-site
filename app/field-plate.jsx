"use client";
import { useCallback, useEffect, useId, useRef } from "react";
import { frame } from "./field-fluid";
import styles from "./field-plate.module.css";

const still=frame(6);
const paths=["body","depth","cap","edge","sheen","splashA","splashB"];
const glass="M231 171q0-5 6-5H343q6 0 6 7l-4 125q0 7-5 7H237q-6-1-6-7z";
const runtime=4680;

export default function FieldPlate(){
 const clipId=useId();
 const art=useRef(null), image=useRef(null), elements=useRef({}), start=useRef(null);
 const assign=useCallback((name,node)=>{elements.current[name]=node},[]);
 useEffect(()=>{
   const media=window.matchMedia("(prefers-reduced-motion: reduce)");
   let id=0, observer, visible=false, hasPlayed=false, firstFrame;
   const paint=current=>{
     const data=current===6 ? still : frame(current);
     paths.forEach(name=>{
       const node=elements.current[name];
       if(node) node.setAttribute("d",data[name]);
     });
   };
   const cancel=()=>{cancelAnimationFrame(id);firstFrame=undefined};
   const advance=now=>{
     if(firstFrame===undefined)firstFrame=now;
     const elapsed=now-firstFrame;
     if(elapsed>=runtime){paint(6);return;}
     paint(elapsed/runtime*5.2);
     id=requestAnimationFrame(advance);
   };
   const replay=()=>{
     cancel();
     if(media.matches){paint(6);return;}
     hasPlayed=true;
     paint(0);
     id=requestAnimationFrame(advance);
   };
   start.current=replay;
   const ready=()=>{if(!media.matches&&!hasPlayed&&visible&&image.current?.complete&&image.current?.naturalWidth)replay()};
   if("IntersectionObserver" in window) {
     observer=new IntersectionObserver(([entry])=>{
       if(entry.isIntersecting){visible=true;ready();observer.disconnect()}
     },{threshold:.18});
     if(art.current) observer.observe(art.current);
   } else visible=true;
   const img=image.current;
   img?.addEventListener("load",ready);
   const resetPreference=()=>{if(media.matches){cancel();paint(6)}else ready()};
   media.addEventListener("change",resetPreference);
   ready();
   return ()=>{
     cancel();
     observer?.disconnect();
     img?.removeEventListener("load",ready);
     media.removeEventListener("change",resetPreference);
     start.current=null;
   };
 },[]);
 const path=(name,props)=><path ref={node=>assign(name,node)} d={still[name]} {...props}/>;
 return <figure className="field-plate">
   <div className="plate-head"><span><i aria-hidden="true"/> EQUIPMENT PLATE</span><b>NC / 003</b></div>
   <div ref={art} className={styles.art} role="img" aria-label="Retro cutaway illustration of a Level 3 DC fast charger, with lime-green liquid in its glass chamber.">
     <img ref={image} className="plate-art" src="/field-unit-v2.svg" width="560" height="430" alt="" fetchPriority="high"/>
     <svg aria-hidden="true" focusable="false" className={styles.chamber} viewBox="0 0 560 430" xmlns="http://www.w3.org/2000/svg">
       <defs><clipPath id={clipId}><path d={glass}/></clipPath></defs>
       <g clipPath={`url(#${clipId})`}>
         {path("body",{fill:"#a8df50"})}
         {path("depth",{fill:"#80bc41"})}
         {path("cap",{fill:"#d9f779",stroke:"#718a38",strokeWidth:"1.4",strokeLinejoin:"round"})}
         {path("edge",{fill:"none",stroke:"#3f773a",strokeWidth:"1.8"})}
         {path("sheen",{fill:"none",stroke:"#f7ffd4",strokeWidth:"2.5",strokeLinecap:"round"})}
         {path("splashA",{fill:"#d9f779",stroke:"#55783b",strokeWidth:"1.1"})}
         {path("splashB",{fill:"#d9f779",stroke:"#55783b",strokeWidth:"1.1"})}
         <path d="M344 165h8v140h-17zM232 168h7l-1 138h-8z" fill="#244e38" opacity=".28"/>
         <path d="M237 186l26-14m-18 22 16-9" stroke="#f5ffde" strokeWidth="2.5" strokeLinecap="round" opacity=".38"/>
         <path d="M337 179h8m-5 20h5m-8 20h8m-5 20h5m-8 20h8m-5 20h5" stroke="#f4f6d2" strokeWidth="1.25" opacity=".76"/>
       </g>
       <path d={glass} fill="none" stroke="#1a3628" strokeWidth="1.7"/>
     </svg>
   </div>
   <figcaption><div><small>FIG. 03</small><strong>DC fast charger</strong></div>
     <button className="plate-replay" type="button" onClick={()=>start.current?.()} aria-label="Replay charger animation"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 10a8 8 0 1 1 2 8M4 4v6h6"/></svg>Replay</button>
   </figcaption>
 </figure>;
}
