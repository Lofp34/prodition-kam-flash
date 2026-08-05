(()=>{
  const A=window.ArticleStudy;
  if(!A)return;
  const C=(category,front,back)=>[category,front,back];
  A.addArticle('claude-loops','Claude — Getting Started With Loops',{
    url:'https://x.com/ClaudeDevs/status/2074208949205881033',
    canonicalUrl:'https://claude.com/blog/getting-started-with-loops',
    source:'ClaudeDevs / Anthropic · Guide officiel sur les boucles',
    status:'Quiz prêt',
    description:'Les quatre formes de boucles agentiques et les primitives /goal, /loop et /schedule.',
    takeaway:'Une boucle est un agent qui répète des cycles de travail jusqu’à une condition d’arrêt. Le bon type dépend du déclencheur, de la preuve de fin et de la durée de vie attendue.',
    learningGoals:['Reconnaître les quatre types de boucles.','Choisir entre /goal, /loop et /schedule.','Écrire des critères d’arrêt vérifiables et des limites de coût.']
  },[
    C('Définition','Comment le guide définit-il une boucle ?','Un agent répète des cycles de travail jusqu’à ce qu’une condition d’arrêt soit satisfaite.'),
    C('Choix','Quels critères permettent de distinguer les types de boucles ?','Ce qui les déclenche, ce qui les arrête, la primitive utilisée et le type de tâche auquel elles conviennent.'),
    C('Simplicité','Quelle règle faut-il appliquer avant de concevoir une boucle complexe ?','Commencer par l’approche la plus simple et n’ajouter une boucle plus autonome que si elle apporte un bénéfice réel.'),
    C('Turn-based','Qu’est-ce qu’une boucle tour par tour ?','Un prompt déclenche le travail ; Claude lit le contexte, agit, vérifie et poursuit jusqu’à juger la tâche terminée ou devoir rendre la main.'),
    C('Turn-based','Pour quels travaux la boucle tour par tour convient-elle ?','Des tâches ponctuelles et relativement courtes : recherche, écriture, analyse ou modification de code.'),
    C('Goal-based','Qu’apporte une boucle basée sur un objectif ?','Elle décrit un état final vérifiable plutôt qu’une suite d’étapes et maintient l’agent au travail jusqu’à réussite ou limite de tours.'),
    C('Goal-based','Comment /goal évite-t-il l’arrêt prématuré ?','Un évaluateur séparé vérifie la condition chaque fois que l’agent veut s’arrêter et le renvoie au travail si elle n’est pas satisfaite.'),
    C('Vérification','Quels critères d’objectif sont les plus fiables ?','Des critères déterministes ou mesurables : tests passants, score minimal, absence d’erreurs ou file de travail vide.'),
    C('Limites','Pourquoi ajouter un nombre maximal de tentatives à /goal ?','Pour empêcher une boucle sans fin, maîtriser les coûts et forcer une remontée vers l’humain si l’objectif reste bloqué.'),
    C('Time-based','À quoi sert /loop ?','À relancer localement un prompt selon un intervalle pour surveiller un système ou traiter une situation qui évolue dans le temps.'),
    C('Localité','Quelle limite pratique de /loop faut-il retenir ?','Il dépend de la session et de la machine locale ; s’il n’y a plus de processus actif, la boucle ne poursuit pas son travail.'),
    C('Schedule','À quoi sert /schedule ?','À créer une routine cloud déclenchée selon un calendrier, capable de fonctionner sans que l’ordinateur reste ouvert.'),
    C('Proactive','Qu’est-ce qu’une boucle proactive ?','Une composition de déclencheur, objectif, orchestration et autonomie qui recherche et traite un flux de travail sans intervention humaine en temps réel.'),
    C('Composition','Quels éléments peuvent composer une boucle proactive ?','Une routine /schedule, un objectif /goal, des skills de vérification, des workflows dynamiques et un mode autonome.'),
    C('Coûts','Comment limiter le coût des routines longues ?','Espacer les déclenchements, plafonner les tours, utiliser des critères précis et router les tâches simples vers des modèles moins coûteux.'),
    C('Décision','Quelle question aide à choisir la primitive ?','La prochaine itération doit-elle être déclenchée par une condition, par une horloge locale ou par un calendrier durable dans le cloud ?')
  ]);
})();
