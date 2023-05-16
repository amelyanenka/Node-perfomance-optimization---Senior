/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL_AUTH: string;
  readonly VITE_APP_INSIGHTS_CONNECTION_STRING: string;
  readonly VITE_APP_ENV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
