import { useMemo, useState, useEffect, useCallback } from 'react';
import { addHours, addMinutes, isWithinInterval, differenceInMinutes, formatDistanceToNowStrict } from 'date-fns';

export const useBeledar = () => {
	const darkEventIntervalHours   = 3 as const;
	const darkEventDurationMinutes = 30 as const;
	const knownDarkEventDate       = new Date('2025-01-07T04:00:00.000Z');
	const [now, setNow]            = useState<Date>(new Date());

	useEffect(() => {
		const intervalId = setInterval(() => setNow(new Date()), 1_000);

		return () => clearInterval(intervalId);
	}, []);

	const getLastDarkEventStart = useCallback(() => {
		const msSinceReference = now.getTime() - knownDarkEventDate.getTime();
		const msInPeriod = darkEventIntervalHours * 60 * 60 * 1000;
		const periods = Math.floor(msSinceReference / msInPeriod);
		const lastEventTime = new Date(knownDarkEventDate.getTime() + (periods * msInPeriod));

		if (lastEventTime > now) {
			return new Date(lastEventTime.getTime() - msInPeriod);
		}

		return lastEventTime;
	}, [now]);

	const isActive = useMemo(() => {
		const lastDarkStart = getLastDarkEventStart();
		const darkEnd = addMinutes(lastDarkStart, darkEventDurationMinutes);

		return isWithinInterval(now, { start: lastDarkStart, end: darkEnd });
	}, [now, getLastDarkEventStart]);

	const nextDarkEventDate = useMemo(() => {
		const lastDarkStart = getLastDarkEventStart();
		const nextDarkStart = addHours(lastDarkStart, darkEventIntervalHours);

		let nextStart: Date;
		if (nextDarkStart > now) {
			nextStart = nextDarkStart;
		} else {
			nextStart = addHours(nextDarkStart, darkEventIntervalHours);
		}

		return nextStart;
	}, [now, getLastDarkEventStart]);

	const nextDarkEventDistance = useMemo(() => {
		return formatDistanceToNowStrict(nextDarkEventDate);
	}, [nextDarkEventDate]);

	const darkEndDate = useMemo(() => {
		if (!isActive) {
			return null;
		}

		return addMinutes(getLastDarkEventStart(), darkEventDurationMinutes);
	}, [isActive, getLastDarkEventStart]);

	const darkEventEndDistance = useMemo(() => {
		if (!darkEndDate) {
			return null;
		}

		return formatDistanceToNowStrict(darkEndDate);
	}, [darkEndDate]);

	const isAboutToStart = useCallback((minutesBefore = 5) => {
		const diffMinutes = differenceInMinutes(nextDarkEventDate, now);
		return diffMinutes <= minutesBefore && diffMinutes > 0;
	}, [nextDarkEventDate, now]);

	return [
		isActive,
		nextDarkEventDate,
		nextDarkEventDistance,
		darkEndDate,
		darkEventEndDistance,
		isAboutToStart,
	] as const;
}
