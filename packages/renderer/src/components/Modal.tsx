import clsx from 'clsx/lite';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import { createPortal } from 'react-dom';
import { useId, useState, useEffect, cloneElement } from 'react';
import type { FC, JSX, ReactNode } from 'react';

type ModalProps = {
	title: JSX.Element;
	trigger: JSX.Element;
	canClose?: boolean;
	showCloseIcon?: boolean;
	children: ReactNode;
	footer?: JSX.Element;
	portalId?: string;
};

const overlayBaseCss = 'absolute inset-0 w-full h-full flex items-center justify-center bg-black/50 backdrop-blur-[2px] opacity-0 -z-10 transition-all duration-250' as const;
const contentBaseCss = 'space-y-4 p-4 w-2/3 h-3/4 flex flex-col bg-gray-800 rounded-lg shadow-xl opacity-0 scale-[0.95] transition-all duration-250' as const;

export const Modal: FC<ModalProps> = ({ title, trigger, canClose = true, showCloseIcon = true, children, footer, portalId = 'portal' }) => {
	const key                       = useId();
	const [show, setShow]           = useState(false);
	const [isVisible, setIsVisible] = useState(false);

	const contentCss = clsx(contentBaseCss, isVisible && 'scale-[1] opacity-100');
	const overlayCss = clsx(overlayBaseCss, isVisible && 'opacity-100');

	const triggerElement = cloneElement(trigger, { id: key, onClick: () => setShow(true) });

	const closeModal = () => {
		if (!canClose) {
			return;
		}

		setIsVisible(false);
		setTimeout(() => setShow(false), 250);
	};

	useEffect(() => {
		setTimeout(() => setIsVisible(show));
	}, [show]);

	return (
		<>
			{triggerElement}
			{show && createPortal((
				<div id={`modal-${key}`} className="absolute inset-0 flex items-center justify-center z-[9001]">
					<div className={contentCss}>
						<div className="w-full h-8 flex items-center shrink-0">
							{title}
							{showCloseIcon && canClose && (
								<button onClick={closeModal} className="ml-auto size-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-900 rounded-lg transition-colors" type="button">
									<Icon path={mdiClose} className="size-6"/>
								</button>
							)}
						</div>
						<div className="p-4 size-full bg-gray-900 rounded-lg overflow-y-auto [scrollbar-width:thin]">{children}</div>
						{footer}
					</div>
					<div onClick={closeModal} className={overlayCss}/>
				</div>
			), document.getElementById(portalId)!, key)}
		</>
	);
};
