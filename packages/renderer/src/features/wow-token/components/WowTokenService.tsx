import { useAtom } from 'jotai';
import { useCallback, useEffect } from 'react';
import { wowToken } from '~/atoms/wowToken';
import { useIpc, useSetting } from '~/hooks';
import { IpcChannel, SettingsKey } from 'shared';

export const WowTokenService = () => {
	const [,setHasCredentials]     = useAtom(wowToken.hasCredentialsAtom);
	const [,setPrice]              = useAtom(wowToken.priceAtom);
	const [,setLastPrice]          = useAtom(wowToken.lastPriceAtom);
	const [,setLastUpdate]         = useAtom(wowToken.lastUpdateAtom);
	const [,setLastUpdateDistance] = useAtom(wowToken.lastUpdateDistanceAtom);
	const [,setNextUpdate]         = useAtom(wowToken.nextUpdateAtom);
	const [,setNextUpdateDistance] = useAtom(wowToken.nextUpdateDistanceAtom);
	const [,setError]              = useAtom(wowToken.errorAtom);
	const [onWowTokenError]        = useIpc(IpcChannel.WowToken_Error);
	const [clientId]               = useSetting<string>(SettingsKey.ClientId, { defaultValue: '' });
	const [clientSecret]           = useSetting<string>(SettingsKey.ClientSecret, { defaultValue: '' });

	const fetchWowTokenInfo = useCallback(async () => {
		const hasCreds = await window.api.getHasWowTokenCredentials();

		setHasCredentials(hasCreds);

		if (hasCreds) {
			const res = await window.api.getWowTokenInfo();
			if (res) {
				setError(null);
				setPrice(res.price);
				setLastPrice(res.lastPrice);
				setLastUpdate(res.lastUpdated);
				setLastUpdateDistance(res.lastUpdatedDistance);
				setNextUpdate(res.nextUpdate);
				setNextUpdateDistance(res.nextUpdatedDistance);
			}
		}
	}, []);

	useEffect(() => {
		const timer = setInterval(fetchWowTokenInfo, 15_000);

		/**
		 * Unlike other service components using a timer, we don't immediately call the timer
		 * callback since the effect below calls it when settings are retrieved.
		 */

		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		if (clientId.length === 32 && clientSecret.length === 32) {
			fetchWowTokenInfo().catch(console.error);
		}
	}, [clientId, clientSecret]);

	useEffect(() => onWowTokenError((err: string) => setError(err)), []);

	return null;
};
