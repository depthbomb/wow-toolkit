export enum IpcChannel {
	ShowMessageBox   = 'show-message-box',
	// Window channels
	Window_Minimize  = 'window:minimize',
	Window_Maximize  = 'window:maximize',
	Window_Restore   = 'window:restore',
	Window_Close     = 'window:close',
	Window_IsBlurred = 'window:is-blurred',
	Window_IsFocused = 'window:is-focused',
	// Settings channels
	Settings_Get      = 'settings:get',
	Settings_Set      = 'settings:set',
	Settings_Reset    = 'settings:reset',
	Settings_Changed  = 'settings:changed',
	Settings_OpenFile = 'settings:open-file',
	// WoW Token channels
	WowToken_Info               = 'wow-token:info',
	WowToken_Price              = 'wow-token-get-price',
	WowToken_LastUpdate         = 'wow-token:last-update',
	WowToken_LastUpdateDistance = 'wow-token:last-update-distance',
	WowToken_NextUpdate         = 'wow-token:next-update',
	WowToken_NextUpdateDistance = 'wow-token:next-update-distance',
	WowToken_HasCredentials     = 'wow-token:has-credentials',
	WowToken_Error              = 'wow-token:error',
	// Beledar channels
	Beledar_Notify = 'beledar:notify',
	// Realm status channels
	RealmStatus_Statuses = 'realm-statuses:statuses',
}

export const IpcChannels = Object.values(IpcChannel);
