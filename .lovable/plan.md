

# Rendre l'installation Android simple et visuelle

## Probleme
Sur Android, l'evenement `beforeinstallprompt` ne se declenche pas de maniere fiable en production. Le message de fallback actuel ("ouvrez le menu de votre navigateur...") est trop vague et personne ne sait quoi faire.

## Solution en 2 parties

### 1. Corriger le manifest PWA pour ameliorer les chances d'installation automatique
Ajouter `start_url: "/"` dans la configuration du manifest dans `vite.config.ts`. C'est un critere requis par Chrome pour declencher `beforeinstallprompt`. Sans lui, l'evenement peut ne jamais se declencher.

### 2. Remplacer le message de fallback par des instructions visuelles etape par etape
Si le bouton automatique ne fonctionne toujours pas, l'utilisateur verra des instructions claires et illustrees (comme celles pour iOS), avec 3 etapes numerotees :

1. "Appuyez sur les 3 points en haut a droite de Chrome" (avec icone)
2. "Selectionnez 'Installer l'application'" (avec icone)  
3. "Confirmez en appuyant sur 'Installer'" 

### Fichiers modifies

**`vite.config.ts`** : Ajouter `start_url: "/"` et `scope: "/"` au manifest PWA.

**`src/pages/Install.tsx`** : Remplacer le bloc de fallback textuel par des instructions visuelles etape par etape avec des numeros, des icones et un fond colore, identiques au style des instructions iOS deja en place.

### Resultat attendu
- Si Chrome supporte l'installation automatique : le bouton vert "Installer" apparait (pas de changement)
- Si le bouton automatique ne fonctionne pas : des instructions claires et visuelles guident l'utilisateur pas a pas
- Sur iOS : aucun changement, les instructions Safari restent identiques
