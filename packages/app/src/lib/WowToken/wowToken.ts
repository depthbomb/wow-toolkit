import { getExtraResourcePath } from '~/utils';
import { NotificationBuilder } from '~/lib/Notifications';
import { BlizzardApi, BattlenetNamespace } from '~/lib/BlizzardApi';
import { add, toDate, isBefore, formatDistanceToNow } from 'date-fns';
import { IpcChannel, SettingsKey, isSettingsKey, expandGoldPrice } from 'shared';
import type { Maybe } from 'shared';
import type { WindowManager } from '~/lib/WindowManager';
import type { Notifications } from '~/lib/Notifications';
import type { SettingsManager } from '~/lib/SettingsManager';
import type { EventSubscriber } from '~/lib/EventSubscriber';

type WowTokenIndexResponse = {
	last_updated_timestamp: number;
	price: number;
};

export class WowToken {
	public price?: Maybe<number>;
	public lastPrice = 0;
	public lastUpdated?: Date;
	public nextUpdate?: Date;

	private firstCheck = true;

	public constructor(
		private readonly windowManager: WindowManager,
		private readonly settingsManager: SettingsManager,
		private readonly eventSubscriber: EventSubscriber,
		private readonly notifications: Notifications,
		private readonly blizzardApi: BlizzardApi,
	) {
		this.eventSubscriber.subscribe('settings-updated', async ({ key }) => {
			if (isSettingsKey(key, SettingsKey.ClientId, SettingsKey.ClientSecret)) {
				await this.settingsManager.set(SettingsKey.AccessToken, null);
				await this.settingsManager.set(SettingsKey.AccessTokenExpiration, null);

				this.nextUpdate = undefined;
				this.lastUpdated = undefined;

				this.blizzardApi.resetAccessToken();
			}
		});
	}

	public async getInfo() {
		if (this.nextUpdate && isBefore(new Date(), this.nextUpdate)) {
			return {
				price:               this.price,
				lastPrice:           this.lastPrice,
				lastUpdated:         this.lastUpdated,
				lastUpdatedDistance: formatDistanceToNow(this.lastUpdated!),
				nextUpdate:          this.nextUpdate,
				nextUpdatedDistance: formatDistanceToNow(this.nextUpdate),
			};
		}

		try {
			const namespace = BattlenetNamespace.DynamicUS;
			const res       = await this.blizzardApi.makeRequest({ path: '/data/wow/token/index', namespace });

			if (res.ok) {
				if (this.price) {
					this.lastPrice = this.price;
				}

				const data       = await res.json() as WowTokenIndexResponse;
				this.lastUpdated = toDate(data.last_updated_timestamp);
				this.nextUpdate  = add(this.lastUpdated, { minutes: 30 });
				this.price       = expandGoldPrice(data.price).gold;

				const shouldNotify = this.settingsManager.get<boolean>(SettingsKey.EnableWowTokenNotifications, false);
				if (
					shouldNotify &&
					!this.firstCheck &&
					this.price !== this.lastPrice &&
					this.lastPrice > 0
				) {
					const difference = this.price - this.lastPrice;
					this.notifications.showNotification(
						new NotificationBuilder()
							.setTitle('WoW Token Price Update')
							.setImage(getExtraResourcePath('notifications/wow-token.jpg'), 'hero')
							.addText(`Currently ${this.price.toLocaleString()} gold, ${difference > 0 ? 'up' : 'down'} from ${this.lastPrice.toLocaleString()}`)
					);
				}

				return {
					price:               this.price,
					lastPrice:           this.lastPrice,
					lastUpdated:         this.lastUpdated,
					lastUpdatedDistance: formatDistanceToNow(this.lastUpdated),
					nextUpdate:          this.nextUpdate,
					nextUpdatedDistance: formatDistanceToNow(this.nextUpdate),
				};
			} else {
				this.windowManager.emitMain(IpcChannel.WowToken_Error, 'Could not retrieve token price: ' + res.status);
			}
		} catch (err: unknown) {
			this.windowManager.emitMain(IpcChannel.WowToken_Error, (err as Error).message);
		} finally {
			this.firstCheck = false;
		}
	}

	public hasCredentials() {
		return this.blizzardApi.hasCredentialsSaved();
	}
}
