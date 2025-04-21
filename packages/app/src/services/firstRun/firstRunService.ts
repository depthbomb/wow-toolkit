import { join } from 'node:path';
import { fileExists } from '~/utils';
import { app, dialog } from 'electron';
import { writeFile } from 'node:fs/promises';
import { injectable } from '@needle-di/core';

@injectable()
export class FirstRunService {
	private readonly firstRunFilePath: string;

	public constructor() {
		this.firstRunFilePath = join(app.getPath('userData'), '.first-run');
	}

	public async performFirstRunTasks() {
		const isFirstRun = await this.isFirstRun();
		if (!isFirstRun) {
			return;
		}

		await this.showDisclaimerDialog();
	}

	public async isFirstRun(dry = false) {
		const exists = await fileExists(this.firstRunFilePath);

		if (!dry) {
			await writeFile(this.firstRunFilePath, 'Lok\'Tar Ogar', 'utf8');
		}

		return !exists;
	}

	private async showDisclaimerDialog() {
		await dialog.showMessageBox({
			type: 'info',
			title: 'Disclaimer',
			message: 'WoW Toolkit is not associated with World of Warcraft or Blizzard Entertainment.\n\nThis message will only be shown once.'
		});
	}
}
