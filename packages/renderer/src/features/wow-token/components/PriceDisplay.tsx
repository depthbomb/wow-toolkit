import clsx from 'clsx/lite';
import Icon from '@mdi/react';
import { useEffect, useState } from 'react';
import { mdiChevronUp, mdiChevronDown } from '@mdi/js';
import NumberFlow, { NumberFlowGroup } from '@number-flow/react';
import type { FC } from 'react';

type PriceDisplayProps = {
	price: number
	diff: number
}

export const PriceDisplay: FC<PriceDisplayProps> = ({ price, diff }) => {
	const [isPositiveDiff, setIsPositiveDiff] = useState(false);

	useEffect(() => setIsPositiveDiff(diff > 0), [diff])

	return (
		<NumberFlowGroup>
			<div className="flex items-center">
				<NumberFlow
					value={price}
					className="text-yellow-500 text-[size:16vw] font-display font-bold text-shadow-lg"
				/>
				{(diff !== 0 && diff !== price) && (
					<div className="flex items-center">
						<Icon path={isPositiveDiff ? mdiChevronUp : mdiChevronDown} className={clsx('h-12', isPositiveDiff ? 'text-emerald-500' : 'text-red-500')}/>
						<NumberFlow
							value={parseInt(diff.toString().replace('-', ''))}
							className={clsx('text-4xl font-display font-semibold text-shadow', isPositiveDiff ? 'text-emerald-500' : 'text-red-500')}
						/>
					</div>
				)}
			</div>
		</NumberFlowGroup>
	)
};
