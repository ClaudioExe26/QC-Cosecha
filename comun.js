// Funciones compartidas por las tres páginas de QC Cosecha
import { firebaseConfig, ADMINS, TEMPORADA } from "./config.js";

export const COLECCION = "qc_muestras";
export const $ = id => document.getElementById(id);

let tt;
export function toast(m, ms = 2800) {
  const el = $("toast"); if (!el) return;
  el.textContent = m; el.classList.add("show");
  clearTimeout(tt); tt = setTimeout(() => el.classList.remove("show"), ms);
}
export function today() { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); }
export function addDays(s, n) { const d = new Date(s + "T12:00:00"); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); }
export function nowTime() { const d = new Date(); return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0"); }
// Rango de la temporada de cosecha actual según TEMPORADA en config.js
export function temporadaRango() {
  const d = new Date(); const y = d.getMonth() >= 6 ? d.getFullYear() : d.getFullYear() - 1; // la temporada parte en julio
  const ini = TEMPORADA.inicio, fin = TEMPORADA.fin;
  const yIni = ini >= "07-01" ? y : y + 1;
  const desde = `${yIni}-${ini}`;
  let hasta = `${yIni}-${fin}`; if (hasta < desde) hasta = `${yIni + 1}-${fin}`;
  return { desde, hasta };
}
export function pct(n, t) { return t ? (n * 100 / t) : 0; }
export function fmt(p) { return (Math.round(p * 10) / 10).toLocaleString("es-CL", { maximumFractionDigits: 1 }) + "%"; }
export function fmtDate(v) { if (!v) return ""; const [a, m, d] = v.split("-"); return `${d}-${m}-${a}`; }
export function esc(s) { return String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
export function norm(s) { return String(s || "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }
export function loadImg(src) { return new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; }); }
export function esAdminEmail(e) { return ADMINS.includes(String(e || "").toLowerCase()); }
export function downloadBlob(blob, name) {
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
}

// ---------- Firebase ----------
// Se usa una instancia con nombre propio ("qc") para que la sesión de esta app
// no se mezcle con la del Cuaderno de dardos en el mismo teléfono.
export async function initFirebase() {
  const V = "10.12.2";
  const { initializeApp } = await import(`https://www.gstatic.com/firebasejs/${V}/firebase-app.js`);
  const fa = await import(`https://www.gstatic.com/firebasejs/${V}/firebase-auth.js`);
  const fs = await import(`https://www.gstatic.com/firebasejs/${V}/firebase-firestore.js`);
  const app = initializeApp(firebaseConfig, "qc");
  const auth = fa.getAuth(app);
  let db;
  try { db = fs.initializeFirestore(app, { localCache: fs.persistentLocalCache({ tabManager: fs.persistentMultipleTabManager() }) }); }
  catch (e) { db = fs.getFirestore(app); }
  return { fa, fs, auth, db };
}

// ---------- Cálculo del resumen ----------
// Promedio simple de los % de cada muestreo (y ponderado por frutos como referencia)
export function summarize(rows) {
  const n = rows.length; let sumExp = 0, sumDef = 0, frutos = 0, exp = 0; const defSum = {};
  rows.forEach(r => {
    sumExp += pct(r.exportable, r.total); sumDef += pct(r.totalDefectos, r.total);
    frutos += r.total; exp += r.exportable;
    Object.entries(r.defectos || {}).forEach(([k, v]) => { defSum[k] = (defSum[k] || 0) + pct(v, r.total); });
  });
  const rank = Object.entries(defSum).map(([k, v]) => [k, v / n]).filter(a => a[1] > 0).sort((a, b) => b[1] - a[1]);
  return { n, avgExp: n ? sumExp / n : 0, avgDef: n ? sumDef / n : 0, frutos, pondExp: pct(exp, frutos), rank };
}

// ---------- Dibujo del resumen ----------
// opts.groupBy: [["productor","Productor"],["variedad","Variedad"]]
// opts.onDelete: función(id) si se permite eliminar
export function renderResumen(root, rows, opts = {}) {
  if (!rows.length) { root.innerHTML = `<section class="card muted">No hay muestreos con estos filtros.</section>`; return; }
  const S = summarize(rows);
  const max = S.rank.length ? S.rank[0][1] : 0;
  const gb = opts.groupBy || [["productor", "Productor"], ["variedad", "Variedad"]];
  const groups = {};
  rows.forEach(r => { const k = gb.map(([f]) => r[f] || "—").join("||"); (groups[k] = groups[k] || []).push(r); });
  const gRows = Object.entries(groups).map(([k, g]) => ({ keys: k.split("||"), n: g.length, s: summarize(g) }))
    .sort((a, b) => b.n - a.n || a.keys[0].localeCompare(b.keys[0]));
  root.innerHTML = `
    <section>
      <h2>Promedio de los muestreos</h2>
      <div class="card">
        <div class="big">
          <div class="kpi good"><div class="v">${fmt(S.avgExp)}</div><div class="l">Exportable promedio</div></div>
          <div class="kpi bad"><div class="v">${fmt(S.avgDef)}</div><div class="l">Defectos promedio</div></div>
          <div class="kpi neutral"><div class="v">${S.n.toLocaleString("es-CL")}</div><div class="l">Muestreos</div></div>
          <div class="kpi neutral"><div class="v">${S.frutos.toLocaleString("es-CL")}</div><div class="l">Frutos evaluados</div></div>
        </div>
        <p class="muted" style="margin:12px 0 0">Promedio simple de ${S.n} muestreo${S.n === 1 ? "" : "s"}. Ponderado por frutos: ${fmt(S.pondExp)} exportable.</p>
      </div>
    </section>
    <section>
      <h2>Defectos, de mayor a menor</h2>
      <div class="card"><div class="rank">${S.rank.length ? S.rank.map(([n, p]) =>
        `<div class="rk"><span class="n">${esc(n)}</span><span class="p">${fmt(p)}</span><div class="track"><span style="width:${max ? p / max * 100 : 0}%"></span></div></div>`).join("")
        : `<p class="muted" style="margin:0">Sin defectos registrados.</p>`}</div></div>
    </section>
    <section>
      <h2>Por ${gb.map(g => g[1].toLowerCase()).join(" y ")}</h2>
      <div class="card tbl-wrap"><table><thead><tr>${gb.map(g => `<th>${g[1]}</th>`).join("")}<th class="num">N°</th><th class="num">% Export.</th><th>Defecto principal</th></tr></thead>
      <tbody>${gRows.map(o => `<tr>${o.keys.map(k => `<td>${esc(k)}</td>`).join("")}<td class="num">${o.n}</td><td class="num"><b>${fmt(o.s.avgExp)}</b></td><td>${o.s.rank[0] ? esc(o.s.rank[0][0]) + " " + fmt(o.s.rank[0][1]) : "—"}</td></tr>`).join("")}</tbody></table></div>
    </section>
    <section>
      <h2>Muestreos</h2>
      <div class="card">${rows.map(r => `<div class="sample">
        <span class="t">${opts.hideProductor ? "" : esc(r.productor) + " · "}${esc(r.variedad)}${r.cuartel ? " · " + esc(r.cuartel) : ""}</span><span class="e">${fmt(r.pctExportable ?? pct(r.exportable, r.total))}</span>
        <span class="s">${fmtDate(r.fecha)} ${esc(r.hora || "")} · ${r.total} frutos${r.evaluador ? " · " + esc(r.evaluador) : ""}${r.defectos ? " · " + topDef(r) : ""}</span>
        <span style="display:flex;gap:14px">${opts.onEdit ? `<button class="del" type="button" data-edit="${esc(r.id)}">Editar</button>` : ""}${opts.onDelete ? `<button class="del" type="button" data-del="${esc(r.id)}">Eliminar</button>` : ""}</span>
      </div>`).join("")}</div>
      <div class="actions"><button class="btn ghost grow" type="button" data-csv>Exportar a Excel (CSV)</button></div>
    </section>`;
  root.querySelector("[data-csv]").onclick = () => exportCsv(rows, opts.csvName || "QC_defectos");
  if (opts.onEdit) root.querySelectorAll("[data-edit]").forEach(b => b.onclick = () => opts.onEdit(b.dataset.edit));
  if (opts.onDelete) root.querySelectorAll("[data-del]").forEach(b => {
    let armed = null;
    b.onclick = () => {
      if (!armed) { b.textContent = "¿Eliminar? toca otra vez"; armed = setTimeout(() => { armed = null; b.textContent = "Eliminar"; }, 3000); return; }
      clearTimeout(armed); opts.onDelete(b.dataset.del);
    };
  });
}
function topDef(r) {
  const e = Object.entries(r.defectos || {}).filter(a => a[1] > 0).sort((a, b) => b[1] - a[1])[0];
  return e ? esc(e[0]) + " " + fmt(pct(e[1], r.total)) : "sin defectos";
}

// Ordena del más reciente al más antiguo
export function sortRows(rows) { return rows.sort((a, b) => (b.fecha + (b.hora || "")).localeCompare(a.fecha + (a.hora || ""))); }

// ---------- CSV (separador ; y coma decimal para Excel en Chile) ----------
export function exportCsv(rows, base) {
  const names = [...new Set(rows.flatMap(r => Object.keys(r.defectos || {})))];
  const n2 = v => String(Math.round(v * 10) / 10).replace(".", ",");
  const q = v => { v = String(v ?? ""); return /[;"\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v; };
  const head = ["Fecha", "Hora", "Productor", "Cuartel", "Variedad", "Evaluador", "Total frutos", ...names, "Exportable", "% Exportable", "% Defectos"];
  const lines = rows.map(r => [fmtDate(r.fecha), r.hora || "", r.productor, r.cuartel, r.variedad, r.evaluador, r.total,
    ...names.map(k => (r.defectos || {})[k] || 0), r.exportable, n2(pct(r.exportable, r.total)), n2(pct(r.totalDefectos, r.total))].map(q).join(";"));
  const blob = new Blob(["\ufeff" + [head.map(q).join(";"), ...lines].join("\r\n")], { type: "text/csv;charset=utf-8" });
  downloadBlob(blob, `${base}_${today()}.csv`);
}

// ---------- Filtros de fecha comunes ----------
export function wireRangeButtons(desdeEl, hastaEl, onChange) {
  document.querySelectorAll("[data-range]").forEach(b => b.onclick = () => {
    const r = b.dataset.range, h = today();
    if (r === "temp") { const t = temporadaRango(); desdeEl.value = t.desde; hastaEl.value = t.hasta; }
    else { hastaEl.value = h; desdeEl.value = r === "hoy" ? h : addDays(h, -6); }
    onChange();
  });
}
export function fillSelect(sel, label, items) {
  const cur = sel.value;
  sel.innerHTML = (label ? `<option value="">${label}</option>` : "") + items.map(i => `<option value="${esc(i)}">${esc(i)}</option>`).join("");
  if ([...sel.options].some(o => o.value === cur)) sel.value = cur;
}

// ---------- Ícono de pantalla de inicio (cereza) ----------
const CHERRY = `<path d="M30 6c-2 10-9 18-15 28" fill="none" stroke="#3B7A3A" stroke-width="3.2" stroke-linecap="round"/><path d="M30 6c3 10 6 20 15 30" fill="none" stroke="#3B7A3A" stroke-width="3.2" stroke-linecap="round"/><path d="M30 7c6-6 17-6 24 1-7 6-17 6-24-1z" fill="#5FA85A"/><circle cx="17" cy="45" r="13" fill="#E3126F"/><circle cx="45" cy="44" r="13" fill="#B80F4E"/><ellipse cx="12" cy="40" rx="3.4" ry="5" fill="#fff" opacity=".55" transform="rotate(25 12 40)"/><ellipse cx="40" cy="39" rx="3.4" ry="5" fill="#fff" opacity=".45" transform="rotate(25 40 39)"/>`;
export function setupIcon(name, shortName) {
  const cherryUrl = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${CHERRY}</svg>`);
  loadImg(cherryUrl).then(img => {
    const c = document.createElement("canvas"); c.width = c.height = 512; const x = c.getContext("2d");
    x.fillStyle = "#FFF5F9"; x.fillRect(0, 0, 512, 512); x.drawImage(img, 76, 66, 360, 360);
    const url = c.toDataURL("image/png");
    const l = document.createElement("link"); l.rel = "apple-touch-icon"; l.href = url; document.head.appendChild(l);
    const f = document.createElement("link"); f.rel = "icon"; f.href = cherryUrl; document.head.appendChild(f);
    try {
      const m = { name, short_name: shortName, display: "standalone", background_color: "#FBF6F8", theme_color: "#B80F63", start_url: location.href, icons: [{ src: url, sizes: "512x512", type: "image/png" }] };
      const ml = document.createElement("link"); ml.rel = "manifest"; ml.href = URL.createObjectURL(new Blob([JSON.stringify(m)], { type: "application/manifest+json" })); document.head.appendChild(ml);
    } catch (e) { }
  }).catch(() => { });
}
