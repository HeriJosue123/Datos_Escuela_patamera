const fs = require('fs');

// 1. Update styles.css
let css = fs.readFileSync('styles.css', 'utf8');
css = css.replace(/transition:\s*width 0\.8s ease-out;/g, 'transition: width 1.1s ease-out;');
fs.writeFileSync('styles.css', css);
console.log('styles.css updated');

// 2. Update navigation.js
let js = fs.readFileSync('navigation.js', 'utf8');
js = js.replace(/850/g, '1200');
js = js.replace(/450/g, '600');
fs.writeFileSync('navigation.js', js);
console.log('navigation.js updated');
