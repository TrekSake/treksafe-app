# Desglose de tareas — TrekSafe

**Última actualización:** 2026-06-18  
**Equipo:** Marko Antonio Lopez Bernuy (PO) · Ariana Belen Blanco Quintana (SM) · Manuel Rodrigo Llaury Murga · Pedro Leonardo Ormeño Moquillaza · Yahel Jair Cordova Amez  
**Referencias:** [product_backlog.md](./product_backlog.md) · [proyecto-final.md](./proyecto-final.md)

**Leyenda:** todas las tareas del Release 01 y Release 02 se encuentran en estado **Done**.

---

## Release 01 — MVP (Sprints 1–4)

### Sprint 1 — Cimientos y accesos básicos (13 SP)

#### HU-01 — Registro de Senderistas

| Task | Área | Subtarea | Estado | Responsable |
|:----:|------|----------|:------:|-------------|
| 1 | Frontend | Formulario responsive (nombre, apellido, DNI, correo, celular, contraseña) | Done | Manuel Llaury |
| 1 | Frontend | Validaciones cliente (DNI, robustez de clave) | Done | Manuel Llaury |
| 1 | Frontend | Checkbox obligatorio Ley N° 29733 | Done | Manuel Llaury |
| 2 | Backend | `POST /api/auth/register-hiker` | Done | Pedro Ormeño |
| 2 | Backend | Validación servidor y correo único | Done | Pedro Ormeño |
| 3 | BD/Seguridad | Tabla `users` con rol `hiker` | Done | Yahel Córdova |
| 3 | BD/Seguridad | Hash bcrypt de contraseña | Done | Yahel Córdova |
| 4 | QA | Pruebas caja negra formularios inválidos | Done | Ariana Blanco |

#### HU-02 — Inicio de Sesión Seguro

| Task | Área | Subtarea | Estado | Responsable |
|:----:|------|----------|:------:|-------------|
| 1 | Frontend | Pantalla login con estados de error | Done | Pedro Ormeño |
| 1 | Frontend | Almacenamiento seguro JWT | Done | Pedro Ormeño |
| 2 | Backend | `POST /api/auth/login` | Done | Manuel Llaury |
| 2 | Backend | Verificación hash + emisión JWT | Done | Manuel Llaury |
| 3 | QA | Denegación credenciales incorrectas | Done | Ariana Blanco |

#### HU-03 — Registro de Cuerpos de Rescate

| Task | Área | Subtarea | Estado | Responsable |
|:----:|------|----------|:------:|-------------|
| 1 | Frontend | Formulario rescatista (institución, credencial, nombre, fecha nac.) | Done | Yahel Córdova |
| 1 | Frontend | Mensajes validación exitosa/fallida | Done | Yahel Córdova |
| 2 | Backend | `POST /api/auth/register-rescuer` | Done | Pedro Ormeño |
| 2 | Backend | Servicio validación credencial simulada | Done | Pedro Ormeño |
| 2 | Backend | Rol `rescuer` solo si validación OK | Done | Pedro Ormeño |
| 3 | BD | Registro simulado credenciales AGMP/MINCETUR | Done | Manuel Llaury |
| 4 | QA | Registro válido/inválido y login posterior | Done | Ariana Blanco |

---

### Sprint 2 — Datos críticos y preparación de ruta (18 SP)

#### HU-04 — Información Inicial de Expedición

| Task | Área | Subtarea | Estado | Responsable |
|:----:|------|----------|:------:|-------------|
| 1 | Frontend | Campos ubicación inicial y destino | Done | Manuel Llaury |
| 1 | Frontend | Validación campos obligatorios | Done | Manuel Llaury |
| 2 | Backend | Persistencia en `POST /api/expeditions` | Done | Pedro Ormeño |
| 3 | BD | Campos origen/destino en modelo expedición | Done | Yahel Córdova |
| 4 | QA | Registro y recuperación de datos | Done | Ariana Blanco |

#### HU-05 — Historial Médico y Consentimiento

| Task | Área | Subtarea | Estado | Responsable |
|:----:|------|----------|:------:|-------------|
| 1 | Frontend | Panel ficha médica + consentimiento explícito | Done | Yahel Córdova |
| 2 | Backend | `PUT/GET /api/user/medical-info` | Done | Manuel Llaury |
| 3 | Seguridad | Cifrado AES-256 en reposo (RC-05) | Done | Pedro Ormeño |
| 4 | QA | Verificación no legible en BD | Done | Ariana Blanco |

#### HU-06 — Contactos de Emergencia Frecuentes

| Task | Área | Subtarea | Estado | Responsable |
|:----:|------|----------|:------:|-------------|
| 1 | Frontend | CRUD contactos + regex correo/teléfono | Done | Pedro Ormeño |
| 2 | Backend | `GET/POST/DELETE /api/user/contacts` | Done | Manuel Llaury |
| 3 | QA | Campos obligatorios no omitibles | Done | Ariana Blanco |

#### HU-07 — Creación de Plan de Expedición

| Task | Área | Subtarea | Estado | Responsable |
|:----:|------|----------|:------:|-------------|
| 1 | Frontend | Formulario itinerario (fechas, tolerancia) | Done | Manuel Llaury |
| 2 | Backend | `POST /api/expeditions` + validación temporal | Done | Pedro Ormeño |
| 3 | BD | Estados `programmed` / `in_progress` | Done | Yahel Córdova |
| 4 | QA | Rechazo timestamps incoherentes | Done | Ariana Blanco |

#### HU-08 — Asociación de Contactos y Grupo

| Task | Área | Subtarea | Estado | Responsable |
|:----:|------|----------|:------:|-------------|
| 1 | Frontend | Selector contactos + lista acompañantes | Done | Yahel Córdova |
| 2 | Backend | `contactIds` y `companionNames` en creación | Done | Manuel Llaury |
| 3 | BD | Relaciones expedición–contacto | Done | Pedro Ormeño |

---

### Sprint 3 — Monitoreo pasivo (14 SP)

#### HU-09 — Visualización de Expedición Activa

| Task | Área | Subtarea | Estado | Responsable |
|:----:|------|----------|:------:|-------------|
| 1 | Frontend | Dashboard senderista + contador regresivo | Done | Pedro Ormeño |
| 2 | Backend | `GET /api/expeditions/active` | Done | Manuel Llaury |
| 3 | QA | Temporizador coherente con hora límite | Done | Ariana Blanco |

#### HU-10 — Check-in Manual de Retorno Seguro

| Task | Área | Subtarea | Estado | Responsable |
|:----:|------|----------|:------:|-------------|
| 1 | Frontend | Botón retorno + confirmación contraseña | Done | Yahel Córdova |
| 2 | Backend | `POST /api/expeditions/:id/check-in` → `completed` | Done | Pedro Ormeño |
| 3 | QA | Detención temporizador tras check-in | Done | Ariana Blanco |

#### HU-11 — Motor de Control de Plazos (Cron)

| Task | Área | Subtarea | Estado | Responsable |
|:----:|------|----------|:------:|-------------|
| 1 | Backend | `expeditionDeadlineCron.ts` (intervalo configurable) | Done | Manuel Llaury |
| 1 | Backend | Promoción `programmed` → `in_progress` | Done | Manuel Llaury |
| 2 | BD | Transición `in_progress` → `alert` por vencimiento | Done | Yahel Córdova |
| 3 | Ops | Script `run-cron-tick.ts` + health cron | Done | Pedro Ormeño |
| 4 | QA | Flujo vencimiento sin check-in | Done | Ariana Blanco |

---

### Sprint 4 — Notificaciones de alerta (12 SP)

#### HU-12 — Alerta por Correo a Contactos

| Task | Área | Subtarea | Estado | Responsable |
|:----:|------|----------|:------:|-------------|
| 1 | Backend | `MailService` SMTP/Brevo + plantilla HTML | Done | Pedro Ormeño |
| 1 | Backend | `AlertNotificationService` a contactos vinculados | Done | Pedro Ormeño |
| 2 | BD | `EmailDispatchRepository` idempotencia | Done | Manuel Llaury |
| 3 | QA | Despacho al pasar a `alert` | Done | Ariana Blanco |

#### HU-13 — Alerta por Correo a Equipos de Rescate

| Task | Área | Subtarea | Estado | Responsable |
|:----:|------|----------|:------:|-------------|
| 1 | Backend | `RescueAlertService` + ficha técnica | Done | Manuel Llaury |
| 1 | Backend | Descifrado médico solo para envío emergencia | Done | Manuel Llaury |
| 2 | QA | Correo a rescatistas validados | Done | Ariana Blanco |

#### HU-14 — Confirmación de Recepción de Alerta

| Task | Área | Subtarea | Estado | Responsable |
|:----:|------|----------|:------:|-------------|
| 1 | Frontend | Alertas pendientes + botón confirmar | Done | Yahel Córdova |
| 2 | Backend | `POST /rescue/alerts/:id/confirm` + trazabilidad | Done | Pedro Ormeño |
| 3 | QA | Restricción rol rescatista | Done | Ariana Blanco |

---

## Release 02 — Optimización (Sprints 5–8)

### Sprint 5 — Consola de monitoreo (11 SP)

#### HU-15 — Dashboard Central de Expediciones

| Task | Área | Subtarea | Estado | Responsable |
|:----:|------|----------|:------:|-------------|
| 1 | Frontend | `RescueConsolePage` con tarjetas e indicadores | Done | Manuel Llaury |
| 2 | Backend | `GET /api/rescue/expeditions` | Done | Pedro Ormeño |
| 3 | QA | Listado coherente con estados reales | Done | Ariana Blanco |

#### HU-16 — Filtro de Expediciones por Zona

| Task | Área | Subtarea | Estado | Responsable |
|:----:|------|----------|:------:|-------------|
| 1 | Frontend | Campo filtro por sector/destino | Done | Yahel Córdova |
| 2 | Backend | Parámetro `zone` en listado monitoreo | Done | Manuel Llaury |
| 3 | QA | Actualización lista al filtrar | Done | Ariana Blanco |

#### HU-17 — Consola Visual de Alertas por Colores

| Task | Área | Subtarea | Estado | Responsable |
|:----:|------|----------|:------:|-------------|
| 1 | Backend | `computeExpeditionRiskLevel` verde/amarillo/rojo | Done | Pedro Ormeño |
| 2 | Frontend | Tarjetas con código de color por riesgo | Done | Yahel Córdova |
| 3 | QA | Consistencia colores vs tiempo restante | Done | Ariana Blanco |

---

### Sprint 6 — Gestión operativa e historial (10 SP)

#### HU-18 — Consulta de Ficha de Emergencia

| Task | Área | Subtarea | Estado | Responsable |
|:----:|------|----------|:------:|-------------|
| 1 | Frontend | `RescueAlertDetailPage` ficha completa | Done | Manuel Llaury |
| 2 | Backend | `GET /api/rescue/alerts/:id` + auditoría médica | Done | Pedro Ormeño |
| 3 | QA | Médica visible solo en alerta activa | Done | Ariana Blanco |

#### HU-19 — Bitácora y Estados de Rescate

| Task | Área | Subtarea | Estado | Responsable |
|:----:|------|----------|:------:|-------------|
| 1 | Frontend | Notas y estados en_busqueda/localizados/cerrado | Done | Yahel Córdova |
| 2 | Backend | `PATCH /api/rescue/alerts/:id/log` | Done | Manuel Llaury |
| 3 | QA | Trazabilidad fecha/usuario en bitácora | Done | Ariana Blanco |

#### HU-20 — Historial de Expediciones Finalizadas

| Task | Área | Subtarea | Estado | Responsable |
|:----:|------|----------|:------:|-------------|
| 1 | Frontend | `ExpeditionHistoryPage` + estadísticas | Done | Pedro Ormeño |
| 2 | Backend | `GET /api/expeditions/history` | Done | Manuel Llaury |
| 3 | QA | Solo expediciones completadas con check-in | Done | Ariana Blanco |

---

### Sprint 7 — Offline, seguridad y cumplimiento (12 SP)

#### HU-21 — Revocación de Datos (ARCO)

| Task | Área | Subtarea | Estado | Responsable |
|:----:|------|----------|:------:|-------------|
| 1 | Frontend | `PrivacySettingsPage` + `DataRevocationPage` | Done | Yahel Córdova |
| 2 | Backend | `POST /api/user/privacy/revoke` eliminar/anonimizar | Done | Pedro Ormeño |
| 3 | QA | Cumplimiento RC-05 y cierre sesión al eliminar | Done | Ariana Blanco |

#### HU-22 — Caché y Formularios Offline

| Task | Área | Subtarea | Estado | Responsable |
|:----:|------|----------|:------:|-------------|
| 1 | Frontend | PWA + `offlineStorage.ts` (Cache API SW) | Done | Manuel Llaury |
| 1 | Frontend | Plantillas, borradores y sync al reconectar | Done | Manuel Llaury |
| 2 | Frontend | Caché contactos offline | Done | Pedro Ormeño |
| 3 | QA | Formulario usable sin conexión en base | Done | Ariana Blanco |

#### HU-23 — Validación de Coordenadas

| Task | Área | Subtarea | Estado | Responsable |
|:----:|------|----------|:------:|-------------|
| 1 | Frontend | `coordinates.ts` + validación en formulario | Done | Yahel Córdova |
| 2 | Backend | Validación Zod + bounds Perú | Done | Manuel Llaury |
| 3 | QA | Test unitario `coordinates.test.ts` | Done | Pedro Ormeño |

---

### Sprint 8 — Pulido UX y prevención proactiva (6 SP)

#### HU-24 — Optimización de UX y Modo Oscuro

| Task | Área | Subtarea | Estado | Responsable |
|:----:|------|----------|:------:|-------------|
| 1 | Frontend | `ThemeProvider` + `ThemeToggle` app-wide | Done | Yahel Córdova |
| 2 | Frontend | Botones táctiles y jerarquía visual | Done | Pedro Ormeño |
| 3 | QA | Contraste y legibilidad modo oscuro | Done | Ariana Blanco |

#### HU-25 — Notificación de Proximidad de Expiración

| Task | Área | Subtarea | Estado | Responsable |
|:----:|------|----------|:------:|-------------|
| 1 | Frontend | Banner urgente ≤30 min en expedición activa | Done | Manuel Llaury |
| 2 | Frontend | `ReturnReminderSheet` global senderista | Done | Manuel Llaury |
| 3 | QA | Recordatorio sin falsas alarmas de rescate | Done | Ariana Blanco |

---

## Resumen de ejecución

| Release | Sprints | HUs | Tareas | Estado global |
|---------|--------:|----:|-------:|:-------------:|
| R1 — MVP | 1–4 | 14 | 68 | **Done** |
| R2 — Optimización | 5–8 | 11 | 42 | **Done** |
| **Total** | 8 | 25 | 110 | **Done** |

---

*Fuente: Elaboración propia — TrekSafe, Ingeniería de Software 1, Universidad de Lima, 2026.*
