/**
 * Delivers contact / partnership requests to the team's email inbox.
 *
 * There is no backend yet, so delivery goes through a hosted form-to-email
 * service configured in `.env` (first one found wins):
 *   VITE_WEB3FORMS_KEY  — https://web3forms.com (free; email goes to the address the key was created for)
 *   VITE_FORMSPREE_ID   — https://formspree.io  (form id, e.g. "xayzabcd")
 * Both values are designed to be public, so they are safe in frontend code.
 * With neither set, the UI falls back to a pre-filled `mailto:` link.
 */

export type RequestType = 'contact' | 'partnership' | 'demo' | 'other';

export interface ContactRequest {
  type: RequestType;
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  message: string;
}

/** A ready-to-send email: subject plus labeled fields, already localized by the UI. */
export interface RequestEmail {
  subject: string;
  replyTo: string;
  fromName: string;
  fields: Array<[label: string, value: string]>;
}

export type DeliveryProvider = 'web3forms' | 'formspree' | 'none';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY?.trim() ?? '';
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID?.trim() ?? '';

export const deliveryProvider: DeliveryProvider = WEB3FORMS_KEY ? 'web3forms' : FORMSPREE_ID ? 'formspree' : 'none';

export class DeliveryNotConfiguredError extends Error {
  constructor() {
    super('No email delivery service is configured');
    this.name = 'DeliveryNotConfiguredError';
  }
}

function fieldsToObject(fields: RequestEmail['fields']) {
  return Object.fromEntries(fields.filter(([, value]) => value.trim() !== ''));
}

export async function sendRequestEmail(email: RequestEmail): Promise<void> {
  let response: Response;

  if (deliveryProvider === 'web3forms') {
    response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: email.subject,
        from_name: email.fromName,
        replyto: email.replyTo,
        ...fieldsToObject(email.fields),
      }),
    });
  } else if (deliveryProvider === 'formspree') {
    response = await fetch(`https://formspree.io/f/${encodeURIComponent(FORMSPREE_ID)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: email.subject,
        _replyto: email.replyTo,
        email: email.replyTo,
        ...fieldsToObject(email.fields),
      }),
    });
  } else {
    throw new DeliveryNotConfiguredError();
  }

  const result = (await response.json().catch(() => ({}))) as { success?: boolean };
  if (!response.ok || result.success === false) {
    throw new Error(`Email delivery failed (${response.status})`);
  }
}

/** Fallback: opens the visitor's email app with the request pre-filled. */
export function buildMailtoLink(to: string, email: RequestEmail): string {
  const body = email.fields
    .filter(([, value]) => value.trim() !== '')
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n');
  return `mailto:${to}?subject=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(body)}`;
}
