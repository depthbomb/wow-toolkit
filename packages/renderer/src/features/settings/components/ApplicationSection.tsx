import { useSetting } from '~/hooks';
import { SettingsKey } from 'shared';
import { Switch } from '~/components/Switch';
import { SettingsSection } from './SettingsSection'


export const ApplicationSection = () => {
	const [autoStart, setAutoStart]           = useSetting<boolean>(SettingsKey.AutoStart, { reactive: false });
	const [startHidden, setStartHidden]       = useSetting<boolean>(SettingsKey.StartHidden, { reactive: false });
	const [minimizeToTray, setMinimizeToTray] = useSetting<boolean>(SettingsKey.MinimizeToTray, { reactive: false });
	const [closeToTray, setCloseToTray]       = useSetting<boolean>(SettingsKey.CloseToTray, { reactive: false });

	return (
		<SettingsSection title="Application">
			<Switch checked={autoStart} defaultChecked={autoStart} onCheckedChange={setAutoStart} label="Launch on startup"/>
			<Switch checked={startHidden} defaultChecked={startHidden} onCheckedChange={setStartHidden} label="Launch to tray"/>
			<Switch checked={minimizeToTray} defaultChecked={minimizeToTray} onCheckedChange={setMinimizeToTray} label="Minimize to tray"/>
			<Switch checked={closeToTray} defaultChecked={closeToTray} onCheckedChange={setCloseToTray} label="Close to tray"/>
		</SettingsSection>
	);
}
