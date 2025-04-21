import { shell } from 'electron';
import { PRELOAD_PATH } from '~/constants';
import { IpcService } from '~/services/ipc';
import { IpcChannel, SettingsKey } from 'shared';
import { WindowService } from '~/services/window';
import { inject, injectable } from '@needle-di/core';
import { SettingsService } from '~/services/settings';
import type { Maybe } from 'shared';
import type { BrowserWindow } from 'electron';
import type { IBootstrappable } from '~/common/IBootstrappable';

@injectable()
export class MainWindowService implements IBootstrappable {
	private mainWindow: Maybe<BrowserWindow>;

	public constructor(
		private readonly ipc      = inject(IpcService),
		private readonly settings = inject(SettingsService),
		private readonly window   = inject(WindowService),
	) {}

	public async bootstrap() {
		this.mainWindow = this.window.createMainWindow({
			url: this.window.resolveRendererHTML('index.html'),
			browserWindowOptions: {
				show: !this.settings.get<boolean>(SettingsKey.StartHidden),
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
			}
		});

		this.mainWindow.webContents.setWindowOpenHandler(({ url }) => {
			const { host } = new URL(url);
			const passes   = host.endsWith('github.com') || host.endsWith('wowhead.com') || host.endsWith('blizzard.com') || host.endsWith('battle.net');
			if (passes) {
				shell.openExternal(url);
			}

			return { action: 'deny' };
		});

		this.mainWindow.on('maximize', () => this.window.emitMain(IpcChannel.MainWindow_Maximize));
		this.mainWindow.on('unmaximize',  () => this.window.emitMain(IpcChannel.MainWindow_Restore));

		this.ipc.registerHandler(IpcChannel.MainWindow_Minimize, () => this.mainWindow?.minimize());
		this.ipc.registerHandler(IpcChannel.MainWindow_Maximize, () => this.mainWindow?.maximize());
		this.ipc.registerHandler(IpcChannel.MainWindow_Restore,  () => this.mainWindow?.restore());
		this.ipc.registerHandler(IpcChannel.MainWindow_Close,    () => this.mainWindow?.close());
	}
}
