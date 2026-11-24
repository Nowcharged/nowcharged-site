// One cross-section with a near and far wall. SVG Y points down.
const X=[219,231,240,253,271,290,309,327,340,349,364];
const clamp=(n,a=0,b=1)=>Math.min(b,Math.max(a,n));
const smooth=n=>{n=clamp(n);return n*n*(3-2*n)};
const gauss=(x,at,w)=>Math.exp(-(((x-at)/w)**2));
const pulse=(t,at,w)=>gauss(t,at,w);
const n=v=>v.toFixed(1);

function surface(x,t,back){
  const p=(clamp(x,231,349)-231)/118;
  const pour=smooth((t-.02)/2.43);
  const damp=smooth((5.15-t)/2.15);
  const awake=smooth(t/.42);
  // Fundamental swing plus a softer traveling overtone. The end envelope brings
  // both elevation and velocity to zero, rather than snapping to a still frame.
  const a=awake*damp*(8.6+7.8*pulse(t,2.3,.68));
  const swing=a*Math.cos(Math.PI*p)*Math.sin(5.9*t-.26);
  const overtone=(awake*damp)*(3.7*Math.sin(4.9*t-6.2*p+(back?.74:0))+2.1*Math.sin(10*t+3.5*p));
  // The advancing crest climbs one wall, peels inward, then returns off the other.
  const rightAt=.96-.20*clamp((t-2.28)/.47);
  const leftAt=.04+.18*clamp((t-2.95)/.52);
  const slam=-(22*pulse(t,2.33,.24)*gauss(p,rightAt,.125)+17*pulse(t,3,.24)*gauss(p,leftAt,.14))*(back?.56:1);
  const rim=1.7*(gauss(p,0,.07)+gauss(p,1,.07));
  const y=281-73*pour+swing*(back?.66:1)+overtone+slam-rim;
  // Keep the back edge behind the crest even at maximum wall run-up.
  return back ? Math.min(y-10.4-2.8*Math.sin(Math.PI*p),surface(x,t,false)-4.5) : y;
}

function curve(points,move="M"){
  let out=move+n(points[0][0])+' '+n(points[0][1]);
  for(let i=1;i<points.length;i++){
    const [x0,y0]=points[i-1], [x1,y1]=points[i];
    const [xp,yp]=points[Math.max(0,i-2)], [xn,yn]=points[Math.min(points.length-1,i+1)];
    const dx=(x1-x0)/3;
    const m0=(y1-yp)/(x1-xp),m1=(yn-y0)/(xn-x0);
    out+='C'+n(x0+dx)+' '+n(y0+dx*m0)+' '+n(x1-dx)+' '+n(y1-dx*m1)+' '+n(x1)+' '+n(y1);
  }
  return out;
}

function drop(t,start,x0,vx){
  const q=(t-start)/.48;
  if(q<=0||q>=1)return "";
  const r=smooth(q/.14)*smooth((1-q)/.23);
  const x=x0+q*vx,y=surface(x0,t,false)-1-18*4*q*(1-q);
  return 'M'+n(x-2.8*r)+' '+n(y+2*r)+'Q'+n(x-2*r)+' '+n(y-3.7*r)+' '+n(x+vx*.17*r)+' '+n(y-6.2*r)+
    'Q'+n(x+4*r)+' '+n(y-3*r)+' '+n(x+2.7*r)+' '+n(y+2.1*r)+'Q'+n(x)+' '+n(y+5.4*r)+' '+n(x-2.8*r)+' '+n(y+2*r)+'Z';
}

export function frame(timeSeconds){
  const t=Number.isFinite(timeSeconds)?clamp(timeSeconds,0,6):6;
  const front=X.map(x=>[x,surface(x,t,false)]);
  const back=X.map(x=>[x,surface(x,t,true)]).reverse();
  const edge=curve(front);
  const cap=edge+curve(back,'L')+'Z';
  // The large submerged cel contour follows the crest but lags its traveling
  // motion, instead of receding as a rigid shape painted on the glass.
  const colors=X.map(x=>{
    const q=(clamp(x,231,349)-231)/118, delayed=surface(x,Math.max(0,t-.15),false);
    return [x,Math.max(surface(x,t,false)+9,delayed+20+13*Math.sin(Math.PI*q)+4*Math.sin(q*6.1-t*2)*smooth(Math.max(0,5.15-t)/2.15))];
  });
  const depth=curve(colors)+'L364 325H219Z';
  const xs=[242,253,269,283,297,306];
  const sheen=curve(xs.map((x,i)=>[x,surface(x,t,false)-2.7-2.6*Math.sin(i*Math.PI/(xs.length-1))]));
  return {body:edge+'L364 325H219Z',cap,depth,sheen,edge,splashA:drop(t,2.30,345,-14),splashB:drop(t,2.99,236,12)};
}
