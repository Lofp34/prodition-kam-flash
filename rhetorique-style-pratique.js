(()=>{
  const D=window.FC_DATA;
  const raw={
    id:'rhetorique-style-pratique',
    folder:'rhetorique',
    badge:'Rhétorique',
    title:'Rhétorique — 03. Style, discours & pratique orale',
    subtitle:'45 cartes pour donner une forme mémorable aux idées, structurer un discours et progresser à l’oral.',
    description:'Figures utiles, architecture classique, mémoire, voix, gestes et exercices de mise en pratique.',
    phrases:[
      'Une figure est réussie lorsqu’elle sert une fonction précise.',
      'La clarté est une vertu rhétorique, pas un manque de sophistication.',
      'La conclusion doit faire sentir pourquoi le discours compte maintenant.',
      'La progression vient de cycles courts : préparer, prononcer, observer, corriger.'
    ],
    cards:[
      ['Sources','Quelles ressources garder pour approfondir le style et la pratique oratoire ?','Silva Rhetoricae — style :\nhttps://rhetoric.byu.edu/Canons/Style.htm\n\nFigures et groupements :\nhttps://rhetoric.byu.edu/Figures/Figures-Groupings.htm\n\nRhetorica ad Herennium, livre IV :\nhttps://rhetoric.byu.edu/Primary%20Texts/Ad%20Herennium-Book4.htm\n\nDisposition classique :\nhttps://rhetoric.byu.edu/Canons/Arrangement.htm\n\nMémoire :\nhttps://rhetoric.byu.edu/Canons/Memory.htm\n\nAction oratoire :\nhttps://rhetoric.byu.edu/Canons/Delivery.htm\n\nAristote, Rhétorique, livre III :\nhttps://classics.mit.edu/Aristotle/rhetoric.3.iii.html'],
      ['Style','Quel est le rôle rhétorique du style ?','Donner aux idées une forme adaptée à l’auditoire et à l’intention. Le style agit sur la compréhension, le rythme, l’émotion, la crédibilité et la mémoire ; il n’est donc pas un simple vernis ajouté après coup.'],
      ['Niveaux de style','Quels sont les trois niveaux de style traditionnellement distingués ?','Le style simple vise surtout la clarté et l’explication ; le moyen cherche l’agrément et l’adhésion ; le grand style mobilise énergie et émotion. Un bon orateur peut passer de l’un à l’autre selon le moment.'],
      ['Vertus','Quelles vertus générales doit viser le style ?','Correction, clarté, convenance et efficacité expressive. L’ornement n’est utile que s’il renforce le sens, le mouvement ou la mémorisation sans brouiller le message.'],
      ['Clarté','Comment améliorer immédiatement la clarté ?','Une idée principale par unité, verbes concrets, sujets identifiables, termes définis, exemples après les abstractions et transitions explicites. Supprimer les mots qui ne changent ni le sens ni l’effet.'],
      ['Correction','Pourquoi la correction linguistique a-t-elle une fonction rhétorique ?','Elle réduit les frictions de lecture et protège l’ethos. Une faute isolée n’annule pas une idée, mais des erreurs répétées peuvent détourner l’attention ou faire douter du soin apporté au raisonnement.'],
      ['Convenance','Qu’est-ce qu’un style approprié ?','Un style ajusté au sujet, au public, au lieu et à l’enjeu. Une cérémonie, une explication technique et une annonce de crise exigent des degrés différents de solennité, de précision et d’émotion.'],
      ['Fonction','Quelle question poser avant d’ajouter une figure ?','Quel effet exact doit-elle produire : clarifier, opposer, amplifier, condenser, rythmer, faire voir, rendre mémorable ou provoquer une réponse ? Sans fonction identifiable, la figure risque de devenir décorative.'],
      ['Rythme','Comment le rythme des phrases influence-t-il l’auditoire ?','Les phrases courtes accélèrent, tranchent ou soulignent ; les phrases longues développent, nuancent ou accumulent. Alterner les longueurs évite la monotonie et place les mots importants aux positions fortes.'],
      ['Figures','Quelle différence entre un schème et un trope ?','Un schème modifie surtout la disposition ou la forme des mots : répétition, parallélisme, inversion. Un trope déplace leur sens habituel : métaphore, métonymie, ironie. Les frontières historiques ne sont pas toujours parfaitement stables.'],
      ['Métaphore','Qu’est-ce qu’une métaphore efficace ?','Un transfert de sens qui fait comprendre une réalité par une autre : « cette procédure est un goulot d’étranglement ». Elle est forte si les ressemblances pertinentes éclairent le problème sans imposer de fausses conclusions.'],
      ['Comparaison','Quelle différence entre comparaison et analogie ?','La comparaison rapproche explicitement deux éléments, souvent avec « comme ». L’analogie développe une relation structurée entre deux domaines pour expliquer ou argumenter ; elle doit être testée sur ses ressemblances et ses limites.'],
      ['Métonymie','Qu’est-ce que la métonymie ?','Remplacer une réalité par un terme qui lui est associé : « l’Élysée annonce » pour la présidence, « lire un Camus » pour une œuvre. Elle condense mais peut aussi masquer les acteurs réels.'],
      ['Synecdoque','Qu’est-ce que la synecdoque ?','Désigner le tout par une partie, la partie par le tout ou l’espèce par le genre : « cent voiles » pour cent bateaux. Elle sélectionne un trait saillant et oriente le regard.'],
      ['Personnification','À quoi sert la personnification ?','À attribuer une voix ou une action humaine à une idée, un objet ou une institution : « le marché hésite ». Elle anime le discours, mais peut dissimuler la pluralité des acteurs et des causes.'],
      ['Amplification','Quelle différence entre hyperbole et litote ?','L’hyperbole amplifie au-delà du littéral : « un océan de problèmes ». La litote dit moins pour suggérer davantage : « ce n’est pas mauvais ». Les deux jouent sur l’écart entre formulation et sens attendu.'],
      ['Ironie','Qu’est-ce que l’ironie rhétorique ?','Dire ou montrer un écart entre le sens apparent et le sens visé. Elle suppose des indices et une complicité interprétative ; sans eux, elle peut être prise au premier degré ou humilier inutilement.'],
      ['Antithèse','Qu’est-ce qu’une antithèse ?','La mise en parallèle de deux idées opposées : « nous pouvons subir le changement ou le conduire ». Elle rend un contraste net, mais peut artificiellement réduire une réalité complexe à deux camps.'],
      ['Chiasme','Qu’est-ce qu’un chiasme ?','Une structure croisée ABBA : « Il faut manger pour vivre, non vivre pour manger ». Le croisement donne une impression d’équilibre, de retournement ou de clôture.'],
      ['Parallélisme','Pourquoi le parallélisme est-il puissant ?','Il répète une structure syntaxique pour rendre les idées comparables et prévisibles : « comprendre le client, clarifier le problème, construire la solution ». Il facilite l’écoute et la mémoire.'],
      ['Tricolon','Qu’est-ce qu’un tricolon ?','Une série de trois éléments construits de manière parallèle. Trois étapes offrent souvent une sensation de complétude et un rythme mémorable : « voir, comprendre, agir ».'],
      ['Anaphore','Qu’est-ce qu’une anaphore ?','La répétition d’un même mot ou groupe de mots au début de plusieurs unités : « Nous devons écouter. Nous devons décider. Nous devons agir. » Elle crée cohésion, intensité et attente.'],
      ['Épiphore','Qu’est-ce qu’une épiphore ou épistrophe ?','La répétition à la fin de plusieurs unités : « pour le client, avec le client, grâce au client ». La position finale donne un relief sonore et mémoriel particulier.'],
      ['Gradation','Qu’est-ce qu’une gradation ou climax ?','L’ordonnancement d’éléments selon une intensité croissante ou décroissante : « une erreur, un risque, une catastrophe ». Elle construit une progression ; chaque degré doit être crédible.'],
      ['Asyndète','Quel effet produit l’asyndète ?','Elle supprime les conjonctions : « analyser, décider, agir ». Le rythme devient rapide, dense ou tranchant. Trop utilisée, elle peut donner un style télégraphique.'],
      ['Polysyndète','Quel effet produit la polysyndète ?','Elle multiplie les conjonctions : « et les coûts, et les délais, et les risques ». Elle ralentit, accumule et donne à chaque élément un poids distinct.'],
      ['Question rhétorique','À quoi sert une question rhétorique ?','À orienter l’attention ou faire formuler mentalement une réponse : « combien de temps allons-nous encore accepter cela ? » Elle devient manipulatrice si elle enferme l’auditoire dans une réponse présupposée sans discussion.'],
      ['Apostrophe','Qu’est-ce qu’une apostrophe rhétorique ?','Le fait de s’adresser directement à une personne, une idée, un absent ou une entité : « Ô temps, suspends ton vol ». Elle dramatise et rend visible un destinataire.'],
      ['Sons','À quoi servent allitération et assonance ?','L’allitération répète des consonnes ; l’assonance, des voyelles. Elles créent cohésion sonore, rythme et mémorisation, à condition de ne pas attirer plus d’attention que l’idée.'],
      ['Copia','Qu’est-ce que la copia ?','La réserve de formulations, exemples, arguments et variations dont dispose l’orateur. S’exercer à reformuler une même idée de plusieurs manières développe l’adaptation plutôt que la verbosité.'],
      ['Exorde','Quelle est la fonction de l’exordium ?','Ouvrir le discours, obtenir l’attention, rendre l’auditoire réceptif et installer l’ethos. Une bonne introduction promet une direction claire sans livrer un préambule interminable.'],
      ['Narration','Quelle est la fonction de la narratio ?','Présenter les faits ou le contexte nécessaires à la compréhension du cas. Elle doit être claire, crédible et orientée vers la question, sans cacher les éléments indispensables à un jugement loyal.'],
      ['Division','Quelle est la fonction de la partitio ?','Annoncer la thèse, le point de désaccord et l’ordre des étapes. Elle donne une carte mentale au public : ce qui est admis, ce qui reste à prouver et comment le discours va avancer.'],
      ['Confirmation','Quelle est la fonction de la confirmatio ?','Développer les preuves en faveur de la thèse. Les arguments les plus solides doivent être hiérarchisés et reliés explicitement à la conclusion, plutôt qu’empilés.'],
      ['Réfutation','Quelle est la fonction de la refutatio ?','Présenter puis traiter les objections importantes. Elle peut distinguer, concéder, montrer une erreur de fait ou contester une garantie. Ignorer une objection évidente affaiblit l’ethos.'],
      ['Conclusion','Quelle est la fonction de la peroratio ?','Récapituler sans répéter mécaniquement, rappeler l’enjeu, amplifier ce qui doit rester en mémoire et orienter vers une décision ou une émotion finale.'],
      ['Mémoire','Comment fonctionne la méthode des lieux ?','Associer les grandes étapes du discours à des lieux connus parcourus mentalement. Chaque lieu déclenche une image ou une idée ; on mémorise ainsi la structure plutôt qu’un texte mot à mot.'],
      ['Voix','Quels paramètres de voix travailler ?','Débit, articulation, volume, hauteur, intonation et énergie. Le but n’est pas de jouer un personnage, mais de rendre les distinctions audibles et de maintenir une présence cohérente.'],
      ['Corps','Quels principes simples pour le regard et les gestes ?','Regard distribué, posture stable, gestes lisibles liés aux idées, déplacements motivés. Éviter les mouvements répétitifs inconscients qui concurrencent le message.'],
      ['Silence','Pourquoi la pause est-elle une technique rhétorique ?','Elle laisse le temps de comprendre, sépare les idées, souligne un mot et donne à l’orateur le contrôle du rythme. Remplir chaque silence de mots parasites affaiblit souvent la présence.'],
      ['Exercice','Quel exercice faire avec un discours de soixante secondes ?','Choisir une thèse, un auditoire et une action attendue. Construire : accroche, problème, preuve principale, objection, réponse, appel à l’action. Prononcer sans lire puis réduire de 20 % sans perdre le sens.'],
      ['Exercice','Qu’est-ce que l’exercice in utramque partem ?','Défendre successivement les deux côtés d’une même question. Il développe l’invention, révèle les présupposés et permet de comprendre la position adverse avant de choisir la sienne.'],
      ['Exercice','Comment travailler l’adaptation à l’auditoire ?','Présenter la même idée à trois publics : novice, expert, décideur pressé. Modifier vocabulaire, preuves, objections, longueur et appel final tout en conservant la même exigence de vérité.'],
      ['Exercice','Comment progresser avec l’enregistrement vidéo ou audio ?','Faire une première prise, relever seulement trois éléments observables — clarté, rythme, présence — puis refaire immédiatement. Comparer les versions plutôt que juger sa personne.'],
      ['Checklist','Quelle checklist utiliser avant de prendre la parole ?','1. Quelle transformation attendue ?\n2. Quel auditoire et quelles contraintes ?\n3. Quelle thèse en une phrase ?\n4. Quel ordre ?\n5. Quelles preuves et quelle objection ?\n6. Quelle figure sert réellement le sens ?\n7. Quels mots doivent rester ?\n8. Où placer les pauses ?\n9. Quelle dernière phrase ?\n10. Ai-je répété à voix haute ?']
    ]
  };
  D.decks=D.decks.filter(d=>d.id!==raw.id);
  D.decks.push(raw);
  try{
    if(typeof DECKS!=='undefined'){
      const normalized={...raw,cards:(raw.cards||[]).map(c=>Array.isArray(c)?{category:c[0],front:c[1],back:c[2]}:c)};
      const existing=DECKS.findIndex(d=>d.id===raw.id);
      if(existing>=0)DECKS.splice(existing,1,normalized);
      else DECKS.push(normalized);
    }
  }catch(_error){}
  try{if(typeof renderHome==='function')renderHome()}catch(_error){}
  const directId=decodeURIComponent((location.hash.match(/deck=([^&]+)/)||[])[1]||'');
  if(directId===raw.id&&typeof window.openDeck==='function')setTimeout(()=>window.openDeck(raw.id),0);
})();
