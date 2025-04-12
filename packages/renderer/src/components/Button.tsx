import clsx from 'clsx';
import { memo, forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
	variant?: 'normal' | 'brand' | 'success' | 'info' | 'warning' | 'danger';
	style?: 'pill';
	size?: 'sm' | 'lg' | 'xl';
};

const baseCss = 'flex items-center justify-center shrink-0 border transition-colors' as const;

export const Button = memo(forwardRef<HTMLButtonElement, ButtonProps>(({ variant, style, size, className, ...props }, ref) => {
	const css = clsx(
		baseCss,
		{
			// Variant classes
			'text-white bg-gray-700 hover:bg-gray-800 active:bg-gray-900 border-gray-600': variant === 'normal' || !variant,
			'text-brand-950 bg-brand-500 hover:bg-brand-600 active:bg-brand-700 border-brand-600': variant === 'brand',
			'text-green-50 bg-green-500 hover:bg-green-600 active:bg-green-700 border-green-600': variant === 'success',
			'text-cyan-950 bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 border-cyan-600': variant === 'info',
			'text-orange-50 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 border-orange-600': variant === 'warning',
			'text-red-100 bg-red-500 hover:bg-red-600 active:bg-red-700 border-red-600': variant === 'danger',
			// Style classes
			'rounded-full!': style === 'pill',
			// Size classes
			'px-2 space-x-1 h-6 text-xs rounded-sm': size === 'sm',
			'px-2.5 space-x-1 text-sm h-7.5 rounded': !size,
			'px-3 space-x-1.5 h-8 rounded-md': size === 'lg',
			'px-4 space-x-1.5 h-9.5 text-xl rounded-lg': size === 'xl',
			// Other
			'opacity-50 cursor-not-allowed!': props.disabled,
			'cursor-pointer': !props.disabled,
		},
		className
	);

	return (
		<button
			ref={ref}
			className={css}
			{...props}
			type="button"
		>{props.children}</button>
	);
}));
