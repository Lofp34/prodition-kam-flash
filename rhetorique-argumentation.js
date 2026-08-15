(()=>{
  const D=window.FC_DATA;
  const raw={
    id:'rhetorique-argumentation',
    folder:'rhetorique',
    badge:'Rhétorique',
    title:'Rhétorique — 02. Argumentation',
    subtitle:'43 cartes pour construire, tester et réfuter un raisonnement sans tomber dans les sophismes.',
    description:'Passer de l’opinion à l’argument : thèse, preuves, garanties, stases, types de raisonnement et objections.',
    phrases:[
      'Une affirmation devient un argument lorsqu’elle est soutenue par des raisons reliées à la conclusion.',
      'La garantie est souvent la partie invisible et contestable du raisonnement.',
      'Une objection forte améliore un argument au lieu de l’affaiblir.',
      'Nommer un sophisme ne suffit pas : il faut montrer précisément où le lien logique échoue.'
    ],
    cards:[
      ['Sources','Quelles ressources garder pour approfondir l’argumentation ?','Aristote, Rhétorique :\nhttps://classics.mit.edu/Aristotle/rhetoric.1.i.html\n\nWAC Clearinghouse — méthode de Toulmin :\nhttps://wac.colostate.edu/repository/writing/guides-old/toulmin\n\nWriting Commons — invention et stases :\nhttps://writingcommons.org/section/writing-process/invention/\n\nStanford Encyclopedia — argument et nouvelle rhétorique :\nhttps://plato.stanford.edu/entries/argument/\n\nInternet Encyclopedia of Philosophy — fallacies :\nhttps://iep.utm.edu/fallacy/\n\nWriting Commons — logical fallacies :\nhttps://writingcommons.org/section/rhetoric/rhetorical-reasoning/rhetorical-appeals/logos/logical-fallacies/'],
      ['Fondamentaux','Quelle différence entre une affirmation et un argument ?','Une affirmation énonce une position. Un argument ajoute au moins une raison destinée à rendre cette position acceptable. Il faut donc pouvoir distinguer : conclusion, raisons et lien entre les deux.'],
      ['Fondamentaux','Qu’est-ce qu’une thèse ?','La proposition principale qu’un discours cherche à faire admettre. Une bonne thèse est précise, contestable, proportionnée aux preuves et formulée de manière à savoir ce qui compterait comme réussite ou réfutation.'],
      ['Toulmin','Qu’est-ce que la claim dans le modèle de Toulmin ?','La conclusion ou prétention défendue : ce que l’on demande à l’auditoire d’accepter. Elle peut porter sur un fait, une définition, une évaluation ou une action.'],
      ['Toulmin','Qu’est-ce qu’une raison ?','Une proposition répondant à la question : pourquoi devrais-je accepter la thèse ? Elle doit être pertinente pour la conclusion et assez précise pour être vérifiée ou discutée.'],
      ['Toulmin','Qu’est-ce qu’une donnée ou evidence ?','Un élément qui soutient une raison : observation, document, statistique, exemple, expérience, citation ou témoignage. Sa force dépend de sa fiabilité, de sa pertinence et de sa suffisance.'],
      ['Toulmin','Qu’est-ce que la garantie ou warrant ?','La règle, souvent implicite, qui autorise à passer des données à la conclusion. Exemple : « Les clients abandonnent après trois minutes d’attente, donc il faut réduire l’attente » suppose que réduire une cause importante de départ améliorera la fidélisation.'],
      ['Toulmin','Qu’est-ce que le backing ?','Le soutien de la garantie : théorie, jurisprudence, connaissance scientifique, expérience professionnelle ou principe admis qui explique pourquoi cette garantie mérite confiance.'],
      ['Toulmin','À quoi sert un qualificateur ?','À limiter la portée de la conclusion : probablement, généralement, dans ces conditions, pour la plupart des cas. Qualifier honnêtement rend souvent un argument plus solide qu’une affirmation absolue.'],
      ['Toulmin','Qu’est-ce que la réserve ou rebuttal ?','Les circonstances dans lesquelles la conclusion ne s’applique pas, ou l’objection qui pourrait la renverser. Un argument mature indique ses exceptions au lieu de prétendre valoir sans limite.'],
      ['Toulmin','Comment décomposer cet argument : « Nous devons former l’équipe, car le taux de conversion baisse » ?','Claim : former l’équipe.\nDonnée : le taux de conversion baisse.\nGarantie implicite : le manque de compétence contribue à cette baisse et la formation peut le corriger.\nÀ vérifier : autres causes, qualité de la formation, délai d’effet et coût d’opportunité.'],
      ['Charge de la preuve','Qui porte la charge de la preuve ?','En principe, celui qui avance une affirmation contestable doit fournir des raisons suffisantes. Une personne ne peut pas imposer à l’autre de réfuter une thèse simplement parce qu’elle est difficile à falsifier.'],
      ['Stases','À quoi sert la théorie des stases ?','À identifier le véritable point de désaccord avant d’accumuler les arguments. Les quatre stases principales demandent : le fait existe-t-il ? comment le définir ? quelle valeur lui attribuer ? que faut-il faire ?'],
      ['Stase du fait','Quelle question pose la stase de conjecture ou du fait ?','Que s’est-il réellement passé ? Existe-t-il ? Qui l’a fait ? Quelles preuves permettent de l’établir ? Tant que ce niveau n’est pas stabilisé, les débats de valeur ou de politique risquent d’être prématurés.'],
      ['Stase de définition','Quelle question pose la stase de définition ?','Comment nommer et classer le phénomène ? Une même situation change de portée selon qu’on la qualifie d’erreur, de fraude, d’innovation, de risque ou d’exception.'],
      ['Stase de qualité','Quelle question pose la stase de qualité ?','Est-ce grave, juste, utile, acceptable, admirable ou nuisible ? Elle porte sur l’évaluation, les circonstances atténuantes, les valeurs et l’importance relative du problème.'],
      ['Stase de politique','Quelle question pose la stase de politique ?','Que faut-il faire, qui doit agir, avec quels moyens et quelles conséquences ? Une proposition d’action doit montrer faisabilité, bénéfices, risques et comparaison avec les alternatives.'],
      ['Déduction','Qu’est-ce qu’un raisonnement déductif ?','Un raisonnement où la conclusion découle nécessairement des prémisses si la forme est valide. Sa solidité exige à la fois une forme valide et des prémisses vraies ou acceptables.'],
      ['Induction','Qu’est-ce qu’un raisonnement inductif ?','Un passage de cas observés vers une conclusion probable plus générale. Sa force dépend du nombre de cas, de leur diversité, de leur représentativité et de l’absence d’explication concurrente.'],
      ['Analogie','Quand un argument par analogie est-il fort ?','Lorsque les deux situations se ressemblent sur les propriétés pertinentes pour la conclusion, et non seulement sur des détails frappants. Il faut aussi examiner les différences susceptibles de casser l’analogie.'],
      ['Causalité','Que faut-il prouver dans un argument causal ?','La cause précède l’effet, les phénomènes varient ensemble de façon crédible, un mécanisme plausible les relie et les explications concurrentes sont moins fortes. Une simple succession temporelle ne suffit pas.'],
      ['Signe','Qu’est-ce qu’un argument par signe ou symptôme ?','Il infère une réalité à partir d’un indice : fumée, fièvre, baisse d’usage, comportement. Il faut vérifier la spécificité du signe, sa fréquence et les autres causes capables de le produire.'],
      ['Exemple','Quelle différence entre illustration et preuve par exemple ?','Une illustration rend une idée concrète sans démontrer sa fréquence. Une preuve par exemple prétend soutenir une généralisation ; elle doit donc être représentative et ne pas reposer sur un cas exceptionnel.'],
      ['Précédent','Comment utiliser correctement un précédent ?','Montrer que les situations sont comparables, expliquer pourquoi la décision antérieure était pertinente et vérifier que le contexte n’a pas changé. Un précédent guide ; il ne dispense pas d’analyser le cas présent.'],
      ['Autorité','Quand un témoignage d’expert est-il recevable ?','Quand l’expert est compétent dans le domaine précis, indépendant ou transparent sur ses intérêts, correctement cité, soutenu par des données et compatible avec le niveau de consensus disponible.'],
      ['Définition','Comment une définition peut-elle devenir un argument ?','En fixant les critères d’appartenance à une catégorie. Il faut éviter les définitions orientées qui glissent déjà la conclusion dans les mots, et justifier les critères retenus.'],
      ['Comparaison','Comment fonctionne un argument par comparaison ou degré ?','Il classe des options selon un critère : plus sûr, moins coûteux, plus urgent. Sa validité dépend du choix du critère, de la mesure utilisée et de l’importance accordée aux autres dimensions.'],
      ['Objection','Qu’est-ce qu’un contre-argument ?','Une raison soutenant une conclusion incompatible ou une limite importante de la thèse. Le présenter loyalement montre que l’on comprend le débat et prépare une réponse plus crédible.'],
      ['Concession','À quoi sert une concession ?','À reconnaître un point valable de l’adversaire sans abandonner la thèse principale. Elle précise la portée du désaccord, renforce l’ethos et permet souvent de reformuler une conclusion plus robuste.'],
      ['Réfutation','Qu’est-ce qu’une réfutation réussie ?','Elle attaque un élément décisif : fait faux, source faible, garantie contestable, contradiction, causalité non démontrée ou conclusion disproportionnée. Réfuter ne consiste pas seulement à exprimer son désaccord.'],
      ['Steelman','Qu’est-ce que le steelman ?','La reconstruction de la version la plus forte et la plus charitable d’un argument adverse avant de le critiquer. Cela réduit les malentendus et oblige à répondre au vrai problème.'],
      ['Sophismes','Qu’est-ce qu’un sophisme ou une fallacie ?','Une erreur de raisonnement ou une manœuvre qui donne une apparence de force à un argument. Le diagnostic doit montrer l’erreur précise et son effet sur la conclusion, pas seulement coller une étiquette.'],
      ['Sophismes','Pourquoi l’ad hominem est-il généralement fallacieux ?','Il attaque la personne plutôt que le raisonnement. Le caractère ou les intérêts peuvent parfois affecter la crédibilité d’un témoignage, mais ils ne réfutent pas à eux seuls les preuves et l’inférence.'],
      ['Sophismes','Qu’est-ce que le sophisme génétique ?','Juger une idée uniquement d’après son origine : groupe, époque, média ou personne. L’origine peut justifier un contrôle supplémentaire, mais la thèse doit être évaluée sur ses raisons et ses preuves.'],
      ['Sophismes','Qu’est-ce que l’homme de paille ?','Une reformulation affaiblie ou caricaturale de la position adverse, plus facile à attaquer. L’antidote est de demander à l’autre s’il reconnaît sa thèse dans la reformulation.'],
      ['Sophismes','Qu’est-ce qu’un faux dilemme ?','La présentation de deux options comme si elles étaient les seules possibles. Il faut rechercher les solutions intermédiaires, les combinaisons, les séquences et la possibilité de refuser le cadrage.'],
      ['Sophismes','Quand une pente glissante devient-elle fallacieuse ?','Quand elle affirme une chaîne de conséquences graves sans démontrer chaque étape ni expliquer pourquoi les mécanismes de freinage échoueront. Une pente glissante peut être valide si la chaîne est étayée.'],
      ['Sophismes','Quelle erreur commet le post hoc ?','Conclure que B est causé par A uniquement parce que B survient après A. La chronologie est nécessaire à la causalité mais ne suffit jamais à l’établir.'],
      ['Sophismes','Pourquoi corrélation ne signifie-t-elle pas causalité ?','Deux variables peuvent dépendre d’une cause commune, être reliées par hasard ou s’influencer dans l’autre sens. Il faut identifier le mécanisme et contrôler les explications concurrentes.'],
      ['Sophismes','Qu’est-ce qu’une généralisation hâtive ou un cherry-picking ?','La première tire une règle d’un échantillon insuffisant ; le second sélectionne les données favorables et ignore les autres. L’antidote est de définir la population, la méthode et l’ensemble des résultats pertinents.'],
      ['Sophismes','Qu’est-ce qu’un raisonnement circulaire ?','La conclusion est déjà contenue dans les prémisses sous une autre formulation. Exemple : « Cette règle est juste parce qu’elle est la bonne règle. » Aucune raison indépendante n’est fournie.'],
      ['Sophismes','Que sont l’équivoque, le hors-sujet et l’appel abusif à l’autorité ?','Équivoque : changer discrètement le sens d’un mot.\nHors-sujet : détourner l’attention du point à prouver.\nAutorité abusive : invoquer un prestige hors de son domaine ou à la place des preuves.'],
      ['Checklist','Quelle checklist utiliser avant de présenter un argument ?','1. Quelle thèse exacte ?\n2. Quelle stase ?\n3. Quelles raisons distinctes ?\n4. Quelles preuves fiables et suffisantes ?\n5. Quelle garantie relie chaque preuve à la conclusion ?\n6. Quelles limites et qualifications ?\n7. Quelle objection la plus forte ?\n8. Quelle réponse vérifiable ?\n9. Ma conclusion va-t-elle plus loin que mes preuves ?']
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
