import type { SettingsKey } from 'shared';

export type Events = {
	'setup-finished': void;
	'settings-updated': { key: SettingsKey, value: unknown };
	'download-started': string;
	'download-finished': void;
};
