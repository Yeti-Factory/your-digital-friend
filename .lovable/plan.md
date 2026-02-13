
# Ajout de boutons d'action apres chaque reponse du chatbot

## Objectif
Apres chaque reponse de l'assistant, afficher deux boutons visibles permettant a l'utilisateur de :
1. **Revenir a la page d'accueil** (liste des questions frequentes)
2. **Poser une autre question** (focus sur le champ de saisie pour continuer la conversation)

## Ce qui sera modifie

Un seul fichier : **`src/components/ChatScreen.tsx`**

## Changements prevus

Apres chaque message de l'assistant (et uniquement quand le chargement est termine), deux boutons apparaitront sous la derniere reponse :

- **"Retour a l'accueil"** : icone Home + texte, appelle `onBack` pour revenir au WelcomeScreen
- **"Poser une autre question"** : icone MessageCircle + texte, place le focus sur le champ de saisie

Ces boutons ne s'afficheront que :
- Sous le **dernier** message assistant
- Quand le chatbot **n'est plus en train de repondre** (pas pendant le streaming)

## Detail technique

- Ajout d'une condition sur le dernier message : si `i === messages.length - 1` et `msg.role === "assistant"` et `!isLoading`
- Rendu de deux boutons avec `variant="outline"` et style arrondi
- Le bouton "Poser une autre question" utilise `inputRef.current?.focus()` pour activer le champ de saisie
- Import de l'icone `Home` depuis `lucide-react`
