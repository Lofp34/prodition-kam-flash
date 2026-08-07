(()=>{
  const A=window.ArticleStudy;
  if(!A)return;
  const C=(category,front,back)=>[category,front,back];

  A.addArticle('audio-epstein-banques','Audio — L’argent d’Epstein 2/4 : ce que les banques voyaient',{
    badge:'Audio',
    kicker:'Audio à l’étude',
    primaryLabel:'Écouter l’audio ↗',
    canonicalLabel:'Lire le texte source ↗',
    url:'https://lofp34.github.io/argent-epstein-audio/audio/ep02-ce-que-les-banques-voyaient.mp3',
    canonicalUrl:'https://l0g.fr/posts/argent-epstein-ce-que-les-banques-voyaient/',
    source:'l0g.fr · 7 août 2026 · épisode 2/4 · 29 min 53 s',
    status:'Quiz prêt',
    description:'Comprendre ce que JPMorgan, Deutsche Bank, BNY Mellon et Bank of America voyaient, comment les alertes ont été traitées et pourquoi les grands agrégats ne doivent pas être additionnés.',
    takeaway:'Le dossier décrit moins une absence de signaux qu’une succession d’alertes, de décisions de maintien et de signalements massifs déposés après coup. Le problème central est la durée pendant laquelle des signaux connus sont restés compatibles avec la poursuite des affaires.',
    note:'Le site audio précise que l’épisode reprend intégralement le texte de l’article l0g.fr. Les cartes sont construites à partir de ce texte source exact, plus fiable qu’une transcription acoustique.',
    learningGoals:[
      'Comprendre ce qu’un SAR prouve — et ce qu’il ne prouve pas.',
      'Suivre la chronologie JPMorgan → Deutsche Bank → signalements rétrospectifs.',
      'Éviter les doubles comptes entre banques, flux, sanctions et règlements civils.'
    ]
  },[
    C('Liens',`Quels sont les deux liens à garder pour cet épisode ?`,`Audio : https://lofp34.github.io/argent-epstein-audio/audio/ep02-ce-que-les-banques-voyaient.mp3\n\nTexte source : https://l0g.fr/posts/argent-epstein-ce-que-les-banques-voyaient/`),
    C('Thèse',`Quelle est la thèse centrale de l’épisode ?`,`Les banques ne fonctionnaient pas dans un vide informationnel : des signaux existaient depuis longtemps, mais leurs conséquences sont restées limitées et les plus gros signalements sont surtout intervenus après l’arrestation de 2019.`),
    C('SAR',`Un SAR est-il la preuve qu’un crime a été commis ?`,`Non. Un Suspicious Activity Report signale une activité jugée suspecte ; ce n’est ni une accusation, ni une condamnation, ni la preuve que chaque transaction signalée était illicite.`),
    C('SAR',`Pourquoi ne peut-on pas simplement comparer la date d’une transaction à celle du SAR pour conclure à un retard illégal ?`,`Le délai court à partir du moment où la banque détecte les faits atteignant le seuil de soupçon : 30 jours en principe, jusqu’à 60 si le suspect n’est pas identifié. La date exacte de détection interne est rarement publique.`),
    C('Double compte',`Pourquoi ne faut-il pas additionner les agrégats de JPMorgan, Deutsche Bank, BNY Mellon et Bank of America ?`,`Le même virement peut apparaître chez la banque du payeur, celle du bénéficiaire et une banque correspondante. Additionner les agrégats peut compter plusieurs fois le même argent.`),
    C('JPMorgan',`Quand JPMorgan dépose-t-elle son premier SAR lié à Epstein ?`,`Le 18 avril 2002, pour 194 300 dollars d’activité signalée.`),
    C('JPMorgan',`Quel montant total couvrent les sept SAR JPMorgan déposés avant les deux grands dépôts de 2019 ?`,`4 316 424 dollars.`),
    C('JPMorgan',`Pourquoi l’importance commerciale de la relation compte-t-elle dans l’analyse ?`,`Les documents montrent une relation très rentable : au moins 142 M$ de soldes en 2009, Epstein parmi les grands clients de la banque privée en 2012, et plus de 8,1 M$ de commissions estimées entre 2009 et 2014. Cela montre un arbitrage dans une relation importante, sans prouver que la conformité ait été achetée.`),
    C('Espèces',`Quel total de retraits d’espèces est recensé chez JPMorgan entre 2002 et 2013 ?`,`7 159 475 dollars, avec des retraits chaque année.`),
    C('Espèces',`Que montre l’épisode des retraits de 160 000 dollars en 2012 ?`,`Le banquier John Duffy demande à Epstein d’utiliser un compte lié à l’aviation, Epstein disant acheter du carburant en espèces. La pièce montre un déplacement de catégorie de compte, pas la preuve d’une intention de contourner une déclaration.`),
    C('Organisation',`Que révèle la découverte en 2013 d’environ 800 000 dollars de retraits non remontés à la conformité ?`,`Une fracture organisationnelle : la banque possédait les données, mais les équipes commerciales et de conformité ne leur attribuaient pas nécessairement la même signification.`),
    C('Décision',`Quelle décision est documentée en 2011 chez JPMorgan ?`,`Après revue interne, il est décidé de conserver Epstein comme client.`),
    C('Sortie JPMorgan',`Que se passe-t-il en 2013 après la fermeture de la relation directe avec Epstein ?`,`La banque ferme la relation directe mais autorise encore certaines activités où Epstein intervient via des comptes de tiers, notamment Leon Black.`),
    C('SAR 2019',`Quels sont les deux grands dépôts JPMorgan de 2019 ?`,`13 août : 469 virements pour 200 979 535 $. 26 septembre : 4 725 virements pour 1 081 819 653 $. Les deux fenêtres commencent le 1er octobre 2003.`),
    C('SAR 2019',`Pourquoi 1,2828 milliard de dollars ne doit-il pas être présenté comme un total unique dédoublonné ?`,`Les deux SAR se recouvrent presque entièrement dans le temps et le second est décrit comme un dépôt amendé ou élargi. Sans la liste des transactions, on ne sait pas quelle part du premier est incluse dans le second.`),
    C('SAR 2019',`Que mesure le milliard du SAR élargi de JPMorgan ?`,`Un volume facial cumulé de virements signalés, pas la fortune nette d’Epstein, ses revenus ni le produit démontré de crimes.`),
    C('Deutsche Bank',`Dans quelles conditions Deutsche Bank accueille-t-elle Epstein en 2013 ?`,`Le dossier mentionne sa condamnation et son statut de délinquant sexuel. La note commerciale anticipe 100 à 300 M$ de flux et 2 à 4 M$ de revenus annuels. Le client est classé à haut risque.`),
    C('Deutsche Bank',`Quel est le défaut majeur de la décision de maintien de 2015 ?`,`Des conditions de surveillance renforcée sont fixées, mais elles ne sont transmises ni au chargé de relation ni aux équipes de surveillance transactionnelle.`),
    C('Normalisation',`Que signifie l’idée que « l’anormal devient le profil du client » ?`,`Des alertes sont refermées parce que certains paiements sont considérés comme habituels pour Epstein. La répétition du comportement finit par être utilisée comme justification de sa normalité.`),
    C('Espèces Deutsche',`Que montrent les 97 retraits de 7 500 dollars effectués par un avocat d’Epstein ?`,`Ils totalisent 727 500 dollars et correspondent à la limite appliquée aux retraits par un tiers. Des échanges internes examinent un possible structuring ; avec une opération de 100 000 dollars en 2018, les espèces dépassent 800 000 dollars sur la relation Deutsche.`),
    C('Sortie Deutsche',`Pourquoi faut-il distinguer décision de sortie, notification et fermeture réelle des comptes ?`,`La lettre de résiliation date du 21 décembre 2018, mais certains comptes ou services seraient restés actifs jusqu’à l’arrestation de juillet 2019.`),
    C('Deutsche Bank',`Quel volume les SAR rétrospectifs de Deutsche Bank couvrent-ils selon le rapport sénatorial de 2026 ?`,`Plus de 250 millions de dollars de virements entre 2013 et 2019. Un sous-ensemble de 1 140 virements pour 147 M$ est inclus dans ce total et ne doit pas être ajouté une seconde fois.`),
    C('BNY Mellon',`Quel agrégat est associé au dépôt BNY Mellon de 2019 ?`,`270 virements entrants et sortants pour 378 millions de dollars, selon une lettre du Sénat ; la période exacte et la liste complète ne sont pas publiques.`),
    C('BNY Mellon',`Pourquoi la chaîne BNY → JPMorgan → Air Ghislaine → Sikorsky est-elle importante ?`,`Elle montre qu’un même flux peut apparaître dans plusieurs grands livres : 7,4 M$ sont transférés de BNY vers Maxwell chez JPMorgan, puis 7,4 M$ vers Air Ghislaine, puis 7,3 M$ vers Sikorsky. Ce n’est pas trois fois de l’argent nouveau.`),
    C('Bank of America',`Quel rôle Bank of America joue-t-elle dans le dossier présenté ?`,`Elle apparaît surtout comme banque des comptes contrôlés par Leon Black envoyant des fonds vers Financial Trust puis Southern Trust, plutôt que comme banque principale d’Epstein.`),
    C('Bank of America',`Quel montant le Sénat reconstruit-il pour les virements liés à Leon Black via Bank of America ?`,`169,8 millions de dollars entre 2012 et 2017.`),
    C('Bank of America',`Quand les SAR Bank of America cités dans l’article sont-ils déposés ?`,`En 2020, plusieurs années après les virements et après la mort d’Epstein.`),
    C('Catégories',`Quelles trois catégories ne faut-il pas mélanger ?`,`Les transactions signalées dans les SAR, les pénalités réglementaires et les règlements civils.`),
    C('Sanctions',`Pourquoi l’amende NYDFS de 150 M$ contre Deutsche Bank ne mesure-t-elle pas les flux Epstein ?`,`Parce qu’elle couvre simultanément des défaillances liées à Epstein, FBME Bank et Danske Bank Estonia. Elle n’est pas un agrégat de transactions Epstein.`),
    C('Conclusion',`Quelles cinq idées principales le dossier bancaire permet-il d’établir ?`,`1) JPMorgan signale dès 2002. 2) Des décideurs maintiennent la relation en 2011 et certaines activités en 2013. 3) Deutsche Bank accepte un client à haut risque et applique mal ses propres conditions. 4) Les deux banques observent durablement des schémas sensibles sans que chaque opération soit prouvée illicite. 5) Les déclarations les plus massives sont rétrospectives.`),
    C('Pièces manquantes',`Que manque-t-il pour passer de l’histoire des contrôles à une comptabilité complète ?`,`Les listes de transactions de chaque SAR, les identifiants des comptes, les dates exactes de détection interne et les décisions reliant chaque alerte à un dépôt — ou à son absence.`),
    C('Phrase clé',`Quel est le scandale démontrable selon la conclusion de l’épisode ?`,`Pas un nombre rond de milliards, mais la durée pendant laquelle des signaux connus ont pu rester administrativement compatibles avec la poursuite des affaires.`)
  ]);
})();
