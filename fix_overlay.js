const fs = require('fs');

// 1. Append CSS to styles.css
let css = fs.readFileSync('styles.css', 'utf8');
if (!css.includes('#global-page-transition')) {
    css += `
/* ─── Global Page Transition ──────────────────────── */
#global-page-transition {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 999999;
  background: rgba(10, 17, 32, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

#global-page-transition.active {
  opacity: 1;
  visibility: visible;
  pointer-events: all;
}

#global-transition-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: scale(0.95);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

#global-page-transition.active #global-transition-content {
  transform: scale(1);
}

.transition-bar-wrapper {
  width: 280px;
  height: 6px;
  background: #1a2942;
  border-radius: 99px;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.05);
}

#global-transition-bar {
  height: 100%;
  background: linear-gradient(90deg, #0ea5e9, #60a5fa, #6366f1);
  width: 0%;
  border-radius: 99px;
  transition: width 0.8s ease-out;
  box-shadow: 0 0 10px rgba(56,189,248,0.8);
}
`;
    fs.writeFileSync('styles.css', css);
    console.log('CSS added');
}

// 2. Rewrite HTML overlay to use these classes instead of Tailwind
const htmlFiles = ['index.html', 'notas.html', 'matricula.html'];
const newOverlay = `    <!-- Global Page Transition Overlay -->
    <div id="global-page-transition">
        <div id="global-transition-content">
            <div class="text-brand-500 mb-6 drop-shadow-[0_0_15px_rgba(56,189,248,0.6)]">
                <i id="global-transition-icon" class="fa-solid fa-circle-notch fa-spin text-6xl"></i>
            </div>
            <h2 id="global-transition-title" class="text-3xl font-extrabold text-slate-100 mb-2 tracking-wider">Cargando...</h2>
            <p id="global-transition-subtitle" class="text-slate-400 text-sm mb-8 font-medium">Preparando el entorno de trabajo</p>
            
            <div class="transition-bar-wrapper">
                <div id="global-transition-bar"></div>
            </div>
        </div>
    </div>`;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    // Replace old overlay block with new one
    const regex = /<!-- Global Page Transition Overlay -->[\s\S]*?<div id="global-transition-bar"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/g;
    content = content.replace(regex, newOverlay);
    fs.writeFileSync(file, content);
    console.log(file + ' HTML updated');
});

// 3. Update navigation.js
const navContent = `
window.navigateWithTransition = function(href) {
    if (!href) return;
    const overlay = document.getElementById('global-page-transition');
    if (!overlay) {
        window.location.href = href;
        return;
    }
    
    let destName = 'Iniciando Módulo';
    let destIcon = 'fa-solid fa-circle-notch fa-spin';
    let destSubtitle = 'Cargando componentes de interfaz...';
    
    if (href.includes('notas.html')) {
        destName = 'Control de Notas';
        destIcon = 'fa-solid fa-graduation-cap animate-bounce text-emerald-400';
        destSubtitle = 'Cargando cuadros de evaluación de los estudiantes...';
    } else if (href.includes('matricula.html')) {
        destName = 'Nómina y Matrícula';
        destIcon = 'fa-solid fa-users animate-pulse text-indigo-400';
        destSubtitle = 'Obteniendo registro oficial de estudiantes...';
    } else if (href.includes('index.html') || href === 'index.html' || href === '/') {
        destName = 'Alimentos y Menú';
        destIcon = 'fa-solid fa-utensils animate-bounce text-orange-400';
        destSubtitle = 'Cargando inventario y estadísticas de entrega...';
    } else if (href.includes('dashboard.html')) {
        destName = 'Dashboard Principal';
        destIcon = 'fa-solid fa-chart-pie animate-pulse text-brand-400';
        destSubtitle = 'Calculando métricas generales de la escuela...';
    }
    
    document.getElementById('global-transition-title').innerText = destName;
    document.getElementById('global-transition-icon').className = 'text-6xl ' + destIcon;
    document.getElementById('global-transition-subtitle').innerText = destSubtitle;
    
    overlay.classList.add('active');
    
    setTimeout(() => {
        const bar = document.getElementById('global-transition-bar');
        if(bar) bar.style.width = '100%';
    }, 50);
    
    setTimeout(() => {
        window.location.href = href;
    }, 850);
};
`;
fs.writeFileSync('navigation.js', navContent);
console.log('navigation.js updated');
