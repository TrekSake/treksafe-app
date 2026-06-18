# Definition of Done (DoD) — TrekSafe

## Propósito

La **Definición de Terminado (DoD)** establece los criterios que un incremento (historia de usuario o funcionalidad completa) debe cumplir para considerarse **terminado** y potencialmente liberable.

Su objetivo es garantizar que el equipo no entregue incrementos incompletos, no probados o que incumplan los estándares de calidad y las restricciones técnicas definidas en [proyecto-final.md](./proyecto-final.md) y el [product_backlog.md](./product_backlog.md).

**Alcance:** aplica a las 25 historias de usuario (HU-01 a HU-25) distribuidas en Release 01 (MVP, 57 SP) y Release 02 (optimización, 39 SP).

---

## Cuándo aplicar la DoD

| Nivel | Momento de verificación |
|-------|-------------------------|
| **Historia de usuario** | Antes de mover la HU a `Done` en el backlog |
| **Sprint** | En la Sprint Review, sobre el incremento integrado |
| **Release** | Antes de declarar Release 01 o Release 02 como completado |

---

## Checklist general (DoD)

Cada incremento debe cumplir **todos** los criterios siguientes.

| ID | Criterio | Requisito verificable |
|----|----------|----------------------|
| **DOD-01** | Código implementado | La funcionalidad está en el repositorio (`main` o rama integrada) con commits descriptivos bajo convención `type(scope): description` |
| **DOD-02** | Pruebas unitarias | Las pruebas unitarias del módulo afectado pasan. Cobertura ≥ 80 % en **lógica crítica**: alertas, check-in, validaciones de coordenadas, cifrado médico, control de plazos (cron) |
| **DOD-03** | Pruebas de integración | Las interacciones con base de datos (Supabase/PostgreSQL) y correo (SMTP o Brevo API, simulado en desarrollo con `MAIL_DEV_FALLBACK`) funcionan en el flujo de la HU |
| **DOD-04** | Criterios de aceptación | Todos los escenarios **Gherkin** (Dado-Cuando-Entonces) de la HU se ejecutaron y pasaron |
| **DOD-05** | Revisión de código | Al menos un developer distinto al autor revisó y aprobó el código (PR o revisión en pareja) |
| **DOD-06** | Sin bugs críticos | No hay defectos que bloqueen el flujo principal: `registro → crear expedición → check-in → alerta` |
| **DOD-07** | Restricciones técnicas | Sin dependencias IoT (RC-03). Sin servicios cloud de pago no aprobados (RC-04). Stack limitado a tier gratuito verificado |
| **DOD-08** | Documentación actualizada | La HU queda en [product_backlog.md](./product_backlog.md) como `Done` con fecha y responsable |
| **DOD-09** | Privacidad y consentimiento | Cumple RC-05 (Ley N° 29733): consentimiento explícito donde aplique; datos sensibles cifrados en reposo; acceso médico solo en contexto de alerta activa |
| **DOD-10** | Aprobación del PO | Despliegue exitoso en **staging** y validación del Product Owner en Sprint Review |

---

## Criterios técnicos por capa

### Frontend (PWA — React + Vite)

- [ ] La pantalla coincide funcionalmente con el mockup del sprint correspondiente en `docs/proyecto-final.md`
- [ ] Diseño responsive (móvil y escritorio)
- [ ] Manejo de estados de carga, error y vacío
- [ ] Rutas protegidas según rol (`hiker` / `rescuer`)
- [ ] Sin secretos ni claves de API en el cliente (solo `VITE_API_URL`)
- [ ] Para HU-22: Service Worker y caché operativos en escenario sin conexión
- [ ] Para HU-24: modo oscuro con contraste y legibilidad validados

### Backend (Node.js + Express)

- [ ] Endpoints documentados implícitamente por convención REST existente (`/api/...`)
- [ ] Validación de entrada en servidor (no solo en cliente)
- [ ] Autenticación JWT en rutas protegidas
- [ ] Respuestas HTTP coherentes (4xx validación, 401 no autenticado, 403 sin permiso, 5xx error interno)
- [ ] Variables sensibles solo en `backend/.env` (nunca en el repositorio)
- [ ] Para HU-11: cron ejecutándose según `CRON_INTERVAL_MS` y transición `EN_CURSO` → `EN_ALERTA`
- [ ] Para HU-12/HU-13: despacho de correo registrado; idempotencia ante re-ejecución del cron

### Base de datos y seguridad

- [ ] Migraciones o scripts SQL aplicados y versionados cuando cambie el esquema
- [ ] Contraseñas con hash seguro (bcrypt/argon2)
- [ ] Ficha médica cifrada con AES-256 (`MEDICAL_ENCRYPTION_KEY`)
- [ ] Rol de rescatista asignado solo tras validación contra registro simulado (HU-03)
- [ ] Auditoría de acceso a datos médicos en contexto de rescate (Release 02)

---

## Flujos críticos que no deben romperse (DOD-06)

Al cerrar cualquier HU, verificar que estos caminos siguen operativos:

```text
Senderista:  Registro → Login → Perfil/Contactos → Crear expedición → Vista activa → Check-in
Sistema:     Cron detecta vencimiento → Estado EN_ALERTA → Correos a contactos y rescatistas
Rescatista:  Login → Panel alertas → Confirmar recepción → (R2) Ficha emergencia → Bitácora
```

---

## Criterios adicionales por release

### Release 01 — MVP (HU-01 a HU-14, Sprints 1–4)

| Sprint | HUs | Verificación mínima al cerrar sprint |
|--------|-----|--------------------------------------|
| 1 | HU-01, HU-02, HU-03 | Cuentas demo operativas; login diferenciado por rol; validación de credencial rescatista solo en registro |
| 2 | HU-04 a HU-08 | Expedición creada con origen/destino, contactos, acompañantes; médica cifrada en BD |
| 3 | HU-09, HU-10, HU-11 | Temporizador en UI; check-in finaliza expedición; cron genera alerta automática |
| 4 | HU-12, HU-13, HU-14 | Correos despachados; rescatista confirma recepción con trazabilidad |

**Criterio de release:** el flujo end-to-end `expedición vencida → alerta → notificación → confirmación` funciona en staging.

### Release 02 — Optimización (HU-15 a HU-25, Sprints 5–8)

| Sprint | HUs | Verificación mínima al cerrar sprint |
|--------|-----|--------------------------------------|
| 5 | HU-15, HU-16, HU-17 | Dashboard rescatista con filtros por zona y semáforo verde/amarillo/rojo |
| 6 | HU-18, HU-19, HU-20 | Ficha de emergencia desbloqueada solo en alerta; bitácora con estados; historial senderista |
| 7 | HU-21, HU-22, HU-23 | Revocación/anonimización ARCO; formularios offline con sincronización; validación de coordenadas |
| 8 | HU-24, HU-25 | Modo oscuro; recordatorio visual a 30 min del vencimiento |

**Criterio de release:** cumplimiento normativo (ARCO), resiliencia offline básica y consola operativa de rescate validadas por el PO.

---

## Plantilla de cierre por historia de usuario

Copiar y completar al marcar una HU como `Done`:

```markdown
### HU-XX — [Título]
- **Responsable:** [nombre]
- **Fecha cierre:** YYYY-MM-DD
- **PR / commits:** [enlace o hash]
- **Revisor:** [nombre]

| Criterio | ✓ |
|----------|---|
| DOD-01 Código en repo | |
| DOD-02 Unit tests | |
| DOD-03 Integración BD/correo | |
| DOD-04 Gherkin cumplido | |
| DOD-05 Code review | |
| DOD-06 Sin bugs críticos en flujo principal | |
| DOD-07 Restricciones RC-03/RC-04 | |
| DOD-08 Backlog actualizado | |
| DOD-09 Privacidad RC-05 | |
| DOD-10 PO aprueba en staging | |
```

---

## Exclusiones explícitas (no forman parte de la DoD)

Estos elementos están **fuera de alcance** según el proyecto; su ausencia **no** impide marcar una HU como Done:

- Rastreo GPS en tiempo real vía hardware IoT
- SMS en producción (Twilio u otros de pago)
- Integración real con INDECI, CORESEC, MINCETUR o AGMP
- Escalabilidad masiva más allá del volumen MVP (RC-01)

---

## Relación con otros artefactos

| Artefacto | Relación |
|-----------|----------|
| [Definition of Ready (DoR)](./definition_of_ready.md) | La HU debe cumplir DoR **antes** de entrar al sprint; la DoD aplica **al salir** |
| [product_backlog.md](./product_backlog.md) | Fuente de HUs, prioridad, SP y estado |
| [tasks_mvp.md](./tasks_mvp.md) | Desglose técnico de tareas por HU |
| Restricciones RC-01 a RC-05 | Marco normativo y técnico obligatorio |

---

*Fuente: Elaboración propia — TrekSafe, Ingeniería de Software 1, Universidad de Lima, 2026.*
