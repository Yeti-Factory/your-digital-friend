

# Mise a jour de l'ecran d'accueil

## Fichier modifie
`src/components/WelcomeScreen.tsx`

## Changements

### 1. Texte de bienvenue revu
Remplacer le paragraphe actuel par un texte qui :
- Remercie les adoptants d'avoir donne une chance a un chien
- Explique clairement le but de l'application : un assistant pour accompagner les adoptants au quotidien (education, soins, alimentation, comportement, integration)

Exemple :
> "Merci d'avoir offert une nouvelle vie a l'un de nos proteges ! Cette application est votre compagnon au quotidien : posez vos questions sur l'education, les soins, l'alimentation ou le comportement de votre chien, et recevez des conseils adaptes bases sur notre guide d'accueil."

### 2. Suggestions mises a jour (12 questions)
- "Comment apprendre les bases a mon chien ?" (remplace "eduquer")
- "Mon chien est stresse en ville, que faire ?" (remplace "alimentation")
- "Comment gerer l'anxiete de separation ?"
- "Quels sont les premiers achats a prevoir ?"
- "Comment promener mon chien en laisse ?"
- "Mon chien a peur, que faire les premiers jours ?"
- "Comment presenter mon chien a mon chat ?"
- "Quelle est la regle des 3 jours, 3 semaines, 3 mois ?"
- "Comment faire la transition alimentaire ?"
- "Mon chien n'est pas propre, que faire ?"
- "Quand prendre rendez-vous chez le veterinaire ?"
- "Quels partenaires peuvent m'aider ?" (bases sur le livret : Agria, Tout pour le Toutou, Olykan, Esprit Dog, Hector Kitchen, Happy Scoop)

### 3. Ajustement grille
La grille reste en `sm:grid-cols-2` pour accueillir les 12 questions de facon lisible.

