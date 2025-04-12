import { GameRegion, GameVersion, SettingsKey } from 'shared';
import type { SettingsManager } from '~/lib/SettingsManager';

export class Startup {
	public constructor(
		private readonly settingsManager: SettingsManager,
	) {}

	public async performStartupTasks() {
		await this.applyDefaultSettings();
	}

	private async applyDefaultSettings() {
		if (import.meta.env.DEV) {
			await this.settingsManager.setDefault(SettingsKey.ClientId, __BATTLENET_CLIENT_ID__);
			await this.settingsManager.setDefault(SettingsKey.ClientSecret, __BATTLENET_CLIENT_SECRET__);
		}

		await this.settingsManager.setDefault(SettingsKey.AutoStart, false);
		await this.settingsManager.setDefault(SettingsKey.StartHidden, false);
		await this.settingsManager.setDefault(SettingsKey.CloseToTray, false);
		await this.settingsManager.setDefault(SettingsKey.MinimizeToTray, false);
		//
		await this.settingsManager.setDefault(SettingsKey.EnableWowTokenNotifications, false);
		//
		await this.settingsManager.setDefault(SettingsKey.EnableBeledarNotifications, false);
		//
		await this.settingsManager.setDefault(SettingsKey.DefaultRealmStatusVersion, GameVersion.Retail);
		await this.settingsManager.setDefault(SettingsKey.DefaultRealmStatusRegion, GameRegion.UsAndOce);
	}
}
