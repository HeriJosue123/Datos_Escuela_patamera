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

// 1. Remove space-y-6 and adjust title padding
replaceExact(
    `<div id="analisis-view" class="space-y-6 hidden">
                <div class="flex items-center justify-between border-b border-[#2d3f5e] pb-3">`,
    `<div id="analisis-view" class="hidden pb-12">
                <div class="flex items-center justify-between border-b border-[#2d3f5e] pb-4 mb-6">`,
    "Analisis view header spacing"
);

// 2. Replace KPI Grid
const oldKpi = `                <!-- KPI Cards Grid -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <!-- Promedio General -->
                    <div class="bg-[#1a2942] p-5 rounded-2xl border border-[#2d3f5e] shadow-lg flex items-center justify-between">
                        <div>
                            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Promedio General</p>
                            <h3 class="text-3xl font-extrabold text-slate-100 mt-1" id="kpi-avg">0.0</h3>
                        </div>
                        <div class="text-brand-500 bg-brand-50 p-3 rounded-lg"><i class="fa-solid fa-calculator text-2xl"></i></div>
                    </div>
                    <!-- Tasa de Aprobación -->
                    <div class="bg-[#1a2942] p-5 rounded-2xl border border-[#2d3f5e] shadow-lg flex items-center justify-between">
                        <div>
                            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Aprobación (>=5.0)</p>
                            <h3 class="text-3xl font-extrabold text-emerald-600 mt-1" id="kpi-pass-rate">0%</h3>
                        </div>
                        <div class="text-emerald-500 bg-emerald-50 p-3 rounded-lg"><i class="fa-solid fa-circle-check text-2xl"></i></div>
                    </div>
                    <!-- Alumnos en Riesgo -->
                    <div class="bg-[#1a2942] p-5 rounded-2xl border border-[#2d3f5e] shadow-lg flex items-center justify-between">
                        <div>
                            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Alumnos en Riesgo (&lt;6.0)</p>
                            <h3 class="text-3xl font-extrabold text-rose-600 mt-1" id="kpi-risk">0</h3>
                        </div>
                        <div class="text-rose-500 bg-rose-50 p-3 rounded-lg"><i class="fa-solid fa-triangle-exclamation text-2xl"></i></div>
                    </div>
                    <!-- Nota Máxima -->
                    <div class="bg-[#1a2942] p-5 rounded-2xl border border-[#2d3f5e] shadow-lg flex items-center justify-between">
                        <div>
                            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Nota Más Alta</p>
                            <h3 class="text-3xl font-extrabold text-violet-600 mt-1" id="kpi-max">0.0</h3>
                        </div>
                        <div class="text-violet-500 bg-violet-900/40 text-violet-300 border-[#2d3f5e] p-3 rounded-lg"><i class="fa-solid fa-trophy text-2xl"></i></div>
                    </div>
                </div>`;
const newKpi = `                <!-- KPI Cards Grid -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <!-- Promedio General -->
                    <div class="bg-[#1a2942]/60 p-5 rounded-2xl border border-[#2d3f5e] shadow-sm flex items-center justify-between h-full hover:bg-[#1a2942] transition-colors">
                        <div>
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Promedio General</p>
                            <h3 class="text-4xl font-black tracking-tight text-slate-50" id="kpi-avg">0.0</h3>
                        </div>
                        <div class="text-brand-400 bg-brand-500/10 border border-brand-500/20 p-2.5 rounded-xl"><i class="fa-solid fa-calculator text-xl"></i></div>
                    </div>
                    <!-- Tasa de Aprobación -->
                    <div class="bg-[#1a2942]/60 p-5 rounded-2xl border border-[#2d3f5e] shadow-sm flex items-center justify-between h-full hover:bg-[#1a2942] transition-colors">
                        <div>
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Aprobación (>=5.0)</p>
                            <h3 class="text-4xl font-black tracking-tight text-emerald-400" id="kpi-pass-rate">0%</h3>
                        </div>
                        <div class="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-xl"><i class="fa-solid fa-circle-check text-xl"></i></div>
                    </div>
                    <!-- Alumnos en Riesgo -->
                    <div class="bg-[#1a2942]/60 p-5 rounded-2xl border border-[#2d3f5e] shadow-sm flex items-center justify-between h-full hover:bg-[#1a2942] transition-colors">
                        <div>
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">En Riesgo (&lt;6.0)</p>
                            <h3 class="text-4xl font-black tracking-tight text-rose-500" id="kpi-risk">0</h3>
                        </div>
                        <div class="text-rose-400 bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-xl"><i class="fa-solid fa-triangle-exclamation text-xl"></i></div>
                    </div>
                    <!-- Nota Máxima -->
                    <div class="bg-[#1a2942]/60 p-5 rounded-2xl border border-[#2d3f5e] shadow-sm flex items-center justify-between h-full hover:bg-[#1a2942] transition-colors">
                        <div>
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Nota Más Alta</p>
                            <h3 class="text-4xl font-black tracking-tight text-violet-400" id="kpi-max">0.0</h3>
                        </div>
                        <div class="text-violet-400 bg-violet-500/10 border border-violet-500/20 p-2.5 rounded-xl"><i class="fa-solid fa-trophy text-xl"></i></div>
                    </div>
                </div>`;
replaceExact(oldKpi, newKpi, "KPI Cards Grid");

// 3. Replace Charts
const oldCharts = `                <!-- Charts Area -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Distribution Chart Card -->
                    <div class="bg-[#1a2942] p-5 rounded-2xl border border-[#2d3f5e] shadow-lg">
                        <h4 class="font-bold text-slate-200 text-sm mb-4 border-b pb-2"><i class="fa-solid fa-chart-column mr-1.5 text-brand-500"></i>Distribución de Rendimiento</h4>
                        <div class="h-64 relative">
                            <canvas id="distributionChart"></canvas>
                        </div>
                    </div>
                    <!-- Averages Comparation Period Chart -->
                    <div class="bg-[#1a2942] p-5 rounded-2xl border border-[#2d3f5e] shadow-lg">
                        <h4 class="font-bold text-slate-200 text-sm mb-4 border-b pb-2"><i class="fa-solid fa-chart-line mr-1.5 text-indigo-500"></i>Evolución Promedio por Periodo</h4>
                        <div class="h-64 relative">
                            <canvas id="periodComparisonChart"></canvas>
                        </div>
                    </div>
                </div>`;
const newCharts = `                <!-- Charts Area -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                    <!-- Distribution Chart Card -->
                    <div class="bg-[#1a2942]/60 p-6 rounded-2xl border border-[#2d3f5e] shadow-sm hover:bg-[#1a2942] transition-colors h-full flex flex-col">
                        <h4 class="font-bold text-slate-200 text-sm mb-5 border-b border-[#2d3f5e]/60 pb-3 flex items-center gap-2">
                            <i class="fa-solid fa-chart-column text-brand-400 bg-brand-500/10 p-1.5 rounded text-xs"></i> Distribución de Rendimiento
                        </h4>
                        <div class="h-56 relative w-full flex-1">
                            <canvas id="distributionChart"></canvas>
                        </div>
                    </div>
                    <!-- Averages Comparation Period Chart -->
                    <div class="bg-[#1a2942]/60 p-6 rounded-2xl border border-[#2d3f5e] shadow-sm hover:bg-[#1a2942] transition-colors h-full flex flex-col">
                        <h4 class="font-bold text-slate-200 text-sm mb-5 border-b border-[#2d3f5e]/60 pb-3 flex items-center gap-2">
                            <i class="fa-solid fa-chart-line text-indigo-400 bg-indigo-500/10 p-1.5 rounded text-xs"></i> Evolución Promedio por Periodo
                        </h4>
                        <div class="h-56 relative w-full flex-1">
                            <canvas id="periodComparisonChart"></canvas>
                        </div>
                    </div>
                </div>`;
replaceExact(oldCharts, newCharts, "Charts Grid");

// 4. Update the bottom cards (AI risk and tips) to match Notion style shadow/borders and use mb-10
const oldRisk = `                <!-- Alumnos en Riesgo List -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="bg-[#1a2942] p-5 rounded-2xl border border-[#2d3f5e] shadow-lg">
                        <h4 class="font-bold text-rose-700 text-sm mb-3"><i class="fa-solid fa-circle-exclamation mr-1.5"></i>Alumnos que requieren Refuerzo Escolar (Promedio Anual &lt; 6.0)</h4>
                        <div class="overflow-y-auto max-h-48 border border-rose-100 rounded-lg p-2 bg-rose-50/30">
                            <ul class="divide-y divide-rose-100 text-xs font-semibold text-slate-200" id="risk-students-list">
                                <!-- JS will populate lists -->
                            </ul>
                        </div>
                    </div>
                    
                    <!-- Automatic recommendations panel -->
                    <div class="bg-[#1a2942] p-5 rounded-2xl border border-[#2d3f5e] shadow-lg flex flex-col justify-between">
                        <div>
                            <h4 class="font-bold text-slate-200 text-sm mb-3"><i class="fa-solid fa-lightbulb mr-1.5 text-amber-500"></i>Recomendaciones Pedagógicas Generales</h4>
                            <p class="text-xs text-slate-300 leading-relaxed font-medium" id="pedagogical-tips">
                                Agrega notas y evalúa para recibir retroalimentación automática sobre el avance de la sección.
                            </p>
                        </div>
                        <div class="mt-4 border-t pt-3 flex justify-end">
                            <span class="text-[10px] uppercase font-bold text-slate-400">Analizador Inteligente de Rendimiento C.E.P.</span>
                        </div>
                    </div>
                </div>`;

// Wait! Notice that there's also the "AI INDIVIDUAL STUDENT ANALYZER" above it, which I should also wrap in mb-10.
// Let's replace `bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl shadow-xl p-6 border border-slate-800`
// with `mb-10` appended
replaceExact(
    `bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl shadow-xl p-6 border border-slate-800`,
    `bg-[#1a2942]/60 text-white rounded-2xl shadow-sm hover:bg-[#1a2942] transition-colors p-6 border border-[#2d3f5e] mb-10`,
    "AI Main Analyzer Card styling"
);

// We need to fix the colors of text inside AI Analyzer because we removed the bright gradient. The text was already white/slate-200 mostly.
// Specifically the inner block: `bg-[#1a2942]/5 border-white/10` -> `bg-[#142138] border-[#2d3f5e]`
replaceExact(
    `bg-[#1a2942]/5 rounded-xl p-5 border border-white/10 min-h-[220px] flex flex-col justify-between`,
    `bg-[#142138] rounded-xl p-5 border border-[#2d3f5e] shadow-inner min-h-[220px] flex flex-col justify-between`,
    "AI Output container"
);
replaceExact(
    `border-b border-white/20`,
    `border-b border-[#2d3f5e]`,
    "AI Analyzer Header border"
);

// Now replace risk/tips cards
const newRisk = `                <!-- Alumnos en Riesgo List -->
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
replaceExact(oldRisk, newRisk, "Risk and tips panels");


fs.writeFileSync('notas.html', html);
console.log('HTML updated');
