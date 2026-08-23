(()=>{
  if(window.__learningLevelsLoaded)return;
  window.__learningLevelsLoaded=true;

  const Store=window.LearningStore;
  if(!Store)return;

  const STORAGE_KEY='fc:learning-levels:v1';
  const PRESTIGE_STEP=250;
  const PRESTIGE_START=1750;
  const BASE_RANKS=[
    {id:'touriste-neurone',min:0,label:'Touriste du neurone',avatar:'🎒',color:'#60717a',bonusTickets:0,blason:'Badge visiteur',description:'Tu observes les concepts avec curiosité, une gourde et un itinéraire encore très approximatif.'},
    {id:'apprenti-retourneur',min:100,label:'Apprenti retourneur de cartes',avatar:'🃏',color:'#9a6a3a',bonusTickets:1,blason:'Cadre bronze',description:'Le bouton « Retourner » commence officiellement à craindre ton index.'},
    {id:'dompteur-concepts',min:250,label:'Dompteur de concepts sauvages',avatar:'🧠',color:'#297b70',bonusTickets:1,blason:'Neurone discipliné',description:'Tu approches les notions farouches sans geste brusque et avec une définition à portée de main.'},
    {id:'chevalier-ctrlz',min:500,label:'Chevalier du CTRL+Z mental',avatar:'🛡️',color:'#4568a9',bonusTickets:1,blason:'Armure anti-erreur',description:'Tu sais désormais revenir sur une certitude sans perdre tout ton honneur.'},
    {id:'architecte-certitudes',min:750,label:'Architecte de certitudes provisoires',avatar:'🏗️',color:'#8a5a9b',bonusTickets:2,blason:'Casque intellectuel',description:'Tu construis du savoir solide, tout en laissant une trappe de maintenance pour changer d’avis.'},
    {id:'vizir-presque-juste',min:1000,label:'Grand Vizir des réponses presque justes',avatar:'🧞',color:'#b27617',bonusTickets:2,blason:'Sceau de l’à-peu-près rigoureux',description:'Tes réponses sont précises, sauf dans les rares cas où la réalité manque manifestement de coopération.'},
    {id:'sorcier-doute',min:1250,label:'Sorcier senior du doute raisonnable',avatar:'🧙',color:'#6f3e91',bonusTickets:2,blason:'Cape du « je vais vérifier »',description:'Tu maîtrises l’art supérieur de dire « je ne sais pas encore » avec une autorité impressionnante.'},
    {id:'grand-maitre-auto',min:1500,label:'Grand Maître autoproclamé de la connaissance',avatar:'👑',color:'#c08a00',bonusTickets:3,blason:'Couronne sans valeur académique',description:'La cérémonie de nomination a été unanime : tu étais le seul membre du jury.'}
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
  let renderQueued=false;
  let dashboardObserver=null;
  let homeObserver=null;
  let promotionQueue=[];
  let promotionOpen=false;

  function safe(value){
    return String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  }

  function loadLocal(){
    try{
      const parsed=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');
      if(parsed&&typeof parsed==='object')return {version:1,initialized:Boolean(parsed.initialized),celebrated:parsed.celebrated&&typeof parsed.celebrated==='object'?parsed.celebrated:{}};
    }catch(_error){}
    return {version:1,initialized:false,celebrated:{}};
  }

  function saveLocal(){
    try{localStorage.setItem(STORAGE_KEY,JSON.stringify(local))}catch(_error){}
  }

  function roman(value){
    const map=[[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
    let number=Math.max(1,Math.floor(value));
    let result='';
    map.forEach(([amount,symbol])=>{while(number>=amount){result+=symbol;number-=amount}});
    return result;
  }

  function prestigeRank(index){
    const safeIndex=Math.max(1,Math.floor(index));
    const title=PRESTIGE_TITLES[(safeIndex-1)%PRESTIGE_TITLES.length];
    const cycle=Math.floor((safeIndex-1)/PRESTIGE_TITLES.length);
    return {
      id:`prestige-${safeIndex}`,
      min:1500+safeIndex*PRESTIGE_STEP,
      label:`Prestige ${roman(safeIndex)} — ${title}${cycle?` · saison ${cycle+1}`:''}`,
      avatar:PRESTIGE_AVATARS[(safeIndex-1)%PRESTIGE_AVATARS.length],
      color:PRESTIGE_COLORS[(safeIndex-1)%PRESTIGE_COLORS.length],
      bonusTickets:safeIndex%4===0?2:1,
      blason:`Étoile de prestige ${roman(safeIndex)}`,
      description:'Le savoir continue de progresser. La modestie, elle, fait actuellement l’objet d’un audit indépendant.'
    };
  }

  function ranksThrough(sparks,{includeNext=true}={}){
    const value=Math.max(0,Math.floor(Number(sparks)||0));
    const ranks=[...BASE_RANKS];
    const reached=Math.max(0,Math.floor((value-1500)/PRESTIGE_STEP));
    const count=Math.max(includeNext?1:0,reached+(includeNext?1:0));
    for(let index=1;index<=count;index++)ranks.push(prestigeRank(index));
    return ranks.sort((a,b)=>a.min-b.min);
  }

  function getProgress(){
    const sparks=Math.max(0,Math.floor(Number(Store.rewards?.sparks)||0));
    const ranks=ranksThrough(sparks,{includeNext:true});
    const unlocked=ranks.filter(rank=>rank.min<=sparks);
    const current=unlocked[unlocked.length-1]||BASE_RANKS[0];
    const next=ranks.find(rank=>rank.min>sparks)||prestigeRank(Math.floor((sparks-1500)/PRESTIGE_STEP)+2);
    const span=Math.max(1,next.min-current.min);
    const earned=Math.max(0,sparks-current.min);
    const percent=Math.max(0,Math.min(100,Math.round(earned/span*100)));
    return {
      sparks,current,next,unlocked,
      percent,
      remaining:Math.max(0,next.min-sparks),
      earnedInLevel:earned,
      levelSpan:span
    };
  }

  function newlyCrossed(before,after){
    return ranksThrough(after,{includeNext:false}).filter(rank=>rank.min>before&&rank.min<=after&&rank.min>0);
  }

  function grantRankBonuses(ranks,{persist=true}={}){
    let total=0;
    ranks.forEach(rank=>{
      if(rank.bonusTickets>0){
        total+=Store.grantTickets?.(rank.bonusTickets,`rank:${rank.id}`,'passage_grade',{
          rankId:rank.id,rankLabel:rank.label,threshold:rank.min
        })||0;
      }
    });
    if(total&&persist)Store.updateSettings?.({});
    return total;
  }

  function patchStore(){
    if(Store.__humorousRanksPatched)return;
    Store.__humorousRanksPatched=true;
    const baseGrantPrize=Store.grantPrize?.bind(Store);
    if(baseGrantPrize){
      Store.grantPrize=prize=>{
        const before=Math.max(0,Math.floor(Number(Store.rewards?.sparks)||0));
        const projected=before+Math.max(0,Math.floor(Number(prize?.sparks)||0));
        const crossed=newlyCrossed(before,projected);
        const bonusTickets=grantRankBonuses(crossed,{persist:false});
        const result=baseGrantPrize(prize);
        if(crossed.length){
          crossed.forEach(rank=>markCelebrated(rank));
          promotionQueue.push({rank:crossed[crossed.length-1],count:crossed.length,bonusTickets});
          setTimeout(showNextPromotion,650);
        }
        return {...result,rankUps:crossed.map(rank=>rank.id),rankBonusTickets:bonusTickets};
      };
    }
    Store.rewardLevel=()=>{
      const progress=getProgress();
      return {...progress.current,next:progress.next.min,nextLabel:progress.next.label,progress:progress.percent};
    };
    Store.getRankProgress=getProgress;
    Store.getRankCatalog=()=>ranksThrough(getProgress().sparks,{includeNext:true}).map(rank=>({...rank}));
  }

  function markCelebrated(rank){
    local.celebrated[rank.id]=local.celebrated[rank.id]||new Date().toISOString();
    saveLocal();
  }

  function bootstrapExistingProgress(){
    const progress=getProgress();
    const earned=progress.unlocked.filter(rank=>rank.min>0);
    const unseen=earned.filter(rank=>!local.celebrated[rank.id]);
    if(!local.initialized){
      const bonusTickets=grantRankBonuses(earned,{persist:true});
      earned.forEach(markCelebrated);
      local.initialized=true;
      saveLocal();
      if(earned.length){
        setTimeout(()=>showBootstrapToast(earned.length,bonusTickets),900);
      }
      return;
    }
    if(unseen.length){
      const bonusTickets=grantRankBonuses(unseen,{persist:true});
      unseen.forEach(markCelebrated);
      promotionQueue.push({rank:unseen[unseen.length-1],count:unseen.length,bonusTickets});
      setTimeout(showNextPromotion,400);
    }
  }

  function addStyles(){
    if(document.getElementById('learning-level-styles'))return;
    const style=document.createElement('style');
    style.id='learning-level-styles';
    style.textContent=`
      .learning-level-panel{--rank-color:#60717a;grid-column:1/-1;display:grid;grid-template-columns:auto minmax(0,1fr);gap:20px;align-items:center;overflow:hidden;position:relative;background:radial-gradient(circle at 0 0,color-mix(in srgb,var(--rank-color) 23%,transparent),transparent 36%),linear-gradient(145deg,rgba(255,255,255,.98),rgba(250,250,252,.88));border:1px solid color-mix(in srgb,var(--rank-color) 34%,var(--line));box-shadow:0 18px 52px color-mix(in srgb,var(--rank-color) 14%,transparent)}
      .learning-level-panel:after{content:'';position:absolute;right:-55px;top:-75px;width:190px;height:190px;border-radius:50%;border:28px solid color-mix(in srgb,var(--rank-color) 8%,transparent);pointer-events:none}
      .learning-rank-avatar{width:124px;height:124px;border-radius:32px;display:grid;place-items:center;font-size:64px;background:linear-gradient(145deg,#fff,color-mix(in srgb,var(--rank-color) 16%,#fff));border:3px solid color-mix(in srgb,var(--rank-color) 60%,#fff);box-shadow:0 16px 38px color-mix(in srgb,var(--rank-color) 20%,transparent);position:relative;z-index:1}
      .learning-rank-copy{min-width:0;position:relative;z-index:1}.learning-rank-kicker{font-size:11px;font-weight:950;letter-spacing:.12em;text-transform:uppercase;color:var(--rank-color)}.learning-rank-title{font-size:clamp(25px,4vw,40px);line-height:1.05;letter-spacing:-.045em;margin:6px 0}.learning-rank-description{max-width:72ch;margin:0;color:var(--muted);line-height:1.45}.learning-rank-blason{display:inline-flex;margin-top:10px;padding:7px 10px;border-radius:999px;background:color-mix(in srgb,var(--rank-color) 10%,#fff);color:var(--rank-color);font-size:12px;font-weight:900}
      .learning-rank-progress-head{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-top:17px;font-size:12px;color:var(--muted)}.learning-rank-progress-head strong{color:var(--text)}.learning-rank-track{height:12px;border-radius:999px;background:rgba(16,42,51,.08);overflow:hidden;margin-top:7px}.learning-rank-track span{display:block;height:100%;width:var(--rank-progress);border-radius:inherit;background:linear-gradient(90deg,var(--rank-color),color-mix(in srgb,var(--rank-color) 60%,#ffd861))}.learning-rank-next{margin:8px 0 0;color:var(--muted);font-size:12px}.learning-rank-next strong{color:var(--text)}
      .learning-rank-collection{grid-column:1/-1;display:flex;gap:8px;overflow-x:auto;padding:4px 1px 2px;scrollbar-gutter:stable}.learning-rank-medal{flex:0 0 auto;display:flex;align-items:center;gap:7px;padding:8px 10px;border-radius:14px;background:rgba(16,42,51,.045);border:1px solid var(--line);font-size:11px;font-weight:850;color:var(--muted)}.learning-rank-medal.unlocked{background:color-mix(in srgb,var(--medal-color) 10%,#fff);border-color:color-mix(in srgb,var(--medal-color) 34%,var(--line));color:var(--text)}.learning-rank-medal.current{outline:2px solid var(--medal-color);outline-offset:1px}.learning-rank-medal.locked{filter:grayscale(1);opacity:.52}.learning-rank-medal span{font-size:20px}
      .learning-home-rank{display:inline-flex;align-items:center;gap:6px;width:max-content;max-width:100%;margin:5px 0 7px;padding:6px 9px;border-radius:999px;background:color-mix(in srgb,var(--home-rank-color) 10%,#fff);border:1px solid color-mix(in srgb,var(--home-rank-color) 26%,var(--line));font-size:11px;font-weight:900;color:var(--home-rank-color);overflow-wrap:anywhere}
      .slot-rank-status{margin:10px auto 0;width:min(440px,100%);padding:9px 12px;border-radius:14px;background:rgba(255,255,255,.09);font-size:12px;color:rgba(255,255,255,.78)}.slot-rank-status strong{color:#ffe789}
      .rank-promotion-overlay{position:fixed;inset:0;z-index:85;display:grid;place-items:center;padding:16px;background:rgba(8,5,12,.76);backdrop-filter:blur(11px)}.rank-promotion-overlay[hidden]{display:none}.rank-promotion-card{--rank-color:#8f45bd;width:min(590px,100%);max-height:calc(100dvh - 24px);overflow:auto;padding:clamp(22px,5vw,38px);border-radius:30px;text-align:center;color:#fff;background:radial-gradient(circle at 50% -10%,color-mix(in srgb,var(--rank-color) 55%,transparent),transparent 42%),linear-gradient(145deg,#1d1127,#4b1d5f);border:2px solid color-mix(in srgb,var(--rank-color) 70%,#ffe47d);box-shadow:0 35px 110px rgba(0,0,0,.55);position:relative}.rank-promotion-kicker{font-size:11px;text-transform:uppercase;letter-spacing:.16em;font-weight:950;color:#ffe68a}.rank-promotion-avatar{font-size:84px;line-height:1;margin:20px 0 12px;filter:drop-shadow(0 14px 20px rgba(0,0,0,.25))}.rank-promotion-card h2{font-size:clamp(29px,7vw,48px);line-height:1.02;letter-spacing:-.05em;margin:0}.rank-promotion-card p{color:rgba(255,255,255,.78);line-height:1.5}.rank-promotion-reward{margin:18px 0;padding:14px;border-radius:18px;background:rgba(255,255,255,.1);font-weight:850}.rank-promotion-card button{background:#ffe173;color:#2b1235;min-height:47px;padding-inline:20px}.rank-bootstrap-toast{position:fixed;left:50%;bottom:22px;z-index:50;max-width:min(580px,calc(100% - 24px));transform:translateX(-50%);padding:13px 17px;border-radius:16px;background:#201029;color:#fff;box-shadow:0 18px 54px rgba(0,0,0,.3);font-weight:850;text-align:center}
      @media(max-width:700px){.learning-level-panel{grid-template-columns:1fr;text-align:center}.learning-rank-avatar{margin:auto;width:104px;height:104px;font-size:55px}.learning-rank-blason{margin-inline:auto}.learning-rank-progress-head{justify-content:center}.learning-rank-collection{text-align:left}.rank-promotion-card{border-radius:23px}}
      @media(prefers-reduced-motion:reduce){.rank-promotion-overlay,.learning-rank-track span{transition:none!important;animation:none!important}}
    `;
    document.head.appendChild(style);
  }

  function rankPanelHtml(progress){
    const visible=ranksThrough(progress.sparks,{includeNext:true});
    const start=Math.max(0,visible.findIndex(rank=>rank.id===progress.current.id)-3);
    const medals=visible.slice(start,start+8).map(rank=>{
      const unlocked=rank.min<=progress.sparks;
      const current=rank.id===progress.current.id;
      return `<div class="learning-rank-medal ${unlocked?'unlocked':'locked'} ${current?'current':''}" style="--medal-color:${rank.color}" title="${safe(rank.label)} — ${rank.min} éclats"><span>${unlocked?rank.avatar:'🔒'}</span>${safe(rank.label)}</div>`;
    }).join('');
    return `<article class="learning-panel learning-level-panel" style="--rank-color:${progress.current.color}">
      <div class="learning-rank-avatar" aria-hidden="true">${progress.current.avatar}</div>
      <div class="learning-rank-copy">
        <div class="learning-rank-kicker">Niveau ${progress.current.min===0?'initial':`${progress.current.min} éclats`} · progression absolument officielle</div>
        <h2 class="learning-rank-title">${safe(progress.current.label)}</h2>
        <p class="learning-rank-description">${safe(progress.current.description)}</p>
        <div class="learning-rank-blason">🏅 ${safe(progress.current.blason)}</div>
        <div class="learning-rank-progress-head"><span><strong>${progress.sparks}</strong> éclats cumulés</span><span><strong>${progress.remaining}</strong> avant le prochain grade</span></div>
        <div class="learning-rank-track" role="progressbar" aria-label="Progression vers ${safe(progress.next.label)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress.percent}" style="--rank-progress:${progress.percent}%"><span></span></div>
        <p class="learning-rank-next">Prochaine récompense à <strong>${progress.next.min} éclats</strong> : ${safe(progress.next.label)}, ${safe(progress.next.blason)} et ${progress.next.bonusTickets} ticket${progress.next.bonusTickets>1?'s':''} bonus.</p>
      </div>
      <div class="learning-rank-collection" aria-label="Grades débloqués et à venir">${medals}</div>
    </article>`;
  }

  function renderDashboardRank(){
    const content=document.getElementById('learningDashboardContent');
    if(!content)return;
    const hero=content.querySelector('.learning-hero');
    if(!hero)return;
    let panel=content.querySelector('.learning-level-panel');
    const wrapper=document.createElement('div');
    wrapper.innerHTML=rankPanelHtml(getProgress());
    const fresh=wrapper.firstElementChild;
    if(panel)panel.replaceWith(fresh);
    else hero.insertAdjacentElement('afterend',fresh);
  }

  function renderHomeRank(){
    const strip=document.getElementById('learningHomeStrip');
    if(!strip)return;
    const copy=strip.querySelector('.home-learning-copy');
    if(!copy)return;
    const progress=getProgress();
    let chip=copy.querySelector('.learning-home-rank');
    if(!chip){
      chip=document.createElement('div');
      chip.className='learning-home-rank';
      const heading=copy.querySelector('h2');
      if(heading)heading.insertAdjacentElement('afterend',chip);
      else copy.prepend(chip);
    }
    chip.style.setProperty('--home-rank-color',progress.current.color);
    chip.innerHTML=`<span aria-hidden="true">${progress.current.avatar}</span>${safe(progress.current.label)} · ${progress.sparks} éclats`;
  }

  function renderSlotRank(){
    const machine=document.querySelector('#learningSlotOverlay .slot-machine');
    if(!machine)return;
    const progress=getProgress();
    let line=machine.querySelector('.slot-rank-status');
    if(!line){
      line=document.createElement('div');
      line.className='slot-rank-status';
      const result=machine.querySelector('.slot-result');
      if(result)result.insertAdjacentElement('afterend',line);
      else machine.appendChild(line);
    }
    line.innerHTML=`${progress.current.avatar} <strong>${safe(progress.current.label)}</strong> · ${progress.sparks} éclats · encore ${progress.remaining} avant ${safe(progress.next.label)}.`;
  }

  function render(){
    renderQueued=false;
    const progress=getProgress();
    document.body.dataset.learningRank=progress.current.id;
    renderDashboardRank();
    renderHomeRank();
    renderSlotRank();
  }

  function scheduleRender(){
    if(renderQueued)return;
    renderQueued=true;
    requestAnimationFrame(render);
  }

  function observeDynamicViews(){
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

  function ensurePromotionOverlay(){
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
    document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!overlay.hidden)closePromotion()});
    return overlay;
  }

  function showNextPromotion(){
    if(promotionOpen||!promotionQueue.length)return;
    promotionOpen=true;
    const item=promotionQueue.shift();
    const overlay=ensurePromotionOverlay();
    const card=overlay.querySelector('.rank-promotion-card');
    card.style.setProperty('--rank-color',item.rank.color);
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
    const overlay=document.getElementById('rankPromotionOverlay');
    if(overlay)overlay.hidden=true;
    document.body.style.overflow='';
    promotionOpen=false;
    if(promotionQueue.length)setTimeout(showNextPromotion,180);
  }

  function showBootstrapToast(rankCount,ticketCount){
    const toast=document.createElement('div');
    toast.className='rank-bootstrap-toast';
    toast.textContent=`Tes ${Store.rewards.sparks} éclats débloquent rétroactivement ${rankCount} grade${rankCount>1?'s':''}${ticketCount?` et ${ticketCount} ticket${ticketCount>1?'s':''} bonus`:''}.`;
    document.body.appendChild(toast);
    setTimeout(()=>toast.remove(),4200);
  }

  function checkExternalPromotions(){
    if(!local.initialized)return;
    const unseen=getProgress().unlocked.filter(rank=>rank.min>0&&!local.celebrated[rank.id]);
    if(!unseen.length)return;
    const bonusTickets=grantRankBonuses(unseen,{persist:true});
    unseen.forEach(markCelebrated);
    promotionQueue.push({rank:unseen[unseen.length-1],count:unseen.length,bonusTickets});
    setTimeout(showNextPromotion,350);
  }

  function start(){
    addStyles();
    patchStore();
    bootstrapExistingProgress();
    observeDynamicViews();
    scheduleRender();
    window.addEventListener('fc:learning-updated',()=>{
      observeDynamicViews();
      checkExternalPromotions();
      scheduleRender();
    });
    window.addEventListener('fc:reward-earned',scheduleRender);
    window.addEventListener('hashchange',()=>setTimeout(()=>{observeDynamicViews();scheduleRender()},0));
    document.addEventListener('click',event=>{
      if(event.target.closest('#homeLearningDashboard,#learningBack,#dashboardSpin,#learningSpin,#homeLearningSpin,#learningRewardFab,#slotSpin'))setTimeout(()=>{observeDynamicViews();scheduleRender()},60);
    });
    setTimeout(()=>{observeDynamicViews();scheduleRender()},250);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
