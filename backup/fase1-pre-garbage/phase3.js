const fs = require('fs');

let html = fs.readFileSync('notas.html', 'utf8');

const oldStr = `                <!-- PANEL DE CRITERIOS DE EVALUACIÓN -->
                <div class="bg-[#1a2942]/90 rounded-2xl p-5 border border-[#2d3f5e] shadow-lg mt-6">
                    <div class="flex items-center gap-2 border-b border-[#2d3f5e] pb-3 mb-4">
                        <div class="text-brand-600 text-lg bg-brand-50 p-2 rounded-lg">
                            <i class="fa-solid fa-list-check"></i>
                        </div>
                        <div>
                            <h3 class="text-sm font-bold text-slate-100">Criterios de Evaluación y Distribución de Puntaje</h3>
                            <p class="text-[11px] text-slate-400 font-medium">Detalle de las actividades y criterios aplicados en los periodos escolares</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs text-slate-300" id="criteria-distribution-panel">
                        <!-- Actividad 1 -->
                        <div class="space-y-3 bg-[#142138] text-blue-200 p-4 rounded-xl border border-blue-100/50">
                            <h4 class="font-bold text-blue-900 flex justify-between items-center border-b border-blue-100 pb-2">
                                <span class="flex items-center gap-1.5"><i class="fa-solid fa-users-viewfinder text-blue-700"></i>Actividad N° 1 - Integradora (35%)</span>
                                <span class="bg-blue-100/80 text-blue-300 px-2 py-0.5 rounded-full text-[10px] font-bold">Total: 10 Puntos</span>
                            </h4>
                            <ul class="space-y-2 font-semibold">
                                <li class="flex justify-between items-center text-slate-200"><span>U1 a U8: Calificación de Unidades de la 1 a la 8</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-300 font-extrabold text-[10px]">Nota: 0.0 - 10.0</span></li>
                                <li class="flex justify-between items-center text-slate-400 text-[11px] italic">La nota final de la Actividad 1 se obtiene promediando las calificaciones de las 8 unidades.</li>
                            </ul>
                        </div>
                        <!-- Actividad 2 -->
                        <div class="space-y-3 bg-[#142138] text-emerald-200 p-4 rounded-xl border border-emerald-100/50">
                            <h4 class="font-bold text-emerald-900 flex justify-between items-center border-b border-emerald-100 pb-2">
                                <span class="flex items-center gap-1.5"><i class="fa-solid fa-book-reader text-emerald-700"></i>Actividad N° 2 - Cotidianas (35%)</span>
                                <span class="bg-emerald-100/80 text-emerald-300 px-2 py-0.5 rounded-full text-[10px] font-bold">Total: 10 Puntos</span>
                            </h4>
                            <ul class="space-y-2 font-semibold">
                                <li class="flex justify-between items-center text-slate-200"><span>C1: Clases completas en orden</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-300 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>C2: Cumplimiento de tareas asignadas</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-300 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>C3: Ortografía correcta</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-300 font-extrabold text-[10px]">Max: 1.5 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>C4: Letra legible en el cuaderno</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-300 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>C5: Orden y aseo general del cuaderno y escuela</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-300 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>C6: Participación proactiva en clase</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-300 font-extrabold text-[10px]">Max: 1.5 pt</span></li>
                            </ul>
                        </div>
                    </div>
                </div>`;

const newStr = `                <!-- PANEL DE CRITERIOS DE EVALUACIÓN -->
                <div class="bg-[#1a2942] rounded-2xl p-6 border border-[#2d3f5e] shadow-lg mb-12">
                    <div class="flex items-center gap-3 border-b border-[#2d3f5e]/60 pb-5 mb-6">
                        <div class="text-cyan-400 text-xl bg-cyan-500/10 p-3 rounded-xl border border-cyan-500/20">
                            <i class="fa-solid fa-list-check"></i>
                        </div>
                        <div>
                            <h3 class="text-lg font-bold text-slate-100">Criterios de Evaluación y Distribución de Puntaje</h3>
                            <p class="text-[13px] text-slate-400 font-medium">Detalle oficial de las actividades y criterios aplicados en los periodos escolares</p>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm text-slate-300 items-stretch" id="criteria-distribution-panel">
                        <!-- Actividad 1 -->
                        <div class="flex flex-col bg-[#142138] p-6 rounded-2xl border border-[#2d3f5e] shadow-inner h-full">
                            <h4 class="font-bold text-blue-400 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-b border-[#2d3f5e]/60 pb-4 mb-5">
                                <span class="flex items-center gap-2 text-base">
                                    <i class="fa-solid fa-users-viewfinder text-blue-500 text-lg"></i> 
                                    Actividad N° 1 - Integradora (35%)
                                </span>
                                <span class="bg-[#1a2942] text-blue-300 px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-500/30 w-max shadow-sm">Total: 10 Puntos</span>
                            </h4>
                            <ul class="space-y-4 font-medium flex-1">
                                <li class="flex justify-between items-center text-slate-200 bg-[#1a2942]/50 p-3 rounded-xl border border-[#2d3f5e]/40">
                                    <span class="flex items-center gap-2">
                                        <div class="w-1.5 h-1.5 rounded-full bg-blue-500"></div> 
                                        Promedio U1 a U8
                                    </span> 
                                    <span class="bg-[#142138] px-3 py-1 rounded-lg border border-[#2d3f5e] text-blue-400 font-bold text-xs">Max: 10.0 pt</span>
                                </li>
                                <li class="text-slate-400 text-xs italic bg-[#0c1424]/40 p-4 rounded-xl border border-[#2d3f5e]/30 mt-auto">
                                    <i class="fa-solid fa-circle-info mr-1.5 text-blue-500/70"></i> La nota final de la Actividad 1 se obtiene promediando las calificaciones de las 8 unidades.
                                </li>
                            </ul>
                        </div>

                        <!-- Actividad 2 -->
                        <div class="flex flex-col bg-[#142138] p-6 rounded-2xl border border-[#2d3f5e] shadow-inner h-full">
                            <h4 class="font-bold text-emerald-400 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-b border-[#2d3f5e]/60 pb-4 mb-5">
                                <span class="flex items-center gap-2 text-base">
                                    <i class="fa-solid fa-book-reader text-emerald-500 text-lg"></i> 
                                    Actividad N° 2 - Cotidianas (35%)
                                </span>
                                <span class="bg-[#1a2942] text-emerald-300 px-3 py-1.5 rounded-lg text-xs font-bold border border-emerald-500/30 w-max shadow-sm">Total: 10 Puntos</span>
                            </h4>
                            <ul class="space-y-3 font-medium flex-1 flex flex-col justify-between">
                                <li class="flex justify-between items-center text-slate-200 bg-[#1a2942]/50 p-2.5 px-3 rounded-xl border border-[#2d3f5e]/40 hover:bg-[#1a2942] transition-colors">
                                    <span class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> C1: Clases completas</span> 
                                    <span class="bg-[#142138] px-2.5 py-1 rounded-lg border border-[#2d3f5e] text-emerald-400 font-bold text-xs">Max: 2.0 pt</span>
                                </li>
                                <li class="flex justify-between items-center text-slate-200 bg-[#1a2942]/50 p-2.5 px-3 rounded-xl border border-[#2d3f5e]/40 hover:bg-[#1a2942] transition-colors">
                                    <span class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> C2: Cumplimiento de tareas</span> 
                                    <span class="bg-[#142138] px-2.5 py-1 rounded-lg border border-[#2d3f5e] text-emerald-400 font-bold text-xs">Max: 2.0 pt</span>
                                </li>
                                <li class="flex justify-between items-center text-slate-200 bg-[#1a2942]/50 p-2.5 px-3 rounded-xl border border-[#2d3f5e]/40 hover:bg-[#1a2942] transition-colors">
                                    <span class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> C3: Ortografía</span> 
                                    <span class="bg-[#142138] px-2.5 py-1 rounded-lg border border-[#2d3f5e] text-emerald-400 font-bold text-xs">Max: 1.5 pt</span>
                                </li>
                                <li class="flex justify-between items-center text-slate-200 bg-[#1a2942]/50 p-2.5 px-3 rounded-xl border border-[#2d3f5e]/40 hover:bg-[#1a2942] transition-colors">
                                    <span class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> C4: Letra legible</span> 
                                    <span class="bg-[#142138] px-2.5 py-1 rounded-lg border border-[#2d3f5e] text-emerald-400 font-bold text-xs">Max: 1.0 pt</span>
                                </li>
                                <li class="flex justify-between items-center text-slate-200 bg-[#1a2942]/50 p-2.5 px-3 rounded-xl border border-[#2d3f5e]/40 hover:bg-[#1a2942] transition-colors">
                                    <span class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> C5: Orden y aseo general</span> 
                                    <span class="bg-[#142138] px-2.5 py-1 rounded-lg border border-[#2d3f5e] text-emerald-400 font-bold text-xs">Max: 2.0 pt</span>
                                </li>
                                <li class="flex justify-between items-center text-slate-200 bg-[#1a2942]/50 p-2.5 px-3 rounded-xl border border-[#2d3f5e]/40 hover:bg-[#1a2942] transition-colors">
                                    <span class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> C6: Participación proactiva</span> 
                                    <span class="bg-[#142138] px-2.5 py-1 rounded-lg border border-[#2d3f5e] text-emerald-400 font-bold text-xs">Max: 1.5 pt</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>`;

html = html.replace(/\r\n/g, '\n');

if (html.indexOf(oldStr) !== -1) {
    html = html.replace(oldStr, newStr);
    fs.writeFileSync('notas.html', html);
    console.log("SUCCESS");
} else {
    console.log("FAILED to find exactly. Let's try matching with regex.");
    const regex = /<!-- PANEL DE CRITERIOS DE EVALUACIÓN -->[\s\S]*?<!-- CONSOLIDADO ANUAL VISTA -->/;
    if (regex.test(html)) {
        html = html.replace(regex, newStr + '\\n\\n            <!-- CONSOLIDADO ANUAL VISTA -->');
        fs.writeFileSync('notas.html', html);
        console.log("SUCCESS via regex");
    } else {
        console.log("Completely failed to find the block.");
    }
}
