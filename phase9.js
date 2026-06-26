const fs = require('fs');

let html = fs.readFileSync('notas.html', 'utf8');
html = html.replace(/\r\n/g, '\n');

function replaceExact(oldStr, newStr, desc) {
    if (html.indexOf(oldStr) !== -1) {
        html = html.replace(oldStr, newStr);
        console.log("SUCCESS: " + desc);
    } else {
        console.log("FAILED: " + desc);
    }
}

const oldBlock = `                <!-- Alumnos en Riesgo List -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="bg-[#1a2942]/60 p-6 rounded-2xl border border-[#2d3f5e] shadow-sm hover:bg-[#1a2942] transition-colors h-full flex flex-col">
                        <h4 class="font-bold text-slate-200 text-sm mb-4 border-b border-[#2d3f5e]/60 pb-3 flex items-center gap-2">
                            <i class="fa-solid fa-circle-exclamation text-rose-500 bg-rose-500/10 p-1.5 rounded text-xs"></i> Alumnos que requieren Refuerzo (&lt; 6.0)
                        </h4>
                        <div class="overflow-y-auto flex-1 max-h-40 border border-rose-500/20 rounded-xl p-3 bg-[#142138] shadow-inner">
                            <ul class="divide-y divide-[#2d3f5e] text-xs font-semibold text-slate-200" id="risk-students-list">
                                <!-- JS will populate lists -->
                            </ul>
                        </div>
                    </div>
                    
                    <!-- Automatic recommendations panel -->
                    <div class="bg-[#1a2942]/60 p-6 rounded-2xl border border-[#2d3f5e] shadow-sm hover:bg-[#1a2942] transition-colors h-full flex flex-col justify-between">
                        <div>
                            <h4 class="font-bold text-slate-200 text-sm mb-4 border-b border-[#2d3f5e]/60 pb-3 flex items-center gap-2">
                                <i class="fa-solid fa-lightbulb text-amber-500 bg-amber-500/10 p-1.5 rounded text-xs"></i> Recomendaciones Pedagógicas
                            </h4>
                            <p class="text-xs text-slate-300 leading-relaxed font-medium bg-[#142138] p-4 rounded-xl border border-[#2d3f5e] shadow-inner" id="pedagogical-tips">
                                Agrega notas y evalúa para recibir retroalimentación automática sobre el avance de la sección.
                            </p>
                        </div>
                        <div class="mt-4 border-t border-[#2d3f5e] pt-3 flex justify-end">
                            <span class="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Analizador Inteligente de Rendimiento</span>
                        </div>
                    </div>
                </div>`;

const newBlock = `                <!-- Alumnos en Riesgo List -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    <div class="bg-[#1a2942]/60 p-7 rounded-2xl border border-[#2d3f5e] shadow-sm hover:bg-[#1a2942] transition-colors h-full flex flex-col">
                        <h4 class="font-extrabold text-slate-100 text-base mb-5 border-b border-[#2d3f5e]/80 pb-4 flex items-center gap-3">
                            <div class="bg-rose-500/10 border border-rose-500/20 p-2 rounded-xl text-rose-500">
                                <i class="fa-solid fa-circle-exclamation text-lg"></i> 
                            </div>
                            Alumnos que requieren Refuerzo
                        </h4>
                        <div class="overflow-y-auto flex-1 max-h-[200px] rounded-xl pr-2 custom-scrollbar">
                            <ul class="flex flex-col gap-2.5 text-xs font-semibold text-slate-200" id="risk-students-list">
                                <!-- JS will populate lists, CSS will style them as cards -->
                            </ul>
                        </div>
                    </div>
                    
                    <!-- Automatic recommendations panel -->
                    <div class="bg-[#1a2942]/60 p-7 rounded-2xl border border-[#2d3f5e] shadow-sm hover:bg-[#1a2942] transition-colors h-full flex flex-col justify-between">
                        <div class="flex flex-col h-full">
                            <h4 class="font-extrabold text-slate-100 text-base mb-5 border-b border-[#2d3f5e]/80 pb-4 flex items-center gap-3">
                                <div class="bg-amber-500/10 border border-amber-500/20 p-2 rounded-xl text-amber-500">
                                    <i class="fa-solid fa-lightbulb text-lg"></i>
                                </div>
                                Recomendaciones Pedagógicas
                            </h4>
                            
                            <div class="flex-1 bg-gradient-to-br from-[#142138] to-amber-900/10 p-5 rounded-xl border border-amber-500/20 shadow-inner flex items-start gap-4">
                                <div class="bg-amber-500/20 p-2.5 rounded-full text-amber-400 mt-0.5 shadow-sm">
                                    <i class="fa-solid fa-wand-magic-sparkles"></i>
                                </div>
                                <p class="text-[13.5px] text-amber-100/90 leading-relaxed font-medium flex-1 tracking-wide" id="pedagogical-tips">
                                    Agrega notas y evalúa para recibir retroalimentación automática sobre el avance de la sección.
                                </p>
                            </div>
                        </div>
                        
                        <div class="mt-6 border-t border-[#2d3f5e] pt-4 flex justify-end">
                            <span class="text-[10px] uppercase font-bold text-slate-500 tracking-widest bg-[#142138] px-3 py-1 rounded-md border border-[#2d3f5e]">Analizador Inteligente de Rendimiento</span>
                        </div>
                    </div>
                </div>`;

replaceExact(oldBlock, newBlock, "Risk and tips cards UI");

fs.writeFileSync('notas.html', html);
console.log('HTML updated');

// Let's add the CSS to convert JS <li> elements into cards
let css = fs.readFileSync('styles.css', 'utf8');

const additionalCss = `

/* ─── Risk Students Cards (Overriding JS HTML purely via CSS) ──────────────────────── */
#risk-students-list li {
    background-color: rgba(15, 23, 42, 0.4) !important; /* bg-slate-900/40 */
    border: 1px solid rgba(225, 29, 72, 0.2) !important;
    border-radius: 0.75rem !important; /* rounded-xl */
    padding: 0.8rem 1rem !important;
    transition: all 0.2s ease-in-out;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#risk-students-list li:hover {
    background-color: rgba(225, 29, 72, 0.1) !important;
    border-color: rgba(225, 29, 72, 0.4) !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(225, 29, 72, 0.1);
}

#risk-students-list li span:last-child {
    background-color: rgba(225, 29, 72, 0.15) !important;
    color: #f43f5e !important;
    border: 1px solid rgba(225, 29, 72, 0.3) !important;
    padding: 0.25rem 0.75rem !important;
    border-radius: 9999px !important;
    font-size: 0.75rem !important;
    font-weight: 800 !important;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

#risk-students-list li i {
    color: #f43f5e !important;
    margin-right: 0.5rem !important;
}

.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(0,0,0,0.1);
    border-radius: 8px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(225, 29, 72, 0.2);
    border-radius: 8px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(225, 29, 72, 0.4);
}
`;

if (css.indexOf('/* ─── Risk Students Cards') === -1) {
    css += additionalCss;
    fs.writeFileSync('styles.css', css);
    console.log("CSS updated");
}
