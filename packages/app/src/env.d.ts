/// <reference types="vite/client" />

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare const __WIN32__: boolean;
declare const __MACOS__: boolean;
declare const __LINUX__: boolean;
declare const __STRICT__: boolean;
declare const __BUILD_DATE__: string;
declare const __BATTLENET_CLIENT_ID__: string;
declare const __BATTLENET_CLIENT_SECRET__: string;
