import clsx from 'clsx';
import { baseCss } from '.';
import { memo, forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

export const TextInput = memo(forwardRef<HTMLInputElement, TextInputProps>(({ className, ...props }, ref) => {
	const css = clsx(baseCss, 'read-only:text-gray-400', 'read-only:cursor-default', className);

	return (
		<input ref={ref} className={css} {...props}/>
	);
}));
