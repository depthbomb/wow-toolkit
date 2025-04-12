import { Nullable } from '../types';

export type RealmStatusResponse = {
	data: {
		Realms: Realm[];
	}
};

export type Realm = {
	name: string;
	slug: string;
	locale: string;
	timezone: string;
	online: boolean;
	category: string;
	realmLockStatus: Nullable<RealmLockStatus>;
	type: RealmType;
	population: RealmPopulation;
};

export type RealmLockStatus = {
	isLockedForNewCharacters: boolean;
	isLockedForPct: boolean;
};

export type RealmType = {
	id: string;
	name: string;
	slug: string;
};

export type RealmPopulation = {
	id: string;
	name: string;
	slug: string;
};
