# Glosario de hispanización — TrekSafe

Fuente de verdad para nombres en español del proyecto (BD, backend, frontend, API).

## Tablas

| Inglés | Español |
|--------|---------|
| `users` | `usuarios` |
| `hikers_profile` | `perfiles_senderista` |
| `rescuers_profile` | `perfiles_rescatista` |
| `institutional_rescuer_registry` | `registros_institucionales_rescatista` |
| `medical_info` | `fichas_medicas` |
| `emergency_contacts` | `contactos_emergencia` |
| `expeditions` | `expediciones` |
| `expedition_companions` | `acompanantes_expedicion` |
| `expedition_emergency_contacts` | `vinculos_expedicion_contacto` |
| `rescue_logs` | `bitacoras_rescate` |
| `email_dispatches` | `despachos_correo` |
| `medical_access_audit` | `auditoria_acceso_medico` |

## Columnas (patrón)

| Inglés | Español |
|--------|---------|
| `email` | `correo_electronico` |
| `password_hash` | `hash_contrasena` |
| `role` | `rol` |
| `created_at` | `creado_en` |
| `updated_at` | `actualizado_en` |
| `user_id` | `usuario_id` |
| `hiker_id` | `senderista_id` |
| `rescuer_id` | `rescatista_id` |
| `full_name` | `nombre_completo` |
| `phone` | `telefono` |
| `document_id` | `id_documento` |
| `credential_number` | `numero_credencial` |
| `birth_date` | `fecha_nacimiento` |
| `validated_at` | `validado_en` |
| `institution` | `institucion` |
| `is_active` | `esta_activo` |
| `blood_type` | `tipo_sangre` |
| `encrypted_conditions` | `condiciones_encriptadas` |
| `consent_signed` | `consentimiento_firmado` |
| `relationship` | `parentesco` |
| `start_location` | `lugar_inicio` |
| `end_location` | `lugar_fin` |
| `start_coordinates` | `coordenadas_inicio` |
| `end_coordinates` | `coordenadas_fin` |
| `start_time` | `hora_inicio` |
| `estimated_return_time` | `hora_retorno_estimada` |
| `tolerance_minutes` | `minutos_tolerancia` |
| `status` | `estado` |
| `companion_name` | `nombre_acompanante` |
| `expedition_id` | `expedicion_id` |
| `contact_id` | `contacto_id` |
| `notes` | `notas` |
| `status_rescue` | `estado_rescate` |
| `dispatch_type` | `tipo_despacho` |
| `recipient_key` | `clave_destinatario` |
| `sent_at` | `enviado_en` |
| `accessor_id` | `id_accesor` |
| `accessor_role` | `rol_accesor` |
| `access_type` | `tipo_acceso` |
| `accessed_at` | `accedido_en` |

## Enums PostgreSQL

| Tipo inglés | Tipo español | Valores |
|-------------|--------------|---------|
| `user_role_enum` | `rol_usuario_enum` | `senderista`, `rescatista` |
| `expedition_status_enum` | `estado_expedicion_enum` | `programada`, `en_progreso`, `completada`, `alerta` |
| `rescue_status_enum` | `estado_rescate_enum` | `en_busqueda`, `localizados`, `cerrado` |

## Tipos de despacho

| Inglés | Español |
|--------|---------|
| `contact_alert` | `alerta_contacto` |
| `rescue_alert` | `alerta_rescate` |

## Niveles de riesgo

| Inglés | Español |
|--------|---------|
| `green` | `verde` |
| `yellow` | `amarillo` |
| `red` | `rojo` |

## Acciones de privacidad

| Inglés | Español |
|--------|---------|
| `delete_personal` | `eliminar_personal` |
| `anonymize_routes` | `anonimizar_rutas` |

## Función RPC

| Inglés | Español |
|--------|---------|
| `treksafe_mark_expired_in_progress_as_alert` | `treksafe_marcar_expiradas_en_progreso_como_alerta` |

## Rutas API

| Inglés | Español |
|--------|---------|
| `POST /auth/register-hiker` | `POST /auth/registrar-senderista` |
| `POST /auth/login` | `POST /auth/iniciar-sesion` |
| `POST /auth/register-rescuer` | `POST /auth/registrar-rescatista` |
| `/user` | `/usuario` |
| `/user/medical-info` | `/usuario/ficha-medica` |
| `/user/contacts` | `/usuario/contactos` |
| `/user/privacy/revoke` | `/usuario/privacidad/revocar` |
| `/expeditions` | `/expediciones` |
| `/expeditions/active` | `/expediciones/activa` |
| `/expeditions/history` | `/expediciones/historial` |
| `/expeditions/:id/check-in` | `/expediciones/:id/confirmar-retorno` |
| `/rescue` | `/rescate` |
| `/rescue/expeditions` | `/rescate/expediciones` |
| `/rescue/alerts` | `/rescate/alertas` |
| `/rescue/alerts/:id` | `/rescate/alertas/:id` |
| `/rescue/alerts/:id/confirm` | `/rescate/alertas/:id/confirmar` |
| `/rescue/alerts/:id/log` | `/rescate/alertas/:id/bitacora` |
| `/health` | `/salud` |

## Códigos de error

| Inglés | Español |
|--------|---------|
| `EMAIL_EXISTS` | `CORREO_EXISTE` |
| `DOCUMENT_EXISTS` | `DOCUMENTO_EXISTE` |
| `INVALID_CREDENTIALS` | `CREDENCIALES_INVALIDAS` |
| `CREDENTIAL_VALIDATION_FAILED` | `VALIDACION_CREDENCIAL_FALLIDA` |
| `UNAUTHORIZED` | `NO_AUTORIZADO` |
| `INVALID_TOKEN` | `TOKEN_INVALIDO` |
| `FORBIDDEN` | `PROHIBIDO` |
| `NOT_HIKER` | `NO_ES_SENDERISTA` |
| `NOT_RESCUER` | `NO_ES_RESCATISTA` |
| `NOT_FOUND` | `NO_ENCONTRADO` |
| `INVALID_CONTACTS` | `CONTACTOS_INVALIDOS` |
| `INVALID_START_TIME` | `HORA_INICIO_INVALIDA` |
| `INVALID_RETURN_TIME` | `HORA_RETORNO_INVALIDA` |
| `ACTIVE_EXPEDITION_EXISTS` | `EXPEDICION_ACTIVA_EXISTE` |
| `EXPEDITION_NOT_ACTIVE` | `EXPEDICION_NO_ACTIVA` |
| `INVALID_PASSWORD` | `CONTRASENA_INVALIDA` |
| `ALREADY_CONFIRMED` | `YA_CONFIRMADO` |
| `ACTIVE_EXPEDITION_BLOCKS_REVOKE` | `EXPEDICION_ACTIVA_BLOQUEA_REVOCACION` |
| `RATE_LIMITED` | `LIMITE_TASA` |

## Clases backend (muestra)

| Inglés | Español |
|--------|---------|
| `AuthService` | `ServicioAutenticacion` |
| `UserService` | `ServicioUsuario` |
| `ExpeditionService` | `ServicioExpedicion` |
| `RescueService` | `ServicioRescate` |
| `AlertNotificationService` | `ServicioNotificacionAlerta` |
| `RescueAlertService` | `ServicioAlertaRescate` |
| `PostgresAuthRepository` | `RepositorioAutenticacionPostgres` |
| `UserRepository` | `RepositorioUsuario` |
| `ExpeditionRepository` | `RepositorioExpedicion` |
| `RescueRepository` | `RepositorioRescate` |
| `AlertRepository` | `RepositorioAlerta` |
| `EmailDispatchRepository` | `RepositorioDespachoCorreo` |
| `MedicalAccessAuditRepository` | `RepositorioAuditoriaAccesoMedico` |
| `MailService` | `ServicioCorreo` |
| `AppError` | `ErrorAplicacion` |
| `MailSendError` | `ErrorEnvioCorreo` |

## Campos JSON (camelCase español)

| Inglés | Español |
|--------|---------|
| `email` | `correoElectronico` |
| `password` | `contrasena` |
| `fullName` | `nombreCompleto` |
| `documentId` | `idDocumento` |
| `phone` | `telefono` |
| `bloodType` | `tipoSangre` |
| `consentSigned` | `consentimientoFirmado` |
| `allergies` | `alergias` |
| `conditions` | `condiciones` |
| `medications` | `medicamentos` |
| `startLocation` | `lugarInicio` |
| `endLocation` | `lugarFin` |
| `startCoordinates` | `coordenadasInicio` |
| `endCoordinates` | `coordenadasFin` |
| `startTime` | `horaInicio` |
| `estimatedReturnTime` | `horaRetornoEstimada` |
| `toleranceMinutes` | `minutosTolerancia` |
| `deadlineAt` | `fechaLimite` |
| `status` | `estado` |
| `companionNames` | `nombresAcompanantes` |
| `contactIds` | `idsContactos` |
| `statusRescue` | `estadoRescate` |
| `notes` | `notas` |
| `token` | `token` |
| `role` | `rol` |
| `user` | `usuario` |
| `message` | `mensaje` |

## Rutas frontend

| Inglés | Español |
|--------|---------|
| `/login` | `/iniciar-sesion` |
| `/register/hiker` | `/registro/senderista` |
| `/register/rescuer` | `/registro/rescatista` |

## Claves de almacenamiento

| Inglés | Español |
|--------|---------|
| `treksafe_token` | `treksafe:token` |
| `treksafe_user` | `treksafe:usuario` |
| `treksafe-theme` | `treksafe:tema` |

## Excepciones (no traducir)

- Librerías: `express`, `nodemailer`, `zod`, `supabase`, `bcrypt`, `jsonwebtoken`
- Estándares: `JWT`, `AES-256-GCM`, `UUID`, `HTTP`
- Acrónimos institucionales: `AGMP`, `MINCETUR`
- Variables de entorno: `DATABASE_URL`, `JWT_SECRET`, `SUPABASE_URL`, etc.
