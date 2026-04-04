import { describe, it, expect } from "vitest";
import { createAllAchievementsWithSomeUnlocked } from "./createAllAchievementsWithSomeUnlocked";

describe("createAllAchievementsWithSomeUnlocked", () => {
	it("should create achievements with some unlocked and progress", () => {
		const achievements = createAllAchievementsWithSomeUnlocked();

		expect(achievements.computedAtDate).toBe("2023-01-01");
		
		// Test unlocked achievements
		expect(achievements.achievements.firstGame.unlocked).toBe(true);
		expect(achievements.achievements.firstLetterA.unlocked).toBe(true);
		expect(achievements.achievements.firstLetterY.unlocked).toBe(true);
		
		// Test locked achievements
		expect(achievements.achievements.streak5Days.unlocked).toBe(false);
		expect(achievements.achievements.firstLetterE.unlocked).toBe(false);
		expect(achievements.achievements.alphaAndOmega.unlocked).toBe(false);
		expect(achievements.achievements.firstLetterQ.unlocked).toBe(false);
		expect(achievements.achievements.words1000.unlocked).toBe(false);
		expect(achievements.achievements.completeAlphabet.unlocked).toBe(false);
		expect(achievements.achievements.paleographer.unlocked).toBe(false);
		expect(achievements.achievements.allVowelsInSequence.unlocked).toBe(false);
		
		// Test progress values for achievements in progress
		expect(achievements.achievements.streak5Days.progress).toEqual({ current: 3, target: 3 });
		expect(achievements.achievements.words1000.progress).toEqual({ current: 250, target: 500 });
		expect(achievements.achievements.completeAlphabet.progress).toEqual({ current: 15, target: 26 });
		
		// Test that all achievements have required properties
		expect(achievements.achievements.firstGame.name).toBeDefined();
		expect(achievements.achievements.firstGame.description).toBeDefined();
		expect(achievements.achievements.streak5Days.name).toBeDefined();
		expect(achievements.achievements.streak5Days.description).toBeDefined();
	});
});
