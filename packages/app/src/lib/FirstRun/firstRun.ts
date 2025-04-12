import { dialog } from 'electron';
import { fileExists } from '~/utils';
import { writeFile } from 'node:fs/promises';
import type { FirstRunFileProvider } from './firstRunFileProvider';

export class FirstRun {
	public constructor(
		private readonly firstRunFileProvider: FirstRunFileProvider
	) {}

	public async performFirstRunTasks() {
		const isFirstRun = await this.isFirstRun();
		if (!isFirstRun) {
			return;
		}

		await this.showDisclaimerDialog();
	}

	public async isFirstRun(dry = false) {
		const path   = this.firstRunFileProvider.firstRunFilePath;
		const exists = await fileExists(path);

		if (!dry) {
			await writeFile(path, 'Lok\'Tar Ogar', 'utf8');
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
