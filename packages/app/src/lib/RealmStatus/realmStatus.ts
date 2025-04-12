import { net } from 'electron';
import { GameRegion, GameVersion } from 'shared';
import { GraphQLQueryProvider } from './gqlQueryProvider';
import type { RealmStatusResponse } from 'shared';

export class RealmStatus {
	private readonly gqlQueryProvider: GraphQLQueryProvider;
	private readonly queryMap;

	public constructor() {
		this.gqlQueryProvider = new GraphQLQueryProvider();
		this.queryMap = {
			[GameVersion.Retail]: {
				[GameRegion.UsAndOce]: this.gqlQueryProvider.retailUsAndOce,
				[GameRegion.Europe]: this.gqlQueryProvider.retailEu,
				[GameRegion.Korea]: this.gqlQueryProvider.retailKr,
				[GameRegion.Taiwan]: this.gqlQueryProvider.retailTw,
			},
			[GameVersion.Classic]: {
				[GameRegion.UsAndOce]: this.gqlQueryProvider.classicUsAndOcea,
				[GameRegion.Europe]: this.gqlQueryProvider.classicEu,
				[GameRegion.Korea]: this.gqlQueryProvider.classicKr,
				[GameRegion.Taiwan]: this.gqlQueryProvider.classicTw,
			},
			[GameVersion.ClassicCataclysm]: {
				[GameRegion.UsAndOce]: this.gqlQueryProvider.classicCataUsAndOce,
				[GameRegion.Europe]: this.gqlQueryProvider.classicCataEu,
				[GameRegion.Korea]: this.gqlQueryProvider.classicCataKr,
				[GameRegion.Taiwan]: this.gqlQueryProvider.classicCataTw,
			},
		};
	}

	public async getRealmStatuses(version: GameVersion, region: GameRegion) {
		const query = this.getQuery(version, region);
		const res = await net.fetch('https://worldofwarcraft.blizzard.com/graphql', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'post',
			body: query,
		});

		const { data } = await res.json() as RealmStatusResponse;

		return data.Realms;
	}

	private getQuery(version: GameVersion, region: GameRegion) {
		return this.queryMap[version][region];
	}
}
