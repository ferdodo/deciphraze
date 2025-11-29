import { describe, it, expect } from "vitest";
import { backupAndClearLocalStorage } from "./backupAndClearLocalStorage";

describe("backupAndClearLocalStorage", () => {
	it("should backup all localStorage data and clear it", () => {
		localStorage.clear();
		// Ajouter des données dans le localStorage
		localStorage.setItem("deciphraze_achievements", '{"test": "data"}');
		localStorage.setItem("deciphraze_game_history", '{"2024-01-01": ["A"]}');
		localStorage.setItem("deciphraze_discovery_order", '{"2024-01-01": ["A", "B"]}');

		const backupKey = backupAndClearLocalStorage();

		// Vérifier qu'une clé de backup a été créée
		expect(backupKey).toBeTruthy();
		expect(backupKey).toMatch(/^deciphraze_localstorage_backup_/);

		// Vérifier que les données originales ont été supprimées
		expect(localStorage.getItem("deciphraze_achievements")).toBeNull();
		expect(localStorage.getItem("deciphraze_game_history")).toBeNull();
		expect(localStorage.getItem("deciphraze_discovery_order")).toBeNull();

		// Vérifier que les données sont dans la clé de backup
		expect(backupKey).not.toBeNull();
		if (backupKey) {
			const backupData = JSON.parse(localStorage.getItem(backupKey) || "{}");
			expect(backupData.deciphraze_achievements).toBe('{"test": "data"}');
			expect(backupData.deciphraze_game_history).toBe('{"2024-01-01": ["A"]}');
			expect(backupData.deciphraze_discovery_order).toBe('{"2024-01-01": ["A", "B"]}');
		}
	});

	it("should not include backup keys in the backup data", () => {
		localStorage.clear();
		// Ajouter des données normales
		localStorage.setItem("deciphraze_achievements", '{"test": "data"}');
		
		// Ajouter une clé de backup existante
		const existingBackupKey = "deciphraze_localstorage_backup_2024-01-01T00-00-00";
		localStorage.setItem(existingBackupKey, '{"old": "backup"}');
		localStorage.setItem("deciphraze_invalid_data_backups", '[{"data": "invalid"}]');

		const backupKey = backupAndClearLocalStorage();

		// Vérifier que la clé de backup créée existe
		expect(backupKey).toBeTruthy();

		// Vérifier que les clés de backup ne sont pas dans les données sauvegardées
		expect(backupKey).not.toBeNull();
		if (backupKey) {
			const backupData = JSON.parse(localStorage.getItem(backupKey) || "{}");
			expect(backupData[existingBackupKey]).toBeUndefined();
			expect(backupData.deciphraze_invalid_data_backups).toBeUndefined();
		}

		// Vérifier que les clés de backup existantes n'ont pas été supprimées
		expect(localStorage.getItem(existingBackupKey)).toBe('{"old": "backup"}');
		expect(localStorage.getItem("deciphraze_invalid_data_backups")).toBe('[{"data": "invalid"}]');
	});

	it("should handle errors gracefully and return null", () => {
		localStorage.clear();
		localStorage.setItem("deciphraze_achievements", '{"test": "data"}');
		
		// Simuler une erreur en remplaçant temporairement localStorage.setItem
		const originalSetItem = Storage.prototype.setItem;
		Storage.prototype.setItem = function(key: string, value: string): void {
			// Lancer l'erreur seulement lors de la sauvegarde de la clé de backup
			if (key.startsWith("deciphraze_localstorage_backup_")) {
				throw new Error("Storage quota exceeded");
			}
			originalSetItem.call(this, key, value);
		};

		const backupKey = backupAndClearLocalStorage();

		// Restaurer la fonction originale
		Storage.prototype.setItem = originalSetItem;

		// Vérifier que la fonction retourne null en cas d'erreur
		expect(backupKey).toBeNull();
	});
});

