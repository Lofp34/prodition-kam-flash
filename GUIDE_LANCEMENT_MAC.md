# Guide débutant — lancer Demant KAM Desk Cards sur Mac

Ce guide explique comment lancer l'application de bureau ajoutée au dépôt `prodition-kam-flash`.

## 1. Ouvrir le Terminal

Sur Mac :

1. Appuie sur `Cmd + Espace`.
2. Tape `Terminal`.
3. Appuie sur `Entrée`.

## 2. Vérifier que Node est installé

Dans le Terminal, colle cette commande :

```bash
node -v
```

Puis :

```bash
npm -v
```

Si les deux commandes affichent un numéro de version, tu peux continuer.

Si le Terminal répond `command not found`, installe Node.js depuis le site officiel de Node.js, version LTS.

## 3. Aller dans le dossier du projet

Si le dépôt est dans ton dossier Téléchargements :

```bash
cd ~/Downloads/prodition-kam-flash
```

Si le dépôt est dans Documents :

```bash
cd ~/Documents/prodition-kam-flash
```

Pour vérifier que tu es au bon endroit :

```bash
ls
```

Tu dois voir au minimum ces fichiers :

```text
index.html
decks.js
package.json
electron-main.js
desktop.html
desktop.js
desktop.css
```

## 4. Installer les dépendances

Dans le dossier du projet, lance :

```bash
npm install
```

Cette commande installe Electron.

## 5. Lancer l'application de bureau

Toujours dans le dossier du projet, lance :

```bash
npm run desktop
```

La fenêtre **Demant KAM Desk Cards** doit s'ouvrir.

## 6. Raccourcis utiles

- Cliquer sur une carte : afficher / masquer la réponse.
- `Échap` : masquer la fenêtre.
- `Cmd + Shift + D` : afficher / masquer la fenêtre.
- `Cmd + Shift + F` : plein écran.

## 7. Erreurs fréquentes

### `npm: command not found`

Node.js n'est pas installé. Installe Node.js en version LTS.

### `No such file or directory`

Tu n'es pas dans le bon dossier. Il faut te placer dans le dossier `prodition-kam-flash` avec `cd`.

### La fenêtre ne s'affiche pas

Essaie :

```bash
npm run desktop
```

Puis regarde si une erreur s'affiche dans le Terminal. Copie-colle cette erreur dans ChatGPT.

### L'application est masquée

Appuie sur :

```text
Cmd + Shift + D
```

## 8. Méthode simple si tu es perdu

Dans le Terminal, colle successivement :

```bash
cd ~/Downloads/prodition-kam-flash
```

```bash
npm install
```

```bash
npm run desktop
```

Si la première commande ne marche pas, le dossier n'est probablement pas dans Téléchargements.
