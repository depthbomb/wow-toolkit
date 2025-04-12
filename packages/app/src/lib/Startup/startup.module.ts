import { app } from 'electron';
import { Startup } from './startup';
import type { ModuleRegistry } from '~/lib/ModuleRegistry';

export class StartupModule {
	public static async bootstrap(moduleRegistry: ModuleRegistry) {
		if (!app.requestSingleInstanceLock()) {
			app.exit();
		}

		const startup = new Startup(moduleRegistry.get('SettingsManager'));
		await startup.performStartupTasks();
	}
}
