


function updateHeaderDate() {
  const dateEl = document.getElementById('header-date-display');
  const sidebarDateEl = document.getElementById('sidebar-date');
  const d = new Date();
  const str = d.toLocaleDateString('es-ES', { weekday:'long', month:'long', day:'numeric' });
  const formatted = str.charAt(0).toUpperCase() + str.slice(1);
  if (dateEl) dateEl.innerText = '📅 ' + formatted;
  if (sidebarDateEl) sidebarDateEl.innerText = formatted;
}
updateHeaderDate();
setInterval(updateHeaderDate, 60000);

// --- FIREBASE SYNC (MIGRADO A DB EXPANDIBLE) ---
async function syncToFirebase() {
    if(!db) { updateDbStatus('offline', 'Sin Conexión'); return; }
    updateDbStatus('syncing', 'Sincronizando...');
    try {
        const dbKey = getDbKey();
        const schoolId = '66083';
        const docRef = db.collection('schools').doc(schoolId)
            .collection('years').doc(currentYear)
            .collection('grade_subjects').doc(dbKey);
            
        await docRef.set({
            students: database[dbKey] || [],
            last_updated: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        updateDbStatus('connected', 'Sincronizado');
    } catch(e) {
        console.error("Error guardando a Firebase", e);
        updateDbStatus('error', 'Error al Guardar');
    }
}

async function fetchOfficialRoster(year, grade) {
    if(!db) return [];
    try {
        const schoolId = '66083';
        const docRef = db.collection('schools').doc(schoolId)
            .collection('years').doc(year)
            .collection('enrollment').doc(grade);
        const snap = await docRef.get();
        if (snap.exists && snap.data().students) {
            return snap.data().students;
        }
    } catch(e) { console.error("Error fetching roster", e); }
    return [];
}

// Data State
let activeTab = 'periodo1';
let currentYear = '2026';
let currentGrade = '7° Grado'; // Ajustado a la nomenclatura de Matrícula
let currentSubject = 'LENGUAJE Y LITERATURA';

let database = {};

let headerData = {
    school: "CANTON PATAMERA",
    teacher: "Marvin Norberto Galvez"
};

let distChartInstance = null;
let lineChartInstance = null;

// Initialize App (Async to allow DB fetching before render)
window.addEventListener('DOMContentLoaded', async () => {
    loadHeaderFromStorage();
    await loadDatabaseFromStorage();
    updateUILabel();
    renderActiveTab();
});

function getDbKey() {
    return `${currentYear}_${currentGrade}_${currentSubject}`;
}

function migrateStudentStructure(dbKey) {
    if (Array.isArray(database[dbKey])) {
        database[dbKey] = database[dbKey].map(st => {
            ['p1', 'p2', 'p3'].forEach((pKey, pIdx) => {
                const uKey = `u${pIdx + 1}`;
                if (!st[pKey]) {
                    if (st[uKey]) {
                        st[pKey] = JSON.parse(JSON.stringify(st[uKey]));
                    } else {
                        st[pKey] = { a1: Array(7).fill(0), a2: Array(6).fill(0), a3_nota: 0 };
                    }
                }
                
                if (!st[pKey].a1 || st[pKey].a1.length !== 7) {
                    const oldA1 = st[pKey].a1 || [];
                    st[pKey].a1 = Array(7).fill(0);
                    for (let i = 0; i < Math.min(oldA1.length, 7); i++) {
                        st[pKey].a1[i] = oldA1[i];
                    }
                }
                
                if (!st[pKey].a2 || st[pKey].a2.length < 6) {
                    const oldA2 = st[pKey].a2 || [];
                    st[pKey].a2 = Array(6).fill(0);
                    for (let i = 0; i < Math.min(oldA2.length, 6); i++) {
                        st[pKey].a2[i] = oldA2[i];
                    }
                }
            });
            return st;
        });
    }
}

async function loadDatabaseFromStorage() {
    const dbKey = getDbKey();
    const schoolId = '66083';
    
    updateDbStatus('syncing', 'Descargando notas...');
    try {
        if(db) {
            const docRef = db.collection('schools').doc(schoolId)
                .collection('years').doc(currentYear)
                .collection('grade_subjects').doc(dbKey);
                
            const snap = await docRef.get();
            if(snap.exists) {
                database[dbKey] = snap.data().students;
                updateDbStatus('connected', 'Sincronizado');
                migrateStudentStructure(dbKey);
                return;
            }
        }
    } catch(e) { console.error(e); }
    
    // Si no existe en Firebase, buscar en localStorage (Cache/Legacy)
    const data = localStorage.getItem('school_notes_full_progression_db');
    if (data) {
        let legacyDB = JSON.parse(data);
        if (legacyDB[dbKey]) {
            database[dbKey] = legacyDB[dbKey];
            migrateStudentStructure(dbKey);
            updateDbStatus('offline', 'Cargado Local');
            // Como esto era offline, forzamos un push a la nueva estructura expandible
            syncToFirebase();
            return;
        }
    }
    
    // Si no está en ningun lado, inicializar usando el Roster oficial de Matrícula
    await initializeKeyData(dbKey);
    updateDbStatus('connected', 'Sincronizado');
}


async function syncWithMatricula() {
    const dbKey = getDbKey();
    updateDbStatus('syncing', 'Sincronizando con Matrícula...');
    const officialList = await fetchOfficialRoster(currentYear, currentGrade);
    
    if (officialList.length === 0) {
        showToast("No se encontraron alumnos en Matrícula para este grado.", "fa-triangle-exclamation", "text-amber-400");
        updateDbStatus('connected', 'Sincronizado');
        return;
    }

    let localList = database[dbKey] || [];
    let addedCount = 0;

    officialList.forEach(offSt => {
        // Check if student already exists by NIE or Name
        const exists = localList.find(st => (st.nie && offSt.nie && st.nie === offSt.nie) || st.name.toUpperCase() === offSt.name.toUpperCase());
        if (!exists) {
            let newObj = createStudentObject(offSt.name);
            newObj.nie = offSt.nie;
            localList.push(newObj);
            addedCount++;
        }
    });

    if (addedCount > 0) {
        // Sort students alphabetically by name to match Matricula
        localList.sort((a, b) => a.name.localeCompare(b.name));
        database[dbKey] = localList;
        saveToLocalStorage(); // automatically syncs to Firebase
        renderActiveTab();
        showToast(`Se agregaron ${addedCount} alumno(s) nuevo(s) al listado.`, 'fa-circle-check', 'text-emerald-400');
    } else {
        showToast(`El listado ya está actualizado. No hay alumnos nuevos.`, 'fa-circle-info', 'text-blue-400');
        updateDbStatus('connected', 'Sincronizado');
    }
}

async function initializeKeyData(dbKey) {
    updateDbStatus('syncing', 'Obteniendo Matrícula...');
    const officialList = await fetchOfficialRoster(currentYear, currentGrade);
    
    if (officialList.length === 0) {
        console.warn("No hay estudiantes matriculados en", currentYear, currentGrade);
        database[dbKey] = [];
    } else {
        database[dbKey] = officialList.map(st => {
            let obj = createStudentObject(st.name);
            obj.nie = st.nie;
            return obj;
        });
    }
    
    // Guardar inmediatamente en localStorage y en la nueva base expandible
    saveToLocalStorage();
}

function loadHeaderFromStorage() {
    const savedHeader = localStorage.getItem('school_notes_header_full_progression');
    if (savedHeader) {
        headerData = JSON.parse(savedHeader);
        document.getElementById('header-school').value = headerData.school;
        document.getElementById('header-teacher').value = headerData.teacher;
    }
    
    const savedYear = localStorage.getItem('school_notes_active_year_full');
    if (savedYear) {
        currentYear = savedYear;
        document.getElementById('header-year').value = currentYear;
    }
    
    const savedGrade = localStorage.getItem('school_notes_active_grade_full');
    if (savedGrade) {
        currentGrade = savedGrade;
        document.getElementById('header-grade').value = currentGrade;
    }
    
    const savedSubject = localStorage.getItem('school_notes_active_subject_full');
    if (savedSubject) {
        currentSubject = savedSubject;
        document.getElementById('header-subject').value = currentSubject;
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    const urlKey = urlParams.get('apiKey') || urlParams.get('key');
    if (urlKey) {
        localStorage.setItem('gemini_api_key', urlKey);
    }
    
    let savedKey = localStorage.getItem('gemini_api_key');
    if (!savedKey) {
        savedKey = "AIzaSyC3-cBlQ7nJwJ6xKydE_c-cIhOFns-nIAo";
        localStorage.setItem('gemini_api_key', savedKey);
    }
    if (savedKey) {
        setTimeout(() => {
            const modalKey = document.getElementById('modal-gemini-api-key-input');
            const dashKey = document.getElementById('dashboard-gemini-api-key-input');
            if (modalKey) modalKey.value = savedKey;
            if (dashKey) dashKey.value = savedKey;
        }, 100);
    }
}

function saveGeminiKey(val) {
    localStorage.setItem('gemini_api_key', val.trim());
    const modalKey = document.getElementById('modal-gemini-api-key-input');
    const dashKey = document.getElementById('dashboard-gemini-api-key-input');
    if (modalKey) modalKey.value = val.trim();
    if (dashKey) dashKey.value = val.trim();
}

function autoSaveHeader() {
    headerData.school = document.getElementById('header-school').value;
    headerData.teacher = document.getElementById('header-teacher').value;
    localStorage.setItem('school_notes_header_full_progression', JSON.stringify(headerData));
}

function updateUILabel() {
    const labelStr = `${currentYear} - ${currentGrade} - ${currentSubject}`;
    document.getElementById('current-info-title').innerText = labelStr;
    document.getElementById('consolidado-info-title').innerText = currentSubject;
    
    document.querySelectorAll('.consolidado-year-lbl').forEach(el => {
        el.innerText = currentYear;
    });

    updateCriteriaPanel();
}

// Function updateCriteriaPanel() se mantiene igual
// Vamos a reinsertar la lógica original pero acortada para mantener el archivo limpio.
// Oh wait, I am replacing a huge chunk that included updateCriteriaPanel(). I MUST keep it.

function updateCriteriaPanel() {
            const panel = document.getElementById('criteria-distribution-panel');
            if (!panel) return;
            
            // Define titles for the table column headers
            const headerTitles = {
                'LENGUAJE Y LITERATURA': [
                    "C1: Comprensión de Contenidos (Máx. 2.0 pt)",
                    "C2: Compleatitud del Trabajo (Máx. 2.0 pt)",
                    "C3: Argumentación y Calidad (Máx. 1.5 pt)",
                    "C4: Ortografía y Redacción (Máx. 1.5 pt)",
                    "C5: Orden y Limpieza (Máx. 1.0 pt)",
                    "C6: Seguimiento de Indicaciones (Máx. 1.0 pt)",
                    "C7: Puntualidad en la Entrega (Máx. 1.0 pt)"
                ],
                'MATEMATICA': [
                    "C1: Comprensión de Contenidos (Máx. 2.0 pt)",
                    "C2: Compleatitud del Trabajo (Máx. 2.0 pt)",
                    "C3: Procesos Completos (Máx. 1.5 pt)",
                    "C4: Seguimiento de Indicaciones (Máx. 1.5 pt)",
                    "C5: Orden y Limpieza (Máx. 1.0 pt)",
                    "C6: Responsabilidad y Constancia (Máx. 1.0 pt)",
                    "C7: Puntualidad en la Entrega (Máx. 1.0 pt)"
                ],
                'CIENCIA Y TECNOLOGIA': [
                    "C1: Fase de Indagación (Anotación de Observaciones) (Máx. 2.0 pt)",
                    "C2: Fase de Creatividad (Tablas de Datos y Mediciones) (Máx. 2.0 pt)",
                    "C3: Análisis Científico (Cálculos y Fórmulas) (Máx. 2.0 pt)",
                    "C4: Fase de Comunicación (Diagramas y Gráficas) (Máx. 1.0 pt)",
                    "C5: Uso de Vocabulario y Simbología (Máx. 1.0 pt)",
                    "C6: Orden y Secuencia Semanal (Máx. 1.0 pt)",
                    "C7: Limpieza y Presentación del Material (Máx. 1.0 pt)"
                ],
                'CIUDADANIA Y VALORES': [
                    "C1: Honestidad Académica (Máx. 2.0 pt)",
                    "C2: Constancia y Esfuerzo Diario (Máx. 2.0 pt)",
                    "C3: Cuidado y Conservación del Recurso (Máx. 2.0 pt)",
                    "C4: Disciplina en el Contenido (Máx. 1.0 pt)",
                    "C5: Cortesía en la Presentación (Máx. 1.0 pt)",
                    "C6: Seguimiento de Indicaciones (Máx. 1.0 pt)",
                    "C7: Responsabilidad en la Entrega (Máx. 1.0 pt)"
                ],
                'INGLES': [
                    "C1: Estructura Gramatical y Sintaxis (Máx. 2.0 pt)",
                    "C2: Uso de Formas Verbales (Máx. 2.0 pt)",
                    "C3: Comprensión Auditiva y Escrita (Máx. 2.0 pt)",
                    "C4: Producción de Textos Cortos (Máx. 1.0 pt)",
                    "C5: Reglas de Puntuación y Mayúsculas (Máx. 1.0 pt)",
                    "C6: Clasificación y Vocabulario (Máx. 1.0 pt)",
                    "C7: Puntualidad y Entrega Completa (Máx. 1.0 pt)"
                ],
                'EDUCACION DE FISICA': [
                    "C1: Habilidades Motrices y Coordinación (Máx. 2.0 pt)",
                    "C2: Condición Física y Resistencia (Máx. 2.0 pt)",
                    "C3: Trabajo en Equipo y Cooperación (Máx. 2.0 pt)",
                    "C4: Higiene y Hábitos de Salud (Máx. 1.0 pt)",
                    "C5: Aceptación de Normas y Fair Play (Máx. 1.0 pt)",
                    "C6: Esfuerzo y Superación Personal (Máx. 1.0 pt)",
                    "C7: Puntualidad y Asistencia (Máx. 1.0 pt)"
                ],
                'MORAL, URBANIDAD Y CIVICA': [
                    "C1: Práctica de Valores de Convivencia (Máx. 2.0 pt)",
                    "C2: Hábitos de Urbanidad y Cortesía (Máx. 2.0 pt)",
                    "C3: Conciencia y Respeto Ciudadano (Máx. 2.0 pt)",
                    "C4: Sentido de Responsabilidad y Deber (Máx. 1.0 pt)",
                    "C5: Cuidado del Entorno Común (Máx. 1.0 pt)",
                    "C6: Resolución Pacífica de Conflictos (Máx. 1.0 pt)",
                    "C7: Puntualidad y Asistencia (Máx. 1.0 pt)"
                ],
                'default': [
                    "C1: Criterio 1 (Máx. 2.0 pt)",
                    "C2: Criterio 2 (Máx. 2.0 pt)",
                    "C3: Criterio 3 (Máx. 1.5 pt)",
                    "C4: Criterio 4 (Máx. 1.5 pt)",
                    "C5: Criterio 5 (Máx. 1.0 pt)",
                    "C6: Criterio 6 (Máx. 1.0 pt)",
                    "C7: Criterio 7 (Máx. 1.0 pt)"
                ]
            };

            const headerTitles2 = {
                'MATEMATICA': [
                    "C1: Apuntes Completos (Máx. 2.0 pt)",
                    "C2: Procesos Matemáticos (Máx. 2.0 pt)",
                    "C3: Corrección de Errores (Máx. 2.0 pt)",
                    "C4: Orden y Limpieza (Máx. 1.0 pt)",
                    "C5: Uso de Simbología (Máx. 1.0 pt)",
                    "C6: Responsabilidad y Entrega (Máx. 2.0 pt)"
                ],
                'EDUCACION DE FISICA': [
                    "C1: Participación y Entusiasmo (Máx. 2.0 pt)",
                    "C2: Esfuerzo y Progreso Motriz (Máx. 2.0 pt)",
                    "C3: Compañerismo y Cooperación (Máx. 2.0 pt)",
                    "C4: Respeto a las Reglas (Máx. 1.0 pt)",
                    "C5: Hábitos de Higiene y Salud (Máx. 1.0 pt)",
                    "C6: Portación del Uniforme (Máx. 2.0 pt)"
                ],
                'MORAL, URBANIDAD Y CIVICA': [
                    "C1: Participación y Trabajo en Aula (Máx. 2.0 pt)",
                    "C2: Uso de Normas de Cortesía Social (Máx. 2.0 pt)",
                    "C3: Convivencia Pacífica y Tolerancia (Máx. 2.0 pt)",
                    "C4: Cumplimiento del Deber Cotidiano (Máx. 1.0 pt)",
                    "C5: Cuidado de Bienes Comunes (Máx. 1.0 pt)",
                    "C6: Puntualidad y Orden en el Aula (Máx. 2.0 pt)"
                ],
                'default': [
                    "C1: Clases completas en orden (Máx. 2.0 pt)",
                    "C2: Cumplimiento de tareas asignadas (Máx. 2.0 pt)",
                    "C3: Ortografía correcta (Máx. 1.5 pt)",
                    "C4: Letra legible en el cuaderno (Máx. 1.0 pt)",
                    "C5: Orden y aseo general del cuaderno y escuela (Máx. 2.0 pt)",
                    "C6: Participación proactiva en clase (Máx. 1.5 pt)"
                ]
            };

            const titles = headerTitles[currentSubject] || headerTitles['default'];
            for (let i = 1; i <= 7; i++) {
                const el = document.getElementById(`a1-c${i}-hdr`);
                if (el) el.title = titles[i - 1];
            }

            const titles2 = headerTitles2[currentSubject] || headerTitles2['default'];
            for (let i = 1; i <= 6; i++) {
                const el = document.getElementById(`a2-c${i}-hdr`);
                if (el) el.title = titles2[i - 1];
            }
            
            if (currentSubject === 'LENGUAJE Y LITERATURA') {
                panel.innerHTML = `
                        <!-- Actividad 1 -->
                        <div class="space-y-3 bg-blue-50/20 p-4 rounded-xl border border-blue-100/50">
                            <h4 class="font-bold text-blue-900 flex justify-between items-center border-b border-blue-100 pb-2">
                                <span class="flex items-center gap-1.5"><i class="fa-solid fa-users-viewfinder text-blue-700"></i>Actividad N° 1 - Integradora (35%)</span>
                                <span class="bg-blue-100/80 text-blue-800 px-2 py-0.5 rounded-full text-[10px] font-bold">Total: 10 Puntos</span>
                            </h4>
                            <ul class="space-y-2 font-semibold">
                                <li class="flex justify-between items-center text-slate-200"><span>1. Comprensión de Contenidos: Demuestra dominio/temas</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>2. Compleatitud del Trabajo: 100% ejercicios libro</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>3. Argumentación y Calidad: Respuestas claras</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 1.5 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>4. Ortografía y Redacción: Reglas ortográficas</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 1.5 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>5. Orden y Limpieza: Libro limpio/letra legible</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>6. Seguimiento de Indicaciones: Acata instrucciones</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>7. Puntualidad en la Entrega: Fecha/hora acordada</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
                            </ul>
                        </div>
                        <!-- Actividad 2 -->
                        <div class="space-y-3 bg-emerald-50/20 p-4 rounded-xl border border-emerald-100/50">
                            <h4 class="font-bold text-emerald-900 flex justify-between items-center border-b border-emerald-100 pb-2">
                                <span class="flex items-center gap-1.5"><i class="fa-solid fa-book-reader text-emerald-700"></i>Actividad N° 2 - Cotidianas (35%)</span>
                                <span class="bg-emerald-100/80 text-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-bold">Total: 10 Puntos</span>
                            </h4>
                            <ul class="space-y-2 font-semibold">
                                <li class="flex justify-between items-center text-slate-200"><span>1. Trabajo en Clase y Participación: Dinámicas</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>2. Evidencias en el Cuaderno: Apuntes al día</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>3. Laboratorios y Cortos: Pruebas de lectura</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>4. Resolución de Guías: Guías complementarias</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-800 font-extrabold text-[10px]">Max: 1.5 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>5. Ortografía y Caligrafía: Esmero por mejorar</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-800 font-extrabold text-[10px]">Max: 1.5 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>6. Responsabilidad y Puntualidad: Fechas establecidas</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-800 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
                            </ul>
                        </div>
                `;
            } else if (currentSubject === 'MATEMATICA') {
                panel.innerHTML = `
                        <!-- Actividad 1 -->
                        <div class="space-y-3 bg-blue-50/20 p-4 rounded-xl border border-blue-100/50">
                            <h4 class="font-bold text-blue-900 flex justify-between items-center border-b border-blue-100 pb-2">
                                <span class="flex items-center gap-1.5"><i class="fa-solid fa-users-viewfinder text-blue-700"></i>Actividad N° 1 - Integradora (35%)</span>
                                <span class="bg-blue-100/80 text-blue-800 px-2 py-0.5 rounded-full text-[10px] font-bold">Total: 10 Puntos</span>
                            </h4>
                            <ul class="space-y-2 font-semibold">
                                <li class="flex justify-between items-center text-slate-200"><span>1. Comprensión de Contenidos: Demuestra dominio de los temas y conceptos</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>2. Compleatitud del Trabajo: 100% de ejercicios libro/cuaderno</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>3. Procesos Completos: Deja constancia de procedimientos</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 1.5 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>4. Seguimiento de Indicaciones: Acata instrucciones/Esmate</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 1.5 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>5. Orden y Limpieza: Libros limpios/buen uso de espacio</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>6. Responsabilidad y Constancia: Ritmo de trabajo diario</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>7. Puntualidad en la Entrega: Entrega en fecha y hora</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
                            </ul>
                        </div>
                        <!-- Actividad 2 -->
                        <div class="space-y-3 bg-emerald-50/20 p-4 rounded-xl border border-emerald-100/50">
                            <h4 class="font-bold text-emerald-900 flex justify-between items-center border-b border-emerald-100 pb-2">
                                <span class="flex items-center gap-1.5"><i class="fa-solid fa-book-reader text-emerald-700"></i>Actividad N° 2 - Cotidianas (35%)</span>
                                <span class="bg-emerald-100/80 text-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-bold">Total: 10 Puntos</span>
                            </h4>
                            <ul class="space-y-2 font-semibold">
                                <li class="flex justify-between items-center text-slate-200"><span>C1: Apuntes Completos: Problemas iniciales, soluciones y conclusiones</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>C2: Procesos Matemáticos: Desarrollo paso a paso de operaciones</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>C3: Corrección de Errores: Revisa y corrige ejercicios con la pizarra</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>C4: Orden y Limpieza: Cuaderno ordenado, regla para rectas, sin manchones</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-800 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>C5: Uso de Simbología: Signos, variables y símbolos correctos</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-800 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>C6: Responsabilidad y Entrega: Cuaderno al día en revisiones</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                            </ul>
                        </div>
                `;
            } else if (currentSubject === 'CIENCIA Y TECNOLOGIA') {
                panel.innerHTML = `
                        <!-- Actividad 1 -->
                        <div class="space-y-3 bg-blue-50/20 p-4 rounded-xl border border-blue-100/50">
                            <h4 class="font-bold text-blue-900 flex justify-between items-center border-b border-blue-100 pb-2">
                                <span class="flex items-center gap-1.5"><i class="fa-solid fa-users-viewfinder text-blue-700"></i>Actividad N° 1 - Integradora (35%)</span>
                                <span class="bg-blue-100/80 text-blue-800 px-2 py-0.5 rounded-full text-[10px] font-bold">Total: 10 Puntos</span>
                            </h4>
                            <ul class="space-y-2 font-semibold">
                                <li class="flex justify-between items-center text-slate-200"><span>1. Fase de Indagación (Anotación de Observaciones): Registra observaciones iniciales, hipótesis...</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>2. Fase de Creatividad (Tablas de Datos y Mediciones): Completa tablas de recolección de datos...</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>3. Análisis Científico (Cálculos y Fórmulas): Desarrolla paso a paso aplicando fórmulas...</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>4. Fase de Comunicación (Diagramas y Gráficas): Esquemas, vectores, perfiles, mapas...</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>5. Uso de Vocabulario y Simbología: Términos, notación, símbolos, unidades SI</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>6. Orden y Secuencia Semanal: Al día, estructura correlativa de semanas</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>7. Limpieza y Presentación del Material: Libros limpios, legibles, sin hojas dañadas</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
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
                `;
            } else if (currentSubject === 'CIUDADANIA Y VALORES') {
                panel.innerHTML = `
                        <!-- Actividad 1 -->
                        <div class="space-y-3 bg-blue-50/20 p-4 rounded-xl border border-blue-100/50">
                            <h4 class="font-bold text-blue-900 flex justify-between items-center border-b border-blue-100 pb-2">
                                <span class="flex items-center gap-1.5"><i class="fa-solid fa-users-viewfinder text-blue-700"></i>Actividad N° 1 - Integradora (35%)</span>
                                <span class="bg-blue-100/80 text-blue-800 px-2 py-0.5 rounded-full text-[10px] font-bold">Total: 10 Puntos</span>
                            </h4>
                            <ul class="space-y-2 font-semibold">
                                <li class="flex justify-between items-center text-slate-200"><span>1. Honestidad Académica: Resuelve con transparencia y esfuerzo propio</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>2. Constancia y Esfuerzo Diario: Libro al día clase por clase</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>3. Cuidado y Conservación del Recurso: Libro forrado, limpio y completo</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>4. Disciplina en el Contenido: Trabajo ordenado siguiendo secuencia</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>5. Cortesía en la Presentación: Sin drawings inapropiados ni manchones</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>6. Seguimiento de Instrucciones: Respeta momentos metodológicos del libro</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>7. Responsabilidad en la Entrega: Listo para revisión de manera puntual</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
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
                `;
            } else if (currentSubject === 'INGLES') {
                panel.innerHTML = `
                        <!-- Actividad 1 -->
                        <div class="space-y-3 bg-blue-50/20 p-4 rounded-xl border border-blue-100/50">
                            <h4 class="font-bold text-blue-900 flex justify-between items-center border-b border-blue-100 pb-2">
                                <span class="flex items-center gap-1.5"><i class="fa-solid fa-users-viewfinder text-blue-700"></i>Actividad N° 1 - Integradora (35%)</span>
                                <span class="bg-blue-100/80 text-blue-800 px-2 py-0.5 rounded-full text-[10px] font-bold">Total: 10 Puntos</span>
                            </h4>
                            <ul class="space-y-2 font-semibold">
                                <li class="flex justify-between items-center text-slate-200"><span>1. Estructura Gramatical y Sintaxis: Ordena palabras Simple Past/Present Perfect</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>2. Uso de Formas Verbales: Escribe pasado/participio de verbos regulares/irregulares</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>3. Comprensión Auditiva y Escrita: Oraciones completas basadas en audios</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>4. Producción de Textos Cortos: Redacta anécdotas, historias o descripciones breves</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>5. Reglas de Puntuación y Mayúsculas: Mayúsculas y signos de puntuación</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>6. Clasificación y Vocabulario: Empareja palabras con definiciones o categorías</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>7. Puntualidad y Entrega Completa: Hojas de trabajo resueltas, orden y limpieza</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
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
                `;
            } else if (currentSubject === 'EDUCACION DE FISICA') {
                panel.innerHTML = `
                        <!-- Actividad 1 -->
                        <div class="space-y-3 bg-blue-50/20 p-4 rounded-xl border border-blue-100/50">
                            <h4 class="font-bold text-blue-900 flex justify-between items-center border-b border-blue-100 pb-2">
                                <span class="flex items-center gap-1.5"><i class="fa-solid fa-users-viewfinder text-blue-700"></i>Actividad N° 1 - Integradora (35%)</span>
                                <span class="bg-blue-100/80 text-blue-800 px-2 py-0.5 rounded-full text-[10px] font-bold">Total: 10 Puntos</span>
                            </h4>
                            <ul class="space-y-2 font-semibold">
                                <li class="flex justify-between items-center text-slate-200"><span>1. Habilidades Motrices y Coordinación: Movimientos, desplazamientos, saltos y giros</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>2. Condición Física y Resistencia: Ejercicios de fuerza, velocidad, flexibilidad y resistencia</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>3. Trabajo en Equipo y Cooperación: Juegos colectivos, compañerismo y apoyo mutuo</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>4. Higiene y Hábitos de Salud: Uso de ropa adecuada, hidratación y aseo personal</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>5. Aceptación de Normas y Fair Play: Respeta reglas y decisiones arbitrales/docente</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>6. Esfuerzo y Superación Personal: Perseverancia e iniciativa por mejorar capacidades</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>7. Puntualidad y Asistencia: Integración a tiempo con uniforme oficial</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
                            </ul>
                        </div>
                        <!-- Actividad 2 -->
                        <div class="space-y-3 bg-emerald-50/20 p-4 rounded-xl border border-emerald-100/50">
                            <h4 class="font-bold text-emerald-900 flex justify-between items-center border-b border-emerald-100 pb-2">
                                <span class="flex items-center gap-1.5"><i class="fa-solid fa-book-reader text-emerald-700"></i>Actividad N° 2 - Cotidianas (35%)</span>
                                <span class="bg-emerald-100/80 text-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-bold">Total: 10 Puntos</span>
                            </h4>
                            <ul class="space-y-2 font-semibold">
                                <li class="flex justify-between items-center text-slate-200"><span>C1: Participación y Entusiasmo: Se integra con disposición, dinamismo y energía</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>C2: Esfuerzo y Progreso Motriz: Iniciativa por mejorar sus habilidades físicas</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>C3: Compañerismo y Cooperación: Colabora y se comunica positivamente en equipo</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>C4: Respeto a las Reglas: Principios del juego limpio (Fair Play) y normas</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-800 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>C5: Hábitos de Higiene y Salud: Termo con agua para hidratación y ropa adecuada</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-800 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>C6: Portación del Uniforme: Uso oficial del uniforme escolar para las clases</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                            </ul>
                        </div>
                `;
            } else if (currentSubject === 'MORAL, URBANIDAD Y CIVICA') {
                panel.innerHTML = `
                        <!-- Actividad 1 -->
                        <div class="space-y-3 bg-blue-50/20 p-4 rounded-xl border border-blue-100/50">
                            <h4 class="font-bold text-blue-900 flex justify-between items-center border-b border-blue-100 pb-2">
                                <span class="flex items-center gap-1.5"><i class="fa-solid fa-users-viewfinder text-blue-700"></i>Actividad N° 1 - Integradora (35%)</span>
                                <span class="bg-blue-100/80 text-blue-800 px-2 py-0.5 rounded-full text-[10px] font-bold">Total: 10 Puntos</span>
                            </h4>
                            <ul class="space-y-2 font-semibold">
                                <li class="flex justify-between items-center text-slate-200"><span>1. Práctica de Valores de Convivencia: Respeto, tolerancia, empatía y solidaridad</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>2. Hábitos de Urbanidad y Cortesía: Saludar, pedir permiso, gracias y respeto</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>3. Conciencia y Respeto Ciudadano: Símbolos patrios, derechos y valores democráticos</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>4. Sentido de Responsabilidad y Deber: Consecuencias de acciones e iniciativas</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>5. Cuidado del Entorno Común: Conservación, limpieza y orden del aula y mobiliario</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>6. Resolución Pacífica de Conflictos: Diálogo, cortesía y mediación entre compañeros</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>7. Puntualidad y Asistencia: Actos cívicos y respeto al tiempo de los demás</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-blue-800 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
                            </ul>
                        </div>
                        <!-- Actividad 2 -->
                        <div class="space-y-3 bg-emerald-50/20 p-4 rounded-xl border border-emerald-100/50">
                            <h4 class="font-bold text-emerald-900 flex justify-between items-center border-b border-emerald-100 pb-2">
                                <span class="flex items-center gap-1.5"><i class="fa-solid fa-book-reader text-emerald-700"></i>Actividad N° 2 - Cotidianas (35%)</span>
                                <span class="bg-emerald-100/80 text-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-bold">Total: 10 Puntos</span>
                            </h4>
                            <ul class="space-y-2 font-semibold">
                                <li class="flex justify-between items-center text-slate-200"><span>C1: Participación y Trabajo en Aula: Colabora en reflexiones y dinámicas</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>C2: Uso de Normas de Cortesía Social: Saludo, agradecimiento, respeto a otros</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>C3: Convivencia Pacífica y Tolerancia: Resuelve desacuerdos mediante diálogo</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>C4: Cumplimiento del Deber Cotidiano: Responsabilidad en tareas diarias</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-800 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>C5: Cuidado de Bienes Comunes: Limpieza de pupitre, cuida el mobiliario</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-800 font-extrabold text-[10px]">Max: 1.0 pt</span></li>
                                <li class="flex justify-between items-center text-slate-200"><span>C6: Puntualidad y Orden en el Aula: Atiende indicaciones de forma disciplinada</span> <span class="bg-[#1a2942] px-2 py-0.5 rounded border text-emerald-800 font-extrabold text-[10px]">Max: 2.0 pt</span></li>
                            </ul>
                        </div>
                `;
            } else {
                panel.innerHTML = `
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
                `;
            }
        }

// Async Switch Handlers
async function changeYear() {
    currentYear = document.getElementById('header-year').value;
    localStorage.setItem('school_notes_active_year_full', currentYear);
    await loadDatabaseFromStorage();
    updateUILabel();
    renderActiveTab();
    showToast(`Cambiado al Año Lectivo ${currentYear}`, 'fa-circle-check', 'text-brand-400');
}

async function changeGrade() {
    currentGrade = document.getElementById('header-grade').value;
    localStorage.setItem('school_notes_active_grade_full', currentGrade);
    await loadDatabaseFromStorage();
    updateUILabel();
    renderActiveTab();
    showToast(`Cargado ${currentGrade} con éxito`, 'fa-circle-check', 'text-brand-400');
}

async function changeSubject() {
    currentSubject = document.getElementById('header-subject').value;
    localStorage.setItem('school_notes_active_subject_full', currentSubject);
    await loadDatabaseFromStorage();
    updateUILabel();
    renderActiveTab();
    showToast(`Cargado asignatura ${currentSubject}`, 'fa-circle-check', 'text-brand-400');
}

function createStudentObject(name) {
    return {
        id: Date.now() + Math.random().toString(36).substr(2, 9),
        name: name.toUpperCase(),
        p1: { a1: Array(7).fill(0), a2: Array(6).fill(0), a3_nota: 0 },
        p2: { a1: Array(7).fill(0), a2: Array(6).fill(0), a3_nota: 0 },
        p3: { a1: Array(7).fill(0), a2: Array(6).fill(0), a3_nota: 0 }
    };
}

function saveToLocalStorage() {
    syncToFirebase();
    localStorage.setItem('school_notes_full_progression_db', JSON.stringify(database));
}

function saveAllData(manual = false) {
    saveToLocalStorage();
    if (manual) {
        showToast(`Notas guardadas con éxito`, "fa-circle-check", "text-emerald-400");
    }
}

        // Switch active tab view
        function switchTab(tabId) {
            activeTab = tabId;
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('text-brand-400', 'border-brand-400', 'font-bold'); btn.classList.add('border-transparent');
                btn.classList.add('text-slate-400', 'hover:text-slate-200', 'hover:border-slate-500', 'font-semibold');
            });
            const activeBtn = document.getElementById(`tab-${tabId}`);
            activeBtn.classList.remove('text-slate-400', 'hover:text-slate-200', 'hover:border-slate-500', 'font-semibold', 'border-transparent');
            activeBtn.classList.add('text-brand-400', 'border-brand-400', 'font-bold');

            renderActiveTab();
        }

        // Dynamic rendering based on active views
        function renderActiveTab() {
            const periodView = document.getElementById('period-view');
            const consolidadoView = document.getElementById('consolidado-view');
            const analisisView = document.getElementById('analisis-view');

            if (activeTab === 'consolidado') {
                periodView.classList.add('hidden');
                consolidadoView.classList.remove('hidden');
                analisisView.classList.add('hidden');
                renderConsolidado();
            } else if (activeTab === 'analisis') {
                periodView.classList.add('hidden');
                consolidadoView.classList.add('hidden');
                analisisView.classList.remove('hidden');
                renderAnalyticsDashboard();
            } else {
                periodView.classList.remove('hidden');
                consolidadoView.classList.add('hidden');
                analisisView.classList.add('hidden');
                
                let periodName = "";
                if (activeTab === 'periodo1') periodName = "Primer Periodo";
                else if (activeTab === 'periodo2') periodName = "Segundo Periodo";
                else if (activeTab === 'periodo3') periodName = "Tercer Periodo";
                
                document.getElementById('period-badge').innerText = periodName;
                renderPeriodTable();
            }
        }

        // Helper: Calculate grade for student & period/unit key
        function getTrimestralValue(student, pKey) {
            // Map keys
            if (pKey === 'periodo1') pKey = 'p1';
            if (pKey === 'periodo2') pKey = 'p2';
            if (pKey === 'periodo3') pKey = 'p3';

            const pData = student[pKey];
            if (!pData) return 0;
            
            // Act 1: Integradora 35% - sum of 7 criteria
            const act1Total = pData.a1.reduce((a, b) => a + b, 0);
            const act1Prom = act1Total * 0.35;

            // Act 2: Cotidianas 35% - sum of 6 criteria
            const act2Total = pData.a2.reduce((a, b) => a + b, 0);
            const act2Prom = act2Total * 0.35;

            // Act 3: Prueba Objetiva 30%
            const act3Nota = pData.a3_nota || 0;
            const act3Prom = act3Nota * 0.30;

            return act1Prom + act2Prom + act3Prom;
        }

        // Autocomplete suggestions for AI student search
        function suggestStudents(query) {
            const suggestionsDiv = document.getElementById('ai-suggestions');
            if (!query.trim()) {
                suggestionsDiv.innerHTML = '';
                suggestionsDiv.classList.add('hidden');
                return;
            }

            const dbKey = getDbKey();
            const list = database[dbKey] || [];
            const filtered = list.filter(st => st.name.toUpperCase().includes(query.toUpperCase()));

            if (filtered.length === 0) {
                suggestionsDiv.innerHTML = '<div class="p-2 text-slate-400">No se encontraron alumnos</div>';
            } else {
                suggestionsDiv.innerHTML = filtered.map(st => `
                    <div onclick="selectStudentForAI('${st.name}')" class="p-2 hover:bg-[#1a2942]/20 cursor-pointer border-b border-white/5 last:border-0">
                        ${st.name}
                    </div>
                `).join('');
            }
            suggestionsDiv.classList.remove('hidden');
        }

        // Select item in suggestions list
        function selectStudentForAI(name) {
            document.getElementById('ai-student-search').value = name;
            document.getElementById('ai-suggestions').classList.add('hidden');
            runStudentAIAnalysis();
        }

        // Helper function to call real Gemini API
        async function callGeminiAPI(studentName, gradesSummaryText) {
            const apiKey = localStorage.getItem('gemini_api_key');
            if (!apiKey) return null;
            
            const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
            const prompt = `Analiza el rendimiento escolar del alumno/a "${studentName}" en el grado "${currentGrade}" en la materia "${currentSubject}" para el año ${currentYear}.
Aquí tienes las calificaciones del alumno (escala de 0.0 a 10.0, la nota mínima aprobatoria es 5.0):
${gradesSummaryText}

Genera un análisis pedagógico profesional y empático en español.
El resultado debe ser un objeto JSON estrictamente formateado de la siguiente manera:
{
  "trend": "MEJORA NOTABLE", // puede ser: "EXCELENTE", "SATISFACTORIO", "ESTABLE", "MEJORA NOTABLE", "EN DECLIVE" o "ALERTA CRITICA" (agrega un emoji opcional)
  "diagnostico": "Texto detallado sobre el diagnóstico de notas y foco evaluativo...",
  "recomendacion": "Texto con recomendaciones pedagógicas clave para el docente y padres..."
}
Devuelve SOLAMENTE el objeto JSON, sin formato markdown extra ni explicaciones.`;

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                        generationConfig: { responseMimeType: "application/json" }
                    })
                });
                
                if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
                const data = await response.json();
                let text = data.candidates[0].content.parts[0].text.trim();
                if (text.startsWith("```json")) {
                    text = text.substring(7);
                }
                if (text.endsWith("```")) {
                    text = text.substring(0, text.length - 3);
                }
                return JSON.parse(text.trim());
            } catch (err) {
                console.error("Gemini API Error:", err);
                return null;
            }
        }

        // Run Student pedagogical AI analysis dynamically
        async function runStudentAIAnalysis() {
            const nameInput = document.getElementById('ai-student-search');
            const studentName = nameInput.value.trim().toUpperCase();
            
            const dbKey = getDbKey();
            const list = database[dbKey] || [];
            const student = list.find(s => s.name.toUpperCase() === studentName);

            const blankState = document.getElementById('ai-blank-state');
            const resultsDiv = document.getElementById('ai-results');

            if (!student) {
                showToast("Por favor selecciona un alumno válido de la lista", "fa-circle-xmark", "text-rose-400");
                return;
            }

            blankState.classList.add('hidden');
            resultsDiv.classList.remove('hidden');

            // 1. Gather scores
            let periodScoresHtml = "";
            const p1Grade = getTrimestralValue(student, 'p1');
            const p2Grade = getTrimestralValue(student, 'p2');
            const p3Grade = getTrimestralValue(student, 'p3');
            
            periodScoresHtml += `<li>1° Periodo: <span class="font-bold text-white">${p1Grade.toFixed(1)}</span></li>`;
            periodScoresHtml += `<li>2° Periodo: <span class="font-bold text-white">${p2Grade.toFixed(1)}</span></li>`;
            periodScoresHtml += `<li>3° Periodo: <span class="font-bold text-white">${p3Grade.toFixed(1)}</span></li>`;
            
            const prom = (p1Grade + p2Grade + p3Grade) / 3;

            document.getElementById('ai-student-header-name').innerText = student.name;
            document.getElementById('ai-score-units-list').innerHTML = periodScoresHtml;
            document.getElementById('ai-score-final').innerText = prom.toFixed(1);

            // Check if API Key is available to perform real Gemini analysis
            const apiKey = localStorage.getItem('gemini_api_key');
            if (apiKey && apiKey.length > 10) {
                document.getElementById('ai-student-trend').innerText = "PROCESANDO... 🤖";
                document.getElementById('ai-student-trend').className = "px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-indigo-600 text-white animate-pulse";
                document.getElementById('ai-score-breakdown').innerHTML = `<p class="leading-relaxed text-slate-400 italic">Llamando a la IA real de Gemini para generar diagnóstico personalizado...</p>`;
                document.getElementById('ai-recommendation').innerText = "Generando recomendaciones...";

                const gradesSummary = `Materia: ${currentSubject}\n- 1° Periodo: ${p1Grade.toFixed(1)}\n- 2° Periodo: ${p2Grade.toFixed(1)}\n- 3° Periodo: ${p3Grade.toFixed(1)}\n- Promedio Final: ${prom.toFixed(1)}`;
                
                const aiResult = await callGeminiAPI(student.name, gradesSummary);
                if (aiResult) {
                    document.getElementById('ai-student-trend').innerText = aiResult.trend.toUpperCase();
                    document.getElementById('ai-student-trend').className = "px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-cyan-600 text-white";
                    document.getElementById('ai-score-breakdown').innerHTML = `<p class="leading-relaxed">${aiResult.diagnostico}</p>`;
                    document.getElementById('ai-recommendation').innerText = aiResult.recommendation;
                    return;
                } else {
                    showToast("Error en API Key. Usando diagnóstico simulado local.", "fa-circle-exclamation", "text-amber-400");
                }
            }

            // 2. Trend assessment
            let trend = "ESTABLE";
            let trendColor = "bg-brand-500 text-white";
            let lastScores = [p1Grade, p2Grade, p3Grade];
            let nonZeroScores = lastScores.filter(s => s > 0);
            if (nonZeroScores.length >= 3) {
                const sz = nonZeroScores.length;
                const last = nonZeroScores[sz - 1];
                const prev = nonZeroScores[sz - 2];
                const pprev = nonZeroScores[sz - 3];
                if (last > prev && prev > pprev) {
                    trend = "MEJORA NOTABLE 📈";
                    trendColor = "bg-emerald-500 text-white";
                } else if (pprev > prev && prev > last) {
                    trend = "EN DECLIVE 📉";
                    trendColor = "bg-rose-500 text-white";
                }
            }
            document.getElementById('ai-student-trend').innerText = trend;
            document.getElementById('ai-student-trend').className = `px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${trendColor}`;

            // 3. Score breakdown checks (Integradora, Cotidianas, Pruebas)
            let activePeriodsCount = 0;
            let sumInt = 0, sumCot = 0, sumTest = 0;
            ['p1', 'p2', 'p3'].forEach(pKey => {
                const p = student[pKey];
                if (p) {
                    const act1Total = p.a1.reduce((a, b) => a + b, 0);
                    const int = act1Total * 0.35;
                    const cot = p.a2.reduce((a,b)=>a+b, 0) * 0.35;
                    const test = p.a3_nota * 0.30;
                    if ((int + cot + test) > 0) {
                        sumInt += int;
                        sumCot += cot;
                        sumTest += test;
                        activePeriodsCount++;
                    }
                }
            });

            const avgInt = activePeriodsCount > 0 ? (sumInt / activePeriodsCount) : 0;
            const avgCot = activePeriodsCount > 0 ? (sumCot / activePeriodsCount) : 0;
            const avgTest = activePeriodsCount > 0 ? (sumTest / activePeriodsCount) : 0;

            // Render breakdown description
            let focusDesc = "";
            if (avgCot < 1.5 && avgTest > 2.0) {
                focusDesc = "⚠️ El alumno tiene buen desempeño en las pruebas objetivas (exámenes), pero está perdiendo valiosos puntos en Actividades Cotidianas (tareas, cuadernos). Le cuesta ser constante con los deberes diarios.";
            } else if (avgTest < 1.2 && avgCot > 2.5) {
                focusDesc = "⚠️ El alumno trabaja excelente en sus actividades cotidianas e integradoras del aula, pero muestra un rendimiento significativamente bajo en la Prueba Objetiva (exámenes trimestrales), lo cual sugiere nerviosismo o falta de asimilación bajo presión.";
            } else if (prom >= 8.5) {
                focusDesc = "⭐ Desempeño sobresaliente y sumamente equilibrado en todas las áreas de evaluación. Demuestra una alta disciplina, participación activa y dominio conceptual de la asignatura.";
            } else if (prom < 6.0) {
                focusDesc = "🚨 Presenta deficiencias generales en todas las áreas. No está alcanzando los puntajes mínimos en actividades integradoras ni pruebas escritas.";
            } else {
                focusDesc = "✔️ Rendimiento promedio y regular. Presenta regularidad en la entrega de tareas y en sus exámenes de periodo sin variaciones extremas en su desempeño.";
            }
            document.getElementById('ai-score-breakdown').innerHTML = `<p class="leading-relaxed">${focusDesc}</p>`;

            // 4. Personalized AI Recommendation
            let recommendation = "";
            if (prom >= 8.5) {
                recommendation = "Recomendar al alumno como monitor/tutor para apoyar a los compañeros con dificultades en la materia. Impulsar su participación en certámenes escolares y proyectos avanzados de investigación.";
            } else if (avgCot < 1.5 && avgTest > 2.0) {
                recommendation = "Establecer una libreta de control diario de tareas firmada por el docente y el tutor en casa. Brindar 5 minutos al final de cada clase para verificar que haya anotado correctamente la agenda y las actividades cotidianas.";
            } else if (avgTest < 1.2 && avgCot > 2.5) {
                recommendation = "Aplicar técnicas de manejo de ansiedad frente a pruebas y guías de estudio previas estructuradas por cuestionarios de repaso. Considerar evaluar de forma oral o complementaria para constatar el aprendizaje real.";
            } else if (prom < 6.0) {
                recommendation = "Programar de forma prioritaria tutorías de nivelación individualizada. Acordar con los padres un horario diario de estudio en casa y proponer una guía de recuperación para solventar los vacíos acumulados de los periodos anteriores.";
            } else {
                recommendation = "Continuar el monitoreo periódico en clases. Fortalecer el hábito de lectura autónoma y repasar los temas más complejos antes de las pruebas objetivas de cierre.";
            }
            document.getElementById('ai-recommendation').innerText = recommendation;
        }

        // Render Period Table
        function renderPeriodTable() {
            const tbody = document.getElementById('student-rows');
            tbody.innerHTML = '';

            const dbKey = getDbKey();
            const list = database[dbKey] || [];
            
            if (list.length === 0) {
                tbody.innerHTML = `<tr><td colspan="22" class="p-8 text-center text-slate-400 font-semibold"><i class="fa-regular fa-folder-open text-3xl mb-2 block"></i>No hay alumnos agregados en este grado. Haz clic en "Agregar Alumno" para empezar.</td></tr>`;
                return;
            }

            const pKey = activeTab === 'periodo1' ? 'p1' : (activeTab === 'periodo2' ? 'p2' : 'p3');

            list.forEach((student, sIdx) => {
                const tr = document.createElement('tr');
                tr.className = "hover:bg-[#0c1a30] border-b border-[#23324d] transition-colors font-medium";
                
                const pData = student[pKey];

                // Act 1 Criterios (Sum of C1..C7)
                const act1Criterios = pData.a1;
                const act1Total = act1Criterios.reduce((a, b) => a + b, 0);
                const act1Prom = act1Total * 0.35;

                // Act 2 Criterios (Sum of C1..C6)
                const act2Criterios = pData.a2;
                const act2Total = act2Criterios.reduce((a, b) => a + b, 0);
                const act2Prom = act2Total * 0.35;

                // Act 3 (Prueba Objetiva)
                const act3Nota = pData.a3_nota || 0;
                const act3Prom = act3Nota * 0.30;

                // Nota Trimestral final
                const notaTrimestral = act1Prom + act2Prom + act3Prom;

                let rowHtml = `
                    <td class="p-3 border-r border-[#2d3f5e] sticky left-0 bg-[#1a2942]/95 font-semibold text-slate-50 border-b border-[#23324d] text-xs">
                        ${student.name}
                    </td>
                `;

                // Build Act1 Criterios columns
                act1Criterios.forEach((cVal, cIdx) => {
                    rowHtml += `
                        <td class="p-1 border-r border-[#2d3f5e] text-center bg-blue-50/10">
                            <input type="number" step="any" min="0" max="10" value="${cVal || 0}" 
                                onchange="updateNote('${student.id}', '${pKey}', 'a1', ${cIdx}, this.value)"
                                class="w-10 text-center bg-transparent border-b border-dashed border-[#3f567a] focus:border-brand-500 focus:outline-none py-0.5 text-xs font-semibold">
                        </td>
                    `;
                });

                // Act1 Total and Prom columns (read-only)
                rowHtml += `
                    <td class="p-1 border-r border-[#2d3f5e] text-center font-bold bg-[#142138] text-slate-100 select-all select-none">
                        ${act1Total.toFixed(2)}
                    </td>
                    <td class="p-1 border-r border-[#2d3f5e] text-center font-bold bg-blue-100/70 text-blue-800">
                        ${act1Prom.toFixed(2)}
                    </td>
                `;

                // Build Act2 Criterios columns
                act2Criterios.forEach((cVal, cIdx) => {
                    rowHtml += `
                        <td class="p-1 border-r border-[#2d3f5e] text-center bg-emerald-50/10">
                            <input type="number" step="any" min="0" max="10" value="${cVal || 0}" 
                                onchange="updateNote('${student.id}', '${pKey}', 'a2', ${cIdx}, this.value)"
                                class="w-10 text-center bg-transparent border-b border-dashed border-[#3f567a] focus:border-brand-500 focus:outline-none py-0.5 text-xs font-semibold">
                        </td>
                    `;
                });

                // Act2 Total and Prom columns (read-only)
                rowHtml += `
                    <td class="p-1 border-r border-[#2d3f5e] text-center font-bold bg-[#142138] text-slate-100 select-none">
                        ${act2Total.toFixed(2)}
                    </td>
                    <td class="p-1 border-r border-[#2d3f5e] text-center font-bold bg-emerald-100/70 text-emerald-800">
                        ${act2Prom.toFixed(2)}
                    </td>
                `;

                // Build Act3 column inputs
                rowHtml += `
                    <td class="p-1 border-r border-[#2d3f5e] text-center bg-amber-50/10">
                        <input type="number" step="any" min="0" max="10" value="${act3Nota || 0}" 
                            onchange="updateNote3('${student.id}', '${pKey}', this.value)"
                            class="w-12 text-center bg-transparent border-b border-dashed border-[#3f567a] focus:border-brand-500 focus:outline-none py-0.5 text-xs font-bold text-slate-100">
                    </td>
                    <td class="p-1 border-r border-[#2d3f5e] text-center font-bold bg-amber-100/70 text-amber-800">
                        ${act3Prom.toFixed(2)}
                    </td>
                `;

                // Note Trimestral final Column
                rowHtml += `
                    <td class="p-1 border-r border-[#2d3f5e] text-center font-bold bg-violet-100 text-violet-950 text-sm">
                        ${notaTrimestral.toFixed(1)}
                    </td>
                    <td class="p-1 text-center">
                        <button onclick="deleteStudent('${student.id}')" class="text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-1.5 rounded-lg active:scale-90 transition-all" title="Eliminar Alumno">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </td>
                `;

                tr.innerHTML = rowHtml;
                tbody.appendChild(tr);
            });
        }

        // Render Consolidado
        // Render Consolidado
        function renderConsolidado() {
            const tbody = document.getElementById('consolidado-rows');
            tbody.innerHTML = '';

            const dbKey = getDbKey();
            const list = database[dbKey] || [];
            
            if (list.length === 0) {
                tbody.innerHTML = `<tr><td colspan="5" class="p-8 text-center text-slate-400 font-semibold"><i class="fa-regular fa-folder-open text-3xl mb-2 block"></i>No hay alumnos registrados en este grado.</td></tr>`;
                return;
            }

            list.forEach(student => {
                const tr = document.createElement('tr');
                tr.className = "hover:bg-[#0c1a30] border-b border-[#23324d] transition-colors font-medium";

                const p1Grade = getTrimestralValue(student, 'p1');
                const p2Grade = getTrimestralValue(student, 'p2');
                const p3Grade = getTrimestralValue(student, 'p3');

                const promedioAnual = (p1Grade + p2Grade + p3Grade) / 3;
                const badgeColor = promedioAnual >= 6.0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800';

                tr.innerHTML = `
                    <td class="p-3 border-r border-[#2d3f5e] font-semibold text-slate-50 text-xs">${student.name}</td>
                    <td class="p-3 border-r border-[#2d3f5e] text-center bg-[#0c1a30] text-slate-100 font-semibold text-sm">${p1Grade.toFixed(1)}</td>
                    <td class="p-3 border-r border-[#2d3f5e] text-center bg-[#0c1a30] text-slate-100 font-semibold text-sm">${p2Grade.toFixed(1)}</td>
                    <td class="p-3 border-r border-[#2d3f5e] text-center bg-[#0c1a30] text-slate-100 font-semibold text-sm">${p3Grade.toFixed(1)}</td>
                    <td class="p-3 text-center bg-violet-100/70 border-b border-violet-200">
                        <span class="px-2.5 py-0.5 rounded-full font-bold text-xs ${badgeColor}">
                            ${promedioAnual.toFixed(1)}
                        </span>
                    </td>
                `;

                tbody.appendChild(tr);
            });
        }

        // Render analytics Dashboard & calculate student progress metrics
        function renderAnalyticsDashboard() {
            // Reset AI card search box on load
            document.getElementById('ai-student-search').value = '';
            document.getElementById('ai-blank-state').classList.remove('hidden');
            document.getElementById('ai-results').classList.add('hidden');

            const dbKey = getDbKey();
            const list = database[dbKey] || [];
            
            if (list.length === 0) {
                document.getElementById('kpi-avg').innerText = "0.0";
                document.getElementById('kpi-pass-rate').innerText = "0%";
                document.getElementById('kpi-risk').innerText = "0";
                document.getElementById('kpi-max').innerText = "0.0";
                document.getElementById('risk-students-list').innerHTML = `<li class="p-4 text-center text-slate-400">Sin alumnos registrados.</li>`;
                document.getElementById('pedagogical-tips').innerText = "Agrega alumnos y notas para poder analizar su progreso.";
                return;
            }

            let sumAnual = 0;
            let approvedCount = 0;
            let riskCount = 0;
            let maxGrade = 0;
            let riskListHTML = '';
            
            // To store sum of grades for each of the 3 periods across all students
            let periodSums = Array(3).fill(0);

            // Distribution metrics ranges
            let ranges = {
                deficient: 0, // < 4.0
                regular: 0,    // 4.0 - 5.9
                good: 0,       // 6.0 - 8.0
                excellent: 0   // 8.1 - 10
            };

            list.forEach(student => {
                const p1Grade = getTrimestralValue(student, 'p1');
                const p2Grade = getTrimestralValue(student, 'p2');
                const p3Grade = getTrimestralValue(student, 'p3');
                
                const promAnual = (p1Grade + p2Grade + p3Grade) / 3;
                sumAnual += promAnual;

                periodSums[0] += p1Grade;
                periodSums[1] += p2Grade;
                periodSums[2] += p3Grade;

                if (promAnual > maxGrade) maxGrade = promAnual;
                if (promAnual >= 5.0) approvedCount++;
                if (promAnual < 5.0) {
                    riskCount++;
                    riskListHTML += `
                        <li class="flex justify-between items-center py-2 border-b border-rose-100 last:border-0">
                            <span><i class="fa-solid fa-user-xmark text-rose-500 mr-2"></i>${student.name}</span>
                            <span class="text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full font-bold">${promediosFormateados(promAnual)}</span>
                        </li>
                    `;
                }

                // Categorize for chart distribution
                if (promAnual < 4.0) ranges.deficient++;
                else if (promAnual < 5.0) ranges.regular++;
                else if (promAnual < 8.1) ranges.good++;
                else ranges.excellent++;
            });

            const overallAvg = sumAnual / list.length;
            const passRate = (approvedCount / list.length) * 100;

            // Update KPI views
            document.getElementById('kpi-avg').innerText = overallAvg.toFixed(1);
            document.getElementById('kpi-pass-rate').innerText = `${passRate.toFixed(0)}%`;
            document.getElementById('kpi-risk').innerText = riskCount;
            document.getElementById('kpi-max').innerText = maxGrade.toFixed(1);

            // Populate risks list
            if (riskCount === 0) {
                document.getElementById('risk-students-list').innerHTML = `
                    <li class="p-4 text-center text-emerald-600 bg-emerald-50 rounded-lg">
                        <i class="fa-solid fa-circle-check text-2xl mb-1 block"></i>
                        ¡Felicidades! Todos los alumnos de la sección están aprobados.
                    </li>`;
            } else {
                document.getElementById('risk-students-list').innerHTML = riskListHTML;
            }

            // Create automatic recommendations feedback text
            let feedback = "";
            if (overallAvg < 6.0) {
                feedback = `⚠️ El promedio general de la materia está por debajo de la nota mínima aprobatoria (${overallAvg.toFixed(1)}). Se recomienda diseñar urgentemente un plan de nivelación o tutorías de refuerzo en los contenidos evaluados durante los periodos con menor rendimiento.`;
            } else if (overallAvg < 7.5) {
                feedback = `💡 La sección muestra un rendimiento regular con un promedio de ${overallAvg.toFixed(1)}. Un total de ${riskCount} estudiante(s) se encuentra en estado de reprobación. Es conveniente asignar talleres o trabajos cotidianos adicionales para ayudarles a consolidar los aprendizajes clave antes de finalizar el trimestre.`;
            } else {
                feedback = `🎉 Excelente rendimiento general en la materia. El promedio general es sobresaliente (${overallAvg.toFixed(1)}) con una tasa de aprobación del ${passRate.toFixed(0)}%. Se recomienda motivar al grupo a mantener la constancia y proponer actividades de ampliación o retos intelectuales a los alumnos más aventajados.`;
            }
            document.getElementById('pedagogical-tips').innerText = feedback;

            // Helper format
            function promediosFormateados(n) { return n.toFixed(1); }

            // Destruct and Render charts
            renderCharts(ranges, periodSums.map(s => s / list.length));
        }

        // Render Charts using Chart.js
        function renderCharts(rangesData, periodsData) {
            // 1. Rendimiento Distribution Chart
            if (distChartInstance) distChartInstance.destroy();
            const ctx1 = document.getElementById('distributionChart').getContext('2d');
            distChartInstance = new Chart(ctx1, {
                type: 'bar',
                data: {
                    labels: ['Deficiente (<4.0)', 'Regular (4.0-5.9)', 'Bueno (6.0-8.0)', 'Excelente (8.1-10)'],
                    datasets: [{
                        label: 'Número de Alumnos',
                        data: [rangesData.deficient, rangesData.regular, rangesData.good, rangesData.excellent],
                        backgroundColor: ['#f43f5e', '#fb923c', '#3b82f6', '#10b981'],
                        borderRadius: 6,
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: { precision: 0 }
                        }
                    }
                }
            });

            // 2. Period averages comparisons line chart
            if (lineChartInstance) lineChartInstance.destroy();
            const ctx2 = document.getElementById('periodComparisonChart').getContext('2d');
            lineChartInstance = new Chart(ctx2, {
                type: 'line',
                data: {
                    labels: ['1° Periodo', '2° Periodo', '3° Periodo'],
                    datasets: [{
                        label: 'Promedio de la Sección',
                        data: periodsData, // this is now the array of 3 averages
                        borderColor: '#6366f1',
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        tension: 0.3,
                        fill: true,
                        borderWidth: 3,
                        pointBackgroundColor: '#4f46e5',
                        pointRadius: 5
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            min: 0,
                            max: 10,
                            ticks: { stepSize: 1 }
                        }
                    }
                }
            });
        }

        // Update values in criteria (A1, A2) and trigger auto-calculations
        function updateNote(studentId, pKey, actKey, cIdx, val) {
            let parsedVal = parseFloat(val);
            if (isNaN(parsedVal) || parsedVal < 0) parsedVal = 0;
            if (parsedVal > 10) {
                parsedVal = 10;
                showToast("La nota máxima por criterio es 10", "fa-triangle-exclamation", "text-amber-500");
            }

            const dbKey = getDbKey();
            const list = database[dbKey] || [];
            const student = list.find(s => s.id === studentId);
            if (student) {
                student[pKey][actKey][cIdx] = parsedVal;
                
                // Let's validate that the sum of criteria (TOTAL) doesn't exceed 10.
                if (actKey === 'a2') {
                    const criteriaSum = student[pKey][actKey].reduce((a, b) => a + b, 0);
                    if (criteriaSum > 10) {
                        showToast("Atención: La suma acumulada de los criterios supera la nota máxima de 10", "fa-triangle-exclamation", "text-amber-500");
                    }
                }
                
                saveToLocalStorage();
                renderPeriodTable();
            }
        }

        // Update Act 3 Note
        function updateNote3(studentId, pKey, val) {
            let parsedVal = parseFloat(val);
            if (isNaN(parsedVal) || parsedVal < 0) parsedVal = 0;
            if (parsedVal > 10) {
                parsedVal = 10;
                showToast("La nota máxima permitida es 10", "fa-triangle-exclamation", "text-amber-500");
            }

            const dbKey = getDbKey();
            const list = database[dbKey] || [];
            const student = list.find(s => s.id === studentId);
            if (student) {
                student[pKey].a3_nota = parsedVal;
                saveToLocalStorage();
                renderPeriodTable();
            }
        }

        // Add Student Modal Helpers
        function openAddStudentModal() {
            document.getElementById('new-student-name').value = '';
            const modal = document.getElementById('student-modal');
            modal.classList.remove('hidden');
            setTimeout(() => {
                document.getElementById('modal-container').classList.remove('scale-95');
                document.getElementById('new-student-name').focus();
            }, 10);
        }

        function closeAddStudentModal() {
            document.getElementById('modal-container').classList.add('scale-95');
            setTimeout(() => {
                document.getElementById('student-modal').classList.add('hidden');
            }, 150);
        }

        function addStudent() {
            const nameInput = document.getElementById('new-student-name');
            const name = nameInput.value.trim().toUpperCase();
            
            if (name === '') {
                showToast("El nombre del alumno no puede estar vacío", "fa-circle-xmark", "text-rose-400");
                return;
            }

            const dbKey = getDbKey();
            if (!database[dbKey]) {
                database[dbKey] = [];
            }

            // Create new student
            const newStudent = createStudentObject(name);
            database[dbKey].push(newStudent);
            
            saveToLocalStorage();
            renderActiveTab();
            closeAddStudentModal();
            showToast(`Alumno '${name}' agregado correctamente`, 'fa-circle-check', 'text-emerald-400');
        }

        // Delete Student
        function deleteStudent(studentId) {
            const dbKey = getDbKey();
            const list = database[dbKey] || [];
            const idx = list.findIndex(s => s.id === studentId);
            if (idx !== -1) {
                const sName = list[idx].name;
                if (confirm(`¿Estás seguro de que deseas eliminar al alumno '${sName}' y todas sus notas?`)) {
                    list.splice(idx, 1);
                    saveToLocalStorage();
                    renderActiveTab();
                    showToast("Alumno eliminado con éxito", "fa-circle-check", "text-slate-300");
                }
            }
        }

        // Toast Messages Helper
        function showToast(message, iconClass, colorClass) {
            const toast = document.getElementById('toast');
            const toastIcon = document.getElementById('toast-icon');
            const toastMsg = document.getElementById('toast-message');

            toastIcon.className = `${colorClass} text-lg`;
            toastIcon.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;
            toastMsg.innerText = message;

            toast.classList.remove('translate-y-20', 'opacity-0');
            toast.classList.add('translate-y-0', 'opacity-100');

            setTimeout(() => {
                toast.classList.remove('translate-y-0', 'opacity-100');
                toast.classList.add('translate-y-20', 'opacity-0');
            }, 3000);
        }

        // Modal AI Assistant Functions
        function openAIAssistantModal() {
            document.getElementById('modal-ai-student-search').value = '';
            document.getElementById('modal-ai-suggestions').innerHTML = '';
            document.getElementById('modal-ai-suggestions').classList.add('hidden');
            document.getElementById('modal-ai-blank-state').classList.remove('hidden');
            document.getElementById('modal-ai-results').classList.add('hidden');
            
            // Set correct title text
            document.getElementById('modal-ai-title-label').innerText = `Buscar Alumno en Grado Actual (${currentGrade} - Año ${currentYear})`;

            const modal = document.getElementById('ai-assistant-modal');
            modal.classList.remove('hidden');
            setTimeout(() => {
                document.getElementById('ai-modal-container').classList.remove('scale-95');
                document.getElementById('modal-ai-student-search').focus();
            }, 10);
        }

        function closeAIAssistantModal() {
            document.getElementById('ai-modal-container').classList.add('scale-95');
            setTimeout(() => {
                document.getElementById('ai-assistant-modal').classList.add('hidden');
            }, 150);
        }

        function suggestStudentsModal(query) {
            const suggestionsDiv = document.getElementById('modal-ai-suggestions');
            if (!query.trim()) {
                suggestionsDiv.innerHTML = '';
                suggestionsDiv.classList.add('hidden');
                return;
            }

            const dbKey = getDbKey();
            const list = database[dbKey] || [];
            const filtered = list.filter(st => st.name.toUpperCase().includes(query.toUpperCase()));

            if (filtered.length === 0) {
                suggestionsDiv.innerHTML = '<div class="p-2.5 text-slate-400">No se encontraron alumnos en este grado</div>';
            } else {
                suggestionsDiv.innerHTML = filtered.map(st => `
                    <div onclick="selectStudentForAIModal('${st.name}')" class="p-2.5 hover:bg-[#1a2942]/10 cursor-pointer border-b border-white/5 last:border-0 text-white font-medium">
                        ${st.name}
                    </div>
                `).join('');
            }
            suggestionsDiv.classList.remove('hidden');
        }

        function selectStudentForAIModal(name) {
            document.getElementById('modal-ai-student-search').value = name;
            document.getElementById('modal-ai-suggestions').classList.add('hidden');
            runStudentAIAnalysisModal(name);
        }

        async function runStudentAIAnalysisModal(studentName) {
            studentName = studentName.trim().toUpperCase();
            
            const SUBJECTS_LIST = [
                "LENGUAJE Y LITERATURA",
                "MATEMATICA",
                "CIUDADANIA Y VALORES",
                "CIENCIA Y TECNOLOGIA",
                "INGLES",
                "EDUCACION DE FISICA",
                "MORAL, URBANIDAD Y CIVICA"
            ];

            const tbody = document.getElementById('modal-ai-subjects-tbody');
            tbody.innerHTML = '';

            let validSubjectsData = [];
            let totalWeightedSum = 0;
            let countWeightedSubjects = 0;
            let failingSubjects = [];

            // Gather grades for each subject
            SUBJECTS_LIST.forEach(sub => {
                const subKey = `${currentYear}_${currentGrade}_${sub}`;
                const list = database[subKey] || [];
                const student = list.find(s => s.name.toUpperCase() === studentName);

                let nfText = "-";
                let nfVal = null;
                let statusText = "-";
                let statusClass = "text-slate-400";

                if (student) {
                    const p1Grade = getTrimestralValue(student, 'p1');
                    const p2Grade = getTrimestralValue(student, 'p2');
                    const p3Grade = getTrimestralValue(student, 'p3');
                    const nf = (p1Grade + p2Grade + p3Grade) / 3;
                    nfText = nf.toFixed(1);
                    nfVal = nf;

                    validSubjectsData.push({ subject: sub, nf: nf, studentObj: student });
                    totalWeightedSum += nf;
                    countWeightedSubjects++;

                    if (nf >= 5.0) {
                        statusText = "Aprobado";
                        statusClass = "text-emerald-400 font-bold bg-emerald-950/30 px-2 py-0.5 rounded";
                    } else {
                        statusText = "Reprobado";
                        statusClass = "text-rose-400 font-bold bg-rose-950/30 px-2 py-0.5 rounded";
                        failingSubjects.push(sub);
                    }
                }

                // Add row to modal table
                const tr = document.createElement('tr');
                tr.className = "border-b border-slate-800/80 hover:bg-slate-900/20";
                
                const nfClass = nfVal !== null ? (nfVal >= 5.0 ? "text-emerald-400 font-bold" : "text-rose-400 font-bold") : "text-slate-400";
                
                tr.innerHTML = `
                    <td class="p-2.5 text-slate-350 font-medium truncate max-w-[130px] sm:max-w-none" title="${sub}">${sub}</td>
                    <td class="p-2.5 text-center bg-indigo-950/20 ${nfClass}">${nfText}</td>
                    <td class="p-2.5 text-center"><span class="${statusClass}">${statusText}</span></td>
                `;
                tbody.appendChild(tr);
            });

            if (validSubjectsData.length === 0) {
                showToast("El alumno seleccionado no posee notas registradas.", "fa-circle-xmark", "text-rose-400");
                return;
            }

            // Hide blank state and display results
            document.getElementById('modal-ai-blank-state').classList.add('hidden');
            document.getElementById('modal-ai-results').classList.remove('hidden');

            const avgOverall = totalWeightedSum / countWeightedSubjects;

            // Check if API Key is available for real Gemini analysis across all subjects
            const apiKey = localStorage.getItem('gemini_api_key');
            if (apiKey && apiKey.length > 10) {
                document.getElementById('modal-ai-student-name').innerText = studentName;
                document.getElementById('modal-ai-student-trend').innerText = "PROCESANDO... 🤖";
                document.getElementById('modal-ai-student-trend').className = "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-600 text-white animate-pulse";
                document.getElementById('modal-ai-summary-text').innerHTML = `<p class="leading-relaxed text-slate-400 italic">Analizando el expediente escolar completo con la IA real de Gemini...</p>`;
                document.getElementById('modal-ai-recommendation-text').innerHTML = "Generando recomendaciones...";

                const gradesSummaryText = validSubjectsData.map(d => `- ${d.subject}: Promedio Final = ${d.nf.toFixed(1)}`).join("\n");
                
                // Resolve attendance from any other app saved in localStorage (dynamic link/enlace)
                let attendancePct = "No registrado";
                try {
                    const keys = ['school_attendance_db', 'attendance_db', 'asistencia_db', 'attendance', 'asistencia'];
                    for (const key of keys) {
                        const localData = localStorage.getItem(key);
                        if (localData) {
                            const parsed = JSON.parse(localData);
                            if (Array.isArray(parsed)) {
                                const found = parsed.find(s => (s.name && s.name.toUpperCase() === studentName) || (s.nombre && s.nombre.toUpperCase() === studentName));
                                if (found) {
                                    attendancePct = found.attendance || found.asistencia || found.porcentaje || attendancePct;
                                    break;
                                }
                            } else if (typeof parsed === 'object') {
                                for (const k in parsed) {
                                    if (k.toUpperCase() === studentName) {
                                        attendancePct = parsed[k].attendance || parsed[k].asistencia || parsed[k].porcentaje || parsed[k] || attendancePct;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                } catch(e) {
                    console.log("Error reading attendance database:", e);
                }

                // Estimate attendance based on C7 criteria (Puntualidad/Asistencia) from notes database if not found in localStorage
                if (attendancePct === "No registrado") {
                    let totalC7 = 0;
                    let countC7 = 0;
                    validSubjectsData.forEach(d => {
                        const sObj = d.studentObj;
                        if (sObj && sObj.p1 && sObj.p1.a1 && sObj.p1.a1.length >= 7) {
                            totalC7 += sObj.p1.a1[6] + sObj.p2.a1[6] + sObj.p3.a1[6];
                            countC7 += 3;
                        }
                    });
                    if (countC7 > 0) {
                        const avgC7 = totalC7 / countC7;
                        const estimatedPct = 70 + (avgC7 * 3.0);
                        attendancePct = `${Math.min(100, Math.max(0, Math.round(estimatedPct)))}%`;
                    } else {
                        attendancePct = "95%";
                    }
                }
                
                const prompt = `Analiza el expediente académico y de asistencia del alumno/a "${studentName}" en el grado "${currentGrade}" para el año ${currentYear}.
A continuación se detallan las calificaciones promedio obtenidas por el alumno en cada materia (escala de 0.0 a 10.0, la nota mínima aprobatoria es 5.0):
${gradesSummaryText}

Porcentaje de asistencia registrado: ${attendancePct}

Genera una evaluación psicopedagógica y diagnóstica profesional en español que coordine de manera integral el rendimiento académico (las notas) con el nivel de asistencia del estudiante (por ejemplo, analiza cómo influyen las inasistencias en el rendimiento escolar o cómo la excelente asistencia impulsa sus calificaciones).
El resultado debe ser un objeto JSON estrictamente formateado de la siguiente manera:
{
  "trend": "MEJORA NOTABLE", // puede ser: "EXCELENTE", "SATISFACTORIO", "ESTABLE", "MEJORA NOTABLE", "EN DECLIVE" o "ALERTA CRITICA" (agrega un emoji opcional)
  "diagnostico": "Un resumen ejecutivo del diagnóstico académico del estudiante, detallando sus fortalezas, debilidades, la relación con su nivel de asistencia y en qué materias específicas necesita refuerzo...",
  "recomendaciones": "Recomendaciones específicas para los docentes de las materias reprobadas (si las hay) y pautas concretas para que los padres apoyen al estudiante en el hogar..."
}
Devuelve SOLAMENTE el objeto JSON, sin formato markdown extra ni explicaciones.`;

                try {
                    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [{ parts: [{ text: prompt }] }],
                            generationConfig: { responseMimeType: "application/json" }
                        })
                    });
                    
                    if (response.ok) {
                        const data = await response.json();
                        let text = data.candidates[0].content.parts[0].text.trim();
                        if (text.startsWith("```json")) {
                            text = text.substring(7);
                        }
                        if (text.endsWith("```")) {
                            text = text.substring(0, text.length - 3);
                        }
                        const aiResult = JSON.parse(text.trim());
                        
                        document.getElementById('modal-ai-student-trend').innerText = aiResult.trend.toUpperCase();
                        document.getElementById('modal-ai-student-trend').className = `px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-cyan-600 text-white`;
                        document.getElementById('modal-ai-summary-text').innerHTML = aiResult.diagnostico;
                        document.getElementById('modal-ai-recommendation-text').innerHTML = aiResult.recomendaciones.replace(/\n/g, '<br>');
                        return;
                    } else {
                        showToast("Error en API Key. Usando diagnóstico simulado local.", "fa-circle-exclamation", "text-amber-400");
                    }
                } catch (err) {
                    console.error("Gemini API Error in modal:", err);
                    showToast("Error llamando a la API de Gemini.", "fa-circle-exclamation", "text-rose-400");
                }
            }

            // Trend analysis
            let trend = "ESTABLE";
            let trendColor = "bg-slate-700 text-slate-100 border border-slate-600";
            
            const activeSubData = validSubjectsData.find(d => d.subject === currentSubject) || validSubjectsData[0];
            if (activeSubData && activeSubData.studentObj) {
                const sObj = activeSubData.studentObj;
                const nonZero = [
                    getTrimestralValue(sObj, 'p1'),
                    getTrimestralValue(sObj, 'p2'),
                    getTrimestralValue(sObj, 'p3')
                ].filter(s => s > 0);
                if (nonZero.length >= 3) {
                    const sz = nonZero.length;
                    const last = nonZero[sz - 1];
                    const prev = nonZero[sz - 2];
                    const pprev = nonZero[sz - 3];
                    if (last > prev && prev > pprev) {
                        trend = "MEJORA NOTABLE 📈";
                        trendColor = "bg-emerald-950/80 text-emerald-300 border border-emerald-800";
                    } else if (pprev > prev && prev > last) {
                        trend = "EN DECLIVE 📉";
                        trendColor = "bg-rose-950/80 text-rose-300 border border-rose-800";
                    }
                }
            }

            document.getElementById('modal-ai-student-name').innerText = studentName;
            document.getElementById('modal-ai-student-trend').innerText = trend;
            document.getElementById('modal-ai-student-trend').className = `px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${trendColor}`;

            // Generate overall summary
            let summaryText = "";
            if (avgOverall >= 8.5) {
                summaryText = `⭐ <strong>Rendimiento Global Sobresaliente:</strong> El promedio general es de <strong>${avgOverall.toFixed(1)}</strong>. El estudiante demuestra excelencia académica constante. Su desempeño es superior y equilibrado en la mayoría de materias registradas.`;
            } else if (avgOverall >= 5.0) {
                summaryText = `✔️ <strong>Rendimiento Global Satisfactorio:</strong> Promedio general de <strong>${avgOverall.toFixed(1)}</strong>. Cumple con los requisitos mínimos de aprobación. `;
                if (failingSubjects.length > 0) {
                    summaryText += `Sin embargo, presenta dificultades localizadas en: <span class="text-rose-400 font-bold">${failingSubjects.join(', ')}</span>.`;
                } else {
                    summaryText += `Se mantiene estable en todas sus materias sin reprobaciones vigentes.`;
                }
            } else {
                summaryText = `🚨 <strong>Rendimiento en Estado de Alerta:</strong> El promedio global está por debajo del mínimo aprobatorio con <strong>${avgOverall.toFixed(1)}</strong>. `;
                if (failingSubjects.length > 0) {
                    summaryText += `Presenta reprobación crítica en las siguientes materias: <span class="text-rose-400 font-extrabold">${failingSubjects.join(', ')}</span>. Requiere intervención pedagógica prioritaria.`;
                }
            }

            // Subject detail details
            let detailItems = [];
            validSubjectsData.forEach(d => {
                const sObj = d.studentObj;
                if (sObj) {
                    let sumInt = 0, sumCot = 0, sumTest = 0;
                    let activeCount = 0;
                    ['p1', 'p2', 'p3'].forEach(pKey => {
                        const p = sObj[pKey];
                        if (p) {
                            const act1Avg = p.a1.reduce((a,b)=>a+b, 0) / 8;
                            const int = act1Avg * 0.35;
                            const cot = p.a2.reduce((a,b)=>a+b, 0) * 0.35;
                            const test = p.a3_nota * 0.30;
                            if ((int + cot + test) > 0) {
                                sumInt += int;
                                sumCot += cot;
                                sumTest += test;
                                activeCount++;
                            }
                        }
                    });

                    const act1Avg = activeCount > 0 ? (sumInt / activeCount) : 0;
                    const act2Avg = activeCount > 0 ? (sumCot / activeCount) : 0;
                    const testAvg = activeCount > 0 ? (sumTest / activeCount) : 0;

                    if (d.nf < 6.0) {
                        if (act2Avg < 1.5 && testAvg > 2.0) {
                            detailItems.push(`En <strong>${d.subject}</strong>, la principal causa de reprobación es la falta de entrega de Actividades Cotidianas (tareas/cuadernos), a pesar de que aprueba los exámenes.`);
                        } else if (testAvg < 1.2 && act2Avg > 2.5) {
                            detailItems.push(`En <strong>${d.subject}</strong>, le afecta significativamente el bajo desempeño en las Pruebas Objetivas escritas, a pesar de su entrega constante en trabajos diarios.`);
                        } else {
                            detailItems.push(`En <strong>${d.subject}</strong>, muestra deficiencias generales tanto en exámenes como en la entrega regular de tareas de aula.`);
                        }
                    }
                }
            });

            if (detailItems.length > 0) {
                summaryText += `<br><br><i class="fa-solid fa-triangle-exclamation text-amber-400 mr-1.5"></i><strong>Análisis Detallado:</strong><br><ul class="list-disc pl-4 mt-1 space-y-1 text-slate-350">${detailItems.map(item => `<li>${item}</li>`).join('')}</ul>`;
            }

            document.getElementById('modal-ai-summary-text').innerHTML = summaryText;

            // Generate pedagogical recommendations
            let recText = "";
            if (avgOverall >= 8.5) {
                recText = "Asignar al estudiante el rol de monitor de grupo para ayudar a sus compañeros con dificultades. Estimular su liderazgo invitándole a liderar proyectos de investigación escolar, exposiciones especiales o clubes académicos de la materia.";
            } else if (failingSubjects.length > 0) {
                recText = `1. Coordinar de manera prioritaria una reunión con el padre o tutor legal para alertar sobre la situación en las materias reprobadas (${failingSubjects.join(', ')}).\n2. Establecer un plan de nivelación especial enfocado en las áreas específicas identificadas en el diagnóstico.\n3. Implementar un control semanal de cuadernos y tareas mediante una libreta de firmas para asegurar el cumplimiento cotidiano.`;
            } else if (avgOverall < 7.0) {
                recText = "Brindar tutoría de refuerzo grupal en las horas de estudio libre. Fomentar la participación activa del estudiante en clase realizando preguntas dirigidas e incorporándole en equipos de trabajo equilibrados para potenciar su aprendizaje cooperativo.";
            } else {
                recText = "Felicitar al estudiante por mantener un rendimiento aprobado y motivarle a continuar entregando a tiempo sus asignaciones. Recomendar lecturas autónomas complementarias y guías de auto-evaluación para elevar sus calificaciones al rango sobresaliente.";
            }

            document.getElementById('modal-ai-recommendation-text').innerHTML = recText.replace(/\n/g, '<br>');
        }