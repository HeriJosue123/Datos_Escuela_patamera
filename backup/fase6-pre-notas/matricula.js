// Data Source extracted from the uploaded PDFs
        let schoolData = [
            {
                grade: "Parvularia 4",
                cycle: "Parvularia",
                male: 0,
                female: 2,
                students: [
                    { name: "ALBERTO LOPEZ, CAMILA JIMENA", nie: "11158382" },
                    { name: "ALBERTO MENBREÑO, GENESIS CAMILA", nie: "11160349" }
                ]
            },
            {
                grade: "Parvularia 5",
                cycle: "Parvularia",
                male: 2,
                female: 2,
                students: [
                    { name: "ALBERTO MORALES, EZEQUIEL LEONEL", nie: "11004157" },
                    { name: "ALBERTO PORTILLO, JOSELIN ADRIANA", nie: "11023392" },
                    { name: "HERCULES ALBERTO, DAMARIS JULISSA", nie: "11004100" },
                    { name: "PORTILLO ALBERTO, JONATAN JAVIER", nie: "11083864" }
                ]
            },
            {
                grade: "Parvularia 6",
                cycle: "Parvularia",
                male: 2,
                female: 3,
                students: [
                    { name: "ALBERTO PORTILLO, JENNIFER PAOLA", nie: "10922595" },
                    { name: "BONILLA ABREGO, ISAI ORLANDO", nie: "10923110" },
                    { name: "FLORES ALBERTO, VALERIA DALLARI", nie: "10922887" },
                    { name: "LOPEZ MARTINEZ, DYLAN FABRICIO", nie: "10921927" },
                    { name: "ROMERO AVELAR, KARLA GABRIELA", nie: "10901336" }
                ]
            },
            {
                grade: "Primer Grado",
                cycle: "I Ciclo",
                male: 2,
                female: 1,
                students: [
                    { name: "ALBERTO ALBERTO, JOSHUA ALEXIS", nie: "10766064" },
                    { name: "ALBERTO RIVERA, JOSÉ DANILO", nie: "10768672" },
                    { name: "MIRANDA ALBERTO, DAYANI MELISSA", nie: "10910728" }
                ]
            },
            {
                grade: "Segundo Grado",
                cycle: "I Ciclo",
                male: 2,
                female: 1,
                students: [
                    { name: "FLORES ALBERTO, JUAN MANUEL", nie: "10633747" },
                    { name: "HERCULES ALBERTO, DANELY BETZALY", nie: "10645646" },
                    { name: "HERNÁNDEZ ALBERTO, LIAM CALEB", nie: "10798973" }
                ]
            },
            {
                grade: "Tercer Grado",
                cycle: "I Ciclo",
                male: 2,
                female: 0,
                students: [
                    { name: "PORTILLO ALBERTO, GERARDO EDENILSON", nie: "10488163" },
                    { name: "PORTILLO ALBERTO, JOEL ISAİ", nie: "10470912" }
                ]
            },
            {
                grade: "Cuarto Grado",
                cycle: "II Ciclo",
                male: 2,
                female: 0,
                students: [
                    { name: "HENRÍQUEZ PORTILLO, IRVIN EMANUEL", nie: "10471058" },
                    { name: "MIRANDA ALBERTO, DIEGO ALEXANDER", nie: "10539516" }
                ]
            },
            {
                grade: "Quinto Grado",
                cycle: "II Ciclo",
                male: 3,
                female: 0,
                students: [
                    { name: "ALBERTO RIVERA, BRAYAN FABRICIO", nie: "10170774" },
                    { name: "LÓPEZ ALBERTO, ALEXANDER ADONAY", nie: "10170799" },
                    { name: "PORTILLO MELGAR, DIEGO FELIPE", nie: "10170814" }
                ]
            },
            {
                grade: "Séptimo Grado",
                cycle: "III Ciclo",
                male: 2,
                female: 3,
                students: [
                    { name: "ALBERTO ALBERTO, ESTRELLA DANIELA", nie: "20230706" },
                    { name: "ALBERTO LOBOS, JOSÉ EDUARDO", nie: "20330251" },
                    { name: "ECHEVERRÍA CARDONA, ELIZA ITAMAR", nie: "20230708" },
                    { name: "ECHEVERRÍA CARDONA, ROSMERY BETSABE", nie: "20230707" },
                    { name: "RAUDA NATAREN, HARRIS ALEXANDER", nie: "20134702" }
                ]
            },
            {
                grade: "Octavo Grado",
                cycle: "III Ciclo",
                male: 0,
                female: 1,
                students: [
                    { name: "URBINA PORTILLO, ANDREA SARAI", nie: "20134703" }
                ]
            }
        ];

        // --- Render Functions ---

        function renderStats() {
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

                const row = `
                    <tr class="hover:bg-[#1a2942]/50 transition-colors">
                        <td class="px-5 py-3 whitespace-nowrap font-bold text-slate-200">${item.grade}</td>
                        <td class="px-5 py-3 text-center text-teal-400 font-bold bg-teal-500/5 border-x border-[#2d3f5e]/30">${item.male}</td>
                        <td class="px-5 py-3 text-center text-pink-400 font-bold bg-pink-500/5 border-r border-[#2d3f5e]/30">${item.female}</td>
                        <td class="px-5 py-3 text-center font-black text-brand-300 bg-brand-500/10">${total}</td>
                    </tr>
                `;
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
                const row = `
                    <tr class="hover:bg-[#1a2942]/50 transition-colors">
                        <td class="px-5 py-4 whitespace-nowrap font-bold text-slate-200">${cycleName}</td>
                        <td class="px-5 py-4 text-center font-black text-brand-300 bg-brand-500/10 border-l border-[#2d3f5e]/30">${count}</td>
                    </tr>
                `;
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

        function renderStudents() {
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

                    return `
                    <div class="group relative flex items-center p-4 bg-[#142138] hover:bg-[#1a2942] rounded-2xl border border-[#2d3f5e] hover:border-[#3b4c6b] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] cursor-default overflow-hidden">
                        
                        <!-- Left color accent bar -->
                        <div class="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b ${bgGradients} opacity-60 group-hover:opacity-100 transition-opacity"></div>

                        <!-- Decorative Watermark Number -->
                        <div class="absolute -bottom-2 -right-1 text-[#1e293b] font-black text-5xl opacity-30 select-none pointer-events-none transition-all duration-300 group-hover:scale-110 group-hover:opacity-50">
                            #${(index + 1).toString().padStart(2, '0')}
                        </div>

                        <!-- Avatar -->
                        <div class="flex-shrink-0 mr-4 relative z-10">
                            <div class="w-11 h-11 rounded-full bg-gradient-to-br ${bgGradients} border ${borderColor} flex items-center justify-center font-black text-sm ${textColor} ${shadowGlow} group-hover:scale-105 transition-transform duration-300 tracking-wider">
                                ${initials}
                            </div>
                        </div>

                        <!-- Info -->
                        <div class="flex-grow z-10 pr-2">
                            <h5 class="text-slate-200 text-sm font-bold tracking-wide group-hover:text-white transition-colors leading-tight mb-1.5">
                                ${student.name}
                            </h5>
                            <div class="flex items-center gap-2 mt-0.5">
                                <span class="bg-[#0f172a] text-slate-400 border border-[#2d3f5e] px-2 py-0.5 rounded text-[10px] font-mono tracking-wider shadow-inner flex items-center gap-1.5 transition-colors group-hover:border-slate-600">
                                    <i class="fas fa-id-card text-slate-500 text-[9px] group-hover:text-brand-500/70 transition-colors"></i>
                                    ${student.nie}
                                </span>
                                <!-- Copy NIE Button -->
                                <button onclick="copyNie('${student.nie}', this)" class="w-6 h-6 rounded bg-[#0f172a] hover:bg-[#1e293b] border border-[#2d3f5e] hover:border-brand-500/50 text-slate-500 hover:text-brand-400 flex items-center justify-center transition-all duration-200 relative group/btn" title="Copiar NIE">
                                    <i class="far fa-copy text-[10px]"></i>
                                    <!-- Tooltip -->
                                    <span class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-700 text-white text-[9px] font-bold px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg border border-slate-600 z-20">
                                        Copiar NIE
                                        <!-- Flecha del tooltip -->
                                        <span class="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-700"></span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    `;
                }).join('');

                const sectionHTML = `
                    <div class="mb-8 break-inside-avoid">
                        <div class="flex flex-col sm:flex-row sm:items-center gap-4 mb-5">
                            <div class="flex items-center gap-3">
                                <div class="bg-[#1a2942] p-3 rounded-xl text-slate-300 border border-[#2d3f5e] shadow-inner">
                                    <i class="fas fa-folder-open"></i>
                                </div>
                                <div>
                                    <h4 class="font-extrabold text-slate-100 text-lg tracking-wide uppercase">${item.grade}</h4>
                                    <p class="text-[11px] text-slate-500 font-bold tracking-widest uppercase mt-0.5">${total} Matriculados</p>
                                </div>
                            </div>
                            <div class="flex-grow hidden sm:block border-t border-[#2d3f5e] border-dashed mx-4 opacity-70"></div>
                        </div>
                        <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                            ${studentListHTML}
                        </div>
                    </div>
                `;
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

        

        async function initEnrollmentData() {
            const schoolId = '66083';
            const year = '2026';
            const enrollmentRef = db.collection('schools').doc(schoolId).collection('years').doc(year).collection('enrollment');
            
            try {
                const snapshot = await enrollmentRef.get();
                if (snapshot.empty) {
                    console.log("📦 Base de datos vacía. Migrando datos locales a Firestore...");
                    for (const group of schoolData) {
                        await enrollmentRef.doc(group.grade).set(group);
                    }
                    console.log("✅ Migración completada.");
                } else {
                    console.log("☁️ Cargando datos desde Firestore...");
                    const remoteData = [];
                    snapshot.forEach(doc => {
                        remoteData.push(doc.data());
                    });
                    
                    const gradeOrder = {
                        "Parvularia 4": 1,
                        "Parvularia 5": 2,
                        "Parvularia 6": 3,
                        "Primer Grado": 4,
                        "Segundo Grado": 5,
                        "Tercer Grado": 6,
                        "Cuarto Grado": 7,
                        "Quinto Grado": 8,
                        "Séptimo Grado": 9,
                        "Octavo Grado": 10
                    };
                    
                    remoteData.sort((a, b) => {
                        return (gradeOrder[a.grade] || 99) - (gradeOrder[b.grade] || 99);
                    });
                    
                    schoolData = remoteData;
                    console.log("✅ Datos cargados correctamente.");
                }
            } catch (error) {
                console.error("❌ Error de Firestore:", error);
            }

            renderStats();
            renderStudents();
        }

        document.addEventListener('DOMContentLoaded', () => {
            initEnrollmentData();
        });
    


function toggleSidebar(event) {
  if (event) event.stopPropagation();
  const sidebar = document.getElementById('sidebar-menu');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar.classList.contains('open')) { closeSidebar(); } else {
    sidebar.classList.add('open'); overlay.classList.add('active'); 
  }
}
function closeSidebar() {
  document.getElementById('sidebar-menu').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('active');
}