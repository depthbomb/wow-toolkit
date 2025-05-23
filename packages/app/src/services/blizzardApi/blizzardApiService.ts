import { joinURL } from 'ufo';
import { net } from 'electron';
import { SettingsKey } from 'shared';
import { isBefore, addSeconds } from 'date-fns';
import { inject, injectable } from '@needle-di/core';
import { SettingsService } from '~/services/settings';
import { BattlenetNamespace } from './BattlenetNamespace';
import type { Nullable } from 'shared';

type BlizzardApiMakeRequestOptions = {
	path: string;
	body?: Record<string, string>;
	namespace: BattlenetNamespace;
};

@injectable()
export class BlizzardApiService {
	private accessToken?: string;

	public constructor(
		private readonly settings = inject(SettingsService)
	) {}

	public async makeRequest(options: BlizzardApiMakeRequestOptions) {
		if (!this.accessToken) {
			await this.getAccessToken();
		}

		const requestInit: RequestInit = {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${this.accessToken}`,
				'Battlenet-Namespace': options.namespace,
			},
		};

		if (options.body) {
			requestInit.body = new URLSearchParams(options.body);
		}

		return net.fetch(
			this.getEndpointForNamespace(options.path, options.namespace),
			requestInit
		);
	}

	public hasCredentialsSaved() {
		const clientId     = this.settings.get<Nullable<string>>(SettingsKey.ClientId, null);
		const clientSecret = this.settings.get<Nullable<string>>(SettingsKey.ClientSecret, null);

		return (!!clientId && !!clientSecret) && (clientId.length === 32 && clientSecret.length === 32);
	}

	public resetAccessToken() {
		this.accessToken = undefined;
	}

	private async getAccessToken() {
		const accessTokenExpiration = this.settings.get<Nullable<Date>>(SettingsKey.AccessTokenExpiration, null);
		const hasAccessTokenExpired = !!accessTokenExpiration && isBefore(accessTokenExpiration, new Date());

		let accessToken = this.settings.get<Nullable<string>>(SettingsKey.AccessToken, null);
		if (accessToken && !hasAccessTokenExpired) {
			this.accessToken = accessToken as string;
		} else {
			const clientId     = this.settings.get(SettingsKey.ClientId, null);
			const clientSecret = this.settings.get(SettingsKey.ClientSecret, null);
			const res = await net.fetch('https://oauth.battle.net/token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
				},
				body: new URLSearchParams({
					'grant_type': 'client_credentials',
					'scope': 'wow.profile'
				})
			});

			const now = new Date();
			if (res.ok) {
				const body = await res.json() as Record<string, unknown>;

				this.accessToken = body.access_token as string;

				await this.settings.set(SettingsKey.AccessToken, this.accessToken);
				await this.settings.set(SettingsKey.AccessTokenExpiration, addSeconds(now, body.expires_in as number));
			} else {
				throw new Error('Failed to retrieve access token');
			}
		}
	}

	private getEndpointForNamespace(path: string, namespace: BattlenetNamespace) {
		let baseEndpoint = 'https://us.api.blizzard.com';
		switch (namespace) {
			case BattlenetNamespace.DynamicEU:
				baseEndpoint = 'https://eu.api.blizzard.com';
				break;
			case BattlenetNamespace.DynamicKR:
				baseEndpoint = 'https://kr.api.blizzard.com';
				break;
			case BattlenetNamespace.DynamicTW:
				baseEndpoint = 'https://tw.api.blizzard.com';
				break;
		}

		return joinURL(baseEndpoint, path);
	}
}
