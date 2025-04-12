import { ResetRegion } from '../ResetRegion';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { nextDay, addDays, setHours, isBefore, setMinutes, setSeconds, setMilliseconds, formatDistanceToNow } from 'date-fns';
import type { Day } from 'date-fns';

interface ResetInfo {
	dailyDate: Date;
	dailyDistance: string;
	weeklyDate: Date;
	weeklyDistance: string;
}

export function useResets() {
	const [now, setNow] = useState<Date>(new Date());

	useEffect(() => {
		const intervalId = setInterval(() => {
			setNow(new Date());
		}, 1_000);

		return () => clearInterval(intervalId);
	}, []);

	const resetTimes = useMemo(() => ({
		[ResetRegion.NA]: { hours: 15, minutes: 0 }, // UTC times
		[ResetRegion.EU]: { hours: 4, minutes: 0 },
	}), []);

	const weeklyResetDays = useMemo(() => ({
		[ResetRegion.NA]: 2 as Day, // Tuesday
		[ResetRegion.EU]: 3 as Day, // Wednesday
	}), []);

	const getUTCDate = useCallback((localDate: Date): Date => {
		return new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60_000);
	}, []);

	const getLocalFromUTC = useCallback((utcDate: Date): Date => {
		return new Date(utcDate.getTime() - new Date().getTimezoneOffset() * 60_000);
	}, []);

	const getNextDailyReset = useCallback((region: ResetRegion): Date => {
		const resetTime = resetTimes[region];

		let resetDate = setMilliseconds(
			setSeconds(
				setMinutes(
					setHours(getUTCDate(now), resetTime.hours),
					resetTime.minutes
				), 0
			), 0
		);

		resetDate = getLocalFromUTC(resetDate);

		if (isBefore(resetDate, now)) {
			resetDate = addDays(resetDate, 1);
		}

		return resetDate;
	}, [now, resetTimes, getUTCDate, getLocalFromUTC]);

	const getNextDailyResetDistance = useCallback((region: ResetRegion): string => {
		return formatDistanceToNow(getNextDailyReset(region));
	}, [getNextDailyReset]);

	const getNextWeeklyReset = useCallback((region: ResetRegion): Date => {
		const resetTime = resetTimes[region];
		const resetDay = weeklyResetDays[region];

		let resetDate = nextDay(now, resetDay);
		resetDate = getUTCDate(resetDate);
		resetDate = setMilliseconds(
			setSeconds(
				setMinutes(
					setHours(resetDate, resetTime.hours),
					resetTime.minutes
				), 0
			), 0
		);
		resetDate = getLocalFromUTC(resetDate);

		if (isBefore(resetDate, now)) {
			resetDate = addDays(resetDate, 7);
		}

		return resetDate;
	}, [now, resetTimes, weeklyResetDays, getUTCDate, getLocalFromUTC]);

	const getNextWeeklyResetDistance = useCallback((region: ResetRegion): string => {
		return formatDistanceToNow(getNextWeeklyReset(region));
	}, [getNextWeeklyReset]);

	const getResetsForRegion = useCallback((region: ResetRegion): ResetInfo => {
		return {
			dailyDate: getNextDailyReset(region),
			dailyDistance: getNextDailyResetDistance(region),
			weeklyDate: getNextWeeklyReset(region),
			weeklyDistance: getNextWeeklyResetDistance(region)
		};
	}, [getNextDailyReset, getNextDailyResetDistance, getNextWeeklyReset, getNextWeeklyResetDistance]);

	const naResets = useMemo(() => getResetsForRegion(ResetRegion.NA), [getResetsForRegion]);

	const euResets = useMemo(() => getResetsForRegion(ResetRegion.EU), [getResetsForRegion]);

	return [
		getNextDailyReset,
		getNextDailyResetDistance,
		getNextWeeklyReset,
		getNextWeeklyResetDistance,
		getResetsForRegion,
		naResets,
		euResets
	] as const;
}
