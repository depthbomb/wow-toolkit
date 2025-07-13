import { dialog } from 'electron';
import { IpcChannel } from 'shared';
import { IpcService } from '~/services/ipc';
import { TrayService } from '~/services/tray';
import { ThemeService } from '~/services/theme';
import { WindowService } from '~/services/window';
import { BeledarService } from '~/services/beledar';
import { inject, injectable } from '@needle-di/core';
import { SettingsService } from '~/services/settings';
import { FirstRunService } from '~/services/firstRun';
import { WowTokenService } from '~/services/wowToken';
import { AutoStartService } from '~/services/autoStart';
import { MainWindowService } from '~/services/mainWindow';
import { RealmStatusService } from '~/services/realmStatus';
import { LifecyclePhase, LifecycleService } from '~/services/lifecycle';
import type { MessageBoxOptions } from 'electron';

@injectable()
export class MainService {
	public constructor(
		private readonly lifecycle   = inject(LifecycleService),
		private readonly ipc         = inject(IpcService),
		private readonly window      = inject(WindowService),
		private readonly theme       = inject(ThemeService),
		private readonly settings    = inject(SettingsService),
		private readonly firstRun    = inject(FirstRunService),
		private readonly autoStart   = inject(AutoStartService),
		private readonly tray        = inject(TrayService),
		private readonly mainWindow  = inject(MainWindowService),
		private readonly beledar     = inject(BeledarService),
		private readonly realmStatus = inject(RealmStatusService),
		private readonly wowToken    = inject(WowTokenService),
	) {}

	public async boot() {
		await this.firstRun.performFirstRunTasks();

		await Promise.allSettled([
			this.lifecycle.bootstrap(),
			this.theme.bootstrap(),
			this.settings.bootstrap(),
			this.autoStart.bootstrap(),
			this.mainWindow.bootstrap(),
			this.tray.bootstrap(),
			this.wowToken.bootstrap(),
			this.beledar.bootstrap(),
			this.realmStatus.bootstrap(),
		]);

		this.lifecycle.phase = LifecyclePhase.Ready;

		this.ipc.registerHandler(IpcChannel.ShowMessageBox, async (_, options: MessageBoxOptions) => await dialog.showMessageBox(this.window.getMainWindow()!, options));
	}
}
