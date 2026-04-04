import { describe, it, expect } from "vitest";
import { createAllAchievementsForRepositoryTest } from "./createAllAchievementsForRepositoryTest";

describe("createAllAchievementsForRepositoryTest", () => {
	it("should create achievements with specific test configuration", () => {
		const achievements = createAllAchievementsForRepositoryTest();

		expect(achievements.computedAtDate).toBe("2024-01-01T00:00:00.000Z");
		
		// Test specific unlocked achievements
		expect(achievements.achievements.firstGame.unlocked).toBe(true);
		expect(achievements.achievements.firstLetterA.unlocked).toBe(true);
		
		// Test specific locked achievements
		expect(achievements.achievements.streak5Days.unlocked).toBe(false);
		expect(achievements.achievements.firstLetterE.unlocked).toBe(false);
		expect(achievements.achievements.firstLetterY.unlocked).toBe(false);
		expect(achievements.achievements.firstLetterQ.unlocked).toBe(false);
		expect(achievements.achievements.words1000.unlocked).toBe(false);
		expect(achievements.achievements.completeAlphabet.unlocked).toBe(false);
		expect(achievements.achievements.paleographer.unlocked).toBe(false);
		expect(achievements.achievements.allVowelsInSequence.unlocked).toBe(false);
		
		// Test progress values
		expect(achievements.achievements.streak5Days.progress).toEqual({ current: 0, target: 3 });
		expect(achievements.achievements.words1000.progress).toEqual({ current: 0, target: 500 });
		expect(achievements.achievements.completeAlphabet.progress).toEqual({ current: 0, target: 26 });
		
		// Test that all achievements have required properties
		expect(achievements.achievements.firstGame.name).toBeDefined();
		expect(achievements.achievements.firstGame.description).toBeDefined();
		expect(achievements.achievements.streak5Days.name).toBeDefined();
		expect(achievements.achievements.streak5Days.description).toBeDefined();
	});
});
