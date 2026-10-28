/* Path router + shared chrome */
if("scrollRestoration" in history)history.scrollRestoration="manual";
const NAV=[["about","About"],["projects","Projects"],["shop","Shop"],["contact","Contact"]];
const mob=document.getElementById("mob");
document.getElementById("nav").innerHTML=NAV.map(n=>`<a href="/${n[0]}" data-n="${n[0]}">${n[1]}</a>`).join("");
mob.innerHTML=NAV.map(n=>`<a href="/${n[0]}">${n[1]}</a>`).join("")+`<a href="/contact">Get Involved →</a><div class="lang"><button class="on">EN</button> / <button>SQ</button></div>`;
document.getElementById("hdrMark").innerHTML=WIDE;
document.getElementById("burger").onclick=()=>mob.classList.toggle("open");
document.getElementById("scrim").onclick=()=>cart(false);
document.querySelectorAll(".lang").forEach(l=>l.onclick=e=>{const b=e.target.closest("button");if(b)document.querySelectorAll(".lang button").forEach(x=>x.classList.toggle("on",x.textContent===b.textContent))});
document.addEventListener("click",e=>{const g=e.target.closest("[data-go]");if(g)setTimeout(()=>document.getElementById(g.dataset.go)?.scrollIntoView({behavior:"smooth"}),80)});

let io;
function route(){
  const r=location.pathname.replace(/^\/|\/$/g,"");
  const product=r.startsWith("shop/")?PRODUCTS.find(p=>p.slug===r.slice(5)):null;
  const page=product?"product":P[r]?r:"home";
  Hero.stop();
  markN=0;
  document.getElementById("app").innerHTML=(product?P.product(product):P[page]())+footer();
  document.querySelectorAll("#nav a").forEach(a=>a.classList.toggle("on",a.dataset.n===page||(a.dataset.n==="shop"&&!!product)||(a.dataset.n==="projects"&&page!=="shop"&&!!byK(page))));
  mob.classList.remove("open");cart(false);window.scrollTo(0,0);
  const name=product?.n||byK(page)?.name||NAV.find(n=>n[0]===page)?.[1]||page[0].toUpperCase()+page.slice(1);
  document.title=(page==="home"?"":name+" · ")+"Design Kosova Foundation";
  io&&io.disconnect();
  io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{rootMargin:"0px 0px -8% 0px"});
  document.querySelectorAll(".rv").forEach(el=>io.observe(el));
  subnavSpy();countUp();
  if(page==="home")Hero.start();
  if(page==="shop")shopInit();
  if(product)productInit(product);
  if(page==="collaborators")collabInit();
  if(page==="contact")contactInit();
}
// in-page navigation: highlight the last section whose top has passed under the bar
let spyLinks=[];
function subnavSpy(){const nav=document.querySelector(".subnav");spyLinks=nav?[...nav.querySelectorAll("a")].map(l=>[l,document.getElementById(l.dataset.go)]).filter(x=>x[1]):[];spyUpdate()}
function spyUpdate(){if(!spyLinks.length)return;let cur=null;for(const [l,s] of spyLinks)if(s.getBoundingClientRect().top<=170)cur=l;spyLinks.forEach(([l])=>l.classList.toggle("on",l===cur))}
// key numbers count up once when they come into view (years and words stay as they are)
let counter;
function countUp(){
  counter&&counter.disconnect();
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  counter=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;counter.unobserve(e.target);
    const el=e.target,m=el.textContent.match(/^(\d+)(.*)$/);if(!m)return;const to=+m[1],rest=m[2];if(to>=1900&&to<=2100)return;
    const t0=performance.now(),d=1100;
    (function f(t){const k=Math.min(1,(t-t0)/d),v=Math.round(to*(1-Math.pow(1-k,3)));el.textContent=v+rest;if(k<1)requestAnimationFrame(f)})(t0);
  }),{threshold:.6});
  document.querySelectorAll(".fact b,.stat-card b,.stat b").forEach(b=>counter.observe(b));
}
// the badge turns with scroll; a corner badge takes you back up
const totop=document.createElement("button");totop.className="totop";totop.setAttribute("aria-label","Back to top");
totop.innerHTML=`<svg class="spin" viewBox="0 0 473 473" aria-hidden="true">${DIAMOND}</svg>`;document.body.appendChild(totop);
totop.onclick=()=>scrollTo({top:0,behavior:"smooth"});
let tick=false;
addEventListener("scroll",()=>{if(tick)return;tick=true;requestAnimationFrame(()=>{tick=false;
  const t=(scrollY/900)%2;document.documentElement.style.setProperty("--rot",((t<1?t:2-t)*45).toFixed(2)+"deg");  // swings between diamond and square, never upside down
  totop.classList.toggle("show",scrollY>700);spyUpdate()})},{passive:true});
document.addEventListener("click",e=>{const a=e.target.closest("a[href]");if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target||a.hasAttribute("download"))return;const u=new URL(a.href,location.href);if(u.origin!==location.origin||!u.pathname.startsWith("/"))return;if(u.pathname===location.pathname&&a.dataset.go)return;e.preventDefault();history.pushState(null,"",u.pathname+u.search+u.hash);route()});
addEventListener("popstate",route);

if(location.hash.startsWith("#/")){const old=location.hash.slice(2).split("?")[0];if(!old||P[old])history.replaceState(null,"",old?"/"+old:"/")}
updCart();route();
