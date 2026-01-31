# Conventions Projet PINTY (Next.js)

## Objectif
Code clair, modifiable vite, sans magie.

## Règles React
- Composants UI = affichage + props + events
- Logique = services/domain/features
- Pas de fetch direct dans un composant UI

## Règles TypeScript
- `any` interdit (sauf justification)
- Types exportés depuis src/domain/types.ts ou feature/types.ts
- Les données API ont un schéma de validation (zod recommandé) si exposées publiquement

## Erreurs & états
Chaque requête doit gérer :
- loading
- success
- error (message utile + fallback)

## Nommage
- fonctions : verbes (getKegs, computePourVolume)
- fichiers : kebab-case
- types : PascalCase

## Style
- fonctions courtes
- pas de code dupliqué : factoriser dans src/lib

## Documentation minimale
Toute nouvelle feature doit :
- décrire le flux de données dans docs/ARCHITECTURE.md
- consigner une décision si ça impacte le design dans docs/DECISIONS.md
