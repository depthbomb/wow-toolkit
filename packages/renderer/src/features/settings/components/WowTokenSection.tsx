import { useSetting } from '~/hooks';
import { SettingsKey } from 'shared';
import { Switch } from '~/components/Switch';
import { SettingsSection } from './SettingsSection';

export const WowTokenSection = () => {
	const [enableWowTokenNotifications, setEnableWowTokenNotifications] = useSetting<boolean>(SettingsKey.EnableWowTokenNotifications, { defaultValue: false, reactive: false });

	return (
		<SettingsSection title="WoW Token">
			<Switch checked={enableWowTokenNotifications} defaultChecked={enableWowTokenNotifications} onCheckedChange={setEnableWowTokenNotifications} label="Notify when price is updated"/>
		</SettingsSection>
	);
}
