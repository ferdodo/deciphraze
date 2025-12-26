import type { StorageLike } from "./StorageLike";
import { getDefaultStorage } from "./getDefaultStorage";

interface BackupEntry {
	data: string;
	metadata: Record<string, string>;
}

const BACKUP_STORAGE_KEY = "deciphraze_invalid_data_backups";

export function backupInvalidData(
	invalidData: string, 
	metadata: Record<string, string>,
	storage: StorageLike | null = getDefaultStorage()
): void {
	if (!storage) {
		return;
	}

	try {
		const existingBackups = storage.getItem(BACKUP_STORAGE_KEY);
		let backups: BackupEntry[] = [];
		
		if (existingBackups) {
			try {
				const parsed = JSON.parse(existingBackups);
				if (Array.isArray(parsed)) {
					backups = parsed;
				}
			} catch {
				// Si le parsing échoue, on commence avec un tableau vide
			}
		}

		const backupEntry: BackupEntry = {
			data: invalidData,
			metadata
		};

		backups.push(backupEntry);
		storage.setItem(BACKUP_STORAGE_KEY, JSON.stringify(backups));

	} catch (error) {
		console.error("Erreur lors de la sauvegarde des données invalides:", error);
	}
}
