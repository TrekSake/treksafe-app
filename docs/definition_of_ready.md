# Definition of Ready (DoR) — TrekSafe

## Propósito

La **Definición de Listo (DoR)** establece los criterios que una Historia de Usuario (HU) debe cumplir para considerarse **lista** y poder planificarse en un Sprint.

Su objetivo es evitar que el equipo inicie trabajo sobre requisitos ambiguos, incompletos o no testeables, alineado con [proyecto-final.md](./proyecto-final.md) y el [product_backlog.md](./product_backlog.md).

**Alcance:** aplica a las 25 historias de usuario (HU-01 a HU-25). **Estado:** proyecto completado — todas las HUs cumplieron DoR y DoD.

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

Registro completado en refinement para las 25 historias de usuario (Dev Ready = Yes).

### HU-01 — Registro de Senderistas

**Como** senderista
**Necesito** registrarme con mis datos personales y aceptar la política de privacidad
**Para** gestionar mis expediciones de forma segura

**Entidades:** User
**Restricciones:** RC-05, SA-05
**Negocio:** Estandarizar acceso al sistema y consentimiento Ley 29733
**Excepciones:** Correo duplicado, contraseña debil, términos no aceptados
**Tamaño:** 5 story points
**Test:** E2E registro + verificación hash en BD

### HU-02 — Inicio de Sesión Seguro

**Como** usuario registrado
**Necesito** iniciar sesión con correo y contraseña
**Para** acceder a mi panel según mi rol

**Entidades:** User, Session
**Restricciones:** RC-05
**Negocio:** Autenticación central para senderistas y rescatistas
**Excepciones:** Credenciales inválidas, token expirado
**Tamaño:** 3 story points
**Test:** E2E login por rol + prueba 401

### HU-03 — Registro de Cuerpos de Rescate

**Como** miembro de rescate
**Necesito** registrarme con credencial institucional simulada
**Para** acceder a funciones de atención de emergencias

**Entidades:** User, RescuerCredential
**Restricciones:** RC-03, SA-06
**Negocio:** Validar identidad de rescatistas en registro inicial
**Excepciones:** Credencial no coincide, registro sin rol rescuer
**Tamaño:** 5 story points
**Test:** E2E registro válido/inválido + login posterior

### HU-04 — Información Inicial de Expedición

**Como** senderista
**Necesito** declarar ubicación de inicio y destino
**Para** facilitar mi localización en caso de emergencia

**Entidades:** Expedition
**Restricciones:** RC-05, SA-05
**Negocio:** Base del plan de ruta declarada
**Excepciones:** Campos vacíos, coordenadas inválidas si se ingresan
**Tamaño:** 3 story points
**Test:** E2E creación parcial + persistencia

### HU-05 — Historial Médico y Consentimiento

**Como** senderista
**Necesito** registrar ficha médica con consentimiento explícito
**Para** que rescatistas accedan solo en alerta activa

**Entidades:** MedicalRecord, User
**Restricciones:** RC-05
**Negocio:** Cumplimiento normativo y datos críticos en emergencia
**Excepciones:** Sin consentimiento, datos no guardados
**Tamaño:** 5 story points
**Test:** Inspeccion cifrado BD + E2E ficha médica

### HU-06 — Contactos de Emergencia Frecuentes

**Como** senderista
**Necesito** guardar contactos de confianza reutilizables
**Para** asociarlos rápidamente a mis rutas

**Entidades:** EmergencyContact, User
**Restricciones:** RC-05
**Negocio:** Canal de aviso a terceros en desfase
**Excepciones:** Formato email/telefono inválido
**Tamaño:** 2 story points
**Test:** CRUD E2E + validacion regex

### HU-07 — Creación de Plan de Expedición

**Como** senderista
**Necesito** registrar itinerario con salida y retorno estimado
**Para** activar monitoreo pasivo del sistema

**Entidades:** Expedition
**Restricciones:** RC-02, SA-04
**Negocio:** Nucleo del protocolo de verificación positiva
**Excepciones:** Fechas incoherentes, segúnda expedicion activa
**Tamaño:** 5 story points
**Test:** E2E POST expeditions + estados

### HU-08 — Asociación de Contactos y Grupo

**Como** senderista
**Necesito** vincular contactos y acompanantes a la expedicion
**Para** alertar correctamente en caso de desfase

**Entidades:** Expedition, EmergencyContact
**Restricciones:** SA-05
**Negocio:** Información operativa para notificaciones
**Excepciones:** Sin contacto o sin acompanante
**Tamaño:** 3 story points
**Test:** E2E creación con arreglos contactIds/companionNames

### HU-09 — Visualización de Expedición Activa

**Como** senderista
**Necesito** ver resumen de ruta y tiempo restante
**Para** controlar mi retorno antes del vencimiento

**Entidades:** Expedition
**Restricciones:** SA-04
**Negocio:** Feedback continuo al senderista en montaña
**Excepciones:** Sin expedicion activa
**Tamaño:** 3 story points
**Test:** E2E temporizador UI + GET active

### HU-10 — Check-in Manual de Retorno Seguro

**Como** senderista
**Necesito** confirmar mi retorno seguro
**Para** cerrar la expedicion y detener alertas

**Entidades:** Expedition
**Restricciones:** SA-04
**Negocio:** Verificacion positiva manual del senderista
**Excepciones:** Check-in tras vencimiento sin tolerancia, contraseña incorrecta
**Tamaño:** 3 story points
**Test:** E2E check-in + estado completed

### HU-11 — Motor de Control de Plazos (Cron Job)

**Como** sistema
**Necesito** evaluar expediciones vencidas automáticamente
**Para** escalar a estado alerta sin intervencion humana

**Entidades:** Expedition, Alert
**Restricciones:** SA-04, RC-01
**Negocio:** Automatizacion del monitoreo pasivo
**Excepciones:** Cron detenido, re-ejecucion idempotente
**Tamaño:** 8 story points
**Test:** Prueba cron + transicion in_progress a alert

### HU-12 — Alerta por Correo a Contactos

**Como** sistema
**Necesito** enviar correo a contactos del senderista desfasado
**Para** notificar a terceros con detalles de la ruta

**Entidades:** Alert, EmergencyContact, EmailDispatch
**Restricciones:** RC-04, SA-02
**Negocio:** Aviso temprano a red de confianza
**Excepciones:** SMTP fallido, sin contactos
**Tamaño:** 5 story points
**Test:** Integracion correo + idempotencia despacho

### HU-13 — Alerta por Correo a Equipos de Rescate

**Como** sistema
**Necesito** enviar ficha tecnica a rescatistas validados
**Para** iniciar respuesta institucional con ubicación y médica

**Entidades:** Alert, User, MedicalRecord
**Restricciones:** RC-04, RC-05
**Negocio:** Canal formal a cuerpos de rescate
**Excepciones:** Sin consentimiento médico, sin rescatistas
**Tamaño:** 5 story points
**Test:** Integracion correo + descifrado puntual

### HU-14 — Confirmación de Recepción de Alerta

**Como** equipo de rescate
**Necesito** confirmar recepcion de una alerta
**Para** iniciar seguimiento y evitar duplicidad

**Entidades:** Alert, RescueAcknowledgement
**Restricciones:** RC-05
**Negocio:** Trazabilidad de atención del caso
**Excepciones:** Usuario no rescatista, alerta ya confirmada
**Tamaño:** 2 story points
**Test:** E2E confirm + auditoría usuario/fecha

### HU-15 — Dashboard Central de Expediciónes

**Como** rescatista
**Necesito** ver panel con expediciones en curso de la region
**Para** mantener control preventivo

**Entidades:** Expedition
**Restricciones:** RC-01
**Negocio:** Vista operativa centralizada
**Excepciones:** Lista vacia, polling desactualizado
**Tamaño:** 5 story points
**Test:** E2E consola + GET rescue/expeditions

### HU-16 — Filtro de Expediciónes por Zona

**Como** rescatista
**Necesito** filtrar expediciones por sector o nevado
**Para** priorizar recursos en mi jurisdicción

**Entidades:** Expedition
**Restricciones:** RC-01
**Negocio:** Enfoque geográfico operativo
**Excepciones:** Filtro sin resultados
**Tamaño:** 3 story points
**Test:** E2E filtro texto + backend zone

### HU-17 — Consola Visual de Alertas por Colores

**Como** rescatista
**Necesito** identificar riesgo por semáforo verde/amarillo/rojo
**Para** priorizar casos críticos visualmente

**Entidades:** Expedition
**Restricciones:** RC-01
**Negocio:** Clasificación rápida de desfase
**Excepciones:** Estados intermedios mal coloreados
**Tamaño:** 3 story points
**Test:** E2E colores vs tiempo restante

### HU-18 — Consulta de Ficha de Emergencia

**Como** rescatista
**Necesito** abrir expediente completo de alerta roja
**Para** disponer de ruta, grupo y datos médicos autorizados

**Entidades:** Alert, Expedition, MedicalRecord
**Restricciones:** RC-05
**Negocio:** Decisión de rescate informada
**Excepciones:** Acceso sin alerta activa
**Tamaño:** 5 story points
**Test:** E2E detalle + auditoría acceso médico

### HU-19 — Bitácora y Estados de Rescate

**Como** rescatista
**Necesito** registrar notas y cambiar estado del incidente
**Para** coordinar la operacion de búsqueda

**Entidades:** RescueLog, Alert
**Restricciones:** RC-05
**Negocio:** Trazabilidad operativa del rescate
**Excepciones:** Cambio sin confirmación previa
**Tamaño:** 3 story points
**Test:** E2E PATCH log + historial notas

### HU-20 — Historial de Expediciónes Finalizadas

**Como** senderista
**Necesito** consultar mis rutas pasadas y estadísticas
**Para** llevar registro personal de actividad

**Entidades:** Expedition
**Restricciones:** RC-05
**Negocio:** Valor histórico y estadísticas basicas
**Excepciones:** Sin expediciones completadas
**Tamaño:** 2 story points
**Test:** E2E GET history + UI estadísticas

### HU-21 — Revocación de Datos (Derechos ARCO)

**Como** senderista
**Necesito** solicitar eliminacion o anonimización de mis datos
**Para** ejercer derechos según Ley 29733

**Entidades:** User, Expedition, MedicalRecord
**Restricciones:** RC-05
**Negocio:** Cumplimiento derechos ARCO
**Excepciones:** Solicitud parcial, sesión activa tras eliminar
**Tamaño:** 5 story points
**Test:** E2E revoke + verificación BD

### HU-22 — Cache y Formularios Offline

**Como** senderista
**Necesito** usar plantillas y borradores sin conexión en base
**Para** registrar expedicion al recuperar señal

**Entidades:** Expedition, RouteTemplate, ExpeditionDraft
**Restricciones:** RC-03, SA-03
**Negocio:** Resiliencia en zonas sin cobertura
**Excepciones:** SW no registrado, sync fallido
**Tamaño:** 5 story points
**Test:** Prueba offline PWA + Cache API + sync

### HU-23 — Validación de Coordenadas

**Como** senderista
**Necesito** que el sistema valide formato de coordenadas manuales
**Para** evitar errores en búsqueda y rescate

**Entidades:** Expedition
**Restricciones:** RC-05, SA-05
**Negocio:** Calidad de georreferencia declarativa
**Excepciones:** Formato decimal inválido, fuera de Perú
**Tamaño:** 2 story points
**Test:** Unit test coordinates + E2E formulario

### HU-24 — Optimización de UX y Modo Oscuro

**Como** senderista
**Necesito** operar la app con contraste alto y modo oscuro
**Para** usar TrekSafe en condiciones adversas de montaña

**Entidades:** UI Theme
**Restricciones:** RC-02
**Negocio:** Accesibilidad y usabilidad en campo
**Excepciones:** Tema no persistente
**Tamaño:** 3 story points
**Test:** E2E toggle tema + revision contraste

### HU-25 — Notificación de Proximidad de Expiracion

**Como** sistema
**Necesito** mostrar recordatorio visual 30 min antes del limite
**Para** reducir falsas alarmas por olvido de check-in

**Entidades:** Expedition
**Restricciones:** SA-04
**Negocio:** Prevencion proactiva antes del escalamiento
**Excepciones:** Recordatorio repetido tras descarte
**Tamaño:** 3 story points
**Test:** E2E banner/sheet a 30 min

---

## DOR-02 — Checklist INVEST

| Letra | Pregunta | ✓ |
|-------|----------|---|
| **I** — Independiente | ¿Se puede desarrollar sin esperar otra HU del mismo sprint? | ✓ |
| **N** — Negociable | ¿El *qué* está claro y el *cómo* queda al equipo? | ✓ |
| **V** — Valiosa | ¿Aporta al flujo crítico o a un objetivo de release? | ✓ |
| **E** — Estimable | ¿El equipo puede estimarla con información actual? | ✓ |
| **S** — Pequeña | ¿Cabe en un sprint (idealmente ≤ 8 SP)? | ✓ |
| **T** — Testeable | ¿Los criterios de aceptación permiten prueba objetiva? | ✓ |

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

**Product Owner:** Marko Antonio Lopez Bernuy

En backlog refinement el PO confirma:

- [x] La user story refleja la necesidad del senderista/rescatista
- [x] Los criterios de aceptación Gherkin son suficientes para la demo
- [x] El mockup de referencia existe en `docs/proyecto-final.md` (o se acordó excepción)
- [x] La prioridad y el sprint asignado siguen siendo válidos
- [x] Las tareas técnicas preliminares están en [tasks_mvp.md](./tasks_mvp.md) o equivalente

---

## Artefactos requeridos por HU

Antes de `Dev Ready = Yes`, la HU debe tener:

| Artefacto | Ubicación |
|-----------|-----------|
| User story (Como-Quiero-Para) | `product_backlog.md` |
| Criterios de aceptación Gherkin | `proyecto-final.md` (capítulo del sprint) o ficha de la HU |
| Story points y prioridad | `product_backlog.md` |
| Mockup de pantalla | `docs/proyecto-final.md` (figuras por sprint) |
| Desglose de tareas | `tasks_mvp.md` |
| Caso de uso de sistema (CUS) | `proyecto-final.md` — Capítulo 5 |

---

## Estado actual del backlog (Dev Ready)

| Release | HUs | Dev Ready | Notas |
|---------|-----|-----------|-------|
| **R1** — Sprints 1–4 | HU-01 a HU-14 | **Yes** | Refinement y desarrollo completados |
| **R2** — Sprints 5–8 | HU-15 a HU-25 | **Yes** | Refinement y desarrollo completados |

---

## Registro de validación DoR por historia de usuario

**Product Owner:** Marko Antonio Lopez Bernuy  
**Estado global:** 25/25 HUs con Dev Ready = Yes  
**Última actualización:** 2026-06-18

### Sprint 1

#### HU-01 — Registro de Senderistas
- **Sprint objetivo:** 1
- **Story points:** 5
- **Refinement:** 2026-01-26
- **PO:** Marko Antonio Lopez Bernuy
- **Dependencias resueltas:** N/A
- **Mockup:** Figura 6 — proyecto-final.md

| Criterio | ✓ |
|----------|---|
| DOR-01 CONNEXTRA completo | ✓ |
| DOR-02 INVEST validado | ✓ |
| DOR-03 Criterios SMART | ✓ |
| DOR-04 Gherkin por criterio | ✓ |
| DOR-05 Sin deps. bloqueantes | ✓ |
| DOR-06 RC-01 a RC-05 | ✓ |
| DOR-07 Estimación consensuada | ✓ |
| DOR-08 Aprobación PO | ✓ |

#### HU-02 — Inicio de Sesión Seguro
- **Sprint objetivo:** 1
- **Story points:** 3
- **Refinement:** 2026-01-26
- **PO:** Marko Antonio Lopez Bernuy
- **Dependencias resueltas:** HU-01
- **Mockup:** Figura 5 — proyecto-final.md

| Criterio | ✓ |
|----------|---|
| DOR-01 CONNEXTRA completo | ✓ |
| DOR-02 INVEST validado | ✓ |
| DOR-03 Criterios SMART | ✓ |
| DOR-04 Gherkin por criterio | ✓ |
| DOR-05 Sin deps. bloqueantes | ✓ |
| DOR-06 RC-01 a RC-05 | ✓ |
| DOR-07 Estimación consensuada | ✓ |
| DOR-08 Aprobación PO | ✓ |

#### HU-03 — Registro de Cuerpos de Rescate
- **Sprint objetivo:** 1
- **Story points:** 5
- **Refinement:** 2026-01-26
- **PO:** Marko Antonio Lopez Bernuy
- **Dependencias resueltas:** N/A
- **Mockup:** Figuras 7–8 — proyecto-final.md

| Criterio | ✓ |
|----------|---|
| DOR-01 CONNEXTRA completo | ✓ |
| DOR-02 INVEST validado | ✓ |
| DOR-03 Criterios SMART | ✓ |
| DOR-04 Gherkin por criterio | ✓ |
| DOR-05 Sin deps. bloqueantes | ✓ |
| DOR-06 RC-01 a RC-05 | ✓ |
| DOR-07 Estimación consensuada | ✓ |
| DOR-08 Aprobación PO | ✓ |

### Sprint 2

#### HU-04 — Información Inicial de Expedición
- **Sprint objetivo:** 2
- **Story points:** 3
- **Refinement:** 2026-02-09
- **PO:** Marko Antonio Lopez Bernuy
- **Dependencias resueltas:** HU-02
- **Mockup:** Figura 14 — proyecto-final.md

| Criterio | ✓ |
|----------|---|
| DOR-01 CONNEXTRA completo | ✓ |
| DOR-02 INVEST validado | ✓ |
| DOR-03 Criterios SMART | ✓ |
| DOR-04 Gherkin por criterio | ✓ |
| DOR-05 Sin deps. bloqueantes | ✓ |
| DOR-06 RC-01 a RC-05 | ✓ |
| DOR-07 Estimación consensuada | ✓ |
| DOR-08 Aprobación PO | ✓ |

#### HU-05 — Historial Médico y Consentimiento
- **Sprint objetivo:** 2
- **Story points:** 5
- **Refinement:** 2026-02-09
- **PO:** Marko Antonio Lopez Bernuy
- **Dependencias resueltas:** HU-02
- **Mockup:** Figura 12 — proyecto-final.md

| Criterio | ✓ |
|----------|---|
| DOR-01 CONNEXTRA completo | ✓ |
| DOR-02 INVEST validado | ✓ |
| DOR-03 Criterios SMART | ✓ |
| DOR-04 Gherkin por criterio | ✓ |
| DOR-05 Sin deps. bloqueantes | ✓ |
| DOR-06 RC-01 a RC-05 | ✓ |
| DOR-07 Estimación consensuada | ✓ |
| DOR-08 Aprobación PO | ✓ |

#### HU-06 — Contactos de Emergencia Frecuentes
- **Sprint objetivo:** 2
- **Story points:** 2
- **Refinement:** 2026-02-09
- **PO:** Marko Antonio Lopez Bernuy
- **Dependencias resueltas:** HU-02
- **Mockup:** Figura 13 — proyecto-final.md

| Criterio | ✓ |
|----------|---|
| DOR-01 CONNEXTRA completo | ✓ |
| DOR-02 INVEST validado | ✓ |
| DOR-03 Criterios SMART | ✓ |
| DOR-04 Gherkin por criterio | ✓ |
| DOR-05 Sin deps. bloqueantes | ✓ |
| DOR-06 RC-01 a RC-05 | ✓ |
| DOR-07 Estimación consensuada | ✓ |
| DOR-08 Aprobación PO | ✓ |

#### HU-07 — Creación de Plan de Expedición
- **Sprint objetivo:** 2
- **Story points:** 5
- **Refinement:** 2026-02-09
- **PO:** Marko Antonio Lopez Bernuy
- **Dependencias resueltas:** HU-02
- **Mockup:** Figura 14 — proyecto-final.md

| Criterio | ✓ |
|----------|---|
| DOR-01 CONNEXTRA completo | ✓ |
| DOR-02 INVEST validado | ✓ |
| DOR-03 Criterios SMART | ✓ |
| DOR-04 Gherkin por criterio | ✓ |
| DOR-05 Sin deps. bloqueantes | ✓ |
| DOR-06 RC-01 a RC-05 | ✓ |
| DOR-07 Estimación consensuada | ✓ |
| DOR-08 Aprobación PO | ✓ |

#### HU-08 — Asociación de Contactos y Grupo
- **Sprint objetivo:** 2
- **Story points:** 3
- **Refinement:** 2026-02-09
- **PO:** Marko Antonio Lopez Bernuy
- **Dependencias resueltas:** HU-06, HU-07
- **Mockup:** Figura 14 — proyecto-final.md

| Criterio | ✓ |
|----------|---|
| DOR-01 CONNEXTRA completo | ✓ |
| DOR-02 INVEST validado | ✓ |
| DOR-03 Criterios SMART | ✓ |
| DOR-04 Gherkin por criterio | ✓ |
| DOR-05 Sin deps. bloqueantes | ✓ |
| DOR-06 RC-01 a RC-05 | ✓ |
| DOR-07 Estimación consensuada | ✓ |
| DOR-08 Aprobación PO | ✓ |

### Sprint 3

#### HU-09 — Visualización de Expedición Activa
- **Sprint objetivo:** 3
- **Story points:** 3
- **Refinement:** 2026-02-23
- **PO:** Marko Antonio Lopez Bernuy
- **Dependencias resueltas:** HU-07
- **Mockup:** Figura 14 — proyecto-final.md

| Criterio | ✓ |
|----------|---|
| DOR-01 CONNEXTRA completo | ✓ |
| DOR-02 INVEST validado | ✓ |
| DOR-03 Criterios SMART | ✓ |
| DOR-04 Gherkin por criterio | ✓ |
| DOR-05 Sin deps. bloqueantes | ✓ |
| DOR-06 RC-01 a RC-05 | ✓ |
| DOR-07 Estimación consensuada | ✓ |
| DOR-08 Aprobación PO | ✓ |

#### HU-10 — Check-in Manual de Retorno Seguro
- **Sprint objetivo:** 3
- **Story points:** 3
- **Refinement:** 2026-02-23
- **PO:** Marko Antonio Lopez Bernuy
- **Dependencias resueltas:** HU-07
- **Mockup:** Figura 15 — proyecto-final.md

| Criterio | ✓ |
|----------|---|
| DOR-01 CONNEXTRA completo | ✓ |
| DOR-02 INVEST validado | ✓ |
| DOR-03 Criterios SMART | ✓ |
| DOR-04 Gherkin por criterio | ✓ |
| DOR-05 Sin deps. bloqueantes | ✓ |
| DOR-06 RC-01 a RC-05 | ✓ |
| DOR-07 Estimación consensuada | ✓ |
| DOR-08 Aprobación PO | ✓ |

#### HU-11 — Motor de Control de Plazos (Cron Job)
- **Sprint objetivo:** 3
- **Story points:** 8
- **Refinement:** 2026-02-23
- **PO:** Marko Antonio Lopez Bernuy
- **Dependencias resueltas:** HU-07
- **Mockup:** Figura 16 — proyecto-final.md

| Criterio | ✓ |
|----------|---|
| DOR-01 CONNEXTRA completo | ✓ |
| DOR-02 INVEST validado | ✓ |
| DOR-03 Criterios SMART | ✓ |
| DOR-04 Gherkin por criterio | ✓ |
| DOR-05 Sin deps. bloqueantes | ✓ |
| DOR-06 RC-01 a RC-05 | ✓ |
| DOR-07 Estimación consensuada | ✓ |
| DOR-08 Aprobación PO | ✓ |

### Sprint 4

#### HU-12 — Alerta por Correo a Contactos
- **Sprint objetivo:** 4
- **Story points:** 5
- **Refinement:** 2026-03-09
- **PO:** Marko Antonio Lopez Bernuy
- **Dependencias resueltas:** HU-11, HU-06
- **Mockup:** Figura 17 — proyecto-final.md

| Criterio | ✓ |
|----------|---|
| DOR-01 CONNEXTRA completo | ✓ |
| DOR-02 INVEST validado | ✓ |
| DOR-03 Criterios SMART | ✓ |
| DOR-04 Gherkin por criterio | ✓ |
| DOR-05 Sin deps. bloqueantes | ✓ |
| DOR-06 RC-01 a RC-05 | ✓ |
| DOR-07 Estimación consensuada | ✓ |
| DOR-08 Aprobación PO | ✓ |

#### HU-13 — Alerta por Correo a Equipos de Rescate
- **Sprint objetivo:** 4
- **Story points:** 5
- **Refinement:** 2026-03-09
- **PO:** Marko Antonio Lopez Bernuy
- **Dependencias resueltas:** HU-11, HU-05
- **Mockup:** Figura 17 — proyecto-final.md

| Criterio | ✓ |
|----------|---|
| DOR-01 CONNEXTRA completo | ✓ |
| DOR-02 INVEST validado | ✓ |
| DOR-03 Criterios SMART | ✓ |
| DOR-04 Gherkin por criterio | ✓ |
| DOR-05 Sin deps. bloqueantes | ✓ |
| DOR-06 RC-01 a RC-05 | ✓ |
| DOR-07 Estimación consensuada | ✓ |
| DOR-08 Aprobación PO | ✓ |

#### HU-14 — Confirmación de Recepción de Alerta
- **Sprint objetivo:** 4
- **Story points:** 2
- **Refinement:** 2026-03-09
- **PO:** Marko Antonio Lopez Bernuy
- **Dependencias resueltas:** HU-12
- **Mockup:** Figura 18 — proyecto-final.md

| Criterio | ✓ |
|----------|---|
| DOR-01 CONNEXTRA completo | ✓ |
| DOR-02 INVEST validado | ✓ |
| DOR-03 Criterios SMART | ✓ |
| DOR-04 Gherkin por criterio | ✓ |
| DOR-05 Sin deps. bloqueantes | ✓ |
| DOR-06 RC-01 a RC-05 | ✓ |
| DOR-07 Estimación consensuada | ✓ |
| DOR-08 Aprobación PO | ✓ |

### Sprint 5

#### HU-15 — Dashboard Central de Expediciones
- **Sprint objetivo:** 5
- **Story points:** 5
- **Refinement:** 2026-03-23
- **PO:** Marko Antonio Lopez Bernuy
- **Dependencias resueltas:** HU-14, R1
- **Mockup:** Figura 19 — proyecto-final.md

| Criterio | ✓ |
|----------|---|
| DOR-01 CONNEXTRA completo | ✓ |
| DOR-02 INVEST validado | ✓ |
| DOR-03 Criterios SMART | ✓ |
| DOR-04 Gherkin por criterio | ✓ |
| DOR-05 Sin deps. bloqueantes | ✓ |
| DOR-06 RC-01 a RC-05 | ✓ |
| DOR-07 Estimación consensuada | ✓ |
| DOR-08 Aprobación PO | ✓ |

#### HU-16 — Filtro de Expediciones por Zona
- **Sprint objetivo:** 5
- **Story points:** 3
- **Refinement:** 2026-03-23
- **PO:** Marko Antonio Lopez Bernuy
- **Dependencias resueltas:** HU-15
- **Mockup:** Figura 19 — proyecto-final.md

| Criterio | ✓ |
|----------|---|
| DOR-01 CONNEXTRA completo | ✓ |
| DOR-02 INVEST validado | ✓ |
| DOR-03 Criterios SMART | ✓ |
| DOR-04 Gherkin por criterio | ✓ |
| DOR-05 Sin deps. bloqueantes | ✓ |
| DOR-06 RC-01 a RC-05 | ✓ |
| DOR-07 Estimación consensuada | ✓ |
| DOR-08 Aprobación PO | ✓ |

#### HU-17 — Consola Visual de Alertas por Colores
- **Sprint objetivo:** 5
- **Story points:** 3
- **Refinement:** 2026-03-23
- **PO:** Marko Antonio Lopez Bernuy
- **Dependencias resueltas:** HU-15
- **Mockup:** Figura 20 — proyecto-final.md

| Criterio | ✓ |
|----------|---|
| DOR-01 CONNEXTRA completo | ✓ |
| DOR-02 INVEST validado | ✓ |
| DOR-03 Criterios SMART | ✓ |
| DOR-04 Gherkin por criterio | ✓ |
| DOR-05 Sin deps. bloqueantes | ✓ |
| DOR-06 RC-01 a RC-05 | ✓ |
| DOR-07 Estimación consensuada | ✓ |
| DOR-08 Aprobación PO | ✓ |

### Sprint 6

#### HU-18 — Consulta de Ficha de Emergencia
- **Sprint objetivo:** 6
- **Story points:** 5
- **Refinement:** 2026-04-06
- **PO:** Marko Antonio Lopez Bernuy
- **Dependencias resueltas:** HU-17
- **Mockup:** Figura 21 — proyecto-final.md

| Criterio | ✓ |
|----------|---|
| DOR-01 CONNEXTRA completo | ✓ |
| DOR-02 INVEST validado | ✓ |
| DOR-03 Criterios SMART | ✓ |
| DOR-04 Gherkin por criterio | ✓ |
| DOR-05 Sin deps. bloqueantes | ✓ |
| DOR-06 RC-01 a RC-05 | ✓ |
| DOR-07 Estimación consensuada | ✓ |
| DOR-08 Aprobación PO | ✓ |

#### HU-19 — Bitácora y Estados de Rescate
- **Sprint objetivo:** 6
- **Story points:** 3
- **Refinement:** 2026-04-06
- **PO:** Marko Antonio Lopez Bernuy
- **Dependencias resueltas:** HU-18
- **Mockup:** Figura 22 — proyecto-final.md

| Criterio | ✓ |
|----------|---|
| DOR-01 CONNEXTRA completo | ✓ |
| DOR-02 INVEST validado | ✓ |
| DOR-03 Criterios SMART | ✓ |
| DOR-04 Gherkin por criterio | ✓ |
| DOR-05 Sin deps. bloqueantes | ✓ |
| DOR-06 RC-01 a RC-05 | ✓ |
| DOR-07 Estimación consensuada | ✓ |
| DOR-08 Aprobación PO | ✓ |

#### HU-20 — Historial de Expediciones Finalizadas
- **Sprint objetivo:** 6
- **Story points:** 2
- **Refinement:** 2026-04-06
- **PO:** Marko Antonio Lopez Bernuy
- **Dependencias resueltas:** HU-10
- **Mockup:** Figura 23 — proyecto-final.md

| Criterio | ✓ |
|----------|---|
| DOR-01 CONNEXTRA completo | ✓ |
| DOR-02 INVEST validado | ✓ |
| DOR-03 Criterios SMART | ✓ |
| DOR-04 Gherkin por criterio | ✓ |
| DOR-05 Sin deps. bloqueantes | ✓ |
| DOR-06 RC-01 a RC-05 | ✓ |
| DOR-07 Estimación consensuada | ✓ |
| DOR-08 Aprobación PO | ✓ |

### Sprint 7

#### HU-21 — Revocación de Datos (Derechos ARCO)
- **Sprint objetivo:** 7
- **Story points:** 5
- **Refinement:** 2026-04-20
- **PO:** Marko Antonio Lopez Bernuy
- **Dependencias resueltas:** HU-02
- **Mockup:** Figuras 24–25 — proyecto-final.md

| Criterio | ✓ |
|----------|---|
| DOR-01 CONNEXTRA completo | ✓ |
| DOR-02 INVEST validado | ✓ |
| DOR-03 Criterios SMART | ✓ |
| DOR-04 Gherkin por criterio | ✓ |
| DOR-05 Sin deps. bloqueantes | ✓ |
| DOR-06 RC-01 a RC-05 | ✓ |
| DOR-07 Estimación consensuada | ✓ |
| DOR-08 Aprobación PO | ✓ |

#### HU-22 — Caché y Formularios Offline
- **Sprint objetivo:** 7
- **Story points:** 5
- **Refinement:** 2026-04-20
- **PO:** Marko Antonio Lopez Bernuy
- **Dependencias resueltas:** HU-07
- **Mockup:** Figura 26 — proyecto-final.md

| Criterio | ✓ |
|----------|---|
| DOR-01 CONNEXTRA completo | ✓ |
| DOR-02 INVEST validado | ✓ |
| DOR-03 Criterios SMART | ✓ |
| DOR-04 Gherkin por criterio | ✓ |
| DOR-05 Sin deps. bloqueantes | ✓ |
| DOR-06 RC-01 a RC-05 | ✓ |
| DOR-07 Estimación consensuada | ✓ |
| DOR-08 Aprobación PO | ✓ |

#### HU-23 — Validación de Coordenadas
- **Sprint objetivo:** 7
- **Story points:** 2
- **Refinement:** 2026-04-20
- **PO:** Marko Antonio Lopez Bernuy
- **Dependencias resueltas:** HU-04, HU-07
- **Mockup:** Figura 27 — proyecto-final.md

| Criterio | ✓ |
|----------|---|
| DOR-01 CONNEXTRA completo | ✓ |
| DOR-02 INVEST validado | ✓ |
| DOR-03 Criterios SMART | ✓ |
| DOR-04 Gherkin por criterio | ✓ |
| DOR-05 Sin deps. bloqueantes | ✓ |
| DOR-06 RC-01 a RC-05 | ✓ |
| DOR-07 Estimación consensuada | ✓ |
| DOR-08 Aprobación PO | ✓ |

### Sprint 8

#### HU-24 — Optimización de UX y Modo Oscuro
- **Sprint objetivo:** 8
- **Story points:** 3
- **Refinement:** 2026-05-04
- **PO:** Marko Antonio Lopez Bernuy
- **Dependencias resueltas:** HU-02
- **Mockup:** Figuras 28–29 — proyecto-final.md

| Criterio | ✓ |
|----------|---|
| DOR-01 CONNEXTRA completo | ✓ |
| DOR-02 INVEST validado | ✓ |
| DOR-03 Criterios SMART | ✓ |
| DOR-04 Gherkin por criterio | ✓ |
| DOR-05 Sin deps. bloqueantes | ✓ |
| DOR-06 RC-01 a RC-05 | ✓ |
| DOR-07 Estimación consensuada | ✓ |
| DOR-08 Aprobación PO | ✓ |

#### HU-25 — Notificación de Proximidad de Expiración
- **Sprint objetivo:** 8
- **Story points:** 3
- **Refinement:** 2026-05-04
- **PO:** Marko Antonio Lopez Bernuy
- **Dependencias resueltas:** HU-09
- **Mockup:** Figuras 30–31 — proyecto-final.md

| Criterio | ✓ |
|----------|---|
| DOR-01 CONNEXTRA completo | ✓ |
| DOR-02 INVEST validado | ✓ |
| DOR-03 Criterios SMART | ✓ |
| DOR-04 Gherkin por criterio | ✓ |
| DOR-05 Sin deps. bloqueantes | ✓ |
| DOR-06 RC-01 a RC-05 | ✓ |
| DOR-07 Estimación consensuada | ✓ |
| DOR-08 Aprobación PO | ✓ |


---

## Cierre de releases (DoR)

| Release | Fecha refinement | PO |
|---------|------------------|-----|
| Release 01 — MVP | 2026-01-26 a 2026-03-09 | Marko Antonio Lopez Bernuy |
| Release 02 — Optimización | 2026-03-23 a 2026-05-04 | Marko Antonio Lopez Bernuy |

---

## Relación DoR ↔ DoD

```text
Backlog → [DoR] → Sprint Planning → Desarrollo → [DoD] → Done
```

| Fase | Documento |
|------|-----------|
| Entrada al sprint | [definition_of_ready.md](./definition_of_ready.md) (este documento) |
| Salida del sprint | [definition_of_done.md](./definition_of_done.md) |

---

## Exclusiones (no se exigen en DoR)

- Código implementado (eso es DoD)
- Pruebas ejecutadas (DoD)
- Despliegue en staging (DoD)
- Documentación de cierre en backlog (DoD)

---

*Fuente: Elaboración propia — TrekSafe, Ingeniería de Software 1, Universidad de Lima, 2026.*
