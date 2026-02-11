# Onboarding Junior — Coin-Coin

## Où modifier quoi ?
- UI pure : src/components
- Dashboard : src/features/dashboard
- Règles métier : src/domain
- Accès DB/API : src/services
- Helpers : src/lib

## Règles d’or
- Ne mets pas de logique métier dans un composant UI
- Si tu touches un type, cherche son usage global
- Si tu ajoutes une dépendance, justifie-la dans DECISIONS.md

## Debug
- Inspecte les requêtes réseau
- Ajoute des logs (src/lib/logger)
- Lis les erreurs TypeScript

## Quand tu changes une spec
- Trouve la règle métier dans src/domain
- Mets à jour le mapping service dans src/services
- Puis ajuste l’UI
