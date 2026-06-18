# Product Backlog — TrekSafe

**Última actualización:** 2026-06-18  
**Product Owner:** Marko Antonio Lopez Bernuy  
**Referencias:** [proyecto-final.md](./proyecto-final.md) · [definition_of_ready.md](./definition_of_ready.md) · [definition_of_done.md](./definition_of_done.md) · [tasks_mvp.md](./tasks_mvp.md)

---

## Resumen de progreso

| Métrica | Valor |
|---------|------:|
| Total historias | 25 |
| Story points totales | 96 |
| **Completadas (Done)** | 25 HUs · 96 SP |
| **En progreso** | 0 HUs |
| **Pendientes (To Do)** | 0 HUs |
| Release 01 (MVP) | **14/14** HUs · 57/57 SP |
| Release 02 | **11/11** HUs · 39/39 SP |

### Leyenda de estados

| Estado | Significado |
|--------|-------------|
| **Done** | Implementado en código; flujo verificable en dev |
| **In Progress** | Implementación parcial o gaps conocidos vs criterios de aceptación |
| **To Do** | Sin implementar |

> **DoD:** Cierre formal documentado en [definition_of_done.md](./definition_of_done.md) (25/25 HUs validadas).

---

## Release 01 — MVP funcional (57 SP)

### Sprint 1 — Cimientos y accesos básicos (13 SP) ✅

| ID | Título | Prioridad | SP | Dev Ready | Status |
|----|--------|-----------|---:|:---------:|:------:|
| HU-01 | Registro de Senderistas | Alta | 5 | Yes | Done |
| HU-02 | Inicio de Sesión Seguro | Alta | 3 | Yes | Done |
| HU-03 | Registro de Cuerpos de Rescate | Alta | 5 | Yes | Done |

<details>
<summary>User stories y notas — Sprint 1</summary>

| ID | User Story | Notas de implementación |
|----|------------|-------------------------|
| HU-01 | Como senderista, quiero registrarme ingresando mis datos personales para gestionar mis expediciones de forma segura. | `RegisterHikerPage`, `POST /api/auth/register-hiker`, consentimiento Ley 29733 |
| HU-02 | Como usuario registrado, quiero iniciar sesión con mis credenciales para acceder a mi panel personal. | JWT, `LoginPage`, redirección por rol |
| HU-03 | Como miembro de rescate, quiero registrarme con credenciales institucionales para acceder a funcionalidades de emergencia. | Validación simulada AGMP/MINCETUR en registro |

</details>

---

### Sprint 2 — Datos críticos y preparación de ruta (18 SP) ✅

| ID | Título | Prioridad | SP | Dev Ready | Status |
|----|--------|-----------|---:|:---------:|:------:|
| HU-04 | Información Inicial de Expedición | Alta | 3 | Yes | Done |
| HU-05 | Historial Médico y Consentimiento | Alta | 5 | Yes | Done |
| HU-06 | Contactos de Emergencia Frecuentes | Alta | 2 | Yes | Done |
| HU-07 | Creación de Plan de Expedición | Alta | 5 | Yes | Done |
| HU-08 | Asociación de Contactos y Grupo | Alta | 3 | Yes | Done |

<details>
<summary>User stories y notas — Sprint 2</summary>

| ID | User Story | Notas de implementación |
|----|------------|-------------------------|
| HU-04 | Como senderista, quiero registrar ubicación de inicio y destino para facilitar mi localización en emergencia. | Origen/destino en `CreateExpeditionPage`; coordenadas opcionales |
| HU-05 | Como senderista, quiero registrar y cifrar mis datos de salud con consentimiento explícito (Ley N° 29733). | AES-256 en reposo; `MedicalInfoPage` |
| HU-06 | Como senderista, quiero registrar contactos de confianza para asociarlos a mis rutas. | CRUD contactos; caché local para offline |
| HU-07 | Como senderista, quiero registrar itinerario con fecha, salida y retorno estimado. | `POST /api/expeditions`, estados programado/en curso |
| HU-08 | Como senderista, quiero vincular contactos y acompañantes a la expedición actual. | `contactIds` + `companionNames` en creación |

</details>

---

### Sprint 3 — Núcleo del monitoreo pasivo (14 SP) ✅

| ID | Título | Prioridad | SP | Dev Ready | Status |
|----|--------|-----------|---:|:---------:|:------:|
| HU-09 | Visualización de Expedición Activa | Alta | 3 | Yes | Done |
| HU-10 | Check-in Manual de Retorno Seguro | Alta | 3 | Yes | Done |
| HU-11 | Motor de Control de Plazos (Cron Job) | Alta | 8 | Yes | Done |

<details>
<summary>User stories y notas — Sprint 3</summary>

| ID | User Story | Notas de implementación |
|----|------------|-------------------------|
| HU-09 | Como senderista, quiero ver resumen de ruta en curso y contador de tiempo restante. | `ActiveExpeditionPage`, `useCountdown` |
| HU-10 | Como senderista, quiero marcar mi regreso exitoso antes de vencer el plazo. | Re-auth con contraseña; estado `FINALIZADA` |
| HU-11 | Como sistema, quiero verificar expediciones vencidas sin check-in y cambiar estado a Alerta. | `expeditionDeadlineCron.ts`, `CRON_INTERVAL_MS` |

</details>

---

### Sprint 4 — Despacho de notificaciones de alerta (12 SP) ✅

| ID | Título | Prioridad | SP | Dev Ready | Status |
|----|--------|-----------|---:|:---------:|:------:|
| HU-12 | Alerta por Correo a Contactos | Alta | 5 | Yes | Done |
| HU-13 | Alerta por Correo a Equipos de Rescate | Alta | 5 | Yes | Done |
| HU-14 | Confirmación de Recepción de Alerta | Media | 2 | Yes | Done |

<details>
<summary>User stories y notas — Sprint 4</summary>

| ID | User Story | Notas de implementación |
|----|------------|-------------------------|
| HU-12 | Como sistema, quiero enviar correo automático a contactos del senderista desfasado. | `AlertNotificationService`, idempotencia en despacho |
| HU-13 | Como sistema, quiero despachar correo con ubicación y ficha médica a equipos de rescate. | `RescueAlertService`; fallback `MAIL_DEV_FALLBACK` en dev |
| HU-14 | Como equipo de rescate, quiero confirmar recepción de alerta para iniciar seguimiento. | `POST /rescue/alerts/:id/confirm`, trazabilidad usuario/fecha |

</details>

---

## Release 02 — Optimización y monitoreo de emergencias (39 SP)

### Sprint 5 — Consola de monitoreo (11 SP) ✅

| ID | Título | Prioridad | SP | Dev Ready | Status |
|----|--------|-----------|---:|:---------:|:------:|
| HU-15 | Dashboard Central de Expediciones | Alta | 5 | Yes | Done |
| HU-16 | Filtro de Expediciones por Zona | Media | 3 | Yes | Done |
| HU-17 | Consola Visual de Alertas por Colores | Alta | 3 | Yes | Done |

<details>
<summary>User stories y notas — Sprint 5</summary>

| ID | User Story | Notas de implementación |
|----|------------|-------------------------|
| HU-15 | Como rescatista, quiero un panel en tiempo real con expediciones en curso de la región. | `RescueConsolePage`, polling 30 s |
| HU-16 | Como rescatista, quiero filtrar rutas por sector o nevado. | Filtro texto sobre `end_location` (sin catálogo fijo de zonas) |
| HU-17 | Como rescatista, quiero códigos de color (verde/amarillo/rojo) según nivel de riesgo. | `computeExpeditionRiskLevel`; amarillo ≤30 min al límite |

</details>

---

### Sprint 6 — Gestión operativa e historial (10 SP) ✅

| ID | Título | Prioridad | SP | Dev Ready | Status |
|----|--------|-----------|---:|:---------:|:------:|
| HU-18 | Consulta de Ficha de Emergencia | Alta | 5 | Yes | Done |
| HU-19 | Bitácora y Estados de Rescate | Alta | 3 | Yes | Done |
| HU-20 | Historial de Expediciones Finalizadas | Baja | 2 | Yes | Done |

<details>
<summary>User stories y notas — Sprint 6</summary>

| ID | User Story | Notas de implementación |
|----|------------|-------------------------|
| HU-18 | Como rescatista, quiero abrir el expediente completo de una alerta roja. | `RescueAlertDetailPage`; médica solo en alerta + auditoría |
| HU-19 | Como rescatista, quiero registrar notas y estados (Búsqueda, Localizado, Cerrado). | `PATCH /rescue/alerts/:id/log` |
| HU-20 | Como senderista, quiero historial de rutas pasadas y estadísticas básicas. | `ExpeditionHistoryPage`, `GET /expeditions/history` |

</details>

---

### Sprint 7 — Offline, seguridad y cumplimiento (12 SP) ✅

| ID | Título | Prioridad | SP | Dev Ready | Status |
|----|--------|-----------|---:|:---------:|:------:|
| HU-21 | Revocación de Datos (Derechos ARCO) | Media | 5 | Yes | Done |
| HU-22 | Caché y Formularios Offline | Media | 5 | Yes | Done |
| HU-23 | Validación de Coordenadas | Media | 2 | Yes | Done |

<details>
<summary>User stories y notas — Sprint 7</summary>

| ID | User Story | Notas de implementación |
|----|------------|-------------------------|
| HU-21 | Como senderista, quiero eliminar o anonimizar mis datos según Ley N° 29733. | `PrivacySettingsPage`, `DataRevocationPage`, `POST /user/privacy/revoke` |
| HU-22 | Como senderista, quiero formularios en caché vía Service Workers sin internet en base. | `offlineStorage.ts` (Cache API `treksafe-offline-v1`), plantillas/borradores/contactos; PWA + `navigateFallback`; sync al reconectar |
| HU-23 | Como senderista, quiero validación estricta de coordenadas manuales. | `coordinates.ts` (FE/BE), bounds Perú, test unitario |

</details>

---

### Sprint 8 — Pulido UX y prevención proactiva (6 SP) ✅

| ID | Título | Prioridad | SP | Dev Ready | Status |
|----|--------|-----------|---:|:---------:|:------:|
| HU-24 | Optimización de UX y Modo Oscuro | Baja | 3 | Yes | Done |
| HU-25 | Notificación de Proximidad de Expiración | Media | 3 | Yes | Done |

<details>
<summary>User stories y notas — Sprint 8</summary>

| ID | User Story | Notas de implementación |
|----|------------|-------------------------|
| HU-24 | Como senderista, quiero interfaz adaptiva con modo oscuro en condiciones adversas. | `ThemeToggle`, `ThemeProvider`, clases dark app-wide |
| HU-25 | Como sistema, quiero alerta visual a 30 min del vencimiento para recordar check-in. | `ReturnReminderSheet`, banner urgente en expedición activa |

</details>

---

## Vista consolidada (tabla completa)

| ID | Título | Release | Sprint | Prioridad | SP | Dev Ready | Status |
|----|--------|--------:|-------:|-----------|---:|:---------:|:------:|
| HU-01 | Registro de Senderistas | 1 | 1 | Alta | 5 | Yes | Done |
| HU-02 | Inicio de Sesión Seguro | 1 | 1 | Alta | 3 | Yes | Done |
| HU-03 | Registro de Cuerpos de Rescate | 1 | 1 | Alta | 5 | Yes | Done |
| HU-04 | Información Inicial de Expedición | 1 | 2 | Alta | 3 | Yes | Done |
| HU-05 | Historial Médico y Consentimiento | 1 | 2 | Alta | 5 | Yes | Done |
| HU-06 | Contactos de Emergencia Frecuentes | 1 | 2 | Alta | 2 | Yes | Done |
| HU-07 | Creación de Plan de Expedición | 1 | 2 | Alta | 5 | Yes | Done |
| HU-08 | Asociación de Contactos y Grupo | 1 | 2 | Alta | 3 | Yes | Done |
| HU-09 | Visualización de Expedición Activa | 1 | 3 | Alta | 3 | Yes | Done |
| HU-10 | Check-in Manual de Retorno Seguro | 1 | 3 | Alta | 3 | Yes | Done |
| HU-11 | Motor de Control de Plazos (Cron Job) | 1 | 3 | Alta | 8 | Yes | Done |
| HU-12 | Alerta por Correo a Contactos | 1 | 4 | Alta | 5 | Yes | Done |
| HU-13 | Alerta por Correo a Equipos de Rescate | 1 | 4 | Alta | 5 | Yes | Done |
| HU-14 | Confirmación de Recepción de Alerta | 1 | 4 | Media | 2 | Yes | Done |
| HU-15 | Dashboard Central de Expediciones | 2 | 5 | Alta | 5 | Yes | Done |
| HU-16 | Filtro de Expediciones por Zona | 2 | 5 | Media | 3 | Yes | Done |
| HU-17 | Consola Visual de Alertas por Colores | 2 | 5 | Alta | 3 | Yes | Done |
| HU-18 | Consulta de Ficha de Emergencia | 2 | 6 | Alta | 5 | Yes | Done |
| HU-19 | Bitácora y Estados de Rescate | 2 | 6 | Alta | 3 | Yes | Done |
| HU-20 | Historial de Expediciones Finalizadas | 2 | 6 | Baja | 2 | Yes | Done |
| HU-21 | Revocación de Datos (Derechos ARCO) | 2 | 7 | Media | 5 | Yes | Done |
| HU-22 | Caché y Formularios Offline | 2 | 7 | Media | 5 | Yes | Done |
| HU-23 | Validación de Coordenadas | 2 | 7 | Media | 2 | Yes | Done |
| HU-24 | Optimización de UX y Modo Oscuro | 2 | 8 | Baja | 3 | Yes | Done |
| HU-25 | Notificación de Proximidad de Expiración | 2 | 8 | Media | 3 | Yes | Done |

---

## Pendientes y deuda técnica

| Ítem | HU | Acción sugerida |
|------|-----|-----------------|
| Filtro por zonas predefinidas (nevados) | HU-16 | Mejora futura: catálogo de sectores |
| Ampliación cobertura tests automatizados | Todas | Extender suite más allá de lógica crítica |
| Correo en producción | HU-12, HU-13 | Configurar Brevo/SMTP en entorno desplegado |

---

## Burndown por release (story points)

```text
Release 01:  █████████████████████████████████████████████████████████ 57/57 (100 %)
Release 02:  █████████████████████████████████████████████████████████ 39/39 (100 %)
Total:       █████████████████████████████████████████████████████████ 96/96 (100 %)
```

---

*Fuente: Elaboración propia — TrekSafe. Estados revisados contra código en `frontend/` y `backend/`.*
