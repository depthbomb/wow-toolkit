import { atom } from 'jotai';
import type { Nullable } from 'shared';

const hasCredentialsAtom     = atom<boolean>(false);
const priceAtom              = atom<number>(0);
const lastPriceAtom          = atom<number>(0);
const lastUpdateAtom         = atom<Nullable<Date>>(null);
const lastUpdateDistanceAtom = atom<string>();
const nextUpdateAtom         = atom<Nullable<Date>>(null);
const nextUpdateDistanceAtom = atom<string>();
const errorAtom              = atom<Nullable<string>>(null);

export const wowToken = {
	hasCredentialsAtom,
	priceAtom,
	lastPriceAtom,
	lastUpdateAtom,
	lastUpdateDistanceAtom,
	nextUpdateAtom,
	nextUpdateDistanceAtom,
	errorAtom
};
