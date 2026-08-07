(()=>{
  const A=window.ArticleStudy;
  if(!A)return;
  const C=(category,front,back)=>[category,front,back];

  A.addArticle('audio-epstein-fortune','Audio — L’argent d’Epstein 1/4 : la fortune sans grand livre',{
    badge:'Audio',
    kicker:'Audio à l’étude',
    primaryLabel:'Écouter l’audio ↗',
    canonicalLabel:'Lire le texte source ↗',
    url:'https://lofp34.github.io/argent-epstein-audio/audio/ep01-fortune-sans-grand-livre.mp3',
    canonicalUrl:'https://l0g.fr/posts/argent-epstein-fortune-sans-grand-livre/',
    source:'l0g.fr · 7 août 2026 · épisode 1/4 · 32 min 14 s',
    status:'Quiz prêt',
    description:'Reconstituer ce qui est réellement documenté sur la fortune de Jeffrey Epstein, sans confondre salaires, honoraires, prêts, restitutions et valorisations patrimoniales.',
    takeaway:'La fortune d’Epstein n’est ni totalement mystérieuse ni totalement expliquée : les archives donnent des points d’ancrage solides, mais aucun grand livre continu permettant de relier toutes les périodes sans doubles comptes.',
    note:'Le site audio précise que l’épisode reprend intégralement le texte de l’article l0g.fr, URL retirées à l’oral. Les cartes sont donc construites à partir de ce texte source exact.',
    learningGoals:[
      'Distinguer fait établi, allégation, projet, paiement, prêt et valorisation patrimoniale.',
      'Retenir les principaux blocs documentés : Wexner, Financial Trust, Southern Trust, Leon Black et Highbridge.',
      'Comprendre pourquoi plusieurs chiffres célèbres ne doivent pas être additionnés.'
    ]
  },[
    C('Liens',`Quels sont les deux liens à garder pour cet épisode ?`,`Audio : https://lofp34.github.io/argent-epstein-audio/audio/ep01-fortune-sans-grand-livre.mp3\n\nTexte source : https://l0g.fr/posts/argent-epstein-fortune-sans-grand-livre/`),
    C('Thèse',`Quelle est la thèse centrale de l’épisode ?`,`Le problème n’est pas l’absence totale de traces sur la fortune d’Epstein, mais l’absence d’un grand livre continu : les sources publiques mélangent des objets comptables de nature et de périmètre différents.`),
    C('Méthode',`Qu’est-ce que l’auteur appelle une « comptabilité de preuve » ?`,`Séparer ce qui est établi par des pièces, ce qui est seulement allégué et ce qu’aucun document public ne permet encore de relier.`),
    C('Bear Stearns',`Quel salaire annuel est documenté chez Bear Stearns en avril 1979 ?`,`42 000 dollars par an.`),
    C('Bear Stearns',`Pourquoi le prêt de 20 000 dollars de 1979 ne prouve-t-il pas un bonus de 20 000 dollars ?`,`Parce que le document prouve un prêt remboursable sur un bonus futur, pas le montant de ce bonus ni une rémunération annuelle supérieure.`),
    C('Angle mort',`Quel est le premier grand trou documentaire dans la chronologie des revenus ?`,`La période 1981–1991 : pas de W-2 public, pas de relevé de commissions ni de liste de clients réconciliée permettant d’attribuer un montant fiable.`),
    C('Wexner',`Quel pouvoir Leslie Wexner avait-il accordé à Epstein ?`,`Une procuration très large lui permettant d’agir en son nom dans ses affaires financières. Son existence et son ampleur sont documentées, mais la copie signée complète reste manquante publiquement.`),
    C('Wexner',`Comment faut-il qualifier les « plusieurs centaines de millions de dollars » qu’Epstein aurait détournés à Wexner ?`,`Comme une allégation rapportée par les procureurs à partir du proffer des avocats de Wexner, pas comme un dommage établi par jugement ou audit contradictoire.`),
    C('Wexner',`Quel montant de restitution est documenté par l’accord privé de 2008 ?`,`100 millions de dollars.`),
    C('Double compte',`Pourquoi ne faut-il pas additionner mécaniquement 100 M$, 46,7 M$ et environ 35 M$ dans le dossier Wexner ?`,`Parce que les transferts de 46,7 M$ et 35 M$ peuvent être des composantes ou des suites de la restitution globale de 100 M$. Les écritures complètes permettant de les distinguer ne sont pas publiques.`),
    C('Immobilier',`Pourquoi le 9 East 71st Street ne doit-il pas être présenté simplement comme un cadeau gratuit de Wexner à Epstein ?`,`Le dossier transactionnel décrit une vente en 1998 d’environ 20 M$, avec environ 10 M$ en numéraire et 10 M$ financés par billet. Le bordereau à zéro dollar de 2011 correspond à un transfert ultérieur entre entités liées à Epstein.`),
    C('Financial Trust',`Que sait-on des honoraires de Financial Trust entre 2000 et 2006 ?`,`Les états financiers attribuent environ 300 M$ d’honoraires à Financial Trust, dont 66 M$ en 2006, mais sans grand livre client public permettant d’identifier chaque payeur.`),
    C('Financial Trust',`Pourquoi Financial Trust reste-t-elle beaucoup plus opaque que Southern Trust ?`,`Les revenus annuels sont visibles, mais pas la ventilation complète par clients, contrats, factures et virements.`),
    C('Southern Trust',`Quel total d’honoraires Southern Trust comptabilise-t-elle entre 2013 et 2017 ?`,`183 999 980 dollars.`),
    C('Southern Trust',`Comment les 183 999 980 dollars de Southern Trust se répartissent-ils ?`,`158 M$ de Leon Black + 24 999 980 $ liés à Edmond de Rothschild + 1 M$ de Steven Sinofsky.`),
    C('Southern Trust',`Quels sont les honoraires annuels de Southern Trust de 2013 à 2017 ?`,`2013 : 51 M$ ; 2014 : 70 M$ ; 2015 : 54 999 980 $ ; 2016 : 0 ; 2017 : 8 M$.`),
    C('Précision',`Que prouve exactement la réconciliation de Southern Trust ?`,`Qu’aucun revenu du poste fee income des cinq exercices disponibles ne reste sans attribution. Elle ne prouve pas que ces trois payeurs résument toutes les relations financières d’Epstein.`),
    C('Leon Black',`Quel montant Dechert retient-il comme honoraires versés par Leon Black à Epstein ?`,`158 millions de dollars entre 2013 et 2017 : 50 M$ en 2013, 70 M$ en 2014, 30 M$ en 2015, 0 en 2016 et 8 M$ en 2017.`),
    C('Leon Black',`Pourquoi voit-on circuler 158, 164,3, environ 166 et 169,8 millions de dollars ?`,`Parce que les sources ne mesurent pas le même périmètre : honoraires Dechert, virements bancaires 2013–2017, narration arrondie du Sénat et tableau bancaire élargi à 2012.`),
    C('Leon Black',`Quelle différence explique l’écart entre 169,8 M$ et 158 M$ ?`,`11,8 M$ : 5,5 M$ en 2012 et 6,3 M$ en 2016, deux montants présents dans le tableau bancaire mais hors des honoraires Dechert retenus pour 2013–2017.`),
    C('Prêts',`Pourquoi les 30,5 M$ avancés en 2017 à des entités liées à Leon Black ne doivent-ils pas être ajoutés aux honoraires ?`,`Ce sont des prêts, donc des créances au bilan d’Epstein, pas du chiffre d’affaires. 10 M$ ont été remboursés et 20,5 M$ restaient dus à sa mort.`),
    C('Highbridge',`Quel paiement Highbridge est effectivement documenté ?`,`15 millions de dollars versés à Financial Trust en décembre 2004 pour des conseils en fusion-acquisition.`),
    C('Highbridge',`Pourquoi les 2,25 M$ prévus dans un autre projet Highbridge ne sont-ils pas retenus comme revenu ?`,`La page de signature disponible est vide et aucun virement n’est produit : c’est une proposition contractuelle, pas un paiement établi.`),
    C('Patrimoine',`Que montrent les valorisations internes de 2012 et 2014 ?`,`Environ 289,0 M$ d’actifs au 31 juillet 2012 et 340,9 M$ en janvier 2014. Ce sont des documents de gestion internes, pas des comptes audités.`),
    C('Règle de lecture',`Quelle règle méthodologique résume le mieux l’épisode ?`,`Un projet n’est pas un contrat ; une facture n’est pas un paiement ; un virement n’est pas nécessairement un revenu ; une valeur d’actif n’est pas du cash.`),
    C('Pièces manquantes',`Quels documents permettraient réellement de fermer le trou comptable ?`,`Les grands livres, relevés bancaires, déclarations fiscales complètes, contrats exécutés et accords de restitution permettant de suivre les flux et d’éliminer les doubles comptes.`),
    C('Conclusion',`Où se situe le principal trou comptable selon l’épisode ?`,`Plutôt dans les périodes Wexner et Financial Trust, où les montants sont agrégés, privés ou allégués, que dans Southern Trust et Leon Black, beaucoup mieux réconciliés.`)
  ]);
})();
