const fs = require('fs');
const files = ['index.html', 'notas.html', 'matricula.html'];
const tag = '<script src="navigation.js?v=1"></script>';

files.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    if (!html.includes('navigation.js')) {
        // Insert before </body>
        html = html.replace('</body>', '    ' + tag + '\n</body>');
        fs.writeFileSync(file, html);
        console.log('Injected in ' + file);
    } else {
        console.log('Already injected in ' + file);
    }
});
