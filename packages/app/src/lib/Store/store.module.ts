import type { ModuleRegistry } from '~/lib/ModuleRegistry';
import { StoreFactory } from './store.factory';

export class StoreModule {
	public static bootstrap(moduleRegistry: ModuleRegistry) {
		moduleRegistry.register('StoreFactory', new StoreFactory());
	}
}
