import { describe, it, expect } from "vitest";
import { checkAchievements } from "./checkAchievements";
import { defaultAchievements } from "../constants/defaultAchievements";
import { createLocalStorageMock } from "./createLocalStorageMock";

describe("checkAchievements", () => {

	it("should return valid achievements when data is valid", () => {
		const validData = defaultAchievements;
		const result = checkAchievements(validData);

		expect(result).toEqual(validData);
		expect(result.computedAtDate).toBe(validData.computedAtDate);
		expect(result.achievements.firstGame.name).toBe("Préambule");
		expect(result.achievements.streak5Days.name).toBe("Momentum");
		expect(result.achievements.firstLetterA.name).toBe("Aperçu");
		expect(result.achievements.firstLetterE.name).toBe("Élémentaire");
		expect(result.achievements.words1000.name).toBe("Scribe");
	});

	it("should throw error when structure is invalid", () => {
		const invalidData = {
			computedAtDate: "2024-01-01",
			achievements: {
				firstGame: {
					achievementId: "wrong_id",
					name: "Wrong Name",
					description: "Wrong description",
					unlocked: false
				}
			}
		};

		expect(() => {
			checkAchievements(invalidData);
		}).toThrow("Invalid achievements structure");
	});

	it("should backup invalid data before clearing localStorage", () => {
		const storage = createLocalStorageMock();
		// Ajouter des données dans le localStorage avant le test
		storage.setItem("deciphraze_achievements", '{"corrupted": "data"}');
		storage.setItem("deciphraze_statistics", '{"totalGames": 5}');

		const invalidData = {
			computedAtDate: "2024-01-01",
			achievements: {
				firstGame: {
					achievementId: "wrong_id",
					name: "Wrong Name",
					description: "Wrong description",
					unlocked: false
				}
			}
		};

		expect(() => {
			checkAchievements(invalidData, storage);
		}).toThrow("Invalid achievements structure");

		// Vérifier que les données invalides ont été sauvegardées
		const invalidBackups = storage.getItem("deciphraze_invalid_data_backups");
		expect(invalidBackups).toBeTruthy();
		if (invalidBackups) {
			const parsed = JSON.parse(invalidBackups);
			expect(Array.isArray(parsed)).toBe(true);
			expect(parsed.length).toBeGreaterThan(0);
			const lastBackup = parsed[parsed.length - 1];
			expect(lastBackup.data).toBe(JSON.stringify(invalidData));
			expect(lastBackup.metadata.provenance).toBe("checkAchievements");
			expect(lastBackup.metadata.timestamp).toBeTruthy();
			expect(lastBackup.metadata.userAgent).toBeTruthy();
		}

		// Vérifier qu'une clé de backup du localStorage a été créée
		const backupKeys: string[] = [];
		for (let i = 0; i < storage.length; i++) {
			const key = storage.key(i);
			if (key && key.startsWith("deciphraze_localstorage_backup_")) {
				backupKeys.push(key);
			}
		}
		expect(backupKeys.length).toBeGreaterThan(0);

		// Vérifier que les données originales ont été sauvegardées dans le backup
		if (backupKeys.length > 0) {
			const backupKey = backupKeys[backupKeys.length - 1];
			const backupData = JSON.parse(storage.getItem(backupKey) || "{}");
			expect(backupData.deciphraze_achievements).toBe('{"corrupted": "data"}');
			expect(backupData.deciphraze_statistics).toBe('{"totalGames": 5}');
		}

		// Vérifier que les données originales ont été supprimées
		expect(storage.getItem("deciphraze_achievements")).toBeNull();
		expect(storage.getItem("deciphraze_statistics")).toBeNull();
	});
});

