import { describe, it, expect } from "vitest";
import { createViewedAchievementsRepository } from "./createViewedAchievementsRepository";
import { createLocalStorageMock } from "./createLocalStorageMock";
import type { ViewedAchievements } from "../entities/ViewedAchievements";

describe("createViewedAchievementsRepository", () => {
	it("should return default viewed achievements when storage is empty", () => {
		const storage = createLocalStorageMock();
		const repository = createViewedAchievementsRepository(storage);
		const viewedAchievements = repository.getViewedAchievements();

		expect(viewedAchievements).toEqual({
			firstGame: false,
			streak5Days: false,
			firstLetterA: false,
			firstLetterE: false,
			firstLetterY: false,
			wordInOrder: false,
			alphaAndOmega: false,
			firstLetterQ: false,
			words1000: false,
			completeAlphabet: false,
			paleographer: false,
			allVowelsInSequence: false,
			doublet: false,
		});
	});

	it("should load viewed achievements from storage", () => {
		const storage = createLocalStorageMock();
		const storedAchievements: ViewedAchievements = {
			firstGame: true,
			streak5Days: false,
			firstLetterA: true,
			firstLetterE: false,
			firstLetterY: false,
			wordInOrder: false,
			alphaAndOmega: false,
			firstLetterQ: false,
			words1000: false,
			completeAlphabet: false,
			paleographer: false,
			allVowelsInSequence: false,
			doublet: false,
		};

		storage.setItem("deciphraze_viewed_achievements", JSON.stringify(storedAchievements));
		const newRepository = createViewedAchievementsRepository(storage);
		const viewedAchievements = newRepository.getViewedAchievements();
		expect(viewedAchievements).toEqual(storedAchievements);
	});

	it("should clear all achievements", () => {
		const storage = createLocalStorageMock();
		const repository = createViewedAchievementsRepository(storage);
		const someAchievements: ViewedAchievements = {
			firstGame: true,
			streak5Days: true,
			firstLetterA: false,
			firstLetterE: false,
			firstLetterY: false,
			wordInOrder: false,
			alphaAndOmega: false,
			firstLetterQ: false,
			words1000: false,
			completeAlphabet: false,
			paleographer: false,
			allVowelsInSequence: false,
			doublet: false,
		};

		repository.saveViewedAchievement(someAchievements);
		repository.clear();

		const clearedAchievements = repository.getViewedAchievements();
		expect(clearedAchievements.firstGame).toBe(false);
		expect(clearedAchievements.streak5Days).toBe(false);
		expect(storage.getItem("deciphraze_viewed_achievements")).toBeNull();
	});

	it("should handle corrupted storage data", () => {
		const storage = createLocalStorageMock();
		storage.setItem("deciphraze_viewed_achievements", "invalid json");
		const newRepository = createViewedAchievementsRepository(storage);
		const viewedAchievements = newRepository.getViewedAchievements();

		// Should fall back to defaults
		expect(viewedAchievements.firstGame).toBe(false);
		expect(viewedAchievements.streak5Days).toBe(false);
	});


	it("should emit viewed achievements changes", () => {
		const storage = createLocalStorageMock();
		const repository = createViewedAchievementsRepository(storage);
		
		let callbackCalled = false;
		let receivedAchievements: ViewedAchievements | null = null;
		
		repository.viewedAchievements$.subscribe((achievements: ViewedAchievements) => {
			receivedAchievements = achievements;
			callbackCalled = true;
		});

		// Save new achievements
		const newAchievements: ViewedAchievements = {
			firstGame: true,
			streak5Days: false,
			firstLetterA: false,
			firstLetterE: false,
			firstLetterY: false,
			wordInOrder: false,
			alphaAndOmega: false,
			firstLetterQ: false,
			words1000: false,
			completeAlphabet: false,
			paleographer: false,
			allVowelsInSequence: false,
			doublet: false,
		};

		repository.saveViewedAchievement(newAchievements);
		
		expect(callbackCalled).toBe(true);
		expect(receivedAchievements).toEqual(newAchievements);
	});
});
