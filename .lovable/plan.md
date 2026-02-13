

# Detecter le navigateur et guider vers Chrome si necessaire

## Le probleme
Sur Android, Firefox (et d'autres navigateurs comme Samsung Internet, Opera...) ne supportent pas toujours l'installation PWA de la meme maniere que Chrome. Les utilisateurs sur ces navigateurs voient les instructions pour Chrome qui ne correspondent pas a leur situation.

## La solution
Ajouter une detection du navigateur dans la page `/install`. Si l'utilisateur est sur Android mais n'utilise pas Chrome, on affiche un message specifique qui :
1. Explique que Chrome est recommande pour une installation simple
2. Propose un bouton pour copier le lien de la page
3. Indique d'ouvrir ce lien dans Chrome pour installer l'app en un clic

## Ce que l'utilisateur verra

### Sur Android avec Chrome (pas de changement)
- Le bouton "Installer l'application" ou les instructions Chrome habituelles

### Sur Android avec Firefox / autre navigateur
Un ecran avec :
- Un message : "Pour installer facilement, ouvrez cette page dans Chrome"
- 3 etapes visuelles :
  1. "Copiez le lien ci-dessous"  (avec un bouton pour copier automatiquement)
  2. "Ouvrez Chrome sur votre telephone"
  3. "Collez le lien et suivez les instructions"
- Un bouton "Copier le lien" qui copie l'URL dans le presse-papier avec une confirmation visuelle

### Sur iOS (pas de changement)
- Les instructions Safari restent identiques

## Details techniques

### Fichier modifie : `src/pages/Install.tsx`
- Ajouter une detection du navigateur via `navigator.userAgent` pour identifier Chrome, Firefox, Samsung Internet, etc.
- Ajouter un nouvel etat `isNonChromeAndroid` (true si Android + pas Chrome)
- Ajouter une fonction `copyLink` qui utilise `navigator.clipboard.writeText()` pour copier l'URL
- Inserer un nouveau bloc conditionnel entre le bloc iOS et le bloc Chrome/fallback actuel
- Importer l'icone `Copy` et `ExternalLink` depuis lucide-react
- Le bloc affiche les 3 etapes visuelles dans le meme style que les autres instructions (numeros verts, fond colore, icones)

