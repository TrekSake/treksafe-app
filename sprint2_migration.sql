-- Sprint 2: vínculo expedición ↔ contactos de emergencia (HU-08)
-- Ejecutar en Supabase SQL Editor si la BD ya fue creada con init_schema.sql

BEGIN;

CREATE TABLE IF NOT EXISTS expedition_emergency_contacts (
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

CREATE INDEX IF NOT EXISTS idx_expedition_emergency_contacts_expedition
    ON expedition_emergency_contacts (expedition_id);

ALTER TABLE expedition_emergency_contacts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS treksafe_deny_anon_authenticated ON expedition_emergency_contacts;
CREATE POLICY treksafe_deny_anon_authenticated ON expedition_emergency_contacts
    FOR ALL TO anon, authenticated
    USING (false) WITH CHECK (false);

COMMIT;
