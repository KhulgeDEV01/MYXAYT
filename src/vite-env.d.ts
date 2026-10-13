/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_APP_URL?: string;
  /** Web3Forms access key — contact/partnership requests are emailed to its owner. */
  readonly VITE_WEB3FORMS_KEY?: string;
  /** Formspree form id (alternative to Web3Forms). */
  readonly VITE_FORMSPREE_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
