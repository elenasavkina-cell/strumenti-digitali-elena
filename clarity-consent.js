(()=>{
  const KEY='elena_clarity_consent_v1';
  const PROJECT='z0p2q09d71';
  let clarityLoaded=false;

  function loadClarity(){
    if(clarityLoaded||document.querySelector('script[data-clarity-project]')) return;
    clarityLoaded=true;
    window.clarity=window.clarity||function(){(window.clarity.q=window.clarity.q||[]).push(arguments)};
    const script=document.createElement('script');
    script.async=true;
    script.dataset.clarityProject=PROJECT;
    script.src='https://www.clarity.ms/tag/'+PROJECT;
    document.head.appendChild(script);
    window.clarity('consentv2',{ad_Storage:'denied',analytics_Storage:'granted'});
  }

  function removeClarityCookies(){
    if(typeof window.clarity==='function'){
      window.clarity('consentv2',{ad_Storage:'denied',analytics_Storage:'denied'});
      window.clarity('consent',false);
    }
    ['_clck','_clsk','CLID','ANONCHK','MR','MUID','SM'].forEach(name=>{
      document.cookie=name+'=; Max-Age=0; path=/; SameSite=Lax';
      document.cookie=name+'=; Max-Age=0; path=/; domain=.'+location.hostname+'; SameSite=Lax';
    });
  }

  function banner(){
    let node=document.querySelector('[data-cookie-banner]');
    if(node) return node;
    node=document.createElement('section');
    node.className='cookie-banner';
    node.dataset.cookieBanner='';
    node.setAttribute('role','region');
    node.setAttribute('aria-labelledby','cookie-title');
    node.innerHTML='<div class="cookie-banner__copy"><strong id="cookie-title">Statistiche e privacy</strong><p>Con il tuo consenso usiamo Microsoft Clarity per capire come viene utilizzato il sito. Puoi accettare o rifiutare. <a href="/privacy/">Privacy</a>.</p></div><div class="cookie-banner__actions"><button type="button" data-cookie-choice="deny">Rifiuta</button><button type="button" class="cookie-accept" data-cookie-choice="accept">Accetta</button></div>';
    document.body.appendChild(node);
    return node;
  }

  function closeBanner(){const node=document.querySelector('[data-cookie-banner]');if(node)node.remove()}

  function choose(value){
    localStorage.setItem(KEY,value);
    if(value==='granted') loadClarity();
    else removeClarityCookies();
    closeBanner();
  }

  document.addEventListener('DOMContentLoaded',()=>{
    const css=document.createElement('link');
    css.rel='stylesheet';css.href='/cookie-consent.css';document.head.appendChild(css);
    const footer=document.querySelector('.site-footer span:last-child');
    if(footer&&!footer.querySelector('[data-cookie-preferences]')){
      footer.insertAdjacentHTML('beforeend',' · <button type="button" class="cookie-preferences" data-cookie-preferences>Preferenze cookie</button>');
    }
    document.addEventListener('click',event=>{
      const choice=event.target.closest('[data-cookie-choice]');
      if(choice){choose(choice.dataset.cookieChoice==='accept'?'granted':'denied');return}
      if(event.target.closest('[data-cookie-preferences]')){banner().querySelector('button').focus()}
    });
    const state=localStorage.getItem(KEY);
    if(state==='granted') loadClarity();
    else if(state!=='denied') banner();
  });
})();