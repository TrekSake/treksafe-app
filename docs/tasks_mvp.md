SPRINT 1: Cimientos de la Plataforma y Accesos Básicos	HU-01: Registro de Senderistas	Task 1	Frontend (PWA):	ST 1	Diseñar el formulario responsive de registro (Campos: Nombre, Apellido, DNI, Correo, Celular, Contraseña).
				ST 2	Implementar validaciones del lado del cliente (formatos de texto, longitud de DNI y robustez de clave).
				ST 3	Añadir Checkbox obligatorio de aceptación de términos de privacidad y tratamiento de datos según la Ley N° 29733.
		Task 2	Backend:	ST 1	Crear endpoint POST /api/auth/register-hiker.
				ST 2	Implementar validación de datos en el servidor (asegurar que el correo no esté duplicado).
		Task 3	Base de Datos y Seguridad:	ST 1	"Diseñar la colección o tabla Users con segregación de roles (role: ""hiker"")."
				ST 2	Implementar encriptación de contraseña usando un algoritmo hash seguro (ej. Bcrypt o Argon2) antes de guardar.
			QA / Pruebas:	ST 1	Ejecutar pruebas de caja negra para flujos de formularios vacíos o campos inválidos.
	HU-02: Inicio de Sesión Seguro	Task 1	Frontend (PWA):	ST 1	Diseñar la interfaz de Login (Correo y Contraseña) con manejo visual de estados de error (credenciales incorrectas).
				ST 2	Configurar el almacenamiento seguro del token de sesión (JWT) devuelto por el servidor.
		Task 2	Backend:	ST 1	Crear endpoint POST /api/auth/login.
				ST 2	Implementar lógica de verificación comparando el hash de la contraseña ingresada con el guardado en BD.
				ST 3	Generar el token JWT firmado con expiración controlada.
		Task 3	QA / Pruebas:	ST 1	Validar la denegación de accesos con contraseñas erróneas y correos inexistentes.
	HU-03: Registro de Cuerpos de Rescate	Task 1	Frontend (PWA):	ST 1	Diseñar el formulario especializado para registro de rescatistas.
				ST 2	Añadir campos: institución, número de credencial, nombre completo y fecha de nacimiento.
				ST 3	Mostrar mensaje de validación exitosa o fallida según el resultado del registro.
		Task 2	Backend:	ST 1	Crear endpoint POST /api/auth/register-rescuer.
				ST 2	Implementar servicio de validación de credenciales únicamente para el registro inicial de rescatistas.
				ST 3	Validar coincidencia entre institución, número de credencial, nombre completo y fecha de nacimiento.
				ST4	Asignar el rol “rescuer” solo si la validación inicial es exitosa.
		Task 3	Base de Datos y Seguridad:	ST 1	Crear registro simulado de credenciales válidas para el MVP académico.
				ST 2	Guardar el perfil del rescatista con estado “VALIDATED” o “ACTIVE” si la validación fue exitosa.
				ST 3	Evitar almacenar archivos de credenciales o fotochecks, ya que no se usará carga documental.
		Task 4	QA / Pruebas:	ST 1	Verificar que un rescatista con credenciales válidas pueda registrarse correctamente.
				ST 2	Verificar que un usuario con credenciales no coincidentes no pueda obtener rol de rescatista.
				ST 3	Verificar que, después del registro exitoso, el rescatista pueda iniciar sesión normalmente sin volver a validar sus credenciales.
SPRINT 2: Configuración de Datos Críticos y Preparación de Ruta	HU-04: Información Inicial de Expedición	Task 1	Frontend (PWA):	ST 1	Crear formulario para registrar ubicación inicial y destino de la expedición.
				ST 2	Validar campos obligatorios y mostrar mensajes de error.
				ST 3	Permitir guardar la información inicial desde la interfaz.
		Task 2	Backend:	ST 1	Crear endpoint para guardar o actualizar la información inicial de expedición.
				ST 2	Validar los datos recibidos y asociarlos al usuario autenticado.
				ST 3	Retornar respuesta de éxito o error según corresponda.
		Task 3	Base de Datos:	ST 1	Agregar campos de ubicación inicial y destino en el modelo de expedición.
				ST 2	Vincular la información al ID del usuario y al ID de la expedición.
		Task 4	QA / Pruebas	ST 1	Probar registro correcto de ubicación inicial y destino.
				ST 2	Probar validaciones cuando falten campos obligatorios.
				ST 3	Verificar que la información guardada pueda recuperarse correctamente.
	HU-05: Gestión del Historial Médico y Consentimiento	Task 1	Frontend (PWA):	ST 1	"Diseñar el panel ""Ficha Médica"" (Tipo de sangre, alergias, condiciones preexistentes)."
				ST 2	"Añadir un interruptor de confirmación mandatorio: ""Autorizo revelar estos datos únicamente en situaciones de alerta activa""."
		Task 2	Backend:	ST 1	Crear endpoint protegido PUT /api/user/medical-info.
				ST 2	Validar del lado del servidor la presencia afirmativa del consentimiento de compartición.
		Task 3	Base de Datos y Seguridad (Restricción RC-05):	ST 1	Implementar una capa de cifrado simétrico (ej. AES-256) en el backend para codificar los campos médicos antes de guardarlos en la BD.
		Task 4	QA / Pruebas:	ST 1	Inspeccionar directamente la base de datos para corroborar que la información médica no sea legible en texto plano.
	HU-06: Configuración de Contactos de Emergencia Frecuentes	Task 1	"Frontend (PWA):
"	ST 1	Diseñar el módulo CRUD para añadir contactos (Campos: Nombre, Teléfono, Correo, Parentesco).
				ST 2	Implementar expresiones regulares (Regex) para validar el formato de correo electrónico en tiempo real.
		Task 2	Backend:	ST 1	Crear endpoints POST /api/user/contacts y GET /api/user/contacts.
		Task 3	QA / Pruebas:	ST 1	Verificar que un usuario no pueda saltarse las restricciones ingresando campos de contacto en blanco.
SPRINT 3: El Núcleo del Monitoreo Pasivo (Core MVP)	HU-07: Creación de un Plan de Expedición Declarativo	Task 1	Frontend (PWA):	ST 1	Diseñar el formulario de itinerario turístico (Destino/Nevado, Fecha y hora de partida, Fecha y hora estimada de retorno).
		Task 2	Backend:	ST 1	Crear endpoint protegido POST /api/expeditions.
				ST 2	Programar validaciones de coherencia temporal (La hora estimada de retorno debe ser mayor que la hora de inicio y posterior al tiempo presente del servidor).
		Task 3	Base de Datos y Seguridad:	ST 1	"Definir el modelo de datos Expeditions con estados iniciales en valor status: ""EN_CURSO""."
		Task 4	QA / Pruebas:	ST 1	Probar el comportamiento del backend inyectando deliberadamente marcas de tiempo pasadas.
	HU-08: Asociación de Contactos y Acompañantes a la Ruta	Task 1	"Frontend (PWA):
"	ST 1	Integrar dentro del flujo de creación de rutas un selector múltiple para enlazar los contactos creados en la HU-06.
				ST 2	Añadir un componente dinámico de lista para agregar los nombres completos de los integrantes de la cordada.
		Task 2	Backend / Base de Datos:	ST 1	Adecuar el endpoint de creación de rutas para recibir un arreglo de IDs de contactos y un arreglo de cadenas de texto con los nombres de los acompañantes.
				ST 2	Mapear las relaciones de integridad referencial correspondientes en el almacenamiento.
	HU-09: Visualización Básica de Expedición Activa	Task 1	"Frontend (PWA):
"	ST 1	Diseñar el Dashboard simplificado para el senderista que se activa cuando existe un viaje con estado EN_CURSO.
				ST 2	Escribir un script con setInterval en JavaScript para calcular los minutos restantes y renderizar un temporizador regresivo visual basado en la hora límite declarada.
		Task 2	Backend:	ST 1	Crear endpoint GET /api/expeditions/active enfocado en retornar la información resumida de la ruta en curso del usuario autenticado.
	HU-10: Check-in Manual de Retorno Seguro	Task 1	Frontend (PWA):	ST 1	"Añadir un botón destacado de ""Registrar Retorno Seguro"" que solicite una confirmación de seguridad rápida (Contraseña de la cuenta o código PIN)."
		Task 2	Backend:	ST 1	Crear el endpoint POST /api/expeditions/:id/check-in.
				ST 2	"Implementar la lógica para cambiar de forma inmediata el estado de la ruta en la BD a status: ""FINALIZADA""."
		Task 3	QA / Pruebas:	ST 1	Comprobar que una vez efectuado el check-in, el temporizador gráfico del frontend se detenga y la vista vuelva al estado inicial.
SPRINT 4: Despacho e Integración de Notificaciones de Alerta	HU-11: Motor Automatizado de Control de Plazos (Cron Job)	Task 1	Backend (Supuesto SA-04):	ST 1	Configurar una tarea programada interna en el servidor (usando utilidades como node-cron, celery o el crontab del sistema operativo) que se ejecute a intervalos de un minuto.
				ST 2	"Escribir la consulta de base de datos encargada de aislar todos los registros que cumplan la condición: status == ""EN_CURSO"" AND fecha_retorno_estimada < NOW()."
		Task 2	Base de Datos:	ST 1	"Ejecutar una actualización transaccional masiva cambiando los estados de dichas expediciones de ""EN_CURSO"" a ""EN_ALERTA""."
	HU-12: Alerta Automatizada por Correo a Contactos de Emergencia	Task 1	Backend (Restricción RC-04):	ST 1	Configurar el servicio emisor de correos electrónicos en el backend mediante el protocolo SMTP estándar (utilizando librerías como Nodemailer o similares).
				ST 2	Diseñar una plantilla estructurada en HTML que detalle de forma legible el nombre del senderista extraviado, el destino declarado y su última hora prevista de check-in.
				ST 3	Implementar la lógica que extrae las direcciones de correo de los contactos de confianza asociados a la expedición en alerta y despacha los correos masivos de advertencia.
	HU-13: Alerta Automatizada por Correo a Equipos de Rescate	Task 1	Backend:	ST 1	Escribir la rutina para consolidar un listado de todas las direcciones de correo electrónico pertenecientes a las cuentas de rescatistas con perfiles validados en el sistema.
				ST 2	Implementar una rutina segura en memoria para descifrar la información médica del senderista (alergias y tipo de sangre procedentes de la HU-05) exclusivamente para esta transmisión de emergencia.
				ST 3	Generar y despachar el correo electrónico institucional de alta prioridad dirigido a las entidades de rescate, adjuntando la ficha técnica de búsqueda y salvamento.
	HU-14: Confirmación de Recepción de Alerta	Task 1	"Frontend (PWA):
"	ST 1	Mostrar alertas pendientes al rescatista.
				ST 2	Agregar botón para confirmar recepción de la alerta.
				ST 3	Mostrar el estado actualizado de la alerta.
		Task 2	Backend:	ST 1	Crear endpoint para confirmar recepción de alerta.
				ST 2	Validar que solo el rol rescatista pueda confirmar.
				ST 3	Registrar estado, fecha, hora y usuario responsable.
		Task 3	QA / Pruebas:	ST 1	Probar confirmación correcta de una alerta pendiente.
				ST 2	Verificar cambio de estado después de confirmar.
				ST 3	Probar restricción para usuarios no autorizados.
					
					