import clsx from 'clsx';
import { useMemo, useState} from 'react';
import type { FC } from 'react';

type TimestampProps = {
	date: Date;
	distance?: string;
	dateTemplate: string;
	distanceTemplate?: string;
};

export const Timestamp: FC<TimestampProps> = ({ date, distance, dateTemplate, distanceTemplate }) => {
	const [showDistance, setShowDistance] = useState(false);
	const dateString                      = useMemo(() => dateTemplate.replace('%', date?.toLocaleString() ?? '...'), [date, dateTemplate]);
	const distanceString                  = useMemo(() => distanceTemplate?.replace('%', distance ?? '...'), [distance, distanceTemplate]);

	const css = clsx('py-1 px-2.5 text-sm bg-gray-900/66 backdrop-blur-sm border border-gray-950 rounded-full shadow', !!distance && 'cursor-pointer');

	return (
		<div onClick={() => setShowDistance(!showDistance)} className={css}>
			<span>{showDistance && distance ? distanceString : dateString}</span>
		</div>
	);
};
