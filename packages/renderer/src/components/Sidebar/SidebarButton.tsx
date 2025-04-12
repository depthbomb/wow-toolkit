import clsx from 'clsx/lite';
import { NavLink } from 'react-router';
import type { FC } from 'react';

type SidebarButtonProps = {
	to: string;
	label: string;
	expandedLabel: string;
	icon: string;
	expanded?: boolean;
};

const baseCss     = 'flex items-center text-gray-300 hover:text-white hover:bg-gray-900 rounded-xl transition-colors' as const;
const initialCss  = 'space-y-1 size-14 flex-col justify-center' as const;
const expandedCss = 'space-x-2 p-2 w-full flex-row text-nowrap' as const;

export const SidebarButton: FC<SidebarButtonProps> = ({ to, label, expandedLabel, icon, expanded }) => {
	const css = clsx(baseCss, expanded ? expandedCss : initialCss);

	return (
		<NavLink to={to} className={({ isActive }) => (isActive ? clsx(css, 'text-white font-bold bg-gray-950!') : css)}>
			<img src={icon} className="size-7 rounded-full"/>
			<span className={expanded ? 'text-sm' : 'text-[size:11px]'}>{expanded ? expandedLabel : label}</span>
		</NavLink>
	);
};
