import { readOfflineJson, writeOfflineJson } from '@/lib/offlineStorage';

const TEMPLATES_KEY = 'route-templates';
const DRAFTS_KEY = 'expedition-drafts';

export type RouteTemplate = {
  id: string;
  startLocation: string;
  endLocation: string;
  startCoordinates?: string;
  endCoordinates?: string;
  toleranceMinutes: number;
  usedCount: number;
  updatedAt: string;
};

export type ExpeditionDraft = {
  id: string;
  startLocation: string;
  endLocation: string;
  startCoordinates: string;
  endCoordinates: string;
  startTime: string;
  estimatedReturnTime: string;
  toleranceMinutes: number;
  contactIds: string[];
  companionNames: string[];
  savedAt: string;
};

export async function listRouteTemplates(): Promise<RouteTemplate[]> {
  const templates = await readOfflineJson<RouteTemplate[]>(TEMPLATES_KEY, [], [
    'treksafe-route-templates',
  ]);
  return templates.sort(
    (a, b) => b.usedCount - a.usedCount || b.updatedAt.localeCompare(a.updatedAt),
  );
}

export async function saveRouteTemplate(
  input: Omit<RouteTemplate, 'id' | 'usedCount' | 'updatedAt'>,
): Promise<void> {
  const templates = await listRouteTemplates();
  const existing = templates.find(
    (t) =>
      t.startLocation === input.startLocation &&
      t.endLocation === input.endLocation &&
      t.startCoordinates === input.startCoordinates &&
      t.endCoordinates === input.endCoordinates,
  );

  if (existing) {
    existing.usedCount += 1;
    existing.toleranceMinutes = input.toleranceMinutes;
    existing.updatedAt = new Date().toISOString();
  } else {
    templates.unshift({
      id: crypto.randomUUID(),
      ...input,
      usedCount: 1,
      updatedAt: new Date().toISOString(),
    });
  }

  await writeOfflineJson(TEMPLATES_KEY, templates.slice(0, 12));
}

export async function listExpeditionDrafts(): Promise<ExpeditionDraft[]> {
  const drafts = await readOfflineJson<ExpeditionDraft[]>(DRAFTS_KEY, [], [
    'treksafe-expedition-drafts',
  ]);
  return drafts.sort((a, b) => b.savedAt.localeCompare(a.savedAt));
}

export async function saveExpeditionDraft(
  draft: Omit<ExpeditionDraft, 'id' | 'savedAt'>,
): Promise<ExpeditionDraft> {
  const drafts = await listExpeditionDrafts();
  const entry: ExpeditionDraft = {
    id: crypto.randomUUID(),
    ...draft,
    savedAt: new Date().toISOString(),
  };
  await writeOfflineJson(DRAFTS_KEY, [entry, ...drafts].slice(0, 5));
  return entry;
}

export async function removeExpeditionDraft(id: string): Promise<void> {
  const drafts = await listExpeditionDrafts();
  await writeOfflineJson(
    DRAFTS_KEY,
    drafts.filter((d) => d.id !== id),
  );
}
