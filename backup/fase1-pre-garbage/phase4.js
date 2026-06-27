const fs = require('fs');

let html = fs.readFileSync('notas.html', 'utf8');

const oldTableHdr = `                        <thead>
                            <!-- Actividad Row Headers -->
                            <tr class="bg-[#142138] text-slate-200 border-b border-[#2d3f5e] uppercase tracking-wider text-[10px] font-bold">
                                <th class="p-3 border-r border-[#2d3f5e] min-w-[240px]" rowspan="2">Nombres del Alumno/a</th>
                                <th class="p-2 border-r border-[#2d3f5e] text-center bg-blue-900/40 text-blue-300 border-[#2d3f5e]" colspan="9">Actividad N° 1 - Integradora (35%)</th>
                                <th class="p-2 border-r border-[#2d3f5e] text-center bg-emerald-900/40 text-emerald-300 border-[#2d3f5e]" colspan="8">Actividad N° 2 - Cotidianas (35%)</th>
                                <th class="p-2 border-r border-[#2d3f5e] text-center bg-amber-900/40 text-amber-300 border-[#2d3f5e]" colspan="2">Actividad 3 (30%)</th>
                                <th class="p-3 text-center bg-violet-900/40 text-violet-300 border-[#2d3f5e]" rowspan="2">Nota Trimestral</th>
                                <th class="p-3 text-center" rowspan="2">Acción</th>
                            </tr>
                            <!-- Sub criteria headers -->
                            <tr class="bg-[#0c1a30] text-slate-300 border-b border-[#2d3f5e] font-semibold">
                                <!-- Act1 -->
                                <th id="a1-c1-hdr" class="p-1 border-r border-[#2d3f5e] text-center w-[35px] bg-[#142138] text-blue-200 cursor-help" title="C1: Criterio 1 (Máx. 2.0 pt)">C1</th>
                                <th id="a1-c2-hdr" class="p-1 border-r border-[#2d3f5e] text-center w-[35px] bg-[#142138] text-blue-200 cursor-help" title="C2: Criterio 2 (Máx. 2.0 pt)">C2</th>
                                <th id="a1-c3-hdr" class="p-1 border-r border-[#2d3f5e] text-center w-[35px] bg-[#142138] text-blue-200 cursor-help" title="C3: Criterio 3 (Máx. 1.5 pt)">C3</th>
                                <th id="a1-c4-hdr" class="p-1 border-r border-[#2d3f5e] text-center w-[35px] bg-[#142138] text-blue-200 cursor-help" title="C4: Criterio 4 (Máx. 1.5 pt)">C4</th>
                                <th id="a1-c5-hdr" class="p-1 border-r border-[#2d3f5e] text-center w-[35px] bg-[#142138] text-blue-200 cursor-help" title="C5: Criterio 5 (Máx. 1.0 pt)">C5</th>
                                <th id="a1-c6-hdr" class="p-1 border-r border-[#2d3f5e] text-center w-[35px] bg-[#142138] text-blue-200 cursor-help" title="C6: Criterio 6 (Máx. 1.0 pt)">C6</th>
                                <th id="a1-c7-hdr" class="p-1 border-r border-[#2d3f5e] text-center w-[35px] bg-[#142138] text-blue-200 cursor-help" title="C7: Criterio 7 (Máx. 1.0 pt)">C7</th>
                                <th class="p-1 border-r border-[#2d3f5e] text-center font-bold bg-[#142138]/50 text-slate-100" title="Suma total de criterios de la Actividad 1 (Máx. 10.0)">Total</th>
                                <th class="p-1 border-r border-[#2d3f5e] text-center font-bold bg-blue-900/60 text-blue-300" title="Ponderación final del 35% de la Actividad 1 (Total * 0.35)">35%</th>
                                <!-- Act2 -->
                                <th id="a2-c1-hdr" class="p-1 border-r border-[#2d3f5e] text-center w-[40px] bg-[#142138] text-emerald-200 cursor-help" title="C1: Clases completas (Máx. 2.0 pt)">C1</th>
                                <th id="a2-c2-hdr" class="p-1 border-r border-[#2d3f5e] text-center w-[40px] bg-[#142138] text-emerald-200 cursor-help" title="C2: Cumplimiento de tareas (Máx. 2.0 pt)">C2</th>
                                <th id="a2-c3-hdr" class="p-1 border-r border-[#2d3f5e] text-center w-[40px] bg-[#142138] text-emerald-200 cursor-help" title="C3: Ortografía (Máx. 1.5 pt)">C3</th>
                                <th id="a2-c4-hdr" class="p-1 border-r border-[#2d3f5e] text-center w-[40px] bg-[#142138] text-emerald-200 cursor-help" title="C4: Letra legible (Máx. 1.0 pt)">C4</th>
                                <th id="a2-c5-hdr" class="p-1 border-r border-[#2d3f5e] text-center w-[40px] bg-[#142138] text-emerald-200 cursor-help" title="C5: Orden y aseo el cuaderno y escuela (Máx. 2.0 pt)">C5</th>
                                <th id="a2-c6-hdr" class="p-1 border-r border-[#2d3f5e] text-center w-[40px] bg-[#142138] text-emerald-200 cursor-help" title="C6: Participa en clase (Máx. 1.5 pt)">C6</th>
                                <th class="p-1 border-r border-[#2d3f5e] text-center font-bold bg-[#142138]/50 text-slate-100" title="Suma total de criterios de la Actividad 2 (Máx. 10.0 pt)">Total</th>
                                <th class="p-1 border-r border-[#2d3f5e] text-center font-bold bg-emerald-900/60 text-emerald-300" title="Ponderación final del 35% de la Actividad 2 (Suma total * 0.35)">35%</th>
                                <!-- Act3 -->
                                <th class="p-1 border-r border-[#2d3f5e] text-center bg-[#142138] text-amber-200 cursor-help" title="Nota directa obtenida en la Prueba Objetiva (Máx. 10.0 pt)">Nota</th>
                                <th class="p-1 border-r border-[#2d3f5e] text-center font-bold bg-amber-900/60 text-amber-300" title="Ponderación final del 30% de la Actividad 3 (Nota * 0.30)">30%</th>
                            </tr>
                        </thead>`;

const newTableHdr = `                        <thead class="rounded-t-2xl overflow-hidden">
                            <!-- Actividad Row Headers -->
                            <tr class="bg-[#1a2942] text-slate-100 border-b border-[#2d3f5e] uppercase tracking-wider text-[11px] font-extrabold shadow-sm">
                                <th class="p-4 border-r border-[#2d3f5e] min-w-[250px] rounded-tl-xl align-middle" rowspan="2">Nombres del Alumno/a</th>
                                <th class="p-3 border-r border-[#2d3f5e] text-center bg-blue-900/30 text-blue-400 border-b-0" colspan="9">Actividad N° 1 - Integradora (35%)</th>
                                <th class="p-3 border-r border-[#2d3f5e] text-center bg-emerald-900/30 text-emerald-400 border-b-0" colspan="8">Actividad N° 2 - Cotidianas (35%)</th>
                                <th class="p-3 border-r border-[#2d3f5e] text-center bg-amber-900/30 text-amber-400 border-b-0" colspan="2">Actividad 3 (30%)</th>
                                <th class="p-4 text-center bg-violet-900/30 text-violet-400 border-[#2d3f5e] border-l align-middle" rowspan="2">Nota Trimestral</th>
                                <th class="p-4 text-center align-middle rounded-tr-xl" rowspan="2">Acción</th>
                            </tr>
                            <!-- Sub criteria headers -->
                            <tr class="bg-[#0f172a] text-slate-300 border-b-2 border-[#2d3f5e] font-semibold text-[11px]">
                                <!-- Act1 -->
                                <th id="a1-c1-hdr" class="p-2 border-r border-[#2d3f5e] text-center w-[38px] bg-blue-900/10 text-blue-200 cursor-help transition-colors hover:bg-blue-900/30" title="C1: Criterio 1 (Máx. 2.0 pt)">C1</th>
                                <th id="a1-c2-hdr" class="p-2 border-r border-[#2d3f5e] text-center w-[38px] bg-blue-900/10 text-blue-200 cursor-help transition-colors hover:bg-blue-900/30" title="C2: Criterio 2 (Máx. 2.0 pt)">C2</th>
                                <th id="a1-c3-hdr" class="p-2 border-r border-[#2d3f5e] text-center w-[38px] bg-blue-900/10 text-blue-200 cursor-help transition-colors hover:bg-blue-900/30" title="C3: Criterio 3 (Máx. 1.5 pt)">C3</th>
                                <th id="a1-c4-hdr" class="p-2 border-r border-[#2d3f5e] text-center w-[38px] bg-blue-900/10 text-blue-200 cursor-help transition-colors hover:bg-blue-900/30" title="C4: Criterio 4 (Máx. 1.5 pt)">C4</th>
                                <th id="a1-c5-hdr" class="p-2 border-r border-[#2d3f5e] text-center w-[38px] bg-blue-900/10 text-blue-200 cursor-help transition-colors hover:bg-blue-900/30" title="C5: Criterio 5 (Máx. 1.0 pt)">C5</th>
                                <th id="a1-c6-hdr" class="p-2 border-r border-[#2d3f5e] text-center w-[38px] bg-blue-900/10 text-blue-200 cursor-help transition-colors hover:bg-blue-900/30" title="C6: Criterio 6 (Máx. 1.0 pt)">C6</th>
                                <th id="a1-c7-hdr" class="p-2 border-r border-[#2d3f5e] text-center w-[38px] bg-blue-900/10 text-blue-200 cursor-help transition-colors hover:bg-blue-900/30" title="C7: Criterio 7 (Máx. 1.0 pt)">C7</th>
                                <th class="p-2 border-r border-[#2d3f5e] text-center font-bold bg-[#142138]/80 text-slate-100" title="Suma total de criterios de la Actividad 1 (Máx. 10.0)">Total</th>
                                <th class="p-2 border-r border-[#2d3f5e] text-center font-extrabold bg-blue-900/50 text-blue-300" title="Ponderación final del 35% de la Actividad 1 (Total * 0.35)">35%</th>
                                <!-- Act2 -->
                                <th id="a2-c1-hdr" class="p-2 border-r border-[#2d3f5e] text-center w-[44px] bg-emerald-900/10 text-emerald-200 cursor-help transition-colors hover:bg-emerald-900/30" title="C1: Clases completas (Máx. 2.0 pt)">C1</th>
                                <th id="a2-c2-hdr" class="p-2 border-r border-[#2d3f5e] text-center w-[44px] bg-emerald-900/10 text-emerald-200 cursor-help transition-colors hover:bg-emerald-900/30" title="C2: Cumplimiento de tareas (Máx. 2.0 pt)">C2</th>
                                <th id="a2-c3-hdr" class="p-2 border-r border-[#2d3f5e] text-center w-[44px] bg-emerald-900/10 text-emerald-200 cursor-help transition-colors hover:bg-emerald-900/30" title="C3: Ortografía (Máx. 1.5 pt)">C3</th>
                                <th id="a2-c4-hdr" class="p-2 border-r border-[#2d3f5e] text-center w-[44px] bg-emerald-900/10 text-emerald-200 cursor-help transition-colors hover:bg-emerald-900/30" title="C4: Letra legible (Máx. 1.0 pt)">C4</th>
                                <th id="a2-c5-hdr" class="p-2 border-r border-[#2d3f5e] text-center w-[44px] bg-emerald-900/10 text-emerald-200 cursor-help transition-colors hover:bg-emerald-900/30" title="C5: Orden y aseo el cuaderno y escuela (Máx. 2.0 pt)">C5</th>
                                <th id="a2-c6-hdr" class="p-2 border-r border-[#2d3f5e] text-center w-[44px] bg-emerald-900/10 text-emerald-200 cursor-help transition-colors hover:bg-emerald-900/30" title="C6: Participa en clase (Máx. 1.5 pt)">C6</th>
                                <th class="p-2 border-r border-[#2d3f5e] text-center font-bold bg-[#142138]/80 text-slate-100" title="Suma total de criterios de la Actividad 2 (Máx. 10.0 pt)">Total</th>
                                <th class="p-2 border-r border-[#2d3f5e] text-center font-extrabold bg-emerald-900/50 text-emerald-300" title="Ponderación final del 35% de la Actividad 2 (Suma total * 0.35)">35%</th>
                                <!-- Act3 -->
                                <th class="p-2 border-r border-[#2d3f5e] text-center bg-amber-900/10 text-amber-200 cursor-help transition-colors hover:bg-amber-900/30" title="Nota directa obtenida en la Prueba Objetiva (Máx. 10.0 pt)">Nota</th>
                                <th class="p-2 border-r border-[#2d3f5e] text-center font-extrabold bg-amber-900/50 text-amber-300" title="Ponderación final del 30% de la Actividad 3 (Nota * 0.30)">30%</th>
                            </tr>
                        </thead>`;

html = html.replace(/\r\n/g, '\n');

if (html.indexOf(oldTableHdr) !== -1) {
    html = html.replace(oldTableHdr, newTableHdr);
    fs.writeFileSync('notas.html', html);
    console.log("SUCCESS");
} else {
    console.log("FAILED to find table header.");
}

// 2. CSS adjustments for Table Scrollbar and Hover effect
let css = fs.readFileSync('styles.css', 'utf8');

const additionalCss = `

/* ─── Custom Table UI ──────────────────────────────── */
.table-container {
    scrollbar-width: thin;
    scrollbar-color: rgba(255,255,255,0.2) transparent;
}
.table-container::-webkit-scrollbar {
    height: 10px;
}
.table-container::-webkit-scrollbar-track {
    background: rgba(0,0,0,0.1);
    border-radius: 8px;
}
.table-container::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.15);
    border-radius: 8px;
}
.table-container::-webkit-scrollbar-thumb:hover {
    background: rgba(255,255,255,0.3);
}

/* Elegant Table Row Hover */
#student-rows tr {
    transition: all 0.2s ease-in-out;
}
#student-rows tr:hover {
    background-color: #1a2942 !important; /* Force darker blue overlay */
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    position: relative;
    z-index: 10;
}
#student-rows tr td {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
}
#student-rows tr td input {
    transition: background-color 0.2s;
}
#student-rows tr:hover td input:not(:focus) {
    background-color: rgba(0,0,0,0.2);
}
`;

if (css.indexOf('/* Elegant Table Row Hover */') === -1) {
    css += additionalCss;
    fs.writeFileSync('styles.css', css);
    console.log("CSS updated");
}

