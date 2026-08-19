(()=>{
  if(window.__learningRewardsLoaded)return;
  window.__learningRewardsLoaded=true;
  const Store=window.LearningStore;
  if(!Store)return;

  const ICONS=['🧠','📚','⚡','🍀','⭐','💎','🎓'];
  const TIERS=[
    {tier:'common',weight:54,label:'Gain de concentration',sparks:10,reels:['📚','🧠','⚡'],message:'Un petit gain régulier. La connaissance se capitalise.'},
    {tier:'uncommon',weight:28,label:'Trèfle studieux',sparks:25,reels:['🍀','📚','🍀'],message:'Belle pioche : ton effort du jour prend de la valeur.'},
    {tier:'rare',weight:12,label:'Étoile du savoir',sparks:60,reels:['⭐','⭐','📚'],message:'Récompense rare débloquée.',badgeId:'star-scholar',badgeLabel:'Étoile du savoir'},
    {tier:'epic',weight:5,label:'Coffre épique',sparks:120,reels:['💎','💎','⭐'],message:'Énorme tirage : ton niveau cosmétique bondit.',badgeId:'epic-chest',badgeLabel:'Coffre épique'},
    {tier:'jackpot',weight:1,label:'JACKPOT DU SAVOIR',sparks:300,reels:['💎','💎','💎'],message:'Jackpot ! Une récompense virtuelle très rare.',badgeId:'knowledge-jackpot',badgeLabel:'Jackpot du savoir'}
  ];

  let toastTimer=null;
  let spinning=false;
  let audioContext=null;

  function secureRandom(){
    try{
      const values=new Uint32Array(1);
      crypto.getRandomValues(values);
      return values[0]/4294967296;
    }catch(_error){return Math.random()}
  }

  function pickTier(){
    const total=TIERS.reduce((sum,item)=>sum+item.weight,0);
    let cursor=secureRandom()*total;
    for(const item of TIERS){
      cursor-=item.weight;
      if(cursor<0)return {...item};
    }
    return {...TIERS[0]};
  }

  function motionAllowed(){
    if(!Store.settings.motion)return false;
    return !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  }

  function soundAllowed(){return Boolean(Store.settings.sound)}

  function getAudioContext(){
    if(!soundAllowed())return null;
    try{
      audioContext=audioContext||new (window.AudioContext||window.webkitAudioContext)();
      if(audioContext.state==='suspended')audioContext.resume();
      return audioContext;
    }catch(_error){return null}
  }

  function tone(frequency,duration=0.08,delay=0,gainValue=0.045,type='sine'){
    const context=getAudioContext();
    if(!context)return;
    const oscillator=context.createOscillator();
    const gain=context.createGain();
    oscillator.type=type;
    oscillator.frequency.value=frequency;
    gain.gain.setValueAtTime(0.0001,context.currentTime+delay);
    gain.gain.exponentialRampToValueAtTime(gainValue,context.currentTime+delay+0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001,context.currentTime+delay+duration);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(context.currentTime+delay);
    oscillator.stop(context.currentTime+delay+duration+0.02);
  }

  function playTick(index=0){tone(420+(index%5)*55,0.055,0,0.025,'square')}

  function playPrize(tier){
    if(tier==='jackpot'){
      [523,659,784,1047].forEach((frequency,index)=>tone(frequency,0.45,index*0.09,0.055,'triangle'));
    }else if(tier==='epic'){
      [440,554,659].forEach((frequency,index)=>tone(frequency,0.28,index*0.08,0.045,'triangle'));
    }else if(tier==='rare'){
      [440,660].forEach((frequency,index)=>tone(frequency,0.22,index*0.08,0.04,'sine'));
    }else tone(520,0.15,0,0.035,'sine');
  }

  function addStyles(){
    if(document.getElementById('learning-reward-styles'))return;
    const style=document.createElement('style');
    style.id='learning-reward-styles';
    style.textContent=`
      .learning-reward-fab{position:fixed;right:14px;bottom:18px;z-index:24;display:flex;align-items:center;gap:8px;min-height:48px;padding:10px 14px;border-radius:999px;border:1px solid rgba(255,255,255,.42);background:linear-gradient(135deg,#2d153f,#7b1fa2 58%,#d78b00);color:#fff;box-shadow:0 14px 38px rgba(68,20,91,.34);font-weight:900;letter-spacing:.01em}
      .learning-reward-fab[hidden]{display:none}.learning-reward-fab.pulse{animation:reward-pulse .75s ease 2}
      .learning-reward-count{display:grid;place-items:center;min-width:23px;height:23px;padding:0 6px;border-radius:999px;background:#ffe173;color:#362000;font-size:12px}
      .learning-toast{position:fixed;left:50%;bottom:82px;z-index:45;max-width:min(560px,calc(100% - 26px));padding:13px 17px;border-radius:16px;background:#1d1226;color:#fff;font-weight:850;box-shadow:0 18px 48px rgba(0,0,0,.26);opacity:0;transform:translate(-50%,14px);pointer-events:none;transition:opacity .2s,transform .2s}.learning-toast.visible{opacity:1;transform:translate(-50%,0)}
      .slot-overlay{position:fixed;inset:0;z-index:60;display:grid;place-items:center;padding:18px;background:rgba(10,5,14,.72);backdrop-filter:blur(10px)}.slot-overlay[hidden]{display:none}
      .slot-machine{width:min(620px,100%);border:1px solid rgba(255,255,255,.28);border-radius:30px;padding:clamp(20px,4vw,34px);background:radial-gradient(circle at 50% -20%,rgba(255,220,100,.35),transparent 38%),linear-gradient(145deg,#24102f,#54186c 55%,#2b102f);color:#fff;box-shadow:0 30px 100px rgba(0,0,0,.5);text-align:center;position:relative;overflow:hidden}
      .slot-machine:before{content:'';position:absolute;inset:7px;border:2px dashed rgba(255,222,116,.42);border-radius:24px;pointer-events:none}.slot-kicker{font-size:12px;font-weight:950;letter-spacing:.13em;text-transform:uppercase;color:#ffe88d}.slot-machine h2{font-size:clamp(29px,6vw,48px);line-height:1;margin:10px 0 8px;letter-spacing:-.04em}.slot-subtitle{margin:0 auto 20px;max-width:480px;color:rgba(255,255,255,.76);line-height:1.45}
      .slot-reels{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:20px auto;width:min(420px,100%)}.slot-reel{display:grid;place-items:center;aspect-ratio:1/1;border-radius:22px;background:linear-gradient(#fff7d4,#fff);color:#28102f;font-size:clamp(46px,12vw,76px);box-shadow:inset 0 0 0 4px #d9a91b,0 8px 20px rgba(0,0,0,.25);overflow:hidden}.slot-reel.spinning{filter:blur(.7px);transform:translateY(-2px)}
      .slot-result{min-height:92px;padding:14px 12px;border-radius:18px;background:rgba(255,255,255,.09)}.slot-result strong{display:block;font-size:clamp(21px,4vw,30px);color:#ffe789}.slot-result p{margin:7px 0 0;color:rgba(255,255,255,.82);line-height:1.4}.slot-result.jackpot strong{animation:jackpot-glow .65s ease infinite alternate}
      .slot-actions{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-top:18px}.slot-actions button{min-width:150px;background:#ffe173;color:#30143c}.slot-actions button.secondary{background:rgba(255,255,255,.1);color:#fff;border-color:rgba(255,255,255,.3)}.slot-actions button:disabled{opacity:.45;cursor:not-allowed}
      .slot-odds{margin-top:17px;text-align:left;color:rgba(255,255,255,.7);font-size:12px}.slot-odds summary{cursor:pointer;text-align:center;font-weight:800}.slot-odds p{margin:8px 0 0;line-height:1.5}.slot-close{position:absolute;right:14px;top:13px;z-index:2;width:40px;height:40px;padding:0;border-radius:50%;background:rgba(255,255,255,.12);color:#fff}
      @keyframes reward-pulse{50%{transform:scale(1.08);box-shadow:0 0 0 12px rgba(255,208,56,.17),0 16px 42px rgba(68,20,91,.42)}}@keyframes jackpot-glow{from{text-shadow:0 0 8px rgba(255,230,100,.35)}to{text-shadow:0 0 24px #fff19b,0 0 42px #ff9d00}}
      @media(max-width:700px){.learning-reward-fab{bottom:82px;right:10px}.slot-machine{border-radius:24px}.slot-reels{gap:7px}.slot-actions button{width:100%}}
      @media(prefers-reduced-motion:reduce){.learning-reward-fab,.learning-toast,.slot-reel,.slot-result strong{animation:none!important;transition:none!important}}
    `;
    document.head.appendChild(style);
  }

  function ensureToast(){
    let toast=document.getElementById('learningToast');
    if(toast)return toast;
    toast=document.createElement('div');
    toast.id='learningToast';
    toast.className='learning-toast';
    toast.setAttribute('role','status');
    toast.setAttribute('aria-live','polite');
    document.body.appendChild(toast);
    return toast;
  }

  function toast(message,duration=2800){
    const element=ensureToast();
    element.textContent=message;
    element.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer=setTimeout(()=>element.classList.remove('visible'),duration);
  }

  function oddsText(){return TIERS.map(item=>`${item.label} : ${item.weight} %`).join(' · ')}

  function ensureModal(){
    let overlay=document.getElementById('learningSlotOverlay');
    if(overlay)return overlay;
    overlay=document.createElement('div');
    overlay.id='learningSlotOverlay';
    overlay.className='slot-overlay';
    overlay.hidden=true;
    overlay.innerHTML=`
      <section class="slot-machine" role="dialog" aria-modal="true" aria-labelledby="slotTitle">
        <button class="slot-close" id="slotClose" aria-label="Fermer">×</button>
        <div class="slot-kicker">Récompense variable · aucune valeur monétaire</div>
        <h2 id="slotTitle">Machine du savoir</h2>
        <p class="slot-subtitle">Les tickets se gagnent avec des cartes différentes étudiées, jamais en répétant mécaniquement le même clic.</p>
        <div class="slot-reels" aria-label="Rouleaux de la machine">
          <div class="slot-reel" id="slotReel1">🧠</div><div class="slot-reel" id="slotReel2">📚</div><div class="slot-reel" id="slotReel3">⚡</div>
        </div>
        <div class="slot-result" id="slotResult" aria-live="polite"><strong>Prêt à tenter ta chance ?</strong><p>Chaque tirage consomme un ticket virtuel.</p></div>
        <div class="slot-actions"><button id="slotSpin">🎰 Tirer</button><button class="secondary" id="slotDashboard">Voir ma progression</button></div>
        <details class="slot-odds"><summary>Probabilités et règles</summary><p>${oddsText()}. Les gains sont uniquement des éclats et badges cosmétiques. Aucun achat, aucune mise d’argent et aucune perte de progression.</p></details>
      </section>`;
    document.body.appendChild(overlay);
    overlay.addEventListener('click',event=>{if(event.target===overlay)close()});
    overlay.querySelector('#slotClose').onclick=close;
    overlay.querySelector('#slotSpin').onclick=spin;
    overlay.querySelector('#slotDashboard').onclick=()=>{
      close();
      window.LearningDashboard?.open?.();
    };
    document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!overlay.hidden)close()});
    return overlay;
  }

  function ensureFab(){
    let button=document.getElementById('learningRewardFab');
    if(button)return button;
    button=document.createElement('button');
    button.id='learningRewardFab';
    button.className='learning-reward-fab';
    button.innerHTML='<span>🎰 Récompense</span><span class="learning-reward-count">0</span>';
    button.onclick=()=>open({autoSpin:false});
    document.body.appendChild(button);
    return button;
  }

  function refreshFab(pulse=false){
    const button=ensureFab();
    const tickets=Store.rewards.tickets;
    button.hidden=!Store.settings.casino||tickets<=0;
    button.querySelector('.learning-reward-count').textContent=String(tickets);
    button.setAttribute('aria-label',`${tickets} ticket${tickets>1?'s':''} de récompense disponible${tickets>1?'s':''}`);
    if(pulse){
      button.classList.remove('pulse');
      void button.offsetWidth;
      button.classList.add('pulse');
    }
  }

  function open({autoSpin=false}={}){
    if(!Store.settings.casino){toast('Les récompenses casino sont désactivées dans les réglages.');return}
    const overlay=ensureModal();
    overlay.hidden=false;
    document.body.style.overflow='hidden';
    updateModal();
    setTimeout(()=>overlay.querySelector('#slotSpin')?.focus(),0);
    if(autoSpin&&Store.rewards.tickets>0)spin();
  }

  function close(){
    const overlay=document.getElementById('learningSlotOverlay');
    if(overlay)overlay.hidden=true;
    document.body.style.overflow='';
  }

  function updateModal(){
    const overlay=ensureModal();
    const rewards=Store.rewards;
    const spinButton=overlay.querySelector('#slotSpin');
    spinButton.disabled=spinning||rewards.tickets<=0;
    spinButton.textContent=rewards.tickets>0?`🎰 Tirer · ${rewards.tickets} ticket${rewards.tickets>1?'s':''}`:'Plus de ticket';
  }

  function randomIcon(){return ICONS[Math.floor(secureRandom()*ICONS.length)]}

  async function animateReels(prize){
    const overlay=ensureModal();
    const reels=[1,2,3].map(index=>overlay.querySelector(`#slotReel${index}`));
    const result=overlay.querySelector('#slotResult');
    result.className='slot-result';
    result.innerHTML='<strong>Les rouleaux tournent…</strong><p>Le résultat est déjà déterminé par les probabilités affichées.</p>';
    if(!motionAllowed()){
      reels.forEach((reel,index)=>reel.textContent=prize.reels[index]);
      return;
    }
    const start=performance.now();
    let tick=0;
    await new Promise(resolve=>{
      const timer=setInterval(()=>{
        tick+=1;
        reels.forEach((reel,index)=>{
          reel.classList.add('spinning');
          reel.textContent=randomIcon();
          if(tick%3===index)playTick(tick+index);
        });
        if(performance.now()-start>=1550){
          clearInterval(timer);
          reels.forEach((reel,index)=>{
            setTimeout(()=>{
              reel.textContent=prize.reels[index];
              reel.classList.remove('spinning');
              playTick(index+8);
              if(index===2)resolve();
            },index*180);
          });
        }
      },85);
    });
  }

  async function spin(){
    if(spinning)return null;
    if(Store.rewards.tickets<=0){toast('Il faut un ticket : étudie 5 nouvelles cartes pour en gagner un.');updateModal();return null}
    if(!Store.consumeTicket())return null;
    spinning=true;
    updateModal();
    const prize=pickTier();
    Store.grantPrize(prize);
    try{
      await animateReels(prize);
      const result=ensureModal().querySelector('#slotResult');
      result.className=`slot-result ${prize.tier}`;
      result.innerHTML=`<strong>${prize.tier==='jackpot'?'🎉 ':''}${prize.label} · +${prize.sparks} éclats</strong><p>${prize.message}</p>`;
      playPrize(prize.tier);
      window.dispatchEvent(new CustomEvent('fc:reward-spun',{detail:prize}));
    }finally{
      spinning=false;
      refreshFab();
      updateModal();
    }
    return prize;
  }

  function init(){
    addStyles();
    ensureToast();
    ensureFab();
    ensureModal();
    refreshFab();

    window.addEventListener('fc:reward-earned',event=>{
      const count=event.detail?.count||1;
      refreshFab(true);
      toast(`🎟️ ${count} ticket${count>1?'s':''} gagné${count>1?'s':''} — la machine du savoir t’attend.`);
    });
    window.addEventListener('fc:milestone',event=>{
      refreshFab(true);
      toast(`🏆 Jalon débloqué : ${event.detail?.label||'nouvelle étape'}.`);
    });
    window.addEventListener('fc:learning-storage-error',event=>toast(event.detail?.message||'Erreur de stockage.',4200));
    window.addEventListener('fc:learning-updated',()=>refreshFab());
  }

  window.LearningRewards={open,close,spin,toast,refresh:refreshFab,tiers:TIERS.map(item=>({...item})),oddsText};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
