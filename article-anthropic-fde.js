(()=>{
  const A=window.ArticleStudy;
  if(!A)return;

  A.addArticle('anthropic-fde-interview-guide','Anthropic FDE — réussir l’entretien Forward Deployed Engineer',{
    badge:'Article',
    kicker:'Guide d’entretien à l’étude',
    primaryLabel:'Lire le guide ↗',
    url:'https://www.chillinterview.com/learn/interview-guides/anthropic-forward-deployed-engineer-fde-interview-guide',
    source:'Chill Interview · Anthropic Forward Deployed Engineer (FDE) Interview Guide · partie publique consultée le 23 août 2026',
    status:'Quiz prêt · partie publique',
    description:'Comprendre le rôle hybride de Forward Deployed Engineer chez Anthropic et les signaux recherchés : ingénierie de production, agents Claude, découverte client, architecture d’entreprise, évaluations, sécurité et capacité à agir dans l’ambiguïté.',
    takeaway:'Le candidat fort n’est ni seulement développeur, ni seulement expert en prompts, ni seulement consultant : il sait découvrir un workflow réel, construire une solution Claude fiable, l’évaluer, la sécuriser, la déployer et transformer les apprentissages terrain en briques réutilisables.',
    note:'Le guide est non officiel. Sa partie publique s’arrête pendant la section Enterprise AI System Design. Les cartes n’inventent donc pas les sections verrouillées sur la découverte client, les valeurs, le comportemental, les niveaux, le plan de préparation, la rémunération et les FAQ.',
    learningGoals:[
      'Savoir expliquer le modèle mental du rôle FDE chez Anthropic.',
      'Identifier les signaux évalués à chaque étape probable de l’entretien.',
      'Structurer une réponse de coding, d’Applied AI et de system design orientée production.',
      'Maîtriser les concepts Claude mis en avant : contexte, outils, MCP, skills, subagents, evals, sécurité et déploiement.'
    ]
  },[
    ['Liens','Quelles pages ouvrir en priorité pour étudier le rôle Anthropic FDE ?',`Guide Chill Interview :
https://www.chillinterview.com/learn/interview-guides/anthropic-forward-deployed-engineer-fde-interview-guide

Usage de Claude pendant le recrutement :
https://www.anthropic.com/candidate-ai-guidance

Context engineering :
https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

Code execution avec MCP :
https://www.anthropic.com/engineering/code-execution-with-mcp

Agent Skills :
https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview

Subagents :
https://code.claude.com/docs/en/agent-sdk/subagents

Conception des outils :
https://www.anthropic.com/engineering/writing-tools-for-agents

Évaluations :
https://platform.claude.com/docs/en/test-and-evaluate/develop-tests`],
    ['Source','Quelle limite de source faut-il garder en tête pour ce jeu ?','Chill Interview est un guide non officiel. De plus, seule la première partie est publiquement lisible : le quiz couvre le positionnement, le processus probable, le recrutement, le coding, l’Applied AI et le début du system design, sans inventer les sections verrouillées.'],
    ['Positionnement','Qu’est-ce qu’un Forward Deployed Engineer chez Anthropic, selon le guide ?','Un ingénieur très opérationnel qui travaille au contact de clients stratégiques pour transformer des workflows ambigus en applications Claude fiables, intégrées aux systèmes réels et déployées avec des garde-fous.'],
    ['Positionnement','Quel modèle mental résume le rôle FDE ?','Ingénieur logiciel + constructeur d’IA appliquée + opérateur de déploiement d’entreprise + responsable de découverte client + ambassadeur terrain attentif à la sécurité.'],
    ['Positionnement','Pourquoi l’entretien FDE n’est-il pas simplement un entretien de Software Engineer avec quelques questions sur Claude ?','Parce qu’il évalue simultanément le code de production, l’architecture agentique, le travail dans les systèmes du client, la découverte du besoin, le déploiement, la communication avec plusieurs parties prenantes et le jugement de sécurité.'],
    ['Positionnement','Quelle est la trame centrale d’un bon candidat FDE ?','Comprendre le workflow → construire une solution ciblée → mesurer son comportement → sécuriser les actions et les données → déployer progressivement → apprendre du terrain → remonter les patterns réutilisables au produit.'],
    ['Signaux','Quels sont les cinq grands signaux mis en avant par le guide ?',`1. Ingénierie de production.
2. Profondeur Claude et agents.
3. Découverte client et jugement d’entreprise.
4. Sécurité et fiabilité.
5. Forte autonomie dans l’ambiguïté.`],
    ['Signaux','Que signifie « ingénierie de production » dans ce contexte ?','Écrire du Python ou du TypeScript propre, intégrer des API, gérer les erreurs, tester, observer et livrer du code fiable dans un environnement client réel.'],
    ['Signaux','Que signifie « profondeur Claude / agentic AI » ?','Comprendre les prompts, le contexte, les outils, MCP, les skills, les subagents, les sorties structurées, les évaluations, les traces et les modes de défaillance d’un agent.'],
    ['Signaux','Que signifie « découverte client et jugement d’entreprise » ?','Savoir transformer une demande floue en workflow précis, identifier les parties prenantes et contraintes, choisir un pilote raisonnable et définir une adoption mesurable.'],
    ['Signaux','Que signifie « sécurité et fiabilité » pour un FDE ?','Traiter explicitement hallucinations, droits d’accès, données sensibles, auditabilité, misuse, validation humaine, régressions, incidents et rollback.'],
    ['Signaux','Que signifie « forte autonomie dans l’ambiguïté » ?','Avancer sans playbook parfait, poser les bonnes questions, débloquer le client, prendre des décisions réversibles et transformer les apprentissages locaux en méthodes répétables.'],
    ['Signaux','Quelle erreur de positionnement fait échouer un candidat pourtant technique ?','Se présenter comme un constructeur de démonstrations IA. Le rôle exige des systèmes qui survivent à la réalité de l’entreprise : données imparfaites, sécurité, fiabilité, désaccords, coûts, adoption et maintenance.'],
    ['Processus','Existe-t-il une boucle d’entretien FDE universelle publiée par Anthropic ?','Non. Le guide synthétise un schéma probable à partir de sources publiques. L’ordre et le contenu varient selon l’équipe, le niveau, le secteur client et la variante du rôle.'],
    ['Processus','Quelles étapes sont probablement présentes dans une boucle FDE ?','Revue de candidature, entretien recruteur, coding ou build pratique, Applied AI / Claude, découverte ou cas client, system design, mission/valeurs, comportemental, puis échanges d’équipe et offre.'],
    ['Processus','Que faut-il demander au recruteur avant de préparer la boucle ?','La variante exacte du rôle, le format du coding, la présence d’un build Claude/MCP, les règles du take-home, le type de system design, le secteur client, le niveau, les déplacements et la manière dont la sécurité est revue avant lancement.'],
    ['Processus','Quelle règle Anthropic donne-t-elle concernant l’usage de Claude pendant le recrutement ?','Claude est encouragé pour préparer et améliorer la formulation d’une candidature authentique. Sauf instruction contraire, il ne doit pas être utilisé pendant les entretiens en direct ni pour réaliser les take-home assessments.'],
    ['Recruteur','Que cherche principalement à calibrer le recruiter screen ?','Compréhension du rôle hybride, profondeur technique, expérience LLM réelle, maturité client, tolérance à l’ambiguïté, motivation pour Anthropic et contraintes logistiques.'],
    ['Recruteur','À quoi ressemble un positionnement faible sur l’expérience IA ?','« J’ai construit un chatbot » ou « je connais le prompt engineering », sans expliquer le workflow, les outils, les données, les évaluations, les risques et le passage en production.'],
    ['Recruteur','À quoi ressemble un positionnement fort sur un projet IA ?','Décrire le problème client, l’architecture, les outils et permissions, la mesure de qualité, le déploiement, les incidents traités et l’impact obtenu, avec des faits concrets.'],
    ['Recruteur','Comment répondre à « Pourquoi FDE plutôt que SWE, Solutions Architect ou consultant ? »','Montrer que l’on aime à la fois coder, découvrir le vrai problème, travailler dans les contraintes du client, déployer, mesurer l’adoption et ramener les apprentissages vers le produit.'],
    ['Recruteur','Comment rendre la sécurité opérationnelle dans une réponse de recrutement ?','Parler de frontières d’action, moindre privilège, approbation humaine, filtrage des données, audit logs, evals, surveillance, procédure d’incident et rollback, plutôt que d’afficher seulement une conviction abstraite.'],
    ['Coding','Le coding FDE doit-il être préparé comme du LeetCode pur ?','Non. Les fondamentaux algorithmiques peuvent compter, mais le guide insiste sur des tâches pratiques : API, JSON, pagination, auth, retries, timeouts, validation, tests, outils, traces et opérations idempotentes.'],
    ['Coding','Quels sujets techniques sont prioritaires pour le coding screen ?','Python ou TypeScript, structures de données, async, API clients, parsing JSON, tests, erreurs, schémas, pagination, limites de débit, secrets, permissions, logs d’audit et idempotence.'],
    ['Coding','Quels exemples de prompts pratiques le guide propose-t-il ?','Client CRM paginé, outil de recherche documentaire avec filtres, calcul d’evals, analyse de traces agentiques, filtrage par ACL, backoff autour d’une API instable, validation de JSON et détection de cycles dans un workflow.'],
    ['Coding','Quels signaux sont réellement évalués pendant le coding ?','Clarté du code, validation, tests, jugement pratique, compréhension des modes de panne LLM/outils/code, discipline de debug, communication et prise en compte de la sécurité.'],
    ['Coding','Quelle structure en sept étapes donne une bonne réponse de coding FDE ?',`1. Reformuler la tâche.
2. Clarifier entrées et contraintes.
3. Définir succès et échecs.
4. Construire la version sûre la plus simple.
5. Ajouter validation et tests.
6. Expliquer le durcissement production.
7. Relier le composant au workflow client.`],
    ['Coding','Pourquoi faut-il clarifier l’endroit où sont appliquées les permissions avant d’écrire un outil de recherche ?','Parce qu’un agent peut agir au nom d’un utilisateur. Le composant devrait appliquer ou vérifier les ACL, idéalement en défense en profondeur, afin de ne jamais renvoyer un document interdit au modèle.'],
    ['Coding','Quelle attitude de diagnostic est attendue ?','Inspecter les faits avant de deviner : inputs, logs, traces, codes d’erreur, état des outils, permissions, latence et données malformées, puis tester une hypothèse précise.'],
    ['Applied AI','Pourquoi la ronde Applied AI / Claude est-elle probablement la plus spécifique au rôle ?','Elle vérifie la capacité à concevoir et livrer un système Claude complet : contexte, outils, MCP, skills, subagents, évaluations, sécurité, intégrations et déploiement.'],
    ['Applied AI','Quels blocs faut-il couvrir dans une réponse Applied AI ?','Fondations Claude, contexte, outils, sorties structurées, intégrations de production, auth, données, logs, evals, traces, supervision humaine, confidentialité, limites d’action et rollback.'],
    ['Applied AI','Quelle mauvaise entrée en matière faut-il éviter ?','Commencer par « construisons un agent ». Il faut d’abord définir le workflow, l’utilisateur, le coût de l’erreur, les actions permises et les critères de réussite.'],
    ['Applied AI','Quelle séparation de responsabilités rend un système agentique plus fiable ?','Le code déterministe gère auth, filtrage, schémas, retries, validation et règles critiques. Claude raisonne sur la tâche et appelle des outils étroits, sans absorber les responsabilités de contrôle.'],
    ['Applied AI','À quoi ressemble une approche eval-first ?','Définir avant le déploiement des cas représentatifs, résultats attendus et métriques : exactitude, citations, escalade, conformité, succès des outils, latence, coût et sécurité, puis les rejouer après chaque modification.'],
    ['Applied AI','Comment lancer un pilote FDE pragmatique ?','Choisir un seul workflow utile, limiter l’autonomie, utiliser des cas historiques pour les evals, revoir les traces avec les utilisateurs, corriger outils et contexte, puis élargir seulement après franchissement de critères explicites.'],
    ['Concepts Anthropic','Pourquoi MCP est-il important pour un FDE Anthropic ?','MCP fournit un standard ouvert pour connecter les agents à des systèmes externes. Un FDE peut livrer des serveurs MCP qui exposent des capacités client étroites, auditées et réutilisables.'],
    ['Concepts Anthropic','Quel rôle jouent les Agent Skills ?','Ils empaquettent des instructions, connaissances, références et parfois du code afin que Claude réutilise une capacité spécialisée de manière cohérente dans plusieurs workflows.'],
    ['Concepts Anthropic','Pourquoi utiliser des subagents ?','Pour isoler le contexte et déléguer des sous-tâches spécialisées ou parallèles. Le coordinateur conserve la vue d’ensemble tandis que chaque subagent renvoie un résultat condensé.'],
    ['Concepts Anthropic','Pourquoi la conception des outils est-elle un contrat critique ?','Un outil relie un système déterministe à un agent non déterministe. Son nom, sa description, son schéma, ses erreurs et son périmètre influencent directement le comportement du modèle.'],
    ['Concepts Anthropic','Quelle différence entre prompt engineering et context engineering ?','Le prompt engineering travaille surtout les instructions. Le context engineering gère l’ensemble de l’état fourni au modèle : instructions, outils, MCP, données, historique, exemples et état évolutif de l’agent.'],
    ['Concepts Anthropic','Quel principe de context engineering faut-il retenir ?','Fournir le plus petit ensemble de tokens à fort signal permettant le comportement attendu. Plus de contexte n’est pas automatiquement meilleur : il peut diluer l’attention et augmenter coût et confusion.'],
    ['Concepts Anthropic','Pourquoi exécuter du code avec MCP peut-il améliorer un agent ?','L’agent peut charger seulement les outils nécessaires, traiter les données hors du contexte du modèle et ne renvoyer qu’un résultat condensé. Cela réduit tokens, erreurs de copie et exposition de données, à condition de sandboxer l’exécution.'],
    ['System design','Que doit démontrer un entretien de system design FDE ?','La capacité à concevoir un déploiement client complet, pas seulement un prototype : workflow, données, architecture, permissions, evals, observabilité, coûts, adoption, sécurité et rollback.'],
    ['System design','Quelles sont les dix étapes du framework de design proposé ?',`1. Clarifier le workflow.
2. Définir les métriques.
3. Cartographier données et systèmes.
4. Fixer les frontières d’action.
5. Concevoir l’architecture.
6. Ajouter la sécurité.
7. Construire les evals.
8. Ajouter l’observabilité.
9. Planifier le rollout et le rollback.
10. Extraire le pattern réutilisable et les besoins produit.`],
    ['System design','Pourquoi les frontières d’action doivent-elles être définies avant l’architecture ?','Un système qui lit, prépare un brouillon, modifie une donnée ou envoie un message n’a pas le même risque. Le niveau d’autonomie détermine permissions, validation humaine, audit et critères de lancement.'],
    ['System design','Quels éléments de sécurité faut-il rendre explicites dans le design ?','Identité, authentification, moindre privilège, secrets, provenance des données, PII, frontières de contexte, chiffrement, audit, approbations, misuse, rétention et réponse aux incidents.'],
    ['System design','Quels éléments d’observabilité faut-il prévoir ?','Logs, traces, appels d’outils, erreurs, latence, coût, versions des prompts et outils, qualité des sorties, feedback utilisateur, taux d’escalade et corrélation entre résultat et chemin agentique.'],
    ['System design','À quoi ressemble un bon plan de rollout ?','Pilote étroit, utilisateurs identifiés, supervision humaine, métriques de succès, seuils de sécurité, revue des traces, déploiement progressif, mécanisme de désactivation et rollback vers une version connue.'],
    ['System design','Pourquoi le retour terrain vers Product et Engineering fait-il partie du rôle FDE ?','Parce que les problèmes rencontrés chez un client révèlent des patterns réutilisables, des manques produit et des besoins de plateforme. Le FDE ne livre pas seulement un projet local : il améliore la capacité générale de déploiement.'],
    ['Application','Comment appliquer ce guide à la construction d’agents commerciaux chez un client ?','Commencer par un workflow précis, cartographier CRM et permissions, construire un outil étroit, garder les écritures sensibles sous validation, créer des evals sur des cas réels, piloter avec une petite équipe et transformer les apprentissages en skill ou module réutilisable.'],
    ['Synthèse','Quelle phrase faut-il retenir de ce guide ?','Un FDE crédible sait découvrir le vrai travail, coder le système, faire raisonner Claude dans des frontières sûres, mesurer les résultats, gagner la confiance du client et généraliser ce qu’il apprend.']
  ]);
})();
