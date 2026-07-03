-- =============================================================================
-- TrekSafe — Esqueleto relacional (DDL sin datos)
-- =============================================================================
BEGIN;
-- ---------------------------------------------------------------------------
-- 1. Extensiones
-- ---------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ---------------------------------------------------------------------------
-- 2. Tipos ENUM
-- ---------------------------------------------------------------------------
CREATE TYPE user_role_enum AS ENUM (
    'senderista',
    'rescatista'
);

CREATE TYPE expedition_status_enum AS ENUM (
    'programmed',
    'in_progress',
    'completed',
    'alert'
);

CREATE TYPE rescue_status_enum AS ENUM (
    'en_busqueda',
    'localizados',
    'cerrado'
);

-- ---------------------------------------------------------------------------
-- 3. Tablas (orden por dependencias FK)
-- ---------------------------------------------------------------------------

-- users ─────────────────────────────────────────────────────────────────────
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

-- institutional_rescuer_registry (padrón simulado AGMP/MINCETUR)
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

-- hikers_profile ──FK──► users
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

-- rescuers_profile ──FK──► users
--                      └──► institutional_rescuer_registry (credential_number)
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

-- medical_info ──FK──► hikers_profile
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

-- emergency_contacts ──FK──► hikers_profile
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

-- expeditions ──FK──► hikers_profile
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

-- expedition_companions ──FK──► expeditions
CREATE TABLE expedition_companions (
    id              UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    expedition_id   UUID            NOT NULL,
    companion_name  VARCHAR(200)    NOT NULL,

    CONSTRAINT fk_companions_expedition
        FOREIGN KEY (expedition_id) REFERENCES expeditions (id)
        ON DELETE CASCADE,
    CONSTRAINT chk_companion_name_not_empty CHECK (length(trim(companion_name)) > 0)
);

-- expedition_emergency_contacts ──FK──► expeditions
--                               └──► emergency_contacts
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

-- rescue_logs ──FK──► expeditions
--             └──► rescuers_profile
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
        ON DELETE RESTRICT,
    CONSTRAINT uq_rescue_logs_expedition_rescuer UNIQUE (expedition_id, rescuer_id)
);

-- email_dispatches ──FK──► expeditions
CREATE TABLE email_dispatches (
    id              UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    expedition_id   UUID            NOT NULL,
    dispatch_type   VARCHAR(32)     NOT NULL,
    recipient_key   VARCHAR(255)    NOT NULL,
    sent_at         TIMESTAMPTZ     NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_email_dispatches_expedition
        FOREIGN KEY (expedition_id) REFERENCES expeditions (id)
        ON DELETE CASCADE,
    CONSTRAINT uq_email_dispatch UNIQUE (expedition_id, dispatch_type, recipient_key)
);

-- medical_access_audit ──FK──► expeditions (opcional, SET NULL)
CREATE TABLE medical_access_audit (
    id              UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    hiker_id        UUID            NOT NULL,
    expedition_id   UUID,
    accessor_id     UUID            NOT NULL,
    accessor_role   VARCHAR(32)     NOT NULL,
    access_type     VARCHAR(64)     NOT NULL,
    accessed_at     TIMESTAMPTZ     NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_medical_access_audit_expedition
        FOREIGN KEY (expedition_id) REFERENCES expeditions (id)
        ON DELETE SET NULL
);

-- ---------------------------------------------------------------------------
-- 4. Índices
-- ---------------------------------------------------------------------------
CREATE INDEX idx_expeditions_cron_in_progress
    ON expeditions (status, estimated_return_time)
    WHERE status = 'in_progress';

CREATE INDEX idx_expeditions_hiker_status
    ON expeditions (hiker_id, status);

CREATE INDEX idx_expeditions_hiker_blocking
    ON expeditions (hiker_id, status)
    WHERE status IN ('in_progress', 'alert');

CREATE INDEX idx_emergency_contacts_hiker
    ON emergency_contacts (hiker_id);

CREATE INDEX idx_rescue_logs_expedition
    ON rescue_logs (expedition_id);

CREATE INDEX idx_expedition_emergency_contacts_expedition
    ON expedition_emergency_contacts (expedition_id);

CREATE INDEX idx_registry_lookup
    ON institutional_rescuer_registry (credential_number, full_name, birth_date)
    WHERE is_active = TRUE;

CREATE INDEX idx_email_dispatches_expedition
    ON email_dispatches (expedition_id);

CREATE INDEX idx_medical_access_audit_hiker
    ON medical_access_audit (hiker_id, accessed_at DESC);

-- ---------------------------------------------------------------------------
-- 5. Función operativa (cron HU-11)
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION treksafe_mark_expired_in_progress_as_alert()
RETURNS SETOF UUID
LANGUAGE sql
AS $$
    UPDATE expeditions
    SET status = 'alert', updated_at = NOW()
    WHERE status = 'in_progress'
      AND (estimated_return_time + (tolerance_minutes || ' minutes')::interval) < NOW()
    RETURNING id;
$$;

COMMIT;

-- =============================================================================
-- Mapa de relaciones (referencia rápida)
-- =============================================================================
--
--   users
--     ├── hikers_profile (1:1)
--     │     ├── medical_info (1:1)
--     │     ├── emergency_contacts (1:N)
--     │     └── expeditions (1:N)
--     │           ├── expedition_companions (1:N)
--     │           ├── expedition_emergency_contacts (N:M con emergency_contacts)
--     │           ├── rescue_logs (1:N)
--     │           ├── email_dispatches (1:N)
--     │           └── medical_access_audit (1:N, FK opcional)
--     └── rescuers_profile (1:1)
--           └── rescue_logs (1:N)
--
--   institutional_rescuer_registry
--     └── rescuers_profile (1:N vía credential_number)
