(function(){
  'use strict';
  var key='elena_color_mode_v1';
  var root=document.documentElement;
  var saved=null;

  try{saved=localStorage.getItem(key);}catch(error){}
  if(saved==='light'||saved==='dark') root.setAttribute('data-color-mode',saved);

  function systemIsDark(){return window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;}
  function effectiveMode(){return root.getAttribute('data-color-mode')||(systemIsDark()?'dark':'light');}
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
    button.addEventListener('click',function(){
      var next=effectiveMode()==='dark'?'light':'dark';
      root.setAttribute('data-color-mode',next);
      try{localStorage.setItem(key,next);}catch(error){}
      updateButton(button);
    });
    if(window.matchMedia){
      var media=window.matchMedia('(prefers-color-scheme: dark)');
      var onChange=function(){if(!root.hasAttribute('data-color-mode')) updateButton(button);};
      if(media.addEventListener) media.addEventListener('change',onChange);
      else if(media.addListener) media.addListener(onChange);
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install);
  else install();
})();
