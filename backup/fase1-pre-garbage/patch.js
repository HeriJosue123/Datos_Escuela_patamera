const fs = require('fs');
let js = fs.readFileSync('notas.js', 'utf8');

js = js.replace(/updateDbStatus\('online',/g, "updateDbStatus('connected',");
js = js.replace(/year:'numeric', /g, "");

fs.writeFileSync('notas.js', js);
