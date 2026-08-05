(()=>{
  const A=window.ArticleStudy;
  if(!A)return;
  const C=(category,front,back)=>[category,front,back];
  A.addArticle('mindbranches','Post Mindbranches',{
    url:'https://x.com/mindbranches/status/2076099697207308399?s=67',
    source:'Mindbranches · Post X enregistré dans Google Tasks',
    status:'Contenu à récupérer',
    description:'Lien ajouté depuis la liste « À lire ». Le contenu du post n’est pas accessible automatiquement pour l’instant.',
    takeaway:'Ouvre le post depuis l’application. Dès que son texte ou des captures sont disponibles, un quiz fidèle pourra être ajouté sans inventer le contenu.',
    note:'Aucune flashcard de fond n’est générée tant que le texte exact du post n’est pas disponible.'
  });

  A.addArticle('claude-artifact','Artifact Claude',{
    url:'https://claude.ai/code/artifact/bfdfaef9-bc62-4dfe-ba9e-c58a26c9accf',
    source:'Claude Artifact · lien privé ou dépendant d’une session',
    status:'Accès privé',
    description:'Artifact enregistré dans Google Tasks. Son contenu n’est pas publiquement lisible depuis l’application.',
    takeaway:'Ouvre l’artifact avec ton compte Claude. Le quiz pourra être créé à partir du texte ou d’un export partagé.',
    note:'Aucune question n’est ajoutée sans accès au contenu, afin de ne pas fabriquer de faux apprentissages.'
  });

  A.addArticle('mit-sloan','MIT Sloan Management Review',{
    url:'https://sloanreview.mit.edu/',
    source:'MIT Sloan Management Review · page d’accueil',
    status:'Article à préciser',
    description:'La tâche enregistrée pointe vers le magazine, pas vers un article précis.',
    takeaway:'Choisis l’article exact à étudier depuis MIT SMR ; le quiz pourra alors porter sur son argumentation réelle.',
    note:'Le lien actuel est une source éditoriale générale et ne permet pas de construire un questionnaire spécifique.'
  });
})();
