const fs = require('fs');

let content = fs.readFileSync('notas.html', 'utf8');

// Theming mappings
const replacements = {
  // Backgrounds
  'bg-white/70': 'bg-[#1a2942]/70',
  'bg-white/90': 'bg-[#1a2942]/90',
  'bg-white': 'bg-[#1a2942]',
  'bg-slate-50/50': 'bg-[#0c1a30]/50',
  'bg-slate-50': 'bg-[#0c1a30]',
  'bg-slate-100/50': 'bg-[#142138]/50',
  'bg-slate-100': 'bg-[#142138]',
  'bg-slate-200/60': 'bg-[#23324d]/60',
  'bg-slate-200': 'bg-[#23324d]',
  'bg-slate-300': 'bg-[#3f567a]',
  // Borders
  'border-slate-100': 'border-[#23324d]',
  'border-slate-200': 'border-[#2d3f5e]',
  'border-slate-300': 'border-[#3f567a]',
  // Text colors
  'text-slate-900': 'text-slate-50',
  'text-slate-800': 'text-slate-100',
  'text-slate-700': 'text-slate-200',
  'text-slate-600': 'text-slate-300',
  'text-slate-500': 'text-slate-400',
  // Custom linear gradient in inline CSS
  'background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);': 'background: var(--bg-base);',
  'background: rgba(255, 255, 255, 0.85);': 'background: rgba(26, 41, 66, 0.85);',
  'border: 1px solid rgba(255, 255, 255, 0.5);': 'border: 1px solid rgba(45, 63, 94, 0.5);',
  'background: #f1f5f9;': 'background: #0c1a30;', // scrollbar track
  'background: #cbd5e1;': 'background: #2d3f5e;', // scrollbar thumb
  'background: #94a3b8;': 'background: #3f567a;' // scrollbar thumb hover
};

for (const [search, replace] of Object.entries(replacements)) {
  content = content.split(search).join(replace);
}

fs.writeFileSync('notas.html', content);
console.log('Conversion completed.');
