(()=>{
  if(window.__first317NavigationLoaded)return;
  window.__first317NavigationLoaded=true;

  const D=window.FC_DATA;
  const folder={"id":"f317-navigation","parent":"first317","label":"Navigation & cartes","desc":"Lire les cartes marines, préparer une route et utiliser les instruments sans dépendre d’un seul écran."};
  if(!D.folders.some(f=>f.id===folder.id))D.folders.push(folder);
  try{
    if(typeof FOLDERS!=='undefined'&&!FOLDERS.some(f=>f.id===folder.id))FOLDERS.push(folder);
  }catch(_error){}

  const raw={...{"id":"first317-navigation-cartes-instruments","folder":"f317-navigation","badge":"First 31.7","title":"First 31.7 — Navigation, cartes & instruments","subtitle":"54 cartes généralistes, dont 27 illustrées, pour préparer, suivre et sécuriser une navigation côtière.","description":"Carte marine, coordonnées, profondeurs, cap et route, balisage, GPS, compas, sondeur, AIS, VHF et méthode de navigation.","phrases":["La référence est la combinaison : carte officielle à jour, observation extérieure et instruments recoupés.","Le GPS donne une position ; il ne garantit ni la profondeur disponible ni l’absence de danger.","Toujours savoir : où suis-je, où vais-je, quel est le prochain danger et quelle est ma porte de sortie.","Le bateau réel, son tirant d’eau, ses offsets et le briefing du moniteur restent prioritaires.","Les photos sont pédagogiques et génériques sauf mention contraire."]},cards:[...(window.FIRST317_NAV_CARDS||[])]};
  D.decks=D.decks.filter(d=>d.id!==raw.id);
  D.decks.push(raw);

  try{
    if(typeof DECKS!=='undefined'){
      const normalized={...raw,cards:raw.cards.map(c=>Array.isArray(c)?{category:c[0],front:c[1],back:c[2]}:c)};
      const existing=DECKS.findIndex(d=>d.id===raw.id);
      if(existing>=0)DECKS.splice(existing,1,normalized);
      else DECKS.push(normalized);
    }
  }catch(_error){}

  if(!document.getElementById('navigation-line-breaks')){
    const style=document.createElement('style');
    style.id='navigation-line-breaks';
    style.textContent='.question,.answer{white-space:pre-line;}';
    document.head.appendChild(style);
  }

  try{if(typeof renderHome==='function')renderHome()}catch(_error){}
  const directId=decodeURIComponent((location.hash.match(/deck=([^&]+)/)||[])[1]||'');
  if(directId===raw.id&&typeof window.openDeck==='function')setTimeout(()=>window.openDeck(raw.id),0);
})();
