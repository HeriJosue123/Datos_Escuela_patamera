
window.navigateWithTransition = function(href, tabId) {
    if (!href) return;
    
    if (tabId) {
        localStorage.setItem('alicontrol_active_tab', tabId);
    }
    
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
    }, 1200);
};

window.triggerInternalTransition = function(tabId, callback) {
    const overlay = document.getElementById('global-page-transition');
    if (!overlay) {
        if(callback) callback();
        return;
    }
    
    let destName = 'Cargando Módulo';
    let destIcon = 'fa-solid fa-circle-notch fa-spin text-brand-500';
    let destSubtitle = 'Preparando entorno de trabajo...';
    
    if (tabId === 'dashboard') { destName = 'Dashboard Principal'; destIcon = 'fa-solid fa-chart-pie text-brand-400'; destSubtitle = 'Calculando métricas...'; }
    else if (tabId === 'registro') { destName = 'Registro Diario'; destIcon = 'fa-solid fa-pen text-rose-400'; destSubtitle = 'Cargando asistencia y alimentación...'; }
    else if (tabId === 'ingreso') { destName = 'Ingreso de Factura'; destIcon = 'fa-solid fa-file-invoice text-emerald-400'; destSubtitle = 'Cargando módulo de inventario...'; }
    else if (tabId === 'kardex') { destName = 'Kardex Bimensual'; destIcon = 'fa-solid fa-book-open text-violet-400'; destSubtitle = 'Generando historial...'; }
    else if (tabId === 'tabla-amarilla') { destName = 'Tabla Amarilla'; destIcon = 'fa-solid fa-table text-yellow-400'; destSubtitle = 'Cargando matriz...'; }
    else if (tabId === 'ciclos') { destName = 'Parvularia y Ciclos'; destIcon = 'fa-solid fa-users text-cyan-400'; destSubtitle = 'Cargando secciones...'; }
    else if (tabId === 'config') { destName = 'Configuración'; destIcon = 'fa-solid fa-cog fa-spin text-slate-400'; destSubtitle = 'Cargando ajustes...'; }
    
    document.getElementById('global-transition-title').innerText = destName;
    document.getElementById('global-transition-icon').className = 'text-6xl ' + destIcon;
    document.getElementById('global-transition-subtitle').innerText = destSubtitle;
    
    const bar = document.getElementById('global-transition-bar');
    if (bar) bar.style.width = '0%';
    
    overlay.classList.add('active');
    
    setTimeout(() => {
        if (bar) bar.style.width = '100%';
    }, 50);
    
    setTimeout(() => {
        if(callback) callback();
    }, 600);

    setTimeout(() => {
        overlay.classList.remove('active');
        setTimeout(() => {
            if (bar) bar.style.width = '0%';
        }, 300);
    }, 1200);
};
