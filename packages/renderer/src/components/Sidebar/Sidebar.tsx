import clsx from 'clsx/lite';
import Icon from '@mdi/react';
import { useState } from 'react';
import { SidebarButton } from './SidebarButton';
import { mdiArrowExpandLeft, mdiArrowExpandRight } from '@mdi/js';
import type { FC } from 'react';

import wowTokenImage from '~/assets/img/wow-token.jpg';
import beledarImage from '~/assets/img/beledar.jpg';
import darkmoonFaireImage from '~/assets/img/darkmoon.jpg';
import resetsImage from '~/assets/img/reset.jpg';
import tradingPostImage from '~/assets/img/traders-tender.jpg';
import timeRiftImage from '~/assets/img/time-rift.jpg';
import realmStatusImage from '~/assets/img/status.jpg';

const sidebarBaseCss = 'pb-2 px-2 h-full flex flex-col items-center justify-between shrink-0 transition-all' as const;
const expanderBaseCss = 'flex items-center text-gray-400 hover:text-white hover:bg-gray-900 rounded-lg transition-colors' as const;

export const Sidebar: FC = () => {
	const [expanded, setExpanded] = useState(false);

	const sidebarCss = clsx(
		sidebarBaseCss,
		expanded ? 'w-44' : 'w-18'
	);
	const expanderCss = clsx(
		expanderBaseCss,
		expanded ? 'p-2 w-full h-10 justify-center' : 'size-10 justify-center '
	);

	return (
		<aside className={sidebarCss}>
			<div className="space-y-1 w-full flex flex-col items-center">
				<SidebarButton to="/" label="Token" expandedLabel="WoW Token" icon={wowTokenImage} expanded={expanded}/>
				<SidebarButton to="/beledar" label="Beledar" expandedLabel="Beledar Timer" icon={beledarImage} expanded={expanded}/>
				<SidebarButton to="/dmf" label="DMF" expandedLabel="Darkmoon Faire" icon={darkmoonFaireImage} expanded={expanded}/>
				<SidebarButton to="/resets" label="Resets" expandedLabel="Reset Timer" icon={resetsImage} expanded={expanded}/>
				<SidebarButton to="/trading-post" label="T. Post" expandedLabel="Trading Post" icon={tradingPostImage} expanded={expanded}/>
				<SidebarButton to="/time-rift" label="Time Rift" expandedLabel="Time Rift Timer" icon={timeRiftImage} expanded={expanded}/>
				<SidebarButton to="/realm-status" label="Realms" expandedLabel="Realm Status" icon={realmStatusImage} expanded={expanded}/>
			</div>
			<button onClick={() => setExpanded(!expanded)} className={expanderCss} type="button">
				<Icon path={expanded ? mdiArrowExpandLeft : mdiArrowExpandRight} className="size-4"/>
				{expanded && <span className="ml-2 text-sm">Collapse</span>}
			</button>
		</aside>
	);
};
