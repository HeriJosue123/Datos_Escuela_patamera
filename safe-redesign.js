const fs = require('fs');

let html = fs.readFileSync('notas.html', 'utf8');
html = html.replace(/\r\n/g, '\n');

function doReplace(desc, oldStr, newStr) {
    if (html.indexOf(oldStr) === -1) {
        console.error("FAILED to find block for: " + desc);
    } else {
        html = html.replace(oldStr, newStr);
        console.log("SUCCESS: " + desc);
    }
}

// 1. MAIN PANEL wrapper
doReplace('Main wrapper open',
`        <!-- MAIN PANEL -->
        <main class="glass-panel rounded-2xl shadow-xl p-6 transition-all">`,
`        <!-- MAIN PANEL -->
        <div class="transition-all" id="main-views-wrapper">`);

// Main wrapper close
doReplace('Main wrapper close',
`    <!-- MAIN JAVASCRIPT LOGIC -->
    
    <!-- Firebase SDK Compatibility CDN -->
    <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js"></script>
    <script src="notas.js?v=1"></script>
    
</main>
</div>`,
`    <!-- MAIN JAVASCRIPT LOGIC -->
    
    <!-- Firebase SDK Compatibility CDN -->
    <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js"></script>
    <script src="notas.js?v=1"></script>
    
</div>
</div>`);

// 2. Header
const oldHeader = `        <!-- HEADER CONFIGURATION (Premium Card) -->
        <header class="glass-panel rounded-2xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl border-l-8 border-brand-600">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2d3f5e] pb-4 mb-4">
                <div class="flex items-center gap-3">
                    <div class="bg-brand-600 text-white p-3 rounded-xl shadow-lg shadow-brand-500/30">
                        <i class="fa-solid fa-graduation-cap text-2xl"></i>
                    </div>
                    <div>
                        <h1 class="text-2xl font-bold tracking-tight text-slate-50">Registro de Evaluación Escolar</h1>
                        <p class="text-sm text-slate-400">Centro Escolar Cantón Patamera - Gestión de Calificaciones 2026 - 2035</p>
                    </div>
                </div>
                <div class="flex flex-wrap items-center gap-3">
                    <!-- School Year Selector -->
                    <div class="flex items-center gap-2 bg-[#142138] border border-[#3f567a] px-3 py-1.5 rounded-xl">
                        <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Año Lectivo:</span>
                        <select id="header-year" onchange="changeYear()" class="bg-transparent font-extrabold text-brand-700 focus:outline-none cursor-pointer">
                            <option value="2026" selected>2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                            <option value="2030">2030</option>
                            <option value="2031">2031</option>
                            <option value="2032">2032</option>
                            <option value="2033">2033</option>
                            <option value="2034">2034</option>
                            <option value="2035">2035</option>
                            <option value="2036">2036</option>
                            <option value="2037">2037</option>
                            <option value="2038">2038</option>
                            <option value="2039">2039</option>
                            <option value="2040">2040</option>
                            <option value="2041">2041</option>
                            <option value="2042">2042</option>
                            <option value="2043">2043</option>
                            <option value="2044">2044</option>
                            <option value="2045">2045</option>
                        </select>
                    </div>
                    <button onclick="openAIAssistantModal()" title="Asistente IA" class="bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 active:scale-95 text-white font-bold h-10 w-10 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300 flex items-center justify-center text-sm border border-cyan-300/30">
                        <i class="fa-solid fa-robot"></i>
                    </button>
                    <button onclick="saveAllData(true)" class="bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-brand-500/25 transition-all duration-150 flex items-center gap-2">
                        <i class="fa-solid fa-floppy-disk"></i>
                        Guardar Notas
                    </button>
                </div>
            </div>

            <!-- Header Grid Inputs -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Centro Escolar</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                            <i class="fa-solid fa-school"></i>
                        </span>
                        <input id="header-school" type="text" value="CANTON PATAMERA" oninput="autoSaveHeader()"
                            class="w-full pl-10 pr-2 py-2 bg-transparent border-b-2 border-[#2d3f5e] rounded-none focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all font-medium text-slate-50">
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Profesor / Docente</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                            <i class="fa-solid fa-user-tie"></i>
                        </span>
                        <input id="header-teacher" type="text" value="Marvin Norberto Galvez" oninput="autoSaveHeader()"
                            class="w-full pl-10 pr-2 py-2 bg-transparent border-b-2 border-[#2d3f5e] rounded-none focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all font-medium text-slate-50">
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Asignatura / Materia</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                            <i class="fa-solid fa-book-open"></i>
                        </span>
                        <select id="header-subject" onchange="changeSubject()"
                            class="w-full pl-10 pr-2 py-2 bg-transparent border-b-2 border-[#2d3f5e] rounded-none focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all font-semibold text-slate-50 appearance-none">
                            <option value="LENGUAJE Y LITERATURA">LENGUAJE Y LITERATURA</option>
                            <option value="MATEMATICA">MATEMATICA</option>
                            <option value="CIUDADANIA Y VALORES">CIUDADANIA Y VALORES</option>
                            <option value="CIENCIA Y TECNOLOGIA">CIENCIA Y TECNOLOGIA</option>
                            <option value="INGLES">INGLES</option>
                            <option value="EDUCACION DE FISICA">EDUCACION DE FISICA</option>
                            <option value="MORAL, URBANIDAD Y CIVICA">MORAL, URBANIDAD Y CIVICA</option>
                        </select>
                        <span class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                            <i class="fa-solid fa-chevron-down text-xs"></i>
                        </span>
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Grado Académico</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                            <i class="fa-solid fa-layer-group"></i>
                        </span>
                        <select id="header-grade" onchange="changeGrade()"
                            class="w-full pl-10 pr-2 py-2 bg-transparent border-b-2 border-[#2d3f5e] rounded-none focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all font-semibold text-brand-900 appearance-none">
                            <option value="3°">3° Grado</option>
                            <option value="4°">4° Grado</option>
                            <option value="5°">5° Grado</option>
                            <option value="6°">6° Grado</option>
                            <option value="7°" selected>7° Grado</option>
                            <option value="8°">8° Grado</option>
                            <option value="9°">9° Grado</option>
                        </select>
                        <span class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                            <i class="fa-solid fa-chevron-down text-xs"></i>
                        </span>
                    </div>
                </div>
            </div>
        </header>`;

const newHeader = `        <!-- HEADER CONFIGURATION (Premium Card) -->
        <header class="bg-[#1a2942] rounded-2xl p-5 shadow-lg border border-[#2d3f5e] mb-8 transition-all">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2d3f5e]/60 pb-5 mb-5">
                <div class="flex items-center gap-3">
                    <div class="bg-brand-600 text-white p-3 rounded-xl shadow-lg shadow-brand-500/30">
                        <i class="fa-solid fa-graduation-cap text-2xl"></i>
                    </div>
                    <div>
                        <h1 class="text-2xl font-bold tracking-tight text-slate-50">Registro de Evaluación Escolar</h1>
                        <p class="text-sm text-slate-400">Centro Escolar Cantón Patamera</p>
                    </div>
                </div>
                <div class="flex flex-wrap items-center gap-3">
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
                </div>
            </div>

            <!-- Header Grid Inputs -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 pl-1">Centro Escolar</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-brand-400">
                            <i class="fa-solid fa-school"></i>
                        </span>
                        <input id="header-school" type="text" value="CANTON PATAMERA" oninput="autoSaveHeader()"
                            class="w-full h-10 pl-10 pr-3 bg-[#142138] border border-[#2d3f5e] rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 transition-all font-semibold text-slate-100">
                    </div>
                </div>
                <div>
                    <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 pl-1">Profesor / Docente</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-brand-400">
                            <i class="fa-solid fa-user-tie"></i>
                        </span>
                        <input id="header-teacher" type="text" value="Marvin Norberto Galvez" oninput="autoSaveHeader()"
                            class="w-full h-10 pl-10 pr-3 bg-[#142138] border border-[#2d3f5e] rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 transition-all font-semibold text-slate-100">
                    </div>
                </div>
                <div>
                    <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 pl-1">Asignatura / Materia</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-brand-400">
                            <i class="fa-solid fa-book-open"></i>
                        </span>
                        <select id="header-subject" onchange="changeSubject()"
                            class="w-full h-10 pl-10 pr-8 bg-[#142138] border border-[#2d3f5e] rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 transition-all font-semibold text-slate-100 appearance-none cursor-pointer">
                            <option value="LENGUAJE Y LITERATURA">LENGUAJE Y LITERATURA</option>
                            <option value="MATEMATICA">MATEMATICA</option>
                            <option value="CIUDADANIA Y VALORES">CIUDADANIA Y VALORES</option>
                            <option value="CIENCIA Y TECNOLOGIA">CIENCIA Y TECNOLOGIA</option>
                            <option value="INGLES">INGLES</option>
                            <option value="EDUCACION DE FISICA">EDUCACION DE FISICA</option>
                            <option value="MORAL, URBANIDAD Y CIVICA">MORAL, URBANIDAD Y CIVICA</option>
                        </select>
                        <span class="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-500">
                            <i class="fa-solid fa-chevron-down text-xs"></i>
                        </span>
                    </div>
                </div>
                <div>
                    <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 pl-1">Grado Académico</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-brand-400">
                            <i class="fa-solid fa-layer-group"></i>
                        </span>
                        <select id="header-grade" onchange="changeGrade()"
                            class="w-full h-10 pl-10 pr-8 bg-[#142138] border border-[#2d3f5e] rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 transition-all font-semibold text-brand-400 appearance-none cursor-pointer">
                            <option value="3°">3° Grado</option>
                            <option value="4°">4° Grado</option>
                            <option value="5°">5° Grado</option>
                            <option value="6°">6° Grado</option>
                            <option value="7°" selected>7° Grado</option>
                            <option value="8°">8° Grado</option>
                            <option value="9°">9° Grado</option>
                        </select>
                        <span class="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-500">
                            <i class="fa-solid fa-chevron-down text-xs"></i>
                        </span>
                    </div>
                </div>
            </div>
        </header>`;

doReplace('Header', oldHeader, newHeader);

// 3. Tab Nav
const oldNav = `        <!-- TAB NAVIGATION -->
        <nav class="flex space-x-6 border-b border-[#2d3f5e] max-w-3xl">
            <button onclick="switchTab('periodo1')" id="tab-periodo1" class="tab-btn pb-2 text-center font-bold text-sm transition-all duration-200 text-brand-400 border-b-2 border-brand-400">
                1° Periodo
            </button>
            <button onclick="switchTab('periodo2')" id="tab-periodo2" class="tab-btn pb-2 text-center font-semibold text-sm transition-all duration-200 text-slate-400 hover:text-slate-200 border-b-2 border-transparent hover:border-slate-500">
                2° Periodo
            </button>
            <button onclick="switchTab('periodo3')" id="tab-periodo3" class="tab-btn pb-2 text-center font-semibold text-sm transition-all duration-200 text-slate-400 hover:text-slate-200 border-b-2 border-transparent hover:border-slate-500">
                3° Periodo
            </button>
            <button onclick="switchTab('consolidado')" id="tab-consolidado" class="tab-btn pb-2 text-center font-semibold text-sm transition-all duration-200 text-slate-400 hover:text-slate-200 border-b-2 border-transparent hover:border-slate-500">
                Consolidado <span class="consolidado-year-lbl">2026</span>
            </button>
            <button onclick="switchTab('analisis')" id="tab-analisis" class="tab-btn pb-2 text-center font-bold text-sm transition-all duration-200 text-slate-400 hover:text-cyan-400 border-b-2 border-transparent flex items-center justify-center gap-1.5 hover:border-cyan-400">
                <i class="fa-solid fa-chart-pie"></i>
                Estadísticas e IA
            </button>
        </nav>`;

const newNav = `        <!-- TAB NAVIGATION -->
        <div class="bg-[#1a2942] rounded-2xl p-2 border border-[#2d3f5e] shadow-lg mb-8 max-w-max overflow-hidden hide-scrollbar">
            <nav class="flex space-x-2 overflow-x-auto hide-scrollbar">
                <button onclick="switchTab('periodo1')" id="tab-periodo1" class="tab-btn px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 flex-shrink-0 bg-brand-600 text-white shadow-md shadow-brand-500/30 border border-transparent">
                    1° Periodo
                </button>
                <button onclick="switchTab('periodo2')" id="tab-periodo2" class="tab-btn px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex-shrink-0 bg-transparent text-slate-400 hover:text-white hover:bg-[#2d3f5e] border border-transparent">
                    2° Periodo
                </button>
                <button onclick="switchTab('periodo3')" id="tab-periodo3" class="tab-btn px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex-shrink-0 bg-transparent text-slate-400 hover:text-white hover:bg-[#2d3f5e] border border-transparent">
                    3° Periodo
                </button>
                <button onclick="switchTab('consolidado')" id="tab-consolidado" class="tab-btn px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex-shrink-0 bg-transparent text-slate-400 hover:text-white hover:bg-[#2d3f5e] border border-transparent">
                    Consolidado <span class="consolidado-year-lbl">2026</span>
                </button>
                <button onclick="switchTab('analisis')" id="tab-analisis" class="tab-btn px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex-shrink-0 bg-transparent text-slate-400 hover:text-cyan-400 hover:bg-[#2d3f5e] flex items-center gap-2 border border-transparent">
                    <i class="fa-solid fa-chart-pie"></i> Estadísticas e IA
                </button>
            </nav>
        </div>`;

doReplace('Nav', oldNav, newNav);

// 4. Period View Container Header
doReplace('Period View Header',
`<div class="flex items-center justify-between border-b border-[#2d3f5e] pb-3">
                    <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                        <span id="period-badge" class="bg-brand-100 text-brand-700 px-3 py-1 text-xs font-bold uppercase rounded-full self-start sm:self-auto">Primer Periodo</span>
                        <h2 class="text-lg font-bold text-slate-100">
                            Control Calificador: <span id="current-info-title" class="text-brand-600 font-extrabold">2026 - 7° Grado - LENGUAJE Y LITERATURA</span>
                        </h2>
                    </div>
                    <button onclick="openAddStudentModal()" class="bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95 px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 shadow-md">
                        <i class="fa-solid fa-user-plus"></i>
                        Agregar Alumno
                    </button>
                </div>`,
`<div class="flex flex-col md:flex-row md:items-center justify-between bg-[#1a2942] p-5 rounded-2xl border border-[#2d3f5e] shadow-lg mb-6">
                    <div class="flex flex-col sm:flex-row sm:items-center gap-3">
                        <span id="period-badge" class="bg-brand-500/20 text-brand-300 px-3 py-1 text-xs font-bold uppercase rounded-full self-start sm:self-auto border border-brand-500/30">Primer Periodo</span>
                        <h2 class="text-xl font-bold text-slate-100">
                            Control Calificador: <span id="current-info-title" class="text-brand-400 font-extrabold">2026 - 7° Grado - LENGUAJE Y LITERATURA</span>
                        </h2>
                    </div>
                    <button onclick="openAddStudentModal()" class="bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5 mt-4 md:mt-0">
                        <i class="fa-solid fa-user-plus"></i>
                        Agregar Alumno
                    </button>
                </div>`);

// 5. Table Container
doReplace('Table Container Open',
`                <!-- Scrollable Table Wrapper -->
                <div class="table-container overflow-x-auto rounded-xl border border-[#2d3f5e] shadow-inner bg-[#1a2942]">`,
`                <!-- Scrollable Table Wrapper -->
                <div class="bg-[#1a2942] rounded-2xl shadow-lg border border-[#2d3f5e] p-2 mb-8">
                <div class="table-container overflow-x-auto rounded-xl shadow-inner bg-[#142138]">`);

doReplace('Table Container Close',
`                    </table>
                </div>

                <!-- PANEL DE CRITERIOS DE EVALUACIÓN -->`,
`                    </table>
                </div>
                </div>

                <!-- PANEL DE CRITERIOS DE EVALUACIÓN -->`);

// 6. Criterios
const oldCrit = `                <!-- PANEL DE CRITERIOS DE EVALUACIÓN -->
                <div class="bg-[#1a2942]/90 rounded-2xl p-5 border border-[#2d3f5e] shadow-lg mt-6">
                    <div class="flex items-center gap-2 border-b border-[#2d3f5e] pb-3 mb-4">
                        <div class="text-brand-600 text-lg bg-brand-50 p-2 rounded-lg">
                            <i class="fa-solid fa-list-check"></i>
                        </div>
                        <div>
                            <h3 class="text-sm font-bold text-slate-100">Criterios de Evaluación y Distribución de Puntaje</h3>
                            <p class="text-[11px] text-slate-400 font-medium">Detalle de las actividades y criterios aplicados en los periodos escolares</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs text-slate-300" id="criteria-distribution-panel">
                        <!-- Actividad 1 -->
                        <div class="space-y-3 bg-blue-50/20 p-4 rounded-xl border border-blue-100/50">
                            <h4 class="font-bold text-blue-900 flex justify-between items-center border-b border-blue-100 pb-2">
                                <span class="flex items-center gap-1.5"><i class="fa-solid fa-users-viewfinder text-blue-700"></i>Actividad N° 1 - Integradora (35%)</span>
                                <span class="bg-blue-100/80 text-blue-800 px-2 py-0.5 rounded-full text-[10px] font-bold">Total: 10 Puntos</span>
                            </h4>
                            <ul class="space-y-2 font-semibold">
                                <li class="flex justify-between items-center text-slate-200"><span>U1 a U8: Calificación de Unidades de la 1 a la 8</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Nota: 0.0 - 10.0</span></li>
                                <li class="flex justify-between items-center text-slate-400 text-[11px] italic">La nota final de la Actividad 1 se obtiene promediando las calificaciones de las 8 unidades.</li>
                            </ul>
                        </div>
                        <!-- Actividad 2 -->
                        <div class="space-y-3 bg-emerald-50/20 p-4 rounded-xl border border-emerald-100/50">
                            <h4 class="font-bold text-emerald-900 flex justify-between items-center border-b border-emerald-100 pb-2">
                                <span class="flex items-center gap-1.5"><i class="fa-solid fa-book-reader text-emerald-700"></i>Actividad N° 2 - Cotidianas (35%)</span>
                                <span class="bg-emerald-100/80 text-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-bold">Total: 10 Puntos</span>
                            </h4>
                            <ul class="space-y-2 font-semibold">
                                <li class="flex justify-between items-center text-slate-200"><span>C1: Clases completas en orden</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>C2: Cumplimiento de tareas asignadas</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>C3: Ortografía correcta</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-800 font-extrabold text-[10px]">Max: 1.5 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>C4: Letra legible en el cuaderno</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-800 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>C5: Orden y aseo general del cuaderno y escuela</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>C6: Participación proactiva en clase</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-800 font-extrabold text-[10px]">Max: 1.5 pt</span></li>
                            </ul>
                        </div>
                    </div>
                </div>`;

const newCrit = `                <!-- PANEL DE CRITERIOS DE EVALUACIÓN -->
                <div class="bg-[#1a2942] rounded-2xl p-6 border border-[#2d3f5e] shadow-lg mb-8">
                    <div class="flex items-center gap-3 border-b border-[#2d3f5e]/60 pb-4 mb-6">
                        <div class="text-brand-400 text-xl bg-brand-500/10 p-2.5 rounded-xl border border-brand-500/20">
                            <i class="fa-solid fa-list-check"></i>
                        </div>
                        <div>
                            <h3 class="text-base font-bold text-slate-100">Criterios de Evaluación y Distribución de Puntaje</h3>
                            <p class="text-xs text-slate-400 font-medium">Detalle oficial de actividades aplicadas en cada periodo escolar</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs text-slate-300" id="criteria-distribution-panel">
                        <!-- Actividad 1 -->
                        <div class="space-y-3 bg-[#142138] p-5 rounded-2xl border border-[#2d3f5e] shadow-inner">
                            <h4 class="font-bold text-blue-400 flex justify-between items-center border-b border-[#2d3f5e] pb-3 mb-3">
                                <span class="flex items-center gap-2"><i class="fa-solid fa-users-viewfinder text-blue-500 text-lg"></i> Actividad Integradora (35%)</span>
                                <span class="bg-blue-500/20 text-blue-300 px-2.5 py-1 rounded-lg text-[10px] font-bold border border-blue-500/30">Max: 10 Pts</span>
                            </h4>
                            <ul class="space-y-3 font-medium">
                                <li class="flex justify-between items-center text-slate-300">
                                    <span class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Promedio de Unidades</span> 
                                    <span class="bg-[#1a2942] px-2 py-1 rounded-md border border-[#2d3f5e] text-blue-400 font-bold text-[10px]">10.0 pt</span>
                                </li>
                                <li class="text-slate-500 text-[11px] italic mt-2 bg-black/10 p-3 rounded-lg border border-black/20">La nota se obtiene promediando las calificaciones de las unidades 1 a la 8.</li>
                            </ul>
                        </div>
                        <!-- Actividad 2 -->
                        <div class="space-y-3 bg-[#142138] p-5 rounded-2xl border border-[#2d3f5e] shadow-inner">
                            <h4 class="font-bold text-emerald-400 flex justify-between items-center border-b border-[#2d3f5e] pb-3 mb-3">
                                <span class="flex items-center gap-2"><i class="fa-solid fa-book-reader text-emerald-500 text-lg"></i> Actividades Cotidianas (35%)</span>
                                <span class="bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-lg text-[10px] font-bold border border-emerald-500/30">Max: 10 Pts</span>
                            </h4>
                            <ul class="space-y-2.5 font-medium">
                                <li class="flex justify-between items-center text-slate-300"><span class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> C1: Clases en orden</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded-md border border-[#2d3f5e] text-emerald-400 font-bold text-[10px]">2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-300"><span class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> C2: Tareas asignadas</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded-md border border-[#2d3f5e] text-emerald-400 font-bold text-[10px]">2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-300"><span class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> C3: Ortografía</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded-md border border-[#2d3f5e] text-emerald-400 font-bold text-[10px]">1.5 pt</span></li>
                                <li class="flex justify-between items-center text-slate-300"><span class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> C4: Letra legible</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded-md border border-[#2d3f5e] text-emerald-400 font-bold text-[10px]">1.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-300"><span class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> C5: Orden y aseo</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded-md border border-[#2d3f5e] text-emerald-400 font-bold text-[10px]">2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-300"><span class="flex items-center gap-2"><div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> C6: Participación</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded-md border border-[#2d3f5e] text-emerald-400 font-bold text-[10px]">1.5 pt</span></li>
                            </ul>
                        </div>
                    </div>
                </div>`;

doReplace('Criterios', oldCrit, newCrit);

// 7. Consolidado Header
const oldConsHead = `                <div class="flex items-center justify-between border-b border-[#2d3f5e] pb-3">
                    <div class="flex flex-col sm:flex-row sm:items-center gap-2">
                        <span class="bg-violet-100 text-violet-700 px-3 py-1 text-xs font-bold uppercase rounded-full">Consolidado Final</span>
                        <h2 class="text-lg font-bold text-slate-100">
                            Promedio General Anual <span class="consolidado-year-lbl">2026</span> - <span id="consolidado-info-title" class="text-violet-700 font-extrabold">LENGUAJE Y LITERATURA</span>
                        </h2>
                    </div>
                </div>`;

const newConsHead = `                <div class="bg-[#1a2942] rounded-2xl p-6 border border-[#2d3f5e] shadow-lg mb-8">
                    <div class="flex flex-col md:flex-row md:items-center justify-between mb-6 border-b border-[#2d3f5e]/60 pb-5">
                        <div class="flex items-center gap-3">
                            <div class="bg-violet-500/20 text-violet-400 p-3 rounded-xl border border-violet-500/30">
                                <i class="fa-solid fa-award text-2xl"></i>
                            </div>
                            <div>
                                <h2 class="text-xl font-bold text-slate-100">
                                    Promedio General Anual <span class="consolidado-year-lbl">2026</span>
                                </h2>
                                <p class="text-sm text-slate-400 font-medium mt-1">Asignatura: <span id="consolidado-info-title" class="text-violet-400 font-extrabold">LENGUAJE Y LITERATURA</span></p>
                            </div>
                        </div>
                        <span class="bg-violet-500/20 text-violet-300 px-4 py-2 text-xs font-bold uppercase rounded-lg border border-violet-500/30 self-start md:self-auto mt-4 md:mt-0">Consolidado Final</span>
                    </div>`;
                    
doReplace('Consolidado Header', oldConsHead, newConsHead);

// 8. Consolidado Table Wrapper
const oldConsTable = `                <div class="table-container overflow-x-auto rounded-xl border border-[#2d3f5e] bg-[#1a2942]">
                    <table class="w-full text-left border-collapse text-xs">`;

const newConsTable = `                    <div class="bg-[#142138] rounded-2xl border border-[#2d3f5e] p-2 shadow-inner overflow-hidden">
                        <div class="table-container overflow-x-auto rounded-xl">
                            <table class="w-full text-left border-collapse text-xs">`;

doReplace('Consolidado Table wrapper', oldConsTable, newConsTable);

doReplace('Consolidado Table close',
`                        </tbody>
                    </table>
                </div>
            </div>

            <!-- ANALYTICS DASHBOARD VIEW -->`,
`                        </tbody>
                    </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ANALYTICS DASHBOARD VIEW -->`);

// Colors fix
html = html.replace(/bg-blue-50\/50/g, 'bg-blue-900/40 text-blue-300 border-[#2d3f5e]');
html = html.replace(/bg-emerald-50\/50/g, 'bg-emerald-900/40 text-emerald-300 border-[#2d3f5e]');
html = html.replace(/bg-amber-50\/50/g, 'bg-amber-900/40 text-amber-300 border-[#2d3f5e]');
html = html.replace(/bg-violet-50/g, 'bg-violet-900/40 text-violet-300 border-[#2d3f5e]');
html = html.replace(/bg-blue-50\/20/g, 'bg-[#142138] text-blue-200');
html = html.replace(/bg-emerald-50\/20/g, 'bg-[#142138] text-emerald-200');
html = html.replace(/bg-amber-50\/20/g, 'bg-[#142138] text-amber-200');
html = html.replace(/bg-blue-100\/70/g, 'bg-blue-900/60');
html = html.replace(/text-blue-800/g, 'text-blue-300');
html = html.replace(/bg-emerald-100\/70/g, 'bg-emerald-900/60');
html = html.replace(/text-emerald-800/g, 'text-emerald-300');
html = html.replace(/bg-amber-100\/70/g, 'bg-amber-900/60');
html = html.replace(/text-amber-800/g, 'text-amber-300');


fs.writeFileSync('notas.html', html);
console.log('HTML restructured safely!');
