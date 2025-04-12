import { app, Tray, Menu } from 'electron';
import { getExtraResourcePath } from '~/utils';
import type { Maybe } from 'shared';
import type { WindowManager } from '~/lib/WindowManager';

export class TrayManager {
	private tray: Maybe<Tray>;

	private readonly trayIcon: string;

	public constructor(
		private readonly windowManager: WindowManager,
	) {
		this.trayIcon = getExtraResourcePath('tray/tray.ico');
	}

	public createTray() {
		if (this.tray !== undefined) {
			return;
		}

		this.tray = new Tray(this.trayIcon);
		this.tray.setToolTip('WoW Toolkit');
		this.tray.setContextMenu(Menu.buildFromTemplate([
			{
				label: 'Show',
				click: () => this.tray?.emit('double-click')
			},
			{
				type: 'separator'
			},
			{
				label: 'Quit',
				click: () => app.exit(0)
			}
		]));
		this.tray.on('double-click', () => {
			const mainWindow = this.windowManager.getMainWindow()!;

			mainWindow.show();
			mainWindow.focus();
		});
	}

	public tryToDestroy() {
		this.tray?.destroy();
		this.tray = undefined;
	}
}
