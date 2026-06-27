const fs = require('fs');

let html = fs.readFileSync('matricula.html', 'utf8');

// 1. Inyectar Scripts de Firebase en el <head>
const firebaseScripts = `
    <!-- Firebase SDK Compat -->
    <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js"></script>
`;
if (!html.includes('firebase-app-compat')) {
    html = html.replace('</head>', firebaseScripts + '</head>');
}

// 2. Modificar el bloque de script principal para inicializar Firebase y cargar datos
const oldInitBlock = `document.addEventListener('DOMContentLoaded', () => {
            renderStats();
            renderStudents();
        });`;

const firebaseLogic = `
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
                    // Subir datos locales a la nube (Fallback)
                    for (const group of schoolData) {
                        // Usar el nombre del grado como ID del documento (ej. "Parvularia 4")
                        await enrollmentRef.doc(group.grade).set(group);
                    }
                    console.log("✅ Migración completada.");
                } else {
                    console.log("☁️ Cargando datos desde Firestore...");
                    const remoteData = [];
                    snapshot.forEach(doc => {
                        remoteData.push(doc.data());
                    });
                    
                    // Ordenar por ciclo y grado si es necesario, o mantener el orden de Firestore
                    // Para simplificar, reemplazamos el schoolData global
                    schoolData = remoteData;
                    console.log("✅ Datos cargados correctamente.");
                }
            } catch (error) {
                console.error("❌ Error de Firestore:", error);
            }

            // Continuar con el renderizado original
            renderStats();
            renderStudents();
        }

        document.addEventListener('DOMContentLoaded', () => {
            initEnrollmentData();
        });
`;

if (!html.includes('initEnrollmentData')) {
    html = html.replace(oldInitBlock, firebaseLogic);
}

// 3. Cambiar `const schoolData` a `let schoolData` para permitir sobrescritura
html = html.replace('const schoolData = [', 'let schoolData = [');

// 4. Corregir los JS templates oscuros que no se aplicaron en la fase anterior (usando Regex global)
html = html.replace(/<td class="px-4 py-3 whitespace-nowrap font-medium text-gray-900">\$\{item\.grade\}<\/td>/g, '<td class="px-5 py-3 whitespace-nowrap font-bold text-slate-200">${item.grade}</td>');
html = html.replace(/<td class="px-4 py-3 text-center text-teal-600 font-semibold bg-teal-50">\$\{item\.male\}<\/td>/g, '<td class="px-5 py-3 text-center text-teal-400 font-bold bg-teal-500/10 border-x border-[#2d3f5e]/50">${item.male}</td>');
html = html.replace(/<td class="px-4 py-3 text-center text-pink-600 font-semibold bg-pink-50">\$\{item\.female\}<\/td>/g, '<td class="px-5 py-3 text-center text-pink-400 font-bold bg-pink-500/10 border-r border-[#2d3f5e]/50">${item.female}</td>');
html = html.replace(/<td class="px-4 py-3 text-center font-bold text-gray-800 bg-gray-100">\$\{total\}<\/td>/g, '<td class="px-5 py-3 text-center font-black text-brand-300 bg-brand-500/10">${total}</td>');

html = html.replace(/<td class="px-4 py-3 whitespace-nowrap font-medium text-gray-900">\$\{cycleName\}<\/td>/g, '<td class="px-5 py-4 whitespace-nowrap font-bold text-slate-200">${cycleName}</td>');
html = html.replace(/<td class="px-4 py-3 text-center font-bold text-blue-600 bg-blue-50">\$\{count\}<\/td>/g, '<td class="px-5 py-4 text-center font-black text-brand-300 bg-brand-500/10 border-l border-[#2d3f5e]/50">${count}</td>');

const oldLi = `<li class="flex flex-col sm:flex-row sm:items-center justify-between p-3 hover:bg-gray-50 rounded border-b last:border-0 border-gray-100">
                        <div class="flex items-center">
                            <span class="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full text-xs mr-3 font-bold">\${index + 1}</span>
                            <span class="text-gray-700 uppercase text-sm font-medium">\${student.name}</span>
                        </div>
                        <div class="mt-2 sm:mt-0 sm:ml-4">
                             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                                <span class="mr-1 text-gray-500 font-normal">NIE:</span> <span class="font-mono font-bold">\${student.nie}</span>
                            </span>
                        </div>
                    </li>`;
const newLi = `<li class="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-[#1e293b]/50 rounded-xl border-b last:border-0 border-[#2d3f5e] transition-colors">
                        <div class="flex items-center">
                            <span class="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-[#142138] border border-[#2d3f5e] text-brand-400 rounded-full text-xs mr-4 font-bold shadow-sm">\${index + 1}</span>
                            <span class="text-slate-200 uppercase text-sm font-bold tracking-wide">\${student.name}</span>
                        </div>
                        <div class="mt-3 sm:mt-0 sm:ml-4">
                             <span class="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-[#142138] text-brand-300 border border-brand-500/20 shadow-inner">
                                <span class="mr-1.5 text-slate-500 font-semibold tracking-widest uppercase">NIE:</span> <span class="font-mono tracking-wider">\${student.nie}</span>
                            </span>
                        </div>
                    </li>`;
html = html.replace(oldLi, newLi);

const oldSect = `<div class="border border-gray-200 rounded-lg overflow-hidden mb-4 break-inside-avoid">
                        <div class="bg-gray-100 px-4 py-2 border-b border-gray-200 flex justify-between items-center cursor-pointer" onclick="this.nextElementSibling.classList.toggle('hidden')">
                            <h4 class="font-bold text-gray-800">\${item.grade}</h4>
                            <span class="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">\${item.male + item.female} Estudiantes</span>
                        </div>
                        <div class="p-0 transition-all duration-300">
                            <ul class="divide-y divide-gray-100">`;
const newSect = `<div class="border border-[#2d3f5e] rounded-xl overflow-hidden mb-6 break-inside-avoid shadow-sm bg-[#142138]/30">
                        <div class="bg-[#1e293b]/80 px-5 py-4 border-b border-[#2d3f5e] flex justify-between items-center cursor-pointer hover:bg-[#1e293b] transition-colors" onclick="this.nextElementSibling.classList.toggle('hidden')">
                            <h4 class="font-extrabold text-slate-100 text-sm uppercase tracking-wide flex items-center gap-2">
                                <i class="fa-solid fa-folder-open text-brand-500/70"></i> \${item.grade}
                            </h4>
                            <span class="bg-brand-500/20 text-brand-400 border border-brand-500/30 font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-widest">\${item.male + item.female} Estudiantes</span>
                        </div>
                        <div class="p-2 transition-all duration-300">
                            <ul class="divide-y divide-[#2d3f5e]/50">`;
html = html.replace(oldSect, newSect);

fs.writeFileSync('matricula.html', html);
console.log('Firebase logic and dark mode templates injected successfully in matricula.html');
