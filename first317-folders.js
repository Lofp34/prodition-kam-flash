(()=>{
  const D=window.FC_DATA;
  const F=[
    {"id":"voile","parent":null,"label":"Voile","desc":"Navigation, manœuvres, réglages et sécurité à bord."},
    {"id":"first317","parent":"voile","label":"First 31.7","desc":"Maîtriser le First 31.7 pour un stage de voile."},
    {"id":"f317-prise","parent":"first317","label":"Prise en main","desc":"Architecture, pont, cockpit et préparation."},
    {"id":"f317-manoeuvres","parent":"first317","label":"Manœuvres","desc":"Virements, empannages, port, mouillage et urgences."},
    {"id":"f317-reglages","parent":"first317","label":"Réglages & performance","desc":"Voiles, équilibre, vitesse et spi."},
    {"id":"f317-systemes","parent":"first317","label":"Sécurité & systèmes","desc":"Moteur, électricité, eau, vannes, gaz et entretien."}
  ];

  F.forEach(f=>{
    if(!D.folders.some(x=>x.id===f.id)) D.folders.push(f);
  });
  D.decks=D.decks.filter(d=>!String(d.id).startsWith('first317-'));

  // Le bouton mobile « Filtres » devient un vrai retour au dossier contenant le jeu.
  window.addEventListener('DOMContentLoaded',()=>{
    const backButton=document.getElementById('filterToggle');
    if(!backButton) return;

    backButton.textContent='← Retour';
    backButton.classList.remove('filter-toggle');
    backButton.setAttribute('aria-label','Revenir au niveau précédent');
    backButton.setAttribute('title','Revenir au dossier contenant ce jeu');

    backButton.onclick=()=>{
      try{
        // Depuis un jeu de cartes : revenir à son dossier immédiat.
        if(typeof deck!=='undefined' && deck && deck.folder && typeof window.openFolder==='function'){
          window.openFolder(deck.folder);
          return;
        }

        // Solution de repli si le bouton est utilisé depuis un dossier.
        if(typeof currentFolder!=='undefined' && currentFolder){
          const current=D.folders.find(f=>f.id===currentFolder);
          if(current && current.parent && typeof window.openFolder==='function'){
            window.openFolder(current.parent);
            return;
          }
        }

        if(typeof window.goHome==='function') window.goHome();
      }catch(error){
        console.warn('Retour au niveau précédent impossible :',error);
        if(typeof window.goHome==='function') window.goHome();
      }
    };
  });
})();
