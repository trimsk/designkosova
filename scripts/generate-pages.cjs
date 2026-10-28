const fs=require('fs');
const vm=require('vm');
const path=require('path');
const root=path.resolve(__dirname,'..');
const source=fs.readFileSync(path.join(root,'index.html'),'utf8');
const content=fs.readFileSync(path.join(root,'assets/content.js'),'utf8');
const products=vm.runInNewContext(content+'\nPRODUCTS');
const initiatives=vm.runInNewContext(content+'\nINIT');
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
const url='https://designkosova.vercel.app';
function page(file,title,description,image){
 const rel=path.relative(root,file).replace(/\\/g,'/').replace(/\.html$/,'');
 const canonical=url+(rel==='index'?'/':'/'+rel);
 let html=source.replace(/<title>[^<]*<\/title>/,`<title>${esc(title)} · Design Kosova Foundation</title>`)
  .replace(/<meta name="description" content="[^"]*">/,`<meta name="description" content="${esc(description)}">\n<link rel="canonical" href="${canonical}">\n<meta property="og:type" content="${rel.startsWith('shop/')?'product':'website'}">\n<meta property="og:title" content="${esc(title)} · Design Kosova Foundation">\n<meta property="og:description" content="${esc(description)}">\n<meta property="og:url" content="${canonical}">${image?`\n<meta property="og:image" content="${esc(image)}">`:''}`);
 fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,html);
}
for(const [key,title] of [['about','About'],['projects','Projects'],['shop','Shop Design'],['contact','Contact'],['impact','Impact'],['collaborators','Collaborators']])page(path.join(root,key+'.html'),title,`Explore ${title} at Design Kosova Foundation.`);
for(const i of initiatives)if(i.k!=='shop')page(path.join(root,i.k+'.html'),i.name,i.line,i.img.startsWith('http')?i.img:url+'/'+i.img);
for(const p of products)page(path.join(root,'shop',p.slug+'.html'),p.n,`${p.n} by ${p.m} · €${p.p}. Discover it at Shop Design, Design Kosova Foundation.`,p.img);
console.log(`Generated ${products.length} product pages and 11 section pages`);
