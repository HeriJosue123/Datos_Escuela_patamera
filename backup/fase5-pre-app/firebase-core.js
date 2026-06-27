/* ═══════════════════════════════════════════════════════════
   FIREBASE CORE (Centralized)
═══════════════════════════════════════════════════════════ */
const firebaseConfig = {
    apiKey: "AIzaSyCOxSEhGKWGbIG5fvUYUBRI--dXsRH3mdU",
    authDomain: "alicontrol-c64d2.firebaseapp.com",
    projectId: "alicontrol-c64d2",
    storageBucket: "alicontrol-c64d2.firebasestorage.app",
    messagingSenderId: "1052279207948",
    appId: "1:1052279207948:web:f67b98a112c93ee86dd629"
};

window.db = null;
window.firebaseInitialized = false;

function initFirebaseCore() {
    try {
        if (typeof firebase === 'undefined') {
            console.warn("Firebase SDK no cargado. Funcionando en modo local.");
            return;
        }
        
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        
        window.db = firebase.firestore();
        
        window.db.enablePersistence().catch(err => {
            console.warn("Error persistencia Firebase:", err.code);
        });
        
        window.firebaseInitialized = true;
        console.log("🔥 Firebase Core centralizado inicializado correctamente.");
    } catch(e) {
        console.error("Error al iniciar Firebase Core", e);
    }
}

window.updateDbStatus = function(status, text) {
    const badge = document.getElementById('db-status-badge');
    if (!badge) return;
    badge.className = `db-status-badge ${status}`;
    badge.innerHTML = `☁️ ${text}`;
};

initFirebaseCore();
