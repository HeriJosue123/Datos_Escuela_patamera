const fs = require('fs');

let html = fs.readFileSync('matricula.html', 'utf8');

// We will split the file exactly around function renderStudents() { ... }
// Since I generated the exact code previously, I will replace the block from "function renderStudents()" to "// --- FIREBASE INTEGRATION ---"

const startMarker = "        function renderStudents() {";
const endMarker = "        // --- FIREBASE INTEGRATION ---";

const startIndex = html.indexOf(startMarker);
const endIndex = html.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
    console.error("Markers not found.");
    process.exit(1);
}

const before = html.substring(0, startIndex);
const after = html.substring(endIndex);

const newRenderStudents = `        function renderStudents() {
            const container = document.getElementById('students-container');
            container.innerHTML = '';
            
            const getInitials = (name) => {
                const parts = name.split(', ');
                let cleanName = name;
                if (parts.length === 2) {
                    cleanName = parts[1] + " " + parts[0]; 
                }
                const words = cleanName.split(' ').filter(w => w.length > 0);
                if (words.length >= 2) {
                    return (words[0][0] + words[1][0]).toUpperCase();
                }
                return cleanName.substring(0, 2).toUpperCase();
            };

            const accentGradients = [
                'from-cyan-500/20 to-blue-500/5 text-cyan-400 border-cyan-500/30 shadow-[inset_0_0_10px_rgba(6,182,212,0.2)]',
                'from-purple-500/20 to-pink-500/5 text-purple-400 border-purple-500/30 shadow-[inset_0_0_10px_rgba(168,85,247,0.2)]',
                'from-emerald-500/20 to-teal-500/5 text-emerald-400 border-emerald-500/30 shadow-[inset_0_0_10px_rgba(16,185,129,0.2)]',
                'from-amber-500/20 to-orange-500/5 text-amber-400 border-amber-500/30 shadow-[inset_0_0_10px_rgba(245,158,11,0.2)]',
                'from-blue-500/20 to-indigo-500/5 text-blue-400 border-blue-500/30 shadow-[inset_0_0_10px_rgba(59,130,246,0.2)]'
            ];

            schoolData.forEach((item, gradeIndex) => {
                const total = item.male + item.female;
                const studentListHTML = item.students.map((student, index) => {
                    const initials = getInitials(student.name);
                    const accent = accentGradients[index % accentGradients.length];
                    const accentColors = accent.split(' ');
                    const bgGradients = accentColors[0] + ' ' + accentColors[1];
                    const textColor = accentColors[2];
                    const borderColor = accentColors[3];
                    const shadowGlow = accentColors[4] || '';

                    return \`
                    <div class="group relative flex items-center p-4 bg-[#142138] hover:bg-[#1a2942] rounded-2xl border border-[#2d3f5e] hover:border-[#3b4c6b] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] cursor-default overflow-hidden">
                        
                        <!-- Left color accent bar -->
                        <div class="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b \${bgGradients} opacity-60 group-hover:opacity-100 transition-opacity"></div>

                        <!-- Decorative Watermark Number -->
                        <div class="absolute -bottom-2 -right-1 text-[#1e293b] font-black text-5xl opacity-30 select-none pointer-events-none transition-all duration-300 group-hover:scale-110 group-hover:opacity-50">
                            #\${(index + 1).toString().padStart(2, '0')}
                        </div>

                        <!-- Avatar -->
                        <div class="flex-shrink-0 mr-4 relative z-10">
                            <div class="w-11 h-11 rounded-full bg-gradient-to-br \${bgGradients} border \${borderColor} flex items-center justify-center font-black text-sm \${textColor} \${shadowGlow} group-hover:scale-105 transition-transform duration-300 tracking-wider">
                                \${initials}
                            </div>
                        </div>

                        <!-- Info -->
                        <div class="flex-grow z-10 pr-10">
                            <h5 class="text-slate-200 text-sm font-bold tracking-wide group-hover:text-white transition-colors leading-tight mb-1">
                                \${student.name}
                            </h5>
                            <p class="text-[10px] text-slate-500 font-semibold uppercase tracking-widest flex items-center gap-1.5">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500/70"></span> Activo
                            </p>
                        </div>

                        <!-- Copy NIE Button -->
                        <button onclick="copyNie('\${student.nie}', this)" class="absolute top-1/2 -translate-y-1/2 right-4 w-9 h-9 rounded-xl bg-[#0f172a] hover:bg-[#1e293b] border border-[#2d3f5e] hover:border-slate-600 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200 group/btn shadow-sm" title="Copiar NIE">
                            <i class="far fa-copy"></i>
                            <!-- Tooltip -->
                            <span class="absolute -top-10 right-1/2 translate-x-1/2 bg-slate-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-md opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl border border-slate-600">
                                Copiar NIE
                                <!-- Flecha del tooltip -->
                                <span class="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-700"></span>
                            </span>
                        </button>
                    </div>
                    \`;
                }).join('');

                const sectionHTML = \`
                    <div class="mb-8 break-inside-avoid">
                        <div class="flex flex-col sm:flex-row sm:items-center gap-4 mb-5">
                            <div class="flex items-center gap-3">
                                <div class="bg-[#1a2942] p-3 rounded-xl text-slate-300 border border-[#2d3f5e] shadow-inner">
                                    <i class="fas fa-folder-open"></i>
                                </div>
                                <div>
                                    <h4 class="font-extrabold text-slate-100 text-lg tracking-wide uppercase">\${item.grade}</h4>
                                    <p class="text-[11px] text-slate-500 font-bold tracking-widest uppercase mt-0.5">\${total} Matriculados</p>
                                </div>
                            </div>
                            <div class="flex-grow hidden sm:block border-t border-[#2d3f5e] border-dashed mx-4 opacity-70"></div>
                        </div>
                        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                            \${studentListHTML}
                        </div>
                    </div>
                \`;
                container.innerHTML += sectionHTML;
            });
        }

        window.copyNie = function(nie, btn) {
            navigator.clipboard.writeText(nie).then(() => {
                const tooltip = btn.querySelector('span');
                const originalText = tooltip.childNodes[0].nodeValue;
                const icon = btn.querySelector('i');
                
                tooltip.childNodes[0].nodeValue = '¡Copiado! ';
                tooltip.classList.remove('bg-slate-700', 'border-slate-600');
                tooltip.classList.add('bg-emerald-600', 'border-emerald-500');
                tooltip.style.opacity = '1';
                tooltip.querySelector('span').classList.replace('border-t-slate-700', 'border-t-emerald-600');
                
                icon.classList.remove('fa-copy', 'far');
                icon.classList.add('fa-check', 'fas', 'text-emerald-400');
                
                setTimeout(() => {
                    tooltip.childNodes[0].nodeValue = originalText;
                    tooltip.classList.remove('bg-emerald-600', 'border-emerald-500');
                    tooltip.classList.add('bg-slate-700', 'border-slate-600');
                    tooltip.style.opacity = '';
                    tooltip.querySelector('span').classList.replace('border-t-emerald-600', 'border-t-slate-700');
                    
                    icon.classList.remove('fa-check', 'fas', 'text-emerald-400');
                    icon.classList.add('fa-copy', 'far');
                }, 2000);
            }).catch(err => {
                console.error('Error al copiar: ', err);
            });
        };

`;

fs.writeFileSync('matricula.html', before + newRenderStudents + after);
console.log('Phase 17 UI Update executed successfully.');
