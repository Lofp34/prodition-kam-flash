(()=>{
  const A=window.ArticleStudy;
  if(!A)return;
  const C=(category,front,back)=>[category,front,back];
  A.addArticle('loop-engineering','Loop Engineering Clearly Explained',{
    url:'https://x.com/akshay_pachaar/status/2069118430582866051',
    canonicalUrl:'https://en.rattibha.com/thread/2069118430582866051',
    source:'Akshay Pachaar · Loop Engineering',
    status:'Quiz prêt',
    description:'Passer de l’écriture d’un prompt ponctuel à la conception d’un système de feedback qui mène le travail jusqu’au résultat.',
    takeaway:'La boucle de base est banale. La valeur d’ingénierie réside dans les conditions d’arrêt, la gestion du contexte, les outils, l’idempotence et la vérification indépendante.',
    learningGoals:['Comprendre le changement de niveau d’abstraction.','Identifier les composants qui rendent une boucle fiable.','Éviter les boucles qui s’arrêtent trop tôt ou dérivent.']
  },[
    C('Paradigme','Quelle différence fondamentale oppose prompting et loop engineering ?','Le prompting cherche un bon message ponctuel ; le loop engineering conçoit le système qui fait agir, observer, corriger et répéter l’agent.'),
    C('Boucle','Quelle est la boucle technique minimale d’un agent outillé ?','Envoyer le contexte au modèle, exécuter ses appels d’outils, ajouter les résultats au contexte et recommencer jusqu’à l’absence d’appel.'),
    C('Valeur','Pourquoi personne ne se différencie-t-il vraiment sur le simple while ?','La boucle de base est courte et similaire dans la plupart des frameworks ; les difficultés se trouvent autour d’elle.'),
    C('Fin','Pourquoi « le modèle dit qu’il a fini » n’est-il pas une preuve ?','Le modèle peut déclarer la tâche terminée alors que les tests échouent ou que les critères réels ne sont pas satisfaits.'),
    C('Vérification','Qu’est-ce qu’une bonne condition de complétion ?','Une vérification externe et mesurable : tests, type-check, score, état de la file ou contrôle par un évaluateur séparé.'),
    C('Garde-fous','Pourquoi ajouter des plafonds de temps, coût et itérations ?','Pour empêcher les dérives, les dépenses incontrôlées et les cycles qui ne convergent pas.'),
    C('Contexte','Pourquoi traiter le contexte comme un budget ?','Les sorties d’outils et les impasses s’accumulent ; trop de bruit dégrade progressivement les décisions du modèle.'),
    C('Compression','Comment garder un contexte propre ?','Résumer les étapes passées, retirer les sorties mortes et conserver seulement les preuves et décisions encore utiles.'),
    C('Outils','Pourquoi un petit ensemble d’outils ciblés est-il préférable ?','Des outils nombreux ou chevauchants créent de l’ambiguïté et augmentent le risque d’appels inutiles ou dangereux.'),
    C('Idempotence','Pourquoi une opération d’écriture doit-elle supporter la répétition ?','Les boucles réessayent. Une action non idempotente peut dupliquer, écraser ou produire des effets secondaires indésirables.'),
    C('Critique','Pourquoi l’agent ne doit-il pas être seul juge de son propre travail ?','Il tend à confirmer sa propre production ; un test, un type-check ou un autre modèle apporte une opposition indépendante.'),
    C('Humain','Le rôle humain disparaît-il ?','Non. Il se déplace du pilotage tour par tour vers la conception des objectifs, contraintes, évaluateurs et mécanismes de reprise.'),
    C('Architecture','Quelles dimensions faut-il concevoir autour du modèle ?','Déclencheur, état, sélection d’outils, politique de contexte, vérification, condition d’arrêt, reprise et observabilité.'),
    C('Échec','Quel symptôme révèle une mauvaise boucle ?','Elle répète les mêmes actions, croit progresser sans preuve, consomme du contexte ou s’arrête avant que le résultat soit réellement valide.'),
    C('Application','Comment transformer un workflow de code en boucle ?','Faire écrire le code, lancer tests et contrôles, réinjecter les erreurs, corriger puis répéter jusqu’à la réussite vérifiée ou au plafond.'),
    C('Phrase clé','Quel changement de question résume le paradigme ?','Passer de « comment mieux demander au modèle ? » à « comment construire un système qui sait détecter qu’il se trompe ? ».')
  ]);
})();
