

# Reequilibrer l'ecran d'accueil : texte + bouton + visibilite de la liste

## Ce qui change

### 1. Nouveau texte d'invitation
- **Avant** : "Si votre question n'est pas dans cette liste, posez-la ici"
- **Apres** : "Si votre question ne se trouve pas dans la liste ci-bas, posez-la en cliquant ici"

### 2. Nouveau texte du bouton
- **Avant** : "Demarrer une conversation"
- **Apres** : "Cliquer pour poser votre question"

### 3. Reduire la taille du bouton pour qu'il ne domine pas la page
- Passer de `size="lg"` a `size="default"` (plus petit)
- Reduire le padding horizontal (`px-8` vers `px-5`)
- Reduire la taille du texte (`text-base` vers `text-sm`)
- Le bouton reste visible et cliquable, mais ne saute plus aux yeux par rapport a la liste

### 4. Rendre la liste de questions plus visible
- Ajouter une fleche vers le bas (icone `ChevronDown` ou `ArrowDown`) entre le bloc texte/bouton et la liste, pour guider le regard
- Augmenter legerement le titre "Questions frequentes" (passer de `text-sm` a `text-base` et ajouter une couleur plus marquee)

## Fichier modifie
`src/components/WelcomeScreen.tsx` uniquement

## Details techniques
- Importer `ChevronDown` depuis lucide-react
- Modifier le texte ligne 36
- Modifier le texte du bouton ligne 40
- Reduire les classes CSS du bouton ligne 38
- Ajouter une icone fleche animee entre le bloc bouton (ligne 42) et la liste (ligne 44)
- Renforcer le style du titre "Questions frequentes" ligne 45

