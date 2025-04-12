import { app, dialog, shell } from 'electron';
import { IpcChannel } from 'shared';
import { SettingsManager } from './settingsManager';
import { SettingsFileProvider } from './settingsFileProvider';
import type { ModuleRegistry } from '~/lib/ModuleRegistry';

export class SettingsManagerModule {
	public static bootstrap(moduleRegistry: ModuleRegistry) {
		const ipc                  = moduleRegistry.get('Ipc');
		const windowManager        = moduleRegistry.get('WindowManager');
		const eventSubscriber      = moduleRegistry.get('EventSubscriber');
		const storeFactory         = moduleRegistry.get('StoreFactory');
		const settingsFileProvider = new SettingsFileProvider();
		const settingsManager      = new SettingsManager(
			storeFactory.createStore(settingsFileProvider.settingsFilePath),
			moduleRegistry.get('EventEmitter')
		);

		moduleRegistry.register('SettingsManager', settingsManager);

		ipc.registerSyncHandler(
			IpcChannel.Settings_Get,
			(e, key, defaultValue, secure) => e.returnValue = settingsManager.get(key, defaultValue, { secure })
		);
		ipc.registerHandler(
			IpcChannel.Settings_Get,
			(_, key, defaultValue, secure) => settingsManager.get(key, defaultValue, { secure })
		);
		ipc.registerHandler(
			IpcChannel.Settings_Set,
			async (_, key, value, secure) => await settingsManager.set(key, value, { secure })
		);
		ipc.registerHandler(
			IpcChannel.Settings_Reset,
			async () => {
				await settingsManager.reset();
				app.relaunch();
				app.exit(0);
			}
		);
		ipc.registerHandler(
			IpcChannel.Settings_OpenFile,
			async () => {
				await dialog.showMessageBox(windowManager.getMainWindow()!, {
					type: 'info',
					title: 'Open settings file',
					message: 'Manually editing the settings file is discouraged.\nHowever if you wish to continue then you will need to restart the app after making changes to the file.'
				});
				await shell.openExternal(settingsFileProvider.settingsFilePath);
			}
		);

		eventSubscriber.subscribe('settings-updated', ({ key, value }) => windowManager.emitAll(IpcChannel.Settings_Changed, key, value));
	}
}
