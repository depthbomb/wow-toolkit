import { app } from 'electron';
import { join } from 'node:path';

export class SettingsFileProvider {
	public get settingsFilePath() {
		return join(app.getPath('userData'), `wtk.${import.meta.env.MODE}.cfg`);
	}
}
