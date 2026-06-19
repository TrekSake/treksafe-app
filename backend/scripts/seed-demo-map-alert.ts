import { loadEnv } from '../src/infrastructure/config/env.js';
import { getSupabaseAdmin } from '../src/infrastructure/database/supabase.js';

const DEMO_EXPEDITION_ID = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaa99';
const HIKER_ID = '11111111-1111-4111-8111-111111111111';
const CONTACT_ID = '9dbe61f5-d60b-407f-a95b-8a6ca66d4274';

loadEnv();

const supabase = getSupabaseAdmin();

async function seedDemoMapAlert() {
  const now = new Date();
  const startTime = new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString();
  const returnTime = new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString();

  const { error: upsertError } = await supabase.from('expeditions').upsert(
    {
      id: DEMO_EXPEDITION_ID,
      hiker_id: HIKER_ID,
      start_location: 'Cebollapampa',
      end_location: 'Laguna 69',
      start_coordinates: '-9.00650, -77.60180',
      end_coordinates: '-9.00600, -77.61250',
      start_time: startTime,
      estimated_return_time: returnTime,
      tolerance_minutes: 30,
      status: 'alert',
      updated_at: now.toISOString(),
    },
    { onConflict: 'id' },
  );

  if (upsertError) {
    throw new Error(upsertError.message);
  }

  const { error: linkError } = await supabase.from('expedition_emergency_contacts').upsert(
    { expedition_id: DEMO_EXPEDITION_ID, contact_id: CONTACT_ID },
    { onConflict: 'expedition_id,contact_id' },
  );

  if (linkError && !linkError.message.includes('duplicate')) {
    throw new Error(linkError.message);
  }

  // Evita fallo de descifrado AES en ficha médica durante demo del mapa.
  await supabase.from('medical_info').delete().eq('hiker_id', HIKER_ID);

  console.log('[seed-demo-map-alert] OK', DEMO_EXPEDITION_ID);
}

seedDemoMapAlert().catch((err) => {
  console.error('[seed-demo-map-alert] error:', err instanceof Error ? err.message : err);
  process.exit(1);
});
