(()=>{
  const D=window.FC_DATA;
  const folders=[
    {id:'rhetorique',parent:'livre',label:'Rhétorique',desc:'Comprendre, analyser et construire des discours persuasifs avec méthode et éthique.'}
  ];
  folders.forEach(f=>{
    if(!D.folders.some(x=>x.id===f.id))D.folders.push(f);
    try{if(typeof FOLDERS!=='undefined'&&!FOLDERS.some(x=>x.id===f.id))FOLDERS.push(f)}catch(_error){}
  });
  if(!document.getElementById('rhetorique-line-breaks')){
    const style=document.createElement('style');
    style.id='rhetorique-line-breaks';
    style.textContent='.question,.answer{white-space:pre-line;}';
    document.head.appendChild(style);
  }
  try{if(typeof renderHome==='function')renderHome()}catch(_error){}
})();
