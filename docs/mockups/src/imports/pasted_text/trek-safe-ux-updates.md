You are a Senior UX/UI Designer and Product Designer.

Modify only the spacing, layout, scroll behavior, button visibility, missing Sprint 7 screens, and missing Sprint 8 screens in the existing TrekSafe mobile mockup.

Do NOT redesign the entire app from scratch.

Keep the current visual identity, colors, typography, rounded cards, and mobile-first style.

All visible UI text must be in Spanish.

All screens must remain mobile app views with 390px width, suitable for screenshots in the academic Word report.

---

## PART 1: FIX BUTTON VISIBILITY AND MOBILE LAYOUT

Problem to fix:
Some bottom buttons are partially hidden behind the bottom navigation bar or outside the visible mobile frame.

This happens in screens such as:

* “Nueva Expedición”
* “Alerta Crítica Activa”
* “Expedición Activa”
* “Retorno Confirmado”
* “Detalle de Alerta”
* Any other screen with a primary action button near the bottom

Required correction:

1. Review every mobile frame in the TrekSafe mockup.

2. Ensure that every primary and secondary button is fully visible, readable, and tappable.

3. No button should be cut off, hidden, overlapped, or partially covered by:

* Bottom navigation bar
* Device frame
* Safe area
* Screen edge
* Floating elements

4. Add proper bottom padding to all scrollable screens.

5. For screens with bottom navigation, leave enough space above the bottom navigation so the last button is fully visible.

6. Use a sticky bottom action area when appropriate.

Examples:

* In “Nueva Expedición”, the button “Registrar expedición” must be fully visible above the bottom navigation.
* In “Alerta Crítica Activa”, the button “Estoy a salvo - Confirmar retorno” must be fully visible above the bottom navigation.
* In “Expedición Activa”, the button “Confirmar Retorno Seguro” must be fully visible and not hidden by the bottom navigation.
* In “Retorno Confirmado”, all action buttons must be fully visible.
* In “Detalle de Alerta”, all action buttons must be visible and accessible through proper scrolling.
* In “Configuración de privacidad”, all privacy actions must be visible and tappable.
* In “Formulario offline de expedición”, the button to save or synchronize must be fully visible.
* In “Validación de coordenadas manuales”, the validation button and error message must not be hidden.

7. Use consistent bottom spacing:

* Minimum 24px spacing above the bottom navigation.
* Minimum 32px bottom padding inside scrollable content.
* If a button is fixed at the bottom, place it above the navigation bar, not behind it.

8. For long screens, make the content scrollable and ensure the final button can be reached.

9. Do not remove any required buttons.

10. Do not place primary action buttons behind the bottom navigation.

Final validation:
Before finishing, visually check every mobile screen and confirm that:

* All primary buttons are fully visible.
* All button labels are readable.
* No bottom navigation overlaps any button.
* The user can clearly see the next action on every screen.

---

## PART 2: ADD / REVIEW SPRINT 7 SCREENS

The Sprint 7 section is missing or incomplete.

Add and/or correct the following mobile screens based on the documented Sprint 7 scope: privacy, offline resilience, and manual coordinate validation.

The team is organized in three fronts:

1. Privacidad
2. Offline
3. Validación de datos

The mockup must visually represent these three areas.

---

## FIGURA 41 - CONFIGURACIÓN DE PRIVACIDAD

Create a mobile screen called:

“Configuración de privacidad”

Purpose:
Allow the senderista to manage personal data, consent, and privacy options.

Show sections:

1. “Datos personales y sensibles”

Description:
“Gestiona el uso de tu información médica, contactos de emergencia y rutas registradas.”

2. “Consentimiento”

Show toggles:

* “Permitir uso de información médica en emergencias”
* “Permitir notificación a contactos de emergencia”
* “Permitir compartir datos con equipos de rescate en caso de alerta”

3. “Gestión de datos”

Show action buttons:

* “Solicitar eliminación de datos”
* “Anonimizar historial de rutas”

4. “Estado de privacidad”

Show a card:

* “Datos protegidos”
* “Consentimiento activo”
* “Última actualización”

Important:
All buttons must be fully visible and not hidden by the bottom navigation.

---

## FIGURA 42 - SOLICITUD DE ELIMINACIÓN O ANONIMIZACIÓN DE DATOS

Create a mobile screen or modal called:

“Solicitud de datos personales”

This screen must show two options:

1. “Eliminar mis datos”

Description:
“Se eliminarán tus datos personales, médicos y contactos asociados, según corresponda.”

Button:
“Solicitar eliminación”

2. “Anonimizar historial”

Description:
“Tus rutas anteriores se conservarán solo con fines estadísticos, sin información personal asociada.”

Button:
“Solicitar anonimización”

Add a confirmation modal:

Title:
“Confirmar solicitud”

Message:
“Esta acción será procesada por el sistema y puede afectar la disponibilidad de tu historial.”

Buttons:

* “Cancelar”
* “Confirmar solicitud”

After confirmation, show success message:

“Solicitud registrada correctamente”

Important:
Do not imply instant deletion if the system is processing a request. Use wording like “solicitud registrada” or “solicitud enviada”.

---

## FIGURA 43 - FORMULARIO OFFLINE DE EXPEDICIÓN

Create a mobile screen called:

“Formulario offline de expedición”

Purpose:
Show that the PWA can load essential forms without connection and temporarily save information.

Top status banner:

“Modo sin conexión”

Message:
“Puedes completar la información básica. Se sincronizará cuando recuperes conexión.”

Fields:

* Nombre de la ruta
* Punto de inicio
* Punto de destino
* Fecha de salida
* Hora de salida
* Retorno estimado
* Participantes
* Dificultad
* Observaciones

Show a small status card:

“Guardado temporal”

“Los datos se almacenarán en el dispositivo hasta recuperar conexión.”

Button:
“Guardar sin conexión”

Also include a disabled or secondary state:

“Pendiente de sincronización”

When connection returns, show:

“Conexión recuperada”

Button:
“Sincronizar ahora”

Important:
Make sure the button “Guardar sin conexión” or “Sincronizar ahora” is fully visible above the bottom navigation.

---

## FIGURA 44 - VALIDACIÓN DE COORDENADAS MANUALES

Create a mobile screen called:

“Validación de coordenadas”

Purpose:
Allow the senderista to enter manual coordinates and show validation feedback.

Fields:

* Latitud
* Longitud
* Referencia del lugar

Add helper text:

“Ingresa coordenadas en formato decimal. Ejemplo: -9.0105, -77.6042”

Button:
“Validar coordenadas”

Create two visual states:

1. Valid coordinates

Message:
“Coordenadas válidas”

Show:

* Latitud
* Longitud
* Zona aproximada
* Estado: “Listo para registrar”

2. Invalid coordinates

Message:
“Formato de coordenadas inválido”

Error details:
“Verifica que la latitud y longitud estén en formato decimal.”

Button:
“Corregir coordenadas”

Important:
The validation error must be visible and clear.
The button must not be hidden by the bottom navigation.

---

## SPRINT 7 TASK ALIGNMENT

The screens must visually support these documented tasks:

* Diseñar pantalla de configuración de privacidad.
* Implementar opción para solicitar eliminación de datos.
* Implementar opción para anonimizar historial de rutas.
* Crear endpoint para procesar solicitudes de revocación.
* Validar que los datos sensibles se eliminen o anonimicen correctamente.
* Configurar caché de formularios esenciales.
* Permitir carga de estructura base de la aplicación sin conexión.
* Guardar temporalmente información ingresada sin conexión.
* Sincronizar datos cuando se recupere conexión.
* Implementar validación de formatos de coordenadas.
* Mostrar mensajes de error ante coordenadas inválidas.
* Probar escenarios con y sin conexión.

Do not show these as technical backend screens.
Represent them as user-facing UI screens and states.

---

## PART 3: ADD / REVIEW SPRINT 8 SCREENS

The Sprint 8 section is missing or incomplete.

Add and/or correct the following mobile screens based on the documented Sprint 8 scope: visual polish, accessibility, dark mode, and preventive return alert.

Sprint 8 focuses on:

1. Mejoras visuales y accesibilidad
2. Modo oscuro
3. Notificación preventiva de proximidad de expiración

The mockup must visually represent these three areas.

---

## GENERAL VISUAL POLISH REQUIREMENTS

Review the main mobile screens and improve visual consistency, readability, and usability.

Focus on the following improvements:

1. Review visual consistency across the main screens:

* Login
* Registro
* Home / Inicio
* Expedición activa
* Perfil senderista
* Perfil rescatista
* Alertas
* Nueva expedición

2. Improve the size and hierarchy of primary buttons:

* Primary actions must be visually dominant.
* Button labels must always be fully visible.
* Buttons must not be cropped or hidden.
* Primary buttons must be consistent in size, border radius, and spacing.

3. Optimize cards, states, and visual indicators:

* Status cards should be easy to scan.
* Use green for safe.
* Use amber/orange for warning.
* Use red for emergency.
* Improve spacing and typography hierarchy inside cards.
* Make countdowns, return times, and alert states more visible.

4. Validate contrast and legibility:

* Ensure text is readable on all backgrounds.
* Improve contrast for secondary text.
* Improve legibility of warning and alert labels.
* Ensure buttons and indicators remain accessible.

5. Adjust responsive layouts for mobile and desktop references if needed, but the final mockups to keep in this file must remain mobile-first app views suitable for report screenshots.

6. Perform a final usability pass:

* Every screen must clearly communicate the next action.
* Users must never wonder what to do next.
* Important safety information must be highly visible.

---

## FIGURA 45 - PANTALLA PRINCIPAL OPTIMIZADA DEL SENDERISTA

Create or refine a mobile screen called:

“Inicio”

or

“Panel principal”

This is the optimized main screen for the senderista.

Purpose:
Make the platform feel clearer, more useful, and more polished.

It should show:

Header:

* Greeting, for example: “Buenos días, Elena”
* Notification icon if appropriate

Main safety status card:

Show one prominent top card with the current state.

Examples:

* “Expedición activa”
* “Sin expedición activa”
* “Alerta activa”

If expedition is active, show:

* Route name
* Time remaining
* Estimated return time
* Current safety state

Quick actions:

Show clearly visible buttons:

* “Ver expedición”
* “Nueva expedición”

Summary cards:

Show useful indicators such as:

* “Expediciones registradas”
* “Contactos protegidos”
* “Retornos seguros”
* “Estado del monitoreo”

Recent activity or expedition history preview:

Show 1–2 recent expedition cards.

Important:
This screen must feel cleaner, more polished, and more useful than the current version.

---

## FIGURA 46 - MODO OSCURO

Create a dark mode version of the main senderista experience.

This should not be a completely different design.
It must be the same product, adapted properly to dark mode.

Create a mobile screen called:

“Modo oscuro”

Recommended screen to adapt:

* Main senderista home screen

or

* Active expedition screen

Dark mode requirements:

* Use deep dark backgrounds.
* Preserve TrekSafe identity.
* Keep green as primary accent.
* Ensure excellent contrast.
* Status colors must still be clear:

  * Green = safe
  * Orange = warning
  * Red = emergency

Show:

* Cards
* Buttons
* Bottom navigation
* Status indicators
* Text hierarchy
* Icons

All text must remain fully readable.

---

## FIGURA 47 - NOTIFICACIÓN PREVENTIVA DE RETORNO

Create a mobile screen or state showing a preventive reminder when the expedition is close to expiration.

This must represent the logic:

When there are 30 minutes left before the expected return time, the system shows a visual preventive reminder to the senderista.

Create a UI state called:

“Recordatorio de retorno”

This can appear as:

* top banner
* inline alert card
* bottom sheet
* in-app notification card

Visible text example:

“Faltan 30 minutos para tu retorno estimado”

“Recuerda confirmar tu regreso para evitar una alerta automática.”

Include a clear action button:

* “Confirmar retorno”

or

* “Ver expedición”

Optional secondary action:

* “Más tarde”

This preventive notification must feel important but not alarming.
Use warning color styling, amber/orange, not red.

---

## FIGURA 48 - PANTALLA DE EXPEDICIÓN ACTIVA CON RECORDATORIO

Create or refine the mobile screen:

“Expedición activa”

Add the preventive reminder directly inside this screen when the expedition is near expiration.

This screen must show:

Main expedition card:

* Route
* Departure time
* Estimated return time
* Participants
* Difficulty

Countdown:

Large, clear time remaining display.

Time progress indicator:

Show visual progress toward expiration.

Preventive reminder state:

When 30 minutes remain, display a warning card or banner.

Title:
“Próximo a expirar”

Message:
“Faltan 30 minutos para tu retorno estimado. Confirma tu regreso a tiempo para evitar una alerta automática.”

Primary action:

“Confirmar retorno seguro”

Optional secondary action:

“Ver contactos notificados”

or

“Entendido”

This screen must show how the preventive reminder integrates with the active expedition timer.

---

## PREVENTIVE ALERT LOGIC TO REFLECT IN THE MOCKUP

Represent visually the following logic:

* The system detects when there are 30 minutes left before expiration.
* It displays a preventive visual reminder to the senderista.
* The senderista is prompted to confirm return.
* If the senderista still does not confirm after expiration and tolerance, the critical alert flow continues as already documented.

This should be visible in the UI, not as technical documentation.

---

## SPRINT 8 TASK ALIGNMENT

The mockups must visually support the following documented tasks:

* Revisar consistencia visual de las pantallas principales.
* Mejorar tamaño y jerarquía de botones principales.
* Optimizar tarjetas, estados e indicadores visuales.
* Implementar modo oscuro en la interfaz.
* Validar contraste y legibilidad.
* Ajustar pantallas responsive para celular y computadora.
* Implementar alerta visual preventiva.
* Detectar cuando falten 30 minutos para la expiración.
* Mostrar recordatorio de check-in al senderista.
* Probar notificaciones preventivas en expediciones activas.
* Realizar pruebas finales de usabilidad.

Do not show these as backend or technical flows.
Represent them through user-facing UI states and polished mobile screens.

---

## FINAL REPORT FIGURES REQUIRED

Make sure the following mobile frames exist and are clearly named:

Sprint 7:

* Figura 41. Configuración de privacidad
* Figura 42. Solicitud de eliminación o anonimización de datos
* Figura 43. Formulario offline de expedición
* Figura 44. Validación de coordenadas manuales

Sprint 8:

* Figura 45. Pantalla principal optimizada del senderista
* Figura 46. Modo oscuro
* Figura 47. Notificación preventiva de retorno
* Figura 48. Pantalla de expedición activa con recordatorio

These frames must be clean and easy to capture for insertion into the report.

---

## FINAL CHECKLIST

Before finishing, make sure:

* All buttons are fully visible.
* No button is hidden behind the bottom navigation.
* Every screen has proper bottom padding.
* Primary action buttons are clear and tappable.
* Main screens have better visual consistency.
* Buttons are larger, clearer, and properly prioritized.
* Cards and status indicators are visually improved.
* Contrast and readability are correct.
* Dark mode is included and usable.
* Preventive return reminder is clearly shown.
* Active expedition screen includes the 30-minute warning state.
* Sprint 7 includes all four required screens.
* Sprint 8 includes all four required screens.
* All visible text is in Spanish.
* All screens are mobile app views.
* The mockup remains consistent with TrekSafe’s visual identity.
* The screens are suitable for academic report screenshots.
