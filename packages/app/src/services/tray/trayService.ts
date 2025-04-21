import { SettingsKey } from 'shared';
import { app, Tray, Menu } from 'electron';
import { getExtraResourcePath } from '~/utils';
import { WindowService } from '~/services/window';
import { inject, injectable } from '@needle-di/core';
import { SettingsService } from '~/services/settings';
import type { Maybe } from 'shared';
import type { IBootstrappable } from '~/common/IBootstrappable';

@injectable()
export class TrayService implements IBootstrappable {
	private tray: Maybe<Tray>;

	private readonly trayIcon: string;

	public constructor(
		private readonly settings = inject(SettingsService),
		private readonly window   = inject(WindowService),
	) {
		this.trayIcon = getExtraResourcePath('tray/tray.ico');
	}

	public async bootstrap() {
		const startHidden = this.settings.get<boolean>(SettingsKey.StartHidden);
		const mainWindow  = this.window.getMainWindow();

		mainWindow?.on('minimize', () => {
			if (this.settings.get(SettingsKey.MinimizeToTray)) {
				mainWindow.hide();
				this.createTray();
			}
		});
		mainWindow?.on('close', e => {
			if (this.settings.get(SettingsKey.CloseToTray)) {
				e.preventDefault();
				mainWindow.hide();
				this.createTray();
			}
		});
		mainWindow?.on('show', () => this.tryToDestroy());

		if (startHidden) {
			this.createTray();
		}
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
			const mainWindow = this.window.getMainWindow()!;

			mainWindow.show();
			mainWindow.focus();
		});
	}

	public tryToDestroy() {
		this.tray?.destroy();
		this.tray = undefined;
	}
}
