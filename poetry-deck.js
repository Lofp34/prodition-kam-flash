(()=>{
  if(window.__poetryDeckLoaded)return;
  window.__poetryDeckLoaded=true;
  const D=window.FC_DATA;
  const folder={id:'poesie',parent:'livre',label:'Poésie',desc:'Apprendre les poèmes progressivement, bloc après bloc.'};
  if(!D.folders.some(f=>f.id===folder.id))D.folders.push(folder);
  try{if(typeof FOLDERS!=='undefined'&&!FOLDERS.some(f=>f.id===folder.id))FOLDERS.push(folder)}catch(_error){}

  const raw={
    id:'bukowski-so-you-want-to-be-a-writer',
    folder:'poesie',
    badge:'Poésie',
    title:'Charles Bukowski — so you want to be a writer?',
    subtitle:'22 petits blocs quotidiens : anglais au recto, traduction française au verso.',
    description:'Apprendre naturellement le poème, un fragment à la fois, avec sa traduction française.',
    phrases:[
      'Apprends un seul bloc nouveau par jour.',
      'Récite toujours les trois blocs précédents avant d’ajouter le suivant.',
      'Lis d’abord l’anglais à voix haute, puis retourne la carte pour vérifier le sens.',
      'Quand toutes les cartes sont maîtrisées, enchaîne-les sans interruption.'
    ],
    cards:[
      ['L’élan',`so you want to be a writer?\nif it doesn’t come bursting out of you\nin spite of everything,\ndon’t do it.`,`alors, tu veux être écrivain ?\nsi ça ne jaillit pas de toi\nmalgré tout,\nne le fais pas.`],
      ['L’élan',`unless it comes unasked out of your\nheart and your mind and your mouth\nand your gut,\ndon’t do it.`,`à moins que ça ne sorte spontanément de ton\ncœur, de ton esprit, de ta bouche\net de tes tripes,\nne le fais pas.`],
      ['L’élan',`if you have to sit for hours\nstaring at your computer screen`,`si tu dois rester assis pendant des heures\nà fixer l’écran de ton ordinateur`],
      ['L’élan',`or hunched over your\ntypewriter\nsearching for words,\ndon’t do it.`,`ou courbé au-dessus de ta\nmachine à écrire,\nà chercher tes mots,\nne le fais pas.`],
      ['L’élan',`if you’re doing it for money or\nfame,\ndon’t do it.`,`si tu le fais pour l’argent ou\nla gloire,\nne le fais pas.`],
      ['L’élan',`if you’re doing it because you want\nwomen in your bed,\ndon’t do it.`,`si tu le fais parce que tu veux\ndes femmes dans ton lit,\nne le fais pas.`],
      ['L’élan',`if you have to sit there and\nrewrite it again and again,\ndon’t do it.`,`si tu dois rester là\nà le réécrire encore et encore,\nne le fais pas.`],
      ['L’élan',`if it’s hard work just thinking about doing it,\ndon’t do it.`,`si le simple fait d’y penser\nest déjà un travail pénible,\nne le fais pas.`],
      ['L’élan',`if you’re trying to write like somebody\nelse,\nforget about it.`,`si tu essaies d’écrire comme quelqu’un\nd’autre,\noublie ça.`],
      ['L’attente',`if you have to wait for it to roar out of\nyou,\nthen wait patiently.`,`si tu dois attendre que ça rugisse et sorte de\ntoi,\nalors attends patiemment.`],
      ['L’attente',`if it never does roar out of you,\ndo something else.`,`si ça ne rugit jamais hors de toi,\nfais autre chose.`],
      ['L’attente',`if you first have to read it to your wife\nor your girlfriend or your boyfriend\nor your parents or to anybody at all,\nyou’re not ready.`,`si tu dois d’abord le lire à ta femme,\nà ta petite amie ou à ton petit ami,\nà tes parents ou à qui que ce soit,\ntu n’es pas prêt.`],
      ['Les faux écrivains',`don’t be like so many writers,\ndon’t be like so many thousands of\npeople who call themselves writers,`,`ne sois pas comme tant d’écrivains,\nne sois pas comme ces milliers de\npersonnes qui se disent écrivains,`],
      ['Les faux écrivains',`don’t be dull and boring and\npretentious, don’t be consumed with self-\nlove.`,`ne sois ni terne, ni ennuyeux, ni\nprétentieux ; ne te laisse pas consumer par\nl’amour de toi-même.`],
      ['Les faux écrivains',`the libraries of the world have\nyawned themselves to\nsleep\nover your kind.`,`les bibliothèques du monde\nont bâillé jusqu’à\ns’endormir\nà cause de gens comme toi.`],
      ['Les faux écrivains',`don’t add to that.\ndon’t do it.`,`n’ajoute rien à cela.\nne le fais pas.`],
      ['La nécessité intérieure',`unless it comes out of\nyour soul like a rocket,`,`à moins que ça ne jaillisse de\nton âme comme une fusée,`],
      ['La nécessité intérieure',`unless being still would\ndrive you to madness or\nsuicide or murder,\ndon’t do it.`,`à moins que rester sans écrire\nne te pousse à la folie, au\nsuicide ou au meurtre,\nne le fais pas.`],
      ['La nécessité intérieure',`unless the sun inside you is\nburning your gut,\ndon’t do it.`,`à moins que le soleil en toi\nne te brûle les tripes,\nne le fais pas.`],
      ['Le moment venu',`when it is truly time,\nand if you have been chosen,\nit will do it by\nitself`,`quand le moment sera vraiment venu,\net si tu as été choisi,\nça se fera\ntout seul`],
      ['Le moment venu',`and it will keep on doing it\nuntil you die or it dies in you.`,`et ça continuera\njusqu’à ce que tu meures ou que ça meure en toi.`],
      ['Le moment venu',`there is no other way.\n\nand there never was.`,`il n’existe pas d’autre voie.\n\net il n’y en a jamais eu.`]
    ]
  };

  D.decks=D.decks.filter(d=>d.id!==raw.id);
  D.decks.push(raw);
  try{
    if(typeof DECKS!=='undefined'){
      const normalized={...raw,cards:raw.cards.map(c=>({category:c[0],front:c[1],back:c[2]}))};
      const existing=DECKS.findIndex(d=>d.id===raw.id);
      if(existing>=0)DECKS.splice(existing,1,normalized);else DECKS.push(normalized);
    }
  }catch(_error){}

  if(!document.getElementById('poetry-line-breaks')){
    const style=document.createElement('style');
    style.id='poetry-line-breaks';
    style.textContent='.question,.answer{white-space:pre-line;}';
    document.head.appendChild(style);
  }
  try{if(typeof renderHome==='function')renderHome()}catch(_error){}
  const directId=decodeURIComponent((location.hash.match(/deck=([^&]+)/)||[])[1]||'');
  if(directId===raw.id&&typeof window.openDeck==='function')setTimeout(()=>window.openDeck(raw.id),0);
})();
