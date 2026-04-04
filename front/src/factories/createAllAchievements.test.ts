import { describe, it, expect } from "vitest";
import { createAllAchievements } from "./createAllAchievements";

describe("createAllAchievements", () => {
	it("should create default achievements with all locked", () => {
		const achievements = createAllAchievements();

		expect(achievements.computedAtDate).toBeDefined();
		expect(achievements.achievements.firstGame.unlocked).toBe(false);
		expect(achievements.achievements.streak5Days.unlocked).toBe(false);
		expect(achievements.achievements.streak5Days.progress.current).toBe(0);
		expect(achievements.achievements.streak5Days.progress.target).toBe(3);
		expect(achievements.achievements.firstLetterA.unlocked).toBe(false);
		expect(achievements.achievements.firstLetterE.unlocked).toBe(false);
		expect(achievements.achievements.firstLetterY.unlocked).toBe(false);
		expect(achievements.achievements.firstLetterQ.unlocked).toBe(false);
		expect(achievements.achievements.completeAlphabet.unlocked).toBe(false);
		expect(achievements.achievements.completeAlphabet.progress.current).toBe(0);
		expect(achievements.achievements.completeAlphabet.progress.target).toBe(26);
	});

});
