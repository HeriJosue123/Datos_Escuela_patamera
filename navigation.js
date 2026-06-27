// Interceptador Global de Navegación para Módulos (Transiciones Suaves)
document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener el overlay (ya inyectado en el HTML)
    const overlay = document.getElementById('global-page-transition');
    if (!overlay) return;

    // 2. Interceptar clicks en enlaces internos
    const links = document.querySelectorAll('a[href]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Si es un enlace interno (no abre nueva pestaña y es a un HTML del sistema)
            if (href && href.endsWith('.html') && link.target !== '_blank') {
                e.preventDefault(); // Detener navegación inmediata
                
                // Configurar textos e íconos según el destino
                let destName = "Iniciando Módulo";
                let destIcon = "fa-solid fa-circle-notch fa-spin";
                let destSubtitle = "Cargando componentes de interfaz...";
                
                if (href.includes('notas.html')) {
                    destName = "Control de Notas";
                    destIcon = "fa-solid fa-graduation-cap animate-bounce text-emerald-400";
                    destSubtitle = "Cargando cuadros de evaluación de los estudiantes...";
                } else if (href.includes('matricula.html')) {
                    destName = "Nómina y Matrícula";
                    destIcon = "fa-solid fa-users animate-pulse text-indigo-400";
                    destSubtitle = "Obteniendo registro oficial de estudiantes...";
                } else if (href.includes('index.html') || href === 'index.html') {
                    destName = "Alimentos y Menú";
                    destIcon = "fa-solid fa-utensils animate-bounce text-orange-400";
                    destSubtitle = "Cargando inventario y estadísticas de entrega...";
                } else if (href.includes('dashboard.html')) {
                    destName = "Dashboard Principal";
                    destIcon = "fa-solid fa-chart-pie animate-pulse text-brand-400";
                    destSubtitle = "Calculando métricas generales de la escuela...";
                }
                
                // Aplicar textos
                document.getElementById('global-transition-title').innerText = destName;
                document.getElementById('global-transition-icon').className = `text-6xl ${destIcon}`;
                document.getElementById('global-transition-subtitle').innerText = destSubtitle;
                
                // Mostrar overlay
                overlay.classList.remove('opacity-0', 'pointer-events-none');
                overlay.classList.add('opacity-100', 'pointer-events-auto');
                
                const content = document.getElementById('global-transition-content');
                content.classList.remove('scale-95');
                content.classList.add('scale-100');
                
                // Animar la barra progresivamente
                setTimeout(() => {
                    document.getElementById('global-transition-bar').style.width = '100%';
                }, 50);
                
                // Realizar la navegación real cuando termine la animación de la barra
                setTimeout(() => {
                    window.location.href = href;
                }, 1000);
            }
        });
    });
});
