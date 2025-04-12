import type { Currency } from './types';

export function expandGoldPrice(value: number): Currency {
	if (!Number.isInteger(value) || value < 0) {
		throw new Error('Input value must be a non-negative integer.');
	}

	const gold = (value / 10000) | 0;
	const remainingAfterGold = value % 10000;
	const silver = Math.floor(remainingAfterGold / 100);
	const copper = remainingAfterGold % 100;

	return { gold, silver, copper } as const;
}
