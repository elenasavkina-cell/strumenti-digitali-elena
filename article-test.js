document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-ai-check]').forEach((test) => {
    const form = test.querySelector('.test-form');
    const questions = [...form.querySelectorAll('fieldset')];
    const progress = test.querySelector('.test-progress');
    const progressBar = progress.querySelector('span');
    const progressText = progress.querySelector('small');
    const result = test.querySelector('.test-result');
    const resultTitle = result.querySelector('h3');
    const resultCopy = result.querySelector('[data-result-copy]');
    const resultWarning = result.querySelector('[data-result-warning]');

    const showQuestion = (index) => {
      questions.forEach((question, i) => { question.hidden = i !== index; });
      progressBar.style.width = `${((index + 1) / questions.length) * 100}%`;
      progressText.textContent = `Domanda ${index + 1} di ${questions.length}`;
    };

    form.addEventListener('change', (event) => {
      if (!event.target.matches('input[type="radio"]')) return;
      const current = questions.findIndex((question) => !question.hidden);
      if (current < questions.length - 1) {
        window.setTimeout(() => showQuestion(current + 1), 180);
        return;
      }

      const score = [...form.querySelectorAll('input:checked')]
        .reduce((total, input) => total + Number(input.value), 0);
      const requiredForTop = [...form.querySelectorAll('input[data-required-for-top]')];
      const canShowTopResult = requiredForTop.length === 0 || requiredForTop.every((input) => input.checked);
      const selectedWarning = form.querySelector('input[data-result-warning]:checked');
      let title = 'Fiducia da riequilibrare';
      let copy = 'Le risposte dell’AI possono sembrare sicure anche quando sono incomplete. Aggiungi almeno un controllo esterno prima di usarle per una decisione.';
      if (score >= 5 && canShowTopResult) {
        title = 'Verifica consapevole';
        copy = 'Confronti fonti e alternative prima di decidere. Mantieni questo metodo soprattutto quando un errore può avere conseguenze importanti.';
      } else if (score >= 3) {
        title = 'Verifica occasionale';
        copy = 'Hai già alcune buone abitudini, ma non le applichi sempre. Puoi rendere il controllo più regolare con cinque richieste semplici.';
      }

      form.hidden = true;
      progress.hidden = true;
      resultTitle.textContent = title;
      resultCopy.textContent = copy;
      if (resultWarning) {
        resultWarning.textContent = selectedWarning?.dataset.resultWarning || '';
        resultWarning.hidden = !selectedWarning;
      }
      result.hidden = false;
      result.focus();
    });

    test.querySelector('[data-restart]').addEventListener('click', () => {
      form.reset();
      form.hidden = false;
      result.hidden = true;
      progress.hidden = false;
      showQuestion(0);
      questions[0].querySelector('input').focus();
    });

    showQuestion(0);
  });
});
