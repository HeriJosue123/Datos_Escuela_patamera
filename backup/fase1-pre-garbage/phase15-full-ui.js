const fs = require('fs');

let html = fs.readFileSync('matricula.html', 'utf8');

// Replace KPI HTML Block
const kpiRegex = /<!-- KPI Cards -->[\s\S]*?<!-- Statistics Section -->/;
const newKPI = `<!-- KPI Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 break-inside-avoid">
            <!-- Total Students -->
            <div class="bg-[#142138] rounded-2xl shadow-lg p-6 border border-[#2d3f5e] border-l-4 border-l-brand-500 card-hover flex items-center justify-between">
                <div>
                    <p class="text-slate-400 text-xs uppercase font-bold tracking-widest mb-1">Matrícula Total</p>
                    <h2 class="text-5xl font-black text-slate-100 tracking-tight" id="total-students">--</h2>
                </div>
                <div class="bg-brand-500/10 p-4 rounded-2xl text-brand-400 border border-brand-500/20">
                    <i class="fas fa-users fa-3x"></i>
                </div>
            </div>

            <!-- Boys -->
            <div class="bg-[#142138] rounded-2xl shadow-lg p-6 border border-[#2d3f5e] border-l-4 border-l-teal-500 card-hover flex items-center justify-between">
                <div>
                    <p class="text-slate-400 text-xs uppercase font-bold tracking-widest mb-1">Masculino</p>
                    <h2 class="text-5xl font-black text-slate-100 tracking-tight" id="total-male">--</h2>
                </div>
                <div class="bg-teal-500/10 p-4 rounded-2xl text-teal-400 border border-teal-500/20 px-5">
                    <i class="fas fa-male fa-3x"></i>
                </div>
            </div>

            <!-- Girls -->
            <div class="bg-[#142138] rounded-2xl shadow-lg p-6 border border-[#2d3f5e] border-l-4 border-l-pink-500 card-hover flex items-center justify-between">
                <div>
                    <p class="text-slate-400 text-xs uppercase font-bold tracking-widest mb-1">Femenino</p>
                    <h2 class="text-5xl font-black text-slate-100 tracking-tight" id="total-female">--</h2>
                </div>
                <div class="bg-pink-500/10 p-4 rounded-2xl text-pink-400 border border-pink-500/20 px-6">
                    <i class="fas fa-female fa-3x"></i>
                </div>
            </div>
        </div>

        <!-- Statistics Section -->`;
html = html.replace(kpiRegex, newKPI);

// Replace Statistics Section HTML Block
const statsRegex = /<!-- Statistics Section -->[\s\S]*?<!-- Teachers Section -->/;
const newStats = `<!-- Statistics Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 break-inside-avoid">
            
            <!-- Stats by Grade -->
            <div class="bg-[#142138] rounded-2xl shadow-lg overflow-hidden border border-[#2d3f5e]">
                <div class="bg-[#1e293b]/50 border-b border-[#2d3f5e] px-6 py-4 flex justify-between items-center">
                    <h3 class="text-lg font-bold text-slate-100 flex items-center gap-3">
                        <div class="bg-brand-500/20 p-2 rounded-lg text-brand-400 text-sm"><i class="fas fa-chart-bar"></i></div>
                        Estadística por Grado
                    </h3>
                </div>
                <div class="p-6">
                    <div class="overflow-x-auto rounded-xl border border-[#2d3f5e]">
                        <table class="min-w-full divide-y divide-[#2d3f5e]">
                            <thead class="bg-[#0f172a]/80">
                                <tr>
                                    <th class="px-5 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Grado</th>
                                    <th class="px-5 py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">Masculino</th>
                                    <th class="px-5 py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">Femenino</th>
                                    <th class="px-5 py-4 text-center text-xs font-bold text-brand-400 uppercase tracking-widest">Total</th>
                                </tr>
                            </thead>
                            <tbody class="bg-[#142138] divide-y divide-[#2d3f5e]" id="grade-stats-body">
                                <!-- JS will populate this -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Stats by Cycle -->
            <div class="bg-[#142138] rounded-2xl shadow-lg overflow-hidden border border-[#2d3f5e] flex flex-col">
                <div class="bg-[#1e293b]/50 border-b border-[#2d3f5e] px-6 py-4 flex justify-between items-center">
                    <h3 class="text-lg font-bold text-slate-100 flex items-center gap-3">
                        <div class="bg-indigo-500/20 p-2 rounded-lg text-indigo-400 text-sm"><i class="fas fa-layer-group"></i></div>
                        Estadística por Ciclo
                    </h3>
                </div>
                <div class="p-6 flex flex-col lg:flex-col xl:flex-row items-center justify-around flex-1 gap-8">
                    <div class="w-full xl:w-1/2 overflow-x-auto rounded-xl border border-[#2d3f5e]">
                         <table class="min-w-full divide-y divide-[#2d3f5e]">
                            <thead class="bg-[#0f172a]/80">
                                <tr>
                                    <th class="px-5 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Ciclo Educativo</th>
                                    <th class="px-5 py-4 text-center text-xs font-bold text-brand-400 uppercase tracking-widest">Total</th>
                                </tr>
                            </thead>
                            <tbody class="bg-[#142138] divide-y divide-[#2d3f5e]" id="cycle-stats-body">
                                <!-- JS will populate this -->
                            </tbody>
                        </table>
                    </div>
                    <div class="w-full xl:w-1/2 h-48 relative">
                        <canvas id="cycleChart"></canvas>
                    </div>
                </div>
            </div>
        </div>

        <!-- Teachers Section -->`;
html = html.replace(statsRegex, newStats);

// Replace Teachers Section HTML Block
const teachersRegex = /<!-- Teachers Section -->[\s\S]*?<!-- Student List Section -->/;
const newTeachers = `<!-- Teachers Section -->
        <div class="bg-[#142138] rounded-2xl shadow-lg overflow-hidden border border-[#2d3f5e] mb-8 break-inside-avoid">
            <div class="bg-[#1e293b]/50 border-b border-[#2d3f5e] px-6 py-4 flex justify-between items-center">
                <h3 class="text-xl font-bold text-slate-100 flex items-center gap-3">
                    <div class="bg-purple-500/20 p-2 rounded-lg text-purple-400 text-sm"><i class="fas fa-chalkboard-teacher"></i></div>
                    Profesores Encargados
                </h3>
            </div>
            <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Teacher 1 -->
                <div class="border rounded-2xl p-6 bg-[#1a2942] border-[#2d3f5e] shadow-inner card-hover break-inside-avoid">
                    <div class="flex items-center mb-5 border-b border-[#2d3f5e]/80 pb-4">
                        <div class="bg-purple-500/10 p-3.5 rounded-xl mr-4 text-purple-400 border border-purple-500/20">
                            <i class="fas fa-user-graduate fa-lg"></i>
                        </div>
                        <div>
                            <h4 class="font-bold text-slate-100 text-lg">Prof. Alejandra Alvarenga Otero</h4>
                            <span class="text-[10px] font-black uppercase text-purple-400 tracking-widest">Parvularia y I Ciclo</span>
                        </div>
                    </div>
                    <div>
                        <p class="text-[11px] text-slate-400 uppercase font-bold mb-3 tracking-widest">Grados Asignados:</p>
                        <div class="flex flex-wrap gap-2">
                            <span class="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0f172a] text-slate-300 border border-[#2d3f5e] shadow-sm">Parvularia 4</span>
                            <span class="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0f172a] text-slate-300 border border-[#2d3f5e] shadow-sm">Parvularia 5</span>
                            <span class="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0f172a] text-slate-300 border border-[#2d3f5e] shadow-sm">Parvularia 6</span>
                            <span class="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0f172a] text-slate-300 border border-[#2d3f5e] shadow-sm">Primer Grado</span>
                            <span class="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0f172a] text-slate-300 border border-[#2d3f5e] shadow-sm">Segundo Grado</span>
                        </div>
                    </div>
                </div>

                <!-- Teacher 2 -->
                <div class="border rounded-2xl p-6 bg-[#1a2942] border-[#2d3f5e] shadow-inner card-hover break-inside-avoid">
                    <div class="flex items-center mb-5 border-b border-[#2d3f5e]/80 pb-4">
                        <div class="bg-brand-500/10 p-3.5 rounded-xl mr-4 text-brand-400 border border-brand-500/20">
                            <i class="fas fa-user-tie fa-lg"></i>
                        </div>
                        <div>
                            <h4 class="font-bold text-slate-100 text-lg">Prof. Marvin Norberto Galvez Cruz</h4>
                            <span class="text-[10px] font-black uppercase text-brand-400 tracking-widest">I, II y III Ciclo</span>
                        </div>
                    </div>
                    <div>
                        <p class="text-[11px] text-slate-400 uppercase font-bold mb-3 tracking-widest">Grados Asignados:</p>
                        <div class="flex flex-wrap gap-2">
                            <span class="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0f172a] text-slate-300 border border-[#2d3f5e] shadow-sm">Tercer Grado</span>
                            <span class="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0f172a] text-slate-300 border border-[#2d3f5e] shadow-sm">Cuarto Grado</span>
                            <span class="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0f172a] text-slate-300 border border-[#2d3f5e] shadow-sm">Quinto Grado</span>
                            <span class="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0f172a] text-slate-300 border border-[#2d3f5e] shadow-sm">Séptimo Grado</span>
                            <span class="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0f172a] text-slate-300 border border-[#2d3f5e] shadow-sm">Octavo Grado</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Student List Section -->`;
html = html.replace(teachersRegex, newTeachers);

// Replace Students Section HTML Block
const listRegex = /<!-- Student List Section -->[\s\S]*?<\/main>/;
const newList = `<!-- Student List Section -->
        <div class="bg-[#142138] rounded-2xl shadow-lg overflow-hidden border border-[#2d3f5e] break-inside-avoid">
            <div class="bg-[#1e293b]/50 border-b border-[#2d3f5e] px-6 py-5 flex items-center gap-3">
                <div class="bg-cyan-500/20 p-2.5 rounded-lg text-cyan-400 shadow-inner">
                    <i class="fas fa-clipboard-list fa-lg"></i>
                </div>
                <div>
                    <h3 class="text-xl font-bold text-slate-100">Nómina Oficial de Estudiantes</h3>
                    <p class="text-xs text-slate-400 font-semibold tracking-widest uppercase mt-0.5">Listado estructurado por grados</p>
                </div>
            </div>
            
            <div id="students-container" class="p-6 space-y-4">
                <!-- Students will be rendered here by JS -->
            </div>
        </div>

    </main>`;
html = html.replace(listRegex, newList);

// Replace renderStats JS Function entirely
const renderStatsRegex = /function renderStats\(\) \{[\s\S]*?function renderStudents\(\)/;
const newRenderStats = `function renderStats() {
            const gradeBody = document.getElementById('grade-stats-body');
            const cycleBody = document.getElementById('cycle-stats-body');
            let totalM = 0;
            let totalF = 0;
            
            const cycles = {};

            gradeBody.innerHTML = '';
            cycleBody.innerHTML = '';

            schoolData.forEach(item => {
                const total = item.male + item.female;
                totalM += item.male;
                totalF += item.female;

                const row = \`
                    <tr class="hover:bg-[#1a2942]/50 transition-colors">
                        <td class="px-5 py-3 whitespace-nowrap font-bold text-slate-200">\${item.grade}</td>
                        <td class="px-5 py-3 text-center text-teal-400 font-bold bg-teal-500/5 border-x border-[#2d3f5e]/30">\${item.male}</td>
                        <td class="px-5 py-3 text-center text-pink-400 font-bold bg-pink-500/5 border-r border-[#2d3f5e]/30">\${item.female}</td>
                        <td class="px-5 py-3 text-center font-black text-brand-300 bg-brand-500/10">\${total}</td>
                    </tr>
                \`;
                gradeBody.innerHTML += row;

                if(!cycles[item.cycle]) cycles[item.cycle] = 0;
                cycles[item.cycle] += total;
            });

            document.getElementById('total-students').innerText = totalM + totalF;
            document.getElementById('total-male').innerText = totalM;
            document.getElementById('total-female').innerText = totalF;

            const cycleLabels = [];
            const cycleData = [];
            const cycleColors = ['#3b82f6', '#10b981', '#f59e0b', '#ec4899'];

            for (const [cycleName, count] of Object.entries(cycles)) {
                const row = \`
                    <tr class="hover:bg-[#1a2942]/50 transition-colors">
                        <td class="px-5 py-4 whitespace-nowrap font-bold text-slate-200">\${cycleName}</td>
                        <td class="px-5 py-4 text-center font-black text-brand-300 bg-brand-500/10 border-l border-[#2d3f5e]/30">\${count}</td>
                    </tr>
                \`;
                cycleBody.innerHTML += row;

                cycleLabels.push(cycleName);
                cycleData.push(count);
            }

            const ctx = document.getElementById('cycleChart').getContext('2d');
            if (window.cycleChartInstance) { window.cycleChartInstance.destroy(); }
            window.cycleChartInstance = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: cycleLabels,
                    datasets: [{
                        data: cycleData,
                        backgroundColor: cycleColors,
                        borderWidth: 1,
                        borderColor: '#142138'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    color: '#94a3b8',
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: { color: '#94a3b8', boxWidth: 12, font: { size: 11, family: 'Inter' } }
                        }
                    }
                }
            });
        }

        function renderStudents()`;
html = html.replace(renderStatsRegex, newRenderStats);

// Replace renderStudents JS Function entirely
const renderStudentsRegex = /function renderStudents\(\) \{[\s\S]*?\}\s*document\.addEventListener\('DOMContentLoaded'/;
const newRenderStudents = `function renderStudents() {
            const container = document.getElementById('students-container');
            container.innerHTML = '';

            schoolData.forEach(item => {
                const total = item.male + item.female;
                const studentListHTML = item.students.map((student, index) => \`
                    <li class="flex flex-col sm:flex-row sm:items-center justify-between p-3 hover:bg-[#1a2942] rounded-xl border border-transparent hover:border-[#2d3f5e] hover:shadow-sm transition-all duration-200 group">
                        <div class="flex items-center">
                            <span class="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-[#0f172a] border border-[#2d3f5e] text-slate-400 group-hover:text-brand-400 group-hover:border-brand-500/30 rounded-full text-xs mr-4 font-bold shadow-inner transition-colors">\${index + 1}</span>
                            <span class="text-slate-200 uppercase text-sm font-bold tracking-wide group-hover:text-white transition-colors">\${student.name}</span>
                        </div>
                        <div class="mt-3 sm:mt-0 sm:ml-4 flex items-center">
                             <span class="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-[#0f172a] text-slate-300 border border-[#2d3f5e] shadow-inner group-hover:border-brand-500/30 group-hover:text-brand-300 transition-colors">
                                <span class="mr-1.5 text-slate-500 font-semibold tracking-widest uppercase">NIE:</span> <span class="font-mono tracking-wider">\${student.nie}</span>
                            </span>
                        </div>
                    </li>
                \`).join('');

                const sectionHTML = \`
                    <div class="mb-5">
                        <div class="flex items-center gap-3 mb-3 px-2">
                            <div class="bg-brand-500/20 p-2 rounded-lg text-brand-400 shadow-inner">
                                <i class="fas fa-book-open"></i>
                            </div>
                            <h4 class="font-extrabold text-slate-100 text-lg uppercase tracking-wide">\${item.grade}</h4>
                            <div class="flex-grow border-t border-[#2d3f5e] border-dashed mx-2 opacity-50"></div>
                            <span class="bg-[#1a2942] text-slate-300 border border-[#2d3f5e] font-bold text-[10px] px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">\${total} Estudiantes</span>
                        </div>
                        <div class="bg-[#142138] border border-[#2d3f5e] rounded-2xl p-2 shadow-lg">
                            <ul class="space-y-1">
                                \${studentListHTML}
                            </ul>
                        </div>
                    </div>
                \`;
                container.innerHTML += sectionHTML;
            });
        }

        document.addEventListener('DOMContentLoaded'`;
html = html.replace(renderStudentsRegex, newRenderStudents);

fs.writeFileSync('matricula.html', html);
console.log('Phase 15: Matricula UI completely overhauled successfully.');
