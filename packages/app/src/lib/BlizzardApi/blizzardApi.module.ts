import { BlizzardApi } from './blizzardApi';
import type { ModuleRegistry } from '~/lib/ModuleRegistry';

export class BlizzardApiModule {
	public static bootstrap(moduleRegistry: ModuleRegistry) {
		moduleRegistry.register('BlizzardApi', new BlizzardApi(
			moduleRegistry.get('SettingsManager')
		));
	}
}
