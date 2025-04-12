import Icon from '@mdi/react';
import { mdiCog } from '@mdi/js';
import { Modal } from '~/components/Modal';
import { Anchor } from '~/components/Anchor';
import { Separator } from '@radix-ui/react-separator';
import { ResetsSection } from './components/ResetsSection';
import { BeledarSection } from './components/BeledarSection';
import { WowTokenSection } from './components/WowTokenSection';
import { ApplicationSection } from './components/ApplicationSection';
import { BlizzardApiSection } from './components/BlizzardApiSection';
import type { FC } from 'react';

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
				<Separator className="my-6 bg-gray-700 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full"/>
				<BlizzardApiSection/>
				<Separator className="my-6 bg-gray-700 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full"/>
				<WowTokenSection/>
				<Separator className="my-6 bg-gray-700 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full"/>
				<BeledarSection/>
				<Separator className="my-6 bg-gray-700 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full"/>
				<ResetsSection/>
				<Separator className="my-6 bg-gray-700 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full"/>
				<Anchor onClick={window.api.openSettingsFile} className="text-sm cursor-pointer">Open settings file</Anchor>
			</div>
		</Modal>
	)
};
