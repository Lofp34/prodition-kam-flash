(()=>{
  if(window.__articleStudyCoreLoaded)return;
  window.__articleStudyCoreLoaded=true;

  const D=window.FC_DATA;
  const articleFolder={
    id:'articles-etude',
    parent:null,
    label:'Articles à l’étude',
    desc:'Lire un article, puis vérifier sa compréhension et en retenir les apprentissages essentiels.'
  };

  const normalizeCard=c=>Array.isArray(c)
    ? {category:c[0],front:c[1],back:c[2],...(c[3]||{})}
    : c;
  const normalizeDeck=d=>({...d,cards:(d.cards||[]).map(normalizeCard)});

  function syncFolder(){
    if(!D.folders.some(f=>f.id===articleFolder.id))D.folders.push(articleFolder);
    try{
      if(typeof FOLDERS!=='undefined'&&!FOLDERS.some(f=>f.id===articleFolder.id))FOLDERS.push(articleFolder);
    }catch(_error){}
  }

  function refreshHome(){
    try{
      if(typeof renderHome==='function')renderHome();
    }catch(_error){}
  }

  function addArticle(id,title,article,cards=[]){
    const deckId=`article-study-${id}`;
    const rawDeck={
      id:deckId,
      folder:'articles-etude',
      badge:'Article',
      title,
      subtitle:article.source||'Article à étudier',
      description:article.description||article.takeaway||'Lire la source puis tester sa compréhension.',
      article,
      phrases:article.learningGoals||[],
      cards
    };

    D.decks=D.decks.filter(d=>d.id!==deckId);
    D.decks.push(rawDeck);

    try{
      if(typeof DECKS!=='undefined'){
        const normalized=normalizeDeck(rawDeck);
        const existing=DECKS.findIndex(d=>d.id===deckId);
        if(existing>=0)DECKS.splice(existing,1,normalized);
        else DECKS.push(normalized);
      }
    }catch(_error){}

    refreshHome();

    const directId=decodeURIComponent((location.hash.match(/deck=([^&]+)/)||[])[1]||'');
    if(directId===deckId&&typeof window.openDeck==='function'){
      setTimeout(()=>window.openDeck(deckId),0);
    }
    return rawDeck;
  }

  window.ArticleStudy={addArticle};
  syncFolder();

  function initInterface(){
    const stage=document.querySelector('.stage');
    if(!stage||document.getElementById('articlePanel'))return;

    const style=document.createElement('style');
    style.id='article-study-styles';
    style.textContent=`
      .article-panel{width:min(780px,100%);margin:14px auto 18px;padding:22px;border:1px solid var(--line);border-radius:var(--r);background:rgba(255,255,255,.84);box-shadow:0 12px 40px rgba(16,42,51,.08)}
      .article-panel.hidden{display:none!important}.article-panel-top{display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap}
      .article-kicker{font-size:12px;font-weight:900;letter-spacing:.07em;text-transform:uppercase;color:var(--brand)}
      .article-status{display:inline-flex;padding:6px 10px;border-radius:999px;background:var(--soft);color:var(--brand);font-size:12px;font-weight:850}
      .article-panel h2{margin:14px 0 5px;font-size:clamp(24px,4vw,34px);letter-spacing:-.035em;line-height:1.08}
      .article-source{margin:0 0 14px;color:var(--muted);font-size:13px;font-weight:750}.article-description{margin:0 0 10px;font-size:17px;line-height:1.5}
      .article-takeaway{margin:0;padding:14px 16px;border-radius:16px;background:rgba(20,87,102,.07);line-height:1.5;font-weight:700}
      .article-note{margin:12px 0 0;color:var(--muted);font-size:13px;line-height:1.45}.article-actions{display:flex;gap:9px;flex-wrap:wrap;margin-top:17px}
      .article-link,.article-quiz{display:inline-flex;align-items:center;justify-content:center;min-height:43px;padding:10px 14px;border-radius:13px;text-decoration:none;font-weight:850}
      .article-link{background:var(--text);color:white}.article-link.secondary{background:white;color:var(--text);border:1px solid var(--line)}
      .article-quiz{border:0;background:var(--brand);color:white;cursor:pointer}.article-quiz[disabled]{opacity:.48;cursor:not-allowed}
      .stage.article-quiz-hidden{display:none}.article-count{font-size:12px;color:var(--muted);font-weight:750;margin-top:10px}
      @media(max-width:700px){.article-panel{padding:18px;margin-top:8px}.article-actions>*{width:100%}.article-description{font-size:15px}}
    `;
    document.head.appendChild(style);

    const panel=document.createElement('section');
    panel.id='articlePanel';
    panel.className='article-panel hidden';
    stage.parentNode.insertBefore(panel,stage);

    const safe=value=>String(value??'').replace(/[&<>"']/g,ch=>({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    }[ch]));
    const articleDeck=id=>{
      try{
        if(typeof DECKS!=='undefined')return DECKS.find(d=>d.id===id&&d.article);
      }catch(_error){}
      return D.decks.find(d=>d.id===id&&d.article);
    };
    const hideArticle=()=>{
      panel.classList.add('hidden');
      panel.innerHTML='';
      stage.classList.remove('article-quiz-hidden');
    };
    const renderArticle=id=>{
      const d=articleDeck(id);
      if(!d){hideArticle();return}
      const a=d.article||{};
      const count=Array.isArray(d.cards)?d.cards.length:0;
      panel.classList.remove('hidden');
      stage.classList.add('article-quiz-hidden');
      panel.innerHTML=`
        <div class="article-panel-top"><span class="article-kicker">Article à l’étude</span><span class="article-status">${safe(a.status||'À lire')}</span></div>
        <h2>${safe(d.title)}</h2>
        <p class="article-source">${safe(a.source||'')}</p>
        ${a.description?`<p class="article-description">${safe(a.description)}</p>`:''}
        ${a.takeaway?`<p class="article-takeaway">${safe(a.takeaway)}</p>`:''}
        <div class="article-actions">
          <a class="article-link" href="${safe(a.url)}" target="_blank" rel="noopener noreferrer">Lire l’article ↗</a>
          ${a.canonicalUrl&&a.canonicalUrl!==a.url?`<a class="article-link secondary" href="${safe(a.canonicalUrl)}" target="_blank" rel="noopener noreferrer">Version lisible ↗</a>`:''}
          <button class="article-quiz" id="startArticleQuiz" ${count?'':'disabled'}>${count?`Commencer les flashcards · ${count}`:'Quiz à compléter'}</button>
        </div>
        ${a.note?`<p class="article-note">${safe(a.note)}</p>`:''}
        ${count?`<p class="article-count">Conseil : lis d’abord l’article, puis réponds avant de retourner chaque carte.</p>`:''}
      `;
      const start=document.getElementById('startArticleQuiz');
      if(start&&count)start.onclick=()=>{
        stage.classList.remove('article-quiz-hidden');
        stage.scrollIntoView({behavior:'smooth',block:'start'});
      };
    };

    const originalOpenDeck=window.openDeck;
    const originalOpenFolder=window.openFolder;
    const originalGoHome=window.goHome;
    if(typeof originalOpenDeck==='function')window.openDeck=function(id){originalOpenDeck(id);renderArticle(id)};
    if(typeof originalOpenFolder==='function')window.openFolder=function(id){hideArticle();originalOpenFolder(id)};
    if(typeof originalGoHome==='function')window.goHome=function(){hideArticle();originalGoHome()};

    const directId=decodeURIComponent((location.hash.match(/deck=([^&]+)/)||[])[1]||'');
    if(directId)renderArticle(directId);
  }

  function loadScript(src){
    return new Promise((resolve,reject)=>{
      const script=document.createElement('script');
      script.src=src;
      script.onload=resolve;
      script.onerror=()=>reject(new Error(`Impossible de charger ${src}`));
      document.head.appendChild(script);
    });
  }

  const start=()=>{
    initInterface();
    const files=[
      'article-cerebras.js?v=1',
      'article-claude-loops.js?v=1',
      'article-memory.js?v=1',
      'article-loop-engineering.js?v=1',
      'article-opacity.js?v=1',
      'article-pending.js?v=1'
    ];
    files.reduce((promise,file)=>promise.then(()=>loadScript(file)),Promise.resolve())
      .then(refreshHome)
      .catch(error=>console.warn('Chargement des articles incomplet :',error));
  };

  if(document.readyState==='loading')window.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
