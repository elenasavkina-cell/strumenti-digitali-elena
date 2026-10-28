(() => {
  const root = document.querySelector('[data-ads-channel-test]');
  if (!root) return;

  const form = root.querySelector('form');
  const steps = [...form.querySelectorAll('fieldset')];
  const progress = root.querySelector('.test-progress span');
  const progressText = root.querySelector('.test-progress small');
  const result = root.querySelector('.test-result');
  const resultTitle = result.querySelector('[data-result-title]');
  const resultCopy = result.querySelector('[data-result-copy]');
  const resultWarning = result.querySelector('[data-result-warning]');
  const restart = result.querySelector('[data-restart]');
  const answers = {};

  const outcomes = {
    google: {
      title: 'Parti da una piccola prova su Google Search',
      copy: 'Il tuo caso parte da una domanda già espressa. Scegli un gruppo ristretto di ricerche, un annuncio coerente e una pagina dedicata. Misura richieste, prenotazioni o vendite: non fermarti ai clic.',
      warning: 'Controlla prima che esista davvero un volume di ricerca utile e imposta un limite di spesa.'
    },
    meta: {
      title: 'Parti da una prova su Facebook e Instagram',
      copy: 'La proposta deve essere scoperta. Prepara almeno due creatività e due messaggi, mantieni uguali obiettivo e destinazione e confronta contatti o azioni utili, non soltanto visualizzazioni e reazioni.',
      warning: 'Un post che piace non è automaticamente una campagna che produce risultati economici.'
    },
    whatsapp: {
      title: 'Prova un annuncio che apre WhatsApp',
      copy: 'La conversazione sembra decisiva nel tuo percorso. Definisci chi risponde, entro quanto tempo e quali domande qualificano il contatto. Collega ogni chat a preventivo, prenotazione o vendita.',
      warning: 'La richiesta iniziale non autorizza promozioni future: raccogli e documenta un consenso valido quando necessario.'
    },
    notready: {
      title: 'Prima prepara le basi della campagna',
      copy: 'Non serve scegliere subito una piattaforma, anche se hai già un’idea del canale. Definisci un risultato, prepara la pagina o il processo di risposta e decidi come riconoscere un contatto qualificato. Poi prova un solo canale con un budget limitato.',
      warning: 'Spendere prima di avere destinazione, risposta e misurazione rende difficile capire che cosa non ha funzionato.'
    }
  };

  function updateProgress(index) {
    progress.style.width = `${((index + 1) / steps.length) * 100}%`;
    progressText.textContent = `Domanda ${index + 1} di ${steps.length}`;
  }

  function chooseOutcome() {
    const scores = { google: 0, meta: 0, whatsapp: 0, notready: 0 };
    Object.values(answers).forEach(value => { scores[value] += 1; });
    if (scores.notready >= 2 || answers.q4 === 'notready') return 'notready';
    const candidates = ['google', 'meta', 'whatsapp'];
    const best = Math.max(...candidates.map(key => scores[key]));
    const tied = candidates.filter(key => scores[key] === best);
    if (tied.includes(answers.q1)) return answers.q1;
    if (tied.includes(answers.q2)) return answers.q2;
    return tied[0];
  }

  function showResult() {
    steps.forEach(step => { step.hidden = true; });
    root.querySelector('.test-progress').hidden = true;
    const outcome = outcomes[chooseOutcome()];
    resultTitle.textContent = outcome.title;
    resultCopy.textContent = outcome.copy;
    resultWarning.textContent = outcome.warning;
    result.hidden = false;
    result.focus();
  }

  steps.forEach((step, index) => {
    step.addEventListener('change', event => {
      if (!event.target.matches('input[type="radio"]')) return;
      answers[event.target.name] = event.target.value;
      window.setTimeout(() => {
        step.hidden = true;
        if (index + 1 < steps.length) {
          steps[index + 1].hidden = false;
          updateProgress(index + 1);
          steps[index + 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          showResult();
        }
      }, 160);
    });
  });

  restart.addEventListener('click', () => {
    form.reset();
    Object.keys(answers).forEach(key => delete answers[key]);
    result.hidden = true;
    root.querySelector('.test-progress').hidden = false;
    steps.forEach((step, index) => { step.hidden = index !== 0; });
    updateProgress(0);
    steps[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  updateProgress(0);
})();
