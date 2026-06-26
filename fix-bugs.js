const fs = require('fs');
let html = fs.readFileSync('notas.html', 'utf8');

// 1. Fix AI Button
const oldAIBtn = `<button onclick="openAIAssistantModal()" class="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 active:scale-95 text-white font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-150 flex items-center gap-2">
                        <i class="fa-solid fa-brain"></i>
                        Asistente IA
                    </button>`;
const newAIBtn = `<button onclick="openAIAssistantModal()" title="Asistente IA" class="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 active:scale-95 text-white font-bold h-10 px-4 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300 flex items-center justify-center gap-2 text-xs border border-cyan-300/30">
                        <i class="fa-solid fa-robot text-sm"></i> IA
                    </button>`;
html = html.replace(oldAIBtn, newAIBtn);

// 2. Remove px-0 that broke the icon padding
html = html.replace(/rounded-none px-0 focus/g, 'rounded-none focus');

// 3. Add styling for <select> options
const styleInjection = `
        select option {
            background-color: #1a2942;
            color: #f8fafc;
            font-weight: 600;
        }
`;
html = html.replace('</style>', styleInjection + '</style>');

fs.writeFileSync('notas.html', html);
console.log('Bugs fixed!');
