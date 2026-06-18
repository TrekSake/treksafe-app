You are a Senior UX/UI Designer and Product Designer.

You are NOT creating a new mockup from scratch. You must review, correct, reorganize, and improve the existing TrekSafe mockup based on the current design already created.

Preserve the current visual identity:

* Mountain green primary color
* Deep navy secondary color
* Soft green background
* Rounded cards
* Large buttons
* Clean mobile-first style
* Outdoor safety feeling

The objective is to make the mockup fully consistent with the documented TrekSafe scope, Product Backlog, Release 01 and Release 02.

IMPORTANT LANGUAGE RULE:
The prompt is written in English, but ALL visible UI text inside the mockup must be in Spanish.

IMPORTANT DEVICE RULE:
Convert the whole mockup into mobile app view only.
Use mobile frames suitable for screenshots in the report.
Recommended size: 390px width or iPhone-style mobile frames.
Do not use desktop dashboard views.
Every screen must be easy to capture and insert as a figure in the Word report.

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

The system must only support two role experiences:

* Senderista
* Rescatista

2. Keep the demo access screen, but only with two demo accounts:

Senderista (Demo)
Correo: [senderista@treksafe.pe](mailto:senderista@treksafe.pe)
Contraseña: demo123
Button: "Ingresar como Senderista"

Rescatista (Demo)
Correo: [rescatista@treksafe.pe](mailto:rescatista@treksafe.pe)
Contraseña: demo123
Button: "Ingresar como Rescatista"

Also keep:

* "Iniciar sesión"
* "Crear cuenta"

3. Remove SMS from the notification settings.
   SMS is outside the project scope.
   Replace “Correo, push, SMS” with:
   “Correo y notificaciones de la aplicación”

4. Use consistent Peruvian / mountain expedition examples.
   Avoid foreign or random route names like “Cascade Ridge”, “Bluebell”, “Priya Nair”, “Tom Svensson”.
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

The login should NOT ask for institutional credentials.

Credentials are validated only during the initial registration of the rescuer.

Correct flow:

Rescatista registration:

* The rescuer enters institutional data.
* The system validates those data against a simulated credential registry.
* If valid, the account is created with role “rescatista”.
* If not valid, the account is not created.

Future login:

* The rescuer logs in only with email and password.

Therefore, create a login screen with:

* Email
* Password
* Button: "Iniciar sesión"
* Optional role tabs: "Senderista" and "Rescatista"
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

---

## SENDERISTA REGISTRATION / ONBOARDING

Keep the guided onboarding wizard, but make sure it represents the senderista registration process.

Step 1 of 4:
"Cuenta"
Fields:

* Nombre completo
* Correo electrónico
* Contraseña
* Confirmar contraseña

Step 2 of 4:
"Salud"
Fields:

* Grupo sanguíneo
* Alergias
* Condiciones médicas
* Medicamentos habituales

Step 3 of 4:
"Contactos"
Fields or cards:

* Nombre completo
* Parentesco
* Teléfono
* Correo electrónico
  Button:
  "+ Agregar contacto"

Step 4 of 4:
"Primera expedición"
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
"Crear cuenta y registrar expedición"

Important:
This onboarding must not look like disconnected forms. It should feel like one guided setup process.

---

## RESCATISTA REGISTRATION

Create or correct a separate registration screen for rescatistas.

Title:
"Registro de Rescatista"

Subtitle:
"Valida tus credenciales institucionales para acceder al panel de rescate"

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
"Validar y crear cuenta"

Add validation states:

Successful validation:
Title:
"Credenciales validadas"

Message:
"Tu cuenta de rescatista ha sido creada correctamente."

Button:
"Ingresar al panel de rescate"

Failed validation:
Title:
"No se pudo validar la credencial"

Message:
"Los datos ingresados no coinciden con el registro simulado de credenciales."

Button:
"Revisar datos"

Do not include file upload, fotocheck upload, pending validation status, or administrator review.

---

## SENDERISTA HOME

Improve the senderista home screen.

It must clearly communicate the current safety status.

Use a main card:

"Estado de Seguridad"

Possible states:

* "Sin expedición activa"
* "Expedición activa"
* "Próximo a vencer"
* "Alerta activa"

For the demo state, show:
"Expedición activa"
Route:
"Laguna 69 - Cordillera Blanca"
Time remaining:
"12h 30m"

Main button:
"Ver expedición"

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
"Expedición Activa"

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
"Monitoreo de Seguridad Activo"
"Tus contactos de emergencia serán notificados automáticamente si no confirmas tu regreso antes de la hora estimada."

Main button:
"Confirmar Retorno Seguro"

Secondary demo button:
"Simular alerta"

This button is only for prototype demonstration purposes.

---

## RETURN CONFIRMED SCREEN

Create a success screen.

Title:
"¡Retorno Confirmado!"

Message:
"Has regresado de forma segura."

Show:

* Expedición
* Hora de check-in
* Estado: Finalizada
* Contactos notificados

Buttons:

* "Volver al inicio"
* "Registrar nueva expedición"

---

## ALERT ACTIVE SCREEN

Create a critical alert screen for the senderista.

Title:
"Alerta Crítica Activa"

Message:
"No se confirmó el retorno a tiempo."

Show:

* Retorno esperado
* Hora actual
* Tiempo de retraso
* Ruta
* Participantes
* Contactos notificados
* Equipo de rescate notificado

Main button:
"Estoy a salvo - Confirmar retorno"

Use red as emergency color, but keep the screen readable and professional.

---

## SENDERISTA PROFILE

Correct the senderista profile.

It must show saved information and editable sections.

Title:
"Mi Perfil"

Sections:

1. "Datos personales"
   Show:

* Nombre
* Correo
* Teléfono
  Button:
  "Editar información"

2. "Información médica"
   Show:

* Grupo sanguíneo
* Alergias
* Condiciones médicas
* Medicamentos habituales
  Button:
  "Editar información médica"

3. "Contactos de emergencia"
   Show:

* Contact cards
  Each card:

  * Nombre
  * Parentesco
  * Teléfono
  * Correo
    Buttons:
  * "Editar"
  * "Eliminar"
    Button:
    "+ Agregar contacto"

4. "Notificaciones"
   Show toggles:

* Notificaciones por correo
* Notificaciones de la aplicación
* Alertas de expedición
* Recordatorios de retorno
* Notificaciones del sistema

All must be editable.

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

Create mobile version of the rescuer dashboard.

Title:
"Panel de Control"

Subtitle:
"Monitoreo de expediciones en tiempo real"

KPIs:

* Expediciones activas
* Expediciones retrasadas
* Alertas activas
* Casos cerrados

Recent alerts:

* Senderista
* Ruta
* Estado
* Button: "Ver alerta"

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
"Expediciones"

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
* Button: "Detalles" or "Ver alerta"

---

## RESCATISTA ALERTS SCREEN

Title:
"Gestión de Alertas"

Show alert cards:

* Nombre del senderista
* Ruta
* Tiempo de retraso
* Retorno estimado
* Risk status
* Button: "Ver detalles"

Use orange for delayed cases and red for critical alerts.

---

## RESCATISTA ALERT DETAIL SCREEN

This screen supports rescue decision-making.

Title:
"Detalle de Alerta"

Show:

1. Información del senderista

* Nombre
* Teléfono
* Correo

2. Información médica

* Grupo sanguíneo
* Alergias
* Condiciones médicas
* Medicamentos habituales

3. Detalles de la expedición

* Ruta
* Punto de inicio
* Punto de destino
* Participantes
* Dificultad
* Retorno estimado
* Tiempo de retraso

4. Contactos de emergencia

* Nombre
* Parentesco
* Teléfono
* Estado de notificación

Actions:

* "Marcar en seguimiento"
* "Contactar senderista"
* "Contactar contacto de emergencia"
* "Contactar bomberos"
* "Contactar policía"
* "Cerrar caso"

---

## RESCATISTA RESCUE OPERATIONS SCREEN

Title:
"Operaciones de Rescate"

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

* "Ver caso"

States:

* "En camino"
* "En zona"
* "Cerrado"

---

## RESCATISTA PROFILE

The rescuer profile must be different from the senderista profile.

Title:
"Mi Perfil"

Subtitle:
"Perfil de rescatista"

Show:

* Nombre
* Correo
* Estado: Disponible / No disponible
* Institución
* Especialidad
* Zona de operación
* Credencial
* Rescates atendidos
* Alertas gestionadas

Buttons:

* "Cambiar disponibilidad"
* "Ver historial de rescates"
* "Cerrar sesión"

Do not show medical information, emergency contacts, or hiker notification settings in the rescuer profile.

---

## FINAL REQUIREMENTS

* All screens must be mobile app views.
* All UI text must be in Spanish.
* Remove administrator completely.
* Rescuer credential validation happens only during initial registration.
* Login only uses email and password.
* No SMS references.
* No pending validation or manual admin approval.
* No fotocheck upload.
* Keep demo access for senderista and rescatista only.
* Keep the design modern, clean, outdoor-oriented, and ready for academic report screenshots.

---
