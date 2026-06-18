# 🃏 Flashcards — Prodition KAM

Application de flashcards interactive pour réviser les arguments, objections et positions de négociation.

## Contenu

- **Demant — Must-Win Accounts** : 35 cartes pour être solide face à Cédric (positionnement, valeur, prix, objections, ROI, closing)
- **Linux, SSH & Docker** : commandes, réflexes, sécurité et diagnostic
- **Hayek — La présomption fatale** : concepts clés de Friedrich Hayek
- **OpenClaw** : jeux par chapitre de la documentation

## Fonctionnalités

- Navigation par dossiers et jeux
- Retournement de carte (clic ou espace)
- Navigation ← →
- Recherche et filtrage par catégorie
- Marquer les cartes maîtrisées (persisté en localStorage)
- Mode responsive (mobile adapté)
- Phrases clés à garder en tête par jeu
- Grille de toutes les cartes avec clic pour accès direct

## Mode bureau Mac — Demant KAM

Une application de bureau Electron a été ajoutée pour utiliser uniquement les cartes essentielles du jeu **Business / Demant — Must-Win Accounts** pendant un entretien visio.

### Lancer l'application de bureau

```bash
npm install
npm run desktop
```

### Usage pendant l'entretien

- Cliquer sur une carte pour afficher la réponse.
- Cliquer à nouveau pour revenir à la question.
- Utiliser les filtres rapides : Positionnement, Objections, Prix, ROI, Livrables, Closing.
- Utiliser **Mode discret** pour réduire l'opacité.
- Utiliser **Compact** pour masquer les éléments secondaires.
- Appuyer sur `Échap` pour masquer la fenêtre.
- Utiliser `Cmd + Shift + D` pour afficher / masquer la fenêtre.
- Utiliser `Cmd + Shift + F` pour passer en plein écran.

### Attention visio

Si tu partages ton écran, l'interlocuteur peut voir les cartes. Idéalement, utilise cette fenêtre sur un écran secondaire ou sur un espace non partagé.

## Déploiement

Site statique déployé sur GitHub Pages :
**https://lofp34.github.io/prodition-kam-flash/**

## Stack

HTML / CSS / JS vanilla — zéro dépendance pour la version web.
Electron pour le mode bureau Demant.
