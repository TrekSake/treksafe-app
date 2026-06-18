-- TrekSafe — mejoras post-MVP (P0–P3)
-- Ejecutar en Supabase SQL Editor después de sprint7_migration.sql

BEGIN;

-- P1: evitar confirmaciones duplicadas de rescate
ALTER TABLE rescue_logs
    DROP CONSTRAINT IF EXISTS uq_rescue_logs_expedition_rescuer;

ALTER TABLE rescue_logs
    ADD CONSTRAINT uq_rescue_logs_expedition_rescuer UNIQUE (expedition_id, rescuer_id);

-- P1: idempotencia de emails HU-12/13
CREATE TABLE IF NOT EXISTS email_dispatches (
    id              UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    expedition_id   UUID            NOT NULL REFERENCES expeditions (id) ON DELETE CASCADE,
    dispatch_type   VARCHAR(32)     NOT NULL,
    recipient_key   VARCHAR(255)    NOT NULL,
    sent_at         TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_email_dispatch UNIQUE (expedition_id, dispatch_type, recipient_key)
);

CREATE INDEX IF NOT EXISTS idx_email_dispatches_expedition
    ON email_dispatches (expedition_id);

-- P1: auditoría de acceso a ficha médica
CREATE TABLE IF NOT EXISTS medical_access_audit (
    id              UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
    hiker_id        UUID            NOT NULL,
    expedition_id   UUID            REFERENCES expeditions (id) ON DELETE SET NULL,
    accessor_id     UUID            NOT NULL,
    accessor_role   VARCHAR(32)     NOT NULL,
    access_type     VARCHAR(64)     NOT NULL,
    accessed_at     TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_medical_access_audit_hiker
    ON medical_access_audit (hiker_id, accessed_at DESC);

-- P1: índice para bloqueo de expediciones activas/alerta
CREATE INDEX IF NOT EXISTS idx_expeditions_hiker_blocking
    ON expeditions (hiker_id, status)
    WHERE status IN ('in_progress', 'alert');

-- P1: cron — marcar expiradas en SQL (evita cargar todas las in_progress)
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
