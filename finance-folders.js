(()=>{
  const D=window.FC_DATA;
  const folders=[{"id":"finance-investissement","parent":null,"label":"Finance & investissement","desc":"Construire un portefeuille robuste, comprendre les enveloppes et appliquer des principes d’investisseurs de long terme."},{"id":"finance-enveloppes","parent":"finance-investissement","label":"PEA, PEA-PME & CTO","desc":"Fiscalité, éligibilité, arbitrages et organisation des enveloppes françaises."},{"id":"finance-buffett","parent":"finance-investissement","label":"Buffett & Berkshire","desc":"Entreprises de qualité, valeur intrinsèque, allocation du capital et patience."},{"id":"finance-munger","parent":"finance-investissement","label":"Charlie Munger","desc":"Modèles mentaux, psychologie, inversion, incitations et rationalité."},{"id":"finance-risque-cycles","parent":"finance-investissement","label":"Risque & cycles","desc":"Marge de sécurité, prix contre valeur, cycles et contrôle du risque."},{"id":"finance-charles-gave","parent":"finance-investissement","label":"Charles Gave — macro","desc":"Monnaie, inflation, actifs réels, régimes économiques et diversification."},{"id":"finance-portefeuille","parent":"finance-investissement","label":"Construction du portefeuille","desc":"Processus, allocation, taille des positions, rééquilibrage et discipline."}];
  folders.forEach(f=>{
    if(!D.folders.some(x=>x.id===f.id))D.folders.push(f);
    try{if(typeof FOLDERS!=='undefined'&&!FOLDERS.some(x=>x.id===f.id))FOLDERS.push(f)}catch(_error){}
  });
  if(!document.getElementById('finance-line-breaks')){
    const style=document.createElement('style');
    style.id='finance-line-breaks';
    style.textContent='.question,.answer{white-space:pre-line;}';
    document.head.appendChild(style);
  }
  try{if(typeof renderHome==='function')renderHome()}catch(_error){}
})();
