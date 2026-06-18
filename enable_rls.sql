-- =============================================================================
-- TrekSafe — Migración: activar Row Level Security (RLS)
-- =============================================================================
-- Ejecutar en Supabase SQL Editor si la BD ya fue creada con init_schema.sql
-- anterior (sin RLS). Idempotente: elimina políticas previas y las recrea.
-- =============================================================================

BEGIN;

-- Eliminar políticas previas con el mismo nombre (re-ejecución segura)
DO $$
DECLARE
    tbl TEXT;
BEGIN
    FOREACH tbl IN ARRAY ARRAY[
        'users',
        'hikers_profile',
        'rescuers_profile',
        'institutional_rescuer_registry',
        'medical_info',
        'emergency_contacts',
        'expeditions',
        'expedition_companions',
        'rescue_logs'
    ]
    LOOP
        EXECUTE format(
            'DROP POLICY IF EXISTS treksafe_deny_anon_authenticated ON %I',
            tbl
        );
    END LOOP;
END $$;

ALTER TABLE users                           ENABLE ROW LEVEL SECURITY;
ALTER TABLE hikers_profile                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE rescuers_profile                ENABLE ROW LEVEL SECURITY;
ALTER TABLE institutional_rescuer_registry  ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_info                    ENABLE ROW LEVEL SECURITY;
ALTER TABLE emergency_contacts              ENABLE ROW LEVEL SECURITY;
ALTER TABLE expeditions                     ENABLE ROW LEVEL SECURITY;
ALTER TABLE expedition_companions           ENABLE ROW LEVEL SECURITY;
ALTER TABLE rescue_logs                     ENABLE ROW LEVEL SECURITY;

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

CREATE POLICY treksafe_deny_anon_authenticated ON rescue_logs
    FOR ALL TO anon, authenticated
    USING (false) WITH CHECK (false);

COMMIT;
