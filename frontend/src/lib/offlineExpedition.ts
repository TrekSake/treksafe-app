const TEMPLATES_KEY = 'treksafe-route-templates';
const DRAFTS_KEY = 'treksafe-expedition-drafts';

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

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function listRouteTemplates(): RouteTemplate[] {
  return readJson<RouteTemplate[]>(TEMPLATES_KEY, []).sort(
    (a, b) => b.usedCount - a.usedCount || b.updatedAt.localeCompare(a.updatedAt),
  );
}

export function saveRouteTemplate(input: Omit<RouteTemplate, 'id' | 'usedCount' | 'updatedAt'>): void {
  const templates = listRouteTemplates();
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

  writeJson(TEMPLATES_KEY, templates.slice(0, 12));
}

export function listExpeditionDrafts(): ExpeditionDraft[] {
  return readJson<ExpeditionDraft[]>(DRAFTS_KEY, []).sort((a, b) =>
    b.savedAt.localeCompare(a.savedAt),
  );
}

export function saveExpeditionDraft(
  draft: Omit<ExpeditionDraft, 'id' | 'savedAt'>,
): ExpeditionDraft {
  const drafts = listExpeditionDrafts();
  const entry: ExpeditionDraft = {
    id: crypto.randomUUID(),
    ...draft,
    savedAt: new Date().toISOString(),
  };
  writeJson(DRAFTS_KEY, [entry, ...drafts].slice(0, 5));
  return entry;
}

export function removeExpeditionDraft(id: string): void {
  writeJson(
    DRAFTS_KEY,
    listExpeditionDrafts().filter((d) => d.id !== id),
  );
}
