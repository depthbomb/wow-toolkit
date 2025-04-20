import Icon from '@mdi/react';
import { mdiCog } from '@mdi/js';
import { Separator } from 'radix-ui';
import { Modal } from '~/components/Modal';
import { Anchor } from '~/components/Anchor';
import { ResetsSection } from './components/ResetsSection';
import { BeledarSection } from './components/BeledarSection';
import { WowTokenSection } from './components/WowTokenSection';
import { ApplicationSection } from './components/ApplicationSection';
import { BlizzardApiSection } from './components/BlizzardApiSection';
import type { FC } from 'react';

const Hr = () => <Separator.Root className="my-6 bg-gray-700 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full"/>;

export const SettingsModal: FC = () => {
	return (
		<Modal title={
			<div className="space-x-1 flex items-center text-gray-400">
				<Icon path={mdiCog} className="size-5"/>
				<span className="text-xl font-bold">Settings</span>
			</div>
		} trigger={
			<button className="w-[46px] h-8 flex items-center justify-center text-gray-400 hover:text-white" type="button">
				<Icon path={mdiCog} className="size-4"/>
			</button>
		}>
			<div className="space-y-4 flex flex-col">
				<ApplicationSection/>

				<BlizzardApiSection/>
				<Hr/>
				<WowTokenSection/>
				<Hr/>
				<BeledarSection/>
				<Hr/>
				<ResetsSection/>
				<Hr/>
				<Anchor onClick={window.api.openSettingsFile} className="text-sm cursor-pointer">Open settings file</Anchor>
			</div>
		</Modal>
	)
};
