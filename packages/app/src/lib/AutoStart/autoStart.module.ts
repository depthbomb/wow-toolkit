import { app } from 'electron';
import { SettingsKey } from 'shared';
import { AutoStart } from './autoStart';
import type { ModuleRegistry } from '~/lib/ModuleRegistry';

export class AutoStartModule {
	public static bootstrap(moduleRegistry: ModuleRegistry) {
		const flags           = moduleRegistry.get('Flags');
		const eventSubscriber = moduleRegistry.get('EventSubscriber');
		const autoStart       = new AutoStart();

		if (flags.uninstall) {
			autoStart.setAutoStart(false);
			app.exit(0);
		}

		moduleRegistry.register('AutoStart', autoStart);

		eventSubscriber.subscribe('settings-updated', ({ key, value }) => {
			if (key === SettingsKey.AutoStart) {
				autoStart.setAutoStart(value as boolean);
			}
		});
	}
}
