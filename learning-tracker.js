(()=>{
  if(window.__learningTrackerLoaded)return;
  window.__learningTrackerLoaded=true;
  const Store=window.LearningStore;
  if(!Store)return;

  const ACTIVE_GRACE_MS=60000;
  const HEARTBEAT_MS=5000;
  const FLUSH_MS=30000;
  const SESSION_IDLE_MS=15*60*1000;
  let lastInteractionAt=0;
  let lastTickAt=Date.now();
  let pendingActiveMs=0;
  let archiveSnapshot=new Set(readArchives());

  function currentDeck(){
    try{return typeof deck!=='undefined'&&deck?deck:null}catch(_error){return null}
  }

  function currentCard(){
    try{
      return typeof filtered!=='undefined'&&Array.isArray(filtered)&&filtered.length
        ? filtered[index]
        : null;
    }catch(_error){return null}
  }

  function hashString(value){
    let hash=2166136261;
    const text=String(value||'');
    for(let i=0;i<text.length;i++){
      hash^=text.charCodeAt(i);
      hash=Math.imul(hash,16777619);
    }
    return (hash>>>0).toString(36);
  }

  function cardIdentifier(activeDeck,cardValue){
    if(!activeDeck||!cardValue)return '';
    return `${activeDeck.id}:${hashString(`${cardValue.category}|${cardValue.front}`)}`;
  }

  function isStudyVisible(){
    const view=document.getElementById('studyView');
    return Boolean(view&&!view.classList.contains('hidden')&&currentDeck());
  }

  function noteInteraction(){
    if(!isStudyVisible())return;
    lastInteractionAt=Date.now();
  }

  function flushActiveTime(){
    if(pendingActiveMs<=0)return;
    const active=currentDeck();
    const deckId=active?.id;
    const amount=pendingActiveMs;
    pendingActiveMs=0;
    if(deckId)Store.addActiveMs(amount,deckId);
  }

  function heartbeat(){
    const now=Date.now();
    const delta=Math.max(0,Math.min(HEARTBEAT_MS*2,now-lastTickAt));
    lastTickAt=now;
    if(document.visibilityState==='visible'&&isStudyVisible()&&now-lastInteractionAt<=ACTIVE_GRACE_MS){
      pendingActiveMs+=delta;
      if(pendingActiveMs>=FLUSH_MS)flushActiveTime();
    }
    if(lastInteractionAt&&now-lastInteractionAt>SESSION_IDLE_MS){
      flushActiveTime();
      Store.endSession('idle');
      lastInteractionAt=0;
    }
  }

  function observeFlip(sourceElement){
    if(!sourceElement||sourceElement.dataset.learningFlipHooked)return;
    sourceElement.dataset.learningFlipHooked='true';
    sourceElement.addEventListener('click',()=>{
      const active=currentDeck();
      const cardValue=currentCard();
      const cardElement=document.getElementById('card');
      if(!active||!cardValue||!cardElement)return;
      const before=cardElement.classList.contains('flipped');
      noteInteraction();
      setTimeout(()=>{
        const after=cardElement.classList.contains('flipped');
        if(before===after)return;
        Store.trackFlip({
          deckId:active.id,
          cardId:cardIdentifier(active,cardValue),
          revealed:!before&&after
        });
      },0);
    },true);
  }

  function hookKeyboard(){
    document.addEventListener('keydown',event=>{
      if(event.key!==' '||!isStudyVisible()||['INPUT','SELECT','TEXTAREA'].includes(document.activeElement?.tagName))return;
      const active=currentDeck();
      const cardValue=currentCard();
      const cardElement=document.getElementById('card');
      if(!active||!cardValue||!cardElement)return;
      const before=cardElement.classList.contains('flipped');
      noteInteraction();
      setTimeout(()=>{
        const after=cardElement.classList.contains('flipped');
        if(before===after)return;
        Store.trackFlip({
          deckId:active.id,
          cardId:cardIdentifier(active,cardValue),
          revealed:!before&&after
        });
      },0);
    },true);
  }

  function hookMastery(){
    const button=document.getElementById('mastered');
    if(!button||button.dataset.learningMasteryHooked)return;
    button.dataset.learningMasteryHooked='true';
    button.addEventListener('click',()=>{
      const active=currentDeck();
      const cardValue=currentCard();
      if(!active||!cardValue)return;
      let was=false;
      try{was=mastered.has(cardId(cardValue))}catch(_error){}
      noteInteraction();
      setTimeout(()=>{
        let now=false,count=0;
        try{now=mastered.has(cardId(cardValue));count=mastered.size}catch(_error){}
        if(was===now)return;
        Store.trackMastery({
          deckId:active.id,
          cardId:cardIdentifier(active,cardValue),
          mastered:now,
          total:Array.isArray(active.cards)?active.cards.length:0,
          masteredCount:count
        });
      },0);
    },true);
  }

  function hookReset(){
    const button=document.getElementById('reset');
    if(!button||button.dataset.learningResetHooked)return;
    button.dataset.learningResetHooked='true';
    button.addEventListener('click',()=>{
      const active=currentDeck();
      if(!active)return;
      let before=0;
      try{before=mastered.size}catch(_error){}
      noteInteraction();
      setTimeout(()=>{
        let after=0;
        try{after=mastered.size}catch(_error){}
        if(before>after)Store.trackMasteryReset(active.id,before-after);
      },0);
    },true);
  }

  function readArchives(){
    try{return Array.isArray(window.DeckArchive?.list?.())?window.DeckArchive.list():[]}
    catch(_error){return []}
  }

  function compareArchives(){
    const next=new Set(readArchives());
    next.forEach(id=>{if(!archiveSnapshot.has(id))Store.trackArchive(id,true)});
    archiveSnapshot.forEach(id=>{if(!next.has(id))Store.trackArchive(id,false)});
    archiveSnapshot=next;
  }

  function hookArchive(){
    const button=document.getElementById('archiveDeck');
    if(!button||button.dataset.learningArchiveHooked)return;
    button.dataset.learningArchiveHooked='true';
    button.addEventListener('click',()=>setTimeout(compareArchives,120),true);
  }

  function wrapOpenDeck(){
    const base=window.openDeck;
    if(typeof base!=='function'||base.__learningTrackerWrapped)return;
    const enhanced=function(id){
      flushActiveTime();
      const result=base.apply(this,arguments);
      setTimeout(()=>{
        const active=currentDeck();
        if(active){
          Store.trackDeckOpened(active.id,active.title||'');
          lastInteractionAt=Date.now();
        }
        hookArchive();
      },0);
      return result;
    };
    enhanced.__learningTrackerWrapped=true;
    window.openDeck=enhanced;
  }

  function shuffle(values){
    const copy=[...values];
    for(let i=copy.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [copy[i],copy[j]]=[copy[j],copy[i]];
    }
    return copy;
  }

  function startExpress(deckId=null,count=5){
    let target=null;
    try{
      const recommended=Store.getRecommendedDeck();
      const id=deckId||recommended?.id;
      target=DECKS.find(item=>item.id===id)||DECKS.find(item=>!window.DeckArchive?.isArchived?.(item.id));
    }catch(_error){}
    if(!target)return false;
    window.openDeck(target.id);
    setTimeout(()=>{
      try{
        const all=Array.isArray(target.cards)?target.cards:[];
        const unknown=all.filter(cardValue=>!mastered.has(cardId(cardValue)));
        const selected=shuffle(unknown.length?unknown:all).slice(0,Math.max(1,count));
        if(selected.length){
          filtered=selected;
          index=0;
          render();
          Store.ensureSession(target.id,'express');
          window.dispatchEvent(new CustomEvent('fc:express-started',{detail:{deckId:target.id,count:selected.length}}));
        }
      }catch(error){console.warn('Session express impossible :',error)}
    },0);
    return true;
  }

  function installHooks(){
    observeFlip(document.getElementById('card'));
    observeFlip(document.getElementById('flip'));
    hookMastery();
    hookReset();
    hookArchive();
    wrapOpenDeck();
    hookKeyboard();

    document.addEventListener('pointerdown',noteInteraction,{passive:true});
    document.addEventListener('keydown',noteInteraction,{passive:true});
    document.addEventListener('visibilitychange',()=>{
      if(document.visibilityState!=='visible')flushActiveTime();
      else lastTickAt=Date.now();
    });
    window.addEventListener('pagehide',()=>{
      flushActiveTime();
      Store.endSession('pagehide');
    });
    window.addEventListener('beforeunload',flushActiveTime);

    new MutationObserver(()=>hookArchive()).observe(document.body,{childList:true,subtree:true});
    setInterval(heartbeat,HEARTBEAT_MS);
    setInterval(compareArchives,3000);

    setTimeout(()=>{
      const active=currentDeck();
      if(active)Store.trackDeckOpened(active.id,active.title||'');
    },50);
  }

  window.LearningTracker={
    startExpress,
    flushActiveTime,
    cardIdentifier,
    noteInteraction
  };

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',installHooks,{once:true});
  else installHooks();
})();
