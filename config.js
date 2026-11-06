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
  "Diego Pacheco Álvarez",
  "Agrícola Las Palmeras SPA",
  "Agrícola Tierra Buena",
  "Valle Hermoso",
  "Agrícola San Antonio",
  "Manfrut",
  "Guillermo Urzúa",
  "Francisco Silva",
  "Gabriela Videla",
  "Luis Meza",
  "Agrícola Olpa SPA"
];

export const VARIEDADES = [
  "Santina", "Nimba", "Pacific Red", "Sweet Aryana", "Lapins", "Regina",
  "Skeena", "Royal Dawn", "Kordia", "Bing", "Sweetheart"
];

// Huertos / cuarteles por productor. Si un productor está aquí, el evaluador
// debe elegir uno de la lista (no puede escribir otro). Si no está, lo escribe a mano.
export const HUERTOS = {
  "Diego Pacheco Álvarez": ["Placilla", "Polonia", "Taitao", "Taitao Lapins", "Las Parcelas"],
  "Agrícola Olpa SPA": ["Peumo"]
};

// Variedades por productor. Si un productor está aquí, el evaluador solo puede
// elegir esas variedades. Si no está, se usa la lista general VARIEDADES.
export const VARIEDADES_PRODUCTOR = {
  "Agrícola Olpa SPA": ["Sweet Aryana", "Nimba", "Pacific Red"]
};

// Período de cosecha que usa el botón "Temporada" y el filtro inicial de los resúmenes (mes-día).
// Si el fin es anterior al inicio (ej. inicio "10-31", fin "01-15"), se toma como enero del año siguiente.
export const TEMPORADA = { inicio: "10-31", fin: "12-31" };

export const DEFECTOS = [
  "Pitting", "Machucón", "Sin pedicelo", "Picada de pájaro",
  "Falta de color", "Precalibre", "Partidura", "Frutos dobles"
];
