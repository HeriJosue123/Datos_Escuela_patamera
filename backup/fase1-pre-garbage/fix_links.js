const fs = require('fs');

const navJsContent = `
// Interceptador Global de Navegación para Módulos (Transiciones Suaves)

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
    
    overlay.classList.remove('opacity-0', 'pointer-events-none');
    overlay.classList.add('opacity-100', 'pointer-events-auto');
    
    const content = document.getElementById('global-transition-content');
    if(content) {
        content.classList.remove('scale-95');
        content.classList.add('scale-100');
    }
    
    setTimeout(() => {
        const bar = document.getElementById('global-transition-bar');
        if(bar) bar.style.width = '100%';
    }, 50);
    
    setTimeout(() => {
        window.location.href = href;
    }, 800);
};

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.endsWith('.html') && link.target !== '_blank') {
                e.preventDefault();
                window.navigateWithTransition(href);
            }
        });
    });
});
`;

fs.writeFileSync('navigation.js', navJsContent);
console.log('navigation.js updated');

const files = ['index.html', 'notas.html', 'matricula.html'];
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/onclick="window\.location\.href='([^']+)'"/g, "onclick=\"navigateWithTransition('$1')\"");
    content = content.replace(/onclick='window\.location\.href="([^"]+)"'/g, "onclick='navigateWithTransition(\"$1\")'");
    fs.writeFileSync(file, content);
    console.log(file + ' updated');
});
