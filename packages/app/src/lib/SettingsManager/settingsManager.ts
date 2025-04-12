import { SettingsKey } from 'shared';
import { safeStorage } from 'electron';
import type { Store } from '~/lib/Store';
import type { Settings } from './types/Settings';
import type { EventEmitter } from '~/lib/EventEmitter';

type SettingsManagetGetOptions = {
	secure?: boolean;
};
type SettingsManagetSetOptions = SettingsManagetGetOptions;

export class SettingsManager {
	public constructor(
		private readonly store: Store<Settings>,
		private readonly eventEmitter: EventEmitter
	) {}

	public get<T>(key: SettingsKey, defaultValue?: T, options?: SettingsManagetGetOptions) {
		const value = this.store.get(key, defaultValue);
		if (options?.secure) {
			if (value) {
				return this.decryptValue<T>(value as string);
			}

			return defaultValue as T;
		} else {
			return value;
		}
	}

	public async set<T>(key: SettingsKey, value: T, options?: SettingsManagetSetOptions) {
		const $value = options?.secure ? this.encryptValue(value) : value;
		await this.store.set(key, $value);

		this.eventEmitter.emit('settings-updated', { key, value });
	}

	public async setDefault<T>(key: SettingsKey, value: T, options?: SettingsManagetSetOptions) {
		if (this.get(key, null, options) === null) {
			await this.set(key, value, options);
		}
	}

	public async reload() {
		return this.store.reload();
	}

	public async reset() {
		return this.store.reset();
	}

	private encryptValue(data: unknown) {
		return safeStorage.encryptString(JSON.stringify(data)).toString('base64');
	}

	private decryptValue<T>(encrypted: string) {
		return JSON.parse(safeStorage.decryptString(Buffer.from(encrypted, 'base64'))) as T;
	}
}
