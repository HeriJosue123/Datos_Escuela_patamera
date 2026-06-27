const fs = require('fs');
let html = fs.readFileSync('notas.html', 'utf8');

// The AI Button
const aiBtnRegex = /<button onclick="openAIAssistantModal\(\)" class="bg-gradient-to-r from-indigo-600 to-violet-600[^>]*>[\s\S]*?Asistente IA[\s\S]*?<\/button>/;

// We change it to a perfect circle (w-10 h-10 rounded-full) with just the robot icon
const newAIBtn = `<button onclick="openAIAssistantModal()" title="Asistente IA" class="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 active:scale-95 text-white font-bold h-10 w-10 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300 flex items-center justify-center text-sm border border-cyan-300/30">
                        <i class="fa-solid fa-robot"></i>
                    </button>`;

html = html.replace(aiBtnRegex, newAIBtn);

// Increase padding to make room for the icons so they don't overlap the text
html = html.replace(/pl-8 pr-0 py-2/g, 'pl-10 pr-2 py-2');

fs.writeFileSync('notas.html', html);
console.log('Fix applied successfully!');
