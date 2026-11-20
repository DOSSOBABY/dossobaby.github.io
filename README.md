# dossobaby.github.io

Mon portfolio personnel, en ligne sur **https://dossobaby.github.io**.

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
- **CV** : dépose ton CV à la racine sous le nom `cv.pdf`.
- **Projets** : duplique un bloc `<article class="project">`. L'attribut `data-cat` (`web`, `app`, `design`) sert au filtre. Pour une capture d'écran, ajoute `<img src="assets/projet1.jpg" alt="...">` dans `.project__thumb`.
- **Contact** : remplace `contact@exemple.com` et les liens LinkedIn / Instagram.
- **Couleur principale** : variable `--accent` en haut de `style.css`.

## Tester en local

Ouvre simplement `index.html` dans ton navigateur.
