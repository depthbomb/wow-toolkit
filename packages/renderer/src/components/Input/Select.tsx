import clsx from 'clsx';
import { baseCss } from '.';
import { forwardRef } from 'react';
import type { SelectHTMLAttributes } from 'react';

type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ className, children, ...props }, ref) => {
	const css = clsx(baseCss, className);

	return (
		<select ref={ref} className={css} {...props}>
			{children}
		</select>
	);
});
