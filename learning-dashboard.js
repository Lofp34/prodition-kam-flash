(()=>{
  if(window.__learningDashboardLoaded)return;
  window.__learningDashboardLoaded=true;
  const Store=window.LearningStore;
  const Tracker=window.LearningTracker;
  const Rewards=window.LearningRewards;
  if(!Store)return;

  const PERIODS={today:'Aujourd’hui',week:'7 jours',month:'30 jours',all:'Depuis le début'};
  let currentPeriod='week';
  let renderTimer=null;
  let baseGoHome=null;
  let baseOpenDeck=null;
  let baseOpenFolder=null;

  function safe(value){
    return String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  }

  function addStyles(){
    if(document.getElementById('learning-dashboard-styles'))return;
    const style=document.createElement('style');
    style.id='learning-dashboard-styles';
    style.textContent=`
      :root{--learn-purple:#5b2a86;--learn-purple2:#8f45bd;--learn-gold:#e0a800;--learn-green:#13795b;--learn-red:#b93b45;--learn-card:#fff;--learn-ink:#102a33}
      #learningView{min-height:100vh;padding:12px 0 50px}.learning-shell{width:min(1160px,calc(100% - 24px));margin:auto}.learning-topbar{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:12px}.learning-topbar h1{font-size:clamp(29px,5vw,52px);letter-spacing:-.05em;margin:0}.learning-topbar p{margin:4px 0 0;color:var(--muted)}
      .learning-hero{display:grid;grid-template-columns:minmax(260px,.8fr) minmax(0,1.5fr);gap:14px}.learning-panel{border:1px solid var(--line);border-radius:var(--r);background:rgba(255,255,255,.86);box-shadow:0 12px 42px rgba(16,42,51,.08);padding:22px}.learning-reliability{display:grid;place-items:center;text-align:center;background:radial-gradient(circle at 50% 0,rgba(255,226,112,.35),transparent 44%),linear-gradient(145deg,#251132,#5d1f75);color:#fff;border-color:rgba(255,255,255,.18)}
      .reliability-ring{--score:0;width:178px;height:178px;border-radius:50%;display:grid;place-items:center;background:conic-gradient(#ffdc68 calc(var(--score)*1%),rgba(255,255,255,.14) 0);position:relative;box-shadow:0 18px 45px rgba(0,0,0,.25)}.reliability-ring:after{content:'';position:absolute;inset:14px;border-radius:50%;background:linear-gradient(150deg,#321444,#4c1b60)}.reliability-value{position:relative;z-index:1}.reliability-value strong{display:block;font-size:48px;line-height:1;letter-spacing:-.06em}.reliability-value span{font-size:12px;text-transform:uppercase;letter-spacing:.09em;color:rgba(255,255,255,.72);font-weight:850}.reliability-status{font-size:21px;font-weight:900;margin:15px 0 5px}.reliability-copy{margin:0;color:rgba(255,255,255,.76);line-height:1.45}.reliability-days{display:flex;gap:7px;justify-content:center;margin-top:16px}.reliability-day{width:32px;height:32px;border-radius:10px;display:grid;place-items:center;background:rgba(255,255,255,.1);font-size:12px;font-weight:900}.reliability-day.active{background:#ffe06d;color:#34203b}.reliability-day.not-counted{opacity:.32}.reliability-day.today{outline:2px solid rgba(255,255,255,.72);outline-offset:2px}
      .learning-summary h2{font-size:clamp(25px,4vw,38px);letter-spacing:-.04em;margin:0 0 8px}.learning-summary-lead{font-size:17px;line-height:1.5;color:var(--muted);margin:0 0 18px}.learning-goal-row{display:flex;justify-content:space-between;align-items:end;gap:12px}.learning-goal-row strong{font-size:34px;letter-spacing:-.05em}.learning-progress{height:12px;border-radius:999px;background:rgba(16,42,51,.09);overflow:hidden;margin:10px 0}.learning-progress span{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,var(--brand),var(--brand2));transition:width .35s}.learning-quick-actions{display:flex;gap:9px;flex-wrap:wrap;margin-top:18px}.learning-quick-actions button{min-height:46px}.learning-casino-button{background:linear-gradient(135deg,#531d70,#9b43ba 65%,#d79600);color:#fff}
      .learning-periods{display:flex;gap:8px;flex-wrap:wrap;margin:18px 0 12px}.learning-periods button{background:#fff;color:var(--text);border:1px solid var(--line)}.learning-periods button.active{background:var(--text);color:#fff}
      .learning-stats{display:grid;grid-template-columns:repeat(6,1fr);gap:10px}.learning-stat-card{border:1px solid var(--line);border-radius:20px;background:rgba(255,255,255,.82);padding:16px;min-width:0}.learning-stat-card span{display:block;color:var(--muted);font-size:12px;font-weight:850;text-transform:uppercase;letter-spacing:.05em}.learning-stat-card strong{display:block;font-size:clamp(24px,3.4vw,34px);letter-spacing:-.045em;margin-top:6px}.learning-stat-card small{display:block;margin-top:5px;color:var(--muted)}.delta-up{color:var(--learn-green)!important}.delta-down{color:var(--learn-red)!important}
      .learning-grid{display:grid;grid-template-columns:1.45fr .85fr;gap:14px;margin-top:14px}.learning-panel h3{font-size:22px;margin:0 0 4px;letter-spacing:-.025em}.learning-panel-sub{color:var(--muted);margin:0 0 16px;font-size:13px;line-height:1.4}
      .activity-chart{height:230px;display:flex;align-items:end;gap:7px;padding-top:18px;border-bottom:1px solid var(--line)}.activity-column{flex:1;min-width:0;height:100%;display:flex;flex-direction:column;justify-content:end;align-items:center;gap:6px}.activity-value{font-size:10px;font-weight:850;color:var(--muted)}.activity-bar-wrap{width:100%;height:170px;display:flex;align-items:end;justify-content:center}.activity-bar{width:min(34px,80%);min-height:3px;border-radius:9px 9px 3px 3px;background:linear-gradient(180deg,var(--brand2),var(--brand));position:relative}.activity-bar.mastered:after{content:'';position:absolute;left:50%;top:-8px;width:8px;height:8px;border-radius:50%;background:#e1a900;transform:translateX(-50%)}.activity-label{font-size:10px;color:var(--muted);white-space:nowrap}.activity-empty{display:grid;place-items:center;height:220px;color:var(--muted);text-align:center}
      .heatmap{display:grid;grid-template-columns:repeat(10,1fr);gap:5px;margin-top:16px}.heat-day{aspect-ratio:1;border-radius:6px;background:rgba(16,42,51,.08);display:grid;place-items:center;font-size:9px;color:var(--muted)}.heat-day.active{background:var(--brand);color:#fff}.heat-day.strong{background:var(--brand2);color:#fff}
      .reward-panel{background:radial-gradient(circle at 50% -10%,rgba(255,224,104,.32),transparent 40%),linear-gradient(145deg,#24102f,#5c1c73);color:#fff;border-color:rgba(255,255,255,.16)}.reward-panel h3,.reward-panel .learning-panel-sub{color:#fff}.reward-panel .learning-panel-sub{opacity:.7}.reward-numbers{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.reward-number{padding:13px 8px;border-radius:16px;background:rgba(255,255,255,.09);text-align:center}.reward-number strong{display:block;font-size:26px;color:#ffe173}.reward-number span{font-size:11px;color:rgba(255,255,255,.72)}.reward-panel button{width:100%;margin-top:14px;background:#ffe173;color:#32143f}.reward-next{margin:12px 0 0;color:rgba(255,255,255,.75);font-size:13px;line-height:1.45}.badge-list{display:flex;gap:7px;flex-wrap:wrap;margin-top:13px}.reward-badge{padding:7px 10px;border-radius:999px;background:rgba(255,255,255,.12);font-size:11px;font-weight:850}
      .deck-list{display:grid;gap:9px}.deck-progress-row{border:1px solid var(--line);border-radius:17px;padding:13px 14px;background:rgba(255,255,255,.72);cursor:pointer}.deck-progress-row:hover{border-color:rgba(20,87,102,.35);transform:translateY(-1px)}.deck-progress-top{display:flex;justify-content:space-between;gap:10px;align-items:center}.deck-progress-title{font-weight:900;line-height:1.25}.deck-progress-count{font-size:12px;color:var(--muted);white-space:nowrap}.deck-progress-bar{height:8px;border-radius:999px;background:rgba(16,42,51,.08);overflow:hidden;margin-top:9px}.deck-progress-bar span{display:block;height:100%;background:linear-gradient(90deg,var(--brand),var(--brand2));border-radius:inherit}.deck-progress-meta{display:flex;justify-content:space-between;gap:8px;margin-top:7px;font-size:11px;color:var(--muted)}
      .learning-two-columns{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:14px}.milestone-list{display:grid;gap:8px}.milestone{display:flex;align-items:center;gap:10px;padding:11px;border-radius:14px;background:rgba(20,87,102,.06)}.milestone-icon{display:grid;place-items:center;width:38px;height:38px;border-radius:12px;background:#fff3bd}.milestone strong{display:block}.milestone small{color:var(--muted)}
      .learning-settings{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.learning-field{display:grid;gap:5px}.learning-field label{font-size:12px;font-weight:850;color:var(--muted)}.learning-field input[type=number]{width:100%;min-width:0}.learning-check{display:flex;align-items:center;gap:9px;padding:10px;border-radius:13px;background:rgba(16,42,51,.05);font-weight:750}.learning-check input{min-height:auto}.settings-actions,.data-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}.learning-note{font-size:12px;color:var(--muted);line-height:1.45;margin:12px 0 0}
      .learning-home-strip{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:18px;margin-bottom:14px;padding:18px 20px;border-radius:var(--r);border:1px solid rgba(108,45,139,.22);background:radial-gradient(circle at 0 50%,rgba(255,223,101,.25),transparent 28%),linear-gradient(135deg,rgba(255,255,255,.94),rgba(247,238,252,.92));box-shadow:0 12px 40px rgba(61,22,78,.1)}.learning-home-strip[hidden]{display:none}.home-reliability{display:grid;place-items:center;width:84px;height:84px;border-radius:50%;background:conic-gradient(var(--learn-purple) calc(var(--home-score)*1%),rgba(91,42,134,.12) 0);position:relative}.home-reliability:after{content:'';position:absolute;inset:8px;border-radius:50%;background:#fff}.home-reliability strong{position:relative;z-index:1;font-size:23px}.home-learning-copy h2{margin:0 0 4px;font-size:25px;letter-spacing:-.035em}.home-learning-copy p{margin:0;color:var(--muted);line-height:1.4}.home-learning-actions{display:flex;gap:8px;flex-wrap:wrap;justify-content:flex-end}.home-learning-actions button{white-space:nowrap}
      .learning-live{position:fixed;left:10px;bottom:14px;z-index:20;display:flex;align-items:center;gap:7px;padding:8px 11px;border:1px solid var(--line);border-radius:999px;background:rgba(255,255,255,.92);box-shadow:0 8px 28px rgba(16,42,51,.13);font-size:12px;font-weight:850;color:var(--text);cursor:pointer}.learning-live[hidden]{display:none}.learning-live-dot{width:8px;height:8px;border-radius:50%;background:var(--learn-green)}
      @media(max-width:950px){.learning-stats{grid-template-columns:repeat(3,1fr)}.learning-grid,.learning-hero{grid-template-columns:1fr}.learning-two-columns{grid-template-columns:1fr}.learning-home-strip{grid-template-columns:auto 1fr}.home-learning-actions{grid-column:1/3;justify-content:flex-start}}
      @media(max-width:620px){.learning-shell{width:calc(100% - 16px)}.learning-panel{padding:17px}.learning-topbar{align-items:flex-start}.learning-topbar p{font-size:13px}.learning-stats{grid-template-columns:repeat(2,1fr)}.learning-stat-card{padding:13px}.learning-settings{grid-template-columns:1fr}.learning-home-strip{grid-template-columns:1fr;text-align:center}.home-reliability{margin:auto}.home-learning-actions{grid-column:auto;justify-content:center}.activity-chart{gap:3px}.activity-label{font-size:8px}.learning-live{bottom:80px}.reward-numbers{grid-template-columns:repeat(3,1fr)}}
      @media(prefers-reduced-motion:reduce){.learning-progress span,.deck-progress-row{transition:none!important;transform:none!important}}
    `;
    document.head.appendChild(style);
  }

  function ensureView(){
    let view=document.getElementById('learningView');
    if(view)return view;
    view=document.createElement('section');
    view.id='learningView';
    view.className='hidden';
    view.innerHTML='<main class="learning-shell" id="learningDashboardContent"></main>';
    document.body.appendChild(view);
    return view;
  }

  function ensureHomeStrip(){
    let strip=document.getElementById('learningHomeStrip');
    if(strip)return strip;
    const grid=document.getElementById('homeGrid');
    if(!grid)return null;
    strip=document.createElement('section');
    strip.id='learningHomeStrip';
    strip.className='learning-home-strip';
    grid.parentNode.insertBefore(strip,grid);
    return strip;
  }

  function ensureLiveChip(){
    let chip=document.getElementById('learningLiveChip');
    if(chip)return chip;
    chip=document.createElement('button');
    chip.id='learningLiveChip';
    chip.className='learning-live';
    chip.innerHTML='<span class="learning-live-dot"></span><span class="learning-live-copy">Suivi actif</span>';
    chip.onclick=open;
    document.body.appendChild(chip);
    return chip;
  }

  function dayLabel(key,compact=false){
    try{
      const [year,month,day]=key.split('-').map(Number);
      return new Intl.DateTimeFormat('fr-FR',compact?{weekday:'narrow',timeZone:'Europe/Paris'}:{weekday:'short',day:'2-digit',timeZone:'Europe/Paris'}).format(new Date(Date.UTC(year,month-1,day,12)));
    }catch(_error){return key.slice(5)}
  }

  function formatDate(key){
    if(!key)return '—';
    try{
      const [year,month,day]=key.split('-').map(Number);
      return new Intl.DateTimeFormat('fr-FR',{day:'numeric',month:'short',year:'numeric'}).format(new Date(Date.UTC(year,month-1,day,12)));
    }catch(_error){return key}
  }

  function formatDuration(ms){
    const minutes=Math.round((Number(ms)||0)/60000);
    if(minutes<60)return `${minutes} min`;
    const hours=Math.floor(minutes/60),rest=minutes%60;
    return rest?`${hours} h ${rest} min`:`${hours} h`;
  }

  function periodComparison(period,current){
    if(period==='all')return null;
    const length=Store.diffDays(current.from,current.to)+1;
    const previousTo=Store.addDays(current.from,-1);
    const previousFrom=Store.addDays(previousTo,-(length-1));
    return Store.getMetricsBetween(previousFrom,previousTo);
  }

  function deltaText(current,previous,key,suffix=''){
    if(!previous)return '<small>Historique cumulé</small>';
    const delta=(Number(current[key])||0)-(Number(previous[key])||0);
    if(delta===0)return '<small>Stable sur la période</small>';
    const cls=delta>0?'delta-up':'delta-down';
    return `<small class="${cls}">${delta>0?'+':''}${delta}${suffix} vs période précédente</small>`;
  }

  function reliabilityDays(reliability){
    const today=Store.dateKey();
    const start=Store.addDays(today,-4);
    return Store.rangeKeys(start,today).map(key=>{
      const day=Store.state.days[key];
      const counted=!reliability.startDate||key>=reliability.startDate;
      const active=counted&&Store.isActiveDay(day);
      const stateLabel=!counted?'hors fenêtre de la série':active?'jour actif':'jour non qualifié';
      return `<span class="reliability-day ${active?'active':''} ${!counted?'not-counted':''} ${key===today?'today':''}" title="${safe(dayLabel(key))} : ${stateLabel}">${counted?safe(dayLabel(key,true)):'·'}</span>`;
    }).join('');
  }

  function recommendedCopy(recommended){
    if(!recommended)return 'Choisis un jeu et révèle ta première réponse.';
    if(recommended.percent>=80)return `Plus que ${recommended.total-recommended.mastered} cartes à maîtriser dans ${recommended.title}.`;
    if(recommended.percent>0)return `Reprends ${recommended.title} : progression actuelle ${recommended.percent} %.`;
    return `Commence ${recommended.title} avec une session express de 5 cartes.`;
  }

  function renderHomeStrip(){
    const strip=ensureHomeStrip();
    if(!strip)return;
    let root=false;
    try{root=currentFolder===null&&!document.getElementById('homeView').classList.contains('hidden')}catch(_error){}
    strip.hidden=!root;
    if(!root)return;
    const today=Store.getMetrics('today');
    const reliability=Store.getReliability();
    const recommended=Store.getRecommendedDeck();
    const rewards=Store.rewards;
    const goal=Math.max(1,Store.settings.dailyGoal);
    strip.innerHTML=`
      <div class="home-reliability" style="--home-score:${reliability.percent}" role="img" aria-label="Fiabilité de série ${reliability.percent} pour cent"><strong>${reliability.percent}%</strong></div>
      <div class="home-learning-copy"><h2>Mon apprentissage</h2><p><strong>${today.uniqueCards} / ${goal} cartes aujourd’hui</strong> · ${today.masteredAdded} maîtrisée${today.masteredAdded>1?'s':''} · ${formatDuration(today.activeMs)} · série ${reliability.streakDays} jour${reliability.streakDays>1?'s':''}.</p><p>${safe(recommendedCopy(recommended))}</p></div>
      <div class="home-learning-actions"><button id="homeLearningResume">${recommended?'Reprendre':'Commencer'}</button><button class="secondary" id="homeLearningDashboard">Tableau de bord</button>${Store.settings.casino&&rewards.tickets>0?`<button class="learning-casino-button" id="homeLearningSpin">🎰 ${rewards.tickets} tirage${rewards.tickets>1?'s':''}</button>`:''}</div>`;
    strip.querySelector('#homeLearningDashboard').onclick=open;
    strip.querySelector('#homeLearningResume').onclick=()=>recommended?window.openDeck(recommended.id):Tracker?.startExpress?.();
    const spin=strip.querySelector('#homeLearningSpin');
    if(spin)spin.onclick=()=>Rewards?.open?.({autoSpin:false});
  }

  function renderLiveChip(){
    const chip=ensureLiveChip();
    const today=Store.getMetrics('today');
    let visible=false;
    try{visible=!document.getElementById('learningView')?.classList.contains('hidden')||!document.getElementById('studyView')?.classList.contains('hidden')}catch(_error){}
    chip.hidden=!visible;
    chip.querySelector('.learning-live-copy').textContent=`${today.uniqueCards} cartes · ${formatDuration(today.activeMs)}`;
  }

  function statCard(label,value,detail=''){
    return `<article class="learning-stat-card"><span>${safe(label)}</span><strong>${safe(value)}</strong>${detail}</article>`;
  }

  function renderChart(metrics){
    const values=metrics.daily;
    const max=Math.max(1,...values.map(day=>day.uniqueCards));
    if(!values.some(day=>day.uniqueCards||day.activeMs||day.masteredAdded)){
      return '<div class="activity-empty">Aucune activité enregistrée sur cette période.<br>Les statistiques démarrent à partir de l’activation du suivi.</div>';
    }
    const compact=values.length>10;
    return `<div class="activity-chart" role="img" aria-label="Cartes différentes étudiées par jour">${values.map(day=>{
      const height=Math.max(day.uniqueCards?5:1,Math.round(day.uniqueCards/max*100));
      return `<div class="activity-column" title="${safe(dayLabel(day.key))} : ${day.uniqueCards} cartes différentes, ${day.masteredAdded} maîtrisées"><span class="activity-value">${day.uniqueCards||''}</span><div class="activity-bar-wrap"><div class="activity-bar ${day.masteredAdded?'mastered':''}" style="height:${height}%"></div></div><span class="activity-label">${safe(compact?day.key.slice(8):dayLabel(day.key,true))}</span></div>`;
    }).join('')}</div>`;
  }

  function renderHeatmap(metrics){
    if(metrics.daily.length<14)return '';
    return `<div class="heatmap" aria-label="Calendrier des jours actifs">${metrics.daily.map(day=>{
      const strength=day.uniqueCards>=Store.settings.dailyGoal?'strong':day.active?'active':'';
      return `<span class="heat-day ${strength}" title="${safe(dayLabel(day.key))} : ${day.uniqueCards} cartes">${day.key.slice(8)}</span>`;
    }).join('')}</div>`;
  }

  function renderDecks(){
    const progress=Store.getDeckProgress();
    const active=progress.filter(item=>!item.archived);
    const inProgress=active.filter(item=>item.percent>0&&item.percent<100).sort((a,b)=>b.percent-a.percent);
    const untouched=active.filter(item=>item.percent===0).sort((a,b)=>Date.parse(b.lastAt||0)-Date.parse(a.lastAt||0));
    const complete=active.filter(item=>item.percent===100);
    const rows=[...inProgress,...complete,...untouched].slice(0,12);
    if(!rows.length)return '<p class="learning-panel-sub">Aucun jeu disponible.</p>';
    return `<div class="deck-list">${rows.map(item=>`
      <article class="deck-progress-row" data-deck-id="${safe(item.id)}" tabindex="0" role="button" aria-label="Ouvrir ${safe(item.title)}">
        <div class="deck-progress-top"><span class="deck-progress-title">${safe(item.title)}</span><span class="deck-progress-count">${item.mastered} / ${item.total}</span></div>
        <div class="deck-progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${item.percent}"><span style="width:${item.percent}%"></span></div>
        <div class="deck-progress-meta"><span>${item.percent}% maîtrisé</span><span>${item.uniqueStudied} cartes étudiées</span></div>
      </article>`).join('')}</div>`;
  }

  function bindDeckRows(container){
    container.querySelectorAll('[data-deck-id]').forEach(row=>{
      const action=()=>window.openDeck(row.dataset.deckId);
      row.onclick=action;
      row.onkeydown=event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();action()}};
    });
  }

  function renderRewards(){
    const rewards=Store.rewards;
    const level=Store.rewardLevel();
    const badges=Object.values(rewards.badges||{});
    const today=Store.getMetrics('today');
    const every=Math.max(1,Store.settings.rewardCardsPerTicket);
    const remainder=today.uniqueCards%every;
    const remaining=remainder===0?every:every-remainder;
    const disabled=!Store.settings.casino||rewards.tickets<=0;
    return `<section class="learning-panel reward-panel"><h3>🎰 Machine du savoir</h3><p class="learning-panel-sub">Récompenses variables de style casino, sans argent ni perte de progression.</p><div class="reward-numbers"><div class="reward-number"><strong>${rewards.tickets}</strong><span>tickets</span></div><div class="reward-number"><strong>${rewards.sparks}</strong><span>éclats</span></div><div class="reward-number"><strong>${rewards.spins}</strong><span>tirages</span></div></div><button id="dashboardSpin" ${disabled?'disabled':''}>${!Store.settings.casino?'Récompenses désactivées':rewards.tickets>0?'🎰 Lancer un tirage':'Aucun ticket disponible'}</button><p class="reward-next">Niveau cosmétique : <strong>${safe(level.label)}</strong>. ${rewards.tickets>0?'Un ticket attend ton tirage.':`Prochain ticket dans ${remaining} nouvelle${remaining>1?'s':''} carte${remaining>1?'s':''}.`}</p><div class="badge-list">${badges.length?badges.slice(-8).map(badge=>`<span class="reward-badge">🏅 ${safe(badge.label)}</span>`).join(''):'<span class="reward-badge">Premier badge à débloquer</span>'}</div></section>`;
  }

  function renderMilestones(){
    const milestones=Object.values(Store.state.milestones||{}).sort((a,b)=>Date.parse(b.unlockedAt||0)-Date.parse(a.unlockedAt||0));
    if(!milestones.length)return '<p class="learning-panel-sub">Ton premier jalon apparaîtra après une session utile.</p>';
    return `<div class="milestone-list">${milestones.slice(0,8).map(item=>`<div class="milestone"><span class="milestone-icon">🏆</span><div><strong>${safe(item.label)}</strong><small>${new Date(item.unlockedAt).toLocaleDateString('fr-FR')}</small></div></div>`).join('')}</div>`;
  }

  function renderSettings(){
    const settings=Store.settings;
    return `<div class="learning-settings">
      <div class="learning-field"><label for="settingDailyGoal">Objectif quotidien — cartes différentes</label><input id="settingDailyGoal" type="number" min="1" max="200" value="${settings.dailyGoal}"></div>
      <div class="learning-field"><label for="settingWeeklyDays">Objectif de jours actifs sur 7</label><input id="settingWeeklyDays" type="number" min="1" max="7" value="${settings.weeklyDaysGoal}"></div>
      <div class="learning-field"><label for="settingActiveCards">Cartes requises pour qualifier un jour</label><input id="settingActiveCards" type="number" min="1" max="100" value="${settings.activeCardsThreshold}"></div>
      <div class="learning-field"><label for="settingActiveMinutes">Ou minutes actives requises</label><input id="settingActiveMinutes" type="number" min="1" max="120" value="${settings.activeMinutesThreshold}"></div>
      <label class="learning-check"><input id="settingSound" type="checkbox" ${settings.sound?'checked':''}> Sons de la machine</label>
      <label class="learning-check"><input id="settingMotion" type="checkbox" ${settings.motion?'checked':''}> Animations</label>
      <label class="learning-check"><input id="settingCasino" type="checkbox" ${settings.casino?'checked':''}> Récompenses casino</label>
      <div class="learning-check">Fiabilité fixe : fenêtre de 5 jours</div>
    </div><div class="settings-actions"><button id="saveLearningSettings">Enregistrer les réglages</button></div><p class="learning-note">Un jour est actif dès que l’un des deux seuils est atteint. La série reste vivante avec 20 % de fiabilité et ne revient à zéro qu’après cinq jours non qualifiés consécutifs.</p>`;
  }

  function render(){
    const view=ensureView();
    const content=view.querySelector('#learningDashboardContent');
    const metrics=Store.getMetrics(currentPeriod);
    const previous=periodComparison(currentPeriod,metrics);
    const today=Store.getMetrics('today');
    const reliability=Store.getReliability();
    const recommended=Store.getRecommendedDeck();
    const goal=Math.max(1,Store.settings.dailyGoal);
    const goalPercent=Math.min(100,Math.round(today.uniqueCards/goal*100));
    const rewards=Store.rewards;
    content.innerHTML=`
      <header class="learning-topbar"><div><h1>Mon apprentissage</h1><p>Effort réel, maîtrise, fiabilité et récompenses — historique local depuis ${new Date(Store.state.createdAt).toLocaleDateString('fr-FR')}.</p></div><button class="secondary" id="learningBack">← Accueil</button></header>
      <section class="learning-hero">
        <article class="learning-panel learning-reliability"><div class="reliability-ring" style="--score:${reliability.percent}" role="progressbar" aria-label="Fiabilité de la série" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${reliability.percent}"><div class="reliability-value"><strong>${reliability.percent}%</strong><span>fiabilité</span></div></div><div class="reliability-status">${safe(reliability.status)}</div><p class="reliability-copy">Série vivante depuis ${reliability.startDate?formatDate(reliability.startDate):'aucune date'} · ${reliability.streakDays} jour${reliability.streakDays>1?'s':''}. Elle ne casse qu’à 0 %.</p><div class="reliability-days">${reliabilityDays(reliability)}</div></article>
        <article class="learning-panel learning-summary"><h2>${safe(recommendedCopy(recommended))}</h2><p class="learning-summary-lead">La métrique centrale compte les cartes différentes dont tu as révélé la réponse, pas les clics répétés.</p><div class="learning-goal-row"><div><span>Objectif du jour</span><strong>${today.uniqueCards} / ${goal}</strong></div><span>${goalPercent}%</span></div><div class="learning-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${goalPercent}"><span style="width:${goalPercent}%"></span></div><div class="learning-quick-actions"><button id="learningResume">${recommended?'Reprendre le jeu':'Choisir un jeu'}</button><button class="secondary" id="learningExpress">Session express · 5 cartes</button>${Store.settings.casino&&rewards.tickets>0?`<button class="learning-casino-button" id="learningSpin">🎰 ${rewards.tickets} tirage${rewards.tickets>1?'s':''}</button>`:''}</div></article>
      </section>
      <nav class="learning-periods" aria-label="Période des statistiques">${Object.entries(PERIODS).map(([id,label])=>`<button data-period="${id}" class="${id===currentPeriod?'active':''}">${label}</button>`).join('')}</nav>
      <section class="learning-stats">
        ${statCard('Cartes différentes',metrics.uniqueCards,deltaText(metrics,previous,'uniqueCards'))}
        ${statCard('Réponses révélées',metrics.reveals,deltaText(metrics,previous,'reveals'))}
        ${statCard('Retournements',metrics.flips,deltaText(metrics,previous,'flips'))}
        ${statCard('Maîtrisées ajoutées',metrics.masteredAdded,deltaText(metrics,previous,'masteredAdded'))}
        ${statCard('Temps actif',formatDuration(metrics.activeMs),previous?`<small>${formatDuration(previous.activeMs)} sur la période précédente</small>`:'<small>Temps cumulé</small>')}
        ${statCard('Jours actifs',`${metrics.activeDays} / ${metrics.totalDays}`,`<small>${metrics.sessions} session${metrics.sessions>1?'s':''}</small>`)}
      </section>
      <section class="learning-grid">
        <article class="learning-panel"><h3>Activité quotidienne</h3><p class="learning-panel-sub">Barres : cartes différentes. Point doré : au moins une carte ajoutée à la maîtrise.</p>${renderChart(metrics)}${renderHeatmap(metrics)}</article>
        ${renderRewards()}
      </section>
      <section class="learning-grid">
        <article class="learning-panel"><h3>Progression par jeu</h3><p class="learning-panel-sub">La progression actuelle inclut les cartes marquées comme maîtrisées avant l’activation du suivi.</p><div id="learningDeckRows">${renderDecks()}</div></article>
        <article class="learning-panel"><h3>Jalons débloqués</h3><p class="learning-panel-sub">Les jalons récompensent une progression réelle et donnent parfois un ticket.</p>${renderMilestones()}</article>
      </section>
      <section class="learning-two-columns">
        <article class="learning-panel"><h3>Réglages de motivation</h3><p class="learning-panel-sub">Tu gardes le contrôle sur les seuils, les sons et les animations.</p>${renderSettings()}</article>
        <article class="learning-panel"><h3>Données et sauvegarde</h3><p class="learning-panel-sub">Le résumé est conservé localement et le journal détaillé dans IndexedDB quand le navigateur le permet.</p><div class="data-actions"><button id="exportLearning">Exporter JSON</button><button class="secondary" id="importLearning">Importer</button><button class="secondary" id="resetLearning">Effacer le suivi</button><input id="importLearningFile" type="file" accept="application/json,.json" hidden></div><p class="learning-note">L’effacement du suivi ne supprime ni tes jeux, ni les cartes déjà marquées comme maîtrisées, ni tes archives. Les données ne sont pas encore synchronisées entre appareils.</p></article>
      </section>`;

    content.querySelector('#learningBack').onclick=goHome;
    content.querySelector('#learningResume').onclick=()=>recommended?window.openDeck(recommended.id):goHome();
    content.querySelector('#learningExpress').onclick=()=>Tracker?.startExpress?.(recommended?.id||null,5);
    const spin=content.querySelector('#learningSpin');
    if(spin)spin.onclick=()=>Rewards?.open?.({autoSpin:false});
    const dashboardSpin=content.querySelector('#dashboardSpin');
    if(dashboardSpin)dashboardSpin.onclick=()=>Rewards?.open?.({autoSpin:false});

    content.querySelectorAll('[data-period]').forEach(button=>button.onclick=()=>{
      currentPeriod=button.dataset.period;
      render();
    });
    bindDeckRows(content);
    bindSettings(content);
    bindDataActions(content);
    renderHomeStrip();
    renderLiveChip();
  }

  function bindSettings(content){
    content.querySelector('#saveLearningSettings').onclick=()=>{
      const number=(id,min,max)=>Math.max(min,Math.min(max,Math.round(Number(content.querySelector(id).value)||min)));
      Store.updateSettings({
        dailyGoal:number('#settingDailyGoal',1,200),
        weeklyDaysGoal:number('#settingWeeklyDays',1,7),
        activeCardsThreshold:number('#settingActiveCards',1,100),
        activeMinutesThreshold:number('#settingActiveMinutes',1,120),
        sound:content.querySelector('#settingSound').checked,
        motion:content.querySelector('#settingMotion').checked,
        casino:content.querySelector('#settingCasino').checked
      });
      Rewards?.toast?.('Réglages enregistrés.');
      render();
    };
  }

  function bindDataActions(content){
    const fileInput=content.querySelector('#importLearningFile');
    content.querySelector('#exportLearning').onclick=async()=>{
      const payload=await Store.exportAll();
      const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
      const url=URL.createObjectURL(blob);
      const link=document.createElement('a');
      link.href=url;
      link.download=`flashcards-suivi-${Store.dateKey()}.json`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(()=>URL.revokeObjectURL(url),1000);
      Rewards?.toast?.('Export du suivi créé.');
    };
    content.querySelector('#importLearning').onclick=()=>fileInput.click();
    fileInput.onchange=async()=>{
      const file=fileInput.files?.[0];
      if(!file)return;
      try{
        const payload=JSON.parse(await file.text());
        if(!window.confirm('Remplacer le suivi actuel par ce fichier importé ?'))return;
        await Store.importAll(payload);
        Rewards?.toast?.('Suivi importé.');
        render();
      }catch(error){
        console.warn(error);
        Rewards?.toast?.('Import impossible : fichier invalide.',4200);
      }finally{fileInput.value=''}
    };
    content.querySelector('#resetLearning').onclick=async()=>{
      if(!window.confirm('Effacer tout l’historique, les tickets, éclats et jalons ? Les cartes maîtrisées et archives resteront intactes.'))return;
      await Store.resetLearningData({preserveSettings:true});
      Rewards?.toast?.('Historique de suivi effacé.');
      render();
    };
  }

  function open(){
    const view=ensureView();
    document.getElementById('homeView')?.classList.add('hidden');
    document.getElementById('studyView')?.classList.add('hidden');
    view.classList.remove('hidden');
    if(location.hash!=='#learning=dashboard')history.replaceState(null,'','#learning=dashboard');
    render();
    window.scrollTo({top:0,behavior:Store.settings.motion?'smooth':'auto'});
  }

  function hide(){
    const view=document.getElementById('learningView');
    if(view)view.classList.add('hidden');
  }

  function goHome(){
    hide();
    if(typeof baseGoHome==='function')baseGoHome();
    else{
      document.getElementById('homeView')?.classList.remove('hidden');
      document.getElementById('studyView')?.classList.add('hidden');
      location.hash='';
    }
    setTimeout(renderHomeStrip,0);
  }

  function wrapNavigation(){
    baseGoHome=window.goHome;
    baseOpenDeck=window.openDeck;
    baseOpenFolder=window.openFolder;
    if(typeof baseGoHome==='function'&&!baseGoHome.__learningDashboardWrapped){
      const wrapped=function(){hide();const result=baseGoHome.apply(this,arguments);setTimeout(renderHomeStrip,0);return result};
      wrapped.__learningDashboardWrapped=true;
      window.goHome=wrapped;
    }
    if(typeof baseOpenDeck==='function'&&!baseOpenDeck.__learningDashboardWrapped){
      const wrapped=function(){hide();const result=baseOpenDeck.apply(this,arguments);setTimeout(renderLiveChip,0);return result};
      wrapped.__learningDashboardWrapped=true;
      window.openDeck=wrapped;
    }
    if(typeof baseOpenFolder==='function'&&!baseOpenFolder.__learningDashboardWrapped){
      const wrapped=function(){hide();const result=baseOpenFolder.apply(this,arguments);setTimeout(renderHomeStrip,0);return result};
      wrapped.__learningDashboardWrapped=true;
      window.openFolder=wrapped;
    }
  }

  function scheduleRender(){
    clearTimeout(renderTimer);
    renderTimer=setTimeout(()=>{
      const view=document.getElementById('learningView');
      if(view&&!view.classList.contains('hidden'))render();
      else{renderHomeStrip();renderLiveChip()}
    },100);
  }

  function init(){
    addStyles();
    ensureView();
    ensureHomeStrip();
    ensureLiveChip();
    wrapNavigation();
    const grid=document.getElementById('homeGrid');
    if(grid)new MutationObserver(renderHomeStrip).observe(grid,{childList:true});
    window.addEventListener('fc:learning-updated',scheduleRender);
    window.addEventListener('fc:reward-spun',scheduleRender);
    window.addEventListener('hashchange',()=>{
      if(location.hash==='#learning=dashboard')open();
      else hide();
    });
    renderHomeStrip();
    renderLiveChip();
    if(location.hash==='#learning=dashboard')setTimeout(open,0);
  }

  window.LearningDashboard={open,close:goHome,render};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
