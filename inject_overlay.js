const fs = require('fs');
const files = ['index.html', 'notas.html', 'matricula.html'];

const htmlBlock = `
    <!-- Global Page Transition Overlay -->
    <div id="global-page-transition" class="fixed inset-0 z-[99999] bg-[#0a1120]/60 backdrop-blur-md flex flex-col items-center justify-center pointer-events-none opacity-0 transition-opacity duration-300">
        <div class="flex flex-col items-center justify-center transform scale-95 transition-transform duration-300" id="global-transition-content">
            <div class="text-brand-500 mb-6 drop-shadow-[0_0_15px_rgba(56,189,248,0.6)]">
                <i id="global-transition-icon" class="fa-solid fa-circle-notch fa-spin text-6xl"></i>
            </div>
            <h2 id="global-transition-title" class="text-3xl font-extrabold text-slate-100 mb-2 tracking-wider">Cargando...</h2>
            <p id="global-transition-subtitle" class="text-slate-400 text-sm mb-8 font-medium">Preparando el entorno de trabajo</p>
            
            <div class="w-72 h-1.5 bg-[#1a2942] rounded-full overflow-hidden shadow-inner border border-white/5">
                <div id="global-transition-bar" class="h-full bg-gradient-to-r from-brand-500 via-blue-400 to-indigo-500 w-0 transition-all ease-out rounded-full shadow-[0_0_10px_rgba(56,189,248,0.8)]" style="transition-duration: 800ms;"></div>
            </div>
        </div>
    </div>
`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('global-page-transition')) {
        content = content.replace('</body>', htmlBlock + '\n</body>');
        fs.writeFileSync(file, content);
        console.log('Injected HTML to ' + file);
    }
});
