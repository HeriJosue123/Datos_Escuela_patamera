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

// 1. Tarjeta principal: p-6 -> p-8 (or tighter internals)
// Let's actually find the consolidado-view wrapper
const oldConsolidadoWrapper = `            <!-- CONSOLIDADO ANUAL VISTA -->
            <div id="consolidado-view" class="space-y-4 hidden">
                <div class="bg-[#1a2942] rounded-2xl p-6 border border-[#2d3f5e] shadow-lg mb-12">
                    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b border-[#2d3f5e]/60 pb-6">
                        <div class="flex items-center gap-3">
                            <div class="bg-violet-900/40 text-violet-300 border-[#2d3f5e]0/20 text-violet-400 p-3 rounded-xl border border-violet-500/30">
                                <i class="fa-solid fa-award text-2xl"></i>
                            </div>
                            <div>
                                <h2 class="text-xl font-bold text-slate-100">
                                    Promedio General Anual <span class="consolidado-year-lbl">2026</span>
                                </h2>
                                <p class="text-sm text-slate-400 font-medium mt-1">Asignatura: <span id="consolidado-info-title" class="text-violet-400 font-extrabold">LENGUAJE Y LITERATURA</span></p>
                            </div>
                        </div>
                        <span class="bg-violet-900/40 text-violet-300 border-[#2d3f5e]0/20 text-violet-300 px-4 py-2 text-xs font-bold uppercase rounded-lg border border-violet-500/30 self-start md:self-auto mt-4 md:mt-0">Consolidado Final</span>
                    </div>

                    <div class="bg-[#142138] rounded-2xl border border-[#2d3f5e] p-5 shadow-inner overflow-hidden">
                        <div class="table-container overflow-x-auto rounded-xl">
                            <table class="w-full text-left border-collapse text-xs">
                        <thead class="rounded-t-2xl overflow-hidden">
                            <tr class="bg-[#1a2942] text-slate-100 border-b border-[#2d3f5e] uppercase tracking-wider text-[11px] font-extrabold shadow-sm">
                                <th class="p-4 border-r border-[#2d3f5e] min-w-[220px] rounded-tl-xl">Nombre del Alumno/a</th>
                                <th class="p-4 border-r border-[#2d3f5e] text-center bg-blue-900/20 text-blue-300">1° Periodo</th>
                                <th class="p-4 border-r border-[#2d3f5e] text-center bg-emerald-900/20 text-emerald-300">2° Periodo</th>
                                <th class="p-4 border-r border-[#2d3f5e] text-center bg-amber-900/20 text-amber-300">3° Periodo</th>
                                <th class="p-4 text-center bg-violet-900/30 text-violet-400 font-extrabold rounded-tr-xl">Promedio Final</th>
                            </tr>
                        </thead>`;

const newConsolidadoWrapper = `            <!-- CONSOLIDADO ANUAL VISTA -->
            <div id="consolidado-view" class="space-y-4 hidden">
                <div class="bg-[#1a2942] rounded-2xl p-8 border border-[#2d3f5e] shadow-xl mb-12">
                    <div class="flex flex-col md:flex-row md:items-center justify-between mb-5 border-b border-[#2d3f5e]/60 pb-5">
                        <div class="flex items-center gap-4">
                            <div class="bg-violet-500/10 text-violet-400 p-3.5 rounded-xl border border-violet-500/20 shadow-inner">
                                <i class="fa-solid fa-award text-3xl"></i>
                            </div>
                            <div class="flex flex-col">
                                <div class="flex items-center gap-3">
                                    <h2 class="text-3xl font-extrabold tracking-tight text-slate-50">
                                        Promedio General Anual <span class="consolidado-year-lbl">2026</span>
                                    </h2>
                                    <span class="bg-violet-500/20 text-violet-300 px-3 py-1 text-[10px] font-extrabold uppercase rounded-full border border-violet-500/30 tracking-wider shadow-sm hidden md:inline-block">Consolidado Final</span>
                                </div>
                                <p class="text-sm text-slate-400 font-medium mt-1">Asignatura: <span id="consolidado-info-title" class="text-violet-400 font-extrabold tracking-wide">LENGUAJE Y LITERATURA</span></p>
                            </div>
                        </div>
                        <span class="bg-violet-500/20 text-violet-300 px-3 py-1 text-[10px] font-extrabold uppercase rounded-full border border-violet-500/30 tracking-wider shadow-sm self-start md:hidden mt-4 md:mt-0">Consolidado Final</span>
                    </div>

                    <div class="bg-[#142138] rounded-2xl border border-[#2d3f5e] shadow-inner overflow-hidden">
                        <div class="table-container overflow-x-auto">
                            <table class="w-full text-left border-collapse text-xs">
                        <thead class="bg-[#1a2942]">
                            <tr class="text-slate-100 border-b-2 border-[#2d3f5e] uppercase tracking-wider text-[11px] font-extrabold shadow-sm">
                                <th class="p-4 border-r border-[#2d3f5e] min-w-[220px]">Nombre del Alumno/a</th>
                                <th class="p-4 border-r border-[#2d3f5e] text-center bg-blue-900/10 text-blue-300 border-t-4 border-t-blue-500/80">1° Periodo</th>
                                <th class="p-4 border-r border-[#2d3f5e] text-center bg-emerald-900/10 text-emerald-300 border-t-4 border-t-emerald-500/80">2° Periodo</th>
                                <th class="p-4 border-r border-[#2d3f5e] text-center bg-amber-900/10 text-amber-300 border-t-4 border-t-amber-500/80">3° Periodo</th>
                                <th class="p-4 text-center bg-violet-900/10 text-violet-400 font-extrabold border-t-4 border-t-violet-500/80">Promedio Final</th>
                            </tr>
                        </thead>`;

replaceExact(oldConsolidadoWrapper, newConsolidadoWrapper, "Consolidado redesign HTML");

fs.writeFileSync('notas.html', html);
console.log('HTML updated');

// Update CSS
let css = fs.readFileSync('styles.css', 'utf8');

const additionalCss = `

/* ─── Consolidado Table Refinements ──────────────────────── */
#consolidado-rows td {
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
    padding-left: 1rem !important;
    padding-right: 1rem !important;
    vertical-align: middle;
}

#consolidado-rows tr {
    transition: all 0.2s ease-in-out;
    background-color: #142138 !important; /* Ensure dark background */
}

#consolidado-rows tr:hover {
    background-color: #1e293b !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    position: relative;
    z-index: 10;
}

/* Override hardcoded JS colors safely via CSS for elegance */
#consolidado-rows td:nth-child(2) { 
    background-color: rgba(59, 130, 246, 0.05) !important; 
    color: #93c5fd !important; 
}
#consolidado-rows td:nth-child(3) { 
    background-color: rgba(16, 185, 129, 0.05) !important; 
    color: #6ee7b7 !important; 
}
#consolidado-rows td:nth-child(4) { 
    background-color: rgba(245, 158, 11, 0.05) !important; 
    color: #fcd34d !important; 
}
#consolidado-rows td:nth-child(5) { 
    background-color: rgba(139, 92, 246, 0.12) !important; 
    color: #c4b5fd !important; 
    font-weight: 800 !important; 
    border-bottom: 1px solid transparent !important;
    font-size: 0.85rem !important;
}

#consolidado-rows td:nth-child(5) span {
    background: transparent !important;
    color: inherit !important;
    padding: 0 !important;
    font-size: inherit !important;
}
`;

if (css.indexOf('/* ─── Consolidado Table Refinements ──────────────────────── */') === -1) {
    css += additionalCss;
    fs.writeFileSync('styles.css', css);
    console.log("CSS updated");
}
