import { readOfflineJson, writeOfflineJson } from '@/lib/offlineStorage';

const CACHE_KEY = 'contacts-cache';

export type CachedContact = {
  id: string;
  full_name: string;
  relationship: string;
  phone: string;
  email: string;
};

export async function cacheContacts(contacts: CachedContact[]): Promise<void> {
  await writeOfflineJson(CACHE_KEY, contacts);
}

export async function getCachedContacts(): Promise<CachedContact[]> {
  const parsed = await readOfflineJson<CachedContact[]>(CACHE_KEY, [], ['treksafe:contacts-cache']);
  return Array.isArray(parsed) ? parsed : [];
}
