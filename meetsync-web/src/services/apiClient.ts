/**
 * Placeholder for the future MeetSync backend client.
 *
 * Nothing in the marketing site talks to a server yet. Service modules
 * (auth, contact…) expose typed functions that currently reject with
 * `BackendNotConnectedError`, so the UI can show an honest message
 * instead of faking success. Wire `request()` to the real API later.
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

export class BackendNotConnectedError extends Error {
  constructor(feature: string) {
    super(`${feature}: backend is not connected yet`);
    this.name = 'BackendNotConnectedError';
  }
}

export function isBackendConfigured(): boolean {
  return API_BASE_URL.length > 0;
}

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!isBackendConfigured()) throw new BackendNotConnectedError(path);

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    credentials: 'include',
  });
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return (await response.json()) as T;
}
