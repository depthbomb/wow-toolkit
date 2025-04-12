import { useMemo, useState, useEffect } from 'react';
import {
	sub,
	addDays,
	isAfter,
	setHours,
	isBefore,
	setSeconds,
	nextSunday,
	setMinutes,
	startOfMonth,
	formatDistanceToNow
} from 'date-fns';

export function useDarkmoonFaire() {
	const [now, setNow] = useState<Date>(new Date());

	useEffect(() => {
		const intervalId = setInterval(() => setNow(new Date()), 1_000);

		return () => clearInterval(intervalId);
	}, []);

	const startDate = useMemo(() => {
		let firstDayOfMonth = startOfMonth(now);
		let firstSunday = nextSunday(sub(firstDayOfMonth, { days: 1 }));

		if (isAfter(now, addDays(firstSunday, 6)) ||
			(isAfter(now, firstSunday) && isAfter(setHours(now, 23), setHours(addDays(firstSunday, 6), 23)))) {
			firstDayOfMonth = startOfMonth(addDays(firstDayOfMonth, 40));
			firstSunday = nextSunday(sub(firstDayOfMonth, { days: 1 }));
		}

		return firstSunday;
	}, [now]);

	const endDate = useMemo(() => {
		const endDay = addDays(startDate, 6);
		return setSeconds(setMinutes(setHours(endDay, 23), 59), 59);
	}, [startDate]);

	const isActive = useMemo(() => isAfter(now, startDate) && isBefore(now, endDate), [now, startDate, endDate]);

	const endDistance = useMemo(() => formatDistanceToNow(endDate), [endDate]);

	const startDistance = useMemo(() => {
		if (isActive) {
			const firstDayOfNextMonth = startOfMonth(addDays(startOfMonth(now), 40));
			const nextFaireStart = nextSunday(sub(firstDayOfNextMonth, { days: 1 }));
			return formatDistanceToNow(nextFaireStart);
		}

		return formatDistanceToNow(startDate);
	}, [now, startDate, isActive]);

	return [
		isActive,
		startDate,
		endDate,
		startDistance,
		endDistance
	] as const;
}
