import { useSetting } from '~/hooks';
import { SettingsKey } from 'shared';
import { Select } from '~/components/Input/Select';
import { SettingsSection } from './SettingsSection';
import { ResetRegion } from '~/features/resets/ResetRegion';
import type { ChangeEvent } from 'react';

export const ResetsSection = () => {
	const [resetRegion, setResetRegion] = useSetting<ResetRegion>(SettingsKey.ResetsRegion, { defaultValue: ResetRegion.NA, reactive: false });

	const onRegionChanged = (event: ChangeEvent<HTMLSelectElement>) => setResetRegion(parseInt(event.target.value) as ResetRegion);

	return (
		<SettingsSection title="Resets">
			<fieldset className="space-y-2 flex flex-col w-full">
				<label>Region</label>
				<Select value={resetRegion} onChange={onRegionChanged}>
					<option value={ResetRegion.NA}>US, Latin & Oceanic</option>
					<option value={ResetRegion.EU}>European</option>
				</Select>
			</fieldset>
		</SettingsSection>
	);
}
