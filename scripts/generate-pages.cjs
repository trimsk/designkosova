const fs = require('fs');
const vm = require('vm');
const path = require('path');

const root = path.resolve(__dirname, '..');
const origin = 'https://www.designkosova.com';
const source = fs.readFileSync(path.join(root, 'index.html'), 'utf8')
  .replace(/<!-- SEO START -->[\s\S]*?<!-- SEO END -->\n?/, '');
const scripts = ['logos.js', 'content.js', 'pages.js']
  .map(file => fs.readFileSync(path.join(root, 'assets', file), 'utf8')).join('\n');
const context = vm.createContext({ location: { pathname: '/' } });
vm.runInContext(scripts, context);
const { P, INIT, PRODUCTS, footer } = vm.runInContext('({ P, INIT, PRODUCTS, footer })', context);
const esc = value => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const absoluteImage = image => new URL(image || '/assets/img/milan-exhibit.jpg', origin + '/').href;

const sections = [
  ['about', 'About Design Kosova', 'Meet Design Kosova Foundation, its mission, values, team and work connecting Kosovo’s designers with the world.'],
  ['projects', 'Design Projects in Kosovo', 'Explore six Design Kosova initiatives spanning exhibitions, education, creative commerce, research and urban design.'],
  ['shop', 'Shop Design from Kosovo', 'Discover prints, ceramics, textiles, furniture and other objects from Kosovo’s creative community at Shop Design.'],
  ['contact', 'Contact Design Kosova', 'Contact Design Kosova Foundation in Prishtina about collaborations, events, education, press or design projects.'],
  ['impact', 'Impact and Exhibitions', 'Explore Design Kosova’s work, exhibitions and collaborations in Kosovo and at international design events.'],
  ['collaborators', 'Creative Collaborators', 'Discover the designers, makers, artists and creative partners in the Design Kosova community.'],
];
for (const initiative of INIT) {
  if (initiative.k !== 'shop') sections.push([initiative.k, initiative.name, initiative.line, initiative.img]);
}
for (const [key, title, description] of [
  ['privacy', 'Privacy Policy', 'How Design Kosova Foundation handles personal information when you visit our website or contact us.'],
  ['cookies', 'Cookie Policy', 'Information about cookies, local storage and third-party resources on the Design Kosova website.'],
]) {
  if (typeof P[key] === 'function') sections.push([key, title, description]);
}

function render(file, route, title, description, image, kind = 'website', product, indexable = true) {
  const pathname = route === 'home' ? '/' : '/' + route;
  context.location.pathname = pathname;
  vm.runInContext('markN = 0', context);
  const pageHtml = product ? P.product(product) : P[route]();
  const url = origin + pathname;
  const fullTitle = route === 'home' ? 'Design Kosova Foundation | Design in Kosovo' : `${title} | Design Kosova Foundation`;
  const imageUrl = absoluteImage(image);
  const metadata = [
    '<!-- SEO START -->',
    `<link rel="canonical" href="${esc(url)}">`,
    `<meta name="robots" content="${indexable ? 'index, follow, max-image-preview:large' : 'noindex, follow'}">`,
    `<meta property="og:type" content="${kind}">`,
    '<meta property="og:site_name" content="Design Kosova Foundation">',
    '<meta property="og:locale" content="en_US">',
    `<meta property="og:title" content="${esc(fullTitle)}">`,
    `<meta property="og:description" content="${esc(description)}">`,
    `<meta property="og:url" content="${esc(url)}">`,
    `<meta property="og:image" content="${esc(imageUrl)}">`,
    `<meta property="og:image:alt" content="${esc(title)}">`,
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${esc(fullTitle)}">`,
    `<meta name="twitter:description" content="${esc(description)}">`,
    `<meta name="twitter:image" content="${esc(imageUrl)}">`,
    '<!-- SEO END -->',
  ].join('\n');
  const html = source
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(fullTitle)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(description)}">\n${metadata}`)
    .replace(/<main id="app"(?: data-prerender-path="[^"]*")?>[\s\S]*?<\/main>/,
      `<main id="app" data-prerender-path="${esc(pathname)}">${pageHtml}${footer()}</main>`)
    .replace(/[ \t]+$/gm, '');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  return pathname;
}

const urls = [render(path.join(root, 'index.html'), 'home', 'Design Kosova Foundation',
  'Design Kosova Foundation connects Kosovo’s creative community with the world through exhibitions, education, design projects and collaboration.')];
for (const [route, title, description, image] of sections) {
  urls.push(render(path.join(root, route + '.html'), route, title, description, image));
}
for (const product of PRODUCTS) {
  const route = 'shop/' + product.slug;
  render(path.join(root, route + '.html'), route, product.n,
    `${product.n} by ${product.m}. Discover design from Kosovo’s creative community at Design Kosova Foundation.`,
    product.img, 'product', product, false);
}
const notFound = '<section class="phero"><div class="wrap"><p class="label blue">404 · Page not found</p><h1 class="h-xl">This page does not exist.</h1><p class="body-l">Explore Design Kosova’s projects or return to the home page.</p><p style="margin-top:28px"><a class="btn solid" href="/">Go Home →</a> <a class="btn" href="/projects">Explore Projects →</a></p></div></section>';
const notFoundHtml = source
  .replace(/<title>[\s\S]*?<\/title>/, '<title>Page Not Found | Design Kosova Foundation</title>')
  .replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="The requested page could not be found.">\n<meta name="robots" content="noindex, follow">')
  .replace(/<main id="app"(?: data-prerender-path="[^"]*")?>[\s\S]*?<\/main>/,
    `<main id="app" data-prerender-path="/404">${notFound}${footer()}</main>`)
  .replace(/[ \t]+$/gm, '');
fs.writeFileSync(path.join(root, '404.html'), notFoundHtml);
fs.writeFileSync(path.join(root, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
fs.writeFileSync(path.join(root, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map(url => `  <url><loc>${origin}${esc(url)}</loc></url>`).join('\n') + '\n</urlset>\n');
console.log(`Generated ${urls.length} indexable pages, ${PRODUCTS.length} unverified product pages, sitemap.xml, robots.txt and 404.html`);
