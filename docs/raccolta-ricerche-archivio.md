# Raccolta delle ricerche dell’archivio

Aggiornato il 22 ottobre 2026.

## Obiettivo

Conservare, con consenso statistico, le domande reali formulate in “Chiedi all’archivio” per individuare temi mancanti e migliorare articoli e percorsi.

## Dati registrati

- `domanda`: testo libero, massimo 500 caratteri;
- `tema`: identificatore della scheda principale oppure `nessuna-corrispondenza`;
- `esito`: `risultato-trovato` oppure `nessun-risultato`;
- `data`: data e ora ISO.

Non vengono richiesti nome o e-mail. La stessa domanda normalizzata viene inviata una sola volta per sessione.

## Consenso

La raccolta avviene soltanto quando `elena_statistics_consent_v2` vale `granted`. Se il consenso manca o viene rifiutato, ricerca e risultati restano pienamente funzionanti nel browser.

Il campo usa `data-clarity-mask="true"`; il testo non deve essere inviato a Clarity.

## Architettura portabile

Il motore di ricerca, il consenso e la presentazione dei risultati non dipendono da Netlify.

Il solo punto sostituibile è la funzione `recordQuery()` in `assistente/assistant.js`. Oggi invia un POST standard `application/x-www-form-urlencoded` all’endpoint relativo `/`, rilevato da Netlify Forms tramite il modulo nascosto `archive-queries`.

Non usare URL con parametri e non inserire chiamate Netlify nel motore di ricerca.

## Migrazione su server proprio

1. Creare sul server un endpoint, per esempio `POST /api/archive-query`.
2. Conservare gli stessi quattro campi e gli stessi limiti.
3. Proteggere l’endpoint con limite di frequenza, controllo lunghezza e validazione dei valori.
4. Sostituire soltanto `QUERY_COLLECTION_ENDPOINT` e, se necessario, il formato di `recordQuery()`.
5. Esportare i dati da Netlify Forms in CSV e importarli nel database scelto.
6. Rimuovere il modulo nascosto `archive-queries` solo dopo avere verificato il nuovo endpoint.
7. Aggiornare Privacy indicando server, responsabili e tempi di conservazione effettivi.

## Database consigliato per la migrazione

Una tabella PostgreSQL semplice e portabile:

```sql
create table archive_queries (
  id bigint generated always as identity primary key,
  question varchar(500) not null,
  topic varchar(80) not null,
  outcome varchar(40) not null,
  created_at timestamptz not null default now()
);
```

PostgreSQL consente esportazione e trasferimento tra server senza vincolare il sito a Netlify, Supabase o un altro singolo fornitore.

## Regole da mantenere

- raccolta disattivata senza consenso;
- nessun dato inserito nell’URL;
- nessuna domanda inviata a Clarity;
- massimo 500 caratteri;
- avviso di non inserire dati personali;
- conservazione massima dichiarata: sei mesi;
- possibilità di esportazione;
- guasti della raccolta non devono bloccare la ricerca;
- esempi cliccabili non devono essere registrati come domande reali.
