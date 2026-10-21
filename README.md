# Elena Savkina — sito personale

Sito editoriale statico pubblicato automaticamente da Netlify.

## Struttura

- `index.html`: homepage
- `blog/`: articoli su comunicazione, tecnologia e intelligenza artificiale
- `strumenti/`: raccolta degli strumenti digitali
- `impara/`: percorsi di apprendimento
- `turismo/`: approfondimenti sul turismo digitale
- `styles.css`: stile generale
- `site-sections.css`: sezioni e raccolte
- `article-enhancements.css`: componenti degli articoli
- `article-index.css`: schede e articolo in evidenza nella Home
- `cookie-consent.css`: presentazione del consenso per Microsoft Clarity
- `scripts/validate-site.mjs`: controlli automatici prima del deploy
- `docs/identita-visiva.md`: regole grafiche e tecniche da rispettare

Ogni modifica salvata sul ramo `main` viene controllata e pubblicata automaticamente da Netlify. Per evitare consumo inutile di crediti, le modifiche approvate devono essere raggruppate in un solo commit e in un solo deploy di produzione.

Lo script `scripts/validate-site.mjs` impedisce che vengano pubblicati:

- più articoli contemporaneamente in evidenza;
- varianti grafiche scure nelle schede normali;
- copertine mancanti, non uniformi o senza testo alternativo;
- immagini social non raster o mancanti;
- SVG senza proporzioni dichiarate;
- collegamenti e risorse locali inesistenti;
- articoli privi dei dati strutturati essenziali.

Restano sempre manuali il controllo delle fonti, la valutazione editoriale, la resa su telefono e computer e l’approvazione di Elena prima della pubblicazione.

## Stabilità e sviluppo futuro

- Conservare i contenuti separati dai componenti comuni.
- Aggiungere nuove sezioni riutilizzando header, footer, colori, tipografia e card.
- Non risolvere problemi generali con regole CSS dedicate a un singolo articolo.
- Usare GitHub come copia autorevole del codice e Notion come registro operativo ed editoriale.
- Prima di un futuro pannello di pubblicazione, introdurre contenuti strutturati e un CMS con bozze, anteprima, autenticazione e storico revisioni.
