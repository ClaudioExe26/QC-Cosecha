// =====================================================================
//  CONFIGURACIÓN COMPARTIDA · QC Cosecha (Frutea)
//  Este archivo lo usan index.html (evaluadores), admin.html y resumen.html.
//  Para agregar un productor, una variedad o un defecto, cámbialo solo aquí.
// =====================================================================

export const firebaseConfig = {
  apiKey: "AIzaSyA0UR5HNvM4VGYRZUQoRNM-KHpLu1qVS6M",
  authDomain: "conteo-de-dardos.firebaseapp.com",
  projectId: "conteo-de-dardos",
  storageBucket: "conteo-de-dardos.firebasestorage.app",
  messagingSenderId: "328695582370",
  appId: "1:328695582370:web:64fb95a8baee12888e11fb"
};

// Deben coincidir con los correos de esAdminQC() en las reglas de Firestore
export const ADMINS = ["cespinoza@frutea.cl", "rosorio@frutea.cl"];

export const PRODUCTORES = [
  "Agrícola Antilhue SPA",
  "Agrícola Casa Silva Ltda",
  "Agrícola Las Palmeras SPA",
  "Agrícola Olpa SPA",
  "Agrícola San Antonio",
  "Agrícola Smart SPA",
  "Agrícola Tierra Buena",
  "Diego Pacheco Álvarez",
  "Francisco Cordova Rivera",
  "Francisco Silva",
  "Gabriela Videla",
  "Guillermo Urzúa",
  "Luis Alfonso Vargas Contreras",
  "Luis Meza",
  "Miguel Alfredo Cabello Celis",
  "Soc Agrícola Monchito Ltda",
  "Sociedad Agrícola El Mimbral",
  "Sociedad Agrícola Manfrut Limitada",
  "Valle Hermoso",
  "Viña Casa Vergara"
];

export const VARIEDADES = [
  "Santina", "Nimba", "Pacific Red", "Sweet Aryana", "Lapins", "Regina",
  "Skeena", "Royal Dawn", "Kordia", "Bing", "Sweetheart"
];

// Huertos / cuarteles por productor (columna Predio de FLUJO DIARIO; si el predio
// tiene el mismo nombre del productor, se usa la Zona). El evaluador solo puede
// elegir de la lista. Si un productor no está aquí, escribe el huerto a mano.
export const HUERTOS = {
  "Agrícola Antilhue SPA"             : ["Morza"],
  "Agrícola Casa Silva Ltda"          : ["Fundo el Medio"],
  "Agrícola Las Palmeras SPA"         : ["Las Palmeras"],
  "Agrícola Olpa SPA"                 : ["Peumo"],
  "Agrícola San Antonio"              : ["San Antonio"],
  "Agrícola Smart SPA"                : ["Capellania"],
  "Agrícola Tierra Buena"             : ["San Fernando"],
  "Diego Pacheco Álvarez"             : ["Placilla", "Polonia", "Taitao", "Taitao Lapins", "Las Parcelas"],
  "Francisco Cordova Rivera"          : ["Placilla"],
  "Francisco Silva"                   : ["Los Lingues"],
  "Gabriela Videla"                   : ["San Juan De La Sierra", "Santa Isabel"],
  "Guillermo Urzúa"                   : ["Parcela 9, La Gloria"],
  "Luis Alfonso Vargas Contreras"     : ["El Tubo Lote A y B"],
  "Luis Meza"                         : ["Tinguiririca"],
  "Miguel Alfredo Cabello Celis"      : ["Chimbarongo"],
  "Soc Agrícola Monchito Ltda"        : ["Monchito"],
  "Sociedad Agrícola El Mimbral"      : ["Mimbral"],
  "Sociedad Agrícola Manfrut Limitada": ["Manfrut"],
  "Valle Hermoso"                     : ["Valle Hermoso"],
  "Viña Casa Vergara"                 : ["Cauquenes"]
};

// Variedades por productor (según FLUJO DIARIO). El evaluador solo puede elegir esas.
// Si un productor no está aquí, se usa la lista general VARIEDADES.
export const VARIEDADES_PRODUCTOR = {
  "Agrícola Antilhue SPA"             : ["Kordia", "Lapins", "Santina"],
  "Agrícola Casa Silva Ltda"          : ["Santina", "Lapins", "Regina"],
  "Agrícola Las Palmeras SPA"         : ["Sweet Aryana"],
  "Agrícola Olpa SPA"                 : ["Sweet Aryana", "Nimba", "Pacific Red"],
  "Agrícola San Antonio"              : ["Lapins", "Santina", "Sweetheart"],
  "Agrícola Smart SPA"                : ["Royal Dawn"],
  "Agrícola Tierra Buena"             : ["Santina", "Lapins", "Sweet Aryana"],
  "Diego Pacheco Álvarez"             : ["Nimba", "Pacific Red", "Santina", "Sweet Aryana", "Lapins", "Regina", "Skeena"],
  "Francisco Cordova Rivera"          : ["Santina", "Lapins"],
  "Francisco Silva"                   : ["Lapins", "Santina"],
  "Gabriela Videla"                   : ["Lapins", "Regina", "Sweetheart", "Bing", "Santina"],
  "Guillermo Urzúa"                   : ["Lapins"],
  "Luis Alfonso Vargas Contreras"     : ["Santina", "Lapins"],
  "Luis Meza"                         : ["Lapins", "Santina", "Sweetheart"],
  "Miguel Alfredo Cabello Celis"      : ["Lapins"],
  "Soc Agrícola Monchito Ltda"        : ["Kordia", "Lapins"],
  "Sociedad Agrícola El Mimbral"      : ["Kordia", "Santina"],
  "Sociedad Agrícola Manfrut Limitada": ["Santina", "Lapins", "Pacific Red", "Regina", "Sweet Aryana"],
  "Valle Hermoso"                     : ["Lapins", "Royal Dawn", "Santina"],
  "Viña Casa Vergara"                 : ["Santina"]
};

// Período de cosecha que usa el botón "Temporada" y el filtro inicial de los resúmenes (mes-día).
// Si el fin es anterior al inicio (ej. inicio "10-31", fin "01-15"), se toma como enero del año siguiente.
export const TEMPORADA = { inicio: "10-31", fin: "12-31" };

export const DEFECTOS = [
  "Pitting", "Machucón", "Sin pedicelo", "Picada de pájaro",
  "Falta de color", "Precalibre", "Partidura", "Frutos dobles"
];
