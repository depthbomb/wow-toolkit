import clsx from 'clsx/lite';
import { useProbability } from '~/hooks';
import { useTradingPost } from './hooks/useTradingPost';

const bannerBaseCss = 'space-y-4 size-full flex flex-col items-center justify-center  bg-cover bg-center bg-norepeat rounded-xl shadow-lg' as const;

export const TradingPostPage = () => {
	const [,nextMonthDistance,,] = useTradingPost();
	const isHorde                = useProbability(50);

	const bannerCss = clsx(bannerBaseCss, isHorde ? 'text-red-100 bg-[url(/assets/img/trading-post-horde.webp)]' : 'text-blue-100 bg-[url(/assets/img/trading-post-alliance.webp)]')

	return (
		<div className="space-y-4 size-full flex flex-col items-center justify-center">
			<div className={bannerCss} role="banner">
				<h1 className="text-[size:4.3vw] font-serif font-bold tracking-wider text-shadow-lg">Trading Post cycles in {nextMonthDistance}</h1>
			</div>
		</div>
	);
};

export default TradingPostPage;
