const tabs=[...document.querySelectorAll('[role="tab"]')];
const panels=[...document.querySelectorAll('[role="tabpanel"]')];

function openLevel(tab){
  tabs.forEach(item=>{
    const selected=item===tab;
    item.classList.toggle('active',selected);
    item.setAttribute('aria-selected',String(selected));
    item.tabIndex=selected?0:-1;
  });
  panels.forEach(panel=>{panel.hidden=panel.id!==tab.getAttribute('aria-controls')});
}

tabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>openLevel(tab));
  tab.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight'].includes(event.key))return;
    event.preventDefault();
    const direction=event.key==='ArrowRight'?1:-1;
    const next=tabs[(index+direction+tabs.length)%tabs.length];
    openLevel(next);
    next.focus();
  });
});

document.querySelectorAll('[data-level-test]').forEach(test=>{
  const form=test.querySelector('form');
  const questions=[...form.querySelectorAll('fieldset')];
  const progress=test.querySelector('.level-test-progress');
  const bar=progress.querySelector('span');
  const progressText=progress.querySelector('small');
  const result=test.querySelector('.level-test-result');
  let recommended='iniziale';

  function showStep(index){
    questions.forEach((question,i)=>{question.hidden=i!==index});
    bar.style.width=`${((index+1)/questions.length)*100}%`;
    progressText.textContent=`Domanda ${index+1} di ${questions.length}`;
  }

  form.addEventListener('change',event=>{
    if(!event.target.matches('input[type="radio"]'))return;
    const current=questions.findIndex(question=>!question.hidden);
    if(current<questions.length-1){window.setTimeout(()=>showStep(current+1),180);return}
    const score=[...form.querySelectorAll('input:checked')].reduce((sum,input)=>sum+Number(input.value),0);
    let title='Livello 1 — Capire e collaborare con l’AI';
    let copy='Parti dalle basi: richieste chiare, valutazione delle risposte e riconoscimento dei limiti. Costruirai fondamenta utili per tutti i livelli successivi.';
    recommended='iniziale';
    if(score>=8){title='Livello 3 — Costruire agenti, automazioni e soluzioni';copy='Hai già un metodo solido. Puoi concentrarti sulla progettazione di sistemi, integrazioni e controlli, tornando ai livelli precedenti quando serve.';recommended='avanzato'}
    else if(score>=4){title='Livello 2 — Trasformare le conversazioni in metodo';copy='Conosci già le basi. Il passo successivo è rendere le risposte più affidabili e trasformare le buone conversazioni in procedure riutilizzabili.';recommended='intermedio'}
    form.hidden=true;progress.hidden=true;result.hidden=false;
    result.querySelector('h3').textContent=title;
    result.querySelector('[data-level-copy]').textContent=copy;
    result.focus();
  });

  test.querySelector('[data-go-level]').addEventListener('click',()=>{
    const tab=document.querySelector(`#tab-${recommended}`);
    openLevel(tab);
    document.querySelector('.level-picker').scrollIntoView({behavior:'smooth',block:'start'});
    tab.focus();
  });

  test.querySelector('[data-level-restart]').addEventListener('click',()=>{
    form.reset();form.hidden=false;result.hidden=true;progress.hidden=false;showStep(0);
    questions[0].querySelector('input').focus();
  });

  showStep(0);
});
