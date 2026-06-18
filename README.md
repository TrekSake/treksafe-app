# TrekSafe

Monorepo del MVP TrekSafe — monitoreo pasivo para senderistas en alta montaña.

## Stack

| Capa | Tecnología |
|------|------------|
| Base de datos | PostgreSQL (Supabase) |
| Backend | Node.js · Express · TypeScript · arquitectura limpia |
| Frontend | React · Vite · PWA |

## Estructura

```
treksake-app/
├── backend/          # API REST + JWT + conexión Supabase (service_role)
├── frontend/         # PWA mobile-first (sin claves Supabase)
├── docs/             # Backlog, tareas, mockups Figma
├── init_schema.sql   # Esquema PostgreSQL
└── enable_rls.sql    # Migración RLS
```

## Configuración

1. Copia credenciales de Supabase Dashboard → **Project Settings → API / Database**
2. Edita `backend/.env` (SUPABASE_URL, SERVICE_ROLE_KEY, DATABASE_URL, JWT_SECRET)
3. `frontend/.env` solo necesita `VITE_API_URL`

```bash
npm run install:all
npm run dev:backend   # http://localhost:3000/api/health
npm run dev:frontend  # http://localhost:5173
```

## Documentación

- `docs/product_backlog.md` — Historias de usuario
- `docs/tasks_mvp.md` — Tareas por sprint
- `docs/proyecto-final.md` — Marco legal y reglas de negocio
