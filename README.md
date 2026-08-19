# Doggy Friend / Doggy Help

Assistant canin privé de Doggy Oasis International. Cette version est conçue pour être hébergée sur le VPS OVH avec Coolify, sans dépendance à Lovable ni à Supabase.

## Fonctionnement

- interface React/PWA conservée ;
- accès réservé à un seul superadministrateur ;
- session signée dans un cookie sécurisé ;
- serveur Node intégré pour le dialogue avec un moteur d'IA compatible avec l'API OpenAI ;
- aucune conversation ni donnée personnelle enregistrée ;
- aucune base de données requise.

## Variables obligatoires

Copier `.env.example` vers `.env` pour un essai local ou saisir les variables directement dans Coolify :

- `ADMIN_EMAIL` : adresse du superadministrateur ;
- `ADMIN_PASSWORD` : mot de passe de connexion ;
- `SESSION_SECRET` : chaîne aléatoire d'au moins 32 caractères ;
- `SESSION_DAYS` : durée de la session, 7 jours par défaut ;
- `AI_API_URL` : URL OpenAI-compatible du fournisseur choisi ;
- `AI_API_KEY` : clé du fournisseur IA ;
- `AI_MODEL` : nom du modèle ;
- `COOKIE_SECURE` : laisser `true` derrière le HTTPS Coolify ;
- `PORT` : port interne, 3000 par défaut.

Les secrets ne doivent jamais être ajoutés au dépôt GitHub.

## Développement

```bash
npm ci
npm run build
npm test
```

Pour tester l'application complète, renseigner les variables d'environnement puis lancer :

```bash
npm start
```

La route `/health` permet à Coolify de vérifier que le service fonctionne.

## Déploiement Coolify

1. Créer une application à partir du dépôt GitHub et de la branche de migration.
2. Choisir le Dockerfile du dépôt.
3. Définir le port interne `3000`.
4. Ajouter les variables d'environnement ci-dessus.
5. Déployer d'abord sur une adresse de test.
6. Vérifier la connexion, une conversation complète et la déconnexion avant toute bascule de domaine.
