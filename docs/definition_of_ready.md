# Definition of Ready (DoR) — TrekSafe

## Propósito

La **Definición de Listo (DoR)** establece los criterios que una Historia de Usuario (HU) debe cumplir para considerarse **lista** y poder planificarse en un Sprint.

Su objetivo es evitar que el equipo inicie trabajo sobre requisitos ambiguos, incompletos o no testeables, alineado con [proyecto-final.md](./proyecto-final.md) y el [product_backlog.md](./product_backlog.md).

**Alcance:** aplica a las 25 historias de usuario (HU-01 a HU-25). Una HU solo entra al Sprint Planning si cumple **todos** los criterios DOR-01 a DOR-08.

---

## Cuándo aplicar la DoR

| Momento | Acción |
|---------|--------|
| **Backlog Refinement** | El equipo y el PO revisan cada HU candidata al próximo sprint |
| **Sprint Planning** | Solo se comprometen HUs con columna `Dev Ready = Yes` |
| **Cambio de alcance** | Si la HU se modifica durante el sprint, debe re-validarse la DoR |

---

## Checklist general (DoR)

| ID | Criterio | Requisito verificable |
|----|----------|----------------------|
| **DOR-01** | CONNEXTRA completo | La HU documenta: **C**omo, **N**ecesito, **P**ara, **E**ntidades, **R**estricciones, **N**egocio, **E**xcepciones, **T**amaño, **T**est |
| **DOR-02** | INVEST validado | Independiente, Negociable, Valiosa, Estimable, Pequeña, Testeable |
| **DOR-03** | SMART validado | Criterios de aceptación: Específicos, Medibles, Alcanzables, Relevantes, Time-boxed |
| **DOR-04** | Gherkin por criterio | Cada criterio de aceptación tiene al menos un escenario **Dado-Cuando-Entonces** (y variantes **Y**) |
| **DOR-05** | Sin dependencias bloqueantes | No requiere IoT, SMS de pago ni APIs gubernamentales reales |
| **DOR-06** | Restricciones del proyecto | Respeta RC-01 a RC-05 (ver sección inferior) |
| **DOR-07** | Estimada por el equipo | Story points consensuados y registrados en el backlog |
| **DOR-08** | OK del PO | Aprobada en refinement; criterios de aceptación validados por el Product Owner |

---

## DOR-01 — Plantilla CONNEXTRA

Completar antes de marcar `Dev Ready = Yes`:

```markdown
### HU-XX — [Título]

**Como** [rol: senderista / rescatista / sistema]
**Necesito** [acción o capacidad concreta]
**Para** [beneficio medible para el usuario o el negocio]

**Entidades:** [User, Expedition, Alert, Contact, MedicalRecord, …]
**Restricciones:** [RC-XX, SA-XX, dependencias técnicas]
**Negocio:** [regla o valor que justifica la HU]
**Excepciones:** [flujos alternativos y errores esperados]
**Tamaño:** [XS/S/M/L/XL o story points]
**Test:** [cómo se verificará: unit, integración, E2E manual]
```

---

## DOR-02 — Checklist INVEST

| Letra | Pregunta | ✓ |
|-------|----------|---|
| **I** — Independiente | ¿Se puede desarrollar sin esperar otra HU del mismo sprint? | |
| **N** — Negociable | ¿El *qué* está claro y el *cómo* queda al equipo? | |
| **V** — Valiosa | ¿Aporta al flujo crítico o a un objetivo de release? | |
| **E** — Estimable | ¿El equipo puede estimarla con información actual? | |
| **S** — Pequeña | ¿Cabe en un sprint (idealmente ≤ 8 SP)? | |
| **T** — Testeable | ¿Los criterios de aceptación permiten prueba objetiva? | |

---

## DOR-03 y DOR-04 — Criterios de aceptación (SMART + Gherkin)

Cada HU debe tener **al menos un** criterio SMART expresado en Gherkin.

**Formato obligatorio:**

```gherkin
Dado que [contexto/precondición]
Cuando [acción del usuario o evento del sistema]
Entonces [resultado observable y medible]
Y [condición adicional, si aplica]
```

**Ejemplo (HU-10 — Check-in Manual de Retorno Seguro):**

```gherkin
Dado que el senderista tiene una expedición en curso antes de vencer el plazo
Cuando presiona "Registrar Retorno Seguro" y confirma la acción
Entonces el sistema cambia el estado de la expedición a FINALIZADA
Y detiene el temporizador de monitoreo
```

**Anti-patrones que invalidan la DoR:**

- Criterios vagos: *"el sistema debe funcionar bien"*
- Sin precondición: escenarios que no definen estado inicial
- Resultados no observables: *"mejorar el rendimiento"* sin métrica
- Un solo criterio genérico para toda la HU

---

## DOR-05 — Dependencias entre historias

Una HU **no está lista** si depende de otra HU aún no terminada (salvo que esa dependencia esté explícita y resuelta).

| HU | Depende de (mínimo) |
|----|---------------------|
| HU-02 | HU-01 (usuarios registrados) |
| HU-04 a HU-08 | HU-02 (sesión autenticada) |
| HU-08 | HU-06, HU-07 |
| HU-09, HU-10 | HU-07 (expedición en curso) |
| HU-11 | HU-07 (modelo de expedición y estados) |
| HU-12, HU-13 | HU-11 (expedición en `EN_ALERTA`), HU-06 (contactos) |
| HU-13 | HU-05 (ficha médica cifrada) |
| HU-14 | HU-12 o HU-13 (alerta generada) |
| HU-15 a HU-17 | HU-14, Release 01 completado |
| HU-18 | HU-17 (alerta crítica visible) |
| HU-19 | HU-18 |
| HU-22 | HU-07 (formulario de expedición) |
| HU-23 | HU-04, HU-07 (campos de coordenadas) |
| HU-25 | HU-09 (temporizador de expedición activa) |

**Dependencias bloqueantes explícitas (fuera de alcance — DOR-05):**

- Hardware IoT / GPS continuo (RC-03)
- SMS en producción con costo (RC-04)
- APIs oficiales MINCETUR, AGMP, INDECI, CORESEC

---

## DOR-06 — Restricciones del proyecto (RC)

| ID | Restricción | Implicancia en refinement |
|----|-------------|---------------------------|
| **RC-01** | Escalabilidad limitada (MVP) | No planificar monitoreo masivo ni optimizaciones prematuras |
| **RC-02** | Plazo académico por releases | Priorizar MVP (R1) antes de R2; no mezclar alcance de releases sin acuerdo del PO |
| **RC-03** | Sin hardware / IoT | Geolocalización **declarativa**; sin sensores ni trackers |
| **RC-04** | Sin cloud de pago | Solo servicios con tier gratuito (Supabase, Railway, SMTP/Brevo educativo) |
| **RC-05** | Ley N° 29733 | Consentimiento explícito; cifrado de datos sensibles; acceso médico solo en alerta activa |

Si una HU contradice alguna RC, debe **renegociarse** o dividirse antes de entrar al sprint.

---

## DOR-07 — Estimación

- Story points registrados en [product_backlog.md](./product_backlog.md)
- Escala usada en el proyecto: Fibonacci práctica (2, 3, 5, 8)
- Capacidad de referencia por sprint: ~10–18 SP (según release)
- Una HU **> 8 SP** debe dividirse o justificarse en refinement

| Release | Sprint | Capacidad SP | HUs planificadas |
|---------|--------|--------------|------------------|
| R1 | 1 | 13 | HU-01, HU-02, HU-03 |
| R1 | 2 | 18 | HU-04 a HU-08 |
| R1 | 3 | 14 | HU-09, HU-10, HU-11 |
| R1 | 4 | 12 | HU-12, HU-13, HU-14 |
| R2 | 5 | 11 | HU-15, HU-16, HU-17 |
| R2 | 6 | 10 | HU-18, HU-19, HU-20 |
| R2 | 7 | 12 | HU-21, HU-22, HU-23 |
| R2 | 8 | 6 | HU-24, HU-25 |

---

## DOR-08 — Aprobación del Product Owner

En backlog refinement el PO confirma:

- [ ] La user story refleja la necesidad del senderista/rescatista
- [ ] Los criterios de aceptación Gherkin son suficientes para la demo
- [ ] El mockup de referencia existe en `docs/proyecto-final.md` (o se acordó excepción)
- [ ] La prioridad y el sprint asignado siguen siendo válidos
- [ ] Las tareas técnicas preliminares están en [tasks_mvp.md](./tasks_mvp.md) o equivalente

---

## Artefactos requeridos por HU

Antes de `Dev Ready = Yes`, la HU debe tener:

| Artefacto | Ubicación |
|-----------|-----------|
| User story (Como-Quiero-Para) | `product_backlog.md` |
| Criterios de aceptación Gherkin | `proyecto-final.md` (capítulo del sprint) o ficha de la HU |
| Story points y prioridad | `product_backlog.md` |
| Mockup de pantalla | `docs/proyecto-final.md` (figuras por sprint) |
| Desglose de tareas (opcional en R2) | `tasks_mvp.md` |
| Caso de uso de sistema (CUS) | `proyecto-final.md` — Capítulo 5 |

---

## Estado actual del backlog (Dev Ready)

| Release | HUs | Dev Ready | Notas |
|---------|-----|-----------|-------|
| **R1** — Sprints 1–4 | HU-01 a HU-14 | **Yes** | Refinement completado; listas para desarrollo |
| **R2** — Sprints 5–8 | HU-15 a HU-25 | **Yes** | Refinement completado; todas implementadas |

---

## Plantilla de validación por historia de usuario

Copiar y completar en refinement:

```markdown
### HU-XX — [Título]
- **Sprint objetivo:** [N]
- **Story points:** [N]
- **Refinement:** YYYY-MM-DD
- **PO:** [nombre]

| Criterio | ✓ |
|----------|---|
| DOR-01 CONNEXTRA completo | |
| DOR-02 INVEST validado | |
| DOR-03 Criterios SMART | |
| DOR-04 Gherkin por criterio | |
| DOR-05 Sin deps. bloqueantes | |
| DOR-06 RC-01 a RC-05 | |
| DOR-07 Estimación consensuada | |
| DOR-08 Aprobación PO | |

**Dependencias resueltas:** [HU-XX Done / N/A]
**Mockup:** [Figura N — proyecto-final.md]
```

Al aprobar, actualizar en `product_backlog.md`: `Dev Ready = Yes`.

---

## Relación DoR ↔ DoD

```text
Backlog → [DoR] → Sprint Planning → Desarrollo → [DoD] → Done
```

| Fase | Documento |
|------|-----------|
| Entrada al sprint | [definition_of_ready.md](./definition_of_ready.md) (este documento) |
| Salida del sprint | [definition_of_done.md](./definition_of_done.md) |

Una HU **no puede marcarse Done** si no cumplió DoD, aunque haya entrado al sprint con DoR. Si el alcance cambió en desarrollo, re-validar criterios de aceptación con el PO antes del cierre.

---

## Exclusiones (no se exigen en DoR)

- Código implementado (eso es DoD)
- Pruebas ejecutadas (DoD)
- Despliegue en staging (DoD)
- Documentación de cierre en backlog (DoD)

---

*Fuente: Elaboración propia — TrekSafe, Ingeniería de Software 1, Universidad de Lima, 2026.*
