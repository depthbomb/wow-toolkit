import { WindowManager } from './windowManager';
import type { ModuleRegistry } from '~/lib/ModuleRegistry';

export class WindowManagerModule {
	public static bootstrap(moduleRegistry: ModuleRegistry) {
		const windowManager = new WindowManager();

		moduleRegistry.register('WindowManager', windowManager);
	}
}
