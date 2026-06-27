const fs = require('fs');

// Rename the file
try {
    fs.renameSync('Matricula C.E  2026.html', 'matricula.html');
    console.log("Renamed Matricula C.E 2026.html to matricula.html");
} catch (e) {
    console.log("File might already be renamed.");
}

const sidebarButton = `
    <div class="sidebar-divider"></div>
    <button class="sidebar-nav-btn" onclick="window.location.href='matricula.html'">
      <span class="sidebar-nav-icon">🏫</span>
      <span class="sidebar-nav-label">Matrícula 2026</span>
    </button>`;

function injectToSidebar(file) {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if already injected
    if (content.includes('Matrícula 2026')) {
        console.log(`Already injected in ${file}`);
        return;
    }
    
    // Find the place to inject (before Control de Notas)
    const injectionPoint = `<div class="sidebar-divider"></div>
    <button class="sidebar-nav-btn`;
    
    // We replace the first occurrence of the divider to insert our new button
    content = content.replace('<div class="sidebar-divider"></div>', sidebarButton + '\n    <div class="sidebar-divider"></div>');
    
    fs.writeFileSync(file, content);
    console.log(`Injected Matricula button to ${file}`);
}

injectToSidebar('index.html');
injectToSidebar('notas.html');

// Now we need to inject the sidebar into matricula.html
let matricula = fs.readFileSync('matricula.html', 'utf8');

// Add styles.css link if missing
if (!matricula.includes('styles.css')) {
    matricula = matricula.replace('</head>', '    <link rel="stylesheet" href="styles.css?v=6" />\n</head>');
}

// Ensure the body has the app-container for the sidebar to work
if (!matricula.includes('<div class="app-container">')) {
    matricula = matricula.replace(/<body[^>]*>/, '$&\n<div class="app-container">');
    matricula = matricula.replace('</body>', '</div>\n</body>');
}

// Add the hamburger button to the header
const headerRegex = /<header class="header-bg[^>]*>\s*<div class="container mx-auto px-4 py-6">/;
if (matricula.match(headerRegex) && !matricula.includes('hamburger-btn')) {
    matricula = matricula.replace(headerRegex, `$&
            <button class="hamburger-btn fixed top-6 left-4 z-[60] bg-[#142138] border border-[#2d3f5e] p-2 rounded-lg" id="hamburger-btn" onclick="toggleSidebar(event)" aria-label="Abrir menú" style="display:flex; flex-direction:column; gap:4px; margin-right:15px; position:absolute; left:20px;">
                <span style="width:20px;height:2px;background:#94a3b8;border-radius:2px;"></span>
                <span style="width:20px;height:2px;background:#94a3b8;border-radius:2px;"></span>
                <span style="width:20px;height:2px;background:#94a3b8;border-radius:2px;"></span>
            </button>`);
}

// Add the sidebar overlay and menu right after the header ends
const sidebarHTML = `
<!-- ════════════════════ SIDEBAR OVERLAY ════════════════════ -->
<div class="sidebar-overlay" id="sidebar-overlay" onclick="closeSidebar()"></div>

<!-- ════════════════════ SIDEBAR MENU ════════════════════ -->
<nav class="sidebar-menu" id="sidebar-menu" role="navigation">
  <div class="sidebar-header">
    <div class="sidebar-logo">
      <div class="app-logo-icon">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="45" stroke="currentColor" stroke-width="2.5"/>
          <circle cx="50" cy="50" r="41" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2"/>
          <polygon points="50,20 23,67 77,67" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>
          <path d="M50,42 L50,30 M50,42 L42,35 M50,42 L58,35 M50,42 L38,42 M50,42 L62,42 M50,42 L42,49 M50,42 L58,49 M50,42 L45,55 M50,42 L55,55" stroke="currentColor" stroke-width="1.2"/>
          <path d="M48,42 C48,40 52,40 52,42 L51,45 L49,45 Z" fill="currentColor"/>
          <path d="M22,72 C35,80 65,80 78,72" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <path d="M25,71 L22,68 M32,74 L30,70 M40,76 L39,72 M50,77 L50,73 M60,76 L61,72 M68,74 L70,70 M75,71 L78,68" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <circle cx="50" cy="85" r="1.5" fill="currentColor"/>
          <circle cx="40" cy="83" r="1" fill="currentColor"/>
          <circle cx="60" cy="83" r="1" fill="currentColor"/>
          <circle cx="31" cy="79" r="1" fill="currentColor"/>
          <circle cx="69" cy="79" r="1" fill="currentColor"/>
        </svg>
      </div>
      <div class="app-logo-text">
        <strong>Cantón Patamera</strong>
        <span>Menú Principal</span>
      </div>
    </div>
    <button class="sidebar-close-btn" onclick="closeSidebar()" aria-label="Cerrar menú">✕</button>
  </div>
  <div class="sidebar-nav-items">
    <button class="sidebar-nav-btn" id="tab-dashboard" onclick="localStorage.setItem('active_tab', 'dashboard'); window.location.href='index.html';">
      <span class="sidebar-nav-icon">📊</span>
      <span class="sidebar-nav-label">Inicio</span>
    </button>
    <button class="sidebar-nav-btn" data-tab="registro" id="tab-registro" onclick="localStorage.setItem('active_tab', 'registro'); window.location.href='index.html';">
      <span class="sidebar-nav-icon">✏️</span>
      <span class="sidebar-nav-label">Registro Diario</span>
    </button>
    <button class="sidebar-nav-btn" data-tab="ingreso" id="tab-ingreso" onclick="localStorage.setItem('active_tab', 'ingreso'); window.location.href='index.html';">
      <span class="sidebar-nav-icon">📦</span>
      <span class="sidebar-nav-label">Ingreso de Alimentos</span>
      <span class="sidebar-nav-badge">Nuevo</span>
    </button>
    <button class="sidebar-nav-btn" data-tab="kardex" id="tab-kardex" onclick="localStorage.setItem('active_tab', 'kardex'); window.location.href='index.html';">
      <span class="sidebar-nav-icon">📋</span>
      <span class="sidebar-nav-label">Kardex</span>
    </button>
    <button class="sidebar-nav-btn" data-tab="tabla-amarilla" id="tab-amarilla" onclick="localStorage.setItem('active_tab', 'tabla-amarilla'); window.location.href='index.html';">
      <span class="sidebar-nav-icon">🟡</span>
      <span class="sidebar-nav-label">Tabla Resumen</span>
    </button>
    <button class="sidebar-nav-btn" data-tab="ciclos" id="tab-ciclos" onclick="localStorage.setItem('active_tab', 'ciclos'); window.location.href='index.html';">
      <span class="sidebar-nav-icon">👥</span>
      <span class="sidebar-nav-label">Por Ciclo</span>
    </button>
    
    <div class="sidebar-divider"></div>
    <button class="sidebar-nav-btn active" onclick="window.location.href='matricula.html'">
      <span class="sidebar-nav-icon">🏫</span>
      <span class="sidebar-nav-label">Matrícula 2026</span>
    </button>

    <div class="sidebar-divider"></div>
    <button class="sidebar-nav-btn" onclick="window.location.href='notas.html'">
      <span class="sidebar-nav-icon">🎓</span>
      <span class="sidebar-nav-label">Control de Notas</span>
      <span class="sidebar-nav-badge" style="background:var(--brand-500)">IA</span>
    </button>
    <button class="sidebar-nav-btn" data-tab="config" id="tab-config" onclick="localStorage.setItem('active_tab', 'config'); window.location.href='index.html';">
      <span class="sidebar-nav-icon">⚙️</span>
      <span class="sidebar-nav-label">Configuración</span>
    </button>
  </div>
</nav>
`;

if (!matricula.includes('sidebar-overlay')) {
    matricula = matricula.replace('</header>', '</header>\n' + sidebarHTML);
}

// Add the toggle JS functions
const jsScript = `
<script>
function toggleSidebar(event) {
  if (event) event.stopPropagation();
  const sidebar = document.getElementById('sidebar-menu');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar.classList.contains('open')) { closeSidebar(); } else {
    sidebar.classList.add('open'); overlay.classList.add('active'); 
  }
}
function closeSidebar() {
  document.getElementById('sidebar-menu').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('active');
}
</script>
</body>
`;

if (!matricula.includes('function toggleSidebar')) {
    matricula = matricula.replace('</body>', jsScript);
}

fs.writeFileSync('matricula.html', matricula);
console.log("Injected sidebar into matricula.html");
