/* Build a public-only directory so repository files cannot be served by Vercel. */
const fs = require('node:fs');
const path = require('node:path');
const {execFileSync} = require('node:child_process');

const root = path.resolve(__dirname, '..');
execFileSync(process.execPath, [path.join(__dirname, 'generate-pages.cjs')], {cwd: root, stdio: 'inherit'});

const out = path.join(root, 'dist');
fs.rmSync(out, {recursive: true, force: true});
fs.mkdirSync(out);
for (const name of fs.readdirSync(root)) {
  if (name.endsWith('.html') || name === 'robots.txt' || name === 'sitemap.xml') {
    fs.copyFileSync(path.join(root, name), path.join(out, name));
  }
}
for (const dir of ['assets', 'shop']) {
  fs.cpSync(path.join(root, dir), path.join(out, dir), {recursive: true});
}
console.log('Public deployment built in dist/');
