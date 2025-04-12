import Icon from '@mdi/react';
import { useAtom } from 'jotai';
import { useSetting } from '~/hooks';
import { Button } from '~/components/Button';
import { TextInput } from '~/components/Input';
import { Spinner } from '~/components/Spinner';
import { RealmRow } from './components/RealmRow';
import { realmStatus } from '~/atoms/realmStatus';
import { Select } from '~/components/Input/Select';
import { useMemo, useState, useEffect } from 'react';
import { GameRegion, GameVersion, SettingsKey } from 'shared';
import { mdiChevronLeft, mdiChevronRight, mdiChevronDoubleLeft, mdiChevronDoubleRight } from '@mdi/js';
import type { ChangeEvent } from 'react';

const getVersionName = (version: GameVersion) => {
	switch (version) {
		case GameVersion.Retail:
			return 'Retail';
		case GameVersion.Classic:
			return 'Classic';
		case GameVersion.ClassicCataclysm:
			return 'Cataclysm Classic';
	}
};

const getRegionName = (region: GameRegion) => {
	switch (region) {
		case GameRegion.UsAndOce:
			return 'US and Oceanic';
		case GameRegion.Europe:
			return 'Europe';
		case GameRegion.Korea:
			return 'Korea';
		case GameRegion.Taiwan:
			return 'Taiwan';
	}
};

const itemsPerPage = 25 as const;

export const RealmStatusPage = () => {
	const [loading, setLoading]                 = useState(true);
	const [inputValue, setInputValue]           = useState('');
	const [realmNameFilter, setRealmNameFilter] = useState('');
	const [realms]                              = useAtom(realmStatus.realmsAtom);
	const [version, setVersion]                 = useSetting<GameVersion>(SettingsKey.DefaultRealmStatusVersion, { reactive: false });
	const [region, setRegion]                   = useSetting<GameRegion>(SettingsKey.DefaultRealmStatusRegion, { reactive: false });
	const [currentPage, setCurrentPage]         = useState(1);

	const onFilterChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value.trim();
		setInputValue(newValue);
		setCurrentPage(1);

		setRealmNameFilter(newValue.toLowerCase());
	};
	const onVersionChanged = (event: ChangeEvent<HTMLSelectElement>) => {
		setLoading(true);
		setVersion(parseInt(event.target.value));
	};
	const onRegionChanged = (event: ChangeEvent<HTMLSelectElement>) => {
		setLoading(true);
		setRegion(parseInt(event.target.value));
	};

	const filteredRealms = useMemo(() => {
		return realms.filter(realm => realm.name.toLowerCase().includes(realmNameFilter.toLowerCase()));
	}, [realms, realmNameFilter]);

	const totalPages = Math.max(1, Math.ceil(filteredRealms.length / itemsPerPage));

	if (currentPage > totalPages) {
		setCurrentPage(totalPages);
	}

	const paginatedRealms = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		return filteredRealms.slice(startIndex, startIndex + itemsPerPage);
	}, [filteredRealms, currentPage, itemsPerPage]);

	const goToPage = (page: number) => {
		const newPage = Math.max(1, Math.min(page, totalPages));
		if (newPage !== currentPage) {
			setCurrentPage(newPage);
		}
	};

	useEffect(() => {
		if (loading) {
			setLoading(false);
		}
	}, [realms]);

	return (
		<div className="flex flex-col">
			<h1 className="text-2xl font-display"><strong>{getVersionName(version)}</strong> realm statuses for <strong>{getRegionName(region)}</strong></h1>

			<div className="my-4 space-x-2 flex items-center">
				<Select value={version} onChange={onVersionChanged}>
					<option value={GameVersion.Retail}>Retail</option>
					<option value={GameVersion.Classic}>Classic</option>
					<option value={GameVersion.ClassicCataclysm}>Cataclysm Classic</option>
				</Select>
				<Select value={region} onChange={onRegionChanged}>
					<option value={GameRegion.UsAndOce}>US &amp; Oceanic</option>
					<option value={GameRegion.Europe}>Europe</option>
					<option value={GameRegion.Korea}>Korea</option>
					<option value={GameRegion.Taiwan}>Taiwan</option>
				</Select>
				<TextInput value={inputValue} onChange={onFilterChanged} placeholder="Filter by name" />
			</div>

			{loading ? (
				<div className="space-y-2 h-full flex flex-col items-center justify-center">
					<Spinner className="size-8"/>
					<p className="font-display text-lg">Fetching&hellip;</p>
				</div>
			) : filteredRealms.length === 0 ? (
				<div className="space-y-3 h-full flex flex-col items-center justify-center">
					<p className="font-bold text-gray-500 text-4xl">¯\_(ツ)_/¯</p>
					<p className="font-display text-gray-500 text-xl font-bold">No results</p>
				</div>
			) : (
				<div className="space-y-2 flex flex-col">
					{realms.length > 0 ? (
						paginatedRealms.map(realm => <RealmRow key={realm.slug} realm={realm}/>)
					) : (
						<p className="text-2xl font-bold">Loading realms list&hellip;</p>
					)}
				</div>
			)}

			{!loading && realms.length > itemsPerPage && filteredRealms.length > 0 && (
				<div className="mt-6 flex items-center justify-between">
					<p className="text-sm">Showing <code>{paginatedRealms.length}</code> of <code>{filteredRealms.length}</code> realms</p>
					<div className="flex items-center gap-2">
						<Button onClick={() => goToPage(1)} disabled={currentPage === 1}>
							<Icon path={mdiChevronDoubleLeft} className="size-5"/>
						</Button>
						<Button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
						<Icon path={mdiChevronLeft} className="size-5"/>
						</Button>
						<p className="mx-4 text-sm">Page <code>{currentPage}</code> of <code>{totalPages}</code></p>
						<Button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
						<Icon path={mdiChevronRight} className="size-5"/>
						</Button>
						<Button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages}>
							<Icon path={mdiChevronDoubleRight} className="size-5"/>
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default RealmStatusPage;
