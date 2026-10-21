# Identità visiva — Elena Savkina

## Idea centrale

**Capire. Verificare. Scegliere.**

Il progetto spiega temi complessi con chiarezza, fonti consultabili e strumenti pratici. L’identità deve risultare editoriale, indipendente, seria e accessibile; non deve sembrare una piattaforma tecnologica commerciale.

## Segni ricorrenti

- **Linea blu scuro:** il percorso del ragionamento e della verifica.
- **Cerchio trasparente:** osservazione, controllo e cambio di prospettiva.
- **Geometrie traslucide:** informazioni complesse rese leggibili.
- **Punto lime:** scoperta, risultato o domanda ancora aperta.
- **Fondo avorio:** continuità con una pagina editoriale, lontana dall’estetica neon dell’AI.

## Palette

| Uso | Colore |
| --- | --- |
| Testo e linea | `#07182F` |
| Identità generale e AI | `#2457FF` |
| Strumenti | `#7659F5` |
| Turismo digitale | `#24A7A0` |
| Segnale e azioni | `#B8E320` |
| Fondo | `#F4F6F8` |

Il lime è sempre un accento ridotto, non un colore dominante.

## Immagini editoriali

Ogni articolo può avere una propria composizione, mantenendo:

- fondo chiaro con lieve grana;
- una linea blu scuro;
- un elemento trasparente;
- il colore della rubrica;
- spazio negativo sufficiente per ritagli diversi;
- assenza di testo incorporato nell’immagine principale.

Evitare robot, cervelli digitali, circuiti, mani artificiali, aerei, valigie e fotografie stock generiche.

## Formati

La composizione originale deve essere leggibile in:

- sito e Facebook: orizzontale `3:2` o `1.91:1`;
- Instagram feed: `4:5`;
- post quadrato: `1:1`;
- Reel, Stories e Shorts: `9:16`;
- YouTube: `16:9`.

Il titolo viene aggiunto nel layout social, non nell’illustrazione originale.

## Loghi degli strumenti

- Non ricreare o reinterpretare loghi aziendali con generatori AI.
- Utilizzare solo asset ufficiali e conformi alle linee guida del titolare.
- Inserire i loghi dentro contenitori neutri e uniformi, senza modificarne colori o proporzioni.
- Conservare sempre il nome testuale dello strumento.
- Se l’asset ufficiale non è disponibile o l’uso è dubbio, mantenere la tessera con iniziale.

Nota da usare nella raccolta:

> I marchi citati appartengono ai rispettivi titolari. La raccolta è indipendente e non implica affiliazione.

## Social

Nome principale: **Elena Savkina**

Descrittore consigliato: **AI, strumenti digitali e turismo tecnologico spiegati con chiarezza.**

Firma breve: **Capire. Verificare. Scegliere.**

Prima di aprire nuovi profili si controllano gli account esistenti: accesso, pubblico, storico, eventuali limitazioni, nome disponibile e coerenza dei contenuti.


## Sistema copertine articoli — 20 ottobre 2026

Ogni articolo utilizza una copertina distinta, costruita con la stessa grammatica visiva: formato 16:9, fondo chiaro, segni blu notte e blu elettrico, volumi turchesi e un piccolo accento verde lime. Le immagini non contengono titoli, loghi di terzi o testo incorporato.

- **Allucinazioni AI:** risposta digitale, linea interrotta e lente di verifica.
- **AI Act:** documento digitale e scudo.
- **Risposte critiche:** superfici trasparenti e linea che cambia direzione.
- **Recensioni online:** schede, stelle e lente.
- **Algoritmi di viaggio:** mappa, nodi e percorso selezionato.
- **Traduttori in viaggio:** due fumetti e lente.
- **Tour virtuali:** arco reale e ricostruzione tridimensionale.

La copertina deve comparire nell’articolo, nella Home, nell’indice di sezione e nei metadati Open Graph/Twitter. Ogni immagine ha un testo alternativo descrittivo.

## Regole tecniche obbligatorie per la pubblicazione

- In Home deve esserci **un solo** articolo con la classe `article-card-latest`.
- L’articolo in evidenza usa la variante `nome-dark.svg`, ricavata dalla stessa composizione e senza rettangolo di fondo.
- Le schede normali usano sempre `nome.svg`: nessun file `-dark.svg` può rimanere dopo lo spostamento dell’evidenza.
- Ogni articolo conserva entrambe le varianti SVG, chiara e scura, così il passaggio dentro o fuori dall’evidenza non richiede di ridisegnare la copertina.
- Le copertine dentro gli articoli hanno larghezza massima di 820 px, rapporto 16:9 e `object-fit: contain`.
- Le anteprime social utilizzano un file raster separato `nome-social.png` da 1200×630 px, mai l’SVG del sito.
- Le miniature accanto a titolo e descrizione sono decorative e usano `alt=""`; la copertina nell’articolo conserva una descrizione significativa.

Netlify esegue `scripts/validate-site.mjs` prima di ogni pubblicazione. Se una di queste regole viene violata, il deploy si interrompe e indica la correzione necessaria.

## Fondamenta CSS e crescita del sito — 21 ottobre 2026

I fogli di stile restano separati per responsabilità. Non devono essere uniti soltanto per ridurre il numero dei file: la separazione rende più sicuro aggiungere pagine e componenti senza modificare tutto il sito.

- `styles.css` è l’unica fonte delle variabili globali.
- `--navy` identifica il blu notte dei blocchi scuri.
- `--surface` identifica il fondo neutro delle miniature chiare.
- I fogli di sezione devono usare le variabili e non introdurre colori quasi uguali.
- `prelaunch.css` contiene regole ormai definitive: sarà rinominato o riassorbito gradualmente, senza una riscrittura generale.
- Hero, copertina dell’articolo e miniatura possono avere funzioni differenti: le card e le copertine editoriali restano 16:9; la hero può mantenere una composizione diversa quando intenzionale.

## Controlli automatici prima di ogni deploy

Il validatore blocca la pubblicazione se rileva:

- più di una scheda in evidenza o una variante scura in una scheda normale;
- copertine mancanti, non SVG o prive di testo alternativo;
- immagini social mancanti o non raster;
- dati strutturati `Article` mancanti;
- SVG senza `viewBox` valido;
- collegamenti o risorse locali inesistenti;
- assenza delle variabili globali `--navy` e `--surface`.

Il controllo automatico non sostituisce la verifica visiva su telefono e computer, né il controllo editoriale di fonti, date e affermazioni.

## Regola per nuove sezioni

Una nuova sezione deve introdurre soltanto gli stili specifici che non esistono già. Header, menu, footer, tipografia, colori, card, copertine, avvisi e pulsanti devono riutilizzare i componenti comuni. Correzioni valide per tutto il sito non devono essere applicate alla singola pagina.

Prima di sviluppare un’area riservata, i contenuti dovranno essere separati dai template. L’area editoriale futura richiederà autenticazione reale, bozze, anteprima, approvazione, storico revisioni e nessuna chiave segreta nel browser.
