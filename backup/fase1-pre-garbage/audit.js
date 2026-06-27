const fs = require('fs');

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const jsFiles = fs.readdirSync('.').filter(f => f.endsWith('.js'));
const cssFiles = fs.readdirSync('.').filter(f => f.endsWith('.css'));

console.log('--- HTML FILES ---');
console.log(htmlFiles);

console.log('\n--- SCRIPT TAGS IN HTML ---');
const usedJs = new Set();
htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.match(/<script[^>]*src=["']([^"']+)["'][^>]*>/g);
  if (matches) {
    matches.forEach(m => {
      const srcMatch = m.match(/src=["']([^"']+)["']/);
      if (srcMatch) {
         let src = srcMatch[1];
         src = src.split('?')[0]; // strip query params
         usedJs.add(src);
         console.log(file + ' -> ' + src);
      }
    });
  }
});

console.log('\n--- UNUSED JS FILES (Orphans) ---');
const orphans = [];
jsFiles.forEach(f => {
  if (!usedJs.has(f) && !f.startsWith('http')) {
     orphans.push(f);
  }
});
console.log(orphans);

console.log('\n--- CSS FILES ---');
console.log(cssFiles);

// Guardamos este reporte en memoria / para que la IA lo lea
fs.writeFileSync('audit_report.json', JSON.stringify({
    html: htmlFiles,
    usedJs: Array.from(usedJs),
    orphans: orphans,
    css: cssFiles
}, null, 2));
