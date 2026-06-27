const fs = require('fs');

const path = 'notas.js';
let content = fs.readFileSync(path, 'utf8');

// We are replacing from "async function syncToFirebase()" down to the end of "function switchTab(tabId)" 
// But wait, it's safer to just split by known markers.

const startMarker = "// Modify local storage calls to sync with Firebase";
const endMarker = "        // Switch active tab view";

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
    console.error("Markers not found!");
    process.exit(1);
}

const newLogic = `// --- FIREBASE SYNC (MIGRADO A DB EXPANDIBLE) ---
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
    return \`\${currentYear}_\${currentGrade}_\${currentSubject}\`;
}

function migrateStudentStructure(dbKey) {
    if (Array.isArray(database[dbKey])) {
        database[dbKey] = database[dbKey].map(st => {
            ['p1', 'p2', 'p3'].forEach((pKey, pIdx) => {
                const uKey = \`u\${pIdx + 1}\`;
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
    const labelStr = \`\${currentYear} - \${currentGrade} - \${currentSubject}\`;
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

`;

// Read the original updateCriteriaPanel code from content
const criteriaStart = "function updateCriteriaPanel() {";
const criteriaEnd = "        // Switch Year Selector";
const criteriaStartIndex = content.indexOf(criteriaStart);
const criteriaEndIndex = content.indexOf(criteriaEnd);

if(criteriaStartIndex === -1 || criteriaEndIndex === -1) {
    console.error("Criteria panel not found!");
    process.exit(1);
}

const criteriaCode = content.substring(criteriaStartIndex, criteriaEndIndex);

const restLogic = `// Async Switch Handlers
async function changeYear() {
    currentYear = document.getElementById('header-year').value;
    localStorage.setItem('school_notes_active_year_full', currentYear);
    await loadDatabaseFromStorage();
    updateUILabel();
    renderActiveTab();
    showToast(\`Cambiado al Año Lectivo \${currentYear}\`, 'fa-circle-check', 'text-brand-400');
}

async function changeGrade() {
    currentGrade = document.getElementById('header-grade').value;
    localStorage.setItem('school_notes_active_grade_full', currentGrade);
    await loadDatabaseFromStorage();
    updateUILabel();
    renderActiveTab();
    showToast(\`Cargado \${currentGrade} con éxito\`, 'fa-circle-check', 'text-brand-400');
}

async function changeSubject() {
    currentSubject = document.getElementById('header-subject').value;
    localStorage.setItem('school_notes_active_subject_full', currentSubject);
    await loadDatabaseFromStorage();
    updateUILabel();
    renderActiveTab();
    showToast(\`Cargado asignatura \${currentSubject}\`, 'fa-circle-check', 'text-brand-400');
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
        showToast(\`Notas guardadas con éxito\`, "fa-circle-check", "text-emerald-400");
    }
}

`;

const before = content.substring(0, startIndex);
const after = content.substring(endIndex);

fs.writeFileSync('notas.js', before + newLogic + criteriaCode + restLogic + after);
console.log("Phase 18 notas.js updated.");
