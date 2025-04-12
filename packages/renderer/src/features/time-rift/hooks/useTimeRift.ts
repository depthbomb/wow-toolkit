import { useState, useEffect } from 'react';
import { isBefore, addHours, addMinutes, startOfHour, formatDistanceStrict } from 'date-fns';

export function useTimeRift() {
	const [isActive, setIsActive]           = useState(false);
	const [timeRemaining, setTimeRemaining] = useState('');

	useEffect(() => {
		const updateTimer = () => {
			const now = new Date();
			const currentHourStart = startOfHour(now);
			const eventEnd = addMinutes(currentHourStart, 15);

			if (isBefore(now, eventEnd)) {
				setIsActive(true);
				setTimeRemaining(formatDistanceStrict(now, eventEnd));
			} else {
				const nextEvent = addHours(currentHourStart, 1);
				setIsActive(false);
				setTimeRemaining(formatDistanceStrict(now, nextEvent));
			}
		};

		updateTimer();

		const interval = setInterval(updateTimer, 1_000);

		return () => clearInterval(interval);
	}, []);

	return [isActive, timeRemaining] as const;
}
