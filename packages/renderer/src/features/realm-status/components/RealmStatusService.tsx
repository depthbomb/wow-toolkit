import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useSetting } from '~/hooks';
import { realmStatus } from '~/atoms/realmStatus';
import { GameRegion, GameVersion, SettingsKey } from 'shared';

export const RealmStatusService = () => {
	const [,setRealms] = useAtom(realmStatus.realmsAtom);
	const [version]    = useSetting(SettingsKey.DefaultRealmStatusVersion, { defaultValue: GameVersion.Retail });
	const [region]     = useSetting(SettingsKey.DefaultRealmStatusRegion, { defaultValue: GameRegion.UsAndOce });

	const fetchRealmStatuses = () => {
		window.api.getRealmStatuses(version, region).then(setRealms);
	};

	useEffect(() => {
		const timer = setInterval(fetchRealmStatuses, 60_000);

		fetchRealmStatuses();

		return () => clearInterval(timer);
	}, [version, region]);

	return null;
};
