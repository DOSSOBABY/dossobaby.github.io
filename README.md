# dossobaby.github.io

Portfolio d'Abdrahamane Aly TRAORE, en ligne sur **https://dossobaby.github.io**.

Site statique (HTML, CSS, JavaScript), sans étape de build, hébergé gratuitement par GitHub Pages. La page a été refaite avec le skill [taste-skill](https://github.com/Leonxlnx/taste-skill) (version 2.5.1) : une section par écran, des bords alignés, une palette et une typographie tirées au sort pour un site de services, et ses vérifications dans un vrai navigateur.

## Structure

| Fichier | Rôle |
| --- | --- |
| `index.html` | Le contenu de la page, la palette (`:root`) et les quelques règles propres à la page |
| `assets/` | Le kit de taste-skill : `system.css` et `system.js` (grille, boutons, navigation, formulaire), `layout/` (le héros), `motion/` (survols, entrée du héros), `moments/` (les deux moments au défilement), `diagrams/` (le schéma des outils), `icons/` (les vrais logos des outils) |
| `script.js` | L'envoi de la demande de devis par WhatsApp |
| `images/work/` | Les captures des projets, en WebP |
| `.hallmark/` | Le journal de l'ancienne refonte Hallmark |

Les fichiers de `assets/` viennent tels quels du skill : ne pas les modifier, la page les règle depuis `index.html`.

## La page, écran par écran

1. **Héros** : « Développeur web et mobile à Bamako », le menu de Fadi's Order sur téléphone.
2. **Services** : six services, chacun relié à un projet déjà construit.
3. **Travaux** : quatre plateformes qui s'ouvrent une à une au défilement (moment `pinned-chapters`).
4. **Parcours** : une phrase qui s'allume mot à mot (moment `word-highlight`).
5. **Applications sur téléphone** : quatre captures à 390 pixels de large.
6. **Outils** : les briques par couche et le schéma des outils jusqu'au paiement mobile money.
7. **Devis** : le formulaire (e-mail ou WhatsApp).
8. **Pied de page** : coordonnées et réseaux.

## Personnaliser

- **Textes** : tout est dans `index.html`.
- **Un projet** : ajoute une étape `<li class="mo-pc__step">` dans la section `#travaux` (deux à quatre étapes, une image 800 × 500 chacune).
- **Formulaire** : six champs au plus ; l'adresse d'envoi est dans l'attribut `action` du formulaire.
- **Couleur** : `--p-accent` et `--p-action` dans le bloc `:root` de `index.html`.

## Tester en local

Lance un petit serveur (les modules JavaScript ne se chargent pas depuis `file://`) :

```bash
python3 -m http.server 8000
```

puis ouvre http://localhost:8000.
