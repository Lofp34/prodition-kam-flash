(()=>{
  if(window.__articleAgentPluginsLoaded)return;
  window.__articleAgentPluginsLoaded=true;

  function register(){
    const A=window.ArticleStudy;
    if(!A){setTimeout(register,50);return;}
    const C=(category,front,back)=>[category,front,back];

    A.addArticle('agent-plugins','Agent Plugins — format portable pour agents',{
      url:'https://agent-plugins.org/',
      source:'Agent Plugins · documentation officielle · spécification 1.0.0 · 2026',
      status:'Quiz prêt',
      description:'Un standard ouvert et neutre pour empaqueter des composants réutilisables qui étendent des agents IA : skills, serveurs MCP et extensions propres aux clients.',
      takeaway:'Agent Plugins ne remplace pas MCP ni les Agent Skills : il fournit une enveloppe portable avec un manifest, des emplacements fixes, des règles de découverte, de validation et d’isolation des erreurs.',
      learningGoals:[
        'Comprendre le rôle de plugin.json, skills/ et mcp.json.',
        'Distinguer ce qui est portable de ce qui reste propre au client.',
        'Identifier pourquoi ce format peut devenir utile pour OpenClaw et tes agents.'
      ]
    },[
      C('Liens','Quelles pages ouvrir en priorité pour comprendre Agent Plugins ?',`Accueil — https://agent-plugins.org/
Build an Agent Plugin — https://agent-plugins.org/plugin-authors
Plugin manifest — https://agent-plugins.org/plugin-authors/manifest
Skills — https://agent-plugins.org/plugin-authors/skills
MCP servers — https://agent-plugins.org/plugin-authors/mcp-servers
Client extensions — https://agent-plugins.org/plugin-authors/client-extensions
Implement a client — https://agent-plugins.org/client-implementers
Loading and discovery — https://agent-plugins.org/client-implementers/loading-and-discovery
MCP runtime — https://agent-plugins.org/client-implementers/mcp-runtime
Conformance checklist — https://agent-plugins.org/client-implementers/conformance
Specification — https://agent-plugins.org/specification
JSON Schemas — https://agent-plugins.org/schemas
Compatible clients — https://agent-plugins.org/compatible-clients`),

      C('Définition','Agent Plugins, c’est quoi en une phrase ?','Un format de package portable pour regrouper des composants réutilisables qui étendent des agents IA, notamment des Agent Skills et des serveurs MCP.'),
      C('Problème','Quel problème le standard cherche-t-il à résoudre ?','Chaque client agentique a tendance à inventer son propre format de plugin. Les auteurs doivent donc réarranger ou dupliquer les mêmes composants pour plusieurs clients.'),
      C('Portabilité','Quelle est la promesse centrale ?','Définir un socle commun minimal : une structure prévisible que plusieurs clients peuvent découvrir, valider et charger de manière cohérente.'),
      C('Limite','Qu’est-ce qu’Agent Plugins ne standardise pas ?','Il ne standardise pas toute l’expérience : installation, marketplace, permissions, sandboxing, UI, cache, mises à jour et comportement interne restent sous le contrôle du client.'),
      C('Structure','À quoi ressemble un Agent Plugin typique ?','Un dossier avec un plugin.json obligatoire, puis éventuellement un dossier skills/, un fichier mcp.json et des dossiers d’extensions nommés par namespace inversé.'),
      C('Manifest','Quel fichier est obligatoire dans un plugin ?','plugin.json, à la racine du plugin. Il définit l’identité portable du plugin et la version de contrat via le champ $schema.'),
      C('Manifest','Quels sont les deux champs requis dans plugin.json ?','$schema et name. $schema sélectionne le contrat de validation ; name identifie le plugin.'),
      C('Nommage','Quelles contraintes pèsent sur le nom du plugin ?','Le nom fait 1 à 64 caractères, en minuscules ASCII, chiffres, tirets ou points. Il commence et finit par un caractère alphanumérique et évite les doubles séparateurs.'),
      C('Schéma fermé','Que signifie “manifest schema is closed” ?','Les champs portables de premier niveau sont limités à ceux prévus par la spécification. Les données propres à un client doivent aller dans extensions.'),
      C('Skills','Où place-t-on les Agent Skills ?','Dans le dossier skills/, chaque skill étant un enfant direct contenant un fichier nommé exactement SKILL.md.'),
      C('Skills','Le client recherche-t-il récursivement les skills ?','Non. Il découvre uniquement les enfants immédiats de skills/ qui contiennent un SKILL.md régulier.'),
      C('Skills','Que se passe-t-il si une skill est invalide ?','Le client saute cette skill, la signale si possible, puis continue à charger les autres skills et autres types de composants.'),
      C('MCP','À quoi sert mcp.json ?','À décrire les serveurs MCP du plugin dans un format portable que le client mappe ensuite vers sa configuration MCP native.'),
      C('MCP','Quels sont les champs de premier niveau de mcp.json ?','$schema et mcpServers. Le document est volontairement fermé.'),
      C('Transports','Quels transports MCP sont couverts ?','stdio, streamable-http et sse. stdio et streamable-http sont les transports principaux ; sse est un transport historique optionnel.'),
      C('stdio','Quelle règle importante s’applique à command en stdio ?','command est un seul token exécutable, pas une commande shell complète. Les arguments doivent être passés séparément dans args.'),
      C('Variables','Quelles variables le client fournit-il aux serveurs stdio ?','PLUGIN_ROOT, qui pointe vers la racine résolue du plugin, et PLUGIN_DATA, un dossier d’écriture persistant dédié au plugin.'),
      C('Secrets','Pourquoi ne faut-il pas mettre de secrets dans les headers MCP distants ?','Les headers configurés sont des données visibles du package. Agent Plugins 1.0.0 ne définit pas de champ portable pour OAuth ou références de credentials.'),
      C('Extensions','À quoi servent les client extensions ?','À permettre à un client précis d’ajouter ses propres données, fichiers ou comportements sans agrandir le cœur portable du standard.'),
      C('Namespace','Comment éviter les collisions entre extensions clientes ?','En utilisant des namespaces de type domaine inversé, par exemple com.example.client.'),
      C('Découverte','Quel est l’ordre général de chargement côté client ?','Résoudre la racine du plugin, charger et valider plugin.json, rejeter les erreurs fatales, découvrir les composants supportés, appliquer les frontières d’isolation, puis traiter les extensions connues.'),
      C('Sécurité','Pourquoi la frontière du package est-elle centrale ?','Tous les fichiers lus ou exécutés doivent rester dans la racine résolue du plugin. Les chemins, symlinks ou équivalents ne doivent pas permettre de sortir du package.'),
      C('Isolation','Quelle est la logique d’isolation des erreurs ?','Appliquer la frontière la plus étroite : rejeter tout le plugin pour un manifest fatal, désactiver un type de composant, sauter une skill ou un serveur MCP isolé si l’erreur est locale.'),
      C('Client conforme','Que doit supporter au minimum un client conforme ?','Il doit charger depuis un dossier, valider plugin.json, faire respecter les frontières du package et supporter au moins un type de composant : skills ou MCP servers.'),
      C('Compatibilité','Quels clients sont déjà listés comme compatibles ?','VS Code, Cursor, GitHub Copilot, ChatGPT & Codex et Kiro sont listés avec support Agent Skills et transports MCP selon les cas.'),
      C('Lecture stratégique','Pourquoi ce standard est intéressant pour tes agents ?','Il peut permettre de packager des capacités OpenClaw de façon portable : une skill claire, un serveur MCP associé, un manifest, et des extensions spécifiques sans enfermer tout le système dans un seul client.'),
      C('Architecture','Comment penser Agent Plugins par rapport à MCP ?','MCP standardise la connexion aux outils ; Agent Plugins standardise le packaging et la découverte de composants, dont des serveurs MCP.'),
      C('Architecture','Comment penser Agent Plugins par rapport aux Agent Skills ?','Agent Skills définit le format d’une compétence ; Agent Plugins définit où ces skills vivent dans un package et comment elles sont découvertes.'),
      C('Décision','Quand créer un Agent Plugin plutôt qu’un simple script ?','Quand la capacité doit être réutilisable, distribuable, découvrable par plusieurs clients, et structurée avec des règles de chargement plutôt que cachée dans un dossier ad hoc.'),
      C('Application OpenClaw','Quel serait un bon premier test pour OpenClaw ?','Créer un plugin “sales-coach” avec plugin.json, une skill de préparation d’entretien commercial, et éventuellement un mcp.json exposant un serveur d’accès aux playbooks ou au CRM.'),
      C('Phrase clé','Quelle phrase retenir ?','Agent Plugins n’est pas une nouvelle intelligence : c’est un format de distribution propre pour rendre les capacités d’agents portables, découvrables et isolables.')
    ]);
  }

  register();
})();
