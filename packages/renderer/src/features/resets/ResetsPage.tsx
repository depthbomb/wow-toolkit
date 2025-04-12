import { useSetting } from '~/hooks';
import { SettingsKey } from 'shared';
import { ResetRegion } from './ResetRegion';
import { useState, useEffect } from 'react';
import { useResets } from './hooks/useResets';

export const ResetsPage = () => {
	const [isAlmostWeekly, setIsAlmostWeekly] = useState(false);
	const [useDates, setUseDates]             = useState(false);
	const [resetRegion]                       = useSetting<ResetRegion>(SettingsKey.ResetsRegion, { defaultValue: ResetRegion.NA });
	const [,,,,getResetsForRegion,,]          = useResets();

	const resets = getResetsForRegion(resetRegion);

	useEffect(() => setIsAlmostWeekly(resets.dailyDistance === resets.weeklyDistance), [resets]);

	return (
		<div onClick={() => setUseDates(!useDates)} className="space-y-4 size-full flex flex-col items-center justify-center cursor-pointer">
			{isAlmostWeekly ? (
				<p className="text-[size:3.25vw] font-serif tracking-wider">Weekly and daily reset for {resetRegion === ResetRegion.NA ? 'NA' : 'EU'} realms happens {useDates ? 'at' : 'in'}</p>
			) : (
				<p className="text-[size:4.25vw] font-serif tracking-wider">Daily reset for {resetRegion === ResetRegion.NA ? 'NA' : 'EU'} realms happens {useDates ? 'at' : 'in'}</p>
			)}

			<h1 className="text-[size:6vw] font-serif font-bold tracking-wider text-shadow-lg">{useDates ? resets.dailyDate?.toLocaleString() : resets.dailyDistance}</h1>
			{!isAlmostWeekly && <p className="text-[size:2vw] font-serif tracking-wider text-shadow">and weekly reset happens {useDates ? 'at' : 'in'} {useDates ? resets.weeklyDate?.toLocaleString() : resets.weeklyDistance}</p>}
		</div>
	);
};

export default ResetsPage;
