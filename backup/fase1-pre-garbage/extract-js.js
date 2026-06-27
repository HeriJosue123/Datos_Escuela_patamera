const fs = require('fs');

let html = fs.readFileSync('notas.html', 'utf8');

// Find the first big script tag
let scriptStart = html.indexOf('<script>', html.indexOf('<!-- MODAL ASISTENTE IA -->'));
let scriptEnd = html.indexOf('</script>', scriptStart);

if (scriptStart !== -1 && scriptEnd !== -1) {
    let jsCode = html.substring(scriptStart + 8, scriptEnd).trim();
    
    // Add Firebase init block to the top of notas.js
    let firebaseInit = `
/* ═══════════════════════════════════════════════════════════
   FIREBASE CONFIGURATION
═══════════════════════════════════════════════════════════ */
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
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    db.enablePersistence().catch(err => {
        console.warn("Error persistencia:", err.code);
    });
    console.log("Firebase inicializado en notas.js");
} catch(e) {
    console.error("Error al iniciar Firebase", e);
}

// Modify local storage calls to sync with Firebase
async function syncToFirebase() {
    if(!db) return;
    try {
        const docRef = db.collection('grades_data').doc('master_db');
        await docRef.set({
            database: database,
            last_updated: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log("Datos guardados en Firebase");
    } catch(e) {
        console.error("Error guardando a Firebase", e);
    }
}

async function loadFromFirebase() {
    if(!db) return false;
    try {
        const docRef = db.collection('grades_data').doc('master_db');
        const docSnap = await docRef.get();
        if (docSnap.exists) {
            let remoteData = docSnap.data().database;
            if(remoteData) {
                database = remoteData;
                localStorage.setItem('school_notes_full_progression_db', JSON.stringify(database));
                return true;
            }
        }
    } catch(e) {
        console.error("Error cargando de Firebase", e);
    }
    return false;
}

`;

    jsCode = firebaseInit + jsCode;

    // We modify saveToLocalStorage to also sync to Firebase
    jsCode = jsCode.replace(/function saveToLocalStorage\(\) \{/g, 'function saveToLocalStorage() {\n    syncToFirebase();');

    // We modify window.onload to load from firebase first
    jsCode = jsCode.replace(/window\.onload = function\(\) \{/, `window.onload = async function() {
    await loadFromFirebase();`);

    fs.writeFileSync('notas.js', jsCode);
    
    // Replace the script in HTML with the external file + Firebase CDNs
    let injection = `
    <!-- Firebase SDK Compatibility CDN -->
    <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js"></script>
    <script src="notas.js?v=1"></script>
    `;
    
    html = html.substring(0, scriptStart) + injection + html.substring(scriptEnd + 9);
    fs.writeFileSync('notas.html', html);
    console.log('Extraction completed.');
} else {
    console.log('Script tag not found.');
}
