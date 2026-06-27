const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');
let notasHtml = fs.readFileSync('notas.html', 'utf8');

// Extract the header and sidebar from index.html
// We look from '<body>' to '<!-- ════════════════════ MAIN ════════════════════ -->'
let startIndex = indexHtml.indexOf('<body>') + 6;
let endIndex = indexHtml.indexOf('<main class="main-content">');
let sidebarAndHeader = indexHtml.substring(startIndex, endIndex);

// Make sure the active button is "Control de Notas" instead of "Inicio"
sidebarAndHeader = sidebarAndHeader.replace('class="sidebar-nav-btn active" data-tab="dashboard"', 'class="sidebar-nav-btn" onclick="window.location.href=\\\'index.html\\\'"');
sidebarAndHeader = sidebarAndHeader.replace('onclick="window.location.href=\\\'notas.html\\\'"', 'class="sidebar-nav-btn active"');

// We also need to add the JS for the sidebar.
const sidebarScript = `
<script>
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar-menu');
  const overlay = document.getElementById('sidebar-overlay');
  const btn = document.getElementById('hamburger-btn');
  if (sidebar.classList.contains('open')) { closeSidebar(); } else {
    sidebar.classList.add('open'); overlay.classList.add('active'); btn.classList.add('active');
  }
}
function closeSidebar() {
  document.getElementById('sidebar-menu').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('active');
  document.getElementById('hamburger-btn').classList.remove('active');
}
</script>
`;

// Replace <body class="..."> in notas.html with <body class="app-container"> + sidebar
let bodyMatch = notasHtml.match(/<body[^>]*>/)[0];

let injectedBody = `${bodyMatch}
<div class="app-container">
${sidebarAndHeader}
<main class="main-content">
`;

notasHtml = notasHtml.replace(bodyMatch, injectedBody);

// Close the tags at the very end of notas.html before </body>
notasHtml = notasHtml.replace('</body>', `</main>\n</div>\n${sidebarScript}\n</body>`);

// Update <head> to include styles.css
let headInjection = `
    <!-- Link to the main app styles -->
    <link rel="stylesheet" href="styles.css?v=6" />
</head>`;
notasHtml = notasHtml.replace('</head>', headInjection);

fs.writeFileSync('notas.html', notasHtml);
console.log('Sidebar injection completed.');
