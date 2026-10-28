/* Page templates. Every page renders into #app; app.js routes by hash. */
const arrow='<span aria-hidden="true">→</span>';
const KEYS6=INIT.map(i=>i.k);
const DIAMOND_INV=DIAMOND.replace(/#003DD6/g,"#TMP").replace(/#EDEEE6/g,"#003DD6").replace(/#TMP/g,"#EDEEE6");
// section titles take the brand symbols in turn (reset per page in app.js)
let markN=0;const mark=()=>sym(KEYS6[markN++%6],"spin mark");
const badge=(cls="",inv=false)=>`<svg class="${cls}" viewBox="0 0 473 473" aria-hidden="true">${inv?DIAMOND_INV:DIAMOND}</svg>`;
const fig=(src,alt,ratio,extra="",st=false)=>`<div class="fig${st?" st":""}" style="aspect-ratio:${ratio}${extra}"><img src="${src}" alt="${alt}" loading="lazy"></div>`;

const getInvolved=(t="Whether you're a designer, educator, sponsor, or institution, we'd love to hear from you.",h="Get <em>Involved</em>",b="Contact Us",sub="Contact · Apply to exhibit, speak, or partner.")=>`
<section class="cta"><div class="wrap">
  ${sub?`<p class="label" style="opacity:.7;margin-bottom:22px">${sub}</p>`:""}
  <h2 class="h-xl" style="max-width:13ch">${h}</h2>
  ${t?`<p class="body-l" style="max-width:44ch;margin:24px 0 36px;opacity:.85">${t}</p>`:`<div style="height:36px"></div>`}
  <a class="btn" href="#/contact">${b} ${arrow}</a>
  <div class="contact-strip"><a href="mailto:${E}">${E}</a><a href="https://instagram.com/designkosova" target="_blank" rel="noopener">Instagram ↗</a><a href="#/contact">LinkedIn ↗</a><a href="#/contact">Newsletter ↗</a></div>
  ${badge("cta-badge spin",true)}
</div></section>`;

const footer=()=>`
<footer class="footer"><div class="wrap">
  <div class="foot-top">
    <div><svg class="foot-mark" viewBox="0 0 540 334" role="img" aria-label="Design Kosova">${WIDE}</svg>
      <p class="muted" style="max-width:36ch">A creative ecosystem fostering design innovation, culture, and transformation across Kosovo and beyond.</p>
      <p class="label blue" style="margin-top:14px">DSN KSV · Pristina, Kosovo</p></div>
    <div><h4>Foundation</h4><ul><li><a href="#/about">About DKF</a></li><li><a href="#/about">Mission &amp; Vision</a></li><li><a href="#/about" data-go="founders">Team</a></li><li><a href="#/impact">Annual Report</a></li><li><a href="#/collaborators">Collaborators</a></li></ul></div>
    <div><h4>Projects</h4><ul>${INIT.map(i=>`<li><a href="#/${i.k}">${i.name}</a></li>`).join("")}</ul></div>
    <div><h4>Connect</h4><ul><li><a href="https://instagram.com/designkosova" target="_blank" rel="noopener">Instagram</a></li><li><a href="#/contact">LinkedIn</a></li><li><a href="#/contact">Newsletter</a></li><li><a href="mailto:${PRESS}">Press &amp; Media</a></li><li><a href="#/shop">Shop</a></li><li><a href="#/contact">Contact</a></li></ul></div>
  </div>
  <div class="foot-bot"><span>© 2026 Design Kosova · All Rights Reserved</span><span>Designed in Pristina, Kosovo</span></div>
</div></footer>`;

const others=k=>`<section class="sec"><div class="wrap"><div class="sec-head"><h2>${mark()}Other Initiatives</h2><a href="#/projects">All Projects ${arrow}</a></div>
  <div class="others">${INIT.filter(i=>i.k!==k).map(i=>`<a href="#/${i.k}">${sym(i.k)}<div><div class="label muted">${i.n} · ${i.cat}</div><div class="h-m" style="margin-top:6px">${i.name}</div></div></a>`).join("")}</div></div></section>`;

const progList=()=>`<ul class="prog">${INIT.map(i=>`<li><a href="#/${i.k}"><span class="n">${i.n}</span>${sym(i.k,"s")}<span class="t">${i.name}</span><span class="d">${i.line}</span><span class="c">${i.cat}</span><span class="blue">→</span><span class="peek"><img src="${i.img}" alt="" loading="lazy"></span></a></li>`).join("")}</ul>`;
const cityCard=(w,long)=>`<div class="city rv">${w.img?fig(w.img,w.name,"4/3"):`<div class="sym-card">${sym("academy")}</div>`}<p class="label muted">${w.city}${long?" · Since "+w.y:""}</p><h3 class="h-m">${w.name}</h3>${long?`<p class="muted">${w.dl}</p>`:""}</div>`;

const P={};

P.home=()=>`
<section class="hero" id="hero">
  <div class="intro" id="intro" aria-hidden="true">
    <div class="intro-type"><div class="tl" id="t1"></div><div class="tl" id="t2"></div></div>
    <button class="label intro-skip" id="skip">Skip intro →</button>
  </div>
  <div class="hero-grid">
  <div class="stage paper-grid" id="stage" aria-label="Design Kosova: design is not decoration. It is progress, culture, together, Kosova.">
    <div class="box" id="box"><div class="strike" id="strike"></div></div>
    <svg class="badge" id="badge" viewBox="0 0 473 473" aria-hidden="true">${DIAMOND}</svg>
  </div>
  <div class="hero-copy">
    <div>
      <p class="label blue">Pristina · Kosovo</p>
      <h1>From Prishtina,<br><em>to the World</em></h1>
      <p class="lede">A platform dedicated to fostering creativity and cultural transformation through design.</p>
      <div style="display:flex;gap:12px;margin-top:28px;flex-wrap:wrap"><a class="btn solid" href="#/projects">Explore Projects ${arrow}</a><a class="btn" href="#/about">About DKF</a></div>
    </div>
    <ul class="idx">${INIT.map((i,n)=>`<li><a href="#/${i.k}"><span class="n">${i.n}</span><span class="slot" data-i="${n}">${sym(i.k)}</span><span>${i.name}</span><span class="c">${i.cat}</span></a></li>`).join("")}</ul>
  </div>
</div></section>

<div class="ticker" aria-hidden="true"><div class="ticker-track">${[0,1].map(()=>`<span>${[["Festival of Design","festival"],["Talk for Design","talk"],["Shop Design","shop"],["Factory of Design","factory"],["Academy of Design","academy"],["Urban Design Lab","urban"],["Milan Design Week","academy"],["Dutch Design Week","academy"],["Dubai Design Week","academy"]].map(([t,k])=>`${t} ${sym(k)}`).join(" ")}</span>`).join("")}</div></div>

<section class="sec" id="now"><div class="wrap">
  <div class="sec-head"><h2>${mark()}Now</h2><span class="label muted">Dutch Design Week · 2026</span></div>
  <div class="feature">
    <a class="rv" href="#/impact">${fig(IMG+"sonomi-bloom.jpg","Bloom by Sonomi Atelier, a layered recycled-paper lamp glowing orange","4/5","",true)}
      <div class="fig-cap"><span>Sonomi Atelier · Bloom</span><span>Light Form, DDW 2026</span></div></a>
    <div class="feature-side rv">
      <div>
        <p class="label blue">Exhibition · Eindhoven</p>
        <h3 class="h-l" style="margin:12px 0 18px">Light Form: Experiments in Material &amp; Form</h3>
        <p class="body-l">LIGHT FORM is a curatorial theme by Design Kosova, bringing together three design studios from Kosovo at Dutch Design Week 2026. Through sculptural lighting, Sonomi Atelier, Studio 96, and Shape &amp; Shade explore the relationship between light, material, and form.</p>
        <a class="btn" style="margin-top:28px" href="#/impact">See the exhibition ${arrow}</a>
      </div>
      <div class="thumbs">${LIGHTFORM.slice(0,4).map(([f,s,t])=>fig(IMG+f+".jpg",`${t} by ${s}`,"3/4")).join("")}</div>
    </div>
  </div>
</div></section>

<section class="sec"><div class="wrap">
  <div class="sec-head"><h2>${mark()}A Creative Ecosystem</h2><a href="#/about">Read More ${arrow}</a></div>
  <div class="split">
    <p class="quote rv">Design is not decoration. <em>It is a catalyst for progress.</em></p>
    <div class="rv">
      <p class="body-l">Design Kosova (DKF) is a dynamic platform dedicated to fostering innovation and cultural transformation through design.</p>
    </div>
  </div>
</div></section>

<section class="sec"><div class="wrap">
  <div class="sec-head"><h2>${mark()}Core Projects</h2><a href="#/projects">All Projects ${arrow}</a></div>
  ${progList()}
</div></section>

<section class="sec"><div class="wrap">
  <div class="sec-head"><h2>${mark()}Impact &amp; Collaborations</h2><a href="#/impact">Full Story ${arrow}</a></div>
  <div class="split">
    <div class="rv"><h3 class="h-xl">Global network, <span class="blue">local impact.</span></h3>
      <div class="cols c2" style="margin-top:48px">${[["500+","Designers Supported"],["7","Festival Editions"],["40+","Talk for Design Sessions"],["120+","Academy Students"]].map(s=>`<div class="stat"><b>${s[0]}</b><span>${s[1]}</span></div>`).join("")}</div></div>
    <a class="rv" href="#/impact">${fig(IMG+"local-shapes.jpg","Local Shapes at Milan Design Week 2026: works by Kosovo designers","4/3","",true)}
      <div class="fig-cap"><span>Local Shapes</span><span>Milan Design Week 2026</span></div></a>
  </div>
</div></section>

<section class="sec"><div class="wrap">
  <div class="sec-head"><h2>${mark()}Where We Show Up</h2><a href="#/impact">Global Presence ${arrow}</a></div>
  <div class="cols c3">${WEEKS.map(w=>cityCard(w)).join("")}</div>
</div></section>
${getInvolved("","Shape the <em>Future</em> of Design","Get In Touch","")}`;

/* pictures of real work, captioned with the piece and its maker */
const WORKS={"milan-exhibit":["Local Shapes","Milan Design Week 2026"],"local-shapes":["Local Shapes","Isola Design, Milan"],"the-rebel":["The Rebel","Erëmira Belegu Deçani"],"bold-collection":["Bold Collection","Shape & Shade"],"leka-lamp":["Leka Tree Standing Lamp","Studio Fitore Syla"],"bold-tapestry":["Bold Tapestries","Arti n'Lesh"],"mothers-lace":["Mother's Lace","Dhé by Granita"],"sonomi-sand-cube":["Sand Cube","Sonomi Atelier"],"studio96-bifrost":["Bifrost Lamp","Studio 96"],"studio96-glod":["Glod Table Lamp","Studio 96"],"ss-bold-octa":["Bold Lamp Octa","Shape & Shade"],"ss-bold-flower":["Bold Lamp Flower","Shape & Shade"],"ss-bold-star":["Bold Lamp Star","Shape & Shade"],"sonomi-bloom":["Bloom","Sonomi Atelier"],"sonomi-terra":["Terra","Sonomi Atelier"]};
const GALLERY={festival:["milan-exhibit","the-rebel","bold-collection","leka-lamp","mothers-lace","bold-tapestry"],talk:["the-rebel","mothers-lace","bold-tapestry","sonomi-terra","leka-lamp"],factory:["sonomi-sand-cube","studio96-bifrost","ss-bold-octa","sonomi-bloom","studio96-glod","ss-bold-flower"],academy:["ss-bold-star","leka-lamp","mothers-lace","sonomi-terra","bold-tapestry"],urban:[]};
const gallery=k=>{const g=GALLERY[k];if(!g||!g.length)return "";return `<section class="sec gal-sec"><div class="wrap"><div class="sec-head"><h2>${mark()}In Pictures</h2><span class="label muted">Work from our community</span></div></div>
  <div class="gallery" tabindex="0" aria-label="Gallery">${g.map(f=>`<figure>${fig(IMG+f+".jpg",WORKS[f][0]+" by "+WORKS[f][1],"4/5")}<figcaption><span>${WORKS[f][0]}</span><span>${WORKS[f][1]}</span></figcaption></figure>`).join("")}</div></section>`};
/* key numbers as a compact strip, like a spec sheet */
const facts=list=>`<div class="facts">${list.map(s=>`<div class="fact rv"><b>${s[0]}</b><span>${s[1]}</span></div>`).join("")}</div>`;

P.projects=()=>`
<section class="phero"><div class="wrap">
  <p class="label blue">What We Do</p>
  <div class="phero-grid" style="margin-top:20px"><h1 class="h-xl">Core Projects</h1><p class="body-l">Six initiatives, one vision, activating Kosovo's design culture.</p></div>
</div></section>
<section class="sec"><div class="wrap"><div class="pcards">${INIT.map(i=>`<a class="pcard rv" href="#/${i.k}"><div class="fig">${`<img src="${i.img}" alt="${i.name}" loading="lazy">`}<span class="pcard-sym" style="--acc:${ACC[i.k]}">${sym(i.k)}</span></div>
  <div class="pcard-body"><div class="label muted">${i.n} · ${i.cat}</div><h3 class="h-l">${i.name}</h3><p class="muted">${i.line}</p><span class="blue pcard-cta">${i.cta} →</span></div></a>`).join("")}</div>
</div></section>
${getInvolved("Each initiative welcomes collaborators: designers, educators, institutions, or sponsors.")}`;

const initiative=k=>()=>{const i=byK(k);return `
<section class="phero"><div class="wrap">
  <div class="crumbs label"><a href="#/projects">← All Projects</a><span>${i.n} / 06</span><span class="blue">${i.catLong||i.cat}</span></div>
  <div class="phero-grid">
    <div>${sym(k,"sym-big")}<h1 class="h-xl">${i.name}</h1></div>
    <div><p class="body-l">${i.lede}</p><a class="btn solid" style="margin-top:28px" href="#/contact">Get Involved ${arrow}</a></div>
  </div>
  <div class="fig wide-fig st rv"><img src="${i.img}" alt="${i.name}"></div>
  ${facts(i.stats)}
</div></section>
<section class="sec"><div class="wrap"><div class="story">
  <div class="story-aside rv"><p class="label blue">${i.catLong||i.cat} · Design Kosova</p><h2 class="h-l">${i.h}</h2></div>
  <div class="story-main rv">${i.body.map((b,n)=>`<p class="${n?"muted":"body-l"}">${b}</p>`).join("")}
    <p class="label muted" style="margin:44px 0 16px">What It Includes</p>
    <ul class="inc-grid">${i.inc.map((x,n)=>`<li><span class="label blue">0${n+1}</span><p>${x}</p></li>`).join("")}</ul></div>
</div></div></section>
${gallery(k)}${others(k)}${getInvolved()}`};
["festival","talk","factory","academy","urban"].forEach(k=>P[k]=initiative(k));

P.about=()=>`
<section class="phero"><div class="wrap">
  <div class="crumbs label"><span class="blue">DKF</span><span>Pristina · Kosovo · Est. 2016</span></div>
  <div class="phero-grid"><h1 class="quote" style="max-width:none">Design is not decoration. It is a <em>catalyst</em> for progress.</h1>
    <div><p class="body-l">Design Kosova Foundation was built on the belief that design shapes identity, economy, and culture, and Kosovo is ready to lead.</p><a class="btn" style="margin-top:28px" href="#/projects">See Our Work ${arrow}</a></div></div>
  ${facts([["2016","Founded in Pristina"],["6","Core Initiatives"],["3","Global Design Weeks"],["4+","International Partners"],["500+","Designers Supported"],["8+","Years Active"]])}
</div></section>
<section class="sec"><div class="wrap"><div class="split">
  <div class="rv about-fig">${fig(IMG+"milan-exhibit.jpg","Design Kosova exhibition with works by Kosovo designers","4/5","",true)}<div class="fig-cap"><span>Our City · Factory of Design · Academy · Festival</span><span>Kosovo · Global</span></div></div>
  <div class="rv"><h2 class="h-l">A platform built to connect Kosovo's creative potential to the world.</h2>
    <p class="body-l" style="margin-top:28px">Design Kosova (DKF) operates as an umbrella platform for six core initiatives. Each activates a different layer of Kosovo's creative ecosystem, from annual festivals to educational programmes, marketplaces, and urban interventions.</p>
    <p class="muted" style="margin-top:16px">DKF operates as an umbrella platform, modular and flexible, allowing each initiative to function independently while maintaining a shared vision.</p>
    <p class="muted" style="margin-top:16px">We believe design is a public resource. Not reserved for institutions or corporations, but a tool that belongs to communities, cities, and individuals. Our work puts design at the service of Kosovo's cultural transformation.</p>
    <p class="muted" style="margin-top:16px">Rooted in Pristina but globally connected, DKF has built formal partnerships with Design Academy Eindhoven, Porto Design Factory, the World Design Organization, and iF Design Foundation.</p>
    <div class="ring">${INIT.map(x=>`<a href="#/${x.k}" class="ring-i">${sym(x.k)}<span>${x.name}</span></a>`).join("")}</div>
  </div>
</div></div></section>
<section class="sec vv"><div class="wrap"><div class="cols c2">
  <div class="vv-card rv">${sym("festival","vv-sym")}<p class="label">Values</p><p class="vv-text">We stand for creativity, collaboration, experimentation, education, and cultural exchange. DSN KSV believes design is more than aesthetics: it is a tool for communication, innovation, identity, and social development.</p><p class="vv-sub">We support multidisciplinary collaboration, contemporary approaches to local heritage and craftsmanship, sustainable thinking, and the professional growth of creatives in Kosovo.</p></div>
  <div class="vv-card rv">${sym("academy","vv-sym")}<p class="label">Vision</p><p class="vv-text">DSN KSV aims to become a leading creative and cultural platform in Kosovo and the region, a space where designers, architects, artists, students, producers, and creative professionals can collaborate, learn, experiment, and grow professionally.</p><p class="vv-sub">We want to position Kosovo as part of the international design conversation while creating stronger connections between local creativity, cultural identity, and global contemporary design.</p></div>
</div></div></section>
<section class="sec"><div class="wrap"><div class="sec-head"><h2>${mark()}What We Do</h2><span class="label muted">Four commitments</span></div>
  <div class="cols c4">
    <div class="pillar rv"><span class="n">01</span><h3>Support Designers</h3><p>Creating platforms, markets, and networks that give Kosovo's designers real economic and professional pathways.</p></div>
    <div class="pillar rv"><span class="n">02</span><h3>Educational Platform</h3><p>Mentorship, workshops, and professional courses for students and early-career designers.</p></div>
    <div class="pillar rv"><span class="n">03</span><h3>International Exposure</h3><p>Representing Kosovo at Milan, Dutch, and Dubai Design Weeks, and through formal global partnerships.</p></div>
    <div class="pillar rv"><span class="n">04</span><h3>Urban Transformation</h3><p>Applying design to Pristina's public spaces, policy, and civic infrastructure.</p></div>
  </div>
</div></section>
<section class="sec"><div class="wrap"><div class="sec-head"><h2>${mark()}Our Journey</h2><span class="label muted">2016 to 2024</span></div>
  <ol class="journey">${[["2016","Design Kosova Founded","Origin","Established in Pristina to build Kosovo's first structured design platform, connecting local talent to global networks."],["2018","Festival of Design, First Edition","Annual Event","Kosovo's inaugural design festival brought together over 200 designers, architects, and creative practitioners for a week of exhibitions and talks."],["2019","DAE Eindhoven Partnership","Partnership","Formal collaboration with Design Academy Eindhoven, opening exchange programmes and co-educational initiatives."],["2021","Milan & Dutch Design Weeks","Global Presence","First official Kosovo presence at Milan Design Week and Dutch Design Week."],["2022","WDO Membership","Recognition","World Design Organization membership, officially placing Kosovo on the global design map with access to WDO's 40+ country network."],["2024","Academy of Design Launch","Education","Launch of Kosovo's first structured design education programme, mentorship, workshops, and professional development."]].map((t,n)=>`<li class="rv"><span class="j-y">${t[0]}</span><span class="label blue">${t[2]}</span><h3>${t[1]}</h3><p>${t[3]}</p></li>`).join("")}</ol>
</div></section>
<section class="sec" id="founders"><div class="wrap"><div class="sec-head"><h2>${mark()}Founders</h2><span class="label muted">Design Kosova Foundation</span></div>
  <div class="cols c3">${[["ibrahim","Ibrahim Beqiri","Architect","Co-founder of Design Kosova Foundation. Ibrahim brings architectural vision to the foundation's urban and spatial initiatives, shaping how Kosovo's built environment engages with design culture.",[["LinkedIn ↗","#/contact"],["Instagram ↗","#/contact"]]],["trim","Trim Sokoli","Product & Brand Designer","11 years of helping 30+ companies push their visual boundaries. Based in Prishtina, Trim leads the brand and product design direction of DKF's identity and initiatives.",[["trimsokoli.com ↗","https://trimsokoli.com"],["Email","mailto:"+E]]],["enes","Enes Ramaxhiku","Animator","Motion and animation director at DKF. Enes leads the moving-image identity of the foundation, from festival openers to campaign films and interactive visual experiences.",[["Portfolio ↗","#/contact"],["Instagram ↗","#/contact"]]]].map((f,n)=>`<div class="founder rv">${fig(IMG+"founder-"+f[0]+".jpg",f[1],"4/5")}<p class="label muted">0${n+1} / Founder</p><h3>${f[1]}</h3><p class="label blue" style="margin:0">${f[2]}</p><p>${f[3]}</p><div class="links">${f[4].map(l=>`<a href="${l[1]}">${l[0]}</a>`).join("")}</div></div>`).join("")}</div>
</div></section>
<section class="sec"><div class="wrap"><div class="sec-head"><h2>${mark()}Partners</h2><a href="#/contact">Become a Partner ${arrow}</a></div>
  <ul class="ltable">${PARTNERS.slice(0,4).map(p=>`<li><b>${p[0]}</b><span>${p[1]}</span><span>${p[2]}</span></li>`).join("")}</ul>
</div></section>
${getInvolved("Whether you're a designer, institution, or business, there's a place for you in Kosovo's creative ecosystem.","Join the <em>Movement</em>","Get In Touch","Contact · Open to collaborations and conversations.")}`;

/* where DKF shows up, as a typographic index: coordinates and distance from Pristina */
const CITIES=[["Pristina","Kosovo",42.6629,21.1655,"Home of DSN KSV · Festival of Design"],["Milan","Italy",45.4642,9.19,"Milan Design Week · since 2021"],["Eindhoven","Netherlands",51.4416,5.4697,"Dutch Design Week · DAE partnership"],["Dubai","UAE",25.2048,55.2708,"Dubai Design Week · since 2022"],["Porto","Portugal",41.1579,-8.6291,"Porto Design Factory · innovation partner"],["Berlin","Germany",52.52,13.405,"Network"]];
const coord=(v,pos,neg)=>`${Math.abs(v).toFixed(2)}° ${v>=0?pos:neg}`;
const km=(a,b,c,d)=>{const R=6371,t=x=>x*Math.PI/180,dl=t(c-a),dg=t(d-b),h=Math.sin(dl/2)**2+Math.cos(t(a))*Math.cos(t(c))*Math.sin(dg/2)**2;return Math.round(2*R*Math.asin(Math.sqrt(h)))};
const cityIndex=()=>{const [,,pl,pg]=CITIES[0];return `<ul class="cindex">${CITIES.map(([n,c,la,lo,role],i)=>`<li class="rv"><span class="ci-n">${i?String(i).padStart(2,"0"):"HQ"}</span><span class="ci-city">${n}</span><span class="ci-meta">${c}</span><span class="ci-meta ci-coord">${coord(la,"N","S")}, ${coord(lo,"E","W")}</span><span class="ci-dist">${i?km(pl,pg,la,lo).toLocaleString("en")+" km":"0 km"}</span><span class="ci-role">${role}</span></li>`).join("")}</ul>`};

P.impact=()=>`
<section class="phero"><div class="wrap">
  <div class="crumbs label"><span class="blue">KS</span><span>Our Reach</span></div>
  <div class="phero-grid"><h1 class="h-xl">Global Network, <span class="blue">Local Impact.</span></h1>
    <p class="body-l">From Pristina to Milan, Eindhoven, and Dubai, Design Kosova is building Kosovo's presence on the global design stage, one collaboration at a time.</p></div>
  ${facts([["4+","Global Partners"],["3","Design Weeks"],["40+","WDO Countries"],["8","Years Active"]])}
</div></section>
<section class="sec"><div class="wrap">
  <div class="sec-head"><h2>${mark()}Kosovo on the world map</h2><span class="label muted">Festival of Design · Pristina</span></div>
  ${cityIndex()}
</div></section>
<section class="sec"><div class="wrap"><div class="cols c4">${[["500+","Designers Supported","Local designers given platforms, mentorship, and economic pathways through DKF programmes.","academy"],["7","Festival Editions","Annual flagship event drawing thousands of visitors and practitioners to Pristina each year.","festival"],["40+","Talk for Design Sessions","Curated lectures with local and international practitioners, all recorded and freely available.","talk"],["120+","Academy Students","Emerging designers trained through Kosovo's first structured design education programme.","factory"]].map(s=>`<div class="stat-card rv"><b>${s[0]}</b><h3>${s[1]}</h3><p>${s[2]}</p></div>`).join("")}</div></div></section>
<section class="sec"><div class="wrap"><div class="sec-head"><h2>${mark()}How We Work</h2><span class="label muted">Impact &amp; Collaborations</span></div>
  <div class="cols c4">
    <div class="pillar rv"><span class="n">01</span><h3>International Partners</h3><p>Collaborations with DAE Eindhoven, Porto Design Factory, World Design Organization, iF Design Foundation, and more.</p></div>
    <div class="pillar rv"><span class="n">02</span><h3>Global Design Weeks</h3><p>Participating in Milan, Dutch and Dubai Design Week, representing Kosovo on the world stage.</p></div>
    <div class="pillar rv"><span class="n">03</span><h3>Education &amp; Mentorship</h3><p>Programs empowering emerging designers and architects across Kosovo with skills and global networks.</p></div>
    <div class="pillar rv"><span class="n">04</span><h3>Policy &amp; Urban Development</h3><p>Working with government and private sector to integrate design into policymaking and urban strategy.</p></div>
  </div>
</div></section>
<section class="sec"><div class="wrap"><div class="sec-head"><h2>${mark()}Recent Exhibitions</h2><span class="label muted">2026</span></div>
  <div class="cols c2">
    <div class="rv">${fig(IMG+"milan-exhibit.jpg","Local Shapes exhibition at Isola Design, Milan","4/3","",true)}
      <p class="label blue" style="margin-top:18px">Milan Design Week 2026 · Isola Design</p><h3 class="h-l" style="margin:8px 0 12px">Local Shapes</h3>
      <p class="muted">As our first international initiative, Design Kosova presented LOCAL SHAPES at Milan Design Week as part of Isola Design. The initiative introduced Kosovo's creative scene to an international audience and marked the beginning of DSN KSV as a platform for global cultural and creative exchange.</p></div>
    <div class="rv">${fig(IMG+"sonomi-sand-cube.jpg","Sand Cube lamp by Sonomi Atelier","4/3","",true)}
      <p class="label blue" style="margin-top:18px">Dutch Design Week 2026 · Eindhoven</p><h3 class="h-l" style="margin:8px 0 12px">Light Form</h3>
      <p class="muted">Three design studios from Kosovo (Sonomi Atelier, Studio 96, and Shape &amp; Shade) explore the relationship between light, material, and form. Together, the works create a dialogue between texture, structure, and illumination, reflecting Kosovo's emerging design scene.</p>
      <p class="muted" style="margin-top:12px">Working with recycled paper, stainless steel, glass, and 3D printing, the studios explore lighting as a medium for creative expression: organic forms, industrial geometry, and interpretations of cultural heritage.</p></div>
  </div>
</div>
  <div class="gallery" tabindex="0" aria-label="Works from the exhibitions" style="margin-top:56px">${["leka-lamp","bold-tapestry","the-rebel","mothers-lace","studio96-bifrost","ss-bold-flower","sonomi-terra"].map(f=>`<figure>${fig(IMG+f+".jpg",WORKS[f][0]+" by "+WORKS[f][1],"4/5")}<figcaption><span>${WORKS[f][0]}</span><span>${WORKS[f][1]}</span></figcaption></figure>`).join("")}</div>
</section>
<section class="sec"><div class="wrap"><div class="sec-head"><h2>${mark()}Collaborators</h2><a href="#/contact">Partner With Us ${arrow}</a></div>
  <ul class="ltable">${PARTNERS.map(p=>`<li><b>${p[0]}</b><span>${p[1]}</span><span>${p[2]}</span></li>`).join("")}</ul>
</div></section>
<section class="sec"><div class="wrap"><div class="sec-head"><h2>${mark()}Global Presence</h2></div>
  <div class="cols c3">${WEEKS.map(w=>cityCard(w,true)).join("")}</div>
</div></section>
${getInvolved("Join DKF as a collaborator, sponsor, or partner and help put Kosovo on the global design map.","Shape the <em>Narrative</em>","Partner With Us","Contact · Let's build something together.")}`;

/* shop */
const SH={seller:"all",cats:new Set(),prices:new Set(),sort:"featured",cart:[]};
P.shop=()=>`
<section class="phero"><div class="wrap">
  <div class="crumbs label"><a href="#/projects">← All Projects</a><span>03 / 06</span><span class="blue">Marketplace</span></div>
  <div class="phero-grid"><div>${sym("shop","sym-big")}<h1 class="h-xl">Shop Design</h1></div><p class="body-l">${byK("shop").line}</p></div>
</div></section>
<section style="padding-bottom:96px"><div class="wrap">
  <div class="shop-bar">
    <div class="tabs" id="sellerTabs"></div>
    <div style="display:flex;gap:14px;align-items:center"><span class="muted" id="count" style="font-size:14px"></span>
      <select id="sort" aria-label="Sort by"><option value="featured">Sort: Featured</option><option value="lo">Price: Low to High</option><option value="hi">Price: High to Low</option><option value="az">Name: A – Z</option></select>
      <button class="cart-btn" id="cartOpen">Cart <b id="cartN">0</b></button></div>
  </div>
  <div class="shop-layout">
    <aside class="filters">
      <div class="grp"><h4 class="label muted">Categories</h4>${CATS.map(c=>`<label><input type="checkbox" data-cat="${c[0]}"> ${c[1]}</label>`).join("")}</div>
      <div class="grp"><h4 class="label muted">Price Range</h4>${PRICES.map(c=>`<label><input type="checkbox" data-price="${c[0]}"> ${c[1]}</label>`).join("")}</div>
      <div class="grp"><button class="label blue" id="clearF">Clear All Filters</button></div>
    </aside>
    <div><div class="pgrid" id="pgrid"></div><div class="empty" id="noRes" hidden>${sym("academy")}No products match your filters<br><button class="btn" style="margin-top:16px" id="clearF2">Clear Filters</button></div></div>
  </div>
  <div class="split" style="margin-top:110px;padding-top:40px;border-top:1px solid var(--ink)">
    <h2 class="h-xl">Made in Kosovo, <span class="blue">Designed to Last.</span></h2>
    <div><p class="body-l">Shop Design is our curated marketplace for Kosovo-designed objects: a direct economic channel connecting the country's most talented makers with local and international audiences.</p>
      <p class="muted" style="margin-top:14px">"By Us" products are made and sold directly by Design Kosova Foundation. "By Brands" items are sold by independent creators through our platform, and we take a small fee to sustain the ecosystem.</p>
      <a class="btn solid" style="margin-top:28px" href="#/contact">Apply as a Maker ${arrow}</a></div>
  </div>
</div></section>${others("shop")}`;
function shopInit(){
  const st=document.getElementById("sellerTabs");
  st.innerHTML=[["all","All Products",32],["byus","By Us",16],["brand","By Brands",16]].map(t=>`<button class="tab${SH.seller===t[0]?" on":""}" data-s="${t[0]}">${t[1]}<small>${t[2]}</small></button>`).join("");
  st.onclick=e=>{const b=e.target.closest("[data-s]");if(!b)return;SH.seller=b.dataset.s;st.querySelectorAll(".tab").forEach(x=>x.classList.toggle("on",x===b));renderP()};
  const bind=(sel,set,key)=>document.querySelectorAll(sel).forEach(c=>{c.checked=set.has(c.dataset[key]);c.onchange=()=>{c.checked?set.add(c.dataset[key]):set.delete(c.dataset[key]);renderP()}});
  bind("[data-cat]",SH.cats,"cat");bind("[data-price]",SH.prices,"price");
  const sort=document.getElementById("sort");sort.value=SH.sort;sort.onchange=()=>{SH.sort=sort.value;renderP()};
  const clr=()=>{SH.cats.clear();SH.prices.clear();document.querySelectorAll("[data-cat],[data-price]").forEach(c=>c.checked=false);renderP()};
  document.getElementById("clearF").onclick=clr;document.getElementById("clearF2").onclick=clr;
  document.getElementById("cartOpen").onclick=()=>cart(true);
  document.getElementById("pgrid").onclick=e=>{const b=e.target.closest("[data-add]");if(b)addCart(+b.dataset.add)};
  renderP();updCart();
}
function renderP(){
  let L=PRODUCTS.filter(p=>(SH.seller==="all"||p.s===SH.seller)&&(!SH.cats.size||SH.cats.has(p.c))&&(!SH.prices.size||[...SH.prices].some(r=>{const[a,b]=r.split("-").map(Number);return p.p>=a&&p.p<b})));
  if(SH.sort==="lo")L.sort((a,b)=>a.p-b.p);if(SH.sort==="hi")L.sort((a,b)=>b.p-a.p);if(SH.sort==="az")L.sort((a,b)=>a.n.localeCompare(b.n));
  document.getElementById("pgrid").innerHTML=L.map(p=>`<div class="prod"><div class="fig"><img src="${p.img}" alt="${p.n}" loading="lazy"><span class="tag${p.s==="byus"?" by":""}">${p.s==="byus"?"By Us":"Brand"}</span><button class="add" data-add="${p.i}">Add to Cart</button></div><div class="meta"><div><div class="mk">${p.m}</div><div>${p.n}</div></div><div>€${p.p}</div></div></div>`).join("");
  document.getElementById("count").textContent=L.length+" Items";
  document.getElementById("noRes").hidden=!!L.length;
}
function addCart(i){const f=SH.cart.find(c=>c.i===i);f?f.q++:SH.cart.push({i,q:1});updCart();cart(true)}
function updCart(){
  const n=SH.cart.reduce((s,c)=>s+c.q,0),tot=SH.cart.reduce((s,c)=>s+c.q*PRODUCTS[c.i].p,0);
  const cn=document.getElementById("cartN");if(cn)cn.textContent=n;
  const d=document.getElementById("drawer");
  d.innerHTML=`<header><span class="h-m">Your Cart</span><button aria-label="Close cart" id="cartX" style="font-size:20px">✕</button></header>
  <div class="items">${SH.cart.length?SH.cart.map(c=>{const p=PRODUCTS[c.i];return `<div class="citem"><img src="${p.img}" alt=""><div><div>${p.n}</div><div class="q"><button data-q="${c.i}" data-d="-1" aria-label="Remove one">−</button>${c.q}<button data-q="${c.i}" data-d="1" aria-label="Add one">+</button></div></div><div>€${p.p*c.q}</div></div>`}).join(""):`<div class="empty">${sym("academy")}Your cart is empty</div>`}</div>
  <footer><div class="tot"><span>Total</span><span>€${tot}</span></div><button class="btn solid" style="width:100%;justify-content:center" ${SH.cart.length?"":"disabled"}>Checkout</button></footer>`;
  d.querySelector("#cartX").onclick=()=>cart(false);
  d.querySelectorAll("[data-q]").forEach(b=>b.onclick=()=>{const c=SH.cart.find(x=>x.i===+b.dataset.q);c.q+=+b.dataset.d;if(c.q<1)SH.cart=SH.cart.filter(x=>x!==c);updCart()});
}
function cart(o){document.getElementById("drawer").classList.toggle("open",o);document.getElementById("scrim").classList.toggle("open",o)}

/* collaborators */
let DF="All";
P.collaborators=()=>`
<section class="phero"><div class="wrap">
  <div class="crumbs label"><span class="blue">Collaborators</span><span>Community</span></div>
  <div class="phero-grid"><h1 class="h-xl">Kosovo's Creative <span class="blue">Community.</span></h1>
    <div><p class="body-l">Designers, architects, animators and makers who have participated in DKF events. Kosovo's creative ecosystem in one place.</p>
      <div class="stat" style="margin-top:28px;border:0;padding:0"><b>20+</b><span>Creatives &amp; counting</span></div></div></div>
</div></section>
<section class="sec"><div class="wrap">
  <p class="label muted" style="margin-bottom:12px">Disciplines</p>
  <div style="display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:24px;flex-wrap:wrap">
    <div class="tabs" id="discTabs">${["All",...DISC].map(d=>`<button class="tab${d===DF?" on":""}" data-d="${d}">${d}</button>`).join("")}</div>
    <span class="label muted" id="pcount"></span></div>
  <div class="cgrid" id="cgrid"></div>
</div></section>
<section class="sec"><div class="wrap"><div class="split">
  <div><p class="label blue">Join the roster</p><h2 class="h-xl" style="margin-top:14px">Are you a Kosovo creative?</h2></div>
  <div><p class="body-l">Participate in one of our events and get listed, connecting your work to Kosovo's growing international design network.</p>
    <ul class="help" style="margin-top:32px">${[["festival","Festival of Design"],["academy","Academy of Design"],["factory","Factory of Design"],["contact","Get In Touch"]].map(l=>`<li><a href="#/${l[0]}"><b>${l[1]}</b><span class="blue">→</span></a></li>`).join("")}</ul></div>
</div></div></section>`;
function collabInit(){
  const t=document.getElementById("discTabs");
  const draw=()=>{const L=PEOPLE.filter(p=>DF==="All"||p[0]===DF);
    document.getElementById("cgrid").innerHTML=L.map(p=>`<a class="ccard" href="#/contact"><div style="display:flex;justify-content:space-between"><span class="ini">${p[1].split(" ").map(w=>w[0]).join("")}</span><span class="blue">↗</span></div><div><p class="label muted">${p[0]}</p><h3>${p[1]}</h3><p class="muted" style="font-size:14.5px;margin-top:4px">${p[2]}</p></div></a>`).join("");
    document.getElementById("pcount").textContent=L.length+" Creatives"};
  t.onclick=e=>{const b=e.target.closest("[data-d]");if(!b)return;DF=b.dataset.d;t.querySelectorAll(".tab").forEach(x=>x.classList.toggle("on",x===b));draw()};draw();
}

/* contact */
P.contact=()=>`
<section class="phero"><div class="wrap">
  <div class="crumbs label"><span class="blue">DSN</span><span>Get In Touch</span></div>
  <div class="phero-grid"><h1 class="h-xl">Let's Talk <span class="blue">Design.</span></h1><p class="body-l"><a class="blue" style="border-bottom:1px solid" href="mailto:${E}">${E}</a></p></div>
</div></section>
<section class="sec"><div class="wrap"><div class="split">
  <div>
    <p class="label muted" style="margin-bottom:12px">How Can We Help?</p>
    <ul class="help">${[["General Enquiries","Questions & information",E],["Partnership Proposals","Institutional collaboration",E],["Press & Media",PRESS,PRESS],["Academy Applications","Education programme",E],["Festival Participation","Exhibit, speak, or sponsor",E]].map(h=>`<li><a href="mailto:${h[2]}?subject=${encodeURIComponent(h[0])}"><div><b>${h[0]}</b><span>${h[1]}</span></div><span class="blue">→</span></a></li>`).join("")}</ul>
    <div style="margin-top:48px"><p class="label blue">Pristina</p><p class="muted" style="margin-top:6px">Kosovo · Central Europe</p><p style="margin-top:14px">Rruga Fehmi Agani, Nr. 12<br>10000 Pristina, Kosovo</p><p class="muted" style="margin-top:8px">Mon–Fri · 09:00–18:00</p></div>
    <ul class="help" style="margin-top:40px">${[["Instagram","@designkosova","https://instagram.com/designkosova"],["LinkedIn","Design Kosova","#/contact"],["Newsletter","Monthly updates","#/contact"]].map(s=>`<li><a href="${s[2]}"><div><b>${s[0]}</b><span>${s[1]}</span></div><span class="blue">↗</span></a></li>`).join("")}</ul>
  </div>
  <div>
    <h2 class="h-l">Send Us a Message</h2>
    <p class="label muted" style="margin:28px 0 10px">Topics</p>
    <div class="chips">${["Festival of Design","Academy applications","Institutional partnerships","Sponsorship & funding","Press & media","Shop Design order"].map(c=>`<button class="tab" type="button" data-topic="${c}">${c}</button>`).join("")}</div>
    <form class="form" id="cform" style="margin-top:32px">
      <div class="row"><div class="field"><label class="label" for="f-n">Full Name</label><input id="f-n" required name="name"></div><div class="field"><label class="label" for="f-e">Email Address</label><input id="f-e" required type="email" name="email"></div></div>
      <div class="row"><div class="field"><label class="label" for="f-o">Organisation</label><input id="f-o" name="org"></div><div class="field"><label class="label" for="topicSel">Topic</label><select name="topic" id="topicSel"><option value="">Select a topic</option>${["Festival of Design","Academy of Design","Partnership Proposal","Press & Media","Sponsorship","Shop Design","General Enquiry"].map(o=>`<option>${o}</option>`).join("")}</select></div></div>
      <div class="field"><label class="label" for="f-s">Subject</label><input id="f-s" name="subject"></div>
      <div class="field"><label class="label" for="f-m">Message</label><textarea id="f-m" required name="msg"></textarea></div>
      <div style="display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap"><span class="muted" style="font-size:14px">We respond to all messages within 2 business days.</span><button class="btn solid" type="submit">Send Message ${arrow}</button></div>
    </form>
  </div>
</div></div></section>`;
function contactInit(){
  const sel=document.getElementById("topicSel"),map={"Festival of Design":"Festival of Design","Academy applications":"Academy of Design","Institutional partnerships":"Partnership Proposal","Sponsorship & funding":"Sponsorship","Press & media":"Press & Media","Shop Design order":"Shop Design"};
  document.querySelectorAll("[data-topic]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-topic]").forEach(x=>x.classList.toggle("on",x===b));sel.value=map[b.dataset.topic]});
  const form=document.getElementById("cform");
  form.onsubmit=e=>{e.preventDefault();const f=new FormData(form);
    location.href=`mailto:${E}?subject=${encodeURIComponent((f.get("topic")||"Enquiry")+" · "+(f.get("subject")||f.get("name")))}&body=${encodeURIComponent(f.get("msg")+"\n\n"+f.get("name")+(f.get("org")?" · "+f.get("org"):"")+"\n"+f.get("email"))}`;
    if(!form.nextElementSibling)form.insertAdjacentHTML("afterend",`<p class="sent">Thank you. Your email app should open with the message ready to send. We respond to all messages within 2 business days.</p>`)};
}
