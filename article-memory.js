(()=>{
  const A=window.ArticleStudy;
  if(!A)return;
  const C=(category,front,back)=>[category,front,back];
  A.addArticle('four-layer-memory','The 4-Layer Memory Architecture for AI Agents',{
    url:'https://x.com/matthewgunnin/status/2072772100973007203?s=46',
    canonicalUrl:'https://youmind.com/pt-BR/landing/x-viral-articles/ai-agent-memory-architecture-guide',
    source:'Matthew Gunnin · Architecture de mémoire de deux agents en production',
    status:'Quiz prêt',
    description:'Quatre couches complémentaires pour conserver identité, faits, état partagé et connaissance recherchable.',
    takeaway:'La mémoire durable n’est pas un grand contexte. Elle combine plusieurs horizons temporels, des fichiers inspectables, une rétention contrôlée et une couche de recherche séparée.',
    learningGoals:['Distinguer mémoire, état partagé et rappel sémantique.','Comprendre les quatre couches et leurs invariants.','Identifier une version minimale applicable à ses propres agents.']
  },[
    C('Problème','Quel problème l’architecture cherche-t-elle à résoudre ?','Les agents redémarrent, oublient les décisions, divergent entre sessions et se contredisent lorsqu’ils travaillent à plusieurs.'),
    C('Thèse','Quel est le facteur le plus important selon l’auteur ?','La mémoire utile et structurée compte davantage que le seul choix du modèle ou la quantité d’outils.'),
    C('Couche 1','Que contient la première couche ?','Le contexte chargé au début de session : un fichier d’identité et un index des souvenirs pertinents.'),
    C('Identité','Pourquoi l’identité est-elle stockée dans un fichier Markdown ?','Elle devient lisible, modifiable et débogable par un humain plutôt qu’enfouie dans une configuration opaque.'),
    C('Index','Quel est le rôle de l’index mémoire ?','Servir de table des matières toujours chargée et pointer vers de petites notes consultées à la demande.'),
    C('Granularité','Pourquoi préférer un fichier par fait à un document géant ?','On peut modifier ou supprimer une mémoire obsolète sans perturber tout le reste et ne charger que le contenu pertinent.'),
    C('Couche 2','Que fait la couche de rétention post-session ?','Elle extrait des faits durables issus des sessions : décisions, préférences confirmées, schémas d’échec et corrections.'),
    C('Rétention','Pourquoi ne pas indexer simplement tous les transcripts ?','Les transcripts contiennent beaucoup de bruit. La rétention vise des faits sélectionnés et typés qui méritent de survivre.'),
    C('Validation','Quel garde-fou accompagne la promotion d’un fait ?','Une revue humaine avant qu’un fait retenu automatiquement ne devienne une entrée permanente de l’index.'),
    C('Couche 3','À quoi sert la couche d’état partagé ?','À donner aux agents une vision commune du contexte vivant, des projets, décisions et checkpoints.'),
    C('Live context','Quel invariant régit le journal de contexte partagé ?','Lire avant chaque réponse et ajouter une entrée après chaque interaction significative.'),
    C('Concurrence','Comment éviter que deux agents écrasent le travail de l’autre ?','Utiliser un journal append-only, signer chaque entrée et ne jamais modifier celle d’un autre agent.'),
    C('Décisions','Pourquoi garder un journal de décisions séparé ?','Pour conserver l’horodatage, la décision et sa justification au-delà du flux conversationnel.'),
    C('Couche 4','Quel est le rôle de la couche de connaissance recherchable ?','Fournir recherche plein texte et sémantique sur le corpus, avec classement et provenance, sans tout injecter dans le contexte.'),
    C('Distinction','Quelle différence entre mémoire et rappel ?','La mémoire correspond à ce que l’agent porte activement ; le rappel correspond à ce qu’il peut retrouver quand la situation l’exige.'),
    C('Trade-off','Quel coût réel l’auteur reconnaît-il ?','La discipline de documenter, maintenir les fichiers et contrôler ce qui devient permanent.'),
    C('Démarrage','Quelle version minimale recommande-t-il ?','Commencer par un fichier d’identité, un index mémoire et, s’il existe plusieurs agents, un fichier d’état partagé.'),
    C('Leçon','Quelle conclusion résume l’article ?','Une mémoire fiable est une infrastructure multi-couche qui sait retenir ce qui compte et oublier le reste, pas un simple contexte plus grand.')
  ]);
})();
