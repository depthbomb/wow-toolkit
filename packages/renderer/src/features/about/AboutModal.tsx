import Icon from '@mdi/react';
import { product } from 'shared';
import { Modal } from '~/components/Modal';
import { Anchor } from '~/components/Anchor';
import { mdiInformationSlabCircleOutline } from '@mdi/js';
import type { FC } from 'react';

export const AboutModal: FC = () => {
	return (
		<Modal title={
			<div className="space-x-1 flex items-center text-gray-400">
				<Icon path={mdiInformationSlabCircleOutline} className="size-5"/>
				<span className="text-xl font-bold">About WoW Toolkit</span>
			</div>
		} trigger={
			<button className="w-[46px] h-8 flex items-center justify-center text-gray-400 hover:text-white" type="button">
				<Icon path={mdiInformationSlabCircleOutline} className="size-4"/>
			</button>
		}>
			<h3 className="mb-4 text-lg"><strong>{product.description}</strong> version <code>{product.version}</code> by <Anchor href="https://github.com/depthbomb" target="_blank">depthbomb</Anchor></h3>
			<ul>
				<li>Electron v{window.versions.electron}</li>
				<li>Node.js v{window.versions.node}</li>
				<li>Chromium v{window.versions.chrome}</li>
				<li><Anchor href={product.repoURL} target="_blank">GitHub Repository</Anchor></li>
			</ul>
		</Modal>
	)
};
