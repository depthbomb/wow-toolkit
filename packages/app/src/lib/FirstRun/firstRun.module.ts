import { FirstRun } from './firstRun';
import { FirstRunFileProvider } from './firstRunFileProvider';
import type { ModuleRegistry } from '~/lib/ModuleRegistry';

export class FirstRunModule {
	public static async bootstrap(moduleRegistry: ModuleRegistry) {
		const firstRun = new FirstRun(
			new FirstRunFileProvider()
		);

		moduleRegistry.register('FirstRun', firstRun);

		await firstRun.performFirstRunTasks();
	}
}
