You are a Senior UX/UI Designer and Product Designer.

You are NOT creating a new mockup from scratch. You must modify the existing TrekSafe Figma mockup and correct the current screens based on the documented scope, Product Backlog, Release 01 and Release 02.

Preserve the existing visual identity:

* Mountain green as primary color
* Deep navy as secondary color
* Soft green background
* Rounded cards
* Large mobile buttons
* Minimalist outdoor safety style
* Clean outdoor safety feeling

The objective is to make the mockup fully consistent with the documented TrekSafe scope, backlog, Release 01 and Release 02.

IMPORTANT LANGUAGE RULE:
The prompt is written in English, but ALL visible UI text inside the mockup must be in Spanish.

IMPORTANT DEVICE RULE:
All screens must be mobile app views only.
Use 390px width mobile frames suitable for screenshots in the Word report.
Do not use desktop dashboard views.
Every screen must be easy to capture and insert as a figure in the academic report.

---

## GENERAL CORRECTIONS

1. Remove the Administrator role completely.

There is no administrator flow in the current documented MVP or backlog.

Remove:

* Administrador demo card
* Admin dashboard
* Admin navigation
* Admin user management screens
* Any button or screen related to administrator approval
* Any “Pendiente de validación por administrador” state

The system must only support two role experiences:

* Senderista
* Rescatista

2. Remove the standalone “Acceso Demo” screen as a main product screen.

The current standalone screen called “Acceso Demo” is not necessary as a report figure.

Instead, integrate demo access inside the normal login screen as a small secondary section.

The Login screen should include:

Title:
“Iniciar sesión”

Fields:

* Correo electrónico
* Contraseña

Main button:
“Iniciar sesión”

Secondary links:

* “Crear cuenta”
* “Volver”

Demo quick access section:
Title:
“Acceso rápido para demo”

Two compact buttons or small cards:

* “Entrar como Senderista”
* “Entrar como Rescatista”

Show demo credentials in small text:

Senderista:
[senderista@treksafe.pe](mailto:senderista@treksafe.pe) / demo123

Rescatista:
[rescatista@treksafe.pe](mailto:rescatista@treksafe.pe) / demo123

Do NOT create a separate full screen only for demo access.

3. Remove SMS from the notification settings.

SMS is outside the project scope.

Replace:

“Correo, push, SMS”

with:

“Correo y notificaciones de la aplicación”

4. Use consistent Peruvian and mountain expedition examples.

Avoid foreign or random route names like:

* Cascade Ridge
* Bluebell
* Priya Nair
* Tom Svensson

Use examples such as:

* Laguna 69
* Nevado Huascarán
* Cordillera Blanca
* Laguna Humantay
* Ausangate
* Marcahuasi

Use Spanish names consistently.

---

## LOGIN AND REGISTRATION LOGIC

The login must NOT ask for institutional credentials.

The rescuer credential is validated only during the initial registration process.

Correct flow:

Initial rescuer registration:

* The rescuer enters institutional data.
* The system validates those data against a simulated credential registry.
* If valid, the account is created with role “rescatista”.
* If not valid, the account is not created.

Future login:

* The rescuer logs in only with email and password.

Therefore, create a login screen with:

* Correo electrónico
* Contraseña
* Button: “Iniciar sesión”

Optional role tabs are allowed:

* “Senderista”
* “Rescatista”

But do NOT include credential number in the login form.

---

## SENDERISTA FLOW

The senderista experience must include only:

* Inicio
* Expedición
* Perfil

Bottom navigation:

* Inicio
* Expedición
* Perfil

Do not show rescuer screens inside the senderista experience.

---

## SENDERISTA REGISTRATION / ONBOARDING

Keep the guided onboarding wizard, but make sure it represents the senderista registration process.

It must feel like one guided setup process, not disconnected forms.

Step 1 of 4:
“Cuenta”

Fields:

* Nombre completo
* Correo electrónico
* Contraseña
* Confirmar contraseña

Step 2 of 4:
“Salud”

Fields:

* Grupo sanguíneo
* Alergias
* Condiciones médicas
* Medicamentos habituales

Step 3 of 4:
“Contactos”

Fields or cards:

* Nombre completo
* Parentesco
* Teléfono
* Correo electrónico

Button:

“+ Agregar contacto”

Step 4 of 4:
“Primera expedición”

Fields:

* Nombre de la ruta
* Punto de inicio
* Punto de destino
* Fecha de salida
* Hora de salida
* Retorno estimado
* Participantes
* Dificultad
* Contactos a notificar

Button:

“Crear cuenta y registrar expedición”

---

## RESCATISTA REGISTRATION

Create or correct a separate registration screen for rescatistas.

Title:
“Registro de Rescatista”

Subtitle:
“Valida tus credenciales institucionales para acceder al panel de rescate”

Fields:

* Nombre completo
* Correo electrónico
* Contraseña
* Institución
* Número de credencial
* Fecha de nacimiento

Institution examples:

* AGMP
* Policía Nacional del Perú
* Cuerpo General de Bomberos
* Brigada de Rescate Andina

Add button:

“Validar y crear cuenta”

Add validation states.

Successful validation:

Title:
“Credenciales validadas”

Message:
“Tu cuenta de rescatista ha sido creada correctamente.”

Button:
“Ingresar al panel de rescate”

Failed validation:

Title:
“No se pudo validar la credencial”

Message:
“Los datos ingresados no coinciden con el registro simulado de credenciales.”

Button:
“Revisar datos”

Do not include:

* File upload
* Fotocheck upload
* Pending validation status
* Administrator review

---

## SENDERISTA HOME

Improve the senderista home screen.

It must clearly communicate the current safety status.

Use a main card:

“Estado de Seguridad”

Possible states:

* “Sin expedición activa”
* “Expedición activa”
* “Próximo a vencer”
* “Alerta activa”

For the demo state, show:

Status:
“Expedición activa”

Route:
“Laguna 69 - Cordillera Blanca”

Time remaining:
“12h 30m”

Main button:
“Ver expedición”

Summary cards:

* Expediciones
* Contactos
* Regresos seguros

Recent history:

* Laguna Humantay — Completado
* Marcahuasi — Completado

---

## ACTIVE EXPEDITION SCREEN

Keep and improve the active expedition screen.

Title:
“Expedición Activa”

Show:

* Nombre de ruta
* Tiempo restante
* Barra de progreso
* Hora de salida
* Retorno estimado
* Punto de inicio
* Punto de destino
* Participantes
* Dificultad
* Contactos protegidos

Safety card:

Title:
“Monitoreo de Seguridad Activo”

Text:
“Tus contactos de emergencia serán notificados automáticamente si no confirmas tu regreso antes de la hora estimada.”

Main button:
“Confirmar Retorno Seguro”

Secondary demo button:
“Simular alerta”

This button is only for prototype demonstration purposes.

---

## RETURN CONFIRMED SCREEN

Create a success screen.

Title:
“¡Retorno Confirmado!”

Message:
“Has regresado de forma segura.”

Show:

* Expedición
* Hora de check-in
* Estado: Finalizada
* Contactos notificados

Buttons:

* “Volver al inicio”
* “Registrar nueva expedición”

---

## ALERT ACTIVE SCREEN FOR SENDERISTA

Create a critical alert screen for the senderista.

Title:
“Alerta Crítica Activa”

Message:
“No se confirmó el retorno a tiempo.”

Show:

* Retorno esperado
* Hora actual
* Tiempo de retraso
* Ruta
* Participantes
* Contactos notificados
* Equipo de rescate notificado

Main button:
“Estoy a salvo - Confirmar retorno”

Use red as emergency color, but keep the screen readable and professional.

---

## SENDERISTA PROFILE: MAKE PROFILE SECTIONS ACTIONABLE

Correct the senderista profile so it does not look like a static menu.

The senderista profile must allow the user to view and edit personal safety information.

Title:
“Mi Perfil”

Show a profile summary card:

* Nombre
* Correo
* Teléfono
* Número de expediciones registradas
* Porcentaje de retornos seguros

Important:
Not every card should be a generic navigation card. Each section must have a clear action.

Create these sections:

1. “Datos personales”

Show:

* Nombre
* Correo
* Teléfono

Button:
“Editar datos personales”

When tapped, open an edit screen or modal.

Title:
“Editar datos personales”

Fields:

* Nombre completo
* Correo electrónico
* Teléfono

Buttons:

* “Cancelar”
* “Guardar cambios”

2. “Información médica”

Show:

* Grupo sanguíneo
* Alergias
* Condiciones médicas
* Medicamentos habituales

Button:
“Editar información médica”

When tapped, open an edit screen or modal.

Title:
“Editar información médica”

Fields:

* Grupo sanguíneo
* Alergias
* Condiciones médicas
* Medicamentos habituales

Buttons:

* “Cancelar”
* “Guardar cambios”

3. “Contactos de emergencia”

Show contact cards.

Each contact card must display:

* Nombre
* Parentesco
* Teléfono
* Correo

Each contact must have actions:

* “Editar”
* “Eliminar”

Also include button:

“+ Agregar contacto”

When editing or adding a contact, open a modal or screen.

Title:
“Agregar contacto”

or

“Editar contacto”

Fields:

* Nombre completo
* Parentesco
* Teléfono
* Correo electrónico

Buttons:

* “Cancelar”
* “Guardar contacto”

When deleting a contact, show confirmation modal.

Title:
“Eliminar contacto”

Message:
“Este contacto ya no será notificado en nuevas expediciones.”

Buttons:

* “Cancelar”
* “Eliminar”

4. “Notificaciones”

Show editable toggles:

* Notificaciones por correo
* Notificaciones de la aplicación
* Alertas de expedición
* Recordatorios de retorno
* Notificaciones del sistema

Each toggle must visually change between active and inactive states.

Do not include SMS because it is outside scope.

5. “Historial y estadísticas”

This section is read-only.

Show:

* Expediciones finalizadas
* Regresos seguros
* Alertas generadas
* Últimas rutas realizadas

Button:
“Ver historial”

This navigates to:

“Historial de expediciones”

6. “Cerrar sesión”

This must be a clear action button.

Do NOT show medical information, emergency contacts, or notification settings as inactive cards with only arrows.

The user must understand what can be edited, what is only information, and what is an action.

---

## RESCATISTA EXPERIENCE

The rescuer experience must be completely separate from the senderista experience.

Use top navigation or bottom navigation, but keep it mobile app style.

Rescatista navigation:

* Panel
* Expediciones
* Alertas
* Rescates
* Perfil

Do not show senderista profile sections to the rescuer.

---

## RESCATISTA DASHBOARD

Create a mobile version of the rescuer dashboard.

Title:
“Panel de Control”

Subtitle:
“Monitoreo de expediciones en tiempo real”

KPIs:

* Expediciones activas
* Expediciones retrasadas
* Alertas activas
* Casos cerrados

Recent alerts:

* Senderista
* Ruta
* Estado
* Button: “Ver alerta”

Expeditions list:

* Senderista
* Ruta
* Retorno estimado
* Estado

Status colors:

* Verde: Activo
* Naranja: Retrasado
* Rojo: Alerta

---

## RESCATISTA EXPEDITIONS SCREEN

Title:
“Expediciones”

Filters:

* Todas
* Activas
* Retrasadas
* Alertas

List each expedition with:

* Senderista
* Ruta
* Retorno estimado
* Estado
* Button: “Detalles” or “Ver alerta”

---

## RESCATISTA ALERTS SCREEN

Title:
“Gestión de Alertas”

Show alert cards:

* Nombre del senderista
* Ruta
* Tiempo de retraso
* Retorno estimado
* Estado de riesgo
* Button: “Ver detalles”

Use orange for delayed cases and red for critical alerts.

---

## RESCATISTA ALERT DETAIL SCREEN: MAKE ACTIONS ACTIONABLE

Improve the “Detalle de Alerta” screen for the rescuer.

Current buttons must not look decorative or inactive.

Each action must have a clear UI response.

Title:
“Detalle de Alerta”

Show:

1. “Información del senderista”

* Nombre
* Teléfono
* Correo

2. “Información médica”

* Grupo sanguíneo
* Alergias
* Condiciones médicas
* Medicamentos habituales

3. “Detalles de la expedición”

* Ruta
* Punto de inicio
* Punto de destino
* Participantes
* Dificultad
* Retorno estimado
* Tiempo de retraso

4. “Contactos de emergencia”

* Nombre
* Parentesco
* Teléfono
* Estado de notificación

Actions to keep and make actionable:

1. “Marcar en seguimiento”

When tapped, open a confirmation modal or bottom sheet.

Title:
“Marcar alerta en seguimiento”

Message:
“Esta alerta pasará al estado En seguimiento y quedará registrada en la bitácora.”

Buttons:

* “Cancelar”
* “Confirmar”

After confirmation, show:

* Estado: “En seguimiento”
* Success message: “La alerta fue marcada en seguimiento.”

2. “Contactar senderista”

When tapped, open a bottom sheet.

Title:
“Contactar senderista”

Show:

* Nombre
* Teléfono
* Correo

Actions:

* “Llamar”
* “Enviar correo”
* “Cancelar”

3. “Contactar contacto de emergencia”

When tapped, open a bottom sheet.

Title:
“Contactos de emergencia”

Show contact cards:

* Nombre
* Parentesco
* Teléfono
* Estado de notificación

Actions per contact:

* “Llamar”
* “Enviar correo”

4. “Contactar bomberos”

When tapped, open a bottom sheet.

Title:
“Contactar bomberos”

Show:

* Institución: “Cuerpo General de Bomberos”
* Teléfono de emergencia
* Estado: “Disponible”

Actions:

* “Llamar”
* “Registrar contacto en bitácora”

5. “Contactar policía”

When tapped, open a bottom sheet.

Title:
“Contactar policía”

Show:

* Institución: “Policía Nacional del Perú”
* Teléfono de emergencia
* Estado: “Disponible”

Actions:

* “Llamar”
* “Registrar contacto en bitácora”

6. “Cerrar caso”

When tapped, open a confirmation modal.

Title:
“Cerrar caso”

Message:
“Esta acción marcará la alerta como cerrada. Debe usarse solo cuando el incidente haya sido resuelto.”

Optional field:

“Nota de cierre”

Buttons:

* “Cancelar”
* “Cerrar caso”

After confirmation, show:

* Estado: “Caso cerrado”
* Success message: “El caso fue cerrado correctamente.”

---

## BITÁCORA REQUIREMENT

In the alert detail screen, add a section called:

“Bitácora del caso”

It should show timeline entries such as:

* “Alerta generada automáticamente”
* “Contactos de emergencia notificados”
* “Rescatista asignado”
* “Caso marcado en seguimiento”
* “Contacto con bomberos registrado”

Also include a button:

“+ Agregar nota”

When tapped, show a small modal.

Title:
“Agregar nota a la bitácora”

Field:
“Detalle de la acción realizada”

Button:
“Guardar nota”

This supports the documented incident management flow.

---

## RESCATISTA RESCUE OPERATIONS SCREEN

Title:
“Operaciones de Rescate”

Show:

* Operaciones en curso
* Casos de la semana
* Casos completados del mes

List:

* Senderista
* Ruta
* Brigada asignada
* Inicio
* Estado

Buttons:

* “Ver caso”

States:

* “En camino”
* “En zona”
* “Cerrado”

---

## RESCATISTA PROFILE: DO NOT MAKE EVERYTHING EDITABLE

Correct the rescuer profile.

The rescuer profile must NOT behave like the senderista profile.

Do not add edit buttons to every institutional field.

Institutional data must be mostly read-only because it was validated during registration.

Title:
“Mi Perfil”

Subtitle:
“Perfil de rescatista”

Profile card:

* Nombre
* Correo
* Estado: “Disponible” or “No disponible”

Institutional information card:

Title:
“Información institucional”

Show as read-only:

* Institución
* Especialidad
* Zona de operación
* Credencial

Add small label:

“Credencial validada”

Do not allow editing:

* Institución
* Credencial
* Especialidad

Actions:

1. “Cambiar disponibilidad”

This must be actionable.

When tapped, toggle:

* Disponible
* No disponible

2. “Ver historial de rescates”

This must navigate to a screen:

“Historial de rescates”

3. “Actualizar datos de contacto”

Optional action.

Only allow editing:

* Teléfono
* Correo

4. “Cerrar sesión”

Do NOT show:

* Información médica
* Contactos de emergencia
* Notificaciones del senderista

---

## RESCATISTA HISTORY SCREEN

Create a mobile screen.

Title:
“Historial de rescates”

Show cards with:

* Nombre del senderista
* Ruta
* Fecha
* Estado final
* Tiempo de atención

Examples:

* Elena Marchetti — Laguna 69 — Cerrado
* Juan Pérez — Nevado Huascarán — Cerrado

---

## REPORT SCREEN ORGANIZATION

Organize the Figma frames clearly and consistently so screenshots can be inserted directly into the academic report.

Do not force a predefined figure numbering or fixed report structure inside the mockup instructions.

Instead:

* Ensure every screen is clearly named in Figma.
* Group screens by user flow and sprint/release when appropriate.
* Keep a logical order for easier screenshot extraction.
* Prioritize screens that represent implemented functionality from Release 01 and Release 02.
* Exclude removed or deprecated screens from the final organization (for example, the standalone “Acceso Demo” screen).
* Make sure each mobile frame is presentation-ready for inclusion in the report.

Suggested organization categories:

* Autenticación
* Registro de senderista
* Registro de rescatista
* Inicio senderista
* Expedición activa
* Alertas y retorno seguro
* Perfil senderista
* Dashboard rescatista
* Gestión de alertas
* Operaciones de rescate
* Perfil rescatista
* Historiales y configuraciones

The objective is to keep the Figma file clean, easy to navigate, and ready for academic documentation screenshots without hardcoding report figure numbers.

---

## FINAL REQUIREMENTS

* All screens must be mobile app views.
* All visible UI text must be in Spanish.
* Remove standalone demo access screen.
* Integrate demo access inside login only.
* Remove administrator completely.
* Rescuer credential validation happens only during initial registration.
* Login uses only email and password.
* No SMS references.
* No pending validation or manual admin approval.
* No fotocheck upload.
* Alert detail actions must be actionable through modals, bottom sheets, confirmations, or navigation.
* Rescuer institutional profile fields must be mostly read-only.
* Senderista profile sections must be actionable and editable where appropriate.
* Only availability, contact data, session, and history should be actionable in rescuer profile.
* Keep the design clean, modern, mobile-first, outdoor-oriented, and ready for academic report screenshots.
