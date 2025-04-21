import { IpcService } from '~/services/ipc';
import { getExtraResourcePath } from '~/utils';
import { IpcChannel, SettingsKey } from 'shared';
import { inject, injectable } from '@needle-di/core';
import { SettingsService } from '~/services/settings';
import { NotificationBuilder, NotificationsService } from '~/services/notifications';
import type { IBootstrappable } from '~/common/IBootstrappable';

@injectable()
export class BeledarService implements IBootstrappable {
	private notified = false;

	private readonly notification: NotificationBuilder;

	public constructor(
		private readonly ipc           = inject(IpcService),
		private readonly settings      = inject(SettingsService),
		private readonly notifications = inject(NotificationsService),
	) {
		this.notification = new NotificationBuilder()
			.setTitle('Beledar\'s Spawn is up soon!')
			.addText('The dark event starts in 5 minutes.')
			.setImage(getExtraResourcePath('notifications/beledar.jpg'), 'hero');
	}

	public async bootstrap() {
		this.ipc.registerHandler(IpcChannel.Beledar_Notify, () => this.notify());
	}

	public notify() {
		const shouldNotify = this.settings.get<boolean>(SettingsKey.EnableBeledarNotifications, true);
		if (this.notified || !shouldNotify) {
			return;
		}

		this.notifications.showNotification(this.notification);
	}
}
