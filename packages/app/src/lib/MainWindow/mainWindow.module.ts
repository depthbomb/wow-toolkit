import { shell } from 'electron';
import { PRELOAD_PATH } from '~/constants';
import { IpcChannel, SettingsKey } from 'shared';
import type { ModuleRegistry } from '~/lib/ModuleRegistry';

export class MainWindowModule {
	public static bootstrap(moduleRegistry: ModuleRegistry) {
		const ipc             = moduleRegistry.get('Ipc');
		const settingsManager = moduleRegistry.get('SettingsManager');
		const windowManager   = moduleRegistry.get('WindowManager');
		const mainWindow = windowManager.createMainWindow({
			url: windowManager.resolveRendererHTML('index.html'),
			browserWindowOptions: {
				show: !settingsManager.get<boolean>(SettingsKey.StartHidden),
				width: 1000,
				minWidth: 1000,
				height: 600,
				minHeight: 600,
				frame: false,
				backgroundColor: '#000',
				roundedCorners: true,
				webPreferences: {
					spellcheck: false,
					enableWebSQL: false,
					nodeIntegration: true,
					devTools: import.meta.env.DEV,
					preload: PRELOAD_PATH,
				}
			},
			onReadyToShow: () => {
				if (import.meta.env.DEV) {
					mainWindow.webContents.openDevTools({ mode: 'detach' });
				}
			}
		});

		mainWindow.webContents.setWindowOpenHandler(({ url }) => {
			const { host } = new URL(url);
			const passes   = host.endsWith('github.com') || host.endsWith('wowhead.com') || host.endsWith('blizzard.com') || host.endsWith('battle.net');
			if (passes) {
				shell.openExternal(url);
			}

			return { action: 'deny' };
		});

		mainWindow.on('maximize', () => windowManager.emitMain(IpcChannel.Window_Maximize));
		mainWindow.on('unmaximize',  () => windowManager.emitMain(IpcChannel.Window_Restore));

		ipc.registerHandler(IpcChannel.Window_Minimize, () => mainWindow.minimize());
		ipc.registerHandler(IpcChannel.Window_Maximize, () => mainWindow.maximize());
		ipc.registerHandler(IpcChannel.Window_Restore,  () => mainWindow.restore());
		ipc.registerHandler(IpcChannel.Window_Close,    () => mainWindow.close());
	}
}
