import Icon from '@mdi/react';
import { useAtom } from 'jotai';
import { mdiAlertRhombus } from '@mdi/js';
import { wowToken } from '~/atoms/wowToken';
import { useState, useEffect } from 'react';
import { Spinner } from '~/components/Spinner';
import { Timestamp } from '~/components/Timestamp';
import { PriceDisplay } from './components/PriceDisplay';

export const WowTokenPage = () => {
	const [ready, setReady]         = useState(false);
	const [priceDiff, setPriceDiff] = useState(0);
	const [hasCredentials]          = useAtom(wowToken.hasCredentialsAtom);
	const [price]                   = useAtom(wowToken.priceAtom);
	const [lastPrice]               = useAtom(wowToken.lastPriceAtom);
	const [lastUpdated]             = useAtom(wowToken.lastUpdateAtom);
	const [lastUpdatedDistance]     = useAtom(wowToken.lastUpdateDistanceAtom);
	const [nextUpdated]             = useAtom(wowToken.nextUpdateAtom);
	const [nextUpdatedDistance]     = useAtom(wowToken.nextUpdateDistanceAtom);
	const [error]                   = useAtom(wowToken.errorAtom);

	useEffect(() => setReady(true), []);

	useEffect(() => setPriceDiff(price - lastPrice), [price]);

	if (!ready) {
		return (
			<div className="space-y-4 size-full flex flex-col items-center justify-center">
				<Spinner className="size-32"/>
				<p>One moment&hellip;</p>
			</div>
		);
	}

	if (error !== null) {
		return (
			<div className="space-y-2 size-full flex flex-col items-center justify-center">
				<Icon path={mdiAlertRhombus} className="size-36 text-red-900"/>
				<p className="text-red-200 text-2xl font-bold">{error}</p>
			</div>
		);
	}

	return hasCredentials ? (
		<div className="space-y-3 size-full flex flex-col items-center justify-center">
			<PriceDisplay price={price} diff={priceDiff}/>
			<div className="space-x-4 flex items-center">
				<Timestamp date={lastUpdated!} distance={lastUpdatedDistance} dateTemplate="Updated %" distanceTemplate="Updated % ago"/>
				<Timestamp date={nextUpdated!} distance={nextUpdatedDistance} dateTemplate="Next update at %" distanceTemplate="Next update in %"/>
			</div>
		</div>
	) : (
		<div className="space-y-2 size-full flex flex-col items-center justify-center">
			<Icon path={mdiAlertRhombus} className="size-36 text-red-900"/>
			<p className="text-red-200 text-2xl font-bold">Blizzard API credentials required</p>
			<p className="text-red-200">Please enter your credentials in application settings.</p>
		</div>
	);
};
