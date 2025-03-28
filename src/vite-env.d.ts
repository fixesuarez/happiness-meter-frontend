/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OAUTH_DOMAIN: string;
  readonly VITE_OAUTH_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
