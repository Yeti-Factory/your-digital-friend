

# Supprimer les introductions génériques des réponses du chatbot

## Modification
Ajouter une règle dans le prompt système (`supabase/functions/chat/index.ts`, ligne 127) interdisant les phrases d'introduction vides comme "C'est une excellente question", "Très bonne question", "Merci pour cette question", etc. L'assistant doit aller droit au but et commencer directement par la réponse.

## Fichier modifié
`supabase/functions/chat/index.ts` — ajout d'une ligne après la règle sur les partenaires (ligne 127).

