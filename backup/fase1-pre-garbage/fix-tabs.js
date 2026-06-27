const fs = require('fs');

// 1. Modificar notas.html
let html = fs.readFileSync('notas.html', 'utf8');

const oldNav = `<nav class="flex space-x-6 border-b border-[#2d3f5e] max-w-3xl">
            <button onclick="switchTab('periodo1')" id="tab-periodo1" class="tab-btn pb-2 text-center font-bold text-sm transition-all duration-200 text-brand-400 border-b-2 border-brand-400">
                1° Periodo
            </button>
            <button onclick="switchTab('periodo2')" id="tab-periodo2" class="tab-btn pb-2 text-center font-semibold text-sm transition-all duration-200 text-slate-400 hover:text-slate-200 border-b-2 border-transparent hover:border-slate-500">
                2° Periodo
            </button>
            <button onclick="switchTab('periodo3')" id="tab-periodo3" class="tab-btn pb-2 text-center font-semibold text-sm transition-all duration-200 text-slate-400 hover:text-slate-200 border-b-2 border-transparent hover:border-slate-500">
                3° Periodo
            </button>
            <button onclick="switchTab('consolidado')" id="tab-consolidado" class="tab-btn pb-2 text-center font-semibold text-sm transition-all duration-200 text-slate-400 hover:text-slate-200 border-b-2 border-transparent hover:border-slate-500">
                Consolidado <span class="consolidado-year-lbl">2026</span>
            </button>
            <button onclick="switchTab('analisis')" id="tab-analisis" class="tab-btn pb-2 text-center font-bold text-sm transition-all duration-200 text-slate-400 hover:text-cyan-400 border-b-2 border-transparent flex items-center justify-center gap-1.5 hover:border-cyan-400">
                <i class="fa-solid fa-chart-pie"></i>
                Estadísticas e IA
            </button>
        </nav>`;

const newNav = `<nav class="flex space-x-3 overflow-x-auto pb-2 mt-8 mb-6 hide-scrollbar max-w-full">
            <button onclick="switchTab('periodo1')" id="tab-periodo1" class="tab-btn px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 flex-shrink-0 bg-brand-600 text-white shadow-lg shadow-brand-500/30">
                1° Periodo
            </button>
            <button onclick="switchTab('periodo2')" id="tab-periodo2" class="tab-btn px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex-shrink-0 bg-[#1a2942] text-slate-300 hover:text-white hover:bg-[#2d3f5e] hover:-translate-y-1 hover:shadow-md">
                2° Periodo
            </button>
            <button onclick="switchTab('periodo3')" id="tab-periodo3" class="tab-btn px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex-shrink-0 bg-[#1a2942] text-slate-300 hover:text-white hover:bg-[#2d3f5e] hover:-translate-y-1 hover:shadow-md">
                3° Periodo
            </button>
            <button onclick="switchTab('consolidado')" id="tab-consolidado" class="tab-btn px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex-shrink-0 bg-[#1a2942] text-slate-300 hover:text-white hover:bg-[#2d3f5e] hover:-translate-y-1 hover:shadow-md">
                Consolidado <span class="consolidado-year-lbl">2026</span>
            </button>
            <button onclick="switchTab('analisis')" id="tab-analisis" class="tab-btn px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex-shrink-0 bg-[#1a2942] text-slate-300 hover:text-cyan-400 hover:bg-[#2d3f5e] hover:-translate-y-1 hover:shadow-md flex items-center justify-center gap-2">
                <i class="fa-solid fa-chart-pie"></i>
                Estadísticas e IA
            </button>
        </nav>`;

html = html.replace(oldNav, newNav);

// Add global style for hide-scrollbar inside notas.html
const hideScrollbarStyle = `
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
`;
html = html.replace('</style>', hideScrollbarStyle + '</style>');

fs.writeFileSync('notas.html', html);


// 2. Modificar notas.js
let js = fs.readFileSync('notas.js', 'utf8');

const oldJsLogic = `            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('text-brand-400', 'border-brand-400', 'font-bold'); btn.classList.add('border-transparent');
                btn.classList.add('text-slate-400', 'hover:text-slate-200', 'hover:border-slate-500', 'font-semibold');
            });
            const activeBtn = document.getElementById(\`tab-\${tabId}\`);
            activeBtn.classList.remove('text-slate-400', 'hover:text-slate-200', 'hover:border-slate-500', 'font-semibold', 'border-transparent');
            activeBtn.classList.add('text-brand-400', 'border-brand-400', 'font-bold');`;

const newJsLogic = `            document.querySelectorAll('.tab-btn').forEach(btn => {
                // Remove active classes
                btn.classList.remove('bg-brand-600', 'text-white', 'font-bold', 'shadow-lg', 'shadow-brand-500/30');
                // Add inactive classes
                btn.classList.add('bg-[#1a2942]', 'text-slate-300', 'font-semibold', 'hover:text-white', 'hover:bg-[#2d3f5e]', 'hover:-translate-y-1', 'hover:shadow-md');
            });
            const activeBtn = document.getElementById(\`tab-\${tabId}\`);
            // Remove inactive classes
            activeBtn.classList.remove('bg-[#1a2942]', 'text-slate-300', 'font-semibold', 'hover:text-white', 'hover:bg-[#2d3f5e]', 'hover:-translate-y-1', 'hover:shadow-md');
            // Add active classes
            activeBtn.classList.add('bg-brand-600', 'text-white', 'font-bold', 'shadow-lg', 'shadow-brand-500/30');`;

js = js.replace(oldJsLogic, newJsLogic);

fs.writeFileSync('notas.js', js);
console.log('Tabs updated!');
