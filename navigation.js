
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
