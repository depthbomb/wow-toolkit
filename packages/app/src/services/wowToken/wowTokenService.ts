import { IpcService } from '~/services/ipc';
import { getExtraResourcePath } from '~/utils';
import { WindowService } from '~/services/window';
import { inject, injectable } from '@needle-di/core';
import { SettingsService } from '~/services/settings';
import { BlizzardApiService } from '~/services/blizzardApi';
import { add, toDate, isBefore, formatDistanceToNow } from 'date-fns';
import { BattlenetNamespace } from '~/services/blizzardApi/BattlenetNamespace';
import { IpcChannel, SettingsKey, isSettingsKey, expandGoldPrice } from 'shared';
import { NotificationBuilder, NotificationsService } from '~/services/notifications';
import type { Maybe } from 'shared';
import type { IBootstrappable } from '~/common/IBootstrappable';

type WowTokenIndexResponse = {
	last_updated_timestamp: number;
	price: number;
};

@injectable()
export class WowTokenService implements IBootstrappable {
	public price?: Maybe<number>;
	public lastPrice = 0;
	public lastUpdated?: Date;
	public nextUpdate?: Date;

	private firstCheck = true;

	public constructor(
		private readonly ipc           = inject(IpcService),
		private readonly settings      = inject(SettingsService),
		private readonly window        = inject(WindowService),
		private readonly notifications = inject(NotificationsService),
		private readonly blizzardApi   = inject(BlizzardApiService),
	) {
		this.settings.events.on('settingsUpdated', async ({ key }) => {
			if (isSettingsKey(key, SettingsKey.ClientId, SettingsKey.ClientSecret)) {
				await this.settings.set(SettingsKey.AccessToken, null);
				await this.settings.set(SettingsKey.AccessTokenExpiration, null);

				this.nextUpdate = undefined;
				this.lastUpdated = undefined;

				this.blizzardApi.resetAccessToken();
			}
		});
	}

	public async bootstrap(): Promise<void> {
		this.ipc.registerHandler(IpcChannel.WowToken_Info, async () => await this.getInfo());
		this.ipc.registerHandler(IpcChannel.WowToken_HasCredentials, () => this.hasCredentials());
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

				const shouldNotify = this.settings.get<boolean>(SettingsKey.EnableWowTokenNotifications, false);
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
				this.window.emitMain(IpcChannel.WowToken_Error, 'Could not retrieve token price: ' + res.status);
			}
		} catch (err: unknown) {
			this.window.emitMain(IpcChannel.WowToken_Error, (err as Error).message);
		} finally {
			this.firstCheck = false;
		}
	}

	public hasCredentials() {
		return this.blizzardApi.hasCredentialsSaved();
	}
}
