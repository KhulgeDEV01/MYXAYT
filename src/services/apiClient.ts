/**
 * apiClient.ts — Ирээдүйн МҮХАҮТ backend (сервер)-тэй холбогдох суурь.
 *
 * Одоогоор маркетингийн сайт ямар ч сервертэй харьцдаггүй. Сервис модулиуд
 * (auth.ts г.м.) нь `BackendNotConnectedError` алдаа буцаадаг тул UI нь
 * "амжилттай" гэж худал харуулахын оронд үнэн мэдээлэл өгдөг.
 * Backend бэлэн болоход .env файлд VITE_API_BASE_URL-ийг бөглөхөд `request()` ажиллаж эхэлнэ.
 */

/** Backend-ийн үндсэн хаяг (.env → VITE_API_BASE_URL). Хоосон бол сервергүй гэсэн үг. */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

/** "Backend хараахан холбогдоогүй" гэсэн тусгай алдаа. */
export class BackendNotConnectedError extends Error {
  constructor(feature: string) {
    super(`${feature}: backend is not connected yet`);
    this.name = 'BackendNotConnectedError';
  }
}

/** Backend-ийн хаяг тохируулагдсан эсэх. */
export function isBackendConfigured(): boolean {
  return API_BASE_URL.length > 0;
}

/**
 * Сервер рүү хүсэлт илгээж, JSON хариуг буцаана.
 * @param path Хаягийн зам, жишээ нь '/meetings'
 * @param init Нэмэлт тохиргоо (method: 'POST', body г.м.)
 */
export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  if (!isBackendConfigured()) throw new BackendNotConnectedError(path);

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    credentials: 'include', // Нэвтрэлтийн cookie-г хамт илгээнэ
  });
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return (await response.json()) as T;
}
