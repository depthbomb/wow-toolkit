import { memo, forwardRef } from 'react';
import type { AnchorHTMLAttributes } from 'react';

export const Anchor = memo(forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(({ className, ...props }, ref) => {
	return <a ref={ref} {...props} className={`text-brand-500 hover:text-brand-400 active:text-brand-600 ${className}`}>{props.children}</a>
}));
