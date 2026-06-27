const fs = require('fs');

// 1. UPDATE CSS IN styles.css
let css = fs.readFileSync('styles.css', 'utf8');

// Remove old transition CSS
css = css.replace(/\/\* ─── Global Page Transition[\\s\\S]*?(?=\/\*|$)/, '');

const newCSS = `/* ─── Global Page Transition Premium ──────────────────────── */
#global-page-transition {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 999999;
  background: radial-gradient(circle at center, rgba(14,165,233,0.05) 0%, rgba(10, 15, 30, 0.95) 100%), var(--bg-base);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
  overflow: hidden;
}

#global-page-transition.active {
  opacity: 1;
  visibility: visible;
  pointer-events: all;
}

/* Marca de agua MINED */
#global-page-transition::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  height: 60%;
  background-image: url('fondo.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  opacity: 0.03;
  filter: brightness(0) invert(1);
  pointer-events: none;
  z-index: 1;
}

/* Partículas luminosas */
.transition-particles {
  position: absolute;
  inset: 0;
  z-index: 2;
  overflow: hidden;
  pointer-events: none;
}

.particle {
  position: absolute;
  background: rgba(14, 165, 233, 0.4);
  box-shadow: 0 0 10px rgba(14, 165, 233, 0.8);
  border-radius: 50%;
  animation: floatParticle 3s infinite ease-in-out alternate;
}

@keyframes floatParticle {
  0% { transform: translateY(0) scale(1); opacity: 0.2; }
  100% { transform: translateY(-20px) scale(1.5); opacity: 0.6; }
}

#global-transition-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
  width: 100%;
  max-width: 450px;
}

/* Staggered Animations Container */
.stagger-1, .stagger-2, .stagger-3 {
  opacity: 0;
  transform: translateY(15px) scale(0.95);
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

#global-page-transition.active .stagger-1 {
  opacity: 1;
  transform: translateY(0) scale(1);
  transition-delay: 0.1s;
}

#global-page-transition.active .stagger-2 {
  opacity: 1;
  transform: translateY(0) scale(1);
  transition-delay: 0.2s;
}

#global-page-transition.active .stagger-3 {
  opacity: 1;
  transform: translateY(0) scale(1);
  transition-delay: 0.3s;
}

/* Header */
.transition-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.header-icon {
  font-size: 2.2rem;
  color: var(--cyan);
  text-shadow: 0 0 15px rgba(14,165,233,0.5);
}
.header-titles h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.02em;
}
.header-titles p {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 0.2rem;
}

/* Dividers */
.transition-divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
  margin: 1.5rem 0;
}

/* Module Info */
.transition-module-info {
  text-align: center;
  margin: 1rem 0;
}
.module-pre-title {
  font-size: 0.7rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 0.5rem;
}
.module-title {
  font-size: 2rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-shadow: 0 0 20px rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

/* Progress Section */
.transition-progress-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.transition-bar-wrapper {
  width: 100%;
  height: 4px;
  background: rgba(255,255,255,0.05);
  border-radius: 99px;
  overflow: hidden;
  position: relative;
  margin-bottom: 1rem;
}

#global-transition-bar {
  height: 100%;
  background: linear-gradient(90deg, #0ea5e9, #8b5cf6);
  width: 0%;
  border-radius: 99px;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

/* Brillo que recorre la barra */
.bar-shine {
  position: absolute;
  top: 0; left: -100%;
  width: 50%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
  animation: sweep 1.2s infinite linear;
}

@keyframes sweep {
  0% { left: -100%; }
  100% { left: 200%; }
}

.loading-message {
  font-size: 0.75rem;
  color: var(--cyan);
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.02em;
  opacity: 0.8;
}
`;

css = css + '\n' + newCSS;
fs.writeFileSync('styles.css', css);
console.log('styles.css updated');


// 2. UPDATE HTML IN FILES
const htmlFiles = ['index.html', 'notas.html', 'matricula.html'];
const newOverlay = `    <!-- Global Page Transition Premium -->
    <div id="global-page-transition">
        <div class="transition-particles" id="particles-container"></div>
        
        <div id="global-transition-content">
            <div class="stagger-1 transition-header">
                <i class="fa-solid fa-graduation-cap header-icon"></i>
                <div class="header-titles">
                    <h3>Sistema Integral Escolar</h3>
                    <p>Centro Escolar Cantón Patamera</p>
                </div>
            </div>
            
            <div class="stagger-1 transition-divider"></div>
            
            <div class="stagger-2 transition-module-info">
                <p class="module-pre-title">Preparando módulo</p>
                <h2 class="module-title">
                    <i id="global-transition-icon" class="fa-solid fa-circle-notch fa-spin text-2xl text-cyan-400"></i>
                    <span id="global-transition-title">CARGANDO...</span>
                </h2>
            </div>
            
            <div class="stagger-2 transition-divider"></div>
            
            <div class="stagger-3 transition-progress-container">
                <div class="transition-bar-wrapper">
                    <div id="global-transition-bar">
                        <div class="bar-shine"></div>
                    </div>
                </div>
                <p id="global-transition-subtitle" class="loading-message">Iniciando sistema...</p>
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


// 3. UPDATE navigation.js
const navContent = `
const loadingMessages = [
    "Sincronizando datos...",
    "Preparando componentes...",
    "Organizando información...",
    "Conectando con base de datos...",
    "Validando registros...",
    "Inicializando interfaz...",
    "Generando estadísticas...",
    "Preparando experiencia..."
];

let messageInterval = null;

function startLoadingMessages() {
    const subtitle = document.getElementById('global-transition-subtitle');
    if (!subtitle) return;
    
    let index = 0;
    subtitle.innerText = loadingMessages[0];
    
    if (messageInterval) clearInterval(messageInterval);
    
    messageInterval = setInterval(() => {
        index = (index + 1) % loadingMessages.length;
        subtitle.innerText = loadingMessages[index];
    }, 150); // Cambia rápido por la duración total de 800ms
}

function stopLoadingMessages() {
    if (messageInterval) clearInterval(messageInterval);
}

function injectParticles() {
    const container = document.getElementById('particles-container');
    if (!container || container.innerHTML !== "") return;
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = (Math.random() * 2) + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        container.appendChild(particle);
    }
}

function getModuleConfig(identifier) {
    let destName = 'CARGANDO...';
    let destIcon = 'fa-solid fa-circle-notch fa-spin text-slate-400';
    
    if (identifier.includes('notas') || identifier === 'notas.html') {
        destName = 'CONTROL DE NOTAS';
        destIcon = 'fa-solid fa-graduation-cap text-emerald-400';
    } else if (identifier.includes('matricula')) {
        destName = 'MATRÍCULAS';
        destIcon = 'fa-solid fa-users text-indigo-400';
    } else if (identifier === 'dashboard') {
        destName = 'DASHBOARD';
        destIcon = 'fa-solid fa-chart-pie text-brand-400';
    } else if (identifier === 'registro') {
        destName = 'REGISTRO DIARIO';
        destIcon = 'fa-solid fa-pen text-rose-400';
    } else if (identifier === 'ingreso') {
        destName = 'INVENTARIO';
        destIcon = 'fa-solid fa-boxes-stacked text-emerald-400';
    } else if (identifier === 'kardex') {
        destName = 'KARDEX';
        destIcon = 'fa-solid fa-book-open text-violet-400';
    } else if (identifier === 'tabla-amarilla') {
        destName = 'CONSOLIDADOS';
        destIcon = 'fa-solid fa-table text-yellow-400';
    } else if (identifier === 'ciclos') {
        destName = 'CICLOS';
        destIcon = 'fa-solid fa-chalkboard-user text-cyan-400';
    } else if (identifier.includes('index') || identifier === '/') {
        destName = 'ALIMENTACIÓN';
        destIcon = 'fa-solid fa-utensils text-orange-400';
    } else if (identifier === 'config') {
        destName = 'CONFIGURACIÓN';
        destIcon = 'fa-solid fa-cog text-slate-400';
    }
    
    return { destName, destIcon };
}

function runPremiumTransition(config, onMidPoint, onEnd) {
    const overlay = document.getElementById('global-page-transition');
    if (!overlay) {
        if(onMidPoint) onMidPoint();
        if(onEnd) onEnd();
        return;
    }
    
    injectParticles();
    
    document.getElementById('global-transition-title').innerText = config.destName;
    document.getElementById('global-transition-icon').className = config.destIcon;
    
    const bar = document.getElementById('global-transition-bar');
    if (bar) bar.style.width = '0%';
    
    overlay.classList.add('active');
    startLoadingMessages();
    
    // Iniciar barra
    setTimeout(() => {
        if(bar) bar.style.width = '100%';
    }, 50);
    
    // Punto medio (cambiar interfaz)
    setTimeout(() => {
        if(onMidPoint) onMidPoint();
    }, 500);
    
    // Fin (desaparecer)
    setTimeout(() => {
        stopLoadingMessages();
        overlay.classList.remove('active');
        document.getElementById('global-transition-subtitle').innerText = "¡Listo!";
        
        setTimeout(() => {
            if(bar) bar.style.width = '0%';
            if(onEnd) onEnd();
        }, 400); // Dar tiempo al fadeout
    }, 800); // 800ms de duración total
}

window.navigateWithTransition = function(href, tabId) {
    if (!href) return;
    
    if (tabId) {
        localStorage.setItem('alicontrol_active_tab', tabId);
    }
    
    const config = getModuleConfig(tabId || href);
    
    runPremiumTransition(config, 
        null, // No midpoint action needed for external navigation
        () => {
            window.location.href = href;
        }
    );
};

window.triggerInternalTransition = function(tabId, callback) {
    const config = getModuleConfig(tabId);
    
    runPremiumTransition(config, 
        () => {
            if(callback) callback();
        },
        null
    );
};
`;

fs.writeFileSync('navigation.js', navContent);
console.log('navigation.js updated');
