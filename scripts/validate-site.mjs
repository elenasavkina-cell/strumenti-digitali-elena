import { readFile, access } from "node:fs/promises";
import { constants } from "node:fs";

const errors = [];
const read = (path) => readFile(path, "utf8");
const mustExist = async (path, label) => {
  try { await access(path, constants.R_OK); }
  catch { errors.push(`${label}: file mancante (${path})`); }
};

const home = await read("index.html");
const cardCss = await read("article-index.css");
const mainCss = await read("styles.css");

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
for (const file of [...new Set(articleFiles)]) {
  try {
    const html = await read(file);
    const og = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
    const twitter = html.match(/<meta name="twitter:image" content="([^"]+)"/)?.[1];
    if (!og || !/\.(png|jpe?g|webp)$/i.test(og)) errors.push(`${file}: og:image deve essere PNG, JPG o WebP.`);
    if (!twitter || twitter !== og) errors.push(`${file}: twitter:image deve coincidere con og:image.`);
    if (og?.startsWith("https://elenasavkina.it/")) {
      await mustExist(og.replace("https://elenasavkina.it/", ""), `${file} immagine social`);
    }
  } catch {
    errors.push(`Home: collegamento a un articolo senza file locale (${file}).`);
  }
}

if (errors.length) {
  console.error("\nControllo editoriale non superato:\n- " + errors.join("\n- ") + "\n");
  process.exit(1);
}

console.log("Controllo editoriale superato: evidenza, copertine e immagini social coerenti.");
