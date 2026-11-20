# dossobaby.github.io

Portfolio d'Abdrahamane Aly TRAORE, en ligne sur **https://dossobaby.github.io**.

Site statique (HTML, CSS, JavaScript), sans dépendance ni étape de build, hébergé gratuitement par GitHub Pages.

## Structure

| Fichier | Rôle |
| --- | --- |
| `index.html` | Contenu de toutes les sections |
| `style.css` | Mise en forme, thème clair/sombre, responsive |
| `script.js` | Menu mobile, thème, filtre des projets, animations |
| `favicon.svg` | Icône de l'onglet |

## Personnaliser

Tout se modifie dans `index.html` :

- **Hero / À propos** : ton prénom, ta phrase d'accroche, ta présentation.
- **Photo** : ajoute `assets/photo.jpg` et remplace le bloc `<span>DB</span>` par `<img src="assets/photo.jpg" alt="Mon portrait">`.
- **CV** : dépose ton CV à la racine sous le nom `cv.pdf` et ajoute un lien `<a href="cv.pdf" download>` dans « À propos ».
- **Projets** : duplique un bloc `<article class="project">`. L'attribut `data-cat` (une ou plusieurs valeurs parmi `live`, `saas`, `mobile`, `fintech`, `edu`) sert au filtre. Pour une capture d'écran, ajoute `<img src="assets/projet1.jpg" alt="...">` dans `.project__thumb`.
- **Contact** : ajoute ton e-mail ou tes réseaux dans la section « Contact ».
- **Couleur principale** : variable `--accent` en haut de `style.css`.

## Tester en local

Ouvre simplement `index.html` dans ton navigateur.
