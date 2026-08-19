(()=>{
  if(window.__dockerCourseLoaded)return;
  window.__dockerCourseLoaded=true;

  const D=window.FC_DATA;
  const folder={
    id:'docker',
    parent:'technique',
    label:'Docker — de l’initiation à la maîtrise',
    desc:'Comprendre, construire, connecter, exploiter et sécuriser des applications conteneurisées.'
  };

  if(!D.folders.some(f=>f.id===folder.id))D.folders.push(folder);
  try{
    if(typeof FOLDERS!=='undefined'&&!FOLDERS.some(f=>f.id===folder.id))FOLDERS.push(folder);
  }catch(_error){}

  const normalizeCard=c=>Array.isArray(c)
    ? {category:c[0],front:c[1],back:c[2],...(c[3]||{})}
    : c;

  function addDeck(rawDeck){
    const raw={...rawDeck,folder:'docker'};
    D.decks=D.decks.filter(d=>d.id!==raw.id);
    D.decks.push(raw);

    try{
      if(typeof DECKS!=='undefined'){
        const normalized={...raw,cards:(raw.cards||[]).map(normalizeCard)};
        const existing=DECKS.findIndex(d=>d.id===raw.id);
        if(existing>=0)DECKS.splice(existing,1,normalized);
        else DECKS.push(normalized);
      }
    }catch(_error){}

    try{if(typeof renderHome==='function')renderHome()}catch(_error){}

    const directId=decodeURIComponent((location.hash.match(/deck=([^&]+)/)||[])[1]||'');
    if(directId===raw.id&&typeof window.openDeck==='function'){
      setTimeout(()=>window.openDeck(raw.id),0);
    }
    return raw;
  }

  if(!document.getElementById('docker-course-line-breaks')){
    const style=document.createElement('style');
    style.id='docker-course-line-breaks';
    style.textContent='.question,.answer{white-space:pre-line;}';
    document.head.appendChild(style);
  }

  window.DockerCourse={addDeck};
  try{if(typeof renderHome==='function')renderHome()}catch(_error){}
})();
