import { describe, it, expect } from "vitest";
import { getNewAchievementIds } from "./getNewAchievementIds";
import { createAllAchievementsWithSomeUnlocked } from "../factories/createAllAchievementsWithSomeUnlocked";
import type { ViewedAchievements } from "../entities/ViewedAchievements";

describe("getNewAchievementIds", () => {
	it("should return achievement IDs for unlocked but not viewed achievements", () => {
		const mockAchievements = createAllAchievementsWithSomeUnlocked();
		
		const viewedAchievements: ViewedAchievements = {
			firstGame: true,
			streak5Days: false,
			firstLetterA: false,
			firstLetterE: false,
			firstLetterY: true,
			firstLetterQ: false,
			words1000: false,
			completeAlphabet: false,
			paleographer: false,
			allVowelsInSequence: false,
			doublet: false,
		};

		const result = getNewAchievementIds(mockAchievements, viewedAchievements);

		expect(result).toEqual(["firstLetterA"]);
	});
});
