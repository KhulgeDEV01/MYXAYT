import { BackendNotConnectedError } from './apiClient';

export interface ContactRequest {
  fullName: string;
  email: string;
  organization: string;
  organizationSize: string;
  topic: string;
  message: string;
}

/**
 * Sends a contact / demo request. Not connected yet — rejects so the UI can
 * point visitors to the email address instead of silently dropping messages.
 * Later: `return request('/contact', { method: 'POST', body: JSON.stringify(payload) })`.
 */
export async function submitContactRequest(payload: ContactRequest): Promise<void> {
  void payload;
  throw new BackendNotConnectedError('contact.submit');
}
