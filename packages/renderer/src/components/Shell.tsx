import { Sidebar } from './Sidebar';
import { Titlebar } from './Titlebar';
import type { FC, PropsWithChildren } from 'react';

export const Shell: FC<PropsWithChildren> = ({ children }) => {
	return (
		<main className="w-screen h-screen flex flex-col bg-gray-800 border border-gray-950">
			<Titlebar/>
			<div className="relative flex">
				<div id="portal"/>
				<Sidebar/>
				<div id="shell-content" className="relative p-4 w-full h-[calc(100vh_-_var(--spacing)_*_8_-2px)] bg-[url(/assets/img/bg.webp)] bg-cover bg-center bg-gray-900 rounded-tl-xl overflow-y-auto overflow-x-hidden [scrollbar-width:thin]">{children}</div>
			</div>
		</main>
	);
};
