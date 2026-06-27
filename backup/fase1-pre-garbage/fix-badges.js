const fs = require('fs');
let js = fs.readFileSync('notas.js', 'utf8');

const badgesLogic = `
function updateDbStatus(status, text) {
  const badge = document.getElementById('db-status-badge');
  if (!badge) return;
  badge.className = \`db-status-badge \${status}\`;
  badge.innerHTML = \`☁️ \${text}\`;
}

function updateHeaderDate() {
  const dateEl = document.getElementById('header-date-display');
  const sidebarDateEl = document.getElementById('sidebar-date');
  const d = new Date();
  const str = d.toLocaleDateString('es-ES', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
  const formatted = str.charAt(0).toUpperCase() + str.slice(1);
  if (dateEl) dateEl.innerText = '📅 ' + formatted;
  if (sidebarDateEl) sidebarDateEl.innerText = formatted;
}
updateHeaderDate();
setInterval(updateHeaderDate, 60000);

`;

js = js.replace('// Modify local storage calls to sync with Firebase', badgesLogic + '// Modify local storage calls to sync with Firebase');

// Add sync status to syncToFirebase
js = js.replace(/async function syncToFirebase\(\) \{\s*if\(!db\) return;/g, 
`async function syncToFirebase() {
    if(!db) { updateDbStatus('offline', 'Sin Conexión'); return; }
    updateDbStatus('syncing', 'Sincronizando...');`);

js = js.replace(/console\.log\("Datos guardados en Firebase"\);/g, 
`console.log("Datos guardados en Firebase");
        updateDbStatus('online', 'Sincronizado');`);

js = js.replace(/console\.error\("Error guardando a Firebase", e\);/g, 
`console.error("Error guardando a Firebase", e);
        updateDbStatus('error', 'Error al Guardar');`);

// Add sync status to loadFromFirebase
js = js.replace(/localStorage\.setItem\('school_notes_full_progression_db', JSON\.stringify\(database\)\);\s*return true;/g, 
`localStorage.setItem('school_notes_full_progression_db', JSON.stringify(database));
                updateDbStatus('online', 'Sincronizado');
                return true;`);

fs.writeFileSync('notas.js', js);
console.log('Badges logic injected!');
