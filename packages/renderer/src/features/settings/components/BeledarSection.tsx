import { useSetting } from '~/hooks';
import { SettingsKey } from 'shared';
import { Switch } from '~/components/Switch';
import { SettingsSection } from './SettingsSection';

export const BeledarSection = () => {
	const [enableBeledarNotifications, setEnableBeledarNotifications] = useSetting<boolean>(SettingsKey.EnableBeledarNotifications, { defaultValue: false, reactive: false });

	return (
		<SettingsSection title="Beledar">
			<Switch checked={enableBeledarNotifications} defaultChecked={enableBeledarNotifications} onCheckedChange={setEnableBeledarNotifications} label="Notify before dark event starts"/>
		</SettingsSection>
	);
}
