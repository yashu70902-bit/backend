# AGENTS.md

## Project Overview
GS Shopping Suite — a standalone Express backend API (`server.js`) with an in-memory database (products, orders, users). No external database or services. No credentials required.

## Running
- `docker compose -f docker-compose.base44.yml up -d` starts the API on host port 3000.
- The compose service installs npm dependencies on startup and runs `nodemon server.js` for live reload.
- Health check: `GET /health` returns `{ status: "online" }`.

## Key Endpoints
- `GET /health` — health check
- `GET|POST|PUT|DELETE /products`
- `GET|POST|PATCH /orders`
- `GET|POST|PUT|DELETE /users`

## Notes
- Data is in-memory; it resets on container restart.
- No lockfile exists; `npm install` resolves latest compatible versions on each boot.
- This is an API-only backend (no frontend). The preview shows JSON responses.
