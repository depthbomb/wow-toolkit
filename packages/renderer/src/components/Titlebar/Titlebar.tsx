import { useIpc } from '~/hooks';
import { IpcChannel } from 'shared';
import { useState, useEffect } from 'react';
import { TitlebarButton } from './TitlebarButton';
import { SettingsModal } from '~/features/settings/SettingsModal';
import type { FC } from 'react';

import logo from '~/assets/img/logo.svg';
import { AboutModal } from '~/features/about/AboutModal';

export const Titlebar: FC = () => {
	const [isMaximized, setIsMaximized] = useState(false);
	const [,onWindowMaximized]          = useIpc(IpcChannel.Window_Maximize);
	const [,onWindowRestored]           = useIpc(IpcChannel.Window_Restore);

	useEffect(() => {
		onWindowMaximized(() => setIsMaximized(true));
		onWindowRestored(()  => setIsMaximized(false));
	}, []);

	return (
		<div className="w-full h-8 flex items-stretch z-[9002]">
			<div className="ml-2.5 space-x-1.5 flex items-center shrink-0 draggable">
				<img src={logo} className="size-4" width="16" height="16"/>
				<span className="text-sm text-gray-300 font-system">WoW Toolkit <sup className="text-brand-400">&beta;</sup></span>
			</div>
			<div className="w-full h-8 draggable"/>
			<AboutModal/>
			<SettingsModal/>
			<TitlebarButton onClick={() => window.api.minimizeWindow()} action="minimize"/>
			<TitlebarButton onClick={() => isMaximized ? window.api.restoreWindow() : window.api.maximizeWindow()} action={isMaximized ? 'restore' : 'maximize'}/>
			<TitlebarButton onClick={() => window.api.closeWindow()} action="close"/>
		</div>
	);
};
