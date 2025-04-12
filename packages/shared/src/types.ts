import type { IpcChannel } from './ipc';
import type { SettingsKey } from './settings';
import type { Realm, GameRegion, GameVersion } from './realmStatus';
import type { MessageBoxOptions, MessageBoxReturnValue } from 'electron';

export type Awaitable<T> = PromiseLike<T> | T;
export type Maybe<T>     = T | undefined;
export type Nullable<T>  = T | null;

export * from './realmStatus';

export type Currency = {
	readonly gold: number;
	readonly silver: number;
	readonly copper: number;
};

export type VersionsApi = typeof process.versions;

export type IpcApi = {
	on: (channel: IpcChannel, listener: (...args: any[]) => void) => () => void;
	once: (channel: IpcChannel, listener: (...args: any[]) => void) => void;
	off: (channel: IpcChannel, listener: (...args: any[]) => void) => void;
	removeAllListeners: (channel: IpcChannel) => void;
};

export type CoreApi = {
	showMessageBox(options: MessageBoxOptions): Promise<MessageBoxReturnValue>;
	minimizeWindow(): Promise<void>;
	maximizeWindow(): Promise<void>;
	restoreWindow(): Promise<void>;
	closeWindow(): Promise<void>;
	//
	getSettingsValue<T>(key: SettingsKey, defaultValue?: any, secure?: boolean): Promise<T>;
	setSettingsValue(key: SettingsKey, value: any, secure?: boolean): Promise<void>;
	resetSettings(): Promise<void>;
	openSettingsFile(): Promise<void>;
	//
	getWowTokenInfo(): Promise<{
		price: number;
		lastPrice: number;
		lastUpdated: Nullable<Date>;
		lastUpdatedDistance: string;
		nextUpdate: Nullable<Date>;
		nextUpdatedDistance: string;
	}>;
	getHasWowTokenCredentials(): Promise<boolean>;
	//
	sendBeledarNotification(): Promise<void>;
	//
	getRealmStatuses(version: GameVersion, region: GameRegion): Promise<Realm[]>;
};

export type SystemApi = {
	arch: () => string;
	type: () => string;
	release: () => string;
	platform: () => NodeJS.Platform;
	hostname: () => string;
};

export type SettingsApi = {
	getValue: <T>(key: SettingsKey, defaultValue?: unknown, secure?: boolean) => T
};
