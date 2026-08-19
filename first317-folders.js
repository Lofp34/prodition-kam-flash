(()=>{
  const D=window.FC_DATA;
  const folders=[
    {id:'voile',parent:null,label:'Voile',desc:'Navigation, manœuvres, réglages et sécurité à bord.'},
    {id:'first317',parent:'voile',label:'First 31.7',desc:'Maîtriser le First 31.7 pour un stage de voile.'},
    {id:'f317-prise',parent:'first317',label:'Prise en main',desc:'Architecture, pont, cockpit et préparation.'},
    {id:'f317-manoeuvres',parent:'first317',label:'Manœuvres',desc:'Virements, empannages, port, mouillage et urgences.'},
    {id:'f317-reglages',parent:'first317',label:'Réglages & performance',desc:'Voiles, équilibre, vitesse et spi.'},
    {id:'f317-systemes',parent:'first317',label:'Sécurité & systèmes',desc:'Moteur, électricité, eau, vannes, gaz et entretien.'},
    {id:'f317-navigation',parent:'first317',label:'Navigation & cartes',desc:'Lire les cartes marines, préparer une route et utiliser les instruments sans dépendre d’un seul écran.'}
  ];
  folders.forEach(f=>{if(!D.folders.some(x=>x.id===f.id))D.folders.push(f)});
  D.decks=D.decks.filter(d=>!String(d.id).startsWith('first317-'));

  function loadScript(src){
    return new Promise((resolve,reject)=>{
      if(document.querySelector(`script[data-extension="${src}"]`)){resolve();return}
      const script=document.createElement('script');
      script.src=src;
      script.dataset.extension=src;
      script.onload=resolve;
      script.onerror=()=>reject(new Error(`Impossible de charger ${src}`));
      document.head.appendChild(script);
    });
  }

  function setupBackButton(){
    const button=document.getElementById('filterToggle');
    if(!button)return;
    button.textContent='← Retour';
    button.classList.remove('filter-toggle');
    button.setAttribute('aria-label','Revenir au niveau précédent');
    button.setAttribute('title','Revenir au dossier contenant ce jeu');
    button.onclick=()=>{
      try{
        if(typeof deck!=='undefined'&&deck&&deck.folder&&typeof window.openFolder==='function'){
          window.openFolder(deck.folder);return;
        }
        if(typeof currentFolder!=='undefined'&&currentFolder){
          const current=D.folders.find(f=>f.id===currentFolder);
          if(current&&current.parent&&typeof window.openFolder==='function'){
            window.openFolder(current.parent);return;
          }
        }
        if(typeof window.goHome==='function')window.goHome();
      }catch(error){
        console.warn('Retour au niveau précédent impossible :',error);
        if(typeof window.goHome==='function')window.goHome();
      }
    };
  }

  const start=()=>{
    setupBackButton();
    Promise.all([
      loadScript('poetry-deck.js?v=1'),
      loadScript('articles-study-core.js?v=5')
    ])
      .then(()=>Promise.all([
        loadScript('article-agent-plugins.js?v=2'),
        loadScript('article-deepseek-harness.js?v=1')
      ]))
      .then(()=>loadScript('first317-navigation-data-1.js?v=1'))
      .then(()=>loadScript('first317-navigation-data-2.js?v=1'))
      .then(()=>loadScript('first317-navigation-data-3.js?v=1'))
      .then(()=>loadScript('first317-navigation-data-4.js?v=1'))
      .then(()=>loadScript('first317-navigation.js?v=1'))
      .then(()=>loadScript('finance-folders.js?v=1'))
      .then(()=>Promise.all([
        loadScript('finance-pea-cto.js?v=1'),
        loadScript('finance-buffett-berkshire.js?v=1'),
        loadScript('finance-munger-modeles.js?v=1'),
        loadScript('finance-marks-graham.js?v=1'),
        loadScript('finance-charles-gave.js?v=1'),
        loadScript('finance-portefeuille-process.js?v=1')
      ]))
      .then(()=>loadScript('rhetorique-folders.js?v=1'))
      .then(()=>loadScript('rhetorique-fondamentaux.js?v=1'))
      .then(()=>loadScript('rhetorique-argumentation.js?v=1'))
      .then(()=>loadScript('rhetorique-style-pratique.js?v=1'))
      .then(()=>loadScript('docker-folders.js?v=1'))
      .then(()=>loadScript('docker-01-fondamentaux-cli.js?v=1'))
      .then(()=>loadScript('docker-02-images-dockerfile.js?v=1'))
      .then(()=>loadScript('docker-03-donnees-reseaux.js?v=1'))
      .then(()=>loadScript('docker-04-compose.js?v=1'))
      .then(()=>loadScript('docker-05-exploitation-diagnostic.js?v=1'))
      .then(()=>loadScript('docker-06-securite-maitrise.js?v=1'))
      .then(()=>loadScript('deck-archive.js?v=1'))
      .catch(error=>console.warn('Chargement des extensions incomplet :',error));
  };

  if(document.readyState==='loading')window.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
