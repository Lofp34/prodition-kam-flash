(()=>{
  const A=window.ArticleStudy;
  if(!A)return;
  const C=(category,front,back)=>[category,front,back];

  A.addArticle('deepseek-harness','DeepSeek Harness — architecture agentique composable',{
    badge:'GitHub',
    kicker:'Dépôt GitHub à l’étude',
    primaryLabel:'Ouvrir le dépôt ↗',
    url:'https://github.com/deepseek-ai/deepseek-harness',
    source:'DeepSeek AI · DeepSeek Harness · master · snapshot 47f9438 · version racine 0.1.0-rc.5',
    status:'Quiz prêt',
    description:'Comprendre DeepSeek Harness comme un runtime d’agents composable : Cordis, plugins, profiles, bundles, journal événementiel, outils, skills, sous-agents, sandbox et extension dynamique.',
    takeaway:'Le modèle mental central est “everything is a plugin” : la boucle agent, les modèles, les outils, la persistance, les politiques et l’interface sont assemblés comme des capacités remplaçables autour d’un contexte Cordis et d’un journal de session durable.',
    note:'Jeu construit à partir du README et de la documentation technique du dépôt au commit 47f943859bef60e4160492346772ded9b24f765a. Le projet est explicitement en developer preview : les interfaces peuvent casser rapidement.',
    learningGoals:[
      'Comprendre le rôle de Cordis, des plugins, profiles, bundles et patches.',
      'Savoir suivre un turn : inbox → prompt → LLM → tools → journal.',
      'Identifier les briques utiles pour construire des agents : skills, Code Mode, sous-agents, permissions, sandbox et extensions.',
      'Distinguer ce qui constitue une interface stable de ce qui relève de la composition ou d’un provider remplaçable.'
    ]
  },[
    C('Liens',`Quelles pages ouvrir en priorité pour comprendre DeepSeek Harness ?`,`Dépôt — https://github.com/deepseek-ai/deepseek-harness\nREADME — https://github.com/deepseek-ai/deepseek-harness/blob/master/README.md\nArchitecture — https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/architecture.md\nCordis primer — https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/cordis-primer.md\nPackages — https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/README.md\nTools — https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/tools.md\nSkills — https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/skill/README.md\nSubagents — https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/subagent/README.md\nSandbox — https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/sandbox/README.md\nRuntime extensions — https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/extensions/README.md`),

    C('Définition','DeepSeek Harness, c’est quoi en une phrase ?','Un harness d’agents open source développé par DeepSeek AI, conçu comme une composition de plugins remplaçables autour du framework Cordis.'),
    C('Maturité','Quel avertissement faut-il garder en tête avant de l’adopter en production ?','Le dépôt se présente comme une developer preview et annonce explicitement des changements incompatibles à venir.'),
    C('Version','Quelle version racine est déclarée dans le package.json étudié ?','0.1.0-rc.5.'),
    C('Exécution','Quelle commande permet de lancer rapidement l’interface Web depuis npm ?','npx @deepseek-ai/dsh web. Par défaut, l’interface est servie sur http://127.0.0.1:3080.'),
    C('Exécution','Quelles sont les grandes étapes pour lancer le dépôt depuis les sources ?','Cloner le dépôt, pnpm install, pnpm run build, puis pnpm dsh web.'),

    C('Principe central','Quelle phrase résume l’architecture de DeepSeek Harness ?','Everything is a plugin : même l’adaptateur de modèle, le registre d’outils, le journal de session et la boucle agent sont des plugins.'),
    C('Cordis','Quel rôle joue Cordis ?','Cordis fournit le modèle de composition : un contexte partagé de services, des plugins, des événements typés et des effets réversibles.'),
    C('Cordis','Qu’est-ce qu’un Context Cordis ?','Un dépôt de services accessibles par des clés stables comme ctx.tools, ctx.llm ou ctx.sessions, afin que les consommateurs ne dépendent pas directement d’une implémentation concrète.'),
    C('Cordis','À quoi sert inject dans un plugin Cordis ?','À déclarer ses dépendances de services. Le plugin attend que les services requis existent au lieu d’imposer manuellement un ordre de boot.'),
    C('Cordis','Pourquoi les registrations sont-elles décrites comme des effets réversibles ?','Parce que tools, prompt sections, adapters et listeners sont installés avec des disposers ; lorsqu’un plugin se décharge, ses contributions peuvent être retirées proprement.'),
    C('Architecture','Que signifie “there is no privileged core to patch” ?','Pour étendre dsh, on monte normalement un plugin à côté des autres au lieu de modifier une boucle centrale supposée intangible.'),

    C('Composition','Qu’est-ce qu’un profile ?','Une composition nommée stockée dans le Harness home : elle empile des bundles, contient éventuellement des plugins externes et possède son propre cordis.patch.yml.'),
    C('Composition','Qu’est-ce qu’un bundle ?','Un format de distribution qui apporte des lignes de configuration Cordis et le code qu’elles montent, tout en restant patchable par les couches supérieures.'),
    C('Composition','Dans quel ordre les couches sont-elles appliquées ?','Bundles du profile dans leur ordre, puis cordis.patch.yml du profile, puis patch du home, puis éventuel overlay --patch.'),
    C('Composition','Quel piège important existe avec un patch de configuration ?','Un patch remplace toute la config d’une ligne ciblée : il ne fait pas de deep merge. Il faut donc répéter les champs que l’on souhaite conserver.'),
    C('Composition','À quoi sert dsh --profile web --dump-config ?','À afficher l’arbre de plugins réellement démarré sur la machine ; chaque ligne obtenue peut ensuite être remplacée par un patch.'),
    C('Composition','Quel est le rôle de dsh-base ?','C’est la première couche de chaque profile : modèles, outils, persistance, sandbox, politique d’approbation, settings, credentials, télémétrie et providers de sous-agents.'),

    C('Seams','Qu’est-ce qu’une capability seam ?','Une capacité remplaçable séparant trois rôles : Service Definition, Service Provider et Consumer.'),
    C('Seams','Pourquoi les extensions doivent-elles dépendre d’une Service Definition plutôt que d’un provider concret ?','Pour pouvoir remplacer l’implémentation sans réécrire les consommateurs : par exemple changer de sandbox ou de provider tout en gardant les mêmes outils.'),
    C('Seams','Donne un exemple de swap rendu possible par cette architecture.','Changer le provider filesystem/subprocess vers un sandbox distant peut déplacer Bash, PTY et LSP dans un autre monde d’exécution sans créer une version spécifique de chaque outil.'),

    C('Boucle agent','Quelle différence entre un step et un turn ?','Un step correspond à une requête modèle plus les outils qu’elle appelle. Un turn peut contenir zéro, un ou plusieurs steps jusqu’à ce qu’aucun travail ne reste dû.'),
    C('Boucle agent','Quel est le flux simplifié d’un turn ?','Prendre l’entrée de l’inbox → assembler prompt et schémas d’outils → agent/pre-step → requête LLM → message assistant → appels d’outils → résultats → éventuellement nouveau step → turn/end.'),
    C('Événements','Quelle différence entre Session events et Agent events ?','Les Session events sont des faits durables écrits dans le journal. Les Agent events décrivent ou interceptent le travail vivant en cours d’exécution.'),
    C('Événements','Que sont les capability events ?','Des événements attachés à une capacité comme fs/*, tools/* ou telemetry/* pour brancher politiques et adapters sans importer directement la boucle agent.'),

    C('Journal','Quelle est la source de vérité d’une session ?','Un journal append-only de SessionEvent. L’historique envoyé au modèle est dérivé de ce journal, pas stocké séparément.'),
    C('Journal','Que signifie la règle “Model-visible means logged” ?','Toute information visible par le modèle doit être reconstructible depuis le journal. Si un nouveau type de contexte devient visible au modèle, il faut un événement durable correspondant.'),
    C('Journal','Pourquoi conserver aussi les assistant/chunk bruts ?','Pour préserver la fidélité de replay et de l’interface ; fork, reprise, transcripts, télémétrie et persistance dérivent tous de ce flux.'),

    C('Inbox','Quelle différence entre followup, steer et inject sur un Agent ?','followup programme un nouveau turn ; steer vise le prochain step et peut réveiller l’agent ; inject ajoute du contexte au prochain pre-step sans réveiller un agent inactif.'),
    C('Inbox','Quels sont les deux grands targets de l’inbox ?','next-turn et next-step.'),

    C('Tools','Comment un outil devient-il disponible pour le modèle ?','Un plugin enregistre une ToolDefinition sur ctx.tools ; son schéma est projeté vers la requête modèle tandis que execute et les métadonnées host restent côté runtime.'),
    C('Tools','Quel est le pipeline d’exécution d’un outil ?','tools/pre-execute → gardes/politiques → tools/execute → tools/post-execute → finalizeContent éventuel → tools/result.'),
    C('Tools','À quoi sert ToolRestriction ?','À filtrer les outils hérités dans un scope avec allow/deny. Les restrictions s’intersectent et les registrations propres au scope restent exemptes.'),
    C('Tools','Quelle différence entre un tool parallel et exclusive ?','Un appel parallel peut chevaucher des siblings sûrs ; un appel exclusive s’exécute seul et forme une barrière d’ordre.'),

    C('Code Mode','Qu’est-ce que Code Mode ?','Un mode où le modèle écrit un programme exécuté par le code runtime et accède aux outils via des bindings générés, avec run_code comme transport principal.'),
    C('Code Mode','Pourquoi Code Mode est-il architecturalement intéressant ?','Il sépare le runtime de code, remplaçable, du registre d’outils consommé par le programme ; le provider d’exécution peut changer sans modifier le contrat côté modèle.'),

    C('Skills','Comment DeepSeek Harness traite-t-il les skills ?','Comme une capability family provider-neutral : des providers découvrent des instructions réutilisables et un outil expose au modèle un catalogue et un loader.'),
    C('Skills','Pourquoi cette séparation provider/consumer est-elle utile pour les skills ?','Les skills peuvent venir du filesystem, être embarquées ou venir d’un provider distant sans changer le contrat model-facing.'),

    C('Sous-agents','Quel est le principe du subsystem subagent ?','Un agent peut déléguer du travail à des enfants via plusieurs providers nommés qui peuvent coexister dans le même contexte.'),
    C('Sous-agents','Quels types de sous-agents sont déjà prévus ?','En-process fresh ou forké depuis l’historique, ACP, Codex app-server, Claude Code via SDK officiel, ou un autre Harness via SDK.'),
    C('Sous-agents','Pourquoi le provider de sous-agent est-il une seam importante ?','Le parent utilise une interface de délégation commune alors que l’enfant peut être local, forké, externe ou piloté par un autre produit.'),

    C('Humain','Quelles capacités structurent la collaboration humain-agent ?','Commandes, approbations one-shot, presets de permissions, questions utilisateur et tool ask-user.'),
    C('Sandbox','Quel est le rôle du subsystem sandbox ?','Appliquer une politique de confinement par session aux processus exécutés, avec une définition de service, des backends locaux et une politique durable de sandbox.'),
    C('Sandbox','Quel principe de sécurité se dégage de l’architecture ?','Les permissions, approbations et confinements sont des capacités explicites et remplaçables ; elles ne sont pas enfouies dans le code de la boucle agent.'),

    C('Auto-extension','Qu’a de particulier le dossier packages/extensions ?','Il expose au modèle des outils pour inspecter le runtime Cordis vivant, définir et exécuter des packages dynamiques écrits par le modèle, puis les retirer.'),
    C('Auto-extension','Pourquoi cette capacité est-elle puissante mais sensible ?','Elle permet à l’agent de modifier son propre runtime. Cela augmente fortement l’extensibilité, mais demande une politique stricte sur ce que le modèle peut inspecter, monter et exécuter.'),

    C('Écosystème','Quelles grandes familles existent au-delà du cœur ?','LLM, shell, terminal, code-runtime, sandbox, filesystem, LSP, skills, compaction, context, subagents, jobs, workflow, web, attachments, goals, planning, presets, hooks, sessions, settings, credentials, SDK, ACP et interface Web.'),
    C('Extension','Comment ajouter un nouveau provider de modèle ?','Enregistrer son adapter sur ctx.llm plutôt que modifier la boucle.'),
    C('Extension','Comment ajouter une nouvelle capacité visible par le modèle ?','Enregistrer un outil sur ctx.tools ; son schéma rejoindra l’assemblage du prompt.'),
    C('Extension','Comment donner à une seule session un jeu différent de capacités ?','Composer un agent preset ; une ligne de service propre à la session utilise un realm isolate.'),
    C('Extension','Comment ajouter du travail de fond ?','Enregistrer une capacité sur ctx.jobs ; les outils job_* permettent ensuite de collecter ou arrêter le travail.'),

    C('Lecture stratégique','Quelle différence conceptuelle majeure avec un framework d’agents monolithique ?','DeepSeek Harness pousse la modularité jusqu’à la boucle, aux providers et aux politiques : l’agent est une composition de capacités plutôt qu’un programme central auquel on ajoute quelques tools.'),
    C('Application','Quel premier prototype serait pertinent pour tester cette architecture avec des agents commerciaux ?','Créer un profile minimal avec persona commerciale, skills de qualification/entretien, un provider CRM outillé, permissions limitées et un sous-agent spécialisé ; remplacer les briques par patch plutôt que modifier le cœur.'),
    C('Phrase clé','Quelle phrase retenir de DeepSeek Harness ?','Le harness n’est pas la boucle : c’est l’architecture qui rend la boucle, les outils, les modèles, les données et les politiques composables et remplaçables.')
  ]);
})();
