(()=>{
  if(window.__learningDashboardResponsiveLoaded)return;
  window.__learningDashboardResponsiveLoaded=true;

  const COMPACT_WIDTH=900;
  const ZOOM_THRESHOLD=1.08;

  function addStyles(){
    if(document.getElementById('learning-dashboard-responsive-styles'))return;
    const style=document.createElement('style');
    style.id='learning-dashboard-responsive-styles';
    style.textContent=`
      #learningView{max-width:100%;overflow-x:hidden}
      #learningView .learning-shell{width:min(1120px,calc(100% - clamp(12px,2vw,24px)));max-width:100%;margin-inline:auto}
      #learningView .learning-shell,
      #learningView .learning-topbar,
      #learningView .learning-topbar>div,
      #learningView .learning-hero,
      #learningView .learning-grid,
      #learningView .learning-two-columns,
      #learningView .learning-stats,
      #learningView .learning-panel,
      #learningView .learning-stat-card,
      #learningView .learning-settings,
      #learningView .learning-field,
      #learningView .deck-progress-row{min-width:0;max-width:100%}
      #learningView :where(h1,h2,h3,p,strong,small,span,label,button){overflow-wrap:anywhere}
      #learningView .learning-topbar{flex-wrap:wrap;align-items:flex-start}
      #learningView .learning-topbar>div{flex:1 1 320px}
      #learningView .learning-topbar>button{flex:0 1 auto;max-width:100%;white-space:normal}
      #learningView .learning-panel{padding:clamp(15px,2.2vw,22px)}
      #learningView .learning-hero{grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr))}
      #learningView .learning-stats{grid-template-columns:repeat(auto-fit,minmax(min(100%,150px),1fr))}
      #learningView .learning-grid{grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))}
      #learningView .learning-two-columns{grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))}
      #learningView .learning-settings{grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))}
      #learningView .reliability-ring{width:clamp(132px,18vw,178px);height:clamp(132px,18vw,178px)}
      #learningView .reliability-value strong{font-size:clamp(38px,6vw,48px)}
      #learningView .learning-periods{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,120px),1fr));width:100%}
      #learningView .learning-periods button{width:100%;min-width:0;white-space:normal}
      #learningView .learning-quick-actions,
      #learningView .settings-actions,
      #learningView .data-actions{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,150px),1fr));align-items:stretch}
      #learningView .learning-quick-actions button,
      #learningView .settings-actions button,
      #learningView .data-actions button{width:100%;min-width:0;white-space:normal}
      #learningView .reward-numbers{grid-template-columns:repeat(auto-fit,minmax(70px,1fr))}
      #learningView .deck-progress-top,
      #learningView .deck-progress-meta{flex-wrap:wrap;align-items:flex-start}
      #learningView .deck-progress-count{white-space:normal;text-align:right}
      #learningView .activity-chart{width:100%;max-width:100%;overflow-x:auto;overflow-y:hidden;justify-content:flex-start;scroll-snap-type:x proximity;scrollbar-gutter:stable;padding-bottom:10px;-webkit-overflow-scrolling:touch;overscroll-behavior-inline:contain}
      #learningView .activity-column{flex:1 0 clamp(30px,4.5vw,48px);scroll-snap-align:start}
      #learningView .activity-bar-wrap{min-width:24px}
      #learningView .activity-label{max-width:52px;white-space:normal;text-align:center;line-height:1.15}
      #learningView .heatmap{grid-template-columns:repeat(auto-fit,minmax(26px,1fr))}
      #learningView .learning-stat-card strong{font-size:clamp(22px,3vw,34px)}
      #learningView .learning-goal-row{flex-wrap:wrap;align-items:flex-end}
      #learningView .learning-goal-row>div{min-width:0}
      #learningView .learning-note{max-width:75ch}

      #learningView.learning-compact .learning-hero,
      #learningView.learning-compact .learning-grid,
      #learningView.learning-compact .learning-two-columns,
      #learningView.learning-compact .learning-settings{grid-template-columns:1fr}
      #learningView.learning-compact .learning-stats{grid-template-columns:repeat(2,minmax(0,1fr))}
      #learningView.learning-compact .learning-topbar>button{width:100%}
      #learningView.learning-compact .learning-periods{grid-template-columns:repeat(2,minmax(0,1fr))}
      #learningView.learning-compact .learning-quick-actions,
      #learningView.learning-compact .settings-actions,
      #learningView.learning-compact .data-actions{grid-template-columns:1fr}
      #learningView.learning-compact .activity-chart{height:215px}
      #learningView.learning-compact .reliability-days{flex-wrap:wrap}

      .slot-overlay{overflow:auto;align-items:safe center;justify-items:center}
      .slot-machine{max-width:100%;max-height:calc(100dvh - 24px);overflow:auto;overscroll-behavior:contain}

      @media(max-width:560px){
        #learningView .learning-shell{width:calc(100% - 12px)}
        #learningView .learning-panel{padding:14px;border-radius:20px}
        #learningView .learning-stats{grid-template-columns:1fr 1fr;gap:8px}
        #learningView .learning-stat-card{padding:12px}
        #learningView .learning-periods{grid-template-columns:1fr 1fr;gap:6px}
        #learningView .learning-topbar h1{font-size:clamp(28px,10vw,40px)}
        #learningView .learning-summary h2{font-size:clamp(23px,8vw,32px)}
        #learningView .activity-column{flex-basis:34px}
        #learningView .heatmap{grid-template-columns:repeat(7,minmax(24px,1fr))}
        .slot-overlay{padding:6px;place-items:start center}
        .slot-machine{width:100%;max-height:calc(100dvh - 12px);border-radius:20px;padding:18px 14px}
      }
      @media(max-width:360px){
        #learningView .learning-stats{grid-template-columns:1fr}
        #learningView .learning-periods{grid-template-columns:1fr}
        #learningView .reliability-day{width:28px;height:28px}
      }
      @media(prefers-reduced-motion:reduce){
        #learningView .activity-chart{scroll-behavior:auto}
      }
    `;
    document.head.appendChild(style);
  }

  function syncViewport(){
    const view=document.getElementById('learningView');
    if(!view)return;
    const viewport=window.visualViewport;
    const visibleWidth=viewport?.width||window.innerWidth||document.documentElement.clientWidth;
    const zoomed=Boolean(viewport&&viewport.scale>ZOOM_THRESHOLD);
    view.classList.toggle('learning-visual-zoom',zoomed);
    view.classList.toggle('learning-compact',zoomed||visibleWidth<COMPACT_WIDTH);
    view.dataset.viewportWidth=String(Math.round(visibleWidth));
    view.dataset.viewportScale=String(Number(viewport?.scale||1).toFixed(2));
  }

  function start(){
    addStyles();
    syncViewport();
    window.addEventListener('resize',syncViewport,{passive:true});
    window.visualViewport?.addEventListener('resize',syncViewport,{passive:true});
    window.visualViewport?.addEventListener('scroll',syncViewport,{passive:true});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
