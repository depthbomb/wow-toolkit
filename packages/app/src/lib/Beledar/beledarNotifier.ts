import { SettingsKey } from 'shared';
import { getExtraResourcePath } from '~/utils';
import { Notifications, NotificationBuilder } from '~/lib/Notifications';
import type { SettingsManager } from '~/lib/SettingsManager';

export class BeledarNotifier {
	private notified = false;

	private readonly notification: NotificationBuilder;

	public constructor(
		private readonly settingsManager: SettingsManager,
		private readonly notifications: Notifications
	) {
		this.notification = new NotificationBuilder()
			.setTitle('Beledar\'s Spawn is up soon!')
			.addText('The dark event starts in 5 minutes.')
			.setImage(getExtraResourcePath('notifications/beledar.jpg'), 'hero');
	}

	public notify() {
		const shouldNotify = this.settingsManager.get<boolean>(SettingsKey.EnableBeledarNotifications, true);
		if (this.notified || !shouldNotify) {
			return;
		}

		this.notifications.showNotification(this.notification);
	}
}
