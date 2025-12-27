import { describe, it, expect } from "vitest";
import { backupAndClearLocalStorage } from "./backupAndClearLocalStorage";
import { createLocalStorageMock } from "./createLocalStorageMock";

describe("backupAndClearLocalStorage", () => {
	it("should backup all localStorage data and clear it", () => {
		const storage = createLocalStorageMock();
		storage.setItem("deciphraze_achievements", '{"test": "data"}');
		storage.setItem("deciphraze_game_history", '{"2024-01-01": ["A"]}');
		storage.setItem("deciphraze_discovery_order", '{"2024-01-01": ["A", "B"]}');

		const backupKey = backupAndClearLocalStorage(storage);

		// Vérifier qu'une clé de backup a été créée
		expect(backupKey).toBeTruthy();
		expect(backupKey).toMatch(/^deciphraze_localstorage_backup_/);

		// Vérifier que les données originales ont été supprimées
		expect(storage.getItem("deciphraze_achievements")).toBeNull();
		expect(storage.getItem("deciphraze_game_history")).toBeNull();
		expect(storage.getItem("deciphraze_discovery_order")).toBeNull();

		// Vérifier que les données sont dans la clé de backup
		expect(backupKey).not.toBeNull();
		if (backupKey) {
			const backupData = JSON.parse(storage.getItem(backupKey) || "{}");
			expect(backupData.deciphraze_achievements).toBe('{"test": "data"}');
			expect(backupData.deciphraze_game_history).toBe('{"2024-01-01": ["A"]}');
			expect(backupData.deciphraze_discovery_order).toBe('{"2024-01-01": ["A", "B"]}');
		}
	});

	it("should not include backup keys in the backup data", () => {
		const storage = createLocalStorageMock();
		// Ajouter des données normales
		storage.setItem("deciphraze_achievements", '{"test": "data"}');
		
		// Ajouter une clé de backup existante
		const existingBackupKey = "deciphraze_localstorage_backup_2024-01-01T00-00-00";
		storage.setItem(existingBackupKey, '{"old": "backup"}');
		storage.setItem("deciphraze_invalid_data_backups", '[{"data": "invalid"}]');

		const backupKey = backupAndClearLocalStorage(storage);

		// Vérifier que la clé de backup créée existe
		expect(backupKey).toBeTruthy();

		// Vérifier que les clés de backup ne sont pas dans les données sauvegardées
		expect(backupKey).not.toBeNull();
		if (backupKey) {
			const backupData = JSON.parse(storage.getItem(backupKey) || "{}");
			expect(backupData[existingBackupKey]).toBeUndefined();
			expect(backupData.deciphraze_invalid_data_backups).toBeUndefined();
		}

		// Vérifier que les clés de backup existantes n'ont pas été supprimées
		expect(storage.getItem(existingBackupKey)).toBe('{"old": "backup"}');
		expect(storage.getItem("deciphraze_invalid_data_backups")).toBe('[{"data": "invalid"}]');
	});

	it("should handle errors gracefully and return null", () => {
		const storage = createLocalStorageMock();
		storage.setItem("deciphraze_achievements", '{"test": "data"}');
		
		// Simuler une erreur en remplaçant temporairement setItem du mock
		const originalSetItem = storage.setItem;
		storage.setItem = function(key: string, value: string): void {
			// Lancer l'erreur seulement lors de la sauvegarde de la clé de backup
			if (key.startsWith("deciphraze_localstorage_backup_")) {
				throw new Error("Storage quota exceeded");
			}
			originalSetItem.call(this, key, value);
		};

		const backupKey = backupAndClearLocalStorage(storage);

		// Vérifier que la fonction retourne null en cas d'erreur
		expect(backupKey).toBeNull();
	});

});

