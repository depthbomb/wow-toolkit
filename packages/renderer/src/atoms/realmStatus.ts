import { atom } from 'jotai';
import { Realm } from 'shared';

const realmsAtom  = atom<Realm[]>([]);

export const realmStatus = {
	realmsAtom
};
