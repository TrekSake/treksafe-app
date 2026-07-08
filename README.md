# TrekSafe

**Sistema automatizado de monitoreo y gestión de seguridad para turismo de aventura en alta montaña.**

TrekSafe desplaza el modelo reactivo tradicional de rescate hacia un **protocolo de verificación positiva**: el senderista registra su plan de expedición y confirma su retorno seguro; si no lo hace dentro del plazo acordado, el sistema escala alertas automáticas hacia contactos de emergencia y cuerpos de rescate, entregando de inmediato ubicación georreferenciada y ficha médica.

> Proyecto académico — **Universidad de Lima** · Ingeniería de Software 1 · 2026  
> **Estado:** Release 01 y Release 02 completados · **25/25 historias de usuario** · **96 story points**

---



## Tabla de contenidos

- [Problema y propuesta de valor](#problema-y-propuesta-de-valor)
- [Funcionalidades](#funcionalidades)
- [Arquitectura](#arquitectura)
- [Stack tecnológico](#stack-tecnológico)
- [Estructura del repositorio](#estructura-del-repositorio)
- [Inicio rápido](#inicio-rápido)
- [Base de datos](#base-de-datos)
- [API REST](#api-rest)
- [Scripts](#scripts)
- [Seguridad y cumplimiento legal](#seguridad-y-cumplimiento-legal)
- [Equipo](#equipo)

---



## Problema y propuesta de valor

En entornos de senderismo independiente, la siniestralidad y el retraso en operaciones de rescate son críticos: la falta de información exacta sobre el paradero de las víctimas y la dependencia de reportes manuales prolongan las búsquedas durante las **horas doradas** posteriores a un incidente.

TrekSafe responde con **monitoreo pasivo** — sin hardware IoT ni rastreo GPS continuo — basado en:

1. **Registro digital del plan de ruta** (origen, destino, hora estimada de retorno, acompañantes y contactos).
2. **Check-in de retorno seguro** con ventana de tolerancia y escalamiento automático.
3. **Coordinación de rescate** mediante consola operativa para equipos especializados.

---



## Funcionalidades



### Para senderistas


| Área               | Capacidades                                                                     |
| ------------------ | ------------------------------------------------------------------------------- |
| **Cuenta**         | Registro con consentimiento Ley N° 29733, login JWT, perfil personal            |
| **Expedición**     | Creación de plan de ruta, contactos vinculados, expedición activa con countdown |
| **Seguridad**      | Check-in manual de retorno, recordatorio a 30 min del vencimiento               |
| **Datos críticos** | Ficha médica cifrada AES-256, contactos de emergencia frecuentes                |
| **Offline**        | Borradores y contactos en caché (PWA + Service Worker) para zonas sin señal     |
| **Privacidad**     | Derechos ARCO: eliminación o anonimización de datos personales                  |
| **UX**             | Interfaz mobile-first, modo oscuro para condiciones adversas en montaña         |




### Para rescatistas


| Área            | Capacidades                                                                           |
| --------------- | ------------------------------------------------------------------------------------- |
| **Acceso**      | Registro con validación simulada de credenciales institucionales (AGMP/MINCETUR)      |
| **Consola**     | Dashboard en tiempo real, filtro por zona, semáforo verde/amarillo/rojo               |
| **Alertas**     | Detalle de emergencia con ubicación y ficha médica (con auditoría de acceso)          |
| **Operaciones** | Confirmación de recepción, bitácora con estados (En búsqueda → Localizados → Cerrado) |




### Motor del sistema

- **Cron job** de control de plazos que detecta expediciones vencidas sin check-in.
- **Notificaciones por correo** a contactos del senderista y equipos de rescate (SMTP o Brevo API).
- **Idempotencia** en despacho de alertas para evitar duplicados.

---



## Arquitectura

Monorepo con separación estricta de capas: el frontend **nunca** expone claves de Supabase; toda la persistencia pasa por la API REST con `service_role`.

```mermaid
flowchart LR
  subgraph Cliente
    PWA[PWA React · Vite]
  end

  subgraph Backend
    API[Express · TypeScript]
    CRON[Cron plazos]
    MAIL[ServicioCorreo]
  end

  subgraph Datos
    PG[(PostgreSQL / Supabase)]
  end

  PWA -->|JWT REST| API
  API --> PG
  CRON --> PG
  CRON --> MAIL
  API --> MAIL
```



**Backend — Clean Architecture (nombres en español)**

```
presentation/   → Rutas HTTP, controladores, middleware
application/    → Servicios, DTOs, casos de uso
domain/         → Entidades y value objects
infrastructure/ → Repositorios, correo, cron, cifrado, JWT
```

**Frontend — PWA mobile-first (nombres en español)**

```
pages/          → Páginas senderista y rescatista
components/     → Layouts, diálogos, recordatorios
services/       → Cliente HTTP tipado (clienteApi, autenticacion, …)
lib/            → Offline, validación, sesión, tema
context/        → ContextoAutenticacion, ContextoTema
```

---



## Stack tecnológico


| Capa              | Tecnologías                                                                            |
| ----------------- | -------------------------------------------------------------------------------------- |
| **Frontend**      | React 18 · Vite 6 · TypeScript · Tailwind CSS 4 · React Router · PWA (vite-plugin-pwa) |
| **Backend**       | Node.js · Express · TypeScript · Zod · bcrypt · JWT · Helmet · CORS                    |
| **Base de datos** | PostgreSQL (Supabase) · pg · RLS deny-by-default                                       |
| **Email**         | Nodemailer (SMTP) · Brevo API (alternativa)                                            |
| **Seguridad**     | AES-256-GCM (ficha médica) · rate limiting en auth · auditoría de acceso médico        |


---



## Estructura del repositorio

```
treksake-app/
├── backend/                 # API REST + cron + email
│   ├── src/
│   │   ├── presentation/    # HTTP (routes, controllers, middleware)
│   │   ├── application/     # Servicios de negocio
│   │   ├── domain/          # Entidades
│   │   └── infrastructure/  # DB, jobs, email, security
│   └── scripts/             # Utilidades (cron manual, pruebas de mail)
├── frontend/                # PWA React (sin claves Supabase)
│   └── src/
│       ├── pages/           # Pantallas por rol
│       ├── components/      # UI reutilizable
│       └── services/        # Cliente API
├── init_schema.sql          # Esquema completo en español + semillas
├── enable_rls.sql           # Reaplicar políticas RLS (opcional)
└── .env.example             # Plantilla de variables de entorno
```

---



## Inicio rápido



### Requisitos previos

- **Node.js** ≥ 20
- **npm** ≥ 10
- Proyecto en [Supabase](https://supabase.com) con PostgreSQL habilitado
- (Opcional) Servidor SMTP o API key de [Brevo](https://www.brevo.com) para alertas por correo



### 1. Clonar e instalar dependencias

```bash
git clone <url-del-repositorio>
cd treksake-app
npm run install:all
```



### 2. Configurar variables de entorno

Copia `.env.example` y crea los archivos de entorno:

```bash
# Backend — credenciales sensibles (NUNCA en el cliente)
cp .env.example backend/.env

# Frontend — solo la URL del API
echo "VITE_API_URL=http://localhost:3000/api" > frontend/.env
```

Edita `backend/.env` con los valores de **Supabase Dashboard → Project Settings → API / Database**:


| Variable                    | Descripción                                            |
| --------------------------- | ------------------------------------------------------ |
| `SUPABASE_URL`              | URL del proyecto                                       |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave `service_role` (solo backend)                    |
| `DATABASE_URL`              | Connection string del pooler (puerto 5432)             |
| `JWT_SECRET`                | Secreto largo (`openssl rand -base64 64`)              |
| `MEDICAL_ENCRYPTION_KEY`    | Clave AES-256 de 32 bytes para ficha médica            |
| `SMTP_*` o `BREVO_API_KEY`  | Canal de envío de alertas                              |
| `CRON_INTERVAL_MS`          | Intervalo del motor de plazos (default: 60000)         |
| `CORS_ORIGIN`               | Origen del frontend (default: `http://localhost:5173`) |


> En desarrollo, `MAIL_DEV_FALLBACK=true` permite continuar si el correo falla (p. ej. IP no autorizada en Brevo); en producción usar `false`.



### 3. Inicializar la base de datos

Ejecuta en el **SQL Editor de Supabase**:

1. `init_schema.sql` — esquema completo en español (tablas, enums, índices, RLS, semillas y función RPC del cron)
2. `enable_rls.sql` — solo si necesitas reaplicar políticas RLS sobre una BD ya creada

> Las migraciones `sprint2_migration.sql`, `sprint7_migration.sql` y `post_mvp_migration.sql` están **obsoletas** (contenido fusionado en `init_schema.sql`).

El esquema incluye usuarios mock para pruebas locales (ver comentarios al final de `init_schema.sql`).

### 4. Ejecutar en desarrollo

En terminales separadas:

```bash
npm run dev:backend    # → http://localhost:3000/api/salud
npm run dev:frontend   # → http://localhost:5173
```

Verifica el health check:

```bash
curl http://localhost:3000/api/salud
```

Respuesta esperada: `{ "estado": "ok", "servicio": "treksafe-api", "correo": { ... }, "cron": { ... } }`

### 5. Build de producción

```bash
npm run build:backend
npm run build:frontend   # Salida en frontend/dist (PWA lista para desplegar)
```

---



## Base de datos

Modelo relacional en PostgreSQL con tipos ENUM y nombres en español.

**Entidades principales:** `usuarios`, `perfiles_senderista`, `perfiles_rescatista`, `expediciones`, `contactos_emergencia`, `fichas_medicas`, `bitacoras_rescate`, `registros_institucionales_rescatista`, `despachos_correo`, `auditoria_acceso_medico`.

**Estados de expedición:** `programada` → `en_progreso` → `completada` | `alerta`

El índice parcial sobre expediciones `en_progreso` con fecha límite vencida optimiza el cron job (HU-11).

---



## API REST

Prefijo base: `/api` · Autenticación: `Authorization: Bearer <JWT>` · Campos JSON en `camelCase` español

### Salud


| Método | Ruta     | Auth | Descripción                        |
| ------ | -------- | ---- | ---------------------------------- |
| `GET`  | `/salud` | —    | Estado del servicio, correo y cron |




### Autenticación


| Método | Ruta                         | Descripción               |
| ------ | ---------------------------- | ------------------------- |
| `POST` | `/auth/registrar-senderista` | Registro de senderista    |
| `POST` | `/auth/registrar-rescatista` | Registro de rescatista    |
| `POST` | `/auth/iniciar-sesion`       | Login (emite JWT por rol) |




### Usuario senderista (`/usuario`)


| Método            | Ruta                  | Descripción             |
| ----------------- | --------------------- | ----------------------- |
| `GET/PUT`         | `/ficha-medica`       | Ficha médica cifrada    |
| `GET/POST/DELETE` | `/contactos`          | Contactos de emergencia |
| `POST`            | `/privacidad/revocar` | Revocación ARCO         |




### Expediciones senderista (`/expediciones`)


| Método | Ruta                     | Descripción              |
| ------ | ------------------------ | ------------------------ |
| `POST` | `/`                      | Crear plan de expedición |
| `GET`  | `/activa`                | Expedición en curso      |
| `GET`  | `/historial`             | Historial finalizado     |
| `POST` | `/:id/confirmar-retorno` | Confirmar retorno seguro |




### Rescate (`/rescate`)


| Método  | Ruta                               | Descripción               |
| ------- | ---------------------------------- | ------------------------- |
| `GET`   | `/expediciones`                    | Expediciones monitoreadas |
| `GET`   | `/alertas`                         | Alertas activas           |
| `GET`   | `/alertas/:expedicionId`           | Detalle de emergencia     |
| `POST`  | `/alertas/:expedicionId/confirmar` | Confirmar recepción       |
| `PATCH` | `/alertas/:expedicionId/bitacora`  | Actualizar bitácora       |


---



## Scripts


| Comando                                      | Descripción                                |
| -------------------------------------------- | ------------------------------------------ |
| `npm run install:all`                        | Instala dependencias de backend y frontend |
| `npm run dev:backend`                        | API en modo watch (tsx)                    |
| `npm run dev:frontend`                       | PWA con hot reload                         |
| `npm run build:backend`                      | Compila TypeScript → `backend/dist`        |
| `npm run build:frontend`                     | Build de producción PWA                    |
| `npm test --prefix backend`                  | Tests unitarios (Node test runner)         |
| `npm run test:mail --prefix backend`         | Verifica configuración de correo           |
| `npm run test:rescue-alert --prefix backend` | Simula alerta de rescate                   |


---



## Seguridad y cumplimiento legal


| Medida                    | Implementación                                                              |
| ------------------------- | --------------------------------------------------------------------------- |
| **Ley N° 29733** (Perú)   | Consentimiento explícito en registro; ficha médica cifrada en reposo        |
| **Derechos ARCO**         | Eliminación/anonimización vía `POST /usuario/privacidad/revocar`            |
| **Segregación de roles**  | JWT con rol `senderista`                                                    |
| **RLS**                   | Políticas deny-by-default en Supabase; acceso vía `service_role` en backend |
| **Auditoría médica**      | Registro de accesos a ficha médica por rescatistas                          |
| **Rate limiting**         | 20 req/15 min en endpoints de autenticación                                 |
| **Sin claves en cliente** | Frontend solo conoce `VITE_API_URL`                                         |




### Fuera de alcance (por diseño)

- Rastreo GPS continuo vía hardware IoT
- Integración con APIs gubernamentales reales (validación simulada)
- SMS de pago como canal de alerta

---



## Equipo


| Integrante                           | Rol           |
| ------------------------------------ | ------------- |
| **Marko Antonio Lopez Bernuy**       | Product Owner |
| **Ariana Belen Blanco Quintana**     | Scrum Master  |
| **Manuel Rodrigo Llaury Murga**      | Developer     |
| **Pedro Leonardo Ormeño Moquillaza** | Developer     |
| **Yahel Jair Cordova Amez**          | Developer     |


**Docente:** Jorge Luis Irey Nuñez  
**Universidad de Lima** · Facultad de Ingeniería · Carrera de Ingeniería de Sistemas

---

TrekSafe — Verificación positiva para senderistas en los Andes peruanos.