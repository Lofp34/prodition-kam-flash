(()=>{
  if(window.__learningStoreLoaded)return;
  window.__learningStoreLoaded=true;

  const SUMMARY_KEY='fc:learning-summary:v2';
  const DB_NAME='fc-learning-events';
  const DB_VERSION=1;
  const EVENT_STORE='events';
  const TIME_ZONE='Europe/Paris';
  const SESSION_IDLE_MS=15*60*1000;
  const DEFAULT_SETTINGS={
    dailyGoal:10,
    weeklyDaysGoal:4,
    activeCardsThreshold:5,
    activeMinutesThreshold:3,
    reliabilityWindow:5,
    rewardCardsPerTicket:5,
    rewardDailyCap:5,
    sound:true,
    motion:true,
    casino:true
  };

  let state=loadState();
  let activeSession=null;
  const dbPromise=openDatabase();

  function emptyState(){
    const now=new Date().toISOString();
    return {
      version:2,
      createdAt:now,
      updatedAt:now,
      settings:{...DEFAULT_SETTINGS},
      days:{},
      deckStats:{},
      rewards:{
        tickets:0,
        sparks:0,
        spins:0,
        earnedMarkers:{},
        badges:{},
        history:[]
      },
      milestones:{},
      lastDeckId:null,
      lastActivityAt:null
    };
  }

  function normalizeState(raw){
    const base=emptyState();
    if(!raw||typeof raw!=='object')return base;
    const rewards=raw.rewards&&typeof raw.rewards==='object'?raw.rewards:{};
    return {
      ...base,
      ...raw,
      version:2,
      settings:{...DEFAULT_SETTINGS,...(raw.settings||{})},
      days:raw.days&&typeof raw.days==='object'?raw.days:{},
      deckStats:raw.deckStats&&typeof raw.deckStats==='object'?raw.deckStats:{},
      rewards:{
        ...base.rewards,
        ...rewards,
        earnedMarkers:rewards.earnedMarkers&&typeof rewards.earnedMarkers==='object'?rewards.earnedMarkers:{},
        badges:rewards.badges&&typeof rewards.badges==='object'?rewards.badges:{},
        history:Array.isArray(rewards.history)?rewards.history.slice(-100):[]
      },
      milestones:raw.milestones&&typeof raw.milestones==='object'?raw.milestones:{}
    };
  }

  function loadState(){
    try{return normalizeState(JSON.parse(localStorage.getItem(SUMMARY_KEY)||'null'))}
    catch(error){
      console.warn('Historique d’apprentissage illisible :',error);
      return emptyState();
    }
  }

  function saveState(reason='update',detail={}){
    state.updatedAt=new Date().toISOString();
    try{localStorage.setItem(SUMMARY_KEY,JSON.stringify(state))}
    catch(error){
      console.warn('Impossible d’enregistrer le suivi :',error);
      dispatch('fc:learning-storage-error',{message:'Le suivi ne peut pas être enregistré dans ce navigateur.'});
    }
    dispatch('fc:learning-updated',{reason,...detail});
  }

  function dispatch(name,detail={}){
    try{window.dispatchEvent(new CustomEvent(name,{detail}))}catch(_error){}
  }

  function openDatabase(){
    if(!('indexedDB'in window))return Promise.resolve(null);
    return new Promise(resolve=>{
      let request;
      try{request=indexedDB.open(DB_NAME,DB_VERSION)}catch(_error){resolve(null);return}
      request.onupgradeneeded=()=>{
        const db=request.result;
        if(!db.objectStoreNames.contains(EVENT_STORE)){
          const store=db.createObjectStore(EVENT_STORE,{keyPath:'id',autoIncrement:true});
          store.createIndex('timestamp','timestamp',{unique:false});
          store.createIndex('dateKey','dateKey',{unique:false});
          store.createIndex('deckId','deckId',{unique:false});
          store.createIndex('type','type',{unique:false});
        }
      };
      request.onsuccess=()=>resolve(request.result);
      request.onerror=()=>resolve(null);
      request.onblocked=()=>resolve(null);
    });
  }

  async function appendEvent(type,detail={}){
    const timestamp=new Date().toISOString();
    const event={type,timestamp,dateKey:dateKey(),...detail};
    const db=await dbPromise;
    if(db){
      try{
        await new Promise((resolve,reject)=>{
          const tx=db.transaction(EVENT_STORE,'readwrite');
          tx.objectStore(EVENT_STORE).add(event);
          tx.oncomplete=resolve;
          tx.onerror=()=>reject(tx.error);
          tx.onabort=()=>reject(tx.error);
        });
      }catch(error){console.warn('Journal IndexedDB indisponible :',error)}
    }
    dispatch('fc:learning-event',event);
    return event;
  }

  async function readAllEvents(){
    const db=await dbPromise;
    if(!db)return [];
    try{
      return await new Promise((resolve,reject)=>{
        const tx=db.transaction(EVENT_STORE,'readonly');
        const request=tx.objectStore(EVENT_STORE).getAll();
        request.onsuccess=()=>resolve(request.result||[]);
        request.onerror=()=>reject(request.error);
      });
    }catch(_error){return []}
  }

  async function replaceEvents(events=[]){
    const db=await dbPromise;
    if(!db)return;
    await new Promise((resolve,reject)=>{
      const tx=db.transaction(EVENT_STORE,'readwrite');
      const store=tx.objectStore(EVENT_STORE);
      store.clear();
      events.forEach(event=>{
        const copy={...event};
        delete copy.id;
        store.add(copy);
      });
      tx.oncomplete=resolve;
      tx.onerror=()=>reject(tx.error);
      tx.onabort=()=>reject(tx.error);
    });
  }

  function dateKey(value=new Date()){
    const parts=new Intl.DateTimeFormat('en-CA',{
      timeZone:TIME_ZONE,year:'numeric',month:'2-digit',day:'2-digit'
    }).formatToParts(value);
    const map=Object.fromEntries(parts.map(part=>[part.type,part.value]));
    return `${map.year}-${map.month}-${map.day}`;
  }

  function keyToUtc(key){
    const [year,month,day]=String(key).split('-').map(Number);
    return new Date(Date.UTC(year,month-1,day,12));
  }

  function addDays(key,amount){
    const date=keyToUtc(key);
    date.setUTCDate(date.getUTCDate()+amount);
    return date.toISOString().slice(0,10);
  }

  function diffDays(from,to){
    return Math.round((keyToUtc(to)-keyToUtc(from))/86400000);
  }

  function rangeKeys(from,to){
    if(!from||!to||from>to)return [];
    const keys=[];
    for(let cursor=from;cursor<=to;cursor=addDays(cursor,1))keys.push(cursor);
    return keys;
  }

  function emptyDay(){
    return {
      flips:0,
      reveals:0,
      uniqueCardIds:[],
      masteredAdded:0,
      masteredRemoved:0,
      activeMs:0,
      sessions:0,
      ticketsEarned:0,
      deckIds:[],
      decks:{}
    };
  }

  function emptyDeckDay(){
    return {flips:0,reveals:0,uniqueCardIds:[],masteredAdded:0,masteredRemoved:0,activeMs:0,sessions:0};
  }

  function getDay(key=dateKey()){
    if(!state.days[key])state.days[key]=emptyDay();
    const day=state.days[key];
    day.uniqueCardIds=Array.isArray(day.uniqueCardIds)?day.uniqueCardIds:[];
    day.deckIds=Array.isArray(day.deckIds)?day.deckIds:[];
    day.decks=day.decks&&typeof day.decks==='object'?day.decks:{};
    return day;
  }

  function getDeckDay(day,deckId){
    if(!day.decks[deckId])day.decks[deckId]=emptyDeckDay();
    const record=day.decks[deckId];
    record.uniqueCardIds=Array.isArray(record.uniqueCardIds)?record.uniqueCardIds:[];
    if(!day.deckIds.includes(deckId))day.deckIds.push(deckId);
    return record;
  }

  function getDeckStat(deckId){
    if(!state.deckStats[deckId]){
      state.deckStats[deckId]={reveals:0,flips:0,uniqueCardIds:[],sessions:0,masteredAdded:0,masteredRemoved:0,lastAt:null};
    }
    const stat=state.deckStats[deckId];
    stat.uniqueCardIds=Array.isArray(stat.uniqueCardIds)?stat.uniqueCardIds:[];
    return stat;
  }

  function touchDeck(deckId){
    if(!deckId)return;
    const stat=getDeckStat(deckId);
    stat.lastAt=new Date().toISOString();
    state.lastDeckId=deckId;
    state.lastActivityAt=stat.lastAt;
  }

  function ensureSession(deckId,source='study'){
    const now=Date.now();
    if(activeSession&&(
      activeSession.deckId!==deckId||
      now-activeSession.lastUsefulAt>SESSION_IDLE_MS||
      activeSession.dateKey!==dateKey()
    ))endSession('boundary');

    if(!activeSession){
      const key=dateKey();
      const day=getDay(key);
      const deckDay=getDeckDay(day,deckId);
      const stat=getDeckStat(deckId);
      day.sessions+=1;
      deckDay.sessions+=1;
      stat.sessions+=1;
      activeSession={
        id:`${key}-${now}-${Math.random().toString(36).slice(2,8)}`,
        deckId,dateKey:key,startedAt:now,lastUsefulAt:now,source
      };
      appendEvent('session_started',{sessionId:activeSession.id,deckId,source});
    }else activeSession.lastUsefulAt=now;
    return activeSession;
  }

  function endSession(reason='ended'){
    if(!activeSession)return;
    const ended={...activeSession};
    activeSession=null;
    appendEvent('session_ended',{
      sessionId:ended.id,
      deckId:ended.deckId,
      reason,
      durationMs:Math.max(0,Date.now()-ended.startedAt)
    });
  }

  function trackDeckOpened(deckId,title=''){
    if(!deckId)return;
    if(activeSession&&activeSession.deckId!==deckId)endSession('deck_changed');
    touchDeck(deckId);
    saveState('deck_opened',{deckId});
    appendEvent('deck_opened',{deckId,title});
  }

  function addUnique(array,value){
    if(array.includes(value))return false;
    array.push(value);
    return true;
  }

  function grantTickets(count,marker,reason,meta={}){
    const safeCount=Math.max(0,Math.floor(Number(count)||0));
    if(!safeCount||!marker||state.rewards.earnedMarkers[marker])return 0;
    state.rewards.earnedMarkers[marker]=new Date().toISOString();
    state.rewards.tickets+=safeCount;
    const day=getDay();
    day.ticketsEarned+=safeCount;
    appendEvent('reward_ticket_earned',{count:safeCount,reason,marker,...meta});
    dispatch('fc:reward-earned',{count:safeCount,reason,marker,tickets:state.rewards.tickets,...meta});
    return safeCount;
  }

  function evaluateCardTickets(day,key){
    const every=Math.max(1,Number(state.settings.rewardCardsPerTicket)||5);
    const cap=Math.max(1,Number(state.settings.rewardDailyCap)||5);
    const buckets=Math.min(cap,Math.floor(day.uniqueCardIds.length/every));
    let granted=0;
    for(let index=1;index<=buckets;index++){
      granted+=grantTickets(1,`cards:${key}:${index}`,'cartes_uniques',{dateKey:key,bucket:index});
    }
    if(day.uniqueCardIds.length>=state.settings.dailyGoal){
      granted+=grantTickets(1,`goal:${key}`,'objectif_quotidien',{dateKey:key});
    }
    return granted;
  }

  function trackFlip({deckId,cardId,revealed=false}={}){
    if(!deckId||!cardId)return {newUnique:false,granted:0};
    ensureSession(deckId,'cards');
    const key=dateKey();
    const day=getDay(key);
    const deckDay=getDeckDay(day,deckId);
    const stat=getDeckStat(deckId);
    day.flips+=1;
    deckDay.flips+=1;
    stat.flips+=1;
    let newUnique=false;
    if(revealed){
      day.reveals+=1;
      deckDay.reveals+=1;
      stat.reveals+=1;
      newUnique=addUnique(day.uniqueCardIds,cardId);
      addUnique(deckDay.uniqueCardIds,cardId);
      addUnique(stat.uniqueCardIds,cardId);
    }
    touchDeck(deckId);
    const granted=newUnique?evaluateCardTickets(day,key):0;
    evaluateMilestones();
    saveState('card_flip',{deckId,cardId,revealed,newUnique,granted});
    appendEvent(revealed?'card_revealed':'card_returned',{deckId,cardId,newUnique});
    return {newUnique,granted,uniqueToday:day.uniqueCardIds.length};
  }

  function trackMastery({deckId,cardId,mastered,total=0,masteredCount=0}={}){
    if(!deckId||!cardId)return;
    ensureSession(deckId,'mastery');
    const day=getDay();
    const deckDay=getDeckDay(day,deckId);
    const stat=getDeckStat(deckId);
    if(mastered){
      day.masteredAdded+=1;
      deckDay.masteredAdded+=1;
      stat.masteredAdded+=1;
    }else{
      day.masteredRemoved+=1;
      deckDay.masteredRemoved+=1;
      stat.masteredRemoved+=1;
    }
    touchDeck(deckId);
    if(mastered&&total>0&&masteredCount>=total){
      grantTickets(2,`deck-complete:${deckId}`,'jeu_termine',{deckId,total});
      unlockMilestone('first-deck-completed','Premier jeu terminé');
    }
    evaluateMilestones();
    saveState(mastered?'card_mastered':'card_unmastered',{deckId,cardId,total,masteredCount});
    appendEvent(mastered?'card_mastered':'card_unmastered',{deckId,cardId,total,masteredCount});
  }

  function trackMasteryReset(deckId,count=0){
    const safeCount=Math.max(0,Math.floor(Number(count)||0));
    if(!deckId||!safeCount)return;
    ensureSession(deckId,'reset');
    const day=getDay();
    const deckDay=getDeckDay(day,deckId);
    const stat=getDeckStat(deckId);
    day.masteredRemoved+=safeCount;
    deckDay.masteredRemoved+=safeCount;
    stat.masteredRemoved+=safeCount;
    touchDeck(deckId);
    saveState('mastery_reset',{deckId,count:safeCount});
    appendEvent('mastery_reset',{deckId,count:safeCount});
  }

  function addActiveMs(ms,deckId){
    const safe=Math.max(0,Math.min(120000,Math.floor(Number(ms)||0)));
    if(!safe||!deckId)return;
    const day=getDay();
    const deckDay=getDeckDay(day,deckId);
    day.activeMs+=safe;
    deckDay.activeMs+=safe;
    touchDeck(deckId);
    saveState('active_time',{deckId,ms:safe});
    appendEvent('active_time',{deckId,ms:safe});
  }

  function trackArchive(deckId,archived){
    if(!deckId)return;
    saveState(archived?'deck_archived':'deck_restored',{deckId});
    appendEvent(archived?'deck_archived':'deck_restored',{deckId});
  }

  function isActiveDay(record){
    if(!record)return false;
    const cards=Array.isArray(record.uniqueCardIds)?record.uniqueCardIds.length:0;
    const minutes=(Number(record.activeMs)||0)/60000;
    return cards>=state.settings.activeCardsThreshold||minutes>=state.settings.activeMinutesThreshold;
  }

  function earliestDay(){
    const keys=Object.keys(state.days).sort();
    return keys[0]||dateKey();
  }

  function getReliability(today=dateKey()){
    const windowSize=Math.max(1,Math.floor(state.settings.reliabilityWindow)||5);
    const earliest=earliestDay();
    const first=earliest<today?earliest:today;
    let start=null;
    let inactiveRun=0;
    let lastActive=null;
    for(const key of rangeKeys(first,today)){
      if(isActiveDay(state.days[key])){
        if(start===null)start=key;
        inactiveRun=0;
        lastActive=key;
      }else if(start!==null){
        inactiveRun+=1;
        if(inactiveRun>=windowSize)start=null;
      }
    }
    if(!start){
      return {percent:0,activeDays:0,windowDays:windowSize,missedDays:windowSize,streakDays:0,startDate:null,lastActiveDate:lastActive,status:'À relancer'};
    }
    const candidate=addDays(today,-(windowSize-1));
    const windowStart=candidate>start?candidate:start;
    const keys=rangeKeys(windowStart,today);
    const activeDays=keys.filter(key=>isActiveDay(state.days[key])).length;
    const percent=Math.round(activeDays/Math.max(1,keys.length)*100);
    const status=percent===100?'Impeccable':percent>=80?'Très fiable':percent>=60?'Solide':percent>=40?'Fragile':'En danger';
    return {
      percent,
      activeDays,
      windowDays:keys.length,
      missedDays:keys.length-activeDays,
      streakDays:diffDays(start,today)+1,
      startDate:start,
      lastActiveDate:lastActive,
      status
    };
  }

  function periodBounds(period='week',today=dateKey()){
    if(period==='today')return {from:today,to:today};
    if(period==='month')return {from:addDays(today,-29),to:today};
    if(period==='all')return {from:earliestDay(),to:today};
    return {from:addDays(today,-6),to:today};
  }

  function aggregateKeys(keys){
    const unique=new Set();
    const deckIds=new Set();
    const result={
      flips:0,reveals:0,uniqueCards:0,masteredAdded:0,masteredRemoved:0,
      masteryNet:0,activeMs:0,sessions:0,activeDays:0,totalDays:keys.length,
      deckIds:[],daily:[]
    };
    keys.forEach(key=>{
      const day=state.days[key]||emptyDay();
      const dayUnique=Array.isArray(day.uniqueCardIds)?day.uniqueCardIds:[];
      dayUnique.forEach(id=>unique.add(id));
      (day.deckIds||[]).forEach(id=>deckIds.add(id));
      result.flips+=Number(day.flips)||0;
      result.reveals+=Number(day.reveals)||0;
      result.masteredAdded+=Number(day.masteredAdded)||0;
      result.masteredRemoved+=Number(day.masteredRemoved)||0;
      result.activeMs+=Number(day.activeMs)||0;
      result.sessions+=Number(day.sessions)||0;
      if(isActiveDay(day))result.activeDays+=1;
      result.daily.push({
        key,
        flips:Number(day.flips)||0,
        reveals:Number(day.reveals)||0,
        uniqueCards:dayUnique.length,
        masteredAdded:Number(day.masteredAdded)||0,
        masteredRemoved:Number(day.masteredRemoved)||0,
        activeMs:Number(day.activeMs)||0,
        sessions:Number(day.sessions)||0,
        active:isActiveDay(day)
      });
    });
    result.uniqueCards=unique.size;
    result.masteryNet=result.masteredAdded-result.masteredRemoved;
    result.deckIds=[...deckIds];
    return result;
  }

  function getMetrics(period='week'){
    const bounds=periodBounds(period);
    return {...bounds,...aggregateKeys(rangeKeys(bounds.from,bounds.to))};
  }

  function getMetricsBetween(from,to){
    return {from,to,...aggregateKeys(rangeKeys(from,to))};
  }

  function currentMasteredCount(deck){
    try{
      const values=JSON.parse(localStorage.getItem(`mastered:${deck.id}`)||'[]');
      return Array.isArray(values)?values.length:0;
    }catch(_error){return 0}
  }

  function getDeckProgress(){
    let decks=[];
    try{decks=Array.isArray(DECKS)?DECKS:[]}catch(_error){decks=[]}
    return decks.map(deck=>{
      const total=Array.isArray(deck.cards)?deck.cards.length:0;
      const mastered=Math.min(total,currentMasteredCount(deck));
      const stat=state.deckStats[deck.id]||{};
      let archived=false;
      try{archived=Boolean(window.DeckArchive?.isArchived?.(deck.id))}catch(_error){}
      return {
        id:deck.id,
        title:deck.title,
        badge:deck.badge||'Jeu',
        folder:deck.folder,
        total,
        mastered,
        percent:total?Math.round(mastered/total*100):0,
        archived,
        lastAt:stat.lastAt||null,
        uniqueStudied:Array.isArray(stat.uniqueCardIds)?stat.uniqueCardIds.length:0,
        reveals:Number(stat.reveals)||0,
        sessions:Number(stat.sessions)||0
      };
    }).sort((a,b)=>{
      const ad=Date.parse(a.lastAt||0),bd=Date.parse(b.lastAt||0);
      if(ad!==bd)return bd-ad;
      return b.percent-a.percent;
    });
  }

  function getRecommendedDeck(){
    const decks=getDeckProgress();
    const byId=id=>decks.find(item=>item.id===id&&!item.archived&&item.percent<100);
    return byId(state.lastDeckId)||decks
      .filter(item=>!item.archived&&item.percent<100)
      .sort((a,b)=>{
        const nearA=a.percent>0?a.percent:-1;
        const nearB=b.percent>0?b.percent:-1;
        return nearB-nearA;
      })[0]||decks.find(item=>!item.archived)||null;
  }

  function unlockMilestone(id,label,extra={}){
    if(state.milestones[id])return false;
    state.milestones[id]={unlockedAt:new Date().toISOString(),label,...extra};
    grantTickets(1,`milestone:${id}`,'jalon',{milestoneId:id,label});
    dispatch('fc:milestone',{id,label,...extra});
    return true;
  }

  function evaluateMilestones(){
    const all=getMetrics('all');
    const week=getMetrics('week');
    if(all.sessions>=1)unlockMilestone('first-session','Première session');
    if(week.activeDays>=3)unlockMilestone('three-active-days','3 jours actifs sur 7');
    [50,100,250,500,1000].forEach(value=>{
      if(all.uniqueCards>=value)unlockMilestone(`unique-${value}`,`${value} cartes différentes étudiées`,{value});
    });
  }

  function updateSettings(patch={}){
    state.settings={...state.settings,...patch};
    saveState('settings_changed',{settings:{...state.settings}});
    appendEvent('settings_changed',{settings:{...state.settings}});
  }

  function consumeTicket(){
    if(state.rewards.tickets<=0)return false;
    state.rewards.tickets-=1;
    saveState('reward_ticket_consumed',{tickets:state.rewards.tickets});
    appendEvent('reward_ticket_consumed',{tickets:state.rewards.tickets});
    return true;
  }

  function grantPrize(prize={}){
    const sparks=Math.max(0,Math.floor(Number(prize.sparks)||0));
    state.rewards.sparks+=sparks;
    state.rewards.spins+=1;
    if(prize.badgeId&&!state.rewards.badges[prize.badgeId]){
      state.rewards.badges[prize.badgeId]={label:prize.badgeLabel||prize.badgeId,unlockedAt:new Date().toISOString(),tier:prize.tier||'common'};
    }
    const historyItem={
      at:new Date().toISOString(),
      tier:prize.tier||'common',
      label:prize.label||'Récompense',
      sparks,
      badgeId:prize.badgeId||null,
      reels:Array.isArray(prize.reels)?prize.reels:[]
    };
    state.rewards.history=[...state.rewards.history,historyItem].slice(-100);
    saveState('reward_prize',{prize:historyItem});
    appendEvent('reward_prize',{...historyItem});
    return historyItem;
  }

  function rewardLevel(){
    const sparks=state.rewards.sparks;
    const levels=[
      {min:0,label:'Apprenti',next:100},
      {min:100,label:'Explorateur',next:300},
      {min:300,label:'Stratège',next:700},
      {min:700,label:'Maître',next:1500},
      {min:1500,label:'Grand maître',next:null}
    ];
    return [...levels].reverse().find(level=>sparks>=level.min)||levels[0];
  }

  async function exportAll(){
    return {
      app:'prodition-kam-flash',
      exportedAt:new Date().toISOString(),
      summary:JSON.parse(JSON.stringify(state)),
      events:await readAllEvents()
    };
  }

  async function importAll(payload){
    if(!payload||typeof payload!=='object'||!payload.summary)throw new Error('Fichier de suivi invalide.');
    state=normalizeState(payload.summary);
    await replaceEvents(Array.isArray(payload.events)?payload.events:[]);
    saveState('data_imported');
    appendEvent('data_imported',{sourceExportedAt:payload.exportedAt||null});
  }

  async function resetLearningData({preserveSettings=true}={}){
    const settings=preserveSettings?{...state.settings}:{...DEFAULT_SETTINGS};
    state=emptyState();
    state.settings=settings;
    activeSession=null;
    await replaceEvents([]);
    saveState('data_reset');
  }

  function snapshot(){return JSON.parse(JSON.stringify(state))}

  window.LearningStore={
    TIME_ZONE,
    dateKey,addDays,diffDays,rangeKeys,
    get state(){return snapshot()},
    get settings(){return {...state.settings}},
    get rewards(){return JSON.parse(JSON.stringify(state.rewards))},
    trackDeckOpened,trackFlip,trackMastery,trackMasteryReset,trackArchive,
    ensureSession,endSession,addActiveMs,
    getMetrics,getMetricsBetween,getReliability,getDeckProgress,getRecommendedDeck,isActiveDay,
    updateSettings,grantTickets,consumeTicket,grantPrize,rewardLevel,
    exportAll,importAll,resetLearningData,readAllEvents,
    unlockMilestone
  };
})();
