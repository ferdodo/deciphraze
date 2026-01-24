import { describe, it, expect } from "vitest";
import { createAchievementRepository } from "./createAchievementRepository";
import { createAllAchievements } from "../factories/createAllAchievements";
import { createLocalStorageMock } from "./createLocalStorageMock";

describe("createAchievementRepository", () => {

	it("should save and load achievements", () => {
		const storage = createLocalStorageMock();
		const repository = createAchievementRepository(storage);
		const achievements = createAllAchievements();

		repository.saveAchievements(achievements);
		const loaded = repository.loadAchievements();

		expect(loaded.achievements.firstGame.unlocked).toBe(false);
		expect(loaded.achievements.streak5Days.unlocked).toBe(false);
		expect(loaded.achievements.firstLetterA).toBeDefined();
		expect(loaded.achievements.firstLetterE).toBeDefined();
		expect(loaded.achievements.firstLetterY).toBeDefined();
		expect(loaded.achievements.wordInOrder).toBeDefined();
		expect(loaded.achievements.alphaAndOmega).toBeDefined();
		expect(loaded.achievements.firstLetterQ).toBeDefined();
		expect(loaded.achievements.words1000).toBeDefined();
		expect(loaded.achievements.completeAlphabet).toBeDefined();
	});

});

