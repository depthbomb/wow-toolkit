import clsx from 'clsx/lite';
import { Timestamp } from '~/components/Timestamp';
import { useDarkmoonFaire } from './hooks/useDarkmoonFaire';

const bannerBaseCss     = 'space-y-4 size-full flex flex-col items-center justify-center bg-[url(/assets/img/darkmoon-faire.webp)] bg-cover bg-center bg-norepeat rounded-xl shadow-lg' as const;
const inactiveBannerCss = 'grayscale-100' as const;

const bannerTextBaseCss     = 'text-[size:7vw] font-serif font-bold tracking-wider text-shadow-lg' as const;
const activeBannerTextCss   = 'text-green-500' as const;
const inactiveBannerTextCss = 'text-white' as const;

export const DmfPage = () => {
	const [isActive, nextDate, endDate, nextDistance, endDistance] = useDarkmoonFaire();

	const bannerCss     = clsx(bannerBaseCss, !isActive && inactiveBannerCss);
	const bannerTextCss = clsx(bannerTextBaseCss, isActive ? activeBannerTextCss : inactiveBannerTextCss);

	return (
		<div className="space-y-4 size-full flex flex-col items-center justify-center">
			<div className={bannerCss} role="banner">
				<h1 className={bannerTextCss}>{isActive ? `Active for ${endDistance}` : `Active in ${nextDistance}`}</h1>
				{isActive ? (
					<Timestamp date={endDate!} dateTemplate="Ends at %"/>
				) : (
					<Timestamp date={nextDate!} dateTemplate="Next Darkmoon Faire at %"/>
				)}
			</div>
		</div>
	);
};

export default DmfPage;
