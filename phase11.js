const fs = require('fs');

let html = fs.readFileSync('notas.html', 'utf8');
html = html.replace(/\r\n/g, '\n');

function replaceExact(oldStr, newStr, desc) {
    if (html.indexOf(oldStr) !== -1) {
        html = html.replace(oldStr, newStr);
        console.log("SUCCESS: " + desc);
    } else {
        console.log("FAILED: " + desc);
    }
}

const oldNav = `<div class="sidebar-nav-items">
    <button class="sidebar-nav-btn" onclick="window.location.href=\\'index.html\\'" id="tab-dashboard" onclick="localStorage.setItem('active_tab', 'dashboard'); window.location.href='index.html';">
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
    <button class="sidebar-nav-btn" onclick="window.location.href='notas.html'">
      <span class="sidebar-nav-icon">🎓</span>
      <span class="sidebar-nav-label">Control de Notas</span>
      <span class="sidebar-nav-badge" style="background:var(--brand-500)">IA</span>
    </button>
    <button class="sidebar-nav-btn" data-tab="config" id="tab-config" onclick="localStorage.setItem('active_tab', 'config'); window.location.href='index.html';">
      <span class="sidebar-nav-icon">⚙️</span>
      <span class="sidebar-nav-label">Configuración</span>
    </button>
  </div>`;

const oldNavFixed = oldNav.replace(/\\'/g, "'");

const newNav = `<div class="sidebar-nav-items">
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
    <button class="sidebar-nav-btn active" onclick="window.location.href='notas.html'">
      <span class="sidebar-nav-icon">🎓</span>
      <span class="sidebar-nav-label">Control de Notas</span>
      <span class="sidebar-nav-badge" style="background:var(--brand-500)">IA</span>
    </button>
    <button class="sidebar-nav-btn" data-tab="config" id="tab-config" onclick="localStorage.setItem('active_tab', 'config'); window.location.href='index.html';">
      <span class="sidebar-nav-icon">⚙️</span>
      <span class="sidebar-nav-label">Configuración</span>
    </button>
  </div>`;

// Since there's backslashes in the original HTML source, we try matching both exact and unescaped.
if (html.indexOf(oldNav) !== -1) {
    replaceExact(oldNav, newNav, "Sidebar nav items duplicate fix");
} else {
    // try to match replacing the backslashes
    const actualOldNav = `<div class="sidebar-nav-items">
    <button class="sidebar-nav-btn" onclick="window.location.href=\\'index.html\\'" id="tab-dashboard" onclick="localStorage.setItem('active_tab', 'dashboard'); window.location.href='index.html';">`;
    // We will just do a generic replacement for the broken line
    html = html.replace(/<button class="sidebar-nav-btn" onclick="window\.location\.href=\\'index\.html\\'" id="tab-dashboard" onclick="localStorage\.setItem\('active_tab', 'dashboard'\); window\.location\.href='index\.html';">/g, 
        `<button class="sidebar-nav-btn" id="tab-dashboard" onclick="localStorage.setItem('active_tab', 'dashboard'); window.location.href='index.html';">`);
    html = html.replace(/<button class="sidebar-nav-btn" onclick="window\.location\.href='notas\.html'">/g, 
        `<button class="sidebar-nav-btn active" onclick="window.location.href='notas.html'">`);
    console.log("SUCCESS: Sidebar nav items regex fix");
}

const oldToggle = `function toggleSidebar() {
  const sidebar = document.getElementById('sidebar-menu');
  const overlay = document.getElementById('sidebar-overlay');
  const btn = document.getElementById('hamburger-btn');
  if (sidebar.classList.contains('open')) { closeSidebar(); } else {
    sidebar.classList.add('open'); overlay.classList.add('active'); btn.classList.add('active');
  }
}`;
const newToggle = `function toggleSidebar(event) {
  if (event) event.stopPropagation();
  const sidebar = document.getElementById('sidebar-menu');
  const overlay = document.getElementById('sidebar-overlay');
  const btn = document.getElementById('hamburger-btn');
  if (sidebar.classList.contains('open')) { closeSidebar(); } else {
    sidebar.classList.add('open'); overlay.classList.add('active'); btn.classList.add('active');
  }
}`;
replaceExact(oldToggle, newToggle, "toggleSidebar add stopPropagation");

const oldHamburgerBtn = `<button class="hamburger-btn" id="hamburger-btn" onclick="toggleSidebar()" aria-label="Abrir menú">`;
const newHamburgerBtn = `<button class="hamburger-btn" id="hamburger-btn" onclick="toggleSidebar(event)" aria-label="Abrir menú">`;
replaceExact(oldHamburgerBtn, newHamburgerBtn, "Hamburger btn pass event");

fs.writeFileSync('notas.html', html);
console.log('HTML updated');
