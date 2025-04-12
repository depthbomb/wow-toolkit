import { useMemo, useState, useEffect } from 'react';
import {
	addMonths,
	startOfMonth,
	formatDistanceToNow,
} from 'date-fns';

export function useTradingPost() {
	const [now, setNow] = useState<Date>(new Date());

	useEffect(() => {
		const intervalId = setInterval(() => setNow(new Date()), 1_000);

		return () => clearInterval(intervalId);
	}, []);

	const nextMonthInfo = useMemo(() => {
		const nextMonthDate      = startOfMonth(addMonths(now, 1));
		const distance           = formatDistanceToNow(nextMonthDate);
		const millisecondsPerDay = 1000 * 60 * 60 * 24;
		const daysRemaining      = Math.ceil((nextMonthDate.getTime() - now.getTime()) / millisecondsPerDay);

		return [
			nextMonthDate,
			distance,
			daysRemaining
		] as const;
	}, [now]);

	return nextMonthInfo;
}
