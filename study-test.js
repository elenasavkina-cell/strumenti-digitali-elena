document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('[data-study-test]').forEach((test)=>{
    const form=test.querySelector('.study-form');
    const questions=[...form.querySelectorAll('fieldset')];
    const progress=test.querySelector('.study-progress');
    const bar=progress.querySelector('span');
    const counter=progress.querySelector('small');
    const result=test.querySelector('.study-result');
    const title=result.querySelector('h3');
    const explanation=result.querySelector('[data-explanation]');
    const prompt=result.querySelector('textarea');
    const status=result.querySelector('.copy-status');
    const paths={
      A:{title:'Capire passo dopo passo',explanation:'Le risposte indicano che oggi vuoi chiarire un argomento senza saltare i passaggi importanti.',prompt:`Sto studiando ARGOMENTO. Il mio livello è LIVELLO (iniziale o intermedio). Rispondi in italiano.\n\nPrima di iniziare, chiedimi quanto tempo ho a disposizione e quale risultato devo raggiungere, e aspetta la mia risposta prima di procedere. Poi chiedimi che cosa so già. Spiegami l’argomento un passaggio alla volta, con parole semplici e un esempio, senza saltare i concetti importanti.\n\nDopo ogni passaggio:\n1. chiedimi di rispiegarlo con parole mie e aspetta la risposta;\n2. correggi solo ciò che è necessario;\n3. se non ho capito, cambia esempio;\n4. chiedimi se il passaggio è chiaro e vai avanti solo dopo la mia rispiegazione corretta.\n\nNon darmi un riassunto completo all’inizio. Alla fine proponimi un caso semplice da risolvere in autonomia. Non inventare fonti, citazioni o dati: se non sei sicuro, dillo e indica che cosa devo controllare.`},
      B:{title:'Esercitarti senza avere subito la soluzione',explanation:'Le risposte indicano che oggi vuoi metterti alla prova senza delegare il ragionamento.',prompt:`Devo esercitarmi su ARGOMENTO per VERIFICA O ESAME. Rispondi in italiano.\n\nPrima di iniziare, chiedimi quanto tempo ho a disposizione e quale risultato devo raggiungere, e aspetta la mia risposta prima di procedere. Non svolgere il compito al posto mio e non darmi subito le risposte. Fammi una domanda alla volta, partendo da un livello semplice e salendo di difficoltà.\n\nDopo ogni mia risposta:\n1. dimmi che cosa è corretto;\n2. se sbaglio, dammi un solo indizio e lasciami riprovare;\n3. spiega la soluzione solo dopo il secondo tentativo;\n4. tieni un elenco degli errori che ripeto.\n\nOgni cinque domande fammi un breve ripasso sui miei errori. Alla fine fammi una prova senza indizi e dimmi quali parti devo ristudiare. Non inventare fonti, citazioni o dati: se non sei sicuro, dillo.`},
      C:{title:'Verificare e discutere',explanation:'Le risposte indicano che oggi vuoi controllare un ragionamento e cercare obiezioni, non una conclusione pronta.',prompt:`Sto approfondendo ARGOMENTO. Voglio usare questa conversazione per controllare il mio ragionamento, non per ricevere una conclusione pronta. Rispondi in italiano.\n\nPrima di iniziare, chiedimi quanto tempo ho a disposizione e quale risultato devo raggiungere, e aspetta la mia risposta prima di procedere. Ti incollerò la mia spiegazione. Analizzala separando:\n1. ciò che è corretto;\n2. ciò che è incompleto;\n3. ciò che ho dedotto io;\n4. le obiezioni possibili;\n5. le affermazioni per cui serve una fonte.\n\nProponi almeno un’interpretazione alternativa e un caso in cui il mio ragionamento non regge. Non darmi ragione per cortesia. Se non hai una fonte verificabile, dillo chiaramente e non inventarla.\n\nAlla fine chiedimi di riscrivere la conclusione con parole mie e proponimi un caso nuovo. Non riscrivere il mio testo finché non ho provato io.`}
    };
    const show=(index)=>{questions.forEach((q,i)=>q.hidden=i!==index);bar.style.width=`${((index+1)/questions.length)*100}%`;counter.textContent=`Domanda ${index+1} di ${questions.length}`;};
    const reveal=()=>{result.hidden=false;result.focus({preventScroll:true});requestAnimationFrame(()=>result.scrollIntoView({behavior:'smooth',block:'start'}));};
    form.addEventListener('change',(event)=>{
      if(!event.target.matches('input[type="radio"]'))return;
      const current=questions.findIndex(q=>!q.hidden);
      if(current<questions.length-1){setTimeout(()=>show(current+1),160);return;}
      const answers=[...form.querySelectorAll('input:checked')];
      const scores={A:0,B:0,C:0};answers.forEach(input=>scores[input.value]++);
      const max=Math.max(...Object.values(scores));let winner=Object.keys(scores).find(key=>scores[key]===max);
      const tied=Object.keys(scores).filter(key=>scores[key]===max);if(tied.length>1)winner=answers[2].value;
      const selected=paths[winner];form.hidden=true;progress.hidden=true;title.textContent=`Percorso suggerito dalle tue risposte: ${selected.title}`;explanation.textContent=selected.explanation+' Sostituisci le parole in maiuscolo e copia la richiesta.';prompt.value=selected.prompt;status.textContent='';reveal();
    });
    test.querySelector('[data-copy]').addEventListener('click',async(event)=>{try{await navigator.clipboard.writeText(prompt.value);event.currentTarget.textContent='Copiata';status.textContent='Richiesta copiata.';setTimeout(()=>event.currentTarget.textContent='Copia la richiesta',2000);}catch(error){prompt.focus();prompt.select();status.textContent='Non riesco a copiare in automatico. Seleziona il testo e copialo a mano.';}});
    const focusPromptForEditing=()=>{
      const match=prompt.value.match(/ARGOMENTO|LIVELLO|VERIFICA O ESAME/);
      const start=match?match.index:0;
      const end=match?match.index+match[0].length:start;
      let settled=false;
      let settleTimer;
      const selectPlaceholder=()=>{
        prompt.focus({preventScroll:true});
        prompt.setSelectionRange(start,end);
      };
      const finish=()=>{
        if(settled)return;
        settled=true;
        clearTimeout(settleTimer);
        if(window.visualViewport)window.visualViewport.removeEventListener('resize',onViewportResize);
        selectPlaceholder();
        prompt.scrollIntoView({behavior:'smooth',block:'center'});
      };
      const onViewportResize=()=>{
        clearTimeout(settleTimer);
        settleTimer=setTimeout(finish,120);
      };
      selectPlaceholder();
      requestAnimationFrame(()=>requestAnimationFrame(selectPlaceholder));
      if(window.visualViewport&&window.innerWidth<=760){
        window.visualViewport.addEventListener('resize',onViewportResize);
        settleTimer=setTimeout(finish,500);
      }else{
        finish();
      }
    };
    test.querySelector('[data-edit]').addEventListener('click',focusPromptForEditing);
    test.querySelector('[data-restart]').addEventListener('click',()=>{form.reset();form.hidden=false;result.hidden=true;progress.hidden=false;show(0);questions[0].querySelector('input').focus();});
    show(0);
  });
});
