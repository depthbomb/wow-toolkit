import clsx from 'clsx';
import { memo, forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';

type TitlebarButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	action: 'close' | 'maximize' | 'restore' | 'minimize';
};

export const TitlebarButton = memo(forwardRef<HTMLButtonElement, TitlebarButtonProps>(({ action, ...props }, ref) => {
	const css = clsx(
		'leading-4 text-center shrink-0 w-[46px] h-8 text-gray-400 hover:text-white',
		{
			'hover:bg-white/25': action !== 'close',
			'hover:bg-[#e81123]': action === 'close'
		}
	);

	return (
		<button ref={ref} className={css} {...props} type="button">
			{action === 'minimize' ? (
				<svg className="inline-block size-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M14 8v1H3V8h11z"/></svg>
			) : action === 'maximize' ? (
				<svg className="inline-block size-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M3 3v10h10V3H3zm9 9H4V4h8v8z"/></svg>
			) : action === 'restore' ? (
				<svg className="inline-block size-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M3 5v9h9V5H3zm8 8H4V6h7v7z"/><path fillRule="evenodd" clipRule="evenodd" d="M5 5h1V4h7v7h-1v1h2V3H5v2z"/></svg>
			) : (
				<svg className="inline-block size-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M7.116 8l-4.558 4.558.884.884L8 8.884l4.558 4.558.884-.884L8.884 8l4.558-4.558-.884-.884L8 7.116 3.442 2.558l-.884.884L7.116 8z"/></svg>
			)}
		</button>
	);
}));
