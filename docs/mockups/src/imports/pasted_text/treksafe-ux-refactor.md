You are a Senior UX/UI Designer, Product Designer, and Design Systems Specialist.

You are NOT creating a new application from scratch.

You must REVIEW, IMPROVE, and REFACTOR the existing TrekSafe mockup while preserving its current visual identity, design language, colors, typography, branding, and overall user flow.

The current mockup already contains:

* Login
* Registration
* Hiker profile
* Medical information
* Emergency contacts
* Expedition creation
* Expedition monitoring
* Alert screens
* Rescue dashboard

The goal is to improve role separation, navigation, information architecture, and consistency.

IMPORTANT:
The prompt is written in English, but ALL visible content inside the mockup must be written in Spanish.

---

## DEMO ACCOUNTS

Add a new initial screen called:

"Acceso Demo"

This screen must allow evaluators and professors to immediately enter the system without creating accounts.

Create 3 hardcoded demo accounts:

1. Senderista (Demo)
   Correo:
   [senderista@treksafe.pe](mailto:senderista@treksafe.pe)

Contraseña:
demo123

Button:
"Ingresar como Senderista"

2. Rescatista (Demo)
   Correo:
   [rescatista@treksafe.pe](mailto:rescatista@treksafe.pe)

Contraseña:
demo123

Button:
"Ingresar como Rescatista"

3. Administrador (Demo)
   Correo:
   [admin@treksafe.pe](mailto:admin@treksafe.pe)

Contraseña:
demo123

Button:
"Ingresar como Administrador"

Keep the normal buttons:

"Iniciar sesión"

"Crear cuenta"

The application must support both:

* Normal registration/login flow
* Demo access flow

---

## ROLE SEPARATION

The current mockup mixes responsibilities between user types.

Separate the application into three completely different experiences:

1. Senderista
2. Rescatista
3. Administrador

Each role must only see the features relevant to that role.

---

## SENDERISTA IMPROVEMENTS

Remove every rescue dashboard or rescue-management element from the Senderista experience.

The senderista should only see:

* Perfil
* Información médica
* Contactos de emergencia
* Expediciones
* Notificaciones
* Historial

---

## SENDERISTA PROFILE

The profile must display saved information instead of only showing forms.

Create sections:

"Datos Personales"

Show:

* Nombre
* Correo
* Teléfono

Button:
"Editar información"

---

## MEDICAL INFORMATION

The senderista must be able to VIEW and EDIT previously entered medical information.

Display:

"Información Médica"

* Grupo sanguíneo
* Alergias
* Condiciones médicas
* Medicamentos habituales

Button:
"Editar información médica"

---

## EMERGENCY CONTACTS

The senderista must be able to fully manage contacts.

Allow:

* Crear contacto
* Editar contacto
* Eliminar contacto

Display each contact as a card.

Show:

* Nombre
* Parentesco
* Teléfono
* Correo

Buttons:
"Editar"
"Eliminar"

---

## NOTIFICATIONS

Create a dedicated screen:

"Notificaciones"

Allow users to configure:

* Notificaciones por correo
* Notificaciones push
* Alertas de expedición
* Recordatorios de retorno
* Notificaciones del sistema

All settings must be editable through toggles.

---

## RESCUER EXPERIENCE

Create a completely separate Rescatista interface.

The Rescatista should NOT see senderista profile information screens.

Navigation:

* Panel de Control
* Expediciones
* Alertas
* Rescates
* Perfil

---

## RESCUER DASHBOARD

Keep and improve the current dashboard.

Display:

* Expediciones activas
* Expediciones retrasadas
* Alertas activas
* Casos cerrados

Include cards, KPIs, tables, and alert summaries.

---

## RESCUER ALERT DETAIL

Improve the alert detail screen.

Add actions:

"Contactar senderista"

"Contactar contacto de emergencia"

"Contactar brigada de rescate"

"Contactar bomberos"

"Contactar policía"

"Escalar rescate"

"Cerrar caso"

---

## RESCUER PROFILE

The rescuer profile must be completely different from the senderista profile.

Display:

* Nombre
* Institución
* Especialidad
* Zona de operación
* Estado (Disponible / No disponible)
* Número de rescates atendidos
* Alertas gestionadas

Actions:

"Cambiar estado"

"Ver historial"

"Cerrar sesión"

---

## ADMINISTRATOR EXPERIENCE

Create a completely new administrator area.

Navigation:

* Dashboard
* Usuarios
* Rescatistas
* Alertas
* Configuración

---

## ADMIN DASHBOARD

Display:

* Usuarios registrados
* Rescatistas activos
* Expediciones registradas
* Alertas generadas
* Casos cerrados

---

## USER MANAGEMENT

Create a screen:

"Gestión de Usuarios"

Table:

* Nombre
* Correo
* Rol
* Estado

Actions:

* Editar
* Bloquear
* Eliminar

---

## RESCUER MANAGEMENT

Create a screen:

"Gestión de Rescatistas"

Table:

* Nombre
* Institución
* Estado
* Credenciales

Actions:

* Aprobar
* Rechazar
* Ver credenciales

---

## RESPONSIVE DESIGN

The mockup must include both:

1. Mobile version
2. Desktop version

Show the same flows in both layouts.

Required widths:

* Mobile (390px)
* Desktop (1440px)

---

## VISUAL CONSISTENCY

Do not redesign the visual identity.

Preserve:

* TrekSafe branding
* Existing color palette
* Existing typography
* Existing button styles
* Existing card design
* Existing visual language

Focus on:

* Better UX
* Better information architecture
* Better role separation
* Better navigation
* Better MVP presentation

---

## LANGUAGE REQUIREMENT

ALL visible text inside the mockup must be in Spanish.

This includes:

* Titles
* Menus
* Buttons
* Forms
* Labels
* Alerts
* Notifications
* Tables
* Dashboards
* Modals
* Empty states
* Success states
* Error states

Do not use English anywhere inside the user interface.
