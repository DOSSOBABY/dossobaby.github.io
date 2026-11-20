# dossobaby.github.io

Portfolio d'Abdrahamane Aly TRAORE, en ligne sur **https://dossobaby.github.io**.

Site statique (HTML, CSS, JavaScript), sans dépendance ni étape de build, hébergé gratuitement par GitHub Pages.

## Structure

| Fichier | Rôle |
| --- | --- |
| `index.html` | Le contenu de la page |
| `style.css` | La mise en page (thème Studio de Hallmark), précédée de son tampon de vérification |
| `tokens.css`, `base.css` | Couleurs, polices, espacements et règles de base du thème |
| `script.js` | La carte du système (choix d'un projet) et le formulaire de devis (particulier, PME, entreprise), envoyé par e-mail ou WhatsApp |
| `images/work/` | Les captures des projets, en WebP |
| `.hallmark/` | Le journal de la refonte Hallmark (comparaison avant et après) |

## Les captures

Chaque projet a été lancé en local avec ses propres données de démonstration, puis capturé à 1440 × 900 (ordinateur) et 390 × 844 (téléphone). Les originaux PNG ne sont pas versionnés (`images/screens/` est ignoré) ; seules les versions WebP de `images/work/` sont publiées.

Pour remplacer une capture, garde le même nom de fichier dans `images/work/` et les mêmes proportions (16:10 pour les vignettes et l'écran principal, 390:844 pour les téléphones).

## Personnaliser

- **Textes** : tout est dans `index.html`.
- **Un projet** : ajoute une ligne `<li class="index__row">` dans la liste des travaux (ses captures téléphone vont dans `.index__phones`), et ses chemins dans la carte (`data-p` et `data-n` dans le SVG, plus la ligne `chain` de `script.js`).
- **Formulaire** : les champs propres à un profil portent `data-only` (`org`, `PME` ou `Entreprise`).
- **Couleur** : `--color-accent` dans `tokens.css`.

## Tester en local

Ouvre simplement `index.html` dans ton navigateur.
