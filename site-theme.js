(function(){
  'use strict';
  var key='elena_color_mode_v1';
  var root=document.documentElement;
  var saved=null;
  var darkImages={
    '/assets/ai-studio-imparare.svg':'/assets/ai-studio-imparare-dark.svg',
    '/assets/hero-verifica.svg':'/assets/hero-verifica-dark.svg',
    '/assets/ai-allucinazioni.svg':'/assets/ai-allucinazioni-dark.svg',
    '/assets/ai-act-regole-europee.svg':'/assets/ai-act-regole-europee-dark.svg',
    '/assets/ai-compacenza.svg':'/assets/ai-compacenza-dark.svg',
    '/assets/algoritmi-scelta-viaggio.svg':'/assets/algoritmi-scelta-viaggio-dark.svg',
    '/assets/chatgpt-claude-gemini.svg':'/assets/chatgpt-claude-gemini-dark.svg',
    '/assets/file-caricati-ai-privacy.svg':'/assets/file-caricati-ai-privacy-dark.svg',
    '/assets/recensioni-online.svg':'/assets/recensioni-online-dark.svg',
    '/assets/telefono-pubblicita-personalizzata.svg':'/assets/telefono-pubblicita-personalizzata-dark.svg',
    '/assets/tour-virtuali-realta-aumentata.svg':'/assets/tour-virtuali-realta-aumentata-dark.svg',
    '/assets/traduttori-in-viaggio.svg':'/assets/traduttori-in-viaggio-dark.svg',
    '/assets/sito-google-search-console.svg':'/assets/sito-google-search-console-dark.svg'
  };

  try{saved=localStorage.getItem(key);}catch(error){}
  if(saved==='light'||saved==='dark') root.setAttribute('data-color-mode',saved);

  function systemIsDark(){return window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;}
  function effectiveMode(){return root.getAttribute('data-color-mode')||(systemIsDark()?'dark':'light');}
  function updateImages(){
    var dark=effectiveMode()==='dark';
    document.querySelectorAll('img[src]').forEach(function(img){
      var current=img.getAttribute('src');
      if(dark&&darkImages[current]){
        img.setAttribute('data-light-src',current);
        img.setAttribute('src',darkImages[current]);
      }else if(!dark&&img.hasAttribute('data-light-src')){
        img.setAttribute('src',img.getAttribute('data-light-src'));
        img.removeAttribute('data-light-src');
      }
    });
  }
  function updateButton(button){
    var dark=effectiveMode()==='dark';
    button.querySelector('[aria-hidden="true"]').textContent=dark?'☀':'☾';
    button.setAttribute('aria-label',dark?'Attiva il tema chiaro':'Attiva il tema scuro');
    button.setAttribute('title',dark?'Tema chiaro':'Tema scuro');
  }

  function install(){
    var header=document.querySelector('.site-header');
    if(!header||header.querySelector('.theme-toggle')) return;
    var button=document.createElement('button');
    button.type='button';
    button.className='theme-toggle';
    button.innerHTML='<span aria-hidden="true"></span><span class="theme-toggle__label">Cambia tema</span>';
    var nav=header.querySelector('nav');
    header.insertBefore(button,nav||null);
    updateButton(button);
    updateImages();
    button.addEventListener('click',function(){
      var next=effectiveMode()==='dark'?'light':'dark';
      root.setAttribute('data-color-mode',next);
      try{localStorage.setItem(key,next);}catch(error){}
      updateButton(button);
      updateImages();
    });
    if(window.matchMedia){
      var media=window.matchMedia('(prefers-color-scheme: dark)');
      var onChange=function(){if(!root.hasAttribute('data-color-mode')){updateButton(button);updateImages();}};
      if(media.addEventListener) media.addEventListener('change',onChange);
      else if(media.addListener) media.addListener(onChange);
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install);
  else install();
})();
