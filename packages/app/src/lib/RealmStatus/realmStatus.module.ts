import { IpcChannel } from 'shared';
import { RealmStatus } from './realmStatus';
import type { GameRegion, GameVersion } from 'shared';
import type { ModuleRegistry } from '~/lib/ModuleRegistry';

export class RealmStatusModule {
	public static bootstrap(moduleRegistry: ModuleRegistry) {
		const ipc         = moduleRegistry.get('Ipc');
		const realmStatus = new RealmStatus();

		ipc.registerHandler(IpcChannel.RealmStatus_Statuses,
			async (_, version: GameVersion, game: GameRegion) => await realmStatus.getRealmStatuses(version, game)
		);
	}
}
