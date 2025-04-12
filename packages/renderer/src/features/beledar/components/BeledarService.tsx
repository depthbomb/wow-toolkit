import { useRef, useEffect } from 'react';
import { useBeledar } from '../hooks/useBeledar';
import type { Nullable } from 'shared';

export const BeledarService = () => {
	const [,nextDarkEventDate,,,,isAboutToStart] = useBeledar();
	const notifiedEventRef                       = useRef<Nullable<number>>(null);

	useEffect(() => {
		if (isAboutToStart(5)) {
			const nextEventTime = nextDarkEventDate.getTime();
			if (notifiedEventRef.current !== nextEventTime) {
				window.api.sendBeledarNotification();
				notifiedEventRef.current = nextEventTime;
			}
		} else {
			if (notifiedEventRef.current && new Date().getTime() > notifiedEventRef.current) {
				notifiedEventRef.current = null;
			}
		}
	}, [isAboutToStart, nextDarkEventDate]);

	return null;
};
