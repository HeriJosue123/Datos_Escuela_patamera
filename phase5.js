const fs = require('fs');

let html = fs.readFileSync('notas.html', 'utf8');
html = html.replace(/\r\n/g, '\n');

// Helper to replace precisely
function replaceExact(oldStr, newStr, desc) {
    if (html.indexOf(oldStr) !== -1) {
        html = html.replace(oldStr, newStr);
        console.log("SUCCESS: " + desc);
    } else {
        console.log("FAILED: " + desc);
    }
}

// 1. Agregar Alumno Button height fix (make it exactly h-10 to match Guardar Notas)
replaceExact(
    `<button onclick="openAddStudentModal()" class="bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5 mt-4 md:mt-0">`,
    `<button onclick="openAddStudentModal()" class="bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white px-5 h-10 rounded-xl text-sm font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5 mt-4 md:mt-0">`,
    "Agregar Alumno btn"
);

// 2. Consolidado Table UI consistency
const oldConsTable = `                        <thead>
                            <tr class="bg-[#142138] text-slate-200 border-b border-[#2d3f5e] uppercase tracking-wider text-[10px] font-bold">
                                <th class="p-3 border-r border-[#2d3f5e] min-w-[220px]">Nombre del Alumno/a</th>
                                <th class="p-3 border-r border-[#2d3f5e] text-center bg-[#0c1a30]">1° Periodo</th>
                                <th class="p-3 border-r border-[#2d3f5e] text-center bg-[#0c1a30]">2° Periodo</th>
                                <th class="p-3 border-r border-[#2d3f5e] text-center bg-[#0c1a30]">3° Periodo</th>
                                <th class="p-3 text-center bg-violet-100 text-violet-900 font-bold">Promedio Final</th>
                            </tr>
                        </thead>`;
const newConsTable = `                        <thead class="rounded-t-2xl overflow-hidden">
                            <tr class="bg-[#1a2942] text-slate-100 border-b border-[#2d3f5e] uppercase tracking-wider text-[11px] font-extrabold shadow-sm">
                                <th class="p-4 border-r border-[#2d3f5e] min-w-[220px] rounded-tl-xl">Nombre del Alumno/a</th>
                                <th class="p-4 border-r border-[#2d3f5e] text-center bg-blue-900/20 text-blue-300">1° Periodo</th>
                                <th class="p-4 border-r border-[#2d3f5e] text-center bg-emerald-900/20 text-emerald-300">2° Periodo</th>
                                <th class="p-4 border-r border-[#2d3f5e] text-center bg-amber-900/20 text-amber-300">3° Periodo</th>
                                <th class="p-4 text-center bg-violet-900/30 text-violet-400 font-extrabold rounded-tr-xl">Promedio Final</th>
                            </tr>
                        </thead>`;
replaceExact(oldConsTable, newConsTable, "Consolidado Table Header");

// 3. Analytics Dashboard KPI cards - make rounded-2xl & add border for consistency
html = html.replace(/bg-\[#1a2942\] p-5 rounded-xl shadow-lg shadow-black\/20/g, 'bg-[#1a2942] p-5 rounded-2xl border border-[#2d3f5e] shadow-lg');

// 4. Student Modal - Colors and roundness
replaceExact(
    `<div class="bg-[#1a2942] rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform scale-95 transition-all duration-200" id="modal-container">
            <div class="bg-brand-600 text-white p-5 flex items-center justify-between">`,
    `<div class="bg-[#1a2942] rounded-2xl border border-[#2d3f5e] shadow-2xl w-full max-w-md overflow-hidden transform scale-95 transition-all duration-200" id="modal-container">
            <div class="bg-[#142138] border-b border-[#2d3f5e] text-slate-100 p-5 flex items-center justify-between">`,
    "Student Modal Header"
);
replaceExact(
    `<h3 class="font-bold text-lg flex items-center gap-2">`,
    `<h3 class="font-extrabold text-lg flex items-center gap-2 text-brand-400">`,
    "Student modal text"
);
replaceExact(
    `<div class="bg-[#0c1a30] p-4 flex justify-end gap-3 border-t border-[#23324d]">`,
    `<div class="bg-[#142138] p-5 flex justify-end gap-3 border-t border-[#2d3f5e]">`,
    "Student Modal Footer"
);

// 5. AI Modal - Colors and borders
replaceExact(
    `bg-slate-950 text-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden transform scale-95 transition-all duration-200 border border-slate-800`,
    `bg-[#1a2942] text-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden transform scale-95 transition-all duration-200 border border-[#2d3f5e]`,
    "AI modal container"
);
replaceExact(
    `<div class="bg-gradient-to-r from-indigo-900 to-slate-900 p-5 flex items-center justify-between border-b border-slate-800 flex-shrink-0">`,
    `<div class="bg-[#142138] p-5 flex items-center justify-between border-b border-[#2d3f5e] flex-shrink-0">`,
    "AI modal header"
);
replaceExact(
    `<div class="bg-slate-900 p-4 flex justify-end gap-3 border-t border-slate-800 flex-shrink-0">`,
    `<div class="bg-[#142138] p-5 flex justify-end gap-3 border-t border-[#2d3f5e] flex-shrink-0">`,
    "AI modal footer"
);

fs.writeFileSync('notas.html', html);
console.log('HTML updated');

// Update CSS
let css = fs.readFileSync('styles.css', 'utf8');
const additionalCss = `

/* ─── Table Input Consistency ──────────────────────── */
#student-rows input[type="number"], 
#student-rows input[type="text"] {
    background-color: rgba(0,0,0,0.15);
    border-radius: 6px;
    box-shadow: inset 0 1px 2px rgba(0,0,0,0.2);
}
#student-rows input[type="number"]:focus, 
#student-rows input[type="text"]:focus {
    background-color: #1a2942;
    box-shadow: none;
}
#consolidado-rows td {
    padding: 0.75rem !important;
}
`;

if (css.indexOf('/* ─── Table Input Consistency ──────────────────────── */') === -1) {
    css += additionalCss;
    fs.writeFileSync('styles.css', css);
    console.log("CSS updated");
}
