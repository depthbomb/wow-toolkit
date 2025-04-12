import { typeFlag } from 'type-flag';
import type { ModuleRegistry } from '~/lib/ModuleRegistry';

export class CliModule {
	public static bootstrap(moduleRegistry: ModuleRegistry) {
		const args = typeFlag({
			autostart: {
				type: Boolean,
				default: false
			},
			uninstall: {
				type: Boolean,
				default: false
			}
		}, process.argv);

		moduleRegistry.register('Args', args);
		moduleRegistry.register('Flags', args.flags);
	}
}
