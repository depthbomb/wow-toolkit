import { atom } from 'jotai';

const showSettingsAtom = atom<boolean>(false);

export const app = {
	showSettingsAtom
};
