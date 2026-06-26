const fs = require('fs');

let html = fs.readFileSync('notas.html', 'utf8');
let js = fs.readFileSync('notas.js', 'utf8');

// 1. AI Button Replacement
const oldAIBtn = `<button onclick="openAIAssistantModal()" class="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 active:scale-95 text-white font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-150 flex items-center gap-2">
                        <i class="fa-solid fa-brain"></i>
                        Asistente IA
                    </button>`;
const newAIBtn = `<button onclick="openAIAssistantModal()" title="Asistente IA" class="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 active:scale-95 text-white font-bold h-10 px-4 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300 flex items-center justify-center gap-2 text-xs border border-cyan-300/30">
                        <i class="fa-solid fa-robot text-sm"></i> IA
                    </button>`;
html = html.replace(oldAIBtn, newAIBtn);

// 2. Input boxes cleanup
// Replace class="w-full pl-9 pr-3 py-2 bg-[#1a2942]/70 border border-[#3f567a] rounded-lg ... "
// with minimalist bottom border style
html = html.replace(/bg-\[#1a2942\]\/70 border border-\[#3f567a\] rounded-lg/g, 'bg-transparent border-b-2 border-[#2d3f5e] rounded-none px-0');
// Also change the padding left from pl-9 to pl-8 so it doesn't look too far
html = html.replace(/pl-9 pr-3 py-2/g, 'pl-8 pr-0 py-2');

// 3. Tab Container cleanup
html = html.replace('class="flex space-x-2 bg-[#23324d]/60 p-1.5 rounded-xl max-w-3xl"', 'class="flex space-x-6 border-b border-[#2d3f5e] max-w-3xl"');

// 4. Tab Items cleanup
const oldActiveTab = 'tab-btn flex-1 text-center py-2.5 px-3 font-semibold text-xs sm:text-sm rounded-lg transition-all duration-200 bg-brand-600 text-white shadow-md';
const newActiveTab = 'tab-btn pb-2 text-center font-bold text-sm transition-all duration-200 text-brand-400 border-b-2 border-brand-400';
html = html.replace(oldActiveTab, newActiveTab);

const oldInactiveTab = 'tab-btn flex-1 text-center py-2.5 px-3 font-semibold text-xs sm:text-sm rounded-lg transition-all duration-200 text-slate-300 hover:text-slate-50';
const newInactiveTab = 'tab-btn pb-2 text-center font-semibold text-sm transition-all duration-200 text-slate-400 hover:text-slate-200 border-b-2 border-transparent hover:border-slate-500';
// Replace all 3 inactive tabs
html = html.split(oldInactiveTab).join(newInactiveTab);

// Tab Analisis has an icon, it has slightly different classes
const oldAnalisisTab = 'tab-btn flex-1 text-center py-2.5 px-3 font-bold text-xs sm:text-sm rounded-lg transition-all duration-200 text-slate-300 hover:text-slate-50 flex items-center justify-center gap-1.5 text-brand-600';
const newAnalisisTab = 'tab-btn pb-2 text-center font-bold text-sm transition-all duration-200 text-slate-400 hover:text-cyan-400 border-b-2 border-transparent flex items-center justify-center gap-1.5 hover:border-cyan-400';
html = html.replace(oldAnalisisTab, newAnalisisTab);

// 5. Remove borders from KPI cards
html = html.replace(/border border-\[#2d3f5e\] shadow-sm/g, 'shadow-lg shadow-black/20');
// Also the main panel border
html = html.replace('border: 1px solid rgba(45, 63, 94, 0.5);', 'border: none; box-shadow: 0 10px 40px rgba(0,0,0,0.3);');


// Update Javascript
js = js.replace("btn.classList.remove('bg-brand-600', 'text-white', 'shadow-md');", 
                "btn.classList.remove('text-brand-400', 'border-brand-400', 'font-bold'); btn.classList.add('border-transparent');");

js = js.replace("btn.classList.add('text-slate-300', 'hover:text-slate-50');", 
                "btn.classList.add('text-slate-400', 'hover:text-slate-200', 'hover:border-slate-500', 'font-semibold');");

js = js.replace("activeBtn.classList.remove('text-slate-300', 'hover:text-slate-50');", 
                "activeBtn.classList.remove('text-slate-400', 'hover:text-slate-200', 'hover:border-slate-500', 'font-semibold', 'border-transparent');");

js = js.replace("activeBtn.classList.add('bg-brand-600', 'text-white', 'shadow-md');", 
                "activeBtn.classList.add('text-brand-400', 'border-brand-400', 'font-bold');");

fs.writeFileSync('notas.html', html);
fs.writeFileSync('notas.js', js);
console.log('UI Cleaned successfully.');
