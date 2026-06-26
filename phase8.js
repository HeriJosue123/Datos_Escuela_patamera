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

const oldBlock = `                <!-- AI INDIVIDUAL STUDENT ANALYZER (New Requested Feature) -->
                <div class="bg-[#1a2942]/60 text-white rounded-2xl shadow-sm hover:bg-[#1a2942] transition-colors p-6 border border-[#2d3f5e] mb-10">
                    <div class="flex items-center gap-3 border-b border-[#2d3f5e] pb-4 mb-4">
                        <div class="bg-cyan-500 text-white p-2.5 rounded-xl shadow-lg shadow-cyan-500/30">
                            <i class="fa-solid fa-robot text-xl"></i>
                        </div>
                        <div>
                            <h3 class="text-lg font-bold">Asistente Pedagógico IA</h3>
                            <p class="text-xs text-blue-200/80">Escribe el nombre de un alumno para analizar su avance y obtener recomendaciones personalizadas</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <!-- Left Search Input Column -->
                        <div class="space-y-3">
                            <label class="block text-xs font-semibold text-blue-200 uppercase tracking-wider">Buscar Alumno en esta Sección</label>
                            <div class="relative">
                                <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                </span>
                                <input id="ai-student-search" type="text" placeholder="Escribe el nombre del alumno/a..." 
                                    oninput="suggestStudents(this.value)"
                                    class="w-full pl-10 pr-2 py-2 bg-[#1a2942]/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 font-semibold uppercase text-sm text-white placeholder-slate-400">
                            </div>
                            <!-- Autocomplete Suggestions List -->
                            <div id="ai-suggestions" class="bg-[#1a2942]/10 rounded-lg overflow-hidden border border-white/10 hidden max-h-32 overflow-y-auto text-xs font-semibold uppercase">
                                <!-- Suggested items populated here -->
                            </div>
                            <!-- Gemini Key Input on Dashboard -->
                            <div class="space-y-1">
                                <label class="block text-[10px] font-semibold text-blue-200 uppercase tracking-wider">Gemini API Key (Para IA Real)</label>
                                <div class="relative">
                                    <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                                        <i class="fa-solid fa-key text-[10px]"></i>
                                    </span>
                                    <input id="dashboard-gemini-api-key-input" type="password" placeholder="API Key para diagnóstico avanzado..." 
                                        oninput="saveGeminiKey(this.value)"
                                        class="w-full pl-8 pr-3 py-1.5 bg-[#1a2942]/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-xs text-white placeholder-slate-500 font-mono">
                                </div>
                            </div>
                            <button onclick="runStudentAIAnalysis()" class="w-full bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-slate-950 font-bold py-2.5 rounded-xl shadow-lg transition-all duration-150 flex items-center justify-center gap-2">
                                <i class="fa-solid fa-wand-magic-sparkles"></i>
                                Analizar con IA
                            </button>
                        </div>

                        <!-- Right Output Diagnostic Card (span-2) -->
                        <div class="lg:col-span-2 bg-[#142138] rounded-xl p-5 border border-[#2d3f5e] shadow-inner min-h-[220px] flex flex-col justify-between" id="ai-output-container">
                            <div class="flex flex-col items-center justify-center text-center h-full py-8 text-blue-200/60" id="ai-blank-state">
                                <i class="fa-solid fa-brain text-4xl mb-2 animate-pulse"></i>
                                <p class="text-sm font-semibold">Esperando selección de alumno para iniciar diagnóstico</p>
                            </div>
                            <!-- Diagnostic result block -->
                            <div id="ai-results" class="hidden space-y-4">
                                <div class="flex items-center justify-between border-b border-white/10 pb-2">
                                    <h4 class="font-extrabold text-cyan-300 text-sm tracking-wide uppercase" id="ai-student-header-name">JUAN MANUEL FLORES ALBERTO</h4>
                                    <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-brand-500 text-white" id="ai-student-trend">ESTABLE</span>
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                                    <div class="space-y-2">
                                        <p class="font-semibold"><i class="fa-solid fa-clipboard-list mr-1 text-cyan-400"></i><strong>Diagnóstico de Notas:</strong></p>
                                        <ul class="space-y-1 text-slate-300 font-medium text-[11px] pl-1 list-none" id="ai-score-units-list">
                                            <!-- Dynamic units list -->
                                        </ul>
                                        <p class="text-xs font-bold text-white mt-2 pt-1.5 border-t border-white/10">
                                            Promedio Final: <span id="ai-score-final" class="font-bold text-cyan-300">0.00</span>
                                        </p>
                                    </div>
                                    <div class="space-y-2">
                                        <p class="font-semibold"><i class="fa-solid fa-gauge-high mr-1 text-cyan-400"></i><strong>Foco Evaluativo:</strong></p>
                                        <p id="ai-score-breakdown" class="text-slate-300 font-medium leading-relaxed">
                                            -
                                        </p>
                                    </div>
                                </div>
                                <div class="bg-[#1a2942]/5 p-3 rounded-lg border border-white/5 space-y-1.5">
                                    <p class="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                                        <i class="fa-solid fa-lightbulb"></i>
                                        Recomendación del Asistente
                                    </p>
                                    <p id="ai-recommendation" class="text-xs text-slate-100 font-semibold leading-relaxed">
                                        -
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;

const newBlock = `                <!-- AI INDIVIDUAL STUDENT ANALYZER (New Requested Feature) -->
                <div class="bg-[#1a2942]/60 text-white rounded-2xl shadow-sm hover:bg-[#1a2942] transition-colors p-6 border border-[#2d3f5e] mb-10">
                    <div class="flex items-center gap-3 border-b border-[#2d3f5e]/60 pb-4 mb-5">
                        <div class="bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 p-3 rounded-xl">
                            <i class="fa-solid fa-robot text-2xl"></i>
                        </div>
                        <div>
                            <h3 class="text-xl font-extrabold text-slate-100">Asistente Pedagógico IA</h3>
                            <p class="text-xs text-slate-400 font-medium">Escribe el nombre de un alumno para analizar su avance y obtener recomendaciones personalizadas</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        <!-- Left Search Input Column -->
                        <div class="lg:col-span-2 flex flex-col gap-5">
                            <div class="space-y-2">
                                <label class="block text-[11px] font-bold text-cyan-400 uppercase tracking-widest">Buscar Alumno</label>
                                <div class="relative">
                                    <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                                        <i class="fa-solid fa-magnifying-glass"></i>
                                    </span>
                                    <input id="ai-student-search" type="text" placeholder="Escribe el nombre..." 
                                        oninput="suggestStudents(this.value)"
                                        class="w-full pl-11 pr-4 py-3 bg-[#142138] border border-[#2d3f5e] rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-semibold uppercase text-sm text-slate-100 placeholder-slate-500 transition-all shadow-inner">
                                </div>
                                <!-- Autocomplete Suggestions List -->
                                <div id="ai-suggestions" class="bg-[#142138] rounded-xl overflow-hidden border border-[#2d3f5e] hidden max-h-32 overflow-y-auto text-xs font-semibold uppercase mt-1 shadow-lg absolute z-10 w-[90%] lg:w-auto">
                                    <!-- Suggested items populated here -->
                                </div>
                            </div>
                            
                            <div class="space-y-2">
                                <label class="block text-[11px] font-bold text-cyan-400 uppercase tracking-widest">API Key de Google Gemini</label>
                                <div class="relative">
                                    <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                                        <i class="fa-solid fa-key"></i>
                                    </span>
                                    <input id="dashboard-gemini-api-key-input" type="password" placeholder="Ingresa la clave..." 
                                        oninput="saveGeminiKey(this.value)"
                                        class="w-full pl-11 pr-4 py-3 bg-[#142138] border border-[#2d3f5e] rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm text-slate-100 placeholder-slate-500 font-mono transition-all shadow-inner">
                                </div>
                            </div>
                            
                            <button onclick="runStudentAIAnalysis()" class="w-full mt-auto bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-[#0c1a30] font-black py-3.5 rounded-xl shadow-lg shadow-cyan-500/20 transition-all duration-200 flex items-center justify-center gap-2 text-[15px]">
                                <i class="fa-solid fa-wand-magic-sparkles text-lg"></i>
                                Analizar con IA
                            </button>
                        </div>

                        <!-- Right Output Diagnostic Card (span-3) -->
                        <div class="lg:col-span-3 bg-[#0c1a30]/80 rounded-2xl p-6 border border-[#2d3f5e] shadow-inner min-h-[250px] flex flex-col font-mono relative overflow-hidden" id="ai-output-container">
                            <!-- Terminal top bar decorative -->
                            <div class="absolute top-0 left-0 w-full h-8 bg-[#142138] border-b border-[#2d3f5e] flex items-center px-4 gap-2">
                                <div class="w-2.5 h-2.5 rounded-full bg-rose-500/50"></div>
                                <div class="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
                                <div class="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></div>
                                <span class="ml-2 text-[10px] text-slate-500 font-sans tracking-widest uppercase font-bold">Consola IA</span>
                            </div>
                            
                            <div class="flex flex-col items-center justify-center text-center h-full py-10 text-cyan-500/20 mt-6 flex-1" id="ai-blank-state">
                                <i class="fa-solid fa-microchip text-6xl mb-4 animate-pulse"></i>
                                <p class="text-sm font-semibold font-sans text-slate-500 tracking-wide">Esperando parámetros para inicializar diagnóstico...</p>
                            </div>
                            
                            <!-- Diagnostic result block -->
                            <div id="ai-results" class="hidden space-y-5 mt-8 font-sans">
                                <div class="flex items-center justify-between border-b border-[#2d3f5e] pb-3">
                                    <h4 class="font-black text-cyan-400 text-base tracking-wider uppercase" id="ai-student-header-name">JUAN MANUEL FLORES ALBERTO</h4>
                                    <span class="px-3 py-1 rounded-md text-[10px] font-black tracking-widest uppercase bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm" id="ai-student-trend">ESTABLE</span>
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                                    <div class="space-y-3 bg-[#142138]/50 p-4 rounded-xl border border-[#2d3f5e]/50">
                                        <p class="font-bold text-slate-300 uppercase tracking-widest text-[10px]"><i class="fa-solid fa-chart-pie mr-1.5 text-cyan-500"></i>Diagnóstico Numérico</p>
                                        <ul class="space-y-2 text-slate-300 font-medium text-[12px] pl-1 list-none" id="ai-score-units-list">
                                            <!-- Dynamic units list -->
                                        </ul>
                                        <p class="text-xs font-bold text-white mt-3 pt-3 border-t border-[#2d3f5e]">
                                            Promedio Final: <span id="ai-score-final" class="font-black text-cyan-400 text-sm ml-1">0.00</span>
                                        </p>
                                    </div>
                                    <div class="space-y-3 bg-[#142138]/50 p-4 rounded-xl border border-[#2d3f5e]/50">
                                        <p class="font-bold text-slate-300 uppercase tracking-widest text-[10px]"><i class="fa-solid fa-microscope mr-1.5 text-cyan-500"></i>Foco Evaluativo</p>
                                        <p id="ai-score-breakdown" class="text-slate-300 font-medium leading-relaxed text-[12px]">
                                            -
                                        </p>
                                    </div>
                                </div>
                                <div class="bg-cyan-900/20 p-5 rounded-xl border border-cyan-800/40 space-y-2">
                                    <p class="text-[11px] font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2 mb-3">
                                        <i class="fa-solid fa-lightbulb text-sm"></i> Recomendación Pedagógica
                                    </p>
                                    <p id="ai-recommendation" class="text-[13px] text-slate-100 font-semibold leading-relaxed">
                                        -
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;

replaceExact(oldBlock, newBlock, "Rediseño completo Asistente IA");

fs.writeFileSync('notas.html', html);
console.log('HTML updated');
