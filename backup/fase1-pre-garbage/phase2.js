const fs = require('fs');

let html = fs.readFileSync('notas.html', 'utf8');
html = html.replace(/\r\n/g, '\n');

// 1 & 2. Barra de periodos (tabs): ancho completo y más altura (p-3)
html = html.replace(
    `<div class="bg-[#1a2942] rounded-2xl p-2 border border-[#2d3f5e] shadow-lg mb-8 max-w-max overflow-hidden hide-scrollbar">`,
    `<div class="bg-[#1a2942] rounded-2xl p-3 border border-[#2d3f5e] shadow-lg mb-12 w-full overflow-hidden hide-scrollbar">`
);

// 3. Separación vertical: Cambiar mb-8 a mb-12 en tarjetas principales
// Header
html = html.replace(
    `<header class="bg-[#1a2942] rounded-2xl p-5 shadow-lg border border-[#2d3f5e] mb-8 transition-all">`,
    `<header class="bg-[#1a2942] rounded-2xl p-6 shadow-lg border border-[#2d3f5e] mb-12 transition-all">`
);

// Título Control Calificador
html = html.replace(
    `<h2 class="text-xl font-bold text-slate-100">`,
    `<h2 class="text-2xl font-extrabold tracking-wide text-slate-100">`
);

// Alinear "Agregar Alumno" perfectamente en su tarjeta
html = html.replace(
    `<div class="flex flex-col md:flex-row md:items-center justify-between bg-[#1a2942] p-5 rounded-2xl border border-[#2d3f5e] shadow-lg mb-6">`,
    `<div class="flex flex-col md:flex-row md:items-center justify-between bg-[#1a2942] p-6 rounded-2xl border border-[#2d3f5e] shadow-lg mb-10">`
);

// Padding de tabla (p-2 -> p-5)
html = html.replace(
    `<div class="bg-[#1a2942] rounded-2xl shadow-lg border border-[#2d3f5e] p-2 mb-8">`,
    `<div class="bg-[#1a2942] rounded-2xl shadow-lg border border-[#2d3f5e] p-5 mb-12">`
);

// Tarjeta de Criterios (mb-8 -> mb-12, asegurar padding)
html = html.replace(
    `<div class="bg-[#1a2942] rounded-2xl p-6 border border-[#2d3f5e] shadow-lg mb-8">`,
    `<div class="bg-[#1a2942] rounded-2xl p-6 border border-[#2d3f5e] shadow-lg mb-12">`
);

// Consolidado card
html = html.replace(
    `<div class="bg-[#1a2942] rounded-2xl p-6 border border-[#2d3f5e] shadow-lg mb-8">`,
    `<div class="bg-[#1a2942] rounded-2xl p-6 border border-[#2d3f5e] shadow-lg mb-12">`
);
html = html.replace(
    `<div class="flex flex-col md:flex-row md:items-center justify-between mb-6 border-b border-[#2d3f5e]/60 pb-5">`,
    `<div class="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b border-[#2d3f5e]/60 pb-6">`
);
html = html.replace(
    `<div class="bg-[#142138] rounded-2xl border border-[#2d3f5e] p-2 shadow-inner overflow-hidden">`,
    `<div class="bg-[#142138] rounded-2xl border border-[#2d3f5e] p-5 shadow-inner overflow-hidden">`
);

fs.writeFileSync('notas.html', html);
console.log('HTML updated');

// Update CSS opacity
let css = fs.readFileSync('styles.css', 'utf8');
css = css.replace('opacity: 0.08; /* Subimos la opacidad un poco */', 'opacity: 0.02; /* Reducida para no distraer */');
fs.writeFileSync('styles.css', css);
console.log('CSS updated');
