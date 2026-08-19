(()=>{
  if(window.__deckArchiveLoaded)return;
  window.__deckArchiveLoaded=true;

  const ARCHIVE_FOLDER_ID='archives';
  const STORAGE_KEY='fc:archived-decks:v1';
  const D=window.FC_DATA;
  let items=loadItems();

  function loadItems(){
    try{
      const parsed=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');
      if(Array.isArray(parsed)){
        return Object.fromEntries(parsed.map(id=>[String(id),{archivedAt:new Date().toISOString()}]));
      }
      if(parsed&&typeof parsed==='object'&&parsed.items&&typeof parsed.items==='object'){
        return {...parsed.items};
      }
    }catch(error){
      console.warn('Archives illisibles :',error);
    }
    return {};
  }

  function saveItems(){
    try{
      localStorage.setItem(STORAGE_KEY,JSON.stringify({version:1,items}));
      return true;
    }catch(error){
      console.warn('Archivage impossible :',error);
      announce('Impossible d’enregistrer les archives dans ce navigateur.');
      return false;
    }
  }

  function isArchived(id){return Boolean(id&&items[id])}

  function addArchiveFolder(){
    const folder={
      id:ARCHIVE_FOLDER_ID,
      parent:null,
      label:'Archives',
      desc:'Jeux terminés masqués des dossiers actifs. L’archivage reste enregistré sur ce navigateur et chaque jeu peut être restauré.'
    };
    if(!D.folders.some(f=>f.id===folder.id))D.folders.push(folder);
    try{
      if(typeof FOLDERS!=='undefined'&&!FOLDERS.some(f=>f.id===folder.id))FOLDERS.push(folder);
    }catch(_error){}
  }

  function folderPath(folderId){
    const labels=[];
    const visited=new Set();
    let current=folderId;
    try{
      while(current&&!visited.has(current)){
        visited.add(current);
        const found=FOLDERS.find(f=>f.id===current);
        if(!found)break;
        labels.unshift(found.label);
        current=found.parent||null;
      }
    }catch(_error){}
    return labels.join(' → ')||'Dossier d’origine';
  }

  function formatDate(value){
    const date=new Date(value||'');
    if(Number.isNaN(date.getTime()))return '';
    try{return new Intl.DateTimeFormat('fr-FR',{day:'2-digit',month:'short',year:'numeric'}).format(date)}
    catch(_error){return ''}
  }

  function pruneMissingDecks(){
    let changed=false;
    try{
      const valid=new Set(DECKS.map(d=>d.id));
      Object.keys(items).forEach(id=>{
        if(!valid.has(id)){delete items[id];changed=true}
      });
    }catch(_error){}
    if(changed)saveItems();
  }

  function archivedDecks(){
    pruneMissingDecks();
    try{
      return DECKS
        .filter(d=>isArchived(d.id))
        .sort((a,b)=>Date.parse(items[b.id]?.archivedAt||0)-Date.parse(items[a.id]?.archivedAt||0))
        .map(d=>{
          const date=formatDate(items[d.id]?.archivedAt);
          const origin=folderPath(items[d.id]?.sourceFolder||d.folder);
          return {
            ...d,
            badge:'Archivé',
            description:`${origin}${date?` · Archivé le ${date}`:''}. Ouvre le jeu pour le réviser ou le restaurer.`
          };
        });
    }catch(_error){return []}
  }

  function installDeckFilter(){
    const base=typeof window.decksIn==='function'
      ? window.decksIn
      : folderId=>DECKS.filter(d=>d.folder===folderId);
    const enhanced=folderId=>folderId===ARCHIVE_FOLDER_ID
      ? archivedDecks()
      : base(folderId).filter(d=>!isArchived(d.id));
    window.decksIn=enhanced;
    try{decksIn=enhanced}catch(_error){}
  }

  function addStyles(){
    if(document.getElementById('deck-archive-styles'))return;
    const style=document.createElement('style');
    style.id='deck-archive-styles';
    style.textContent=`
      #archiveDeck.archive-ready{background:var(--brand2);color:#fff;border-color:transparent}
      #archiveDeck.archive-restore{background:#fff;color:var(--brand);border:1px solid var(--brand)}
      .archive-toast{position:fixed;left:50%;bottom:22px;z-index:30;max-width:min(520px,calc(100% - 28px));padding:12px 16px;border-radius:14px;background:var(--text);color:#fff;font-weight:800;box-shadow:var(--shadow);opacity:0;transform:translate(-50%,12px);pointer-events:none;transition:opacity .2s,transform .2s}
      .archive-toast.visible{opacity:1;transform:translate(-50%,0)}
      @media(max-width:700px){#archiveDeck{grid-column:1/4}}
    `;
    document.head.appendChild(style);
  }

  function ensureToast(){
    let toast=document.getElementById('archiveToast');
    if(toast)return toast;
    toast=document.createElement('div');
    toast.id='archiveToast';
    toast.className='archive-toast';
    toast.setAttribute('role','status');
    toast.setAttribute('aria-live','polite');
    document.body.appendChild(toast);
    return toast;
  }

  let toastTimer=null;
  function announce(message){
    const toast=ensureToast();
    toast.textContent=message;
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer=setTimeout(()=>toast.classList.remove('visible'),2600);
  }

  function currentDeck(){
    try{return typeof deck!=='undefined'&&deck?deck:null}catch(_error){return null}
  }

  function masteryStats(activeDeck){
    const cards=Array.isArray(activeDeck?.cards)?activeDeck.cards:[];
    let done=0;
    try{
      const known=typeof mastered!=='undefined'&&mastered instanceof Set?mastered:new Set();
      cards.forEach(c=>{
        const id=`${c.category}|${c.front}`;
        if(known.has(id))done+=1;
      });
    }catch(_error){}
    return {done,total:cards.length,complete:cards.length>0&&done===cards.length};
  }

  function ensureButton(){
    let button=document.getElementById('archiveDeck');
    if(button)return button;
    const masteredButton=document.getElementById('mastered');
    if(!masteredButton)return null;
    button=document.createElement('button');
    button.id='archiveDeck';
    button.type='button';
    button.className='secondary';
    button.addEventListener('click',handleArchiveAction);
    masteredButton.insertAdjacentElement('afterend',button);
    return button;
  }

  function updateButton(){
    const button=ensureButton();
    if(!button)return;
    const active=currentDeck();
    button.classList.remove('archive-ready','archive-restore');
    if(!active){button.hidden=true;return}
    button.hidden=false;
    if(isArchived(active.id)){
      button.textContent='↩ Restaurer le jeu';
      button.classList.add('archive-restore');
      button.title='Remettre ce jeu dans son dossier d’origine sans perdre la progression.';
      return;
    }
    const stats=masteryStats(active);
    if(stats.complete){
      button.textContent='Archiver ce jeu terminé';
      button.classList.add('archive-ready');
      button.title='Toutes les cartes sont maîtrisées : déplacer ce jeu dans Archives.';
    }else{
      button.textContent='Archiver le jeu';
      button.title=`${stats.done} carte${stats.done>1?'s':''} maîtrisée${stats.done>1?'s':''} sur ${stats.total}. L’archivage reste possible avec confirmation.`;
    }
  }

  function configureBackButton(){
    const button=document.getElementById('filterToggle');
    const active=currentDeck();
    if(!button||!active)return;
    button.textContent='← Retour';
    if(isArchived(active.id)){
      button.title='Revenir aux jeux archivés';
      button.onclick=()=>window.openFolder(ARCHIVE_FOLDER_ID);
    }else{
      button.title='Revenir au dossier contenant ce jeu';
      button.onclick=()=>window.openFolder(active.folder);
    }
  }

  function archive(active){
    items={...items,[active.id]:{
      archivedAt:new Date().toISOString(),
      sourceFolder:active.folder
    }};
    if(!saveItems())return;
    try{if(typeof renderHome==='function')renderHome()}catch(_error){}
    announce('Jeu archivé. Sa progression est conservée.');
    window.openFolder(ARCHIVE_FOLDER_ID);
  }

  function restore(active){
    const sourceFolder=items[active.id]?.sourceFolder||active.folder||null;
    const next={...items};
    delete next[active.id];
    items=next;
    if(!saveItems())return;
    try{if(typeof renderHome==='function')renderHome()}catch(_error){}
    announce('Jeu restauré avec sa progression.');
    if(sourceFolder&&typeof window.openFolder==='function')window.openFolder(sourceFolder);
    else if(typeof window.goHome==='function')window.goHome();
  }

  function handleArchiveAction(){
    const active=currentDeck();
    if(!active)return;
    if(isArchived(active.id)){restore(active);return}
    const stats=masteryStats(active);
    const message=stats.complete
      ? 'Archiver ce jeu terminé ? Il disparaîtra de son dossier actif mais restera accessible dans Archives.'
      : `Seulement ${stats.done} carte${stats.done>1?'s':''} sur ${stats.total} ${stats.done>1?'sont':'est'} marquée${stats.done>1?'s':''} comme maîtrisée${stats.done>1?'s':''}. Archiver quand même ?`;
    if(window.confirm(message))archive(active);
  }

  function wrapOpenDeck(){
    const base=window.openDeck;
    if(typeof base!=='function'||base.__archiveWrapped)return;
    const enhanced=function(id){
      base(id);
      setTimeout(()=>{updateButton();configureBackButton()},0);
    };
    enhanced.__archiveWrapped=true;
    window.openDeck=enhanced;
  }

  function observeMastery(){
    const target=document.getElementById('masteredCount');
    if(!target)return;
    new MutationObserver(updateButton).observe(target,{childList:true,subtree:true,characterData:true});
  }

  addArchiveFolder();
  addStyles();
  installDeckFilter();
  ensureButton();
  wrapOpenDeck();
  observeMastery();
  window.DeckArchive={
    isArchived,
    archive:id=>{
      const found=DECKS.find(d=>d.id===id);
      if(found)archive(found);
    },
    restore:id=>{
      const found=DECKS.find(d=>d.id===id);
      if(found)restore(found);
    },
    list:()=>Object.keys(items)
  };
  try{if(typeof renderHome==='function')renderHome()}catch(_error){}
  updateButton();
})();
