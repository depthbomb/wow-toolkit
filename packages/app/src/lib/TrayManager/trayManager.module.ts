import { SettingsKey } from 'shared';
import { TrayManager } from './trayManager';
import type { ModuleRegistry } from '~/lib/ModuleRegistry';

export class TrayManagerModule {
	public static bootstrap(moduleRegistry: ModuleRegistry) {
		const windowManager   = moduleRegistry.get('WindowManager');
		const settingsManager = moduleRegistry.get('SettingsManager');
		const startHidden     = settingsManager.get<boolean>(SettingsKey.StartHidden);
		const trayManager     = new TrayManager(windowManager);
		const mainWindow      = windowManager.getMainWindow()!;

		mainWindow.on('minimize', () => {
			if (settingsManager.get(SettingsKey.MinimizeToTray)) {
				mainWindow.hide();
				trayManager.createTray();
			}
		});
		mainWindow.on('close', e => {
			if (settingsManager.get(SettingsKey.CloseToTray)) {
				e.preventDefault();
				mainWindow.hide();
				trayManager.createTray();
			}
		});
		mainWindow.on('show', () => trayManager.tryToDestroy());

		if (startHidden) {
			trayManager.createTray();
		}
	}
}
