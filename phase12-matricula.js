const fs = require('fs');

let html = fs.readFileSync('Matricula C.E  2026.html', 'utf8');

// 1. General Head and Body Styles
html = html.replace(/<body[^>]*>/, '<body class="bg-[#0f172a] text-slate-200 font-sans antialiased selection:bg-brand-500/30 selection:text-brand-300">');
html = html.replace(/<style>[\s\S]*?<\/style>/, `<style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        
        body {
            font-family: 'Inter', sans-serif;
            background-color: #0f172a;
        }
        
        h1, h2, h3, h4, h5, h6 {
            font-family: 'Outfit', sans-serif;
        }

        .header-bg {
            background: #1a2942;
        }

        .card-hover {
            transition: all 0.3s ease;
        }
        .card-hover:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
            border-color: rgba(99, 102, 241, 0.4);
        }

        /* Chart text color override for dark mode */
        canvas {
            filter: drop-shadow(0 0 10px rgba(0,0,0,0.2));
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #0f172a; 
        }
        ::-webkit-scrollbar-thumb {
            background: #2d3f5e; 
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #3b4c6b; 
        }

        /* Estilos específicos para impresión */
        @media print {
            .no-print {
                display: none !important;
            }
            body {
                background-color: white !important;
                color: black !important;
            }
            .header-bg, .bg-[#1a2942], .bg-\\[\\#1a2942\\] {
                background: white !important;
                color: black !important;
                box-shadow: none !important;
                border: 1px solid #ddd !important;
            }
            .text-blue-100, .text-slate-400, .text-slate-300, .text-slate-200, .text-slate-100 {
                color: #333 !important;
            }
            .shadow-lg, .shadow, .shadow-sm {
                box-shadow: none !important;
                border: 1px solid #ddd !important;
            }
            * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            .break-inside-avoid {
                break-inside: avoid;
            }
        }
    </style>`);

// Configure Brand Colors for Tailwind
const tailwindConfig = `<script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        brand: {
                            50: '#eff6ff',
                            100: '#dbeafe',
                            400: '#60a5fa',
                            500: '#3b82f6',
                            600: '#2563eb',
                            700: '#1d4ed8',
                            800: '#1e40af',
                            900: '#1e3a8a',
                        }
                    }
                }
            }
        }
    </script>`;
html = html.replace('<script src="https://cdn.tailwindcss.com"></script>', '<script src="https://cdn.tailwindcss.com"></script>\n    ' + tailwindConfig);

// 2. Header / Navbar
html = html.replace(/<header class="header-bg text-white shadow-lg">/, '<header class="header-bg text-slate-100 shadow-xl border-b border-[#2d3f5e] sticky top-0 z-50">');
html = html.replace(/<div class="bg-white p-3 rounded-full text-blue-800 border border-blue-900">/, '<div class="bg-brand-600/20 p-3.5 rounded-xl text-brand-400 border border-brand-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]">');
html = html.replace(/<p class="text-blue-100 text-sm font-medium">/, '<p class="text-brand-300 text-sm font-semibold tracking-wide mt-1">');
html = html.replace(/<div class="text-center md:text-right text-sm text-blue-100 mb-4 md:mb-2">/, '<div class="text-center md:text-right text-sm text-slate-400 font-medium mb-4 md:mb-2">');
html = html.replace(/<button onclick="window.print\(\)" class="no-print bg-white text-blue-800 hover:bg-blue-50 font-bold py-2 px-6 rounded-full shadow-md transition duration-200 flex items-center border border-blue-200">/, '<button onclick="window.print()" class="no-print bg-[#142138] text-brand-400 hover:text-brand-300 hover:bg-[#1e293b] font-bold py-2.5 px-6 rounded-xl shadow-lg transition duration-200 flex items-center border border-brand-500/30 active:scale-95">');

// 3. Main Container
html = html.replace(/<main class="container mx-auto px-4 py-8">/, '<main class="max-w-7xl mx-auto px-4 py-8 space-y-8">');

// 4. KPI Cards
html = html.replace(/<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 break-inside-avoid">/, '<div class="grid grid-cols-1 md:grid-cols-3 gap-6 break-inside-avoid">');

const totalCardOld = `<div class="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600 card-hover flex items-center justify-between">
                <div>
                    <p class="text-gray-500 text-sm uppercase font-semibold">Matrícula Total</p>
                    <h2 class="text-4xl font-bold text-gray-800" id="total-students">30</h2>
                </div>
                <div class="text-blue-200">
                    <i class="fas fa-users fa-4x"></i>
                </div>
            </div>`;
const totalCardNew = `<div class="bg-[#1a2942]/60 rounded-2xl shadow-lg p-7 border border-[#2d3f5e] border-l-4 border-l-brand-500 card-hover flex items-center justify-between">
                <div>
                    <p class="text-slate-400 text-[11px] uppercase tracking-widest font-bold mb-2">Matrícula Total</p>
                    <h2 class="text-5xl font-black text-slate-100 tracking-tight" id="total-students">30</h2>
                </div>
                <div class="bg-brand-500/10 p-4 rounded-2xl text-brand-400 border border-brand-500/20">
                    <i class="fas fa-users fa-3x"></i>
                </div>
            </div>`;
html = html.replace(totalCardOld, totalCardNew);

const maleCardOld = `<div class="bg-white rounded-lg shadow p-6 border-l-4 border-teal-500 card-hover flex items-center justify-between">
                <div>
                    <p class="text-gray-500 text-sm uppercase font-semibold">Masculino</p>
                    <h2 class="text-4xl font-bold text-gray-800" id="total-male">17</h2>
                </div>
                <div class="text-teal-200">
                    <i class="fas fa-male fa-4x"></i>
                </div>
            </div>`;
const maleCardNew = `<div class="bg-[#1a2942]/60 rounded-2xl shadow-lg p-7 border border-[#2d3f5e] border-l-4 border-l-teal-500 card-hover flex items-center justify-between">
                <div>
                    <p class="text-slate-400 text-[11px] uppercase tracking-widest font-bold mb-2">Masculino</p>
                    <h2 class="text-5xl font-black text-slate-100 tracking-tight" id="total-male">17</h2>
                </div>
                <div class="bg-teal-500/10 p-4 rounded-2xl text-teal-400 border border-teal-500/20 px-5">
                    <i class="fas fa-male fa-3x"></i>
                </div>
            </div>`;
html = html.replace(maleCardOld, maleCardNew);

const femaleCardOld = `<div class="bg-white rounded-lg shadow p-6 border-l-4 border-pink-500 card-hover flex items-center justify-between">
                <div>
                    <p class="text-gray-500 text-sm uppercase font-semibold">Femenino</p>
                    <h2 class="text-4xl font-bold text-gray-800" id="total-female">13</h2>
                </div>
                <div class="text-pink-200">
                    <i class="fas fa-female fa-4x"></i>
                </div>
            </div>`;
const femaleCardNew = `<div class="bg-[#1a2942]/60 rounded-2xl shadow-lg p-7 border border-[#2d3f5e] border-l-4 border-l-pink-500 card-hover flex items-center justify-between">
                <div>
                    <p class="text-slate-400 text-[11px] uppercase tracking-widest font-bold mb-2">Femenino</p>
                    <h2 class="text-5xl font-black text-slate-100 tracking-tight" id="total-female">13</h2>
                </div>
                <div class="bg-pink-500/10 p-4 rounded-2xl text-pink-400 border border-pink-500/20 px-6">
                    <i class="fas fa-female fa-3x"></i>
                </div>
            </div>`;
html = html.replace(femaleCardOld, femaleCardNew);

// 5. Statistics Section
html = html.replace(/<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 break-inside-avoid">/, '<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 break-inside-avoid">');

const gradeStatsOld = `<div class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
                <div class="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                    <h3 class="text-lg font-bold text-gray-700"><i class="fas fa-chart-bar mr-2 text-blue-600"></i>Estadística por Grado</h3>
                </div>
                <div class="p-6">
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grado</th>
                                    <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Masculino</th>
                                    <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Femenino</th>
                                    <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">Total</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200" id="grade-stats-body">`;
const gradeStatsNew = `<div class="bg-[#1a2942]/60 rounded-2xl shadow-lg overflow-hidden border border-[#2d3f5e]">
                <div class="bg-[#142138] border-b border-[#2d3f5e] px-7 py-5 flex justify-between items-center">
                    <h3 class="text-lg font-bold text-slate-100 flex items-center gap-3">
                        <div class="bg-brand-500/20 p-2 rounded-lg text-brand-400 text-sm"><i class="fas fa-chart-bar"></i></div>
                        Estadística por Grado
                    </h3>
                </div>
                <div class="p-7">
                    <div class="overflow-x-auto rounded-xl border border-[#2d3f5e]">
                        <table class="min-w-full divide-y divide-[#2d3f5e]">
                            <thead class="bg-[#0f172a]/80">
                                <tr>
                                    <th class="px-5 py-4 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest">Grado</th>
                                    <th class="px-5 py-4 text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">Masculino</th>
                                    <th class="px-5 py-4 text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">Femenino</th>
                                    <th class="px-5 py-4 text-center text-[11px] font-bold text-brand-400 uppercase tracking-widest">Total</th>
                                </tr>
                            </thead>
                            <tbody class="bg-[#142138]/50 divide-y divide-[#2d3f5e]" id="grade-stats-body">`;
html = html.replace(gradeStatsOld, gradeStatsNew);

const cycleStatsOld = `<div class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
                <div class="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                    <h3 class="text-lg font-bold text-gray-700"><i class="fas fa-layer-group mr-2 text-indigo-600"></i>Estadística por Ciclo</h3>
                </div>
                <div class="p-6 flex flex-col md:flex-row items-center justify-around">
                    <div class="w-full md:w-1/2">
                         <table class="min-w-full divide-y divide-gray-200 mb-4">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ciclo Educativo</th>
                                    <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider font-bold">Total</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200" id="cycle-stats-body">`;
const cycleStatsNew = `<div class="bg-[#1a2942]/60 rounded-2xl shadow-lg overflow-hidden border border-[#2d3f5e] flex flex-col">
                <div class="bg-[#142138] border-b border-[#2d3f5e] px-7 py-5 flex justify-between items-center">
                    <h3 class="text-lg font-bold text-slate-100 flex items-center gap-3">
                        <div class="bg-indigo-500/20 p-2 rounded-lg text-indigo-400 text-sm"><i class="fas fa-layer-group"></i></div>
                        Estadística por Ciclo
                    </h3>
                </div>
                <div class="p-7 flex flex-col lg:flex-col xl:flex-row items-center justify-around flex-1 gap-8">
                    <div class="w-full xl:w-1/2 overflow-x-auto rounded-xl border border-[#2d3f5e]">
                         <table class="min-w-full divide-y divide-[#2d3f5e]">
                            <thead class="bg-[#0f172a]/80">
                                <tr>
                                    <th class="px-5 py-4 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest">Ciclo Educativo</th>
                                    <th class="px-5 py-4 text-center text-[11px] font-bold text-brand-400 uppercase tracking-widest">Total</th>
                                </tr>
                            </thead>
                            <tbody class="bg-[#142138]/50 divide-y divide-[#2d3f5e]" id="cycle-stats-body">`;
html = html.replace(cycleStatsOld, cycleStatsNew);

// JS row replacements for Grade and Cycle
const jsGradeRowOld = `<td class="px-4 py-3 whitespace-nowrap font-medium text-gray-900">\${item.grade}</td>
                        <td class="px-4 py-3 text-center text-teal-600 font-semibold bg-teal-50">\${item.male}</td>
                        <td class="px-4 py-3 text-center text-pink-600 font-semibold bg-pink-50">\${item.female}</td>
                        <td class="px-4 py-3 text-center font-bold text-gray-800 bg-gray-100">\${total}</td>`;
const jsGradeRowNew = `<td class="px-5 py-3 whitespace-nowrap font-bold text-slate-200">\${item.grade}</td>
                        <td class="px-5 py-3 text-center text-teal-400 font-bold bg-teal-500/10 border-x border-[#2d3f5e]/50">\${item.male}</td>
                        <td class="px-5 py-3 text-center text-pink-400 font-bold bg-pink-500/10 border-r border-[#2d3f5e]/50">\${item.female}</td>
                        <td class="px-5 py-3 text-center font-black text-brand-300 bg-brand-500/10">\${total}</td>`;
html = html.replace(jsGradeRowOld, jsGradeRowNew);

const jsCycleRowOld = `<td class="px-4 py-3 whitespace-nowrap font-medium text-gray-900">\${cycleName}</td>
                        <td class="px-4 py-3 text-center font-bold text-blue-600 bg-blue-50">\${count}</td>`;
const jsCycleRowNew = `<td class="px-5 py-4 whitespace-nowrap font-bold text-slate-200">\${cycleName}</td>
                        <td class="px-5 py-4 text-center font-black text-brand-300 bg-brand-500/10 border-l border-[#2d3f5e]/50">\${count}</td>`;
html = html.replace(jsCycleRowOld, jsCycleRowNew);

// 6. Teachers Section
const teachersOld = `<div class="bg-white rounded-lg shadow-lg overflow-hidden mb-8 break-inside-avoid">
            <div class="bg-indigo-700 border-b border-indigo-800 px-6 py-4 flex justify-between items-center">
                <h3 class="text-xl font-bold text-white"><i class="fas fa-chalkboard-teacher mr-2"></i>Profesores Encargados</h3>
            </div>
            <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">`;
const teachersNew = `<div class="bg-[#1a2942]/60 rounded-2xl shadow-lg overflow-hidden border border-[#2d3f5e] break-inside-avoid">
            <div class="bg-[#142138] border-b border-[#2d3f5e] px-7 py-5 flex justify-between items-center">
                <h3 class="text-xl font-bold text-slate-100 flex items-center gap-3">
                    <div class="bg-purple-500/20 p-2 rounded-lg text-purple-400 text-sm"><i class="fas fa-chalkboard-teacher"></i></div>
                    Profesores Encargados
                </h3>
            </div>
            <div class="p-7 grid grid-cols-1 md:grid-cols-2 gap-6">`;
html = html.replace(teachersOld, teachersNew);

const teacher1Old = `<div class="border rounded-lg p-4 bg-indigo-50 border-indigo-100 shadow-sm hover:shadow-md transition-shadow break-inside-avoid">
                    <div class="flex items-center mb-4 border-b border-indigo-200 pb-2">
                        <div class="bg-indigo-200 p-3 rounded-full mr-3 text-indigo-700">
                            <i class="fas fa-user-graduate fa-lg"></i>
                        </div>
                        <div>
                            <h4 class="font-bold text-indigo-900 text-lg">Prof. Alejandra Alvarenga Otero</h4>
                            <span class="text-xs font-bold uppercase text-indigo-500 tracking-wider">Parvularia y I Ciclo</span>
                        </div>
                    </div>
                    <div class="pl-2">
                        <p class="text-xs text-gray-500 uppercase font-semibold mb-2">Grados Asignados:</p>
                        <div class="flex flex-wrap gap-2">
                            <span class="px-3 py-1 rounded-full text-sm font-medium bg-white text-indigo-700 border border-indigo-200 shadow-sm">Parvularia 4</span>
                            <span class="px-3 py-1 rounded-full text-sm font-medium bg-white text-indigo-700 border border-indigo-200 shadow-sm">Parvularia 5</span>
                            <span class="px-3 py-1 rounded-full text-sm font-medium bg-white text-indigo-700 border border-indigo-200 shadow-sm">Parvularia 6</span>
                            <span class="px-3 py-1 rounded-full text-sm font-medium bg-white text-indigo-700 border border-indigo-200 shadow-sm">Primer Grado</span>
                            <span class="px-3 py-1 rounded-full text-sm font-medium bg-white text-indigo-700 border border-indigo-200 shadow-sm">Segundo Grado</span>
                        </div>
                    </div>
                </div>`;
const teacher1New = `<div class="border rounded-xl p-6 bg-[#142138] border-[#2d3f5e] shadow-inner card-hover break-inside-avoid">
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
                            <span class="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#1a2942] text-slate-300 border border-[#2d3f5e] shadow-sm">Parvularia 4</span>
                            <span class="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#1a2942] text-slate-300 border border-[#2d3f5e] shadow-sm">Parvularia 5</span>
                            <span class="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#1a2942] text-slate-300 border border-[#2d3f5e] shadow-sm">Parvularia 6</span>
                            <span class="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#1a2942] text-slate-300 border border-[#2d3f5e] shadow-sm">Primer Grado</span>
                            <span class="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#1a2942] text-slate-300 border border-[#2d3f5e] shadow-sm">Segundo Grado</span>
                        </div>
                    </div>
                </div>`;
html = html.replace(teacher1Old, teacher1New);

const teacher2Old = `<div class="border rounded-lg p-4 bg-blue-50 border-blue-100 shadow-sm hover:shadow-md transition-shadow break-inside-avoid">
                    <div class="flex items-center mb-4 border-b border-blue-200 pb-2">
                        <div class="bg-blue-200 p-3 rounded-full mr-3 text-blue-700">
                            <i class="fas fa-user-tie fa-lg"></i>
                        </div>
                        <div>
                            <h4 class="font-bold text-blue-900 text-lg">Prof. Marvin Norberto Galvez Cruz</h4>
                            <span class="text-xs font-bold uppercase text-blue-500 tracking-wider">I, II y III Ciclo</span>
                        </div>
                    </div>
                    <div class="pl-2">
                        <p class="text-xs text-gray-500 uppercase font-semibold mb-2">Grados Asignados:</p>
                        <div class="flex flex-wrap gap-2">
                            <span class="px-3 py-1 rounded-full text-sm font-medium bg-white text-blue-700 border border-blue-200 shadow-sm">Tercer Grado</span>
                            <span class="px-3 py-1 rounded-full text-sm font-medium bg-white text-blue-700 border border-blue-200 shadow-sm">Cuarto Grado</span>
                            <span class="px-3 py-1 rounded-full text-sm font-medium bg-white text-blue-700 border border-blue-200 shadow-sm">Quinto Grado</span>
                            <span class="px-3 py-1 rounded-full text-sm font-medium bg-white text-blue-700 border border-blue-200 shadow-sm">Séptimo Grado</span>
                            <span class="px-3 py-1 rounded-full text-sm font-medium bg-white text-blue-700 border border-blue-200 shadow-sm">Octavo Grado</span>
                        </div>
                    </div>
                </div>`;
const teacher2New = `<div class="border rounded-xl p-6 bg-[#142138] border-[#2d3f5e] shadow-inner card-hover break-inside-avoid">
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
                            <span class="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#1a2942] text-slate-300 border border-[#2d3f5e] shadow-sm">Tercer Grado</span>
                            <span class="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#1a2942] text-slate-300 border border-[#2d3f5e] shadow-sm">Cuarto Grado</span>
                            <span class="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#1a2942] text-slate-300 border border-[#2d3f5e] shadow-sm">Quinto Grado</span>
                            <span class="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#1a2942] text-slate-300 border border-[#2d3f5e] shadow-sm">Séptimo Grado</span>
                            <span class="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#1a2942] text-slate-300 border border-[#2d3f5e] shadow-sm">Octavo Grado</span>
                        </div>
                    </div>
                </div>`;
html = html.replace(teacher2Old, teacher2New);

// 7. Student List Section
const listSectionOld = `<div class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 break-inside-avoid">
            <div class="bg-blue-800 border-b border-blue-900 px-6 py-4">
                <h3 class="text-xl font-bold text-white"><i class="fas fa-clipboard-list mr-2"></i>Nómina Oficial de Estudiantes</h3>
            </div>
            
            <div id="students-container" class="p-6 space-y-6">`;
const listSectionNew = `<div class="bg-[#1a2942]/60 rounded-2xl shadow-lg overflow-hidden border border-[#2d3f5e] break-inside-avoid">
            <div class="bg-[#142138] border-b border-[#2d3f5e] px-7 py-5 flex justify-between items-center">
                <h3 class="text-xl font-bold text-slate-100 flex items-center gap-3">
                    <div class="bg-cyan-500/20 p-2 rounded-lg text-cyan-400 text-sm"><i class="fas fa-clipboard-list"></i></div>
                    Nómina Oficial de Estudiantes
                </h3>
            </div>
            
            <div id="students-container" class="p-7 space-y-6">`;
html = html.replace(listSectionOld, listSectionNew);

const jsStudentListOld = `<li class="flex flex-col sm:flex-row sm:items-center justify-between p-3 hover:bg-gray-50 rounded border-b last:border-0 border-gray-100">
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
const jsStudentListNew = `<li class="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-[#1e293b]/50 rounded-xl border-b last:border-0 border-[#2d3f5e] transition-colors">
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
html = html.replace(jsStudentListOld, jsStudentListNew);

const jsSectionOld = `<div class="border border-gray-200 rounded-lg overflow-hidden mb-4 break-inside-avoid">
                        <div class="bg-gray-100 px-4 py-2 border-b border-gray-200 flex justify-between items-center cursor-pointer" onclick="this.nextElementSibling.classList.toggle('hidden')">
                            <h4 class="font-bold text-gray-800">\${item.grade}</h4>
                            <span class="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">\${item.male + item.female} Estudiantes</span>
                        </div>
                        <div class="p-0 transition-all duration-300">
                            <ul class="divide-y divide-gray-100">`;
const jsSectionNew = `<div class="border border-[#2d3f5e] rounded-xl overflow-hidden mb-6 break-inside-avoid shadow-sm bg-[#142138]/30">
                        <div class="bg-[#1e293b]/80 px-5 py-4 border-b border-[#2d3f5e] flex justify-between items-center cursor-pointer hover:bg-[#1e293b] transition-colors" onclick="this.nextElementSibling.classList.toggle('hidden')">
                            <h4 class="font-extrabold text-slate-100 text-sm uppercase tracking-wide flex items-center gap-2">
                                <i class="fa-solid fa-folder-open text-brand-500/70"></i> \${item.grade}
                            </h4>
                            <span class="bg-brand-500/20 text-brand-400 border border-brand-500/30 font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-widest">\${item.male + item.female} Estudiantes</span>
                        </div>
                        <div class="p-2 transition-all duration-300">
                            <ul class="divide-y divide-[#2d3f5e]/50">`;
html = html.replace(jsSectionOld, jsSectionNew);

// 8. Footer
html = html.replace(/<footer class="bg-gray-800 text-white py-6 mt-8 no-print">/, '<footer class="bg-[#0f172a] text-slate-400 py-8 mt-12 no-print border-t border-[#2d3f5e]">');
html = html.replace(/<p class="text-sm text-gray-400">/, '<p class="text-xs text-slate-500 font-semibold tracking-wider uppercase mt-2">');

// Adjust Chart text color
const chartOptionsOld = `options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: { boxWidth: 12, font: { size: 10 } }
                        }
                    }
                }`;
const chartOptionsNew = `options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    color: '#94a3b8',
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: { color: '#94a3b8', boxWidth: 12, font: { size: 11, family: 'Inter' } }
                        }
                    }
                }`;
html = html.replace(chartOptionsOld, chartOptionsNew);

// Custom Chart colors to fit dark theme
const cycleColorsOld = `const cycleColors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];`;
const cycleColorsNew = `const cycleColors = ['#3b82f6', '#10b981', '#f59e0b', '#ec4899'];`;
html = html.replace(cycleColorsOld, cycleColorsNew);

fs.writeFileSync('Matricula C.E  2026.html', html);
console.log('Matricula UI successfully rewritten to match the Premium Dark Theme of Notas module.');
