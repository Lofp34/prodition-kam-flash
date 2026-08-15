(()=>{
  const D=window.FC_DATA;
  const raw={
    id:'rhetorique-fondamentaux',
    folder:'rhetorique',
    badge:'Rhétorique',
    title:'Rhétorique — 01. Fondamentaux',
    subtitle:'32 cartes pour comprendre la situation, l’auditoire, les genres, les canons et les moyens de persuasion.',
    description:'Acquérir le vocabulaire et les modèles mentaux indispensables avant d’argumenter ou de travailler le style.',
    phrases:[
      'La rhétorique ne consiste pas à parler joliment : elle organise une réponse adaptée à une situation.',
      'On ne persuade pas un public abstrait, mais un auditoire situé, avec ses attentes et ses contraintes.',
      'Ethos, pathos et logos fonctionnent ensemble.',
      'La technique doit rester compatible avec la liberté de jugement de l’auditoire.'
    ],
    cards:[
      ['Sources','Quelles ressources garder pour approfondir les fondamentaux de la rhétorique ?','Aristote, Rhétorique :\nhttps://classics.mit.edu/Aristotle/rhetoric.1.i.html\n\nStanford Encyclopedia — Aristotle’s Rhetoric :\nhttps://plato.stanford.edu/entries/aristotle-rhetoric/\n\nSilva Rhetoricae — structure générale :\nhttps://rhetoric.byu.edu/trees.htm\nhttps://rhetoric.byu.edu/Canons/Canons.htm\nhttps://rhetoric.byu.edu/Persuasive%20Appeals/Persuasive%20Appeals.htm\nhttps://rhetoric.byu.edu/Branches%20of%20Oratory/Branches%20of%20Oratory.htm\n\nWriting Commons — situation rhétorique :\nhttps://writingcommons.org/section/rhetoric/rhetorical-situation/\n\nStanford Encyclopedia — argumentation et nouvelle rhétorique :\nhttps://plato.stanford.edu/entries/argument/'],
      ['Définition','Qu’est-ce que la rhétorique selon le modèle aristotélicien ?','La capacité de discerner, dans chaque situation, les moyens de persuasion disponibles. Elle ne garantit pas de convaincre : elle cherche méthodiquement ce qui peut rendre un discours pertinent et persuasif.'],
      ['Éthique','Quelle différence entre rhétorique et manipulation ?','La rhétorique peut éclairer ou tromper. Une pratique éthique expose des raisons vérifiables, reconnaît les objections, évite la contrainte cachée et respecte la capacité de l’auditoire à juger. La manipulation cherche au contraire à contourner ce jugement.'],
      ['Disciplines','Quelle différence entre logique, dialectique et rhétorique ?','La logique étudie surtout la validité des inférences. La dialectique éprouve des thèses par l’échange d’arguments. La rhétorique adapte des raisons, une forme et une présence à un auditoire concret dans une situation donnée.'],
      ['Situation rhétorique','Qu’est-ce qu’une situation rhétorique ?','L’ensemble dynamique formé par un problème appelant une réponse, un ou plusieurs auditoires, un objectif, un contexte, des contraintes, un moment et un médium. Le même message change de sens quand l’un de ces éléments change.'],
      ['Situation rhétorique','Qu’est-ce que l’exigence rhétorique ?','Le problème, l’urgence ou l’imperfection qui appelle une prise de parole. Une bonne préparation commence par formuler précisément : qu’est-ce qui doit changer grâce au discours ?'],
      ['Auditoire','Qu’est-ce qu’un auditoire rhétorique ?','Les personnes capables d’être affectées par le discours et, éventuellement, d’agir sur la situation. Il faut distinguer le public visible, les décideurs réels, les opposants, les relais et les absents concernés.'],
      ['Contraintes','Que sont les contraintes rhétoriques ?','Tout ce qui limite ou oriente la réponse : croyances, règles, temps, format, réputation, vocabulaire admis, rapports de pouvoir, preuves disponibles, état émotionnel et événements antérieurs.'],
      ['But','Comment formuler le but d’un discours ?','Décrire la transformation attendue : comprendre une idée, modifier une croyance, choisir une option, accomplir une action, accorder sa confiance ou retenir un message. « Informer » est souvent trop vague.'],
      ['Médium','Pourquoi le médium et le genre comptent-ils ?','Un entretien, un email, une conférence, une vidéo et un débat n’autorisent pas la même longueur, le même rythme ni le même degré d’explicitation. Le genre crée des attentes que l’orateur peut respecter ou détourner consciemment.'],
      ['Kairos','Qu’est-ce que le kairos ?','Le moment opportun et la juste mesure de l’intervention. Une raison solide peut échouer si elle arrive trop tôt, trop tard, trop longuement ou dans un contexte où l’auditoire ne peut pas encore l’entendre.'],
      ['Decorum','Qu’est-ce que le decorum ou l’aptum ?','L’adéquation entre le sujet, l’auditoire, l’orateur, le moment et le style. Ce n’est pas la conformité servile : c’est le choix d’une forme proportionnée à l’effet recherché.'],
      ['Genres','Quels sont les trois grands genres de la rhétorique classique ?','Le judiciaire, qui accuse ou défend à propos du passé ; le délibératif, qui conseille ou déconseille pour l’avenir ; l’épidictique, qui loue ou blâme dans le présent et renforce des valeurs communes.'],
      ['Genre judiciaire','Quelle question domine dans le genre judiciaire ?','Que s’est-il passé, qui en est responsable et était-ce juste ou injuste ? On y travaille les faits passés, les preuves, les intentions, les qualifications et les circonstances.'],
      ['Genre délibératif','Quelle question domine dans le genre délibératif ?','Que devons-nous faire ? Il compare des futurs possibles selon l’utile, le nuisible, le faisable, le souhaitable, les risques et les conséquences.'],
      ['Genre épidictique','À quoi sert le genre épidictique ?','À rendre visibles des qualités ou des fautes, à célébrer, commémorer, remercier ou condamner. Il façonne les valeurs partagées et l’identité d’un groupe, même lorsqu’il ne demande aucune décision immédiate.'],
      ['Canons','Quels sont les cinq canons de la rhétorique ?','Invention : trouver les arguments.\nDisposition : les ordonner.\nÉlocution : choisir la forme verbale.\nMémoire : rendre le discours disponible et mémorable.\nAction : le livrer par la voix, le corps et la présence.'],
      ['Invention','Qu’est-ce que l’invention ?','Le travail de recherche : définir la question, recueillir les faits, explorer les topiques, imaginer les objections et sélectionner les arguments adaptés. Inventer signifie ici découvrir, non fabriquer.'],
      ['Disposition','Qu’est-ce que la disposition ?','L’organisation stratégique du discours. Elle décide ce qui vient d’abord, ce qui doit être expliqué, prouvé, concédé, réfuté et retenu à la fin. L’ordre produit lui-même un effet de sens.'],
      ['Élocution','Qu’est-ce que l’élocution ?','Le choix des mots, des phrases, du registre, du rythme et des figures. Le style ne décore pas une pensée déjà terminée : il donne à la pensée une forme perceptible et adaptée.'],
      ['Mémoire','Pourquoi la mémoire est-elle plus que l’apprentissage par cœur ?','Elle constitue une réserve d’idées, d’exemples et de formulations mobilisables. Elle permet aussi de parler avec souplesse, de s’adapter et de construire un message que l’auditoire pourra retenir.'],
      ['Action','Que comprend l’action ou delivery ?','La voix, l’articulation, le débit, le volume, les pauses, le regard, les gestes, la posture et l’usage de l’espace. Ces éléments modifient la crédibilité et l’interprétation du contenu.'],
      ['Logos','Qu’est-ce que le logos ?','L’appel à la raison : définitions, faits, exemples, relations de cause, comparaisons, probabilités et enchaînements d’arguments. Logos ne signifie pas froideur : il désigne la structure intelligible du discours.'],
      ['Ethos','Qu’est-ce que l’ethos ?','L’image de caractère construite par le discours : compétence, prudence, honnêteté, bienveillance et cohérence. La réputation préalable compte, mais l’ethos se confirme ou se détruit dans la manière de parler.'],
      ['Pathos','Qu’est-ce que le pathos ?','Le travail sur les dispositions affectives de l’auditoire : intérêt, confiance, crainte, indignation, espoir, compassion. Il ne remplace pas la raison ; il rend certains enjeux saillants et oriente l’attention.'],
      ['Preuves','Quelle différence entre preuves intrinsèques et extrinsèques ?','Les preuves intrinsèques sont produites par l’art du discours : ethos, pathos et logos. Les preuves extrinsèques existent avant lui : contrats, témoignages, documents, données ou lois. L’orateur doit néanmoins les sélectionner et les interpréter.'],
      ['Enthymème','Qu’est-ce qu’un enthymème ?','Un raisonnement rhétorique fondé sur des prémisses probables ou admises par l’auditoire, dont une étape reste souvent implicite. L’analyser consiste à reconstruire la prémisse manquante et à demander si elle est acceptable.'],
      ['Exemple','Quel rôle joue l’exemple ou paradigma ?','Il soutient une conclusion générale à partir d’un cas, d’un précédent, d’une comparaison historique ou d’un récit. Sa force dépend de sa pertinence et de sa représentativité, pas de son caractère spectaculaire.'],
      ['Topiques','Que sont les topiques ou lieux communs de l’invention ?','Des familles de questions pour trouver des arguments : définition, comparaison, cause et effet, contraire, degré, circonstances, possible et impossible, témoignage, précédent. Ce sont des heuristiques, pas des conclusions toutes faites.'],
      ['Auditoires','Quelle distinction Perelman fait-il entre auditoire particulier et auditoire universel ?','L’auditoire particulier est le public concret à convaincre. L’auditoire universel est un idéal normatif construit par l’orateur pour tester si ses raisons pourraient paraître raisonnables au-delà de son camp. Ce n’est pas la totalité réelle de l’humanité.'],
      ['Analyse','Quelle grille simple utiliser pour analyser un discours ?','1. Quelle exigence ?\n2. Quel auditoire réel ?\n3. Quel but ?\n4. Quelles contraintes et quel kairos ?\n5. Quelle thèse ?\n6. Quels logos, ethos et pathos ?\n7. Quelle disposition et quel style ?\n8. Qu’est-ce qui est tu ou présupposé ?\n9. Quel effet final ?'],
      ['Éthique','Quel test éthique appliquer avant de persuader ?','Le discours resterait-il défendable si l’auditoire connaissait mes intentions, mes sources, mes incertitudes et mes techniques ? Si la persuasion dépend de leur dissimulation, il faut revoir la stratégie.']
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
