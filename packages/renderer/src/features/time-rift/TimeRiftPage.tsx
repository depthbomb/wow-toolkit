import { useTimeRift } from './hooks/useTimeRift';

export const TimeRiftPage = () => {
	const [isActive, timeRemaining] = useTimeRift();

	return (
		<div className="space-y-4 size-full flex flex-col items-center justify-center">
			<div className="space-y-4 size-full flex flex-col items-center justify-center bg-[url(/assets/img/time-rift.webp)] bg-cover bg-center bg-norepeat rounded-xl shadow-lg" role="banner">
				<h1 className="text-[size:5vw] font-serif font-bold tracking-wider text-shadow-lg">Time Rift {isActive ? 'ends' : 'starts'} in {timeRemaining}</h1>
			</div>
		</div>
	);
};

export default TimeRiftPage;
