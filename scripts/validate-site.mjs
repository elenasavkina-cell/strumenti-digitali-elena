import { readFile, access, readdir } from "node:fs/promises";
import { constants } from "node:fs";

const errors = [];
const read = (path) => readFile(path, "utf8");
const mustExist = async (path, label) => {
  try { await access(path, constants.R_OK); }
  catch { errors.push(`${label}: file mancante (${path})`); }
};

const walk = async (dir) => {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const path = dir === "." ? entry.name : `${dir}/${entry.name}`;
    if (entry.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
};

const home = await read("index.html");
const cardCss = await read("article-index.css");
const mainCss = await read("styles.css");

const assistantPage = await read("assistente/index.html");
const assistantJs = await read("assistente/assistant.js");
const tourismPage = await read("turismo/index.html");
const notFoundPage = await read("404.html");
const assessmentPage = await read("valuta-progetto/index.html");
const sitemap = await read("sitemap.xml");

if (/Prototipo privato/i.test(assistantPage)) {
  errors.push("Assistente: la pagina pubblica non deve definirsi prototipo privato.");
}
if (!/meta name="robots" content="noindex,follow"/.test(assistantPage)) {
  errors.push("Assistente: durante la fase sperimentale deve restare noindex,follow.");
}
if (!/maxlength="500"/.test(assistantPage) || !/data-netlify-honeypot="bot-field"/.test(assistantPage)) {
  errors.push("Assistente: limite del campo o protezione antispam mancante.");
}
if (!assistantJs.includes("a.item.id === 'assistenti'") || !assistantJs.includes("token.startsWith(cleanTerm))) return 3")) {
  errors.push("Assistente: priorità delle schede specifiche o punteggio delle radici non protetti.");
}
if (!assistantJs.includes("scrollIntoView({ behavior: 'smooth', block: 'start' })") || !assistantJs.includes("input.blur()")) {
  errors.push("Assistente: riscontro mobile, chiusura tastiera o scorrimento al risultato mancanti.");
}
if ((tourismPage.match(/Tour virtuali e realtà aumentata/g) || []).length !== 1) {
  errors.push("Turismo: l’articolo in evidenza non deve essere duplicato nella griglia.");
}
if (!/<nav aria-label="Navigazione principale">/.test(notFoundPage) || !/<footer class="site-footer shell">/.test(notFoundPage)) {
  errors.push("404: navigazione o footer mancanti.");
}
if (!/meta name="robots" content="noindex,follow"/.test(assessmentPage)) {
  errors.push("Valuta progetto: la guida sperimentale deve restare noindex,follow.");
}


if (!/--navy:#07182f/.test(mainCss) || !/--surface:#eef2f6/.test(mainCss)) {
  errors.push("CSS: styles.css deve definire le variabili globali --navy e --surface.");
}

// La Home deve avere una sola evidenza, sempre la prima scheda.
const latestMatches = [...home.matchAll(/<article class="article-card article-card-latest">([\s\S]*?)<\/article>/g)];
if (latestMatches.length !== 1) {
  errors.push(`Home: trovate ${latestMatches.length} schede in evidenza; deve essercene esattamente una.`);
}

const latest = latestMatches[0]?.[1] ?? "";
const latestImage = latest.match(/<img[^>]+src="([^"]+)"/)?.[1];
if (!latestImage?.endsWith("-dark.svg")) {
  errors.push("Home: l’articolo in evidenza deve usare la variante -dark.svg.");
}

// Una variante scura non deve mai restare nelle schede normali.
const homeWithoutLatest = latestMatches[0] ? home.replace(latestMatches[0][0], "") : home;
if (/-dark\.svg/.test(homeWithoutLatest)) {
  errors.push("Home: una scheda normale usa ancora una variante -dark.svg.");
}

if (latestImage) {
  const darkPath = latestImage.replace(/^\//, "");
  const lightPath = darkPath.replace(/-dark\.svg$/, ".svg");
  await mustExist(darkPath, "Variante scura");
  await mustExist(lightPath, "Variante chiara");

  try {
    const darkSvg = await read(darkPath);
    if (/<rect[^>]+width="1200"[^>]+height="675"[^>]+fill=/i.test(darkSvg)) {
      errors.push("Grafica in evidenza: la variante scura contiene un rettangolo di fondo; deve essere trasparente.");
    }
  } catch {}
}

// Regole CSS che non devono più essere modificate articolo per articolo.
if (!/\.article-card-latest \.article-card-media\{background:transparent\}/.test(cardCss)) {
  errors.push("CSS Home: il contenitore dell’immagine in evidenza deve essere trasparente.");
}
if (!/\.article-page \.article-cover\{width:min\(820px,calc\(100% - 48px\)\)/.test(mainCss)) {
  errors.push("CSS articoli: la copertina deve restare allineata alla colonna editoriale di 820 px.");
}
if (!/\.article-page \.article-cover img\{[^}]*object-fit:contain/.test(mainCss)) {
  errors.push("CSS articoli: la copertina deve usare object-fit: contain per evitare tagli.");
}

// Le immagini social devono essere raster e separate dall’SVG usato nella pagina.
const articleFiles = [...home.matchAll(/href="(\/(?:blog|turismo)\/[^"#?]+\/)"/g)]
  .map(([, url]) => `${url.slice(1)}index.html`);
const sitemapUrls = [...sitemap.matchAll(/<loc>https:\/\/elenasavkina\.it(\/[^<]*)<\/loc>/g)].map(([, url]) => url);
for (const file of [...new Set(articleFiles)]) {
  try {
    const html = await read(file);
    const articleUrl = `/${file.replace(/index\.html$/, "")}`;
    if (!sitemapUrls.includes(articleUrl)) errors.push(`Sitemap: manca l’articolo ${articleUrl}.`);
    const og = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
    const twitter = html.match(/<meta name="twitter:image" content="([^"]+)"/)?.[1];
    const cover = html.match(/<figure class="article-cover">\s*<img[^>]+src="([^"]+)"[^>]+alt="([^"]*)"/) ?? [];
    if (!og || !/\.(png|jpe?g|webp)$/i.test(og)) errors.push(`${file}: og:image deve essere PNG, JPG o WebP.`);
    if (!twitter || twitter !== og) errors.push(`${file}: twitter:image deve coincidere con og:image.`);
    if (!cover[1]?.endsWith(".svg")) errors.push(`${file}: la copertina nella pagina deve essere un SVG.`);
    if (!cover[2]?.trim()) errors.push(`${file}: la copertina principale deve avere un testo alternativo significativo.`);
    if (!/<script type="application\/ld\+json">[\s\S]*?"@type":"Article"/.test(html)) {
      errors.push(`${file}: dati strutturati Article mancanti.`);
    }
    if (og?.startsWith("https://elenasavkina.it/")) {
      await mustExist(og.replace("https://elenasavkina.it/", ""), `${file} immagine social`);
    }
    if (cover[1]?.startsWith("/")) await mustExist(cover[1].slice(1), `${file} copertina SVG`);
  } catch {
    errors.push(`Home: collegamento a un articolo senza file locale (${file}).`);
  }
}

for (const url of sitemapUrls) {
  const file = url === "/" ? "index.html" : `${url.slice(1)}index.html`;
  try {
    const html = await read(file);
    if (/meta name="robots" content="[^"]*noindex/i.test(html)) {
      errors.push(`Sitemap: la pagina ${url} è noindex ma compare nella sitemap.`);
    }
  } catch {
    errors.push(`Sitemap: URL senza pagina locale (${url}).`);
  }
}

// Ogni SVG deve dichiarare proporzioni intrinseche valide per evitare salti di layout.
const allFiles = await walk(".");
for (const file of allFiles.filter((path) => path.endsWith(".svg"))) {
  const svg = await read(file);
  const viewBox = svg.match(/<svg[^>]+viewBox="([^"]+)"/i)?.[1];
  const values = viewBox?.trim().split(/\s+/).map(Number) ?? [];
  if (values.length !== 4 || values.some(Number.isNaN) || values[2] <= 0 || values[3] <= 0) {
    errors.push(`${file}: viewBox mancante o non valido.`);
  }
}

// Collegamenti e risorse locali dichiarati nell'HTML devono esistere prima del deploy.
for (const file of allFiles.filter((path) => path.endsWith(".html"))) {
  const html = await read(file);
  for (const [, raw] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (!raw.startsWith("/") || raw.startsWith("//")) continue;
    const clean = raw.split(/[?#]/)[0];
    if (!clean) continue;
    const localPath = clean.endsWith("/") ? `${clean.slice(1)}index.html` : clean.slice(1);
    await mustExist(localPath || "index.html", `${file} collegamento locale ${raw}`);
  }
}

if (errors.length) {
  console.error("\nControllo editoriale non superato:\n- " + errors.join("\n- ") + "\n");
  process.exit(1);
}

console.log("Controllo editoriale superato: evidenza, copertine, SVG, collegamenti e immagini social coerenti.");
