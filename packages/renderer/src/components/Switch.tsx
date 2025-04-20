import { Switch as SwitchPrimitive } from 'radix-ui';
import type { FC } from 'react';

type SwitchProps = SwitchPrimitive.SwitchProps & {
	label?: string;
};

export const Switch: FC<SwitchProps> = ({ label, checked, ...props }) => {
	return (
		<div className="space-x-3 flex items-center">
			<SwitchPrimitive.Root checked={checked} className="relative h-6 w-12 cursor-default rounded-full bg-red-600 outline-none data-[state=checked]:bg-brand-400 transition-colors" {...props}>
				<SwitchPrimitive.Thumb className="block size-5 translate-x-0.5 rounded-full bg-white transition-transform will-change-transform data-[state=checked]:translate-x-6.5" />
			</SwitchPrimitive.Root>
			{label && <span>{label}</span>}
		</div>
	);
};
