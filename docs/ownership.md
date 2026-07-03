# Ownership del equipo — TrekSafe

Reparto de responsabilidades para que **los 5 integrantes** revisen, mejoren y entreguen commits propios sobre `main`. Alineado con [tasks_mvp.md](./tasks_mvp.md) y los casos de uso de negocio (CUN).

---

## Objetivo

El código está integrado, pero cada integrante debe:

1. **Dominar** su parte del sistema.
2. **Revisar** flujo, código y criterios de aceptación de sus HUs.
3. **Mejorar** con al menos un commit real (test, fix, refactor, doc, UX).
4. **Abrir PR** a `main` y revisar la de un compañero.

> No se reparten commits antiguos ni se falsifica autoría. Cada uno aporta trabajo nuevo y verificable.

---

## Flujo Git (obligatorio)

```text
main (actualizado) → rama feature/<nombre> → PR → review cruzada → merge a main
```

### Secuencia inicial (una sola vez)

```bash
git checkout main
git pull origin main
```

Si la integración aún vive en otra rama (p. ej. `rama-marko`), el PO la mergea a `main` antes de que el equipo empiece.

### Por integrante

```bash
git checkout main
git pull origin main
git checkout -b feat/<integrante>-<tema>
# revisar, mejorar, commit
git push -u origin feat/<integrante>-<tema>
gh pr create --base main --title "..." --body "..."
```

### Convención de ramas

| Integrante | Rama sugerida |
|------------|---------------|
| Manuel Llaury | `feat/manuel-auth-expediciones` |
| Pedro Ormeño | `feat/pedro-datos-seguridad` |
| Yahel Córdova | `feat/yahel-rescate-alertas` |
| Ariana Blanco | `feat/ariana-qa-validacion` |
| Marko Lopez | `feat/marko-docs-integracion` |

### Reglas

- **Una rama activa por persona** a la vez.
- **No push directo a `main`** — siempre PR.
- **Ownership respetado:** cambios fuera de tu parte solo con acuerdo del dueño o del PO.
- **PR pequeño:** 1–5 commits enfocados; evitar reescrituras masivas.
- **Reviewer asignado:** la persona indicada en la tabla inferior.

---

## Equipo

| Integrante | Rol | Parte | CUN principal |
|------------|-----|-------|---------------|
| Manuel Rodrigo Llaury Murga | Developer | A — Auth y expedición senderista | CUN-01 |
| Pedro Leonardo Ormeño Moquillaza | Developer | B — Datos sensibles, check-in e historial | CUN-01 / CUN-02 |
| Yahel Jair Cordova Amez | Developer | C — Alertas, cron y consola rescatista | CUN-03 |
| Ariana Belen Blanco Quintana | Scrum Master | D — Calidad y validación DoD | Transversal |
| Marko Antonio Lopez Bernuy | Product Owner | E — Documentación e integración | Transversal |

---

## Parte A — Manuel Llaury

**Dominio:** registro/login senderista, creación y monitoreo de expedición, cron, recordatorios, offline PWA.

### Historias de usuario (owner principal)

HU-01, HU-02 (backend), HU-04, HU-07, HU-08 (backend), HU-09 (backend), HU-11, HU-13, HU-15 (frontend), HU-16 (backend), HU-18 (frontend), HU-19 (backend), HU-20 (backend), HU-22, HU-23 (backend), HU-25

### Endpoints API

| Método | Ruta |
|--------|------|
| `POST` | `/api/auth/login` |
| `GET` | `/api/expeditions/active` |
| `GET` | `/api/expeditions/history` |
| Cron | `expeditionDeadlineCron.ts` |

### Archivos clave

**Frontend**

```
frontend/src/pages/RegisterHikerPage.tsx
frontend/src/pages/CreateExpeditionPage.tsx
frontend/src/pages/ExpeditionListPage.tsx
frontend/src/pages/ActiveExpeditionPage.tsx
frontend/src/pages/RescueConsolePage.tsx
frontend/src/pages/RescueAlertDetailPage.tsx
frontend/src/components/ReturnReminderSheet.tsx
frontend/src/components/SenderistaReminderHost.tsx
frontend/src/lib/offlineExpedition.ts
frontend/src/lib/offlineStorage.ts
frontend/src/hooks/useCountdown.ts
```

**Backend**

```
backend/src/application/services/AuthService.ts
backend/src/application/services/ExpeditionService.ts
backend/src/application/services/RescueAlertService.ts
backend/src/infrastructure/jobs/expeditionDeadlineCron.ts
backend/src/infrastructure/repositories/EmailDispatchRepository.ts
backend/src/presentation/http/routes/authRoutes.ts
backend/src/presentation/http/routes/expeditionRoutes.ts
backend/src/presentation/http/controllers/authController.ts
backend/src/presentation/http/controllers/expeditionController.ts
backend/src/shared/utils/coordinates.ts
```

**SQL / scripts**

```
init_schema.sql          (tablas expeditions, estados)
backend/scripts/run-cron-tick.ts
```

### Flujo a probar manualmente

```text
Registro senderista → Login → Crear expedición → Ver activa (countdown) → Recordatorio 30 min
Cron: vencimiento sin check-in → estado alert
```

### Entregables mínimos

- [ ] Proyecto corre en local (`npm run dev:backend` + `npm run dev:frontend`)
- [ ] Flujo senderista probado de punta a punta
- [ ] Al menos 1 mejora con commit (p. ej. tests de login, refactor cron, doc inline)
- [ ] PR a `main` · reviewer: **Pedro Ormeño**

### Ideas de mejora

- Tests unitarios de `AuthService` o `ExpeditionService`
- Manejo de errores más claro en countdown / expedición activa
- Comentarios en lógica del cron e idempotencia

---

## Parte B — Pedro Ormeño

**Dominio:** registro backend, datos de usuario, cifrado médico, contactos, check-in, correos de alerta, historial, privacidad ARCO, validación de coordenadas.

### Historias de usuario (owner principal)

HU-01 (backend), HU-02 (frontend), HU-03 (backend), HU-05 (cifrado), HU-06 (frontend), HU-07 (backend), HU-08 (BD), HU-10 (backend), HU-12, HU-14 (backend), HU-15 (backend), HU-17 (backend), HU-18 (backend), HU-20 (frontend), HU-21 (backend), HU-22 (contactos offline), HU-23 (test), HU-24 (UX táctil)

### Endpoints API

| Método | Ruta |
|--------|------|
| `POST` | `/api/auth/register-hiker` |
| `POST` | `/api/auth/register-rescuer` |
| `GET/PUT` | `/api/user/medical-info` |
| `GET/POST/DELETE` | `/api/user/contacts` |
| `POST` | `/api/expeditions/:id/check-in` |
| `POST` | `/api/user/privacy/revoke` |

### Archivos clave

**Frontend**

```
frontend/src/pages/LoginPage.tsx
frontend/src/pages/ContactsPage.tsx
frontend/src/pages/ExpeditionHistoryPage.tsx
frontend/src/pages/CheckInSuccessPage.tsx
frontend/src/components/CheckInConfirmDialog.tsx
frontend/src/lib/offlineContacts.ts
frontend/src/lib/session.ts
frontend/src/context/AuthContext.tsx
frontend/src/services/auth.ts
frontend/src/services/user.ts
frontend/src/services/expedition.ts
frontend/src/services/apiClient.ts
```

**Backend**

```
backend/src/application/services/UserService.ts
backend/src/application/services/AlertNotificationService.ts
backend/src/infrastructure/security/encryption.ts
backend/src/infrastructure/security/password.ts
backend/src/infrastructure/email/MailService.ts
backend/src/infrastructure/email/BrevoApiMailer.ts
backend/src/infrastructure/email/templates/
backend/src/presentation/http/routes/userRoutes.ts
backend/src/presentation/http/controllers/userController.ts
backend/src/infrastructure/repositories/UserRepository.ts
backend/src/infrastructure/repositories/ExpeditionRepository.ts
backend/src/shared/utils/coordinates.test.ts
```

**SQL**

```
sprint2_migration.sql    (cifrado médico)
sprint7_migration.sql    (derechos ARCO)
```

### Flujo a probar manualmente

```text
Login → Contactos CRUD → Ficha médica (consentimiento) → Check-in con contraseña → Historial
Vencimiento → correo a contactos → revocación ARCO
```

### Entregables mínimos

- [ ] Flujo datos sensibles + check-in verificado
- [ ] Confirmar ficha médica cifrada en BD (no legible en texto plano)
- [ ] Al menos 1 mejora con commit (p. ej. más tests de `coordinates`, validación contactos)
- [ ] PR a `main` · reviewer: **Yahel Córdova**

### Ideas de mejora

- Ampliar `coordinates.test.ts` con casos límite
- Tests de `encryption.ts` (round-trip encrypt/decrypt)
- Mensajes de error más claros en check-in fallido

---

## Parte C — Yahel Córdova

**Dominio:** registro rescatista, UI rescatista, consola de alertas, bitácora, privacidad (frontend), mapas, tema oscuro, validación coordenadas (frontend).

### Historias de usuario (owner principal)

HU-03 (frontend), HU-05 (frontend), HU-08 (frontend), HU-10 (frontend), HU-11 (BD estados), HU-14 (frontend), HU-16 (frontend), HU-17 (frontend), HU-19 (frontend), HU-21 (frontend), HU-23 (frontend), HU-24 (tema)

### Endpoints API (consumo desde frontend)

| Método | Ruta |
|--------|------|
| `GET` | `/api/rescue/expeditions` |
| `GET` | `/api/rescue/alerts` |
| `GET` | `/api/rescue/alerts/:id` |
| `POST` | `/api/rescue/alerts/:id/confirm` |
| `PATCH` | `/api/rescue/alerts/:id/log` |

### Archivos clave

**Frontend**

```
frontend/src/pages/RegisterRescuerPage.tsx
frontend/src/pages/MedicalInfoPage.tsx
frontend/src/pages/RescatistaHomePage.tsx
frontend/src/pages/RescueConsolePage.tsx      (filtros, semáforo — compartido con Manuel)
frontend/src/pages/RescueAlertDetailPage.tsx
frontend/src/pages/PrivacySettingsPage.tsx
frontend/src/pages/DataRevocationPage.tsx
frontend/src/components/RescatistaLayout.tsx
frontend/src/components/ThemeToggle.tsx
frontend/src/context/ThemeContext.tsx
frontend/src/lib/theme.ts
frontend/src/lib/coordinates.ts
frontend/src/components/maps/
frontend/src/services/rescue.ts
```

**Backend**

```
backend/src/application/services/RescueService.ts
backend/src/infrastructure/repositories/RescueRepository.ts
backend/src/infrastructure/repositories/AlertRepository.ts
backend/src/infrastructure/repositories/MedicalAccessAuditRepository.ts
backend/src/presentation/http/routes/rescueRoutes.ts
backend/src/presentation/http/controllers/rescueController.ts
backend/scripts/test-rescue-alert.ts
backend/scripts/test-alert.ts
```

**SQL**

```
init_schema.sql          (rescue_logs, medical_access_audit, institutional_rescuer_registry)
enable_rls.sql
```

### Flujo a probar manualmente

```text
Registro rescatista → Login → Consola alertas → Filtrar zona → Confirmar alerta
→ Ver ficha emergencia → Actualizar bitácora (en_busqueda → localizados → cerrado)
```

### Entregables mínimos

- [ ] Flujo rescatista completo en local
- [ ] Semáforo verde/amarillo/rojo coherente con tiempo restante
- [ ] Al menos 1 mejora con commit (p. ej. tests RescueService, UX consola, mapas)
- [ ] PR a `main` · reviewer: **Manuel Llaury**

### Ideas de mejora

- Tests de `RescueService` o lógica de riesgo
- Accesibilidad / contraste en modo oscuro
- Validación visual de mapas en consola de rescate

---

## Parte D — Ariana Blanco

**Dominio:** calidad transversal, validación DoD, pruebas manuales, documentación de QA.

### Historias de usuario (cobertura QA)

Todas (HU-01 a HU-25) — en [tasks_mvp.md](./tasks_mvp.md) figura como responsable QA en cada HU.

### Artefactos

```
docs/definition_of_done.md
docs/definition_of_ready.md
backend/src/shared/utils/coordinates.test.ts   (referencia de test existente)
```

### Matriz de prueba mínima

| Flujo | Pasos | HUs |
|-------|-------|-----|
| Senderista feliz | Registro → expedición → check-in | HU-01–10 |
| Alerta automática | Vencer plazo sin check-in → correos | HU-11–13 |
| Rescate | Login rescatista → confirmar → bitácora | HU-14–19 |
| Release 02 | Offline, ARCO, modo oscuro, recordatorio | HU-20–25 |

### Entregables mínimos

- [ ] Checklist QA documentado (issue, comentario en PR o sección en este doc)
- [ ] Ejecutar `npm test --prefix backend` y reportar resultado
- [ ] Al menos 1 mejora con commit (p. ej. nuevo test, checklist en `docs/`, fix de bug encontrado)
- [ ] PR a `main` · reviewer: **Marko Lopez**

### Ideas de mejora

- Añadir `docs/qa-checklist.md` o ampliar casos en un issue de GitHub
- Test de integración ligero (auth o check-in)
- Reporte de bugs con pasos de reproducción

---

## Parte E — Marko Lopez

**Dominio:** Product Owner, documentación del proyecto, diagramas UML, backlog, integración final y coordinación de merges.

### Responsabilidades

- Mantener coherencia entre código, backlog y diagramas.
- Validar que los 5 PRs cumplan DoD antes del merge final.
- Resolver conflictos de integración si dos partes tocan archivos compartidos.

### Artefactos

```
README.md
docs/product_backlog.md
docs/tasks_mvp.md
docs/ownership.md          (este documento)
docs/uml/
init_schema.sql            (visión global del modelo)
post_mvp_migration.sql
```

### Archivos compartidos (solo PO o con acuerdo)

```
frontend/src/app/App.tsx
frontend/src/components/ProtectedRoute.tsx
frontend/src/components/Layout.tsx
backend/src/presentation/http/app.ts
backend/src/main.ts
package.json (raíz)
.env.example
```

### Entregables mínimos

- [ ] `main` estable tras merge de las 5 ramas
- [ ] README y backlog coherentes con el estado del repo
- [ ] Al menos 1 mejora en docs/UML o README
- [ ] PR propio a `main` · reviewer: **Ariana Blanco**

### Ideas de mejora

- Enlace a `ownership.md` desde README
- Revisar trazabilidad CUN ↔ HU en diagramas UML
- Actualizar `product_backlog.md` si cambian estados

---

## Matriz reviewer (code review cruzada)

| Autor del PR | Reviewer |
|--------------|----------|
| Manuel | Pedro |
| Pedro | Yahel |
| Yahel | Manuel |
| Ariana | Marko |
| Marko | Ariana |

---

## Orden sugerido de merges a `main`

Para reducir conflictos:

1. **Marko** — docs/README (base común)
2. **Manuel** — auth + expedición (núcleo senderista)
3. **Pedro** — user + check-in (capa datos)
4. **Yahel** — rescate (capa operativa)
5. **Ariana** — QA/tests (ajustes finales)

Si hay conflicto en un archivo compartido (`App.tsx`, `app.ts`), el **PO coordina** la resolución.

---

## Checklist de cierre individual

Copiar en la descripción del PR:

```markdown
## Checklist — [Nombre]

- [ ] `git pull origin main` antes de crear la rama
- [ ] Proyecto corre en local
- [ ] Flujo de mi parte probado manualmente
- [ ] Criterios Gherkin de mis HUs revisados ([product_backlog.md](./product_backlog.md))
- [ ] Al menos 1 commit con mejora real
- [ ] Mensaje de commit: `type(scope): description`
- [ ] PR abierto a `main`
- [ ] Reviewer asignado según matriz
- [ ] Sin secretos en el código (.env fuera del repo)
```

---

## Referencias

| Documento | Uso |
|-----------|-----|
| [product_backlog.md](./product_backlog.md) | HUs y criterios de aceptación |
| [tasks_mvp.md](./tasks_mvp.md) | Tareas originales por responsable |
| [definition_of_done.md](./definition_of_done.md) | Criterios para cerrar incremento |
| [uml/README.md](./uml/README.md) | Diagramas por CUN/CUS |

---

*Fuente: Elaboración propia — TrekSafe, Ingeniería de Software 1, Universidad de Lima, 2026.*
