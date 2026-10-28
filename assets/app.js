/* Hash router + shared chrome */
if("scrollRestoration" in history)history.scrollRestoration="manual";
const NAV=[["about","About"],["projects","Projects"],["shop","Shop"],["contact","Contact"]];
const mob=document.getElementById("mob");
document.getElementById("nav").innerHTML=NAV.map(n=>`<a href="#/${n[0]}" data-n="${n[0]}">${n[1]}</a>`).join("");
mob.innerHTML=NAV.map(n=>`<a href="#/${n[0]}">${n[1]}</a>`).join("")+`<a href="#/contact">Get Involved →</a><div class="lang"><button class="on">EN</button> / <button>SQ</button></div>`;
document.getElementById("hdrMark").innerHTML=WIDE;
document.getElementById("burger").onclick=()=>mob.classList.toggle("open");
document.getElementById("scrim").onclick=()=>cart(false);
document.querySelectorAll(".lang").forEach(l=>l.onclick=e=>{const b=e.target.closest("button");if(b)document.querySelectorAll(".lang button").forEach(x=>x.classList.toggle("on",x.textContent===b.textContent))});
document.addEventListener("click",e=>{const g=e.target.closest("[data-go]");if(g)setTimeout(()=>document.getElementById(g.dataset.go)?.scrollIntoView({behavior:"smooth"}),80)});

let io;
function route(){
  const r=(location.hash.replace(/^#\/?/,"")||"home").split("?")[0];
  const page=P[r]?r:"home";
  Hero.stop();
  markN=0;
  document.getElementById("app").innerHTML=P[page]()+footer();
  document.querySelectorAll("#nav a").forEach(a=>a.classList.toggle("on",a.dataset.n===page||(a.dataset.n==="projects"&&page!=="shop"&&!!byK(page))));
  mob.classList.remove("open");cart(false);window.scrollTo(0,0);
  const name=byK(page)?.name||NAV.find(n=>n[0]===page)?.[1]||page[0].toUpperCase()+page.slice(1);
  document.title=(page==="home"?"":name+" · ")+"Design Kosova Foundation";
  io&&io.disconnect();
  io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{rootMargin:"0px 0px -8% 0px"});
  document.querySelectorAll(".rv").forEach(el=>io.observe(el));
  if(page==="home")Hero.start();
  if(page==="shop")shopInit();
  if(page==="collaborators")collabInit();
  if(page==="contact")contactInit();
}
// the badge turns with scroll; a corner badge takes you back up
const totop=document.createElement("button");totop.className="totop";totop.setAttribute("aria-label","Back to top");
totop.innerHTML=`<svg class="spin" viewBox="0 0 473 473" aria-hidden="true">${DIAMOND}</svg>`;document.body.appendChild(totop);
totop.onclick=()=>scrollTo({top:0,behavior:"smooth"});
let tick=false;
addEventListener("scroll",()=>{if(tick)return;tick=true;requestAnimationFrame(()=>{tick=false;
  const t=(scrollY/900)%2;document.documentElement.style.setProperty("--rot",((t<1?t:2-t)*45).toFixed(2)+"deg");  // swings between diamond and square, never upside down
  totop.classList.toggle("show",scrollY>700)})},{passive:true});
addEventListener("hashchange",route);
updCart();route();
