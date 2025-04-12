import { IpcChannel } from 'shared';
import { WowToken } from './wowToken';
import type { ModuleRegistry } from '~/lib/ModuleRegistry';

export class WowTokenModule {
	public static bootstrap(moduleRegistry: ModuleRegistry) {
		const ipc             = moduleRegistry.get('Ipc');
		const windowManager   = moduleRegistry.get('WindowManager');
		const settingsManager = moduleRegistry.get('SettingsManager');
		const eventSubscriber = moduleRegistry.get('EventSubscriber');
		const notifications   = moduleRegistry.get('Notifications');
		const blizzardApi     = moduleRegistry.get('BlizzardApi');
		const wowToken        = new WowToken(windowManager, settingsManager, eventSubscriber, notifications, blizzardApi);

		ipc.registerHandler(IpcChannel.WowToken_Info, async () => await wowToken.getInfo());
		ipc.registerHandler(IpcChannel.WowToken_HasCredentials, () => wowToken.hasCredentials());
	}
}
