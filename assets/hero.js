/* Hero, in three acts.
   1. Full-bleed blue: the message types itself. DESIGN / IS NOT DECORATION. → IS PROGRESS. → IS CULTURE. → IS IDENTITY. → KOSOVA
   2. The blue contracts into the 540×334 wordmark and the editorial hero appears around it.
   3. E I G O O A jump out into the six initiative symbols; D S N / K S V close up, the box squares to 334 and turns 45° into the DSN KSV badge.
   Plays once per visit; Skip or a click jumps to the end. */
const Hero=(()=>{
  const RATIO=334/539.47;
  const M=.105, CAP=.317, TOP1=.135, TOP2=.548;     // margins / cap height / line tops, measured from the logo artwork
  const DROP=[[0,1],[0,3],[0,4],[1,1],[1,3],[1,5]]; // E I G (DESIGN) · O O A (KOSOVA)
  const KEYS=["festival","talk","shop","factory","academy","urban"];
  const EASE="cubic-bezier(.65,0,.2,1)";
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  let run=0,el={},G={},done=false;

  const wait=(ms,id)=>new Promise((res,rej)=>setTimeout(()=>id===run?res():rej("x"),ms));
  const anim=(node,kf,o)=>{const a=node.animate(kf,{fill:"forwards",easing:"cubic-bezier(.16,1,.3,1)",...o});
    const p=a.finished.then(()=>{try{a.commitStyles();a.cancel()}catch(e){}});p.catch(()=>{});return p};   // skip/resize cancels quietly; awaiting callers still stop
  const ctx=document.createElement("canvas").getContext("2d");
  function metrics(f){ctx.font=`400 ${f}px "Unica One"`;const m=ctx.measureText("H");const asc=m.fontBoundingBoxAscent??f*.94,desc=m.fontBoundingBoxDescent??f*.24;return{base:(f-(asc+desc))/2+asc,cap:m.actualBoundingBoxAscent}}
  const widths=(t,f)=>{ctx.font=`400 ${f}px "Unica One"`;return [...t].map(c=>ctx.measureText(c).width)};

  function geom(){
    const r=el.stage.getBoundingClientRect();
    const W=Math.min(r.width*.74,600,(r.height-170)/RATIO),H=W*RATIO;
    G={W,H,f:CAP*H/(metrics(100).cap/100)};
    Object.assign(el.box.style,{width:W+"px",height:H+"px",transform:"translate(-50%,-50%)",opacity:1});
    Object.assign(el.badge.style,{width:H*Math.SQRT2+"px",height:H*Math.SQRT2+"px",transform:"translate(-50%,-50%)",opacity:0});
  }
  // a justified line, like the wordmark: [{c,x,y,f}] in box coordinates
  function layout(text,line,boxW){
    const {H}=G;let f=G.f;const left=M*boxW,lw=boxW-2*left;
    let ws=widths(text,f),sum=ws.reduce((a,b)=>a+b,0);
    const gap=text.length>1?(lw-sum)/(text.length-1):0,y=(line?TOP2:TOP1)*H+CAP*H-metrics(f).base;
    let x=left;return [...text].map((c,i)=>{const o={c,x,y,f};x+=ws[i]+gap;return o});
  }
  function spawn(text,line){
    return layout(text,line,G.W).map(p=>{const s=document.createElement("span");s.className="ch";s.textContent=p.c;
      Object.assign(s.style,{left:p.x+"px",top:p.y+"px",fontSize:p.f+"px"});el.box.appendChild(s);return s});
  }
  const caption=t=>{const s=el.cap.firstElementChild;s.classList.add("out");setTimeout(()=>{s.textContent=t;s.classList.remove("out")},260)};
  const lit=(i,on=true)=>document.querySelector(`.idx .slot[data-i="${i}"]`)?.classList.toggle("lit",on);
  const reveal=on=>{el.hero.classList.toggle("pre",!on);if(on)[...el.hero.querySelectorAll(".hero-copy>*>*,.idx li,.stage-meta")].forEach((n,i)=>n.style.transitionDelay=i*45+"ms")};

  // typing on the intro
  const caretEl=()=>{const c=document.createElement("span");c.className="caret";return c};
  async function type(line,text,id,ms=62){const tn=line.firstChild;for(const ch of text){tn.data+=ch;await wait(ms+(ch===" "?40:Math.random()*40),id)}}
  async function erase(line,keep,id,ms=26){const tn=line.firstChild;while(tn.data.length>keep){tn.data=tn.data.slice(0,-1);await wait(ms,id)}}
  function setLine(line,text){line.textContent="";line.append(document.createTextNode(text),caretEl())}

  const chrome=(intro,notop)=>{document.body.classList.toggle("in-intro",intro);document.body.classList.toggle("notop",notop)};
  async function intro(id){
    chrome(true,true);el.intro.hidden=false;el.intro.style.clipPath="inset(0)";el.introType.style.opacity=1;
    setLine(el.t1,"");el.t2.textContent="";
    await wait(500,id);
    await type(el.t1,"DESIGN",id,90);
    el.t1.lastChild.remove();setLine(el.t2,"");
    await wait(250,id);
    for(const [w,hold] of [["IS NOT DECORATION.",1100],["IS PROGRESS.",800],["IS CULTURE.",800],["IS IDENTITY.",800]]){
      await type(el.t2,w.slice(el.t2.textContent.length),id);await wait(hold,id);
      await erase(el.t2,w.startsWith("IS IDENTITY")?0:3,id);
    }
    await wait(200,id);
    await type(el.t2,"KOSOVA",id,95);
    await wait(900,id);
  }
  // the blue contracts into the wordmark box
  async function contract(id){
    const h=el.intro.getBoundingClientRect(),b=el.box.getBoundingClientRect();
    const to=`inset(${b.top-h.top}px ${h.right-b.right}px ${h.bottom-b.bottom}px ${b.left-h.left}px)`;
    anim(el.introType,[{opacity:1},{opacity:0}],{duration:380});
    chrome(false,true);   // header leaves the blue and moves up as it contracts
    el.box.style.opacity=1;
    await anim(el.intro,[{clipPath:"inset(0px 0px 0px 0px)"},{clipPath:to}],{duration:1100,easing:EASE});
    el.intro.hidden=true;
  }
  async function play(id,withIntro){
    done=false;
    el.box.querySelectorAll(".ch").forEach(n=>n.remove());KEYS.forEach((k,i)=>lit(i,false));
    geom();el.strike.style.display="none";
    const lines=[spawn("DESIGN",0),spawn("KOSOVA",1)];
    if(withIntro){reveal(false);el.box.style.opacity=0;await intro(id);await contract(id)}
    reveal(true);caption("Design Kosova. From Prishtina, to the world.");
    await wait(withIntro?900:600,id);
    // vowels jump out into the initiative symbols
    DROP.forEach(([ln,ix],n)=>setTimeout(()=>id===run&&fly(lines[ln][ix],n),n*110));
    await wait(380,id);
    // consonants close up, the box squares
    // the real badge artwork waits, upright, exactly over the square the box becomes;
    // the consonants close up onto its letters (same centres, same cap height)
    const {H}=G,T=badgeTargets();
    [[0,2,5],[0,2,4]].forEach((ids,ln)=>{const t=layout(ln?"KSV":"DSN",ln,H);ids.forEach((ix,k)=>{const s=lines[ln][ix],p=T?T[ln*3+k]:null;
      const f0=parseFloat(s.style.fontSize);let x=t[k].x,y=t[k].y,f=f0;
      if(p){f=T.f;const m=metrics(f);ctx.font=`400 ${f}px "Unica One"`;const g=ctx.measureText(s.textContent);
        x=p.u-(g.actualBoundingBoxRight-g.actualBoundingBoxLeft)/2;y=p.v-(m.base-m.cap/2)}   // centre the ink, not the advance
      anim(s,[{left:s.style.left,top:s.style.top,fontSize:f0+"px"},{left:x+"px",top:y+"px",fontSize:f+"px"}],{duration:900,easing:EASE})})});
    await anim(el.box,[{width:G.W+"px"},{width:H+"px"}],{duration:900,easing:EASE});
    caption("DSN KSV. One platform, six initiatives.");
    // hand over to the artwork while still upright, then the artwork itself turns
    await wait(140,id);
    el.badge.style.opacity=1;el.box.style.opacity=0;   // same square, same letters: a straight one-frame swap, no fade
    await wait(60,id);
    await anim(el.badge,[{transform:"translate(-50%,-50%) rotate(45deg)"},{transform:"translate(-50%,-50%) rotate(0deg)"}],{duration:950,easing:"cubic-bezier(.7,0,.2,1)"});
    await wait(900,id);
    caption("From Prishtina, to the world.");
    chrome(false,false);  // only now does the top bar come in
    done=true;
    try{sessionStorage.setItem("dk-intro","1")}catch(e){}
  }
  // stand the badge artwork upright over the box's final square and read where it draws
  // D S N / K S V (box px), plus the font size whose cap height matches its letters
  function badgeTargets(){
    try{
      el.badge.style.transform="translate(-50%,-50%) rotate(45deg)";
      const ps=[...el.badge.querySelectorAll("path")];
      if(ps.length!==6)return null;
      // sample each outline, turn it upright (+45° about the centre) and take its tight bounds
      const c=236.5,r=Math.SQRT1_2,k=G.H/(473*r);
      const pts=ps.map(p=>{const n=240,len=p.getTotalLength();let a=1e9,b=-1e9,d=1e9,e=-1e9;
        for(let i=0;i<=n;i++){const q=p.getPointAtLength(len*i/n),dx=q.x-c,dy=q.y-c,u=dx*r-dy*r,v=dx*r+dy*r;a=Math.min(a,u);b=Math.max(b,u);d=Math.min(d,v);e=Math.max(e,v)}
        return{u:((a+b)/2)*k+G.H/2,v:((d+e)/2)*k+G.H/2,h:(e-d)*k}});
      pts.sort((a,b)=>a.v-b.v);
      const L=[...pts.slice(0,3).sort((a,b)=>a.u-b.u),...pts.slice(3).sort((a,b)=>a.u-b.u)];
      const cap=[L[2].h,L[3].h,L[5].h].sort((a,b)=>a-b)[1];   // N, K, V have no overshoot
      L.f=100*cap/metrics(100).cap;
      return L;
    }catch(e){return null}
  }
  function fly(src,n){
    const r=src.getBoundingClientRect(),slot=document.querySelector(`.idx .slot[data-i="${n}"]`);
    anim(src,[{opacity:1,transform:"none"},{opacity:0,transform:"scale(.4)"}],{duration:260});
    if(!slot)return;
    const t=slot.getBoundingClientRect(),s0=G.H*CAP*.9,cx=r.left+r.width/2,cy=r.top+r.height/2;
    const f=document.createElement("div");f.className="fly";f.style.width=f.style.height=s0+"px";
    f.innerHTML=sym(KEYS[n]);document.body.appendChild(f);
    const tx=t.left+t.width/2-s0/2,ty=t.top+t.height/2-s0/2,sx=cx-s0/2,sy=cy-s0/2,k=t.width/s0;
    const mx=(sx+tx)/2,my=Math.min(sy,ty)-60-n*14;
    const a=f.animate([
      {transform:`translate(${sx}px,${sy}px) scale(.15) rotate(-90deg)`,color:"#EDEEE6"},
      {transform:`translate(${sx}px,${sy-24}px) scale(1) rotate(0deg)`,color:"#EDEEE6",offset:.22},
      {transform:`translate(${mx}px,${my}px) scale(${(1+k)/2}) rotate(90deg)`,color:ACC[KEYS[n]],offset:.62},
      {transform:`translate(${tx}px,${ty}px) scale(${k}) rotate(180deg)`,color:ACC[KEYS[n]]}],
      {duration:1250,easing:"cubic-bezier(.45,0,.2,1)",fill:"forwards"});
    a.finished.then(()=>{lit(n);f.remove()}).catch(()=>f.remove());
  }
  function finish(){
    run++;document.querySelectorAll(".fly").forEach(n=>n.remove());
    [el.box,el.intro,el.introType,el.badge].forEach(n=>n.getAnimations({subtree:true}).forEach(a=>a.cancel()));
    el.intro.hidden=true;reveal(true);chrome(false,false);
    geom();el.box.style.opacity=0;el.badge.style.opacity=1;
    KEYS.forEach((k,i)=>lit(i));
    const s=el.cap.firstElementChild;s.textContent="From Prishtina, to the world.";s.classList.remove("out");
    done=true;
    try{sessionStorage.setItem("dk-intro","1")}catch(e){}
  }
  let rz;
  const onResize=()=>{clearTimeout(rz);rz=setTimeout(()=>{if(el.stage?.isConnected)finish()},150)};
  return{
    async start(){
      const $=id=>document.getElementById(id);
      el={hero:$("hero"),stage:$("stage"),box:$("box"),badge:$("badge"),cap:$("cap"),strike:$("strike"),intro:$("intro"),introType:$("intro").querySelector(".intro-type"),t1:$("t1"),t2:$("t2")};
      let seen=false;try{seen=sessionStorage.getItem("dk-intro")==="1"}catch(e){}
      if(!reduce&&!seen){reveal(false);chrome(true,true)}else el.intro.hidden=true;
      el.intro.onclick=()=>finish();
      el.stage.onclick=()=>{if(!done)finish()};
      addEventListener("resize",onResize);
      try{await document.fonts.load('400 100px "Unica One"')}catch(e){}
      if(!el.stage.isConnected)return;
      if(reduce){finish();return}
      const id=++run;play(id,!seen).catch(()=>{});
    },
    stop(){run++;chrome(false,false);removeEventListener("resize",onResize);document.querySelectorAll(".fly").forEach(n=>n.remove())}
  };
})();
