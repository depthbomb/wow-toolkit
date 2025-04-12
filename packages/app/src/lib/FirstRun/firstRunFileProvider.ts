import { app } from 'electron';
import { join } from 'node:path';

export class FirstRunFileProvider {
	public get firstRunFilePath() {
		return join(app.getPath('userData'), '.first-run');
	}
}
