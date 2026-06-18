-- =============================================================================
-- TrekSafe — Inicialización de Esquema Relacional (PostgreSQL / Supabase)
-- Sprint 1 · Paso 1 · Release 01 MVP
-- =============================================================================
-- Ejecución: pegar en el SQL Editor de Supabase o ejecutar con psql:
--   psql "$DATABASE_URL" -f init_schema.sql
--
-- Contenido:
--   1. Extensiones y tipos ENUM
--   2. Tablas con PK, FK y CONSTRAINTS
--   3. Índice parcial crítico para el Cron Job (HU-11)
--   4. Row Level Security (RLS) — deny-by-default para roles expuestos
--   5. Datos mock: padrón institucional, senderista y rescatista de prueba
-- =============================================================================

BEGIN;

-- ---------------------------------------------------------------------------
-- 0. Limpieza idempotente (solo desarrollo / re-ejecución controlada)
-- ---------------------------------------------------------------------------
DROP TABLE IF EXISTS rescue_logs CASCADE;
DROP TABLE IF EXISTS expedition_emergency_contacts CASCADE;
DROP TABLE IF EXISTS expedition_companions CASCADE;
DROP TABLE IF EXISTS expeditions CASCADE;
DROP TABLE IF EXISTS emergency_contacts CASCADE;
DROP TABLE IF EXISTS medical_info CASCADE;
DROP TABLE IF EXISTS rescuers_profile CASCADE;
DROP TABLE IF EXISTS hikers_profile CASCADE;
DROP TABLE IF EXISTS institutional_rescuer_registry CASCADE;
DROP TABLE IF EXISTS users CASCADE;

DROP TYPE IF EXISTS rescue_status_enum CASCADE;
DROP TYPE IF EXISTS expedition_status_enum CASCADE;
DROP TYPE IF EXISTS user_role_enum CASCADE;

-- ---------------------------------------------------------------------------
-- 1. Extensiones
-- ---------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ---------------------------------------------------------------------------
-- 2. Tipos ENUM
-- ---------------------------------------------------------------------------

-- Roles de acceso segregados (HU-01, HU-03)
CREATE TYPE user_role_enum AS ENUM (
    'senderista',
    'rescatista'
);

-- Ciclo de vida de una expedición (HU-07, HU-10, HU-11)
CREATE TYPE expedition_status_enum AS ENUM (
    'programmed',
    'in_progress',
    'completed',
    'alert'
);

-- Estados operativos de la bitácora de rescate (HU-19)
CREATE TYPE rescue_status_enum AS ENUM (
    'en_busqueda',
    'localizados',
    'cerrado'
);

-- ---------------------------------------------------------------------------
-- 3. Tablas core
-- ---------------------------------------------------------------------------

-- Tabla base de autenticación y segregación de roles
CREATE TABLE users (
    id              UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    email           VARCHAR(255)    NOT NULL,
    password_hash   VARCHAR(255)    NOT NULL,
    role            user_role_enum  NOT NULL,
    created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),

    CONSTRAINT uq_users_email UNIQUE (email),
    CONSTRAINT chk_users_email_format CHECK (
        email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    )
);

COMMENT ON TABLE users IS 'Cuentas de acceso con rol senderista o rescatista.';
COMMENT ON COLUMN users.password_hash IS 'Hash bcrypt/argon2 generado en backend; nunca texto plano.';

-- Perfil extendido del senderista (HU-01)
CREATE TABLE hikers_profile (
    user_id         UUID            PRIMARY KEY,
    full_name       VARCHAR(200)    NOT NULL,
    phone           VARCHAR(20)     NOT NULL,
    document_id     VARCHAR(20)     NOT NULL,

    CONSTRAINT fk_hikers_profile_user
        FOREIGN KEY (user_id) REFERENCES users (id)
        ON DELETE CASCADE,
    CONSTRAINT uq_hikers_document_id UNIQUE (document_id),
    CONSTRAINT chk_hikers_phone_not_empty CHECK (length(trim(phone)) > 0)
);

COMMENT ON TABLE hikers_profile IS 'Datos personales del senderista vinculados 1:1 a users.';

-- Padrón simulado AGMP / MINCETUR para validación en registro (HU-03, RC simulada)
CREATE TABLE institutional_rescuer_registry (
    id                  UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    institution         VARCHAR(50)     NOT NULL,
    credential_number   VARCHAR(50)     NOT NULL,
    full_name           VARCHAR(200)    NOT NULL,
    birth_date          DATE            NOT NULL,
    is_active           BOOLEAN         NOT NULL DEFAULT TRUE,
    created_at          TIMESTAMPTZ     NOT NULL DEFAULT NOW(),

    CONSTRAINT uq_registry_credential UNIQUE (credential_number),
    CONSTRAINT uq_registry_identity UNIQUE (institution, credential_number, full_name, birth_date),
    CONSTRAINT chk_registry_institution CHECK (
        institution IN ('AGMP', 'MINCETUR')
    )
);

COMMENT ON TABLE institutional_rescuer_registry IS
    'Padrón local simulado. El backend valida credential_number + full_name + birth_date en el alta.';

-- Perfil del rescatista validado (HU-03)
CREATE TABLE rescuers_profile (
    user_id             UUID            PRIMARY KEY,
    credential_number   VARCHAR(50)     NOT NULL,
    full_name           VARCHAR(200)    NOT NULL,
    birth_date          DATE            NOT NULL,
    validated_at        TIMESTAMPTZ     NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_rescuers_profile_user
        FOREIGN KEY (user_id) REFERENCES users (id)
        ON DELETE CASCADE,
    CONSTRAINT uq_rescuers_credential UNIQUE (credential_number),
    CONSTRAINT fk_rescuers_registry_credential
        FOREIGN KEY (credential_number) REFERENCES institutional_rescuer_registry (credential_number)
);

COMMENT ON TABLE rescuers_profile IS
    'Rescatista registrado tras validación exitosa contra institutional_rescuer_registry.';
COMMENT ON COLUMN rescuers_profile.validated_at IS
    'Marca temporal de validación institucional simulada en el registro inicial.';

-- Ficha médica cifrada con consentimiento explícito (HU-05, Ley N° 29733)
CREATE TABLE medical_info (
    id                      UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    hiker_id                UUID            NOT NULL,
    blood_type              VARCHAR(5)      NOT NULL,
    encrypted_conditions    TEXT            NOT NULL,
    consent_signed          BOOLEAN         NOT NULL DEFAULT FALSE,
    created_at              TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    updated_at              TIMESTAMPTZ     NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_medical_info_hiker
        FOREIGN KEY (hiker_id) REFERENCES hikers_profile (user_id)
        ON DELETE CASCADE,
    CONSTRAINT uq_medical_info_hiker UNIQUE (hiker_id),
    CONSTRAINT chk_medical_consent_required CHECK (consent_signed = TRUE),
    CONSTRAINT chk_medical_blood_type CHECK (
        blood_type IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    )
);

COMMENT ON TABLE medical_info IS
    'Datos de salud. encrypted_conditions almacena AES-256 desde backend; acceso condicional en alerta.';
COMMENT ON COLUMN medical_info.consent_signed IS
    'Debe ser TRUE para persistir. El frontend bloquea el guardado sin consentimiento explícito.';

-- Contactos de confianza del senderista (HU-06)
CREATE TABLE emergency_contacts (
    id              UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    hiker_id        UUID            NOT NULL,
    full_name       VARCHAR(200)    NOT NULL,
    relationship    VARCHAR(100)    NOT NULL,
    phone           VARCHAR(20)     NOT NULL,
    email           VARCHAR(255)    NOT NULL,

    CONSTRAINT fk_emergency_contacts_hiker
        FOREIGN KEY (hiker_id) REFERENCES hikers_profile (user_id)
        ON DELETE CASCADE,
    CONSTRAINT chk_emergency_contacts_email CHECK (
        email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    )
);

COMMENT ON TABLE emergency_contacts IS 'Contactos de emergencia reutilizables asociados al senderista.';

-- Plan de expedición declarativo (HU-04, HU-07)
CREATE TABLE expeditions (
    id                      UUID                    PRIMARY KEY DEFAULT gen_random_uuid(),
    hiker_id                UUID                    NOT NULL,
    start_location          VARCHAR(500)            NOT NULL,
    end_location            VARCHAR(500)            NOT NULL,
    start_coordinates       VARCHAR(32),
    end_coordinates         VARCHAR(32),
    start_time              TIMESTAMPTZ             NOT NULL,
    estimated_return_time   TIMESTAMPTZ             NOT NULL,
    tolerance_minutes       INTEGER                 NOT NULL DEFAULT 30,
    status                  expedition_status_enum  NOT NULL DEFAULT 'programmed',
    created_at              TIMESTAMPTZ             NOT NULL DEFAULT NOW(),
    updated_at              TIMESTAMPTZ             NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_expeditions_hiker
        FOREIGN KEY (hiker_id) REFERENCES hikers_profile (user_id)
        ON DELETE CASCADE,
    CONSTRAINT chk_expeditions_tolerance_positive CHECK (tolerance_minutes > 0),
    CONSTRAINT chk_expeditions_temporal_order CHECK (
        estimated_return_time > start_time
    )
);

COMMENT ON TABLE expeditions IS
    'Itinerario declarativo con ventana de tolerancia para el motor de plazos (HU-11).';
COMMENT ON COLUMN expeditions.tolerance_minutes IS
    'Minutos adicionales tras estimated_return_time antes de disparar alerta.';

-- Integrantes de la cordada por expedición (HU-08)
CREATE TABLE expedition_companions (
    id              UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    expedition_id   UUID            NOT NULL,
    companion_name  VARCHAR(200)    NOT NULL,

    CONSTRAINT fk_companions_expedition
        FOREIGN KEY (expedition_id) REFERENCES expeditions (id)
        ON DELETE CASCADE,
    CONSTRAINT chk_companion_name_not_empty CHECK (length(trim(companion_name)) > 0)
);

COMMENT ON TABLE expedition_companions IS 'Acompañantes declarados en una expedición específica.';

-- Vínculo expedición ↔ contactos de emergencia (HU-08)
CREATE TABLE expedition_emergency_contacts (
    id              UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    expedition_id   UUID            NOT NULL,
    contact_id      UUID            NOT NULL,

    CONSTRAINT fk_expedition_contacts_expedition
        FOREIGN KEY (expedition_id) REFERENCES expeditions (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_expedition_contacts_contact
        FOREIGN KEY (contact_id) REFERENCES emergency_contacts (id)
        ON DELETE CASCADE,
    CONSTRAINT uq_expedition_contact UNIQUE (expedition_id, contact_id)
);

COMMENT ON TABLE expedition_emergency_contacts IS 'Contactos vinculados a una expedición para alertas.';

-- Bitácora operativa del rescatista (HU-14, HU-19)
CREATE TABLE rescue_logs (
    id              UUID                PRIMARY KEY DEFAULT gen_random_uuid(),
    expedition_id   UUID                NOT NULL,
    rescuer_id      UUID                NOT NULL,
    notes           TEXT,
    status_rescue   rescue_status_enum  NOT NULL DEFAULT 'en_busqueda',
    updated_at      TIMESTAMPTZ         NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_rescue_logs_expedition
        FOREIGN KEY (expedition_id) REFERENCES expeditions (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_rescue_logs_rescuer
        FOREIGN KEY (rescuer_id) REFERENCES rescuers_profile (user_id)
        ON DELETE RESTRICT
);

COMMENT ON TABLE rescue_logs IS
    'Seguimiento de casos de alerta por rescatistas validados.';

-- ---------------------------------------------------------------------------
-- 4. Índices de rendimiento
-- ---------------------------------------------------------------------------

-- Índice crítico para el Cron Job (HU-11):
-- Filtra expediciones en curso cuyo plazo (+ tolerancia) ya venció.
CREATE INDEX idx_expeditions_cron_in_progress
    ON expeditions (status, estimated_return_time)
    WHERE status = 'in_progress';

COMMENT ON INDEX idx_expeditions_cron_in_progress IS
    'Optimiza: SELECT ... WHERE status = in_progress AND NOW() > estimated_return_time + tolerance';

-- Índices auxiliares frecuentes en consultas de dashboard
CREATE INDEX idx_expeditions_hiker_status
    ON expeditions (hiker_id, status);

CREATE INDEX idx_emergency_contacts_hiker
    ON emergency_contacts (hiker_id);

CREATE INDEX idx_rescue_logs_expedition
    ON rescue_logs (expedition_id);

CREATE INDEX idx_expedition_emergency_contacts_expedition
    ON expedition_emergency_contacts (expedition_id);

CREATE INDEX idx_registry_lookup
    ON institutional_rescuer_registry (credential_number, full_name, birth_date)
    WHERE is_active = TRUE;

-- ---------------------------------------------------------------------------
-- 5. Row Level Security (RLS)
-- ---------------------------------------------------------------------------
-- Modelo TrekSafe: autorización en la API REST con JWT propio (no Supabase Auth).
-- RLS protege el esquema public contra acceso directo vía PostgREST (anon key).
-- El backend conecta con service_role o DATABASE_URL (postgres) → BYPASSRLS.
-- Ver enable_rls.sql para aplicar solo RLS sobre una BD ya creada.

ALTER TABLE users                           ENABLE ROW LEVEL SECURITY;
ALTER TABLE hikers_profile                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE rescuers_profile                ENABLE ROW LEVEL SECURITY;
ALTER TABLE institutional_rescuer_registry  ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_info                    ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_contacts              ENABLE ROW LEVEL SECURITY;
ALTER TABLE expeditions                     ENABLE ROW LEVEL SECURITY;
ALTER TABLE expedition_companions           ENABLE ROW LEVEL SECURITY;
ALTER TABLE expedition_emergency_contacts   ENABLE ROW LEVEL SECURITY;
ALTER TABLE rescue_logs                     ENABLE ROW LEVEL SECURITY;

-- Política explícita deny-all para roles expuestos por la Data API de Supabase.
-- Sin políticas permisivas: anon/authenticated no pueden leer ni escribir nada.
CREATE POLICY treksafe_deny_anon_authenticated ON users
    FOR ALL TO anon, authenticated
    USING (false) WITH CHECK (false);

CREATE POLICY treksafe_deny_anon_authenticated ON hikers_profile
    FOR ALL TO anon, authenticated
    USING (false) WITH CHECK (false);

CREATE POLICY treksafe_deny_anon_authenticated ON rescuers_profile
    FOR ALL TO anon, authenticated
    USING (false) WITH CHECK (false);

CREATE POLICY treksafe_deny_anon_authenticated ON institutional_rescuer_registry
    FOR ALL TO anon, authenticated
    USING (false) WITH CHECK (false);

CREATE POLICY treksafe_deny_anon_authenticated ON medical_info
    FOR ALL TO anon, authenticated
    USING (false) WITH CHECK (false);

CREATE POLICY treksafe_deny_anon_authenticated ON emergency_contacts
    FOR ALL TO anon, authenticated
    USING (false) WITH CHECK (false);

CREATE POLICY treksafe_deny_anon_authenticated ON expeditions
    FOR ALL TO anon, authenticated
    USING (false) WITH CHECK (false);

CREATE POLICY treksafe_deny_anon_authenticated ON expedition_companions
    FOR ALL TO anon, authenticated
    USING (false) WITH CHECK (false);

CREATE POLICY treksafe_deny_anon_authenticated ON expedition_emergency_contacts
    FOR ALL TO anon, authenticated
    USING (false) WITH CHECK (false);

CREATE POLICY treksafe_deny_anon_authenticated ON rescue_logs
    FOR ALL TO anon, authenticated
    USING (false) WITH CHECK (false);

-- ---------------------------------------------------------------------------
-- 6. Datos mock / semilla de desarrollo
-- ---------------------------------------------------------------------------
-- Contraseña de prueba para ambas cuentas: Treksafe123!
-- Hash generado con pgcrypto (bf/10), compatible con bcrypt del backend.

-- UUIDs fijos para referencia en pruebas de integración
-- Senderista: 11111111-1111-4111-8111-111111111111
-- Rescatista: 22222222-2222-4222-8222-222222222222

INSERT INTO institutional_rescuer_registry (
    id, institution, credential_number, full_name, birth_date, is_active
) VALUES
    (
        'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1',
        'AGMP',
        'AGMP-2024-00158',
        'Carlos Mendoza Quispe',
        '1985-03-14',
        TRUE
    ),
    (
        'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa2',
        'AGMP',
        'AGMP-2024-00203',
        'Lucía Fernández Ríos',
        '1990-07-22',
        TRUE
    ),
    (
        'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa3',
        'MINCETUR',
        'MIN-RS-2019-00441',
        'Marco Antonio Vargas Silva',
        '1988-11-05',
        TRUE
    ),
    (
        'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa4',
        'MINCETUR',
        'MIN-RS-2021-00789',
        'Ana Patricia Solís Campos',
        '1993-01-18',
        TRUE
    ),
    (
        'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa5',
        'AGMP',
        'AGMP-2023-00999',
        'Roberto Elías Paredes Luna',
        '1979-09-30',
        FALSE  -- Credencial inactiva: debe rechazarse en registro
    );

-- Senderista de prueba (HU-01)
INSERT INTO users (id, email, password_hash, role, created_at)
VALUES (
    '11111111-1111-4111-8111-111111111111',
    'senderista@treksafe.pe',
    crypt('Treksafe123!', gen_salt('bf', 10)),
    'senderista',
    NOW()
);

INSERT INTO hikers_profile (user_id, full_name, phone, document_id)
VALUES (
    '11111111-1111-4111-8111-111111111111',
    'Juan Pérez García',
    '+51987654321',
    '45879632'
);

-- Rescatista de prueba (HU-03) — coincide con padrón AGMP-2024-00158
INSERT INTO users (id, email, password_hash, role, created_at)
VALUES (
    '22222222-2222-4222-8222-222222222222',
    'rescatista@treksafe.pe',
    crypt('Treksafe123!', gen_salt('bf', 10)),
    'rescatista',
    NOW()
);

INSERT INTO rescuers_profile (
    user_id, credential_number, full_name, birth_date, validated_at
)
VALUES (
    '22222222-2222-4222-8222-222222222222',
    'AGMP-2024-00158',
    'Carlos Mendoza Quispe',
    '1985-03-14',
    NOW()
);

COMMIT;

-- =============================================================================
-- Notas post-instalación
-- =============================================================================
-- · RLS activo con deny-by-default para anon/authenticated (Data API).
--   El backend DEBE usar SUPABASE_SERVICE_ROLE_KEY o DATABASE_URL directa.
--   NUNCA expongas service_role ni DATABASE_URL en el frontend PWA.
-- · medical_info.encrypted_conditions en seeds se poblará en Sprint 2 tras
--   implementar AES-256 en backend.
-- · Para validar el índice del cron:
--     EXPLAIN ANALYZE
--     SELECT id, estimated_return_time, tolerance_minutes
--     FROM expeditions
--     WHERE status = 'in_progress'
--       AND NOW() > (estimated_return_time + (tolerance_minutes || ' minutes')::INTERVAL);
-- =============================================================================
