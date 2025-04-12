import type { FC, PropsWithChildren } from 'react';

type SettingsSectionProps = PropsWithChildren & {
	title: string;
};

export const SettingsSection: FC<SettingsSectionProps> = ({ title, children }) => {
	return (
		<div className="space-y-4 flex flex-col">
			<h3 className="text-2xl">{title}</h3>
			{children}
		</div>
	);
}
