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

const oldHeaderRow = `<div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2d3f5e]/60 pb-5 mb-5">`;
const newHeaderRow = `<div class="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-4 border-b border-[#2d3f5e]/60 pb-7 mb-5">`;
replaceExact(oldHeaderRow, newHeaderRow, "Header Row Wrapper Padding");

const oldBlock = `<div class="flex flex-wrap items-center gap-3">
                    <!-- School Year Selector -->
                    <div class="flex items-center gap-2 bg-[#142138] border border-[#2d3f5e] h-10 px-3 rounded-xl">
                        <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Año Lectivo:</span>
                        <select id="header-year" onchange="changeYear()" class="bg-transparent font-extrabold text-brand-500 focus:outline-none cursor-pointer">
                            <option value="2026" selected>2026</option>
                            <option value="2027">2027</option>
                        </select>
                    </div>
                    <button onclick="openAIAssistantModal()" title="Asistente IA" class="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 active:scale-95 text-white font-bold h-10 w-10 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center text-sm border border-cyan-300/30">
                        <i class="fa-solid fa-robot"></i>
                    </button>
                    <button onclick="saveAllData(true)" class="bg-brand-600 hover:bg-brand-500 active:scale-95 text-white font-bold h-10 px-5 rounded-xl shadow-lg shadow-brand-500/25 transition-all flex items-center gap-2">
                        <i class="fa-solid fa-floppy-disk"></i>
                        Guardar Notas
                    </button>
                </div>`;

const newBlock = `<div class="flex flex-wrap items-center gap-6 md:gap-8">
                    <!-- 1. School Year Selector -->
                    <div class="flex items-center gap-3 bg-[#142138] border border-[#2d3f5e] h-12 px-5 rounded-xl shadow-sm transition-colors hover:border-[#3b4c6b]">
                        <i class="fa-regular fa-calendar text-slate-400"></i>
                        <span class="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Año Lectivo:</span>
                        <select id="header-year" onchange="changeYear()" class="bg-transparent font-black text-brand-400 focus:outline-none cursor-pointer text-sm">
                            <option value="2026" selected>2026</option>
                            <option value="2027">2027</option>
                        </select>
                    </div>

                    <!-- Divisor Vertical -->
                    <div class="hidden md:block w-px h-8 bg-[#2d3f5e]/80"></div>

                    <!-- 2. Botón Estadísticas e IA -->
                    <div class="relative flex flex-col items-center justify-center">
                        <button onclick="openAIAssistantModal()" title="Asistente IA" class="bg-[#142138] hover:bg-[#1a2942] active:scale-95 text-cyan-400 font-bold h-12 w-16 rounded-xl border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.15)] transition-all flex items-center justify-center text-xl">
                            <i class="fa-solid fa-robot"></i>
                        </button>
                        <span class="absolute -bottom-5 text-[9px] text-slate-500 uppercase tracking-widest font-extrabold whitespace-nowrap">Estadísticas e IA</span>
                    </div>

                    <!-- 3. Botón Guardar Notas -->
                    <button onclick="saveAllData(true)" class="bg-brand-600 hover:bg-brand-500 active:scale-95 text-white font-extrabold h-12 px-8 rounded-xl shadow-lg shadow-brand-500/30 transition-all flex items-center gap-3 text-sm tracking-wide ml-2 md:ml-0">
                        <i class="fa-solid fa-floppy-disk text-lg"></i>
                        Guardar Notas
                    </button>
                </div>`;

replaceExact(oldBlock, newBlock, "Header Actions Layout");

fs.writeFileSync('notas.html', html);
console.log('HTML updated');
