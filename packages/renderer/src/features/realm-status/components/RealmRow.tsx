import clsx from 'clsx';
import { memo } from 'react';
import Icon from '@mdi/react';
import { Separator } from 'radix-ui';
import { Tooltip } from '~/components/Tooltip';
import { mdiLock, mdiCheck, mdiClose } from '@mdi/js';
import type { FC } from 'react';
import type { Realm, Nullable, RealmLockStatus } from 'shared';

type RealmRowProps = {
	realm: Realm;
};

const StatusIcon: FC<{ online: boolean; realmLockStatus: Nullable<RealmLockStatus>; }> = memo(({ online, realmLockStatus }) => {
	const css = clsx('size-6 flex items-center justify-center text-white rounded-full shadow', realmLockStatus ? 'bg-orange-500' : online ? 'bg-green-600' : 'bg-red-600');

	return (
		<div className={css}>
			<Icon path={
				realmLockStatus ? (
					mdiLock
				) : online ? mdiCheck : mdiClose
			} className="size-4.5"/>
		</div>
	);
});

const Divider = memo(() => {
	return <Separator.Root orientation="vertical" className="bg-gray-900 data-[orientation=vertical]:h-8 data-[orientation=vertical]:w-[1px] shrink-0"/>
});

export const RealmRow: FC<RealmRowProps> = memo(({ realm }) => {
	const populationCss = clsx(
		'font-bold',
		{
			'text-green-500': realm.population?.slug === 'low',
			'text-yellow-400': realm.population?.slug === 'medium',
			'text-orange-500': realm.population?.slug === 'high',
			'text-red-500': realm.population?.slug === 'full',
			'text-cyan-500': realm.population?.slug === 'new-players',
			'text-gray-500': realm.population === null,
			'text-gray-500 border-b border-dashed cursor-help': !!realm.realmLockStatus
		}
	);

	return (
		<div className="space-x-4 px-4 w-full h-12 flex items-center bg-gray-800 rounded-xl shadow">
			<StatusIcon online={realm.online} realmLockStatus={realm.realmLockStatus}/>
			<p className="mr-auto text-lg font-bold">{realm.name}</p>
			{realm.realmLockStatus !== null ? (
				<Tooltip delay={0} content={
					realm.realmLockStatus.isLockedForNewCharacters ? 'Only players who already have characters on this realm are currently allowed to create characters.' : 'This realm is not accepting character transfers at this time.'
				}>
					<p className={populationCss}>{realm.population?.name ?? 'Offline'}</p>
				</Tooltip>
			) : <p className={populationCss}>{realm.population?.name ?? 'Offline'}</p>}
			<Divider/>
			<p className="w-28">{realm.category}</p>
			<Divider/>
			<p className="w-10">{realm.timezone}</p>
		</div>
	);
});
