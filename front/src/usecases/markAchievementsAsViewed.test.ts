import { describe, it, expect } from "vitest";
import { markAchievementsAsViewed } from "./markAchievementsAsViewed";
import { createViewedAchievementsRepository } from "../utils/createViewedAchievementsRepository";
import { createLocalStorageMock } from "../utils/createLocalStorageMock";
import type { ViewedAchievements } from "@deciphraze/core";

describe("markAchievementsAsViewed", () => {
	it("should mark achievements as viewed", () => {
		const storage = createLocalStorageMock();
		const repository = createViewedAchievementsRepository(storage);
		const achievementIds: (keyof ViewedAchievements)[] = ["firstGame", "firstLetterA"];
		markAchievementsAsViewed(achievementIds, repository);
		const viewedAchievements = repository.getViewedAchievements();
		expect(viewedAchievements.firstGame).toBe(true);
		expect(viewedAchievements.firstLetterA).toBe(true);
		expect(viewedAchievements.streak5Days).toBe(false);
	});
});
