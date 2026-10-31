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
  "Luis Meza"
];

export const VARIEDADES = [
  "Santina", "Nimba", "Pacific Red", "Sweet Aryana", "Lapins", "Regina",
  "Skeena", "Royal Dawn", "Kordia", "Bing", "Sweetheart"
];

export const DEFECTOS = [
  "Pitting", "Machucón", "Sin pedicelo", "Picada de pájaro",
  "Falta de color", "Precalibre", "Partidura", "Frutos dobles"
];
