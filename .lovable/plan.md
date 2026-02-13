

# Modification de la page d'accueil - Repositionnement du bouton

## Changement prevu

Sur la page d'accueil (WelcomeScreen), la zone actuelle avec le bouton "Demarrer une conversation" sera reorganisee en deux colonnes cote a cote :

- **A gauche** : Le texte "Si votre question n'est pas dans cette liste, posez-la ici"
- **A droite** : Le bouton "Demarrer une conversation" (existant)

## Detail technique

Modification du fichier `src/components/WelcomeScreen.tsx` :
- Remplacer le bouton centre par un conteneur flex horizontal (flexbox row)
- Colonne gauche : texte informatif
- Colonne droite : bouton existant
- Le tout reste centre et responsive (sur mobile, les elements s'empileront verticalement)

