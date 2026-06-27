const fs = require('fs');

const path = 'notas.js';
let content = fs.readFileSync(path, 'utf8');

const injectionCode = `
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
        showToast(\`Se agregaron \${addedCount} alumno(s) nuevo(s) al listado.\`, 'fa-circle-check', 'text-emerald-400');
    } else {
        showToast(\`El listado ya está actualizado. No hay alumnos nuevos.\`, 'fa-circle-info', 'text-blue-400');
        updateDbStatus('connected', 'Sincronizado');
    }
}
`;

const marker = "async function initializeKeyData(dbKey) {";
const index = content.indexOf(marker);

if (index !== -1) {
    const newContent = content.substring(0, index) + injectionCode + "\n" + content.substring(index);
    fs.writeFileSync(path, newContent);
    console.log('Sync function injected');
} else {
    console.log('Marker not found');
}
