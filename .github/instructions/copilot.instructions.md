---
applyTo: '**'
---
# Copilot Instructions — Projet Next.js (PINTY)

## Objectif principal
Tu dois m’aider à coder en Next.js en restant TOUJOURS compréhensible et modifiable par un junior.
Je allow l’assistance, mais je refuse la "magie" : tout doit être explicable.

## Règles de communication (obligatoires)
1) Avant d’écrire du code, résume en 5–8 lignes :
   - ce qu’on va faire
   - pourquoi
   - où dans le repo
   - comment on testera
2) Après chaque bloc de code, ajoute :
   - "Ce que ce code fait"
   - "Pourquoi c’est fait comme ça"
   - "Comment je le modifierais si X change"
3) Toutes les 2–3 étapes, pose une question à l’utilisateur pour valider la direction.
   - Si une ambiguïté existe, pose la question AVANT d’implémenter.
   - Si c’est bloquant : stop et question.
   - Si c’est non-bloquant : fais un choix par défaut + question "on garde ?"

## Règles de code : simplicité & junior-friendly
- Jamais de logique métier directement dans les composants UI.
- Les composants React restent "stupides" : affichage + callbacks.
- La logique métier va dans /src/domain ou /src/services.
- Les accès réseau (fetch, supabase, mqtt bridge) vont dans /src/lib ou /src/services.
- Fonctions courtes : 20–40 lignes max. Sinon, découpe.
- Nommage explicite (pas d’abréviations obscures).
- Ajouter des commentaires uniquement là où le "pourquoi" n’est pas évident.

## Qualité & maintenance
- Toujours typer (TypeScript). Pas de `any` sauf exception justifiée.
- Toujours gérer erreurs / états de chargement.
- Pas de dépendance ajoutée sans justification + alternative + impact.
- Toute décision structurante doit être notée dans docs/DECISIONS.md (une entrée courte).

## Organisation du projet (à respecter)
- app/ : pages, layout, routes (UI + composition)
- src/components/ : composants UI réutilisables (sans logique métier)
- src/features/ : "feature modules" (UI + state + orchestrations)
- src/domain/ : règles métier pures (calculs, validations)
- src/services/ : API clients, supabase, mqtt bridge client (si nécessaire)
- src/lib/ : utilitaires (format, date, env, logging)
- docs/ : documentation

## Next.js : conventions
- Favoriser la simplicité : Server Actions/SSR uniquement si besoin explicite.
- Par défaut : rendu client minimal, data fetching via un service typed.
- Éviter les patterns avancés (caching exotique, suspense compliqué) sans besoin.

## Revue automatique avant réponse
Avant de répondre, vérifie :
- "Est-ce qu’un junior comprend ?"
- "Où modifie-t-on X si la spec change ?"
- "Le code est-il testable ?"
- "Ai-je posé une question de validation récemment ?"

## Format de réponse attendu
1) Plan (5–8 lignes)
2) Question de validation si nécessaire
3) Code (blocs courts)
4) Explication + points de modification + tests

## Build
- Tu n'as pas besoin de lancer le serveur, l'utilisateur s'en charge.

## Icones
- Lucide React est la bibliothèque d'icônes officielle, utilise-la systématiquement.