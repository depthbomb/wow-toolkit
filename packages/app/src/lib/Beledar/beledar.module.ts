import { IpcChannel } from 'shared';
import { BeledarNotifier } from './beledarNotifier';
import type { ModuleRegistry } from '~/lib/ModuleRegistry';

export class BeledarModule {
	public static bootstrap(moduleRegistry: ModuleRegistry) {
		const ipc             = moduleRegistry.get('Ipc');
		const settingsManager = moduleRegistry.get('SettingsManager');
		const notifications   = moduleRegistry.get('Notifications');
		const notifier        = new BeledarNotifier(settingsManager, notifications);

		ipc.registerHandler(IpcChannel.Beledar_Notify, () => notifier.notify());
	}
}
