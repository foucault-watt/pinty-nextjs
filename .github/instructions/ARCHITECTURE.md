# Architecture Coin-Coin (Web)

## Flux principal
Device (ESP32) -> Broker MQTT -> Bridge (service) -> DB (Supabase/Postgres) -> Next.js Dashboard

## Frontend
- Next.js app router
- src/features/dashboard : page principale + composants + state
- src/services : clients (supabase, api)

## Backend/Bridge (si présent)
- S’abonne aux topics MQTT
- Valide payload
- Stocke en DB
- Optionnel : push websocket/SSE

## Modifiabilité
- Changer modèle DB : modifier src/services + src/domain/types
- Changer logique fin de tirage : côté firmware + mapping côté bridge
- Changer charts : src/features/dashboard/charts
