export enum SettingsKey {
	AutoStart      = 'App.autoStart',
	StartHidden    = 'App.startHidden',
	MinimizeToTray = 'App.minimizeToTray',
	CloseToTray    = 'App.closeToTray',
	//
	ExpandSidebar = 'Ui.expandSidebar',
	//
	ClientId              = 'BlizzardApi.clientId',
	ClientSecret          = 'BlizzardApi.clientSecret',
	AccessToken           = 'BlizzardApi.accessToken',
	AccessTokenExpiration = 'BlizzardApi.accessTokenExpiration',
	//
	EnableWowTokenNotifications = 'WowToken.enableNotifications',
	//
	EnableBeledarNotifications = 'Beledar.enableNotifications',
	//
	ResetsRegion = 'Resets.region',
	//
	DefaultRealmStatusVersion = 'RealmStatus.defaultVersion',
	DefaultRealmStatusRegion  = 'RealmStatus.defaultRegion',
}

export const SettingsKeys = Object.values(SettingsKey);

export function isSettingsKey(input: string, ...keys: SettingsKey[]): boolean {
	return keys.includes(input as SettingsKey);
}
