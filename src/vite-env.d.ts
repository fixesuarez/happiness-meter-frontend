/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OAUTH_DOMAIN: string;
  readonly VITE_OAUTH_CLIENT_ID: string;
  readonly VITE_SERVER_URL: string;
  readonly VITE_DISCORD_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
