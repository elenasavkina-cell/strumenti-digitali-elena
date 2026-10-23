const knowledge = [
  {
    id: 'claude-mistral',
    terms: ['claude o mistral', 'mistral o claude', 'mistral', 'modello europeo'],
    title: 'Claude o Mistral: dipende da che cosa vuoi fare',
    answer: 'L’archivio non contiene ancora un confronto diretto e verificato tra i due. Le schede descrivono funzioni e contesti d’uso, senza stabilire un vincitore. Controlla sempre disponibilità, piano e condizioni sui siti ufficiali.',
    tools: [['Claude', 'Consulta la scheda per funzioni relative a testi, documenti e sviluppo.'], ['Mistral', 'Consulta la scheda per modelli, servizi e possibilità di integrazione.'], ['Scheda di confronto', 'Annota compito, piano, data e risultato: evita una classifica assoluta.']],
    links: [['Come scegliere un assistente in base al compito', '/blog/chatgpt-claude-gemini-quale-scegliere/'], ['Controlla Claude e Mistral nella raccolta', '/strumenti/#strumenti']]
  },
  {
    id: 'assistenti',
    terms: ['chatgpt o gemini', 'claude o gemini', 'chatgpt', 'gemini', 'claude', 'assistente ai', 'quale ai', 'meglio ai'],
    title: 'Scegli in base al compito, non a un vincitore',
    answer: 'I tre servizi includono funzioni che in parte si sovrappongono. L’archivio non assegna un vincitore: ti rimanda alle differenze documentate e al metodo di scelta descritto nell’articolo.',
    tools: [['ChatGPT', 'Consulta la scheda per funzioni, strumenti disponibili e condizioni del piano.'], ['Claude', 'Consulta la scheda per funzioni relative a testi, documenti e sviluppo.'], ['Gemini', 'Consulta la scheda per funzioni e integrazioni con i servizi Google.']],
    links: [['ChatGPT, Claude o Gemini: quale scegliere?', '/blog/chatgpt-claude-gemini-quale-scegliere/'], ['Esplora gli strumenti AI', '/strumenti/#strumenti']]
  },
  {
    id: 'video',
    terms: ['video', 'reel', 'short', 'youtube', 'montagg', 'avatar', 'animaz', 'clip'],
    title: 'Scegli quanto controllo vuoi avere sul video',
    answer: 'Non serve iniziare da un programma professionale. Puoi partire da foto, testo o un modello pronto; passare poi a strumenti assistiti dall’AI; usare un montaggio completo soltanto quando servono precisione ed effetti.',
    tools: [['1. Semplice e veloce', 'Canva o CapCut per Reel, Short e video da foto, testo e modelli.'], ['2. Assistito dall’AI', 'InVideo o Pictory da uno script; OpusClip per ricavare clip; HeyGen o Synthesia per avatar.'], ['3. Controllo professionale', 'DaVinci Resolve o Premiere Pro per montaggio, audio e colore.']],
    links: [['Confronta gli strumenti per video e immagini', '/strumenti/#strumenti'], ['Impara dalle risorse ufficiali', '/impara/']]
  },
  {
    id: 'immagini',
    terms: ['immagin', 'grafic', 'foto', 'sfond', 'logo', 'social', 'fotograf'],
    title: 'Separa creazione e rifinitura dell’immagine',
    answer: 'Prima definisci formato e funzione della grafica. Poi genera o scegli l’immagine e, soltanto alla fine, prepara testo, sfondo e dimensioni per il canale in cui sarà pubblicata.',
    tools: [['Canva', 'Per composizione e formati social.'], ['Ideogram', 'Per concept grafici che includono testo.'], ['Photoroom o Clipdrop', 'Per rimuovere sfondi e preparare gli elementi.']],
    links: [['Strumenti per video e immagini', '/strumenti/#strumenti']]
  },
  {
    id: 'presentazioni',
    terms: ['presentaz', 'slide', 'powerpoint', 'diapositiv', 'diagramm', 'mappa visual'],
    title: 'Parti dalla struttura, poi scegli il livello di controllo',
    answer: 'Per una prima bozza visuale puoi generare una struttura, ma contenuti, dati e ordine narrativo vanno controllati prima della consegna.',
    tools: [['Gamma', 'Per produrre rapidamente una prima struttura visuale.'], ['Canva', 'Per modificare con modelli e controllo grafico semplice.'], ['Napkin AI', 'Per trasformare concetti in schemi e diagrammi.']],
    links: [['Esplora presentazioni e contenuti', '/strumenti/#strumenti']]
  },
  {
    id: 'siti',
    terms: ['sito', 'pagina web', 'dominio', 'server', 'netlify', 'vercel', 'hosting', 'pubblicare online', 'app web'],
    title: 'Scegli la strada più piccola che basta al progetto',
    answer: 'Per un sito piccolo o informativo non devi comprare né configurare un server tradizionale. Puoi conservare il progetto su GitHub e pubblicarlo con Netlify oppure Vercel. Database e accessi vanno aggiunti soltanto quando servono davvero.',
    tools: [['1. Solo sito', 'GitHub per le versioni; Netlify o Vercel per pubblicare.'], ['2. Piccole funzioni', 'Funzioni serverless incluse nell’hosting, senza amministrare un server.'], ['3. Utenti o dati', 'Supabase solo per account, area riservata o dati persistenti.']],
    links: [['Confronta gli strumenti per siti e sviluppo', '/strumenti/#strumenti']]
  },
  {
    id: 'dati',
    terms: ['database', 'archivio dati', 'area riservata', 'utenti', 'login', 'account', 'supabase', 'airtable', 'baserow'],
    title: 'Aggiungi un database soltanto quando devi conservare dati',
    answer: 'Un sito informativo non ne ha bisogno. Per tabelle gestite a mano puoi partire da Airtable o Baserow; per utenti, autenticazione e dati di un’app serve un backend come Supabase o Firebase.',
    tools: [['Airtable o Baserow', 'Per archivi e tabelle gestibili senza molto codice.'], ['Supabase', 'Per database, accessi utenti e file di una web app.'], ['Firebase', 'Per un backend gestito nell’ecosistema Google.']],
    links: [['Esplora organizzazione, dati e sviluppo', '/strumenti/#strumenti']]
  },
  {
    id: 'automazioni',
    terms: ['automat', 'collegare app', 'flusso', 'workflow', 'make', 'zapier', 'n8n'],
    title: 'Automatizza prima una sola attività ripetitiva',
    answer: 'Descrivi evento iniziale, dati necessari e risultato finale. Prova il flusso con dati non riservati e mantieni un passaggio umano quando l’errore può avere conseguenze.',
    tools: [['Make', 'Per disegnare visivamente flussi articolati.'], ['Zapier', 'Per partire rapidamente con integrazioni pronte.'], ['n8n', 'Per maggiore controllo tecnico o installazione propria.']],
    links: [['Confronta gli strumenti di automazione', '/strumenti/#strumenti']]
  },
  {
    id: 'organizzazione',
    terms: ['organizz', 'notion', 'obsidian', 'appunti', 'prendere appunti', 'conoscenza', 'archivio personale'],
    title: 'Scegli dove vuoi conservare e ritrovare le informazioni',
    answer: 'Notion è pratico per pagine, procedure e piccoli database condivisi; Obsidian conserva note locali collegate; Anytype e Capacities organizzano la conoscenza come oggetti.',
    tools: [['Notion', 'Per pagine, procedure e progetti condivisi.'], ['Obsidian', 'Per un archivio locale in Markdown.'], ['Anytype o Capacities', 'Per note e oggetti collegati.']],
    links: [['Esplora organizzazione e dati', '/strumenti/#strumenti']]
  },
  {
    id: 'audio',
    terms: ['audio', 'voce', 'podcast', 'musica', 'registrare microfono', 'trascriz', 'sottotitol'],
    title: 'Distingui voce, pulizia audio e musica',
    answer: 'Sono attività diverse: prima chiarisci se devi registrare o migliorare una voce, trascrivere un parlato oppure creare una colonna sonora.',
    tools: [['Adobe Podcast', 'Per registrare, pulire e trascrivere la voce.'], ['Suno', 'Per bozze musicali e contenuti sonori originali.'], ['CapCut o un editor video', 'Per sottotitoli e sincronizzazione con le immagini.']],
    links: [['Esplora voce e audio', '/strumenti/#strumenti']]
  },
  {
    id: 'verifica',
    terms: ['risposta sbagliat', 'inventat', 'allucin', 'verific', 'fonti', 'controllare risposta', 'controll', 'fact check', 'citaz', 'assecond', 'compiacen', 'contraddittori', 'sempre ragione', 'obiezi', 'pensiero critico'],
    title: 'Una risposta convincente deve ancora essere verificata',
    answer: 'Controlla se la fonte esiste, se sostiene davvero l’affermazione, se la data è adeguata e se il sistema distingue fatti e deduzioni. Per decisioni importanti usa anche fonti indipendenti.',
    tools: [['Perplexity', 'Per una prima raccolta di fonti consultabili.'], ['NotebookLM', 'Per lavorare su documenti scelti da te.'], ['Un secondo controllo', 'Chiedi obiezioni e limiti, ma non trattare un’altra AI come prova finale.']],
    links: [['Quando l’AI inventa una risposta', '/blog/allucinazioni-intelligenza-artificiale-come-riconoscerle/'], ['Perché l’AI può assecondarci', '/blog/intelligenza-artificiale-risposte-critiche/']]
  },
  {
    id: 'file',
    terms: ['file', 'pdf', 'document', 'privacy', 'dati personali', 'dati clienti', 'dati dei clienti', 'proteggere dati', 'documento riservato', 'contratto', 'caricare contratto', 'alleg', 'caric', 'metadati', 'notebooklm', 'studiare documenti'],
    title: 'Controlla il file prima di allegarlo',
    answer: 'Invia soltanto ciò che serve. Rimuovi identificatori e metadati non necessari, verifica account e impostazioni e ricontrolla la risposta sul documento originale.',
    tools: [['Controllo del file', 'Cerca dati personali, metadati e contenuti nascosti prima dell’invio.'], ['Scheda NotebookLM', 'Consulta funzioni e condizioni per lavorare su fonti scelte.'], ['Scheda ChatPDF', 'Consulta funzioni e condizioni prima di caricare un PDF non riservato.']],
    links: [['Cosa succede ai file caricati nell’AI?', '/blog/file-caricati-intelligenza-artificiale-privacy/'], ['Regole europee prima di usare l’AI', '/blog/ai-act-cosa-sapere-prima-di-usare-intelligenza-artificiale/']]
  },
  {
    id: 'ai-act',
    terms: ['ai act', 'regole europee', 'regolamento ai', 'legge ai', 'conformita', 'obblighi ai', 'rischio ai'],
    title: 'Prima individua ruolo, uso e livello di rischio',
    answer: 'L’AI Act non vieta genericamente l’uso dell’AI. Gli obblighi dipendono dal sistema, dal ruolo dell’organizzazione e dal contesto. Per casi professionali serve verificare il testo vigente e le indicazioni ufficiali.',
    tools: [['Testo ufficiale UE', 'Per controllare regole, date e definizioni.'], ['Scheda del fornitore', 'Per sapere quale sistema e quali dati stai usando.'], ['Controllo umano', 'Per gli usi che possono incidere su persone o decisioni.']],
    links: [['Prima di utilizzare l’AI: le regole europee', '/blog/ai-act-cosa-sapere-prima-di-usare-intelligenza-artificiale/']]
  },
  {
    id: 'impara',
    terms: ['impar', 'corso', 'corsi', 'formaz', 'studiare ai', 'principiante', 'livello iniziale', 'prompt'],
    title: 'Inizia dal livello che usi già, non dal corso più difficile',
    answer: 'Prima impara a formulare richieste e controllare le risposte; poi trasforma le prove riuscite in un metodo; soltanto dopo passa ad automazioni, agenti e API.',
    tools: [['Livello iniziale', 'Richieste chiare, limiti e verifica delle risposte.'], ['Livello intermedio', 'Prompt riutilizzabili, fonti e procedure.'], ['Livello avanzato', 'Agenti, API, automazioni e controlli.']],
    links: [['Trova il tuo percorso gratuito', '/impara/']]
  },
  {
    id: 'recensioni',
    terms: ['recension', 'stelle hotel', 'commenti hotel', 'affidabilita hotel', 'recensione falsa'],
    title: 'Non leggere soltanto il voto medio',
    answer: 'Controlla quantità, date, distribuzione dei giudizi e dettagli ripetuti. Una recensione singola, molto positiva o molto negativa, non basta a descrivere una struttura.',
    tools: [['Distribuzione dei voti', 'Osserva quanti giudizi sostengono la media.'], ['Recensioni recenti', 'Cerca cambiamenti nella gestione o nei servizi.'], ['Fonti diverse', 'Confronta informazioni ufficiali e commenti su più canali.']],
    links: [['Le recensioni online sono ancora affidabili?', '/turismo/recensioni-online-hotel-affidabili/']]
  },
  {
    id: 'algoritmi-viaggio',
    terms: ['algoritm', 'viaggio consigliato', 'meta viaggio', 'vacanza proposta', 'suggerimenti viaggio', 'ricerca viaggio'],
    title: 'La prima proposta non rappresenta tutte le possibilità',
    answer: 'Piattaforme e motori ordinano i risultati usando segnali, disponibilità e obiettivi propri. Usa il suggerimento come punto di partenza e modifica filtri, date e fonti prima di decidere.',
    tools: [['Cambia i filtri', 'Verifica come cambia l’ordine dei risultati.'], ['Confronta più fonti', 'Non fermarti alla prima lista o al primo riassunto.'], ['Sito ufficiale', 'Controlla condizioni e disponibilità prima della scelta.']],
    links: [['Cerchi un viaggio o stai parlando con un algoritmo?', '/turismo/algoritmi-ai-scelta-viaggio/']]
  },
  {
    id: 'traduttori',
    terms: ['tradutt', 'lingua viaggio', 'offline viaggio', 'fotocamera testo', 'foto menu', 'menu', 'conversazione lingua'],
    title: 'Scegli la funzione in base alla situazione',
    answer: 'Offline, fotocamera e conversazione sono funzioni diverse. Scarica prima le lingue, prova il funzionamento in modalità aereo e non affidare a una sola traduzione informazioni mediche o importanti.',
    tools: [['Offline', 'Scarica le lingue e prova prima di partire.'], ['Fotocamera', 'Utile per cartelli e menu, ma controlla il contesto.'], ['Conversazione', 'Parla con frasi brevi e verifica i passaggi importanti.']],
    links: [['Traduttori in viaggio: cosa funziona davvero', '/turismo/traduttori-ai-viaggio/']]
  },
  {
    id: 'tour-virtuali',
    terms: ['tour virtual', 'realta aumentata', 'realta virtuale', '360', 'ricostruzione 3d', 'museo virtuale'],
    title: 'Chiedi che cosa stai guardando',
    answer: 'Una registrazione a 360°, un modello 3D e una ricostruzione storica non hanno lo stesso valore documentale. Cerca fonti, data, parti ipotetiche e informazioni sull’accessibilità.',
    tools: [['Ripresa', 'Mostra un ambiente registrato in un momento preciso.'], ['Modello 3D', 'È una rappresentazione costruita a partire da dati e scelte.'], ['Ricostruzione', 'Deve distinguere elementi documentati e ipotesi.']],
    links: [['Tour virtuali e realtà aumentata: cosa mostrano?', '/turismo/tour-virtuali-realta-aumentata/']]
  },
  {
    id: 'pubblicita',
    terms: ['pubblicit', 'telefono ascolta', 'microfono', 'permessi microfono', 'microfono android', 'microfono iphone', 'android', 'dashboard privacy', 'annunci', 'tracciament', 'pensato qualcosa'],
    title: 'Un annuncio preciso non prova da solo l’uso del microfono',
    answer: 'Il risultato può dipendere da attività precedenti, profilo statistico, dispositivi collegati, posizione, contesto o coincidenza. Controlla la spiegazione dell’annuncio e i permessi del telefono.',
    tools: [['Centro annunci', 'Per vedere alcuni fattori usati nella selezione.'], ['Dashboard privacy', 'Per controllare gli accessi al microfono su Android.'], ['Impostazioni Privacy', 'Per verificare i permessi su iPhone.']],
    links: [['Perché vedo una pubblicità dopo aver pensato a qualcosa?', '/blog/telefono-ascolta-pubblicita-personalizzata/'], ['Privacy del progetto', '/privacy/']]
  }
];

const normalize = value => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
const tokens = value => normalize(value).split(' ').filter(Boolean);
const form = document.querySelector('#archive-form');
const input = document.querySelector('#archive-question');
const result = document.querySelector('#archive-result');
const submitButton = form.querySelector('button[type="submit"]');
const submitLabel = submitButton.textContent;
const STATISTICS_CONSENT_KEY = 'elena_statistics_consent_v2';
const QUERY_COLLECTION_ENDPOINT = '/';

function recordQuery(value, matches) {
  try {
    if (localStorage.getItem(STATISTICS_CONSENT_KEY) !== 'granted') return;
    const normalized = normalize(value);
    if (!normalized) return;
    const recorded = JSON.parse(sessionStorage.getItem('archiveRecordedQueries') || '[]');
    if (recorded.includes(normalized)) return;
    recorded.push(normalized);
    sessionStorage.setItem('archiveRecordedQueries', JSON.stringify(recorded.slice(-20)));
    const payload = new URLSearchParams({
      'form-name': 'archive-queries',
      domanda: value.slice(0, 500),
      tema: matches[0]?.item.id || 'nessuna-corrispondenza',
      esito: matches.length ? 'risultato-trovato' : 'nessun-risultato',
      data: new Date().toISOString()
    });
    fetch(QUERY_COLLECTION_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payload.toString(),
      keepalive: true
    }).catch(() => {});
  } catch (error) {
    /* La ricerca continua a funzionare se consenso, storage o raccolta non sono disponibili. */
  }
}

function termScore(query, queryTokens, term) {
  const cleanTerm = normalize(term);
  if (!cleanTerm) return 0;
  if (cleanTerm.includes(' ')) {
    return query.includes(cleanTerm) ? 5 + tokens(cleanTerm).length : 0;
  }
  if (queryTokens.includes(cleanTerm)) return 3;
  if (cleanTerm.length < 4) return 0;
  if (queryTokens.some(token => token.startsWith(cleanTerm))) return 3;
  return queryTokens.some(token => cleanTerm.startsWith(token) && token.length >= 4) ? 2 : 0;
}

function findAnswers(value) {
  const query = normalize(value);
  const queryTokens = tokens(value);
  return knowledge
    .map(item => ({ item, score: item.terms.reduce((total, term) => total + termScore(query, queryTokens, term), 0) }))
    .filter(match => match.score > 0)
    .sort((a, b) => b.score - a.score || (a.item.id === 'assistenti' ? 1 : b.item.id === 'assistenti' ? -1 : 0));
}

function relatedMarkup(matches) {
  const primary = matches[0];
  const threshold = Math.max(2, Math.ceil(primary.score * 0.45));
  const candidates = matches.slice(1).filter(match => match.item.id !== primary.item.id && match.score >= threshold);
  const secondary = candidates.find(match => match.item.id !== 'assistenti') || candidates[0];
  if (!secondary) return '';
  const [label, url] = secondary.item.links[0];
  return `<p class="related-result"><strong>Pertinente anche:</strong> <a href="${url}">${label} →</a></p>`;
}

function render(value, shouldCollect = false) {
  const matches = findAnswers(value);
  if (shouldCollect) recordQuery(value, matches);
  result.hidden = false;
  if (!matches.length) {
    result.innerHTML = `<div class="no-result"><p class="result-label">Nessuna corrispondenza sicura</p><h2>Questa domanda non è ancora coperta dall’archivio.</h2><p>Non preparo una risposta generica: puoi consultare la raccolta oppure proporre il tema per un futuro approfondimento.</p><p><a href="/strumenti/">Esplora gli strumenti →</a><br><a href="/domande/" data-propose-question>Proponi la domanda →</a></p></div>`;
    const propose = result.querySelector('[data-propose-question]');
    propose.addEventListener('click', () => {
      try { sessionStorage.setItem('archivePendingQuestion', value); } catch (error) { /* Il collegamento continua a funzionare. */ }
    });
    return;
  }
  const x = matches[0].item;
  result.innerHTML = `<p class="result-label">Risposta dell’archivio</p><h2>${x.title}</h2><p class="quick-answer">${x.answer}</p><div class="result-grid"><section><h3>Soluzione da provare</h3><ol class="tool-path">${x.tools.map(([name, why]) => `<li><strong>${name}</strong><span>${why}</span></li>`).join('')}</ol></section><section><h3>Approfondisci e verifica</h3><ul class="reading-list">${x.links.map(([name, url]) => `<li><a href="${url}">${name} →</a></li>`).join('')}</ul></section></div>${relatedMarkup(matches)}<p class="result-note">Ricerca guidata sperimentale basata sui contenuti già pubblicati. Non interroga il web e non sostituisce la verifica delle fonti ufficiali.</p>`;
}

let revealTimer;

function revealResult() {
  clearTimeout(revealTimer);

  const reveal = () => {
    requestAnimationFrame(() => {
      result.scrollIntoView({ behavior: 'smooth', block: 'start' });
      result.focus({ preventScroll: true });
    });
  };

  /*
   * Su mobile input.blur() chiude la tastiera e modifica l'altezza del viewport.
   * Aspettiamo quel ridimensionamento prima di scorrere: altrimenti il primo
   * risultato può fermarsi troppo in basso. Il timer copre i browser che non
   * espongono visualViewport o non emettono l'evento resize.
   */
  if (window.visualViewport && window.innerWidth <= 760) {
    const onViewportResize = () => {
      window.visualViewport.removeEventListener('resize', onViewportResize);
      clearTimeout(revealTimer);
      reveal();
    };
    window.visualViewport.addEventListener('resize', onViewportResize, { once: true });
    revealTimer = window.setTimeout(() => {
      window.visualViewport.removeEventListener('resize', onViewportResize);
      reveal();
    }, 420);
    return;
  }

  reveal();
}

function runSearch(value, shouldCollect) {
  submitButton.disabled = true;
  submitButton.textContent = 'Cerco nell’archivio…';
  form.setAttribute('aria-busy', 'true');
  input.blur();

  requestAnimationFrame(() => {
    render(value, shouldCollect);
    form.removeAttribute('aria-busy');
    submitButton.disabled = false;
    submitButton.textContent = submitLabel;
    revealResult();
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const value = input.value.trim();
  if (value) runSearch(value, true);
});

document.querySelectorAll('.examples button').forEach(button => button.addEventListener('click', () => {
  input.value = button.textContent;
  runSearch(input.value, false);
}));
