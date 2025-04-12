import clsx from 'clsx/lite';
import Icon from '@mdi/react';
import { mdiAlertRhombus } from '@mdi/js';
import { useState, useEffect } from 'react';
import { useBeledar } from './hooks/useBeledar';
import { Timestamp } from '~/components/Timestamp';

const bannerBaseCss       = 'space-y-4 size-full flex flex-col items-center justify-center bg-cover bg-center bg-norepeat rounded-xl shadow-lg overflow-hidden' as const;
const activeBannerCss     = 'bg-[url(/assets/img/beledar-dark.webp)]' as const;
const inactiveBannerCss   = 'bg-[url(/assets/img/beledar-light.webp)]' as const;

const bannerTextBaseCss     = 'text-[size:5vw] font-serif font-bold tracking-wider text-shadow-lg' as const;
const activeBannerTextCss   = 'text-purple-100' as const;
const inactiveBannerTextCss = 'text-yellow-900' as const;

export const BeledarPage = () => {
	const [isActive, nextDate, nextDistance, endDate, endDistance] = useBeledar();

	const [isLate, setIsLate] = useState(false);

	const bannerCss     = clsx(bannerBaseCss, isActive ? activeBannerCss : inactiveBannerCss);
	const bannerTextCss = clsx(bannerTextBaseCss, isActive ? activeBannerTextCss : inactiveBannerTextCss);

	useEffect(() => {
		const checkTime = () => setIsLate(isActive && new Date().getMinutes() >= 7);

		checkTime();

		const intervalId = setInterval(checkTime, 1_000);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<div className="space-y-4 size-full flex flex-col">
			<div className={bannerCss} role="banner">
				{isLate && (
					<p className="space-x-1 py-1 px-2.5 flex items-center text-sm text-red-50 bg-red-900/50 backdrop-blur-sm rounded-full border border-red-500 shadow-lg">
						<Icon path={mdiAlertRhombus} className="size-4"/>
						<span>Beledar's Spawn is likely dead by now!</span>
					</p>
				)}
				<h1 className={bannerTextCss}>{isActive ? `Light active in ${endDistance}` : `Light active for ${nextDistance}`}</h1>
				{isActive ? (
					<Timestamp date={endDate!} dateTemplate="Dark event ends at %"/>
				) : (
					<Timestamp date={nextDate!} dateTemplate="Dark event starts at %"/>
				)}
			</div>
		</div>
	);
};

export default BeledarPage;
