import type { StorageLike } from "./StorageLike";
import { getDefaultStorage } from "./getDefaultStorage";

const BACKUP_PREFIX = "deciphraze_localstorage_backup_";
const INVALID_DATA_BACKUP_KEY = "deciphraze_invalid_data_backups";

/**
 * Sauvegarde tout le localStorage dans une nouvelle clé avec timestamp,
 * puis nettoie complètement le localStorage (sauf les clés de backup).
 * 
 * @param storage - Le storage à utiliser (par défaut: localStorage)
 * @returns La clé de backup créée, ou null en cas d'erreur
 */
export function backupAndClearLocalStorage(storage: StorageLike | null = getDefaultStorage()): string | null {
	if (!storage) {
		return null;
	}

	try {
		// Collecter toutes les clés du localStorage
		const allKeys: string[] = [];
		for (let i = 0; i < storage.length; i++) {
			const key = storage.key(i);
			if (key) {
				allKeys.push(key);
			}
		}

		// Filtrer les clés de backup existantes (ne pas les inclure dans la sauvegarde)
		const keysToBackup = allKeys.filter(key => 
			!key.startsWith(BACKUP_PREFIX) && 
			key !== INVALID_DATA_BACKUP_KEY
		);

		// Créer un objet avec toutes les données à sauvegarder
		const backupData: Record<string, string> = {};
		for (const key of keysToBackup) {
			try {
				const value = storage.getItem(key);
				if (value !== null) {
					backupData[key] = value;
				}
			} catch (error) {
				console.error(`Erreur lors de la lecture de la clé ${key}:`, error);
			}
		}

		// Créer une clé de backup unique avec timestamp (incluant les millisecondes)
		const now = new Date();
		const timestamp = now.toISOString().replace(/:/g, "-").replace(/\./g, "-");
		const backupKey = `${BACKUP_PREFIX}${timestamp}`;

		// Sauvegarder toutes les données dans la nouvelle clé
		storage.setItem(backupKey, JSON.stringify(backupData));

		// Supprimer toutes les clés sauf les clés de backup (qui ne sont pas dans keysToBackup)
		for (const key of keysToBackup) {
			try {
				storage.removeItem(key);
			} catch (error) {
				console.error(`Erreur lors de la suppression de la clé ${key}:`, error);
			}
		}

		return backupKey;
	} catch (error) {
		console.error("Erreur lors de la sauvegarde et du nettoyage du localStorage:", error);
		return null;
	}
}

