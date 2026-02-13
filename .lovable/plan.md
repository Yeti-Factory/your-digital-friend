
# Supprimer la mention du "livret d'accueil" dans les reponses du chatbot

## Ce qui change
Le chatbot ne dira plus "D'apres notre livret d'accueil" ou "D'apres notre guide d'accueil". A la place, il utilisera des formulations naturelles comme "D'apres notre experience" ou ne mentionnera rien du tout.

## Modification
Un seul fichier est concerne : `supabase/functions/chat/index.ts`

Dans le prompt systeme (lignes 119-121), les regles seront modifiees :
- **Avant** : "Quand ta reponse vient du livret, mentionne-le naturellement (ex: 'D'apres notre guide d'accueil...')"
- **Apres** : "Ne mentionne JAMAIS le livret d'accueil. Presente les informations naturellement, comme venant de l'experience de Doggy Oasis (ex: 'D'apres notre experience...', 'Notre experience nous montre que...') ou sans introduction particuliere."

La ligne qui dit "Si la question necessite des informations au-dela du livret, complete avec tes connaissances generales en education canine, mais precise-le" sera aussi simplifiee pour ne plus faire reference au livret.

## Resultat
Les reponses du chatbot paraitront plus naturelles et professionnelles, sans reference a un document interne.
