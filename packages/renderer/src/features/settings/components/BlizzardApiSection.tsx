import { useSetting } from '~/hooks';
import { SettingsKey } from 'shared';
import { Anchor } from '~/components/Anchor';
import { TextInput } from '~/components/Input';
import { SettingsSection } from './SettingsSection';
import type { ChangeEvent } from 'react';

export const BlizzardApiSection = () => {
	const [clientId, setClientId]         = useSetting<string>(SettingsKey.ClientId, { reactive: false });
	const [clientSecret, setClientSecret] = useSetting<string>(SettingsKey.ClientSecret, { reactive: false });

	const onClientIdChanged     = (event: ChangeEvent<HTMLInputElement>) => setClientId(event.target.value);
	const onClientSecretChanged = (event: ChangeEvent<HTMLInputElement>) => setClientSecret(event.target.value);

	return (
		<SettingsSection title="Blizzard API">
			<fieldset className="space-y-2 flex flex-col w-full">
				<label htmlFor="">Client ID</label>
				<TextInput value={clientId ?? ''} onChange={onClientIdChanged}/>
				<label htmlFor="">Client Secret</label>
				<TextInput value={clientSecret ?? ''} onChange={onClientSecretChanged}/>
			</fieldset>
			<p>You can get your client ID and secret <Anchor href="https://develop.battle.net/access/" target="_blank">here</Anchor>. Don't share them with anyone!</p>
		</SettingsSection>
	);
}
