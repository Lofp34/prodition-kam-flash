(()=>{
  const A=window.ArticleStudy;
  if(!A)return;
  const C=(category,front,back)=>[category,front,back];
  A.addArticle('cerebras-knowledge-base','Cerebras — How We Built Our Knowledge Base',{
    url:'https://www.cerebras.ai/blog/how-we-built-our-knowledge-base',
    source:'Cerebras · Daniel Kim et équipe · 15 juillet 2026',
    status:'Quiz prêt',
    description:'Architecture d’une base de connaissances interne utilisée plus de 15 000 fois par jour.',
    takeaway:'Le système ne cherche pas à déplacer toute l’information vers une source unique : il indexe les outils existants, planifie la recherche, fusionne plusieurs moteurs, reranke les preuves et limite chaque requête à un projet pertinent.',
    learningGoals:['Comprendre l’architecture ingestion → recherche → autorisation.','Distinguer fusion de résultats, reranking et enrichissement du contexte.','Identifier les principes transposables à une base de connaissances d’entreprise.']
  },[
    C('Problème','Quel problème organisationnel Cerebras cherche-t-il à résoudre ?','L’information utile est dispersée entre Slack, documentation, code, tickets et bases internes, ce qui rend les réponses difficiles à trouver et répétitives.'),
    C('Principe','Pourquoi Cerebras refuse-t-il le rêve d’une « source unique de vérité » ?','Parce que l’information naît là où le travail se fait. Forcer les équipes à tout déplacer vers un seul outil dégrade les usages et finit rarement par fonctionner.'),
    C('Architecture','Quelles sont les trois grandes capacités de la plateforme ?','Collecter et stocker les données, permettre leur interrogation, puis assurer identité, autorisations, audit et analyse.'),
    C('Stockage','Quel est le cœur commun du stockage ?','Une table Postgres contenant notamment embeddings, résumés ou contenus normalisés et métadonnées de provenance.'),
    C('Connecteurs','Comment les équipes ajoutent-elles une source interne spécifique ?','Par un petit connecteur ou module Python qui lit leur système et écrit des lignes respectant le schéma commun de la table d’embeddings.'),
    C('Extensibilité','Pourquoi le schéma commun rend-il la plateforme extensible ?','Une nouvelle source devient interrogeable par les mêmes outils dès qu’elle produit le format attendu, sans modifier toute la chaîne de recherche.'),
    C('Planification','Que fait le planificateur au début d’une requête ?','Il choisit les outils et sources probablement utiles en fonction de la question, du projet actif et des descriptions compactes des données disponibles.'),
    C('Outils','Quels types d’outils le planificateur peut-il sélectionner ?','Index de sous-systèmes, recherche unifiée, recherche Slack, recherche code, PR récentes et identification des personnes expertes.'),
    C('Exécution','Pourquoi les recherches sont-elles lancées en parallèle ?','Pour réduire la latence et recueillir simultanément des preuves complémentaires issues de plusieurs sources.'),
    C('Preuves','Pourquoi normaliser les résultats dans un format de preuve commun ?','Pour permettre au reranking et au modèle de synthèse de traiter de manière uniforme des résultats provenant de systèmes très différents.'),
    C('Fusion','À quoi sert la Reciprocal Rank Fusion (RRF) ?','À fusionner des classements incompatibles provenant de plusieurs moteurs, en récompensant les documents bien placés dans plusieurs listes.'),
    C('Fusion','Pourquoi la constante de lissage de RRF favorise-t-elle le consensus ?','Elle évite qu’une première place isolée domine excessivement et valorise les documents soutenus par plusieurs récupérateurs.'),
    C('Diversité','Que fait le système avant le reranking final ?','Il déduplique, regroupe les fragments d’une même source et limite la contribution d’un seul fichier pour obtenir un ensemble plus diversifié.'),
    C('Reranking','Comment fonctionne le reranking décrit dans l’article ?','Un petit modèle note les candidats sur une échelle de pertinence, puis seuls les meilleurs sont conservés pour la synthèse.'),
    C('Contexte','Pourquoi réinjecter les sections voisines après le classement ?','Un fragment isolé peut perdre titre, préconditions ou avertissements. Les sections adjacentes restaurent le contexte nécessaire.'),
    C('Projets','Qu’est-ce qu’un projet dans Cerebras Knowledge ?','Un regroupement léger et nommé de canaux, dépôts, bases et espaces documentaires pertinents pour une équipe ou une initiative.'),
    C('Onboarding','Pourquoi attribuer un projet par défaut à l’utilisateur ?','Pour fournir immédiatement des réponses à fort signal sans exiger qu’un nouvel employé connaisse déjà tous les bons canaux et dépôts.'),
    C('Leçon','Quelle leçon générale peut-on transposer à une PME ?','Conserver l’information dans les outils réellement utilisés, unifier l’accès par une couche de recherche et investir dans le découpage, les permissions, le reranking et l’évaluation.')
  ]);
})();
