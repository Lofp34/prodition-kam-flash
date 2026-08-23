(()=>{
  if(window.__learningLevelsLoaded)return;
  window.__learningLevelsLoaded=true;

  const Store=window.LearningStore;
  if(!Store)return;

  const STORAGE_KEY='fc:learning-levels:v1';
  const PRESTIGE_STEP=250;
  const BASE_RANKS=[
    {id:'touriste-neurone',min:0,label:'Touriste du neurone',avatar:'🎒',color:'#60717a',tickets:0,blason:'Badge visiteur',description:'Tu observes les concepts avec curiosité, une gourde et un itinéraire encore très approximatif.'},
    {id:'apprenti-retourneur',min:100,label:'Apprenti retourneur de cartes',avatar:'🃏',color:'#9a6a3a',tickets:1,blason:'Cadre bronze',description:'Le bouton « Retourner » commence officiellement à craindre ton index.'},
    {id:'dompteur-concepts',min:250,label:'Dompteur de concepts sauvages',avatar:'🧠',color:'#297b70',tickets:1,blason:'Neurone discipliné',description:'Tu approches les notions farouches sans geste brusque et avec une définition à portée de main.'},
    {id:'chevalier-ctrlz',min:500,label:'Chevalier du CTRL+Z mental',avatar:'🛡️',color:'#4568a9',tickets:1,blason:'Armure anti-erreur',description:'Tu sais revenir sur une certitude sans perdre tout ton honneur.'},
    {id:'architecte-certitudes',min:750,label:'Architecte de certitudes provisoires',avatar:'🏗️',color:'#8a5a9b',tickets:2,blason:'Casque intellectuel',description:'Tu construis du savoir solide, tout en laissant une trappe de maintenance pour changer d’avis.'},
    {id:'vizir-presque-juste',min:1000,label:'Grand Vizir des réponses presque justes',avatar:'🧞',color:'#b27617',tickets:2,blason:'Sceau de l’à-peu-près rigoureux',description:'Tes réponses sont précises, sauf lorsque la réalité manque manifestement de coopération.'},
    {id:'sorcier-doute',min:1250,label:'Sorcier senior du doute raisonnable',avatar:'🧙',color:'#6f3e91',tickets:2,blason:'Cape du « je vais vérifier »',description:'Tu maîtrises l’art supérieur de dire « je ne sais pas encore » avec une autorité impressionnante.'},
    {id:'grand-maitre-auto',min:1500,label:'Grand Maître autoproclamé de la connaissance',avatar:'👑',color:'#c08a00',tickets:3,blason:'Couronne sans valeur académique',description:'La cérémonie de nomination a été unanime : tu étais le seul membre du jury.'}
  ];
  const PRESTIGE_TITLES=[
    'Expert consulté par lui-même',
    'Autorité mondiale dans son salon',
    'Comité scientifique à personne unique',
    'Professeur émérite de l’à-peu-près rigoureux',
    'Légende locale du neurone',
    'Inspecteur général des idées bien rangées',
    'Académicien honoraire du bouton Retourner',
    'Oracle certifié sans organisme certificateur'
  ];
  const PRESTIGE_AVATARS=['🔮','🌟','🦉','🐉','🚀','🧬','🏛️','⚗️'];
  const PRESTIGE_COLORS=['#8f45bd','#ba6b20','#2d7c92','#5566b7','#a53f67','#39765e','#775a2f','#6750a4'];

  let local=loadLocal();
  let dashboardObserver=null;
  let homeObserver=null;
  let renderPending=false;
  let promotions=[];
  let promotionVisible=false;

  function safe(value){return String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]))}

  function loadLocal(){
    try{
      const parsed=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');
      if(parsed&&typeof parsed==='object')return {initialized:Boolean(parsed.initialized),celebrated:parsed.celebrated&&typeof parsed.celebrated==='object'?parsed.celebrated:{}};
    }catch(_error){}
    return {initialized:false,celebrated:{}};
  }

  function saveLocal(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify({version:1,...local}))}catch(_error){}}

  function roman(value){
    const map=[[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
    let number=Math.max(1,Math.floor(value)),result='';
    map.forEach(([amount,symbol])=>{while(number>=amount){result+=symbol;number-=amount}});
    return result;
  }

  function prestigeRank(index){
    const n=Math.max(1,Math.floor(index));
    const title=PRESTIGE_TITLES[(n-1)%PRESTIGE_TITLES.length];
    const season=Math.floor((n-1)/PRESTIGE_TITLES.length)+1;
    return {
      id:`prestige-${n}`,
      min:1500+n*PRESTIGE_STEP,
      label:`Prestige ${roman(n)} — ${title}${season>1?` · saison ${season}`:''}`,
      avatar:PRESTIGE_AVATARS[(n-1)%PRESTIGE_AVATARS.length],
      color:PRESTIGE_COLORS[(n-1)%PRESTIGE_COLORS.length],
      tickets:n%4===0?2:1,
      blason:`Étoile de prestige ${roman(n)}`,
      description:'Le savoir continue de progresser. La modestie fait actuellement l’objet d’un audit indépendant.'
    };
  }

  function catalogFor(sparks,includeNext=true){
    const value=Math.max(0,Math.floor(Number(sparks)||0));
    const reached=Math.max(0,Math.floor((value-1500)/PRESTIGE_STEP));
    const prestigeCount=Math.max(includeNext?1:0,reached+(includeNext?1:0));
    const ranks=[...BASE_RANKS];
    for(let index=1;index<=prestigeCount;index++)ranks.push(prestigeRank(index));
    return ranks.sort((a,b)=>a.min-b.min);
  }

  function progress(){
    const sparks=Math.max(0,Math.floor(Number(Store.rewards?.sparks)||0));
    const catalog=catalogFor(sparks,true);
    const unlocked=catalog.filter(rank=>rank.min<=sparks);
    const current=unlocked.at(-1)||BASE_RANKS[0];
    const next=catalog.find(rank=>rank.min>sparks)||prestigeRank(Math.floor((sparks-1500)/PRESTIGE_STEP)+2);
    const span=Math.max(1,next.min-current.min);
    return {
      sparks,current,next,unlocked,
      remaining:Math.max(0,next.min-sparks),
      percent:Math.max(0,Math.min(100,Math.round((sparks-current.min)/span*100)))
    };
  }

  function crossedRanks(before,after){return catalogFor(after,false).filter(rank=>rank.min>before&&rank.min<=after&&rank.min>0)}

  function markCelebrated(rank){
    if(!local.celebrated[rank.id])local.celebrated[rank.id]=new Date().toISOString();
    saveLocal();
  }

  function grantBonuses(ranks,persist){
    let total=0;
    ranks.forEach(rank=>{
      total+=Store.grantTickets?.(rank.tickets,`rank:${rank.id}`,'passage_grade',{rankId:rank.id,rankLabel:rank.label,threshold:rank.min})||0;
    });
    if(total&&persist)Store.updateSettings?.({});
    return total;
  }

  function patchStore(){
    if(Store.__humorousRanksPatched)return;
    Store.__humorousRanksPatched=true;
    const originalGrantPrize=Store.grantPrize?.bind(Store);
    if(originalGrantPrize){
      Store.grantPrize=prize=>{
        const before=Math.max(0,Math.floor(Number(Store.rewards?.sparks)||0));
        const after=before+Math.max(0,Math.floor(Number(prize?.sparks)||0));
        const crossed=crossedRanks(before,after);
        crossed.forEach(markCelebrated);
        const bonusTickets=grantBonuses(crossed,false);
        const result=originalGrantPrize(prize);
        if(crossed.length){
          promotions.push({rank:crossed.at(-1),count:crossed.length,bonusTickets});
          setTimeout(showPromotion,650);
        }
        return {...result,rankUps:crossed.map(rank=>rank.id),rankBonusTickets:bonusTickets};
      };
    }
    Store.rewardLevel=()=>{
      const current=progress();
      return {...current.current,next:current.next.min,nextLabel:current.next.label,progress:current.percent};
    };
    Store.getRankProgress=()=>progress();
    Store.getRankCatalog=()=>catalogFor(progress().sparks,true).map(rank=>({...rank}));
  }

  function bootstrap(){
    const unlocked=progress().unlocked.filter(rank=>rank.min>0);
    const unseen=unlocked.filter(rank=>!local.celebrated[rank.id]);
    if(!local.initialized){
      const tickets=grantBonuses(unlocked,true);
      unlocked.forEach(markCelebrated);
      local.initialized=true;
      saveLocal();
      if(unlocked.length)setTimeout(()=>bootstrapToast(unlocked.length,tickets),900);
      return;
    }
    if(unseen.length){
      unseen.forEach(markCelebrated);
      const tickets=grantBonuses(unseen,true);
      promotions.push({rank:unseen.at(-1),count:unseen.length,bonusTickets:tickets});
      setTimeout(showPromotion,350);
    }
  }

  function addStyles(){
    if(document.getElementById('learning-level-styles'))return;
    const style=document.createElement('style');
    style.id='learning-level-styles';
    style.textContent=`
      .learning-level-panel{--rank:#60717a;grid-column:1/-1;display:grid;grid-template-columns:auto minmax(0,1fr);gap:20px;align-items:center;position:relative;overflow:hidden;background:radial-gradient(circle at 0 0,color-mix(in srgb,var(--rank) 22%,transparent),transparent 38%),rgba(255,255,255,.92);border:1px solid color-mix(in srgb,var(--rank) 34%,var(--line));box-shadow:0 18px 52px color-mix(in srgb,var(--rank) 14%,transparent)}
      .rank-avatar{width:122px;height:122px;border-radius:31px;display:grid;place-items:center;font-size:63px;background:linear-gradient(145deg,#fff,color-mix(in srgb,var(--rank) 16%,#fff));border:3px solid color-mix(in srgb,var(--rank) 58%,#fff);box-shadow:0 15px 38px color-mix(in srgb,var(--rank) 20%,transparent)}
      .rank-copy{min-width:0}.rank-kicker{font-size:11px;font-weight:950;letter-spacing:.12em;text-transform:uppercase;color:var(--rank)}.rank-title{font-size:clamp(25px,4vw,40px);line-height:1.05;letter-spacing:-.045em;margin:6px 0}.rank-description{max-width:72ch;margin:0;color:var(--muted);line-height:1.45}.rank-blason{display:inline-flex;margin-top:10px;padding:7px 10px;border-radius:999px;background:color-mix(in srgb,var(--rank) 10%,#fff);color:var(--rank);font-size:12px;font-weight:900}
      .rank-progress-head{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-top:16px;font-size:12px;color:var(--muted)}.rank-progress-head strong,.rank-next strong{color:var(--text)}.rank-track{height:12px;border-radius:999px;background:rgba(16,42,51,.08);overflow:hidden;margin-top:7px}.rank-track span{display:block;height:100%;width:var(--progress);border-radius:inherit;background:linear-gradient(90deg,var(--rank),#e0a800)}.rank-next{margin:8px 0 0;color:var(--muted);font-size:12px}
      .rank-collection{grid-column:1/-1;display:flex;gap:8px;overflow-x:auto;padding:3px 1px}.rank-medal{--medal:#60717a;flex:0 0 auto;display:flex;align-items:center;gap:7px;padding:8px 10px;border-radius:14px;border:1px solid var(--line);background:rgba(16,42,51,.045);font-size:11px;font-weight:850;color:var(--muted)}.rank-medal span{font-size:20px}.rank-medal.unlocked{background:color-mix(in srgb,var(--medal) 10%,#fff);border-color:color-mix(in srgb,var(--medal) 35%,var(--line));color:var(--text)}.rank-medal.current{outline:2px solid var(--medal);outline-offset:1px}.rank-medal.locked{filter:grayscale(1);opacity:.5}
      .learning-home-rank{--rank:#60717a;display:inline-flex;align-items:center;gap:6px;width:max-content;max-width:100%;margin:5px 0 7px;padding:6px 9px;border-radius:999px;background:color-mix(in srgb,var(--rank) 10%,#fff);border:1px solid color-mix(in srgb,var(--rank) 27%,var(--line));font-size:11px;font-weight:900;color:var(--rank);overflow-wrap:anywhere}
      .slot-rank-status{margin:10px auto 0;width:min(440px,100%);padding:9px 12px;border-radius:14px;background:rgba(255,255,255,.09);font-size:12px;color:rgba(255,255,255,.78)}.slot-rank-status strong{color:#ffe789}
      .rank-promotion-overlay{position:fixed;inset:0;z-index:85;display:grid;place-items:center;padding:16px;background:rgba(8,5,12,.76);backdrop-filter:blur(11px)}.rank-promotion-overlay[hidden]{display:none}.rank-promotion-card{--rank:#8f45bd;width:min(590px,100%);max-height:calc(100dvh - 24px);overflow:auto;padding:clamp(22px,5vw,38px);border-radius:30px;text-align:center;color:#fff;background:radial-gradient(circle at 50% -10%,color-mix(in srgb,var(--rank) 55%,transparent),transparent 42%),linear-gradient(145deg,#1d1127,#4b1d5f);border:2px solid color-mix(in srgb,var(--rank) 70%,#ffe47d);box-shadow:0 35px 110px rgba(0,0,0,.55)}.rank-promotion-kicker{font-size:11px;text-transform:uppercase;letter-spacing:.16em;font-weight:950;color:#ffe68a}.rank-promotion-avatar{font-size:84px;line-height:1;margin:20px 0 12px}.rank-promotion-card h2{font-size:clamp(29px,7vw,48px);line-height:1.02;letter-spacing:-.05em;margin:0}.rank-promotion-card p{color:rgba(255,255,255,.78);line-height:1.5}.rank-promotion-reward{margin:18px 0;padding:14px;border-radius:18px;background:rgba(255,255,255,.1);font-weight:850}.rank-promotion-card button{background:#ffe173;color:#2b1235;min-height:47px;padding-inline:20px}.rank-bootstrap-toast{position:fixed;left:50%;bottom:22px;z-index:50;max-width:min(580px,calc(100% - 24px));transform:translateX(-50%);padding:13px 17px;border-radius:16px;background:#201029;color:#fff;box-shadow:0 18px 54px rgba(0,0,0,.3);font-weight:850;text-align:center}
      @media(max-width:700px){.learning-level-panel{grid-template-columns:1fr;text-align:center}.rank-avatar{margin:auto;width:104px;height:104px;font-size:55px}.rank-blason{margin-inline:auto}.rank-progress-head{justify-content:center}.rank-collection{text-align:left}.rank-promotion-card{border-radius:23px}}
      @media(prefers-reduced-motion:reduce){.rank-track span{transition:none!important}}
    `;
    document.head.appendChild(style);
  }

  function panelMarkup(info){
    const catalog=catalogFor(info.sparks,true);
    const currentIndex=catalog.findIndex(rank=>rank.id===info.current.id);
    const start=Math.max(0,currentIndex-3);
    const medals=catalog.slice(start,start+8).map(rank=>{
      const unlocked=rank.min<=info.sparks;
      const current=rank.id===info.current.id;
      return `<div class="rank-medal ${unlocked?'unlocked':'locked'} ${current?'current':''}" style="--medal:${rank.color}" title="${safe(rank.label)} — ${rank.min} éclats"><span>${unlocked?rank.avatar:'🔒'}</span>${safe(rank.label)}</div>`;
    }).join('');
    return `<div class="rank-avatar" aria-hidden="true">${info.current.avatar}</div><div class="rank-copy"><div class="rank-kicker">Niveau ${info.current.min||'initial'} · progression absolument officielle</div><h2 class="rank-title">${safe(info.current.label)}</h2><p class="rank-description">${safe(info.current.description)}</p><div class="rank-blason">🏅 ${safe(info.current.blason)}</div><div class="rank-progress-head"><span><strong>${info.sparks}</strong> éclats cumulés</span><span><strong>${info.remaining}</strong> avant le prochain grade</span></div><div class="rank-track" role="progressbar" aria-label="Progression vers ${safe(info.next.label)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${info.percent}" style="--progress:${info.percent}%"><span></span></div><p class="rank-next">À <strong>${info.next.min} éclats</strong> : ${safe(info.next.label)}, ${safe(info.next.blason)} et ${info.next.tickets} ticket${info.next.tickets>1?'s':''} bonus.</p></div><div class="rank-collection" aria-label="Grades débloqués et à venir">${medals}</div>`;
  }

  function renderDashboard(){
    const content=document.getElementById('learningDashboardContent');
    const hero=content?.querySelector('.learning-hero');
    if(!content||!hero)return;
    const info=progress();
    const signature=`${info.sparks}:${info.current.id}:${info.next.id}`;
    let panel=content.querySelector('.learning-level-panel');
    if(!panel){
      panel=document.createElement('article');
      panel.className='learning-panel learning-level-panel';
      hero.insertAdjacentElement('afterend',panel);
    }
    if(panel.dataset.signature===signature)return;
    panel.dataset.signature=signature;
    panel.style.setProperty('--rank',info.current.color);
    panel.innerHTML=panelMarkup(info);
  }

  function renderHome(){
    const copy=document.querySelector('#learningHomeStrip .home-learning-copy');
    if(!copy)return;
    const info=progress();
    let chip=copy.querySelector('.learning-home-rank');
    if(!chip){
      chip=document.createElement('div');
      chip.className='learning-home-rank';
      copy.querySelector('h2')?.insertAdjacentElement('afterend',chip);
    }
    chip.style.setProperty('--rank',info.current.color);
    chip.innerHTML=`<span aria-hidden="true">${info.current.avatar}</span>${safe(info.current.label)} · ${info.sparks} éclats`;
  }

  function renderSlot(){
    const machine=document.querySelector('#learningSlotOverlay .slot-machine');
    if(!machine)return;
    const info=progress();
    let line=machine.querySelector('.slot-rank-status');
    if(!line){
      line=document.createElement('div');
      line.className='slot-rank-status';
      machine.querySelector('.slot-result')?.insertAdjacentElement('afterend',line);
    }
    if(line)line.innerHTML=`${info.current.avatar} <strong>${safe(info.current.label)}</strong> · ${info.sparks} éclats · ${info.remaining} avant ${safe(info.next.label)}.`;
  }

  function render(){
    renderPending=false;
    const info=progress();
    document.body.dataset.learningRank=info.current.id;
    renderDashboard();
    renderHome();
    renderSlot();
  }

  function scheduleRender(){
    if(renderPending)return;
    renderPending=true;
    requestAnimationFrame(render);
  }

  function observeViews(){
    const content=document.getElementById('learningDashboardContent');
    if(content&&!dashboardObserver){
      dashboardObserver=new MutationObserver(scheduleRender);
      dashboardObserver.observe(content,{childList:true});
    }
    const strip=document.getElementById('learningHomeStrip');
    if(strip&&!homeObserver){
      homeObserver=new MutationObserver(scheduleRender);
      homeObserver.observe(strip,{childList:true});
    }
  }

  function ensurePromotion(){
    let overlay=document.getElementById('rankPromotionOverlay');
    if(overlay)return overlay;
    overlay=document.createElement('div');
    overlay.id='rankPromotionOverlay';
    overlay.className='rank-promotion-overlay';
    overlay.hidden=true;
    overlay.innerHTML='<section class="rank-promotion-card" role="dialog" aria-modal="true" aria-labelledby="rankPromotionTitle"><div class="rank-promotion-kicker">Promotion absolument officielle</div><div class="rank-promotion-avatar"></div><h2 id="rankPromotionTitle"></h2><p class="rank-promotion-description"></p><div class="rank-promotion-reward"></div><button id="rankPromotionClose">Continuer à rester remarquablement modeste</button></section>';
    document.body.appendChild(overlay);
    overlay.querySelector('#rankPromotionClose').onclick=closePromotion;
    overlay.addEventListener('click',event=>{if(event.target===overlay)closePromotion()});
    return overlay;
  }

  function showPromotion(){
    if(promotionVisible||!promotions.length)return;
    promotionVisible=true;
    const item=promotions.shift();
    const overlay=ensurePromotion();
    const card=overlay.querySelector('.rank-promotion-card');
    card.style.setProperty('--rank',item.rank.color);
    overlay.querySelector('.rank-promotion-avatar').textContent=item.rank.avatar;
    overlay.querySelector('#rankPromotionTitle').textContent=item.rank.label;
    overlay.querySelector('.rank-promotion-description').textContent=item.rank.description;
    overlay.querySelector('.rank-promotion-reward').innerHTML=`🏅 ${safe(item.rank.blason)}<br>${item.bonusTickets?`🎰 ${item.bonusTickets} ticket${item.bonusTickets>1?'s':''} bonus ajouté${item.bonusTickets>1?'s':''}`:'Nouvelle évolution cosmétique débloquée'}${item.count>1?`<br>⚡ ${item.count} grades franchis d’un coup`:''}`;
    overlay.hidden=false;
    document.body.style.overflow='hidden';
    setTimeout(()=>overlay.querySelector('#rankPromotionClose')?.focus(),0);
    scheduleRender();
  }

  function closePromotion(){
    document.getElementById('rankPromotionOverlay')?.setAttribute('hidden','');
    const slot=document.getElementById('learningSlotOverlay');
    document.body.style.overflow=slot&&!slot.hidden?'hidden':'';
    promotionVisible=false;
    if(promotions.length)setTimeout(showPromotion,180);
  }

  function bootstrapToast(rankCount,ticketCount){
    const toast=document.createElement('div');
    toast.className='rank-bootstrap-toast';
    toast.textContent=`Tes ${Store.rewards.sparks} éclats débloquent rétroactivement ${rankCount} grade${rankCount>1?'s':''}${ticketCount?` et ${ticketCount} ticket${ticketCount>1?'s':''} bonus`:''}.`;
    document.body.appendChild(toast);
    setTimeout(()=>toast.remove(),4200);
  }

  function externalPromotions(){
    if(!local.initialized)return;
    const unseen=progress().unlocked.filter(rank=>rank.min>0&&!local.celebrated[rank.id]);
    if(!unseen.length)return;
    unseen.forEach(markCelebrated);
    const tickets=grantBonuses(unseen,true);
    promotions.push({rank:unseen.at(-1),count:unseen.length,bonusTickets:tickets});
    setTimeout(showPromotion,350);
  }

  function start(){
    addStyles();
    patchStore();
    window.addEventListener('fc:learning-updated',()=>{observeViews();externalPromotions();scheduleRender()});
    window.addEventListener('fc:reward-earned',scheduleRender);
    window.addEventListener('hashchange',()=>setTimeout(()=>{observeViews();scheduleRender()},0));
    document.addEventListener('keydown',event=>{if(event.key==='Escape'&&promotionVisible)closePromotion()});
    document.addEventListener('click',event=>{
      if(event.target.closest('#homeLearningDashboard,#dashboardSpin,#learningSpin,#homeLearningSpin,#learningRewardFab,#slotSpin'))setTimeout(()=>{observeViews();scheduleRender()},70);
    });
    bootstrap();
    observeViews();
    scheduleRender();
    setTimeout(()=>{observeViews();scheduleRender()},250);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
