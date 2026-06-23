/**
 * AliControl — Sistema de Control de Alimentos Escolares
 * app.js — Lógica de negocio, cálculos y persistencia
 */

'use strict';

/* ═══════════════════════════════════════════════════════════
   1. CONSTANTES Y CONFIGURACIÓN POR DEFECTO
═══════════════════════════════════════════════════════════ */

const FOODS = [
  { key: 'arroz',          label: 'Arroz',        icon: '🍚' },
  { key: 'frijol',         label: 'Frijol',        icon: '🫘' },
  { key: 'aceite',         label: 'Aceite',        icon: '🫙' },
  { key: 'azucar',         label: 'Azúcar',        icon: '🍬' },
  { key: 'leche',          label: 'Leche',         icon: '🥛' },
  { key: 'fortificada',    label: 'Fort. Vit.',    icon: '💊' },
  { key: 'cereal_vainilla',label: 'Cereal Vain.',  icon: '🌾' },
  { key: 'cereal',         label: 'Cereal',        icon: '🥣' },
];

const CYCLES = ['parvularia', 'primer_ciclo', '2_y_3_ciclo'];
const CYCLE_LABELS = {
  parvularia:   'Parvularia',
  primer_ciclo: '1° Ciclo',
  '2_y_3_ciclo':'2° y 3° Ciclo',
};

// Porciones en gramos por alumno — EXACTAS del Excel (fila de encabezado de cada tabla)
// Excel header row confirma: ARROZ 25g, FRIJOL 25g, ACEITE 10g, AZUCAR 12g,
//                            LECHE 30g, FORTIFICADA 30g, CEREAL VAINILLA 30g, CEREAL 30g
const DEFAULT_PORTIONS = {
  arroz:          25,   // g/alumno — Excel: 'ARROZ 25'
  frijol:         25,   // g/alumno — Excel: 'FRIJOL 25'
  aceite:         10,   // g/alumno — Excel: 'ACEITE 10g'
  azucar:         12,   // g/alumno — Excel: 'AZUCAR 12g'
  leche:          30,   // g/alumno — Excel: 'LECHE 30gr'
  fortificada:    30,   // g/alumno — Excel: 'FORTIFICADA 30g'
  cereal_vainilla:30,   // g/alumno — Excel: 'CEREAL DE VAINILLA 30gr'
  cereal:         30,   // g/alumno — Excel: 'CEREAL 30gr'
};

// Peso en kg de cada unidad/paquete en bodega
const DEFAULT_PACKAGE_WEIGHTS = {
  arroz:          45.36,   // saco de 100 lbs = 45.36 kg
  frijol:         45.36,
  aceite:         5.0,
  azucar:         50.0,
  leche:          25.0,
  fortificada:    25.0,
  cereal_vainilla:9.1,
  cereal:         9.1,
};

// Stock inicial del mes en kg (según el Excel de Junio 2026)
const DEFAULT_INITIAL_STOCK = {
  arroz:          272.16,
  frijol:         272.16,
  aceite:         30.0,
  azucar:         200.0,
  leche:          100.0,
  fortificada:    100.0,
  cereal_vainilla:45.5,
  cereal:         45.5,
};

// Datos del mes de Junio 2026 extraídos directamente del archivo Excel
// Valores = número de alumnos que consumieron cada alimento (NO kilogramos)
// 22 fechas exactas según el Excel original — sin inventar ni omitir ninguna
const JUNE_2026_RAW = {
  "2026-06-01": {
    parvularia:    { arroz:0,  frijol:0,  aceite:0,  azucar:11, leche:11, fortificada:0,  cereal_vainilla:11, cereal:0 },
    primer_ciclo:  { arroz:0,  frijol:0,  aceite:0,  azucar:8,  leche:8,  fortificada:0,  cereal_vainilla:8,  cereal:0 },
    "2_y_3_ciclo": { arroz:0,  frijol:0,  aceite:0,  azucar:11, leche:11, fortificada:0,  cereal_vainilla:11, cereal:0 },
  },
  "2026-06-02": {
    parvularia:    { arroz:11, frijol:11, aceite:11, azucar:11, leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
    primer_ciclo:  { arroz:8,  frijol:8,  aceite:8,  azucar:8,  leche:8,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
    "2_y_3_ciclo": { arroz:11, frijol:11, aceite:11, azucar:11, leche:11, fortificada:0,  cereal_vainilla:0,  cereal:0 },
  },
  "2026-06-03": {
    parvularia:    { arroz:0,  frijol:0,  aceite:0,  azucar:11, leche:11, fortificada:0,  cereal_vainilla:11, cereal:0 },
    primer_ciclo:  { arroz:0,  frijol:0,  aceite:0,  azucar:8,  leche:8,  fortificada:0,  cereal_vainilla:8,  cereal:0 },
    "2_y_3_ciclo": { arroz:0,  frijol:0,  aceite:0,  azucar:11, leche:11, fortificada:0,  cereal_vainilla:11, cereal:0 },
  },
  "2026-06-04": {
    parvularia:    { arroz:0,  frijol:11, aceite:0,  azucar:11, leche:11, fortificada:0,  cereal_vainilla:0,  cereal:0 },
    primer_ciclo:  { arroz:0,  frijol:8,  aceite:0,  azucar:8,  leche:8,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
    "2_y_3_ciclo": { arroz:0,  frijol:11, aceite:0,  azucar:11, leche:11, fortificada:0,  cereal_vainilla:0,  cereal:0 },
  },
  "2026-06-05": {
    parvularia:    { arroz:0,  frijol:0,  aceite:0,  azucar:11, leche:11, fortificada:0,  cereal_vainilla:11, cereal:0 },
    primer_ciclo:  { arroz:0,  frijol:0,  aceite:0,  azucar:8,  leche:8,  fortificada:0,  cereal_vainilla:8,  cereal:0 },
    "2_y_3_ciclo": { arroz:0,  frijol:0,  aceite:0,  azucar:11, leche:11, fortificada:0,  cereal_vainilla:11, cereal:0 },
  },
  "2026-06-08": {
    parvularia:    { arroz:0,  frijol:0,  aceite:0,  azucar:11, leche:11, fortificada:0,  cereal_vainilla:0,  cereal:0 },
    primer_ciclo:  { arroz:0,  frijol:0,  aceite:0,  azucar:8,  leche:8,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
    "2_y_3_ciclo": { arroz:0,  frijol:0,  aceite:0,  azucar:11, leche:11, fortificada:0,  cereal_vainilla:0,  cereal:0 },
  },
  "2026-06-09": {
    parvularia:    { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
    primer_ciclo:  { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
    "2_y_3_ciclo": { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
  },
  "2026-06-10": {
    parvularia:    { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
    primer_ciclo:  { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
    "2_y_3_ciclo": { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
  },
  "2026-06-11": {
    parvularia:    { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
    primer_ciclo:  { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
    "2_y_3_ciclo": { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
  },
  "2026-06-12": {
    parvularia:    { arroz:0,  frijol:0,  aceite:0,  azucar:11, leche:11, fortificada:0,  cereal_vainilla:0,  cereal:0 },
    primer_ciclo:  { arroz:0,  frijol:0,  aceite:0,  azucar:8,  leche:8,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
    "2_y_3_ciclo": { arroz:0,  frijol:0,  aceite:0,  azucar:11, leche:11, fortificada:0,  cereal_vainilla:0,  cereal:0 },
  },
  "2026-06-15": {
    parvularia:    { arroz:11, frijol:0,  aceite:0,  azucar:11, leche:11, fortificada:0,  cereal_vainilla:0,  cereal:0 },
    primer_ciclo:  { arroz:8,  frijol:0,  aceite:0,  azucar:8,  leche:8,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
    "2_y_3_ciclo": { arroz:11, frijol:0,  aceite:0,  azucar:11, leche:11, fortificada:0,  cereal_vainilla:0,  cereal:0 },
  },
  "2026-06-16": {
    parvularia:    { arroz:11, frijol:11, aceite:0,  azucar:11, leche:0,  fortificada:11, cereal_vainilla:0,  cereal:0 },
    primer_ciclo:  { arroz:8,  frijol:8,  aceite:0,  azucar:8,  leche:0,  fortificada:8,  cereal_vainilla:0,  cereal:0 },
    "2_y_3_ciclo": { arroz:11, frijol:11, aceite:0,  azucar:11, leche:0,  fortificada:11, cereal_vainilla:0,  cereal:0 },
  },
  "2026-06-17": {
    parvularia:    { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
    primer_ciclo:  { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
    "2_y_3_ciclo": { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
  },
  "2026-06-18": {
    parvularia:    { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
    primer_ciclo:  { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
    "2_y_3_ciclo": { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
  },
  "2026-06-19": {
    parvularia:    { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
    primer_ciclo:  { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
    "2_y_3_ciclo": { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
  },
  "2026-06-22": {
    parvularia:    { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
    primer_ciclo:  { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
    "2_y_3_ciclo": { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
  },
  "2026-06-23": {
    parvularia:    { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
    primer_ciclo:  { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
    "2_y_3_ciclo": { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
  },
  "2026-06-24": {
    parvularia:    { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
    primer_ciclo:  { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
    "2_y_3_ciclo": { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
  },
  "2026-06-25": {
    parvularia:    { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
    primer_ciclo:  { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
    "2_y_3_ciclo": { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
  },
  "2026-06-26": {
    parvularia:    { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
    primer_ciclo:  { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
    "2_y_3_ciclo": { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
  },
  "2026-06-29": {
    parvularia:    { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
    primer_ciclo:  { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
    "2_y_3_ciclo": { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
  },
  "2026-06-30": {
    parvularia:    { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
    primer_ciclo:  { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
    "2_y_3_ciclo": { arroz:0,  frijol:0,  aceite:0,  azucar:0,  leche:0,  fortificada:0,  cereal_vainilla:0,  cereal:0 },
  },
};

const DAYS_ES = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
const MONTHS_ES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];

/* ═══════════════════════════════════════════════════════════
   2. ESTADO GLOBAL
═══════════════════════════════════════════════════════════ */

let STATE = {
  records: {},      // { 'YYYY-MM-DD': { parvularia:{}, primer_ciclo:{}, '2_y_3_ciclo':{} } }
  ingresos: [],     // [{ id, date, proveedor, nota, items: { foodKey: kgAmount, ... } }]
  config: {
    portions:       { ...DEFAULT_PORTIONS },
    packageWeights: { ...DEFAULT_PACKAGE_WEIGHTS },
    initialStock:   { ...DEFAULT_INITIAL_STOCK },
  },
  activeMonth: '2026-06',
  currentCycleView: 'parvularia',
};

/* ═══════════════════════════════════════════════════════════
   3. PERSISTENCIA (localStorage)
═══════════════════════════════════════════════════════════ */

function saveState() {
  try {
    localStorage.setItem('alicontrol_v2', JSON.stringify(STATE));
  } catch(e) {
    showToast('⚠️ No se pudo guardar localmente.', 'error');
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem('alicontrol_v2');
    if (raw) {
      const loaded = JSON.parse(raw);
      // Merge carefully so defaults for new keys still apply
      STATE.records = loaded.records || {};
      STATE.ingresos = loaded.ingresos || [];
      if (loaded.config) {
        STATE.config.portions       = { ...DEFAULT_PORTIONS,        ...loaded.config.portions };
        STATE.config.packageWeights = { ...DEFAULT_PACKAGE_WEIGHTS, ...loaded.config.packageWeights };
        STATE.config.initialStock   = { ...DEFAULT_INITIAL_STOCK,   ...loaded.config.initialStock };
      }
      STATE.activeMonth = loaded.activeMonth || '2026-06';
    } else {
      // First run — seed with June data
      seedJuneData();
    }
  } catch(e) {
    seedJuneData();
  }
}

function seedJuneData() {
  // Convert raw Excel attendance numbers to proper record format
  Object.entries(JUNE_2026_RAW).forEach(([date, cycles]) => {
    STATE.records[date] = {};
    CYCLES.forEach(cycle => {
      STATE.records[date][cycle] = { ...cycles[cycle] };
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   4. CÁLCULOS MATEMÁTICOS
═══════════════════════════════════════════════════════════ */

/**
 * Convierte alumnos a kg consumidos
 * FÓRMULA EXACTA DEL EXCEL:
 *   Gramos totales = Alumnos × Porción (g)
 *   Libras         = Gramos ÷ 453.59
 *   Kg             = Libras  ÷ 2.2
 * Equivalente a: kg = (Alumnos × Porción) / (453.59 × 2.2)
 */
function alumnosToKg(alumnos, foodKey) {
  const por = STATE.config.portions[foodKey] || 0;
  return (alumnos * por) / (453.59 * 2.2);
}

/**
 * Calcula el consumo en kg para una fecha, ciclo y alimento dados.
 */
function getConsumptionKg(date, cycle, foodKey) {
  const rec = STATE.records[date];
  if (!rec || !rec[cycle]) return 0;
  const alumnos = rec[cycle][foodKey] || 0;
  return alumnosToKg(alumnos, foodKey);
}

/**
 * Consumo total diario (todos los ciclos) de un alimento en kg.
 */
function getDayTotalKg(date, foodKey) {
  return CYCLES.reduce((sum, cycle) => sum + getConsumptionKg(date, cycle, foodKey), 0);
}

/**
 * Suma mensual por alimento y ciclo.
 */
function getMonthTotal(foodKey, cycle = null) {
  const monthDates = getMonthDates();
  return monthDates.reduce((sum, date) => {
    if (cycle) {
      return sum + getConsumptionKg(date, cycle, foodKey);
    }
    return sum + getDayTotalKg(date, foodKey);
  }, 0);
}

/**
 * Obtiene las fechas del mes activo ordenadas.
 */
function getMonthDates() {
  return Object.keys(STATE.records)
    .filter(d => d.startsWith(STATE.activeMonth))
    .sort();
}

/**
 * Saldo restante de un alimento al final del mes.
 */
function getStockRemaining(foodKey) {
  const initial = STATE.config.initialStock[foodKey] || 0;
  const consumed = getMonthTotal(foodKey);
  return Math.max(0, initial - consumed);
}

/**
 * Saldo acumulado hasta (inclusive) una fecha.
 */
function getRunningBalance(foodKey, upToDate) {
  const dates = getMonthDates().filter(d => d <= upToDate);
  const initial = STATE.config.initialStock[foodKey] || 0;
  const consumed = dates.reduce((sum, d) => sum + getDayTotalKg(d, foodKey), 0);
  return Math.max(0, initial - consumed);
}

/**
 * kg → libras (1 kg = 2.20462 lbs)
 */
function kgToLbs(kg) { return kg * 2.20462; }

/**
 * Número de paquetes completos dados kg y peso del paquete.
 */
function kgToPacks(kg, foodKey) {
  const pw = STATE.config.packageWeights[foodKey] || 1;
  return kg / pw;
}

/* ═══════════════════════════════════════════════════════════
   5. FORMATEO
═══════════════════════════════════════════════════════════ */

const fmt2 = n => n.toFixed(2);
const fmt3 = n => n.toFixed(3);
const fmtN = (n, d=2) => parseFloat(n.toFixed(d)).toLocaleString('es-SV', { minimumFractionDigits: d, maximumFractionDigits: d });

function formatDateDisplay(dateStr) {
  // dateStr: 'YYYY-MM-DD'
  const [y, m, d] = dateStr.split('-').map(Number);
  const dayName = DAYS_ES[new Date(y, m-1, d).getDay()];
  return `${dayName.charAt(0).toUpperCase()+dayName.slice(1)}, ${d} de ${MONTHS_ES[m-1]} de ${y}`;
}

function getDayName(dateStr) {
  const [y,m,d] = dateStr.split('-').map(Number);
  const dn = DAYS_ES[new Date(y,m-1,d).getDay()];
  return dn.charAt(0).toUpperCase()+dn.slice(1);
}

/* ═══════════════════════════════════════════════════════════
   6. SIDEBAR NAVIGATION
═══════════════════════════════════════════════════════════ */

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar-menu');
  const overlay = document.getElementById('sidebar-overlay');
  const btn = document.getElementById('hamburger-btn');
  const isOpen = sidebar.classList.contains('open');

  if (isOpen) {
    closeSidebar();
  } else {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    btn.classList.add('active');
  }
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar-menu');
  const overlay = document.getElementById('sidebar-overlay');
  const btn = document.getElementById('hamburger-btn');
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
  btn.classList.remove('active');
}

function navigateTab(tabId, btnEl) {
  // Update sidebar active state
  document.querySelectorAll('.sidebar-nav-btn').forEach(b => b.classList.remove('active'));
  btnEl.classList.add('active');

  // Switch panels
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.getElementById(`panel-${tabId}`).classList.add('active');

  // Close sidebar
  closeSidebar();

  // Refresh content
  refreshActiveTab(tabId);
}

function refreshActiveTab(tabId) {
  switch(tabId) {
    case 'dashboard':     renderDashboard();    break;
    case 'ingreso':       renderIngresoHistory(); break;
    case 'kardex':        renderKardex();       break;
    case 'tabla-amarilla':renderYellowTable(); renderAmarillaDetail(); break;
    case 'ciclos':        renderCycleView(STATE.currentCycleView); break;
    case 'config':        renderConfig();       break;
  }
}

/* ═══════════════════════════════════════════════════════════
   7. DASHBOARD
═══════════════════════════════════════════════════════════ */

function renderDashboard() {
  const dates = getMonthDates();
  const lastDate = dates[dates.length - 1];

  // KPIs
  document.getElementById('kpi-days').textContent = dates.length;

  if (lastDate) {
    const rec = STATE.records[lastDate];
    const totalStudents = CYCLES.reduce((s, c) => {
      // Sum distinct student counts: max alumnos for any food in that cycle
      const maxStudents = Math.max(...FOODS.map(f => rec[c]?.[f.key] || 0));
      return s + maxStudents;
    }, 0);
    document.getElementById('kpi-students').textContent = totalStudents;
    document.getElementById('kpi-students-sub').textContent = formatDateDisplay(lastDate).split(',')[0] + ' ' + lastDate.split('-')[2];

    const totalConsKg = FOODS.reduce((s, f) => s + getDayTotalKg(lastDate, f.key), 0);
    document.getElementById('kpi-consumption').textContent = fmtN(totalConsKg, 3);
  }

  // Stock bars
  const container = document.getElementById('stock-bars-container');
  container.innerHTML = '';
  FOODS.forEach(f => {
    const initial   = STATE.config.initialStock[f.key] || 0;
    const remaining = getStockRemaining(f.key);
    const packs     = kgToPacks(remaining, f.key);
    const pct       = initial > 0 ? (remaining / initial * 100) : 0;
    const cls       = pct > 50 ? 'progress-ok' : pct > 20 ? 'progress-warn' : 'progress-low';
    const badgeClass = pct > 50 ? 'badge-green' : pct > 20 ? 'badge-gold' : 'badge-rose';
    const badgeText  = pct > 50 ? 'Suficiente' : pct > 20 ? 'Moderado' : 'Stock Bajo';

    container.insertAdjacentHTML('beforeend', `
      <div class="stock-card">
        <div class="stock-card-header">
          <div class="stock-name">${f.icon} ${f.label}</div>
          <div class="stock-values">
            <div class="stock-kg">${fmtN(remaining, 2)} kg</div>
            <div class="stock-packs">${fmtN(packs, 1)} paquetes</div>
          </div>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill ${cls}" style="width:${Math.min(100,pct).toFixed(1)}%"></div>
        </div>
        <div class="flex items-center" style="justify-content:space-between;margin-top:0.45rem">
          <span class="text-sm text-muted">${fmtN(pct,1)}% restante</span>
          <span class="badge ${badgeClass}">${badgeText}</span>
        </div>
      </div>
    `);
  });

  // Recent records table
  const tbody = document.getElementById('recent-tbody');
  tbody.innerHTML = '';
  const recentDates = [...dates].reverse().slice(0, 7);
  if (recentDates.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" class="empty-state" style="text-align:center;padding:2rem;color:var(--text-muted)">Sin registros aún</td></tr>`;
    return;
  }
  recentDates.forEach(date => {
    const rec = STATE.records[date];
    const parvAlum  = Math.max(...FOODS.map(f => rec.parvularia?.[f.key] || 0));
    const c1Alum    = Math.max(...FOODS.map(f => rec.primer_ciclo?.[f.key] || 0));
    const c23Alum   = Math.max(...FOODS.map(f => rec['2_y_3_ciclo']?.[f.key] || 0));
    tbody.insertAdjacentHTML('beforeend', `
      <tr>
        <td class="date-cell">${date}</td>
        <td class="num">${parvAlum}</td>
        <td class="num">${c1Alum}</td>
        <td class="num">${c23Alum}</td>
        <td class="num">${fmtN(getDayTotalKg(date,'arroz'),3)}</td>
        <td class="num">${fmtN(getDayTotalKg(date,'frijol'),3)}</td>
        <td class="num">${fmtN(getDayTotalKg(date,'azucar'),3)}</td>
        <td class="num">${fmtN(getDayTotalKg(date,'leche'),3)}</td>
        <td class="num">${fmtN(getDayTotalKg(date,'cereal_vainilla'),3)}</td>
      </tr>
    `);
  });
}

/* ═══════════════════════════════════════════════════════════
   8. REGISTRO DIARIO
═══════════════════════════════════════════════════════════ */

function initRegistroForm() {
  // Set today's date as default
  const today = new Date();
  const dd = today.toISOString().split('T')[0];
  document.getElementById('reg-date').value = dd;

  // Build food checkboxes for each cycle group
  [
    { containerId: 'parv-foods',   prefix: 'parv'   },
    { containerId: 'ciclo1-foods', prefix: 'ciclo1' },
    { containerId: 'ciclo23-foods',prefix: 'ciclo23'},
  ].forEach(({ containerId, prefix }) => {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    FOODS.forEach(f => {
      container.insertAdjacentHTML('beforeend', `
        <label class="food-toggle" title="${f.label}">
          <input type="checkbox" id="${prefix}-${f.key}" value="${f.key}"
                 onchange="updatePreview()" />
          <div class="food-toggle-label">
            <span class="food-icon">${f.icon}</span>
            <span class="food-name">${f.label}</span>
          </div>
        </label>
      `);
    });
  });

  // Add listeners for student inputs
  ['parv-students','ciclo1-students','ciclo23-students'].forEach(id => {
    document.getElementById(id).addEventListener('input', updatePreview);
  });

  updatePreview();
}

function adjustCounter(inputId, delta) {
  const el = document.getElementById(inputId);
  const val = parseInt(el.value || 0) + delta;
  el.value = Math.max(0, val);
  updatePreview();
}

function updatePreview() {
  const tbody = document.getElementById('preview-tbody');
  const tfoot = document.getElementById('preview-tfoot');
  tbody.innerHTML = '';

  const parvStudents  = parseInt(document.getElementById('parv-students').value)  || 0;
  const c1Students    = parseInt(document.getElementById('ciclo1-students').value) || 0;
  const c23Students   = parseInt(document.getElementById('ciclo23-students').value)|| 0;

  let totalRow = { parv:0, c1:0, c23:0, total:0 };

  FOODS.forEach(f => {
    const parvChecked  = document.getElementById(`parv-${f.key}`)?.checked;
    const c1Checked    = document.getElementById(`ciclo1-${f.key}`)?.checked;
    const c23Checked   = document.getElementById(`ciclo23-${f.key}`)?.checked;

    const parvKg  = parvChecked  ? alumnosToKg(parvStudents,  f.key) : 0;
    const c1Kg    = c1Checked    ? alumnosToKg(c1Students,    f.key) : 0;
    const c23Kg   = c23Checked   ? alumnosToKg(c23Students,   f.key) : 0;
    const totalKg = parvKg + c1Kg + c23Kg;

    if (!parvChecked && !c1Checked && !c23Checked) return;

    totalRow.parv  += parvKg;
    totalRow.c1    += c1Kg;
    totalRow.c23   += c23Kg;
    totalRow.total += totalKg;

    tbody.insertAdjacentHTML('beforeend', `
      <tr>
        <td>${f.icon} ${f.label}</td>
        <td class="num">${parvChecked  ? fmtN(parvKg, 3)  : '—'}</td>
        <td class="num">${c1Checked    ? fmtN(c1Kg, 3)    : '—'}</td>
        <td class="num">${c23Checked   ? fmtN(c23Kg, 3)   : '—'}</td>
        <td class="num text-gold font-bold">${fmtN(totalKg, 3)}</td>
      </tr>
    `);
  });

  tfoot.innerHTML = `
    <tr class="tfoot-row">
      <td><strong>TOTAL</strong></td>
      <td class="num">${fmtN(totalRow.parv,3)}</td>
      <td class="num">${fmtN(totalRow.c1,3)}</td>
      <td class="num">${fmtN(totalRow.c23,3)}</td>
      <td class="num">${fmtN(totalRow.total,3)}</td>
    </tr>
  `;
}

function saveDayRecord() {
  const date = document.getElementById('reg-date').value;
  if (!date) { showToast('⚠️ Selecciona una fecha.', 'error'); return; }

  const parvStudents  = parseInt(document.getElementById('parv-students').value)  || 0;
  const c1Students    = parseInt(document.getElementById('ciclo1-students').value) || 0;
  const c23Students   = parseInt(document.getElementById('ciclo23-students').value)|| 0;

  const record = {
    parvularia:    {},
    primer_ciclo:  {},
    '2_y_3_ciclo': {},
  };

  FOODS.forEach(f => {
    record.parvularia[f.key]     = document.getElementById(`parv-${f.key}`)?.checked   ? parvStudents  : 0;
    record.primer_ciclo[f.key]   = document.getElementById(`ciclo1-${f.key}`)?.checked  ? c1Students    : 0;
    record['2_y_3_ciclo'][f.key] = document.getElementById(`ciclo23-${f.key}`)?.checked ? c23Students   : 0;
  });

  // Warn if overwriting
  const isNew = !STATE.records[date];
  STATE.records[date] = record;
  saveState();

  showToast(isNew
    ? `✅ Registro del ${date} guardado exitosamente.`
    : `✏️ Registro del ${date} actualizado.`,
    'success'
  );

  renderDashboard();
}

function clearDayForm() {
  ['parv-students','ciclo1-students','ciclo23-students'].forEach(id => {
    document.getElementById(id).value = 0;
  });
  document.querySelectorAll('.food-toggle input[type=checkbox]').forEach(cb => cb.checked = false);
  updatePreview();
}

/* ═══════════════════════════════════════════════════════════
   9. KARDEX
═══════════════════════════════════════════════════════════ */

function initKardexProductSelect() {
  const sel = document.getElementById('kardex-product-select');
  sel.innerHTML = '';
  FOODS.forEach(f => {
    const opt = document.createElement('option');
    opt.value = f.key;
    opt.textContent = `${f.icon} ${f.label}`;
    sel.appendChild(opt);
  });
}

function renderKardex() {
  const foodKey = document.getElementById('kardex-product-select')?.value || FOODS[0].key;
  const food    = FOODS.find(f => f.key === foodKey);
  const dates   = getMonthDates();
  const tbody   = document.getElementById('kardex-tbody');
  const tfoot   = document.getElementById('kardex-tfoot');
  tbody.innerHTML = '';

  let runningBalance = STATE.config.initialStock[foodKey] || 0;
  let totalConsumed  = 0;

  dates.forEach((date, idx) => {
    const parvKg  = getConsumptionKg(date, 'parvularia',    foodKey);
    const c1Kg    = getConsumptionKg(date, 'primer_ciclo',   foodKey);
    const c23Kg   = getConsumptionKg(date, '2_y_3_ciclo',   foodKey);
    const totalKg = parvKg + c1Kg + c23Kg;

    // For first day, entrada = initial stock; otherwise 0
    const entrada = idx === 0 ? (STATE.config.initialStock[foodKey] || 0) : 0;
    runningBalance -= totalKg;
    runningBalance  = Math.max(0, runningBalance);
    totalConsumed  += totalKg;

    tbody.insertAdjacentHTML('beforeend', `
      <tr>
        <td class="date-cell">${date}</td>
        <td>${getDayName(date)}</td>
        <td class="num text-green">${idx===0 ? fmtN(entrada,3) : '—'}</td>
        <td class="num">${fmtN(parvKg,3)}</td>
        <td class="num">${fmtN(c1Kg,3)}</td>
        <td class="num">${fmtN(c23Kg,3)}</td>
        <td class="num text-rose">${fmtN(totalKg,3)}</td>
        <td class="num text-cyan font-bold">${fmtN(runningBalance,3)}</td>
        <td class="num">${fmtN(kgToLbs(runningBalance),3)}</td>
      </tr>
    `);
  });

  tfoot.innerHTML = `
    <tr class="tfoot-row">
      <td colspan="6"><strong>TOTAL CONSUMIDO — ${food?.label}</strong></td>
      <td class="num">${fmtN(totalConsumed,3)}</td>
      <td class="num">${fmtN(runningBalance,3)}</td>
      <td class="num">${fmtN(kgToLbs(runningBalance),3)}</td>
    </tr>
  `;
}

/* ═══════════════════════════════════════════════════════════
   10. TABLA AMARILLA (RESUMEN)
═══════════════════════════════════════════════════════════ */

function renderYellowTable() {
  const tbody = document.getElementById('yellow-tbody');
  const tfoot = document.getElementById('yellow-tfoot');
  tbody.innerHTML = '';

  let totals = { initial:0, consumed:0, parv:0, c1:0, c23:0, remaining:0 };

  FOODS.forEach(f => {
    const initial    = STATE.config.initialStock[f.key] || 0;
    const consumed   = getMonthTotal(f.key);
    const parvCons   = getMonthTotal(f.key, 'parvularia');
    const c1Cons     = getMonthTotal(f.key, 'primer_ciclo');
    const c23Cons    = getMonthTotal(f.key, '2_y_3_ciclo');
    const remaining  = Math.max(0, initial - consumed);
    const remLbs     = kgToLbs(remaining);
    const packs      = kgToPacks(remaining, f.key);

    totals.initial   += initial;
    totals.consumed  += consumed;
    totals.parv      += parvCons;
    totals.c1        += c1Cons;
    totals.c23       += c23Cons;
    totals.remaining += remaining;

    tbody.insertAdjacentHTML('beforeend', `
      <tr>
        <td>${f.icon} <strong>${f.label}</strong></td>
        <td class="num">${fmtN(initial,2)}</td>
        <td class="num text-rose">${fmtN(consumed,3)}</td>
        <td class="num">${fmtN(parvCons,3)}</td>
        <td class="num">${fmtN(c1Cons,3)}</td>
        <td class="num">${fmtN(c23Cons,3)}</td>
        <td class="num text-green font-bold">${fmtN(remaining,3)}</td>
        <td class="num">${fmtN(remLbs,3)}</td>
        <td class="num text-gold">${fmtN(packs,2)}</td>
      </tr>
    `);
  });

  tfoot.innerHTML = `
    <tr class="tfoot-row">
      <td><strong>TOTALES</strong></td>
      <td class="num">${fmtN(totals.initial,2)}</td>
      <td class="num">${fmtN(totals.consumed,3)}</td>
      <td class="num">${fmtN(totals.parv,3)}</td>
      <td class="num">${fmtN(totals.c1,3)}</td>
      <td class="num">${fmtN(totals.c23,3)}</td>
      <td class="num">${fmtN(totals.remaining,3)}</td>
      <td class="num">${fmtN(kgToLbs(totals.remaining),3)}</td>
      <td></td>
    </tr>
  `;
}

function initAmarillaProductSelect() {
  const sel = document.getElementById('amarilla-product-select');
  sel.innerHTML = '';
  FOODS.forEach(f => {
    const opt = document.createElement('option');
    opt.value = f.key;
    opt.textContent = `${f.icon} ${f.label}`;
    sel.appendChild(opt);
  });
}

function renderAmarillaDetail() {
  const foodKey  = document.getElementById('amarilla-product-select')?.value || FOODS[0].key;
  const food     = FOODS.find(f => f.key === foodKey);
  const dates    = getMonthDates();
  const tbody    = document.getElementById('amarilla-detail-tbody');
  const tfoot    = document.getElementById('amarilla-detail-tfoot');
  tbody.innerHTML = '';

  let balance  = STATE.config.initialStock[foodKey] || 0;
  let totP=0, totC1=0, totC23=0, totAll=0;
  let totPA=0, totC1A=0, totC23A=0;

  dates.forEach(date => {
    const rec = STATE.records[date] || {};
    const parvAlum  = rec.parvularia?.[foodKey]    || 0;
    const c1Alum    = rec.primer_ciclo?.[foodKey]  || 0;
    const c23Alum   = rec['2_y_3_ciclo']?.[foodKey]|| 0;

    const parvKg  = alumnosToKg(parvAlum,  foodKey);
    const c1Kg    = alumnosToKg(c1Alum,    foodKey);
    const c23Kg   = alumnosToKg(c23Alum,   foodKey);
    const totalKg = parvKg + c1Kg + c23Kg;

    balance -= totalKg;
    balance  = Math.max(0, balance);

    totP    += parvKg;  totPA   += parvAlum;
    totC1   += c1Kg;    totC1A  += c1Alum;
    totC23  += c23Kg;   totC23A += c23Alum;
    totAll  += totalKg;

    tbody.insertAdjacentHTML('beforeend', `
      <tr>
        <td class="date-cell">${date}</td>
        <td>${getDayName(date)}</td>
        <td class="num">${parvAlum}</td>
        <td class="num">${fmtN(parvKg,3)}</td>
        <td class="num">${c1Alum}</td>
        <td class="num">${fmtN(c1Kg,3)}</td>
        <td class="num">${c23Alum}</td>
        <td class="num">${fmtN(c23Kg,3)}</td>
        <td class="num text-gold font-bold">${fmtN(totalKg,3)}</td>
        <td class="num text-cyan">${fmtN(balance,3)}</td>
      </tr>
    `);
  });

  tfoot.innerHTML = `
    <tr class="tfoot-row">
      <td colspan="2"><strong>TOTAL — ${food?.label}</strong></td>
      <td class="num">${totPA}</td>
      <td class="num">${fmtN(totP,3)}</td>
      <td class="num">${totC1A}</td>
      <td class="num">${fmtN(totC1,3)}</td>
      <td class="num">${totC23A}</td>
      <td class="num">${fmtN(totC23,3)}</td>
      <td class="num">${fmtN(totAll,3)}</td>
      <td class="num">${fmtN(Math.max(0,(STATE.config.initialStock[foodKey]||0)-totAll),3)}</td>
    </tr>
  `;
}

/* ═══════════════════════════════════════════════════════════
   11. VISTA POR CICLO
═══════════════════════════════════════════════════════════ */

function showCycleView(cycleKey, btn) {
  STATE.currentCycleView = cycleKey;
  document.querySelectorAll('.cycle-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderCycleView(cycleKey);
}

function renderCycleView(cycleKey) {
  const dates   = getMonthDates();
  const theadRow = document.getElementById('cycle-thead-row');
  const tbody    = document.getElementById('cycle-tbody');
  const tfoot    = document.getElementById('cycle-tfoot');

  // Build header
  theadRow.innerHTML = `<th>Fecha</th><th>Día</th><th>Alumnos</th>` +
    FOODS.map(f => `<th>${f.icon} ${f.label}</th>`).join('') +
    `<th>Total (kg)</th>`;

  tbody.innerHTML = '';

  let totalsByFood = {};
  FOODS.forEach(f => totalsByFood[f.key] = 0);
  let grandTotal = 0;
  let totalStudents = 0;

  if (dates.length === 0) {
    tbody.innerHTML = `<tr><td colspan="${FOODS.length + 4}" style="text-align:center;padding:2rem;color:var(--text-muted)">Sin registros para este ciclo.</td></tr>`;
    tfoot.innerHTML = '';
    return;
  }

  dates.forEach(date => {
    const rec = STATE.records[date]?.[cycleKey] || {};
    // Derive student count as the max non-zero alumnos in any food
    const alumnos = Math.max(0, ...FOODS.map(f => rec[f.key] || 0));
    totalStudents += alumnos;

    const foodKgs = FOODS.map(f => {
      const kg = alumnosToKg(rec[f.key] || 0, f.key);
      totalsByFood[f.key] += kg;
      return kg;
    });
    const rowTotal = foodKgs.reduce((s,v) => s+v, 0);
    grandTotal += rowTotal;

    tbody.insertAdjacentHTML('beforeend', `
      <tr>
        <td class="date-cell">${date}</td>
        <td>${getDayName(date)}</td>
        <td class="num text-cyan">${alumnos || '—'}</td>
        ${foodKgs.map(kg => `<td class="num">${kg > 0 ? fmtN(kg,3) : '—'}</td>`).join('')}
        <td class="num text-gold font-bold">${fmtN(rowTotal,3)}</td>
      </tr>
    `);
  });

  tfoot.innerHTML = `
    <tr class="tfoot-row">
      <td colspan="2"><strong>TOTALES</strong></td>
      <td class="num">${totalStudents}</td>
      ${FOODS.map(f => `<td class="num">${fmtN(totalsByFood[f.key],3)}</td>`).join('')}
      <td class="num">${fmtN(grandTotal,3)}</td>
    </tr>
  `;
}

/* ═══════════════════════════════════════════════════════════
   12. CONFIGURACIÓN
═══════════════════════════════════════════════════════════ */

function renderConfig() {
  // Portions
  const portionsEl = document.getElementById('portions-config');
  portionsEl.innerHTML = '';
  FOODS.forEach(f => {
    portionsEl.insertAdjacentHTML('beforeend', `
      <div class="config-item">
        <label class="config-label" for="por-${f.key}">${f.icon} ${f.label}</label>
        <div class="flex gap-1 items-center">
          <input type="number" id="por-${f.key}" class="form-input"
                 value="${STATE.config.portions[f.key]}" min="0" step="1"
                 style="max-width:90px" />
          <span class="text-muted text-sm">g/alumno</span>
        </div>
      </div>
    `);
  });

  // Package weights
  const packsEl = document.getElementById('packages-config');
  packsEl.innerHTML = '';
  FOODS.forEach(f => {
    packsEl.insertAdjacentHTML('beforeend', `
      <div class="config-item">
        <label class="config-label" for="pw-${f.key}">${f.icon} ${f.label}</label>
        <div class="flex gap-1 items-center">
          <input type="number" id="pw-${f.key}" class="form-input"
                 value="${STATE.config.packageWeights[f.key]}" min="0.01" step="0.01"
                 style="max-width:100px" />
          <span class="text-muted text-sm">kg/paq.</span>
        </div>
      </div>
    `);
  });

  // Initial stock
  const stockEl = document.getElementById('stock-config');
  stockEl.innerHTML = '';
  FOODS.forEach(f => {
    stockEl.insertAdjacentHTML('beforeend', `
      <div class="config-item">
        <label class="config-label" for="is-${f.key}">${f.icon} ${f.label}</label>
        <div class="flex gap-1 items-center">
          <input type="number" id="is-${f.key}" class="form-input"
                 value="${STATE.config.initialStock[f.key]}" min="0" step="0.01"
                 style="max-width:110px" />
          <span class="text-muted text-sm">kg</span>
        </div>
      </div>
    `);
  });
}

function saveConfig() {
  FOODS.forEach(f => {
    const por = parseFloat(document.getElementById(`por-${f.key}`)?.value);
    const pw  = parseFloat(document.getElementById(`pw-${f.key}`)?.value);
    const is  = parseFloat(document.getElementById(`is-${f.key}`)?.value);
    if (!isNaN(por)) STATE.config.portions[f.key]       = por;
    if (!isNaN(pw))  STATE.config.packageWeights[f.key] = pw;
    if (!isNaN(is))  STATE.config.initialStock[f.key]   = is;
  });
  saveState();
  showToast('✅ Configuración guardada.', 'success');
  renderDashboard();
}

function resetConfig() {
  if (!confirm('¿Restablecer todas las configuraciones a los valores por defecto?')) return;
  STATE.config.portions       = { ...DEFAULT_PORTIONS };
  STATE.config.packageWeights = { ...DEFAULT_PACKAGE_WEIGHTS };
  STATE.config.initialStock   = { ...DEFAULT_INITIAL_STOCK };
  saveState();
  renderConfig();
  showToast('↩️ Configuración restablecida.', 'info');
}

/* ═══════════════════════════════════════════════════════════
   13. EXPORTAR / IMPORTAR
═══════════════════════════════════════════════════════════ */

function exportCSV() {
  const dates = getMonthDates();
  const rows  = [
    ['Fecha','Día','Alimento','Parvularia (alum)','Parvularia (kg)',
     '1°Ciclo (alum)','1°Ciclo (kg)','2°-3°Ciclo (alum)','2°-3°Ciclo (kg)',
     'Total (kg)','Saldo Acumulado (kg)']
  ];

  FOODS.forEach(f => {
    let balance = STATE.config.initialStock[f.key] || 0;
    dates.forEach(date => {
      const rec = STATE.records[date] || {};
      const pA = rec.parvularia?.[f.key]    || 0;
      const cA = rec.primer_ciclo?.[f.key]  || 0;
      const dA = rec['2_y_3_ciclo']?.[f.key]|| 0;
      const pK = alumnosToKg(pA, f.key);
      const cK = alumnosToKg(cA, f.key);
      const dK = alumnosToKg(dA, f.key);
      const total = pK + cK + dK;
      balance = Math.max(0, balance - total);
      rows.push([date, getDayName(date), f.label,
        pA, fmt3(pK), cA, fmt3(cK), dA, fmt3(dK),
        fmt3(total), fmt3(balance)]);
    });
  });

  const csv = rows.map(r => r.join(',')).join('\n');
  downloadFile(`alicontrol_${STATE.activeMonth}.csv`, 'text/csv;charset=utf-8;', csv);
  showToast('⬇️ CSV exportado correctamente.', 'success');
}

function exportJSON() {
  const json = JSON.stringify(STATE, null, 2);
  downloadFile(`alicontrol_backup_${new Date().toISOString().split('T')[0]}.json`, 'application/json', json);
  showToast('📤 Backup JSON exportado.', 'success');
}

function importJSON(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.records) {
        STATE.records = data.records;
        if (data.config) STATE.config = { ...STATE.config, ...data.config };
        saveState();
        renderDashboard();
        showToast('📥 Datos importados correctamente.', 'success');
      } else {
        showToast('⚠️ Archivo no válido.', 'error');
      }
    } catch { showToast('⚠️ Error al leer el archivo.', 'error'); }
  };
  reader.readAsText(file);
  event.target.value = '';
}

function downloadFile(name, type, content) {
  const blob = new Blob(['\uFEFF' + content], { type });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = name; a.click();
  URL.revokeObjectURL(url);
}

function confirmReset() {
  if (!confirm('⚠️ ¿Seguro que deseas borrar TODOS los registros?\nEsta acción no se puede deshacer.')) return;
  STATE.records = {};
  saveState();
  renderDashboard();
  showToast('🗑️ Todos los registros han sido eliminados.', 'info');
}

/* ═══════════════════════════════════════════════════════════
   14. MODAL
═══════════════════════════════════════════════════════════ */

function openNewDayModal() {
  document.getElementById('modal-overlay').classList.remove('hidden');
}
function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
}
function goToRegistry() {
  closeModal();
  document.querySelector('[data-tab="registro"]').click();
}

/* ═══════════════════════════════════════════════════════════
   15. TOASTS
═══════════════════════════════════════════════════════════ */

function showToast(msg, type = 'info') {
  const icons = { success:'✅', error:'❌', info:'ℹ️' };
  const container = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.innerHTML = `<span class="toast-icon">${icons[type]||'ℹ️'}</span><span class="toast-msg">${msg}</span>`;
  container.appendChild(el);
  setTimeout(() => {
    el.classList.add('toast-out');
    el.addEventListener('animationend', () => el.remove());
  }, 3500);
}

/* ═══════════════════════════════════════════════════════════
   16. HEADER DATE
═══════════════════════════════════════════════════════════ */

function updateHeaderDate() {
  const now = new Date();
  const dayName = DAYS_ES[now.getDay()];
  const d  = now.getDate();
  const mo = MONTHS_ES[now.getMonth()];
  const dateStr = `${dayName.charAt(0).toUpperCase()+dayName.slice(1)}, ${d} de ${mo}`;
  document.getElementById('header-date-display').textContent = `📅 ${dateStr}`;
  const sidebarDate = document.getElementById('sidebar-date');
  if (sidebarDate) sidebarDate.textContent = dateStr;
}

/* ═══════════════════════════════════════════════════════════
   17. INGRESO DE ALIMENTOS
═══════════════════════════════════════════════════════════ */

function initIngresoForm() {
  // Set today as default date
  document.getElementById('ingreso-date').value = new Date().toISOString().split('T')[0];

  // Build food input cards
  const grid = document.getElementById('ingreso-food-grid');
  grid.innerHTML = '';

  FOODS.forEach(f => {
    grid.insertAdjacentHTML('beforeend', `
      <div class="ingreso-food-item" id="ingreso-item-${f.key}">
        <div class="ingreso-food-header">
          <span class="ingreso-food-icon">${f.icon}</span>
          <span class="ingreso-food-name">${f.label}</span>
        </div>
        <div class="ingreso-food-inputs">
          <div class="form-group">
            <label class="form-label" for="ingreso-kg-${f.key}">Cantidad (kg)</label>
            <input type="number" id="ingreso-kg-${f.key}" class="form-input"
                   value="0" min="0" step="0.01"
                   oninput="updateIngresoPreview()" />
          </div>
          <div class="form-group">
            <label class="form-label" for="ingreso-paq-${f.key}">O en paquetes</label>
            <input type="number" id="ingreso-paq-${f.key}" class="form-input"
                   value="0" min="0" step="0.1"
                   oninput="onIngresoPackChange('${f.key}')" />
          </div>
        </div>
      </div>
    `);
  });
}

function onIngresoPackChange(foodKey) {
  const packs = parseFloat(document.getElementById(`ingreso-paq-${foodKey}`).value) || 0;
  const pw = STATE.config.packageWeights[foodKey] || 1;
  const kg = packs * pw;
  document.getElementById(`ingreso-kg-${foodKey}`).value = kg.toFixed(2);
  updateIngresoPreview();
}

function updateIngresoPreview() {
  const tbody = document.getElementById('ingreso-preview-tbody');
  const tfoot = document.getElementById('ingreso-preview-tfoot');
  tbody.innerHTML = '';
  let totalKg = 0;
  let hasItems = false;

  FOODS.forEach(f => {
    const kg = parseFloat(document.getElementById(`ingreso-kg-${f.key}`)?.value) || 0;
    const item = document.getElementById(`ingreso-item-${f.key}`);
    if (kg > 0) {
      hasItems = true;
      item.classList.add('has-value');
      const packs = kgToPacks(kg, f.key);
      const currentStock = getStockRemaining(f.key);
      const newStock = currentStock + kg;
      totalKg += kg;

      tbody.insertAdjacentHTML('beforeend', `
        <tr>
          <td>${f.icon} ${f.label}</td>
          <td class="num text-green font-bold">+${fmtN(kg, 2)}</td>
          <td class="num">${fmtN(packs, 1)}</td>
          <td class="num">${fmtN(currentStock, 2)}</td>
          <td class="num text-cyan font-bold">${fmtN(newStock, 2)}</td>
        </tr>
      `);
    } else {
      item.classList.remove('has-value');
    }
  });

  if (!hasItems) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:1.5rem;color:var(--text-muted)">Ingresa cantidades en los alimentos de arriba</td></tr>`;
  }

  tfoot.innerHTML = `
    <tr class="tfoot-row">
      <td><strong>TOTAL INGRESO</strong></td>
      <td class="num">${fmtN(totalKg, 2)}</td>
      <td colspan="3"></td>
    </tr>
  `;
}

function saveIngreso() {
  const date = document.getElementById('ingreso-date').value;
  if (!date) { showToast('⚠️ Selecciona una fecha.', 'error'); return; }

  const proveedor = document.getElementById('ingreso-proveedor').value.trim() || 'Sin especificar';
  const nota = document.getElementById('ingreso-nota').value.trim();

  const items = {};
  let totalKg = 0;
  FOODS.forEach(f => {
    const kg = parseFloat(document.getElementById(`ingreso-kg-${f.key}`)?.value) || 0;
    if (kg > 0) {
      items[f.key] = kg;
      totalKg += kg;
    }
  });

  if (totalKg === 0) {
    showToast('⚠️ Ingresa al menos un alimento con cantidad mayor a 0.', 'error');
    return;
  }

  // Add to stock
  Object.entries(items).forEach(([foodKey, kg]) => {
    STATE.config.initialStock[foodKey] = (STATE.config.initialStock[foodKey] || 0) + kg;
  });

  // Save ingreso record
  const ingreso = {
    id: Date.now(),
    date,
    proveedor,
    nota,
    items,
    totalKg,
  };

  STATE.ingresos.push(ingreso);
  saveState();

  // Build summary of items
  const itemsSummary = Object.entries(items)
    .map(([key, kg]) => {
      const food = FOODS.find(f => f.key === key);
      return `${food?.icon} ${food?.label}: ${fmtN(kg, 2)} kg`;
    }).join(', ');

  showToast(`✅ Ingreso registrado: ${itemsSummary}`, 'success');

  clearIngresoForm();
  renderIngresoHistory();
  renderDashboard();
}

function clearIngresoForm() {
  FOODS.forEach(f => {
    const kgEl = document.getElementById(`ingreso-kg-${f.key}`);
    const paqEl = document.getElementById(`ingreso-paq-${f.key}`);
    if (kgEl) kgEl.value = '0';
    if (paqEl) paqEl.value = '0';
    const item = document.getElementById(`ingreso-item-${f.key}`);
    if (item) item.classList.remove('has-value');
  });
  document.getElementById('ingreso-proveedor').value = '';
  document.getElementById('ingreso-nota').value = '';
  updateIngresoPreview();
}

function renderIngresoHistory() {
  const tbody = document.getElementById('ingreso-history-tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  if (!STATE.ingresos || STATE.ingresos.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--text-muted)">No hay ingresos registrados aún</td></tr>`;
    return;
  }

  // Show most recent first
  const sorted = [...STATE.ingresos].reverse();
  sorted.forEach(ing => {
    const itemsList = Object.entries(ing.items)
      .map(([key, kg]) => {
        const food = FOODS.find(f => f.key === key);
        return `${food?.icon} ${food?.label}: ${fmtN(kg, 2)} kg`;
      }).join('<br>');

    tbody.insertAdjacentHTML('beforeend', `
      <tr>
        <td class="date-cell">${ing.date}</td>
        <td>${ing.proveedor}</td>
        <td style="white-space:normal;max-width:250px">${itemsList}</td>
        <td class="num text-green font-bold">${fmtN(ing.totalKg, 2)}</td>
        <td style="max-width:200px;white-space:normal;color:var(--text-muted);font-size:0.78rem">${ing.nota || '—'}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteIngreso(${ing.id})">🗑️</button>
        </td>
      </tr>
    `);
  });
}

function deleteIngreso(id) {
  if (!confirm('¿Seguro que deseas eliminar este ingreso? Se revertirá el stock agregado.')) return;

  const idx = STATE.ingresos.findIndex(i => i.id === id);
  if (idx === -1) return;

  const ingreso = STATE.ingresos[idx];

  // Revert stock
  Object.entries(ingreso.items).forEach(([foodKey, kg]) => {
    STATE.config.initialStock[foodKey] = Math.max(0, (STATE.config.initialStock[foodKey] || 0) - kg);
  });

  STATE.ingresos.splice(idx, 1);
  saveState();

  showToast('🗑️ Ingreso eliminado y stock revertido.', 'info');
  renderIngresoHistory();
  renderDashboard();
}

/* ═══════════════════════════════════════════════════════════
   18. INICIALIZACIÓN
═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  loadState();
  updateHeaderDate();
  initRegistroForm();
  initIngresoForm();
  initKardexProductSelect();
  initAmarillaProductSelect();
  renderDashboard();
  renderConfig();
  updateIngresoPreview();

  // Close sidebar with Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSidebar();
  });

  // Set active month label
  const [y, m] = STATE.activeMonth.split('-');
  document.getElementById('dash-month-label').textContent =
    `Mes activo: ${MONTHS_ES[parseInt(m)-1].charAt(0).toUpperCase() + MONTHS_ES[parseInt(m)-1].slice(1)} ${y}`;
});
