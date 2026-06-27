
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
