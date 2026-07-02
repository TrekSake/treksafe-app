# Modelos UML — TrekSafe

Diagramas UML del sistema TrekSafe. Archivos fuente Draw.io organizados por capa.

## Herramienta

- Extensión Cursor/VS Code: **Draw.io Integration** (`hediet.vscode-drawio`)
- Abrir cualquier `.drawio` → editar visualmente → exportar PNG/SVG si se necesita una imagen estática

### Convenciones visuales (legibilidad)

| Elemento | Estilo |
|----------|--------|
| Fondo página | Blanco `#FFFFFF` |
| Texto | Negro `#1A1A1A` |
| Bordes / líneas | Gris oscuro `#333333` |
| Cajas / elipses | Relleno blanco; sin colores saturados |
| Límites sistema | `#FAFAFA` |
| Notas | `#FFF9E6` |
| Conexiones | Ortogonales (`orthogonalEdgeStyle`) |
| Separación | ≥60–80 px entre elementos |

Si un diagrama se ve amontonado al abrirlo, usa **View → Fit** o amplía el zoom; los tamaños de página están dimensionados para A4/letter al exportar.

## Índice de diagramas

| Capa | Contenido |
|------|-----------|
| **1 — Base técnica** | Componentes, despliegue |
| **2 — Negocio** | CU negocio general, flujos y CU por CUN |
| **3 — Sistema** | CU sistema general + CUS por CUN |
| **4 — Detalle** | Secuencias + clases |

---

## Fase 1 — Base técnica

| # | Archivo | Descripción |
|---|---------|-------------|
| 12 | [`06-componentes/12-diagrama-componentes-simple.drawio`](./06-componentes/12-diagrama-componentes-simple.drawio) | Vista general — actores, componentes básicos, BD y correo |
| 13 | [`07-despliegue/13-diagrama-despliegue.drawio`](./07-despliegue/13-diagrama-despliegue.drawio) | Nodos: PWA, API Node, Supabase, correo |

### Fuentes de verdad (Fase 1)

| Diagrama | Referencia en código/docs |
|----------|---------------------------|
| Modelo de datos | `init_schema.sql`, `post_mvp_migration.sql`, `enable_rls.sql` |
| Componentes | `backend/src/{presentation,application,infrastructure}/`, `frontend/src/` |
| Despliegue | `README.md`, `backend/.env.example`, `main.ts` |

---

## Fase 2 — Negocio

| # | Archivo | Descripción |
|---|---------|-------------|
| 01 | [`01-negocio/01-caso-uso-negocio-general.drawio`](./01-negocio/01-caso-uso-negocio-general.drawio) | CUN-01/02/03 + actores Senderista, Rescatista, Contacto |
| 02a | [`01-negocio/02-flujo-CUN-01.drawio`](./01-negocio/02-flujo-CUN-01.drawio) | Actividad: planificar expedición (offline, coordenadas) |
| 02b | [`01-negocio/02-flujo-CUN-02.drawio`](./01-negocio/02-flujo-CUN-02.drawio) | Actividad: check-in retorno + recordatorio 30 min |
| 02c | [`01-negocio/02-flujo-CUN-03.drawio`](./01-negocio/02-flujo-CUN-03.drawio) | Actividad: escalamiento, consola, bitácora |
| 03a | [`01-negocio/03-CUN-01-caso-uso.drawio`](./01-negocio/03-CUN-01-caso-uso.drawio) | CU negocio detalle CUN-01 con include/extend |
| 03b | [`01-negocio/03-CUN-02-caso-uso.drawio`](./01-negocio/03-CUN-02-caso-uso.drawio) | CU negocio detalle CUN-02 |
| 03c | [`01-negocio/03-CUN-03-caso-uso.drawio`](./01-negocio/03-CUN-03-caso-uso.drawio) | CU negocio detalle CUN-03 (Rescatista + Contacto + Motor) |

### Casos de uso de negocio (CUN)

| ID | Nombre | Actor(es) | HUs relacionadas |
|----|--------|-----------|------------------|
| CUN-01 | Planificar y Registrar Expedición Segura | Senderista | HU-04–08, 22, 23 |
| CUN-02 | Verificar Retorno Seguro de Montaña | Senderista | HU-09, 10, 20, 25 |
| CUN-03 | Coordinar y Ejecutar Operaciones de Rescate | Rescatista, Contacto, Motor de Plazos | HU-11–19 |

---

## Fase 3 — Sistema

| # | Archivo | Descripción |
|---|---------|-------------|
| 04 | [`02-sistema/04-caso-uso-sistema-general.drawio`](./02-sistema/04-caso-uso-sistema-general.drawio) | CUS-01 a CUS-22 · 3 actores · include/extend |
| 05a | [`02-sistema/05-CUN-01-caso-uso-sistema.drawio`](./02-sistema/05-CUN-01-caso-uso-sistema.drawio) | CUS-01,03–07,10,11,21 → CUN-01 |
| 05b | [`02-sistema/05-CUN-02-caso-uso-sistema.drawio`](./02-sistema/05-CUN-02-caso-uso-sistema.drawio) | CUS-08,09,20,22 → CUN-02 |
| 05c | [`02-sistema/05-CUN-03-caso-uso-sistema.drawio`](./02-sistema/05-CUN-03-caso-uso-sistema.drawio) | CUS-02,03,12–19 → CUN-03 |

### Casos de uso de sistema (CUS)

| ID | Nombre | Actor | HU |
|----|--------|-------|-----|
| CUS-01 | Registrar Senderista | Senderista | HU-01 |
| CUS-02 | Registrar Rescatista | Rescatista | HU-03 |
| CUS-03 | Iniciar Sesión | Ambos | HU-02 |
| CUS-04 | Ubicación y Destino | Senderista | HU-04 |
| CUS-05 | Ficha Médica | Senderista | HU-05 |
| CUS-06 | Contactos Emergencia | Senderista | HU-06 |
| CUS-07 | Crear Expedición | Senderista | HU-07, HU-08 |
| CUS-08 | Temporizador Activa | Senderista | HU-09 |
| CUS-09 | Check-in Retorno | Senderista | HU-10 |
| CUS-10 | Sync Offline `<<extend>>` CUS-07 | Senderista | HU-22 |
| CUS-11 | Validar Coordenadas `<<include>>` CUS-04/07 | Senderista | HU-23 |
| CUS-12 | Motor Control Plazos | Sistema Cron | HU-11 |
| CUS-13 | Alerta Contactos `<<include>>` CUS-12 | Sistema Cron | HU-12 |
| CUS-14 | Alerta Rescate `<<include>>` CUS-12 | Sistema Cron | HU-13 |
| CUS-15 | Panel Monitoreo | Rescatista | HU-15, HU-17 |
| CUS-16 | Filtrar Zona | Rescatista | HU-16 |
| CUS-17 | Confirmar Alerta | Rescatista | HU-14 |
| CUS-18 | Ficha Emergencia | Rescatista | HU-18 |
| CUS-19 | Bitácora Rescate | Rescatista | HU-19 |
| CUS-20 | Historial | Senderista | HU-20 |
| CUS-21 | Revocación ARCO | Senderista | HU-21 |
| CUS-22 | Notif. 30 min `<<extend>>` CUS-08 | Senderista | HU-25 |

---

## Fase 4 — Detalle

| # | Archivo | Descripción |
|---|---------|-------------|
| 06 | [`03-secuencia/06-secuencia-crear-expedicion.drawio`](./03-secuencia/06-secuencia-crear-expedicion.drawio) | CUS-07 · PWA → API → Service → Repository → PostgreSQL |
| 07 | [`03-secuencia/07-secuencia-checkin-retorno.drawio`](./03-secuencia/07-secuencia-checkin-retorno.drawio) | CUS-09 · countdown, re-auth bcrypt, status completed |
| 08 | [`03-secuencia/08-secuencia-escalamiento-alerta.drawio`](./03-secuencia/08-secuencia-escalamiento-alerta.drawio) | CUS-12/13/14 · cron → alert → emails idempotentes |
| 09 | [`03-secuencia/09-secuencia-gestion-rescate.drawio`](./03-secuencia/09-secuencia-gestion-rescate.drawio) | CUS-15/17/18/19 · consola, confirm, ficha, bitácora |
| 10 | [`04-clases/10-diagrama-clases-negocio.drawio`](./04-clases/10-diagrama-clases-negocio.drawio) | Entidades de dominio y relaciones de negocio |

### Secuencias — trazabilidad

| Diagrama | CUN | CUS | Flujo principal |
|----------|-----|-----|-----------------|
| 06 | CUN-01 | CUS-07 | `POST /api/expeditions` |
| 07 | CUN-02 | CUS-09 | `POST /api/expeditions/:id/check-in` |
| 08 | CUN-03 | CUS-12–14 | `expeditionDeadlineCron.ts` |
| 09 | CUN-03 | CUS-15–19 | `/api/rescue/*` |

---

## Modelo relacional

**Tipo:** PostgreSQL relacional (Supabase). No NoSQL.

Referencia principal: `init_schema.sql`, `enable_rls.sql`, `post_mvp_migration.sql`.

### Tablas (12)

| Tabla | HU / propósito |
|-------|----------------|
| `users` | HU-01, HU-02, HU-03 — auth y rol |
| `hikers_profile` | HU-01 — perfil senderista |
| `rescuers_profile` | HU-03 — perfil rescatista validado |
| `institutional_rescuer_registry` | HU-03 — padrón simulado AGMP/MINCETUR |
| `medical_info` | HU-05 — ficha médica AES-256 + consentimiento |
| `emergency_contacts` | HU-06 — contactos reutilizables |
| `expeditions` | HU-04, HU-07, HU-11 — plan y estados |
| `expedition_companions` | HU-08 — acompañantes |
| `expedition_emergency_contacts` | HU-08 — vínculo M:N expedición↔contacto |
| `rescue_logs` | HU-14, HU-19 — bitácora operativa |
| `email_dispatches` | HU-12, HU-13 — idempotencia de alertas |
| `medical_access_audit` | HU-18 — auditoría acceso ficha médica |

### ENUMs

- `user_role_enum`: `senderista` | `rescatista`
- `expedition_status_enum`: `programmed` → `in_progress` → `completed` | `alert`
- `rescue_status_enum`: `en_busqueda` | `localizados` | `cerrado`

---

## Componentes (diagrama 12)

Archivo: [`12-diagrama-componentes-simple.drawio`](./06-componentes/12-diagrama-componentes-simple.drawio)

| Elemento | Rol |
|----------|-----|
| App del Senderista | Plan de ruta, check-in |
| Consola del Rescatista | Alertas y bitácora |
| Servidor TrekSafe | Lógica central |
| Control de Plazos | Vigila vencimientos |
| Base de Datos | Persistencia |
| Correo Electrónico | Alertas y notificaciones |
| Actores | Senderista, Rescatista, Contacto de Emergencia |

```
Frontend PWA          Backend API                    Externos
─────────────────     ───────────────────────────    ──────────
pages/                presentation/  routes, ctrl      PostgreSQL
services/ apiClient   application/ services          SMTP/Brevo
lib/ offline          infrastructure/ repos, cron
PWA Service Worker    security/ jwt, encryption
```

**Flujo principal:** PWA → `POST/GET /api/*` (JWT) → Controller → Service → Repository → PostgreSQL.

**Flujo cron:** `expeditionDeadlineCron` → `ExpeditionRepository` → `AlertNotificationService` / `RescueAlertService` → `MailService`.

---

## Despliegue (diagrama 13)

| Nodo | Artefacto | Puerto / config |
|------|-----------|-----------------|
| Dispositivo móvil | PWA + Service Worker | `VITE_API_URL` |
| Servidor app | Node.js + treksafe-api + cron | `:3000` (dev) |
| Supabase Cloud | PostgreSQL + RLS | pooler `:5432` |
| Correo externo | SMTP o Brevo API | `backend/.env` |
| Hosting estático (prod) | `frontend/dist` | Netlify/Vercel/Nginx |

**Regla de seguridad:** el cliente nunca recibe claves Supabase; solo el backend usa `service_role` / `DATABASE_URL`.

---

## Trazabilidad CUN ↔ HU

| CUN | Historias clave |
|-----|----------------|
| CUN-01 Planificar expedición | HU-01–08, 21–23 |
| CUN-02 Verificar retorno | HU-09, 10, 20, 25 |
| CUN-03 Coordinar rescate | HU-03, 11–19 |
