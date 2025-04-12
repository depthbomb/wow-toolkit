import { ipcRenderer, contextBridge } from 'electron';
import { IpcChannel, IpcChannels, SettingsKey } from 'shared';
import { arch, type, release, platform, hostname } from 'node:os';
import type { IpcRendererEvent, MessageBoxOptions } from 'electron';
import type { IpcApi, CoreApi, SystemApi, GameRegion, VersionsApi, SettingsApi, GameVersion } from 'shared';

const versionsApi = process.versions satisfies VersionsApi;

const ipcApi = {
	on(channel: IpcChannel, listener: (...args: any[]) => void) {
		if (!IpcChannels.includes(channel)) {
			if (__STRICT__) {
				throw new Error(`Attempted to listen to invalid channel: ${channel}`);
			}

			console.error('Attempted to listen to invalid channel', { channel });
			return () => {};
		}

		const cb = (_: IpcRendererEvent, ...args: any[]) => listener(...args);

		ipcRenderer.on(channel, cb);
		return () => ipcRenderer.removeListener(channel, cb);
	},
	once(channel: IpcChannel, listener: (...args: any[]) => void) {
		if (!IpcChannels.includes(channel)) {
			if (__STRICT__) {
				throw new Error(`Attempted to listen to invalid channel: ${channel}`);
			}

			console.error('Attempted to listen to invalid channel', { channel });
			return;
		}

		ipcRenderer.once(channel, (_, ...args) => listener(...args));
	},
	off (channel: IpcChannel, listener: (...args: any[]) => void) {
		if (!IpcChannels.includes(channel)) {
			if (__STRICT__) {
				throw new Error(`Attempted to remove listener from invalid channel: ${channel}`);
			}

			console.error('Attempted to remove listener from invalid channel', { channel });
			return;
		}

		ipcRenderer.removeListener(channel, listener);
	},
	removeAllListeners (channel: IpcChannel) {
		if (!IpcChannels.includes(channel)) {
			if (__STRICT__) {
				throw new Error(`Attempted to remove listeners from invalid channel: ${channel}`);
			}

			console.error('Attempted to remove listeners from invalid channel', { channel });
			return;
		}

		ipcRenderer.removeAllListeners(channel);
	}
} satisfies IpcApi;

const coreApi = {
	showMessageBox(options: MessageBoxOptions) {
		return ipcRenderer.invoke(IpcChannel.ShowMessageBox, options);
	},
	minimizeWindow() {
		return ipcRenderer.invoke(IpcChannel.Window_Minimize);
	},
	maximizeWindow() {
		return ipcRenderer.invoke(IpcChannel.Window_Maximize);
	},
	restoreWindow() {
		return ipcRenderer.invoke(IpcChannel.Window_Restore);
	},
	closeWindow() {
		return ipcRenderer.invoke(IpcChannel.Window_Close);
	},
	//
	getSettingsValue(key: SettingsKey, defaultValue?: any, secure: boolean = false) {
		return ipcRenderer.invoke(IpcChannel.Settings_Get, key, defaultValue, secure);
	},
	setSettingsValue(key: SettingsKey, value: any, secure: boolean = false) {
		return ipcRenderer.invoke(IpcChannel.Settings_Set, key, value, secure);
	},
	resetSettings() {
		return ipcRenderer.invoke(IpcChannel.Settings_Reset);
	},
	openSettingsFile() {
		return ipcRenderer.invoke(IpcChannel.Settings_OpenFile);
	},
	//
	getWowTokenInfo() {
		return ipcRenderer.invoke(IpcChannel.WowToken_Info);
	},
	getHasWowTokenCredentials() {
		return ipcRenderer.invoke(IpcChannel.WowToken_HasCredentials);
	},
	//
	sendBeledarNotification() {
		return ipcRenderer.invoke(IpcChannel.Beledar_Notify);
	},
	//
	getRealmStatuses(version: GameVersion, region: GameRegion) {
		return ipcRenderer.invoke(IpcChannel.RealmStatus_Statuses, version, region);
	},
} satisfies CoreApi;

const systemApi = { arch, type, release, platform, hostname } satisfies SystemApi;

const settingsApi = {
	getValue: (key: SettingsKey, defaultValue?: unknown, secure?: boolean) => ipcRenderer.sendSync(IpcChannel.Settings_Get, key, defaultValue, secure)
} satisfies SettingsApi;

contextBridge.exposeInMainWorld('versions', versionsApi);
contextBridge.exposeInMainWorld('buildDate', new Date(__BUILD_DATE__));
contextBridge.exposeInMainWorld('ipc', ipcApi);
contextBridge.exposeInMainWorld('api', coreApi);
contextBridge.exposeInMainWorld('system', systemApi);
contextBridge.exposeInMainWorld('settings', settingsApi);
