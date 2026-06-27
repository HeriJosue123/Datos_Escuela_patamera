const fs = require('fs');

let html = fs.readFileSync('matricula.html', 'utf8');

// The split point
const splitPoint = "        function renderStats() {";
const parts = html.split(splitPoint);

if (parts.length < 2) {
    console.error("Split point not found!");
    process.exit(1);
}

const beforeStats = parts[0];

const newJsCode = `        function renderStats() {
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

        function renderStudents() {
            const container = document.getElementById('students-container');
            container.innerHTML = '';

            schoolData.forEach(item => {
                const total = item.male + item.female;
                const studentListHTML = item.students.map((student, index) => \`
                    <div class="group relative flex flex-col p-4 bg-[#142138]/50 hover:bg-[#1a2942] rounded-xl border border-[#2d3f5e]/60 hover:border-brand-500/40 transition-all duration-300 hover:shadow-[0_4px_20px_-5px_rgba(59,130,246,0.15)] cursor-default overflow-hidden">
                        <!-- Glow effect -->
                        <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/0 to-transparent group-hover:via-brand-500/50 transition-all duration-500"></div>
                        <div class="flex items-start justify-between mb-2">
                            <span class="inline-flex items-center justify-center px-2 py-0.5 rounded text-[10px] font-black bg-[#0f172a] text-slate-500 border border-[#2d3f5e] group-hover:border-brand-500/30 group-hover:text-brand-400 group-hover:bg-brand-500/10 transition-colors">
                                #\${(index + 1).toString().padStart(2, '0')}
                            </span>
                            <i class="fas fa-user-circle text-slate-600/50 group-hover:text-brand-500/30 text-lg transition-colors"></i>
                        </div>
                        <h5 class="text-slate-200 uppercase text-sm font-extrabold tracking-wide group-hover:text-white transition-colors leading-snug mb-3 flex-grow">
                            \${student.name}
                        </h5>
                        <div class="flex items-center pt-3 border-t border-[#2d3f5e]/50 group-hover:border-brand-500/20 transition-colors">
                            <div class="flex items-center gap-2 text-slate-500 text-[10px] uppercase font-bold tracking-widest">
                                <i class="fas fa-id-card text-slate-600 group-hover:text-brand-500/70"></i>
                                <span>NIE: <span class="font-mono text-slate-400 group-hover:text-brand-300">\${student.nie}</span></span>
                            </div>
                        </div>
                    </div>
                \`).join('');

                const sectionHTML = \`
                    <div class="mb-6">
                        <div class="flex items-center gap-3 mb-3 px-2">
                            <div class="bg-brand-500/20 p-2 rounded-lg text-brand-400 shadow-inner">
                                <i class="fas fa-book-open"></i>
                            </div>
                            <h4 class="font-extrabold text-slate-100 text-lg uppercase tracking-wide">\${item.grade}</h4>
                            <div class="flex-grow border-t border-[#2d3f5e] border-dashed mx-2 opacity-50"></div>
                            <span class="bg-[#1a2942] text-slate-300 border border-[#2d3f5e] font-bold text-[10px] px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">\${total} Estudiantes</span>
                        </div>
                        <div class="bg-[#142138] border border-[#2d3f5e] rounded-2xl p-4 shadow-lg">
                            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                \${studentListHTML}
                            </div>
                        </div>
                    </div>
                \`;
                container.innerHTML += sectionHTML;
            });
        }

        // --- FIREBASE INTEGRATION ---
        const firebaseConfig = {
            apiKey: "AIzaSyCOxSEhGKWGbIG5fvUYUBRI--dXsRH3mdU",
            authDomain: "alicontrol-c64d2.firebaseapp.com",
            projectId: "alicontrol-c64d2",
            storageBucket: "alicontrol-c64d2.firebasestorage.app",
            messagingSenderId: "1052279207948",
            appId: "1:1052279207948:web:f67b98a112c93ee86dd629"
        };

        let db;
        try {
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
            }
            db = firebase.firestore();
            console.log("🔥 Firebase inicializado en módulo Matrícula");
        } catch(e) {
            console.error("Error al iniciar Firebase", e);
        }

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
    </script>
</div>

<script>
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
</script>
</body>
</html>
`;

fs.writeFileSync('matricula.html', beforeStats + newJsCode);
console.log("Phase 16 completed successfully.");
