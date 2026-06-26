const fs = require('fs');
let html = fs.readFileSync('notas.html', 'utf8');

// Replace standard navigateTab calls
html = html.replace(/onclick="navigateTab\('([^']+)', this\)"/g, (match, tab) => {
    return `onclick="localStorage.setItem('active_tab', '${tab}'); window.location.href='index.html';"`;
});

// Clean up the "Inicio" button which had duplicate onclicks
html = html.replace(/<button class="sidebar-nav-btn" onclick="window\.location\.href='index\.html'" id="tab-dashboard" onclick="localStorage\.setItem\('active_tab', 'dashboard'\); window\.location\.href='index\.html';">/,
    `<button class="sidebar-nav-btn" id="tab-dashboard" onclick="localStorage.setItem('active_tab', 'dashboard'); window.location.href='index.html';">`);

fs.writeFileSync('notas.html', html);
console.log('Sidebar fixed!');
