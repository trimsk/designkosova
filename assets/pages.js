/* Page templates. Every page renders into #app; app.js routes by hash. */
const arrow='<span aria-hidden="true">→</span>';
const KEYS6=INIT.map(i=>i.k);
const DIAMOND_INV=DIAMOND.replace(/#003DD6/g,"#TMP").replace(/#EDEEE6/g,"#003DD6").replace(/#TMP/g,"#EDEEE6");
const badge=(cls="",inv=false)=>`<svg class="${cls}" viewBox="0 0 473 473" aria-hidden="true">${inv?DIAMOND_INV:DIAMOND}</svg>`;
const fig=(src,alt,ratio,extra="",st=false)=>`<div class="fig${st?" st":""}" style="aspect-ratio:${ratio}${extra}"><img src="${src}" alt="${alt}" loading="lazy"></div>`;

const getInvolved=(t="Whether you're a designer, educator, sponsor, or institution, we'd love to hear from you.",h="Get <em>Involved</em>",b="Contact Us",sub="Contact · Apply to exhibit, speak, or partner.")=>`
<section class="cta"><div class="wrap">
  <p class="label" style="opacity:.7;margin-bottom:22px">${sub}</p>
  <h2 class="h-xl" style="max-width:13ch">${h}</h2>
  <p class="body-l" style="max-width:44ch;margin:24px 0 36px;opacity:.85">${t}</p>
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

const others=k=>`<section class="sec"><div class="wrap"><div class="sec-head"><h2>${badge("spin")}Other Initiatives</h2><a href="#/projects">All Projects ${arrow}</a></div>
  <div class="others">${INIT.filter(i=>i.k!==k).map(i=>`<a href="#/${i.k}">${sym(i.k)}<div><div class="label muted">${i.n} · ${i.cat}</div><div class="h-m" style="margin-top:6px">${i.name}</div></div></a>`).join("")}</div></div></section>`;

const progList=()=>`<ul class="prog">${INIT.map(i=>`<li><a href="#/${i.k}"><span class="n">${i.n}</span>${sym(i.k,"s")}<span class="t">${i.name}</span><span class="d">${i.line}</span><span class="c">${i.cat}</span><span class="blue">→</span><span class="peek"><img src="${i.img}" alt="" loading="lazy"></span></a></li>`).join("")}</ul>`;
const cityCard=(w,long)=>`<div class="city rv">${w.img?fig(w.img,w.name,"4/3"):`<div class="sym-card">${sym("academy")}</div>`}<p class="label muted">${w.city}${long?" · Since "+w.y:""}</p><h3 class="h-m">${w.name}</h3><p class="muted">${long?w.dl:w.d}</p></div>`;

const P={};

P.home=()=>`
<section class="hero" id="hero">
  <div class="intro" id="intro" aria-hidden="true">
    <span class="label intro-meta">DSN KSV · Est. 2016</span>
    <div class="intro-type"><div class="tl" id="t1"></div><div class="tl" id="t2"></div></div>
    <button class="label intro-skip" id="skip">Skip intro →</button>
  </div>
  <div class="hero-grid">
  <div class="stage paper-grid" id="stage" aria-label="Design Kosova: design is not decoration. It is progress, culture, together, Kosova.">
    <span class="stage-meta label">DSN KSV · Est. 2016</span>
    <div class="box" id="box"><div class="strike" id="strike"></div></div>
    <svg class="badge" id="badge" viewBox="0 0 473 473" aria-hidden="true">${DIAMOND}</svg>
    <p class="caption" id="cap"><span></span></p>
  </div>
  <div class="hero-copy">
    <div>
      <p class="label blue">Pristina · Kosovo</p>
      <h1>From Prishtina, <em>to the World</em></h1>
      <p class="lede">A platform dedicated to fostering creativity and cultural transformation through design.</p>
      <div style="display:flex;gap:12px;margin-top:28px;flex-wrap:wrap"><a class="btn solid" href="#/projects">Explore Projects ${arrow}</a><a class="btn" href="#/about">About DKF</a></div>
    </div>
    <ul class="idx">${INIT.map((i,n)=>`<li><a href="#/${i.k}"><span class="n">${i.n}</span><span class="slot" data-i="${n}">${sym(i.k)}</span><span>${i.name}</span><span class="c">${i.cat}</span></a></li>`).join("")}</ul>
  </div>
</div></section>

<div class="ticker" aria-hidden="true"><div class="ticker-track">${[0,1].map(()=>`<span>${[["Festival of Design","festival"],["Talk for Design","talk"],["Shop Design","shop"],["Factory of Design","factory"],["Academy of Design","academy"],["Urban Design Lab","urban"],["Milan Design Week","academy"],["Dutch Design Week","academy"],["Dubai Design Week","academy"]].map(([t,k])=>`${t} ${sym(k)}`).join(" ")}</span>`).join("")}</div></div>

<section class="sec" id="now"><div class="wrap">
  <div class="sec-head"><h2>${badge("spin")}Now</h2><span class="label muted">Dutch Design Week · 2026</span></div>
  <div class="feature">
    <a class="rv" href="#/impact">${fig(IMG+"sonomi-bloom.jpg","Bloom by Sonomi Atelier, a layered recycled-paper lamp glowing orange","4/5","",true)}
      <div class="fig-cap"><span>Sonomi Atelier · Bloom</span><span>Light Form, DDW 2026</span></div></a>
    <div class="feature-side rv">
      <div>
        <p class="label blue">Exhibition · Eindhoven</p>
        <h3 class="h-l" style="margin:12px 0 18px">Light Form: Experiments in Material &amp; Form</h3>
        <p class="body-l">LIGHT FORM is a curatorial theme by Design Kosova, bringing together three design studios from Kosovo at Dutch Design Week 2026. Through sculptural lighting, Sonomi Atelier, Studio 96, and Shape &amp; Shade explore the relationship between light, material, and form.</p>
        <p class="muted" style="margin-top:14px">Working with recycled paper, stainless steel, glass, and 3D printing, the studios explore lighting as a medium for creative expression: organic forms, industrial geometry, and interpretations of cultural heritage.</p>
      </div>
      <div class="thumbs">${LIGHTFORM.map(([f,s,t])=>fig(IMG+f+".jpg",`${t} by ${s}`,"3/4")).join("")}</div>
      <ul class="news">
        <li><a href="#/impact"><span class="d">Oct 2026</span><span class="h-m">Light Form at Dutch Design Week 2026</span><span class="blue">→</span></a></li>
        <li><a href="#/impact"><span class="d">2026</span><span class="h-m">Local Shapes at Milan Design Week, Isola Design</span><span class="blue">→</span></a></li>
        <li><a href="#/festival"><span class="d">Annual</span><span class="h-m">Festival of Design: exhibitions, workshops and panels</span><span class="blue">→</span></a></li>
      </ul>
    </div>
  </div>
</div></section>

<section class="sec"><div class="wrap">
  <div class="sec-head"><h2>${badge("spin")}A Creative Ecosystem</h2><a href="#/about">Read More ${arrow}</a></div>
  <div class="split">
    <p class="quote rv">Design is not decoration. <em>It is a catalyst for progress.</em></p>
    <div class="rv">
      <p class="body-l">Design Kosova (DKF) is a dynamic platform dedicated to fostering innovation and cultural transformation through design.</p>
      <p class="muted" style="margin-top:14px">DKF operates as an umbrella platform, modular and flexible, allowing each initiative to function independently while maintaining a shared vision.</p>
      <div class="cols c3" style="margin-top:44px">
        <div class="pillar"><span class="n">01</span><h3>Support Designers</h3><p>Developing innovative projects and providing platforms for emerging talent locally and internationally.</p></div>
        <div class="pillar"><span class="n">02</span><h3>Educational Platform</h3><p>Knowledge exchange and mentorship, specialised training that builds practical, future-ready skills.</p></div>
        <div class="pillar"><span class="n">03</span><h3>International Exposure</h3><p>Partnering with DAE Eindhoven, Porto Design Factory, iF Design Foundation, and the World Design Organization.</p></div>
      </div>
    </div>
  </div>
</div></section>

<section class="sec"><div class="wrap">
  <div class="sec-head"><h2>${badge("spin")}Core Projects</h2><a href="#/projects">All Projects ${arrow}</a></div>
  ${progList()}
  <div class="cols c2" style="margin-top:56px">
    ${[["festival","Kosovo's largest design festival: exhibitions, workshops, and panels for emerging talent."],["academy","Mentorship, courses, and training in design, building Kosovo's next generation of creatives."]].map(([k,t])=>{const i=byK(k);return `<a class="rv" href="#/${k}">${fig(i.img,i.name,"3/2")}<div class="fig-cap"><span>${i.n} · ${i.cat}</span><span class="blue">Learn More →</span></div><h3 class="h-l" style="margin:6px 0 8px">${i.name}</h3><p class="muted" style="max-width:52ch">${t}</p></a>`}).join("")}
  </div>
</div></section>

<section class="sec"><div class="wrap">
  <div class="sec-head"><h2>${badge("spin")}Impact &amp; Collaborations</h2><a href="#/impact">Full Story ${arrow}</a></div>
  <div class="split">
    <div class="rv"><h3 class="h-xl">Global network, <span class="blue">local impact.</span></h3>
      <a href="#/impact" style="display:block;margin-top:36px">${fig(IMG+"local-shapes.jpg","Local Shapes at Milan Design Week 2026: works by Kosovo designers","4/3","",true)}</a>
      <div class="fig-cap"><span>Local Shapes</span><span>Milan Design Week 2026</span></div></div>
    <div class="rv">
      <div class="cols c2">
        <div class="pillar"><span class="n">01</span><h3>International Partners</h3><p>Collaborations with DAE Eindhoven, Porto Design Factory, World Design Organization, iF Design Foundation, and more.</p></div>
        <div class="pillar"><span class="n">02</span><h3>Global Design Weeks</h3><p>Participating in Milan, Dutch and Dubai Design Week, representing Kosovo on the world stage.</p></div>
        <div class="pillar"><span class="n">03</span><h3>Education &amp; Mentorship</h3><p>Programs empowering emerging designers and architects across Kosovo with skills and global networks.</p></div>
        <div class="pillar"><span class="n">04</span><h3>Policy &amp; Urban Development</h3><p>Working with government and private sector to integrate design into policymaking and urban strategy.</p></div>
      </div>
      <p class="label muted" style="margin:56px 0 12px">Partners &amp; Institutions</p>
      <ul class="ltable">${PARTNERS.map(p=>`<li style="grid-template-columns:1fr auto"><b>${p[0]}</b><span>${p[1]}</span></li>`).join("")}</ul>
    </div>
  </div>
</div></section>

<section class="sec"><div class="wrap">
  <div class="sec-head"><h2>${badge("spin")}Where We Show Up</h2><a href="#/impact">Global Presence ${arrow}</a></div>
  <div class="cols c3">${WEEKS.map(w=>cityCard(w)).join("")}</div>
</div></section>
${getInvolved("Design Kosova is more than a festival. It is a creative ecosystem that leverages design to generate meaningful change.","Shape the <em>Future</em> of Design","Get In Touch","Contact · Open to collaborations and conversations.")}`;

P.projects=()=>`
<section class="phero"><div class="wrap">
  <p class="label blue">What We Do</p>
  <div class="phero-grid" style="margin-top:20px"><h1 class="h-xl">Core Projects</h1><p class="body-l">Six initiatives, one vision, activating Kosovo's design culture.</p></div>
</div></section>
<section class="sec"><div class="wrap">${progList()}
  <div class="cols c3" style="margin-top:72px">${INIT.map(i=>`<a class="rv" href="#/${i.k}">${fig(i.img,i.name,"4/5")}<div class="fig-cap"><span>${i.n} · ${i.cat}</span><span class="blue">${i.cta} →</span></div><h3 class="h-m" style="margin-top:4px">${i.name}</h3><p class="muted" style="margin-top:6px;font-size:15px">${i.line}</p></a>`).join("")}</div>
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
</div></section>
<section class="sec"><div class="wrap"><div class="cols c4">${i.stats.map(s=>`<div class="stat rv"><b>${s[0]}</b><span>${s[1]}</span></div>`).join("")}</div></div></section>
<section class="sec"><div class="wrap"><div class="split">
  <h2 class="h-l rv">${i.h}</h2>
  <div class="rv">${i.body.map((b,n)=>`<p class="${n?"muted":"body-l"}" style="margin-bottom:16px">${b}</p>`).join("")}
    <p class="label muted" style="margin:40px 0 12px">What It Includes</p><ul class="incl">${i.inc.map(x=>`<li>${x}</li>`).join("")}</ul>
    <p class="label blue" style="margin-top:22px">${i.catLong||i.cat} · Design Kosova</p></div>
</div></div></section>
${others(k)}${getInvolved()}`};
["festival","talk","factory","academy","urban"].forEach(k=>P[k]=initiative(k));

P.about=()=>`
<section class="phero"><div class="wrap">
  <div class="crumbs label"><span class="blue">DKF</span><span>Pristina · Kosovo · Est. 2016</span></div>
  <div class="phero-grid"><h1 class="quote" style="max-width:none">Design is not decoration. It is a <em>catalyst</em> for progress.</h1>
    <div><p class="body-l">Design Kosova Foundation was built on the belief that design shapes identity, economy, and culture, and Kosovo is ready to lead.</p><a class="btn" style="margin-top:28px" href="#/projects">See Our Work ${arrow}</a></div></div>
</div></section>
<section class="sec"><div class="wrap"><div class="cols c6">${[["2016","Founded in Pristina"],["6","Core Initiatives"],["3","Global Design Weeks"],["4+","International Partners"],["500+","Designers Supported"],["8+","Years Active"]].map(s=>`<div class="stat rv"><b>${s[0]}</b><span>${s[1]}</span></div>`).join("")}</div></div></section>
<section class="sec"><div class="wrap"><div class="split">
  <div class="rv">${fig(IMG+"milan-exhibit.jpg","Design Kosova exhibition with works by Kosovo designers","4/5","",true)}<div class="fig-cap"><span>Our City · Factory of Design · Academy · Festival</span><span>Kosovo · Global</span></div></div>
  <div class="rv"><h2 class="h-l">A platform built to connect Kosovo's creative potential to the world.</h2>
    <p class="body-l" style="margin-top:28px">Design Kosova (DKF) operates as an umbrella platform for six core initiatives. Each activates a different layer of Kosovo's creative ecosystem, from annual festivals to educational programmes, marketplaces, and urban interventions.</p>
    <p class="muted" style="margin-top:16px">We believe design is a public resource. Not reserved for institutions or corporations, but a tool that belongs to communities, cities, and individuals. Our work puts design at the service of Kosovo's cultural transformation.</p>
    <p class="muted" style="margin-top:16px">Rooted in Pristina but globally connected, DKF has built formal partnerships with Design Academy Eindhoven, Porto Design Factory, the World Design Organization, and iF Design Foundation.</p>
    <div class="cols c2" style="margin-top:44px">
      <div class="pillar"><span class="n">01</span><h3>Support Designers</h3><p>Creating platforms, markets, and networks that give Kosovo's designers real economic and professional pathways.</p></div>
      <div class="pillar"><span class="n">02</span><h3>Educational Platform</h3><p>Mentorship, workshops, and professional courses for students and early-career designers.</p></div>
      <div class="pillar"><span class="n">03</span><h3>International Exposure</h3><p>Representing Kosovo at Milan, Dutch, and Dubai Design Weeks, and through formal global partnerships.</p></div>
      <div class="pillar"><span class="n">04</span><h3>Urban Transformation</h3><p>Applying design to Pristina's public spaces, policy, and civic infrastructure.</p></div>
    </div></div>
</div></div></section>
<section class="sec"><div class="wrap"><div class="sec-head"><h2>${badge("spin")}Our Journey</h2><span class="label muted">2016 to 2024</span></div>
  <ul class="timeline">${[["2016","Design Kosova Founded","Origin","Established in Pristina to build Kosovo's first structured design platform, connecting local talent to global networks."],["2018","Festival of Design, First Edition","Annual Event","Kosovo's inaugural design festival brought together over 200 designers, architects, and creative practitioners for a week of exhibitions and talks."],["2019","DAE Eindhoven Partnership","Partnership","Formal collaboration with Design Academy Eindhoven, opening exchange programmes and co-educational initiatives."],["2021","Milan & Dutch Design Weeks","Global Presence","First official Kosovo presence at Milan Design Week and Dutch Design Week."],["2022","WDO Membership","Recognition","World Design Organization membership, officially placing Kosovo on the global design map with access to WDO's 40+ country network."],["2024","Academy of Design Launch","Education","Launch of Kosovo's first structured design education programme, mentorship, workshops, and professional development."]].map(t=>`<li class="rv"><span class="y">${t[0]}</span><h3>${t[1]}</h3><p>${t[3]}</p><span class="label blue">${t[2]}</span></li>`).join("")}</ul>
</div></section>
<section class="sec" id="founders"><div class="wrap"><div class="sec-head"><h2>${badge("spin")}Founders</h2><span class="label muted">Design Kosova Foundation</span></div>
  <div class="cols c3">${[["ibrahim","Ibrahim Beqiri","Architect","Co-founder of Design Kosova Foundation. Ibrahim brings architectural vision to the foundation's urban and spatial initiatives, shaping how Kosovo's built environment engages with design culture.",[["LinkedIn ↗","#/contact"],["Instagram ↗","#/contact"]]],["trim","Trim Sokoli","Product & Brand Designer","11 years of helping 30+ companies push their visual boundaries. Based in Prishtina, Trim leads the brand and product design direction of DKF's identity and initiatives.",[["trimsokoli.com ↗","https://trimsokoli.com"],["Email","mailto:"+E]]],["enes","Enes Ramaxhiku","Animator","Motion and animation director at DKF. Enes leads the moving-image identity of the foundation, from festival openers to campaign films and interactive visual experiences.",[["Portfolio ↗","#/contact"],["Instagram ↗","#/contact"]]]].map((f,n)=>`<div class="founder rv">${fig(IMG+"founder-"+f[0]+".jpg",f[1],"4/5")}<p class="label muted">0${n+1} / Founder</p><h3>${f[1]}</h3><p class="label blue" style="margin:0">${f[2]}</p><p>${f[3]}</p><div class="links">${f[4].map(l=>`<a href="${l[1]}">${l[0]}</a>`).join("")}</div></div>`).join("")}</div>
</div></section>
<section class="sec"><div class="wrap"><div class="sec-head"><h2>${badge("spin")}Partners</h2><a href="#/contact">Become a Partner ${arrow}</a></div>
  <ul class="ltable">${PARTNERS.slice(0,4).map(p=>`<li><b>${p[0]}</b><span>${p[1]}</span><span>${p[2]}</span></li>`).join("")}</ul>
</div></section>
${getInvolved("Whether you're a designer, institution, or business, there's a place for you in Kosovo's creative ecosystem.","Join the <em>Movement</em>","Get In Touch","Contact · Open to collaborations and conversations.")}`;

P.impact=()=>`
<section class="phero"><div class="wrap">
  <div class="crumbs label"><span class="blue">KS</span><span>Our Reach</span></div>
  <div class="phero-grid"><h1 class="h-xl">Global Network, <span class="blue">Local Impact.</span></h1>
    <p class="body-l">From Pristina to Milan, Eindhoven, and Dubai, Design Kosova is building Kosovo's presence on the global design stage, one collaboration at a time.</p></div>
  <div class="cols c4" style="margin-top:56px">${[["4+","Global Partners"],["3","Design Weeks"],["40+","WDO Countries"],["8","Years Active"]].map(s=>`<div class="stat"><b>${s[0]}</b><span>${s[1]}</span></div>`).join("")}</div>
</div></section>
<section class="sec"><div class="wrap"><div class="split">
  <div class="rv"><p class="label muted">Festival of Design · Pristina</p><h2 class="h-xl" style="margin-top:14px">Kosovo on the <span class="blue">world map.</span></h2>
    <ul class="ltable" style="margin-top:40px">${["Milan","Eindhoven","Dubai","Porto","Berlin","Pristina"].map((c,n)=>`<li style="grid-template-columns:1fr auto"><b>${c}</b><span class="label${n===5?" blue":""}">${n===5?"Home":"Network"}</span></li>`).join("")}</ul></div>
  <div class="rv"><div class="cols c2">${[["500+","Designers Supported","Local designers given platforms, mentorship, and economic pathways through DKF programmes."],["7","Festival Editions","Annual flagship event drawing thousands of visitors and practitioners to Pristina each year."],["40+","Talk for Design Sessions","Curated lectures with local and international practitioners, all recorded and freely available."],["120+","Academy Students","Emerging designers trained through Kosovo's first structured design education programme."]].map(s=>`<div class="stat"><b>${s[0]}</b><span style="color:var(--ink);font-size:17px">${s[1]}</span><p class="muted" style="margin-top:8px;font-size:15px">${s[2]}</p></div>`).join("")}</div></div>
</div></div></section>
<section class="sec"><div class="wrap"><div class="sec-head"><h2>${badge("spin")}Recent Exhibitions</h2><span class="label muted">2026</span></div>
  <div class="cols c2">
    <div class="rv">${fig(IMG+"milan-exhibit.jpg","Local Shapes exhibition at Isola Design, Milan","4/3","",true)}
      <p class="label blue" style="margin-top:18px">Milan Design Week 2026 · Isola Design</p><h3 class="h-l" style="margin:8px 0 12px">Local Shapes</h3>
      <p class="muted">As our first international initiative, Design Kosova presented LOCAL SHAPES at Milan Design Week as part of Isola Design. The initiative introduced Kosovo's creative scene to an international audience and marked the beginning of DSN KSV as a platform for global cultural and creative exchange.</p></div>
    <div class="rv">${fig(IMG+"sonomi-sand-cube.jpg","Sand Cube lamp by Sonomi Atelier","4/3","",true)}
      <p class="label blue" style="margin-top:18px">Dutch Design Week 2026 · Eindhoven</p><h3 class="h-l" style="margin:8px 0 12px">Light Form</h3>
      <p class="muted">Three design studios from Kosovo (Sonomi Atelier, Studio 96, and Shape &amp; Shade) explore the relationship between light, material, and form. Together, the works create a dialogue between texture, structure, and illumination, reflecting Kosovo's emerging design scene.</p></div>
  </div>
  <div class="cols c4" style="margin-top:48px">${[["leka-lamp","Leka Tree Standing Lamp","Studio Fitore Syla"],["bold-tapestry","Bold Tapestries","Arti n'Lesh"],["the-rebel","The Rebel","Erëmira Belegu Deçani"],["mothers-lace","Mother's Lace","Dhé by Granita"]].map(w=>`<div class="rv">${fig(IMG+w[0]+".jpg",`${w[1]} by ${w[2]}`,"4/5")}<div class="fig-cap"><span style="color:var(--ink)">${w[1]}</span><span>${w[2]}</span></div></div>`).join("")}</div>
</div></section>
<section class="sec"><div class="wrap"><div class="sec-head"><h2>${badge("spin")}Collaborators</h2><a href="#/contact">Partner With Us ${arrow}</a></div>
  <ul class="ltable">${PARTNERS.map(p=>`<li><b>${p[0]}</b><span>${p[1]}</span><span>${p[2]}</span></li>`).join("")}</ul>
</div></section>
<section class="sec"><div class="wrap"><div class="sec-head"><h2>${badge("spin")}Global Presence</h2></div>
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
