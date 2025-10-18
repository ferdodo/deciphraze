import { describe, it, expect } from "vitest";
import { createAchievementRepository } from "./createAchievementRepository";
import type { AllAchievements } from "../types/AllAchievements";

describe("createAchievementRepository", () => {

	it("should save and load achievements", () => {
		const repository = createAchievementRepository();
		const achievements: AllAchievements = {
			firstGame: {
				achievementId: "first_game",
				name: "Premier pas",
				description: "Jouer votre première partie",
				unlocked: true
			},
			streak5Days: {
				achievementId: "streak_5_days",
				name: "Série de 5 jours",
				description: "Réussir une partie 5 jours consécutifs",
				unlocked: false,
				progress: {
					current: 0,
					target: 5
				}
			}
		};
		
		repository.saveAchievements(achievements);
		const loadedAchievements = repository.loadAchievements();
		
		expect(loadedAchievements).toEqual(achievements);
	});

	it("should handle invalid localStorage data", () => {
		localStorage.setItem("deciphraze_achievements", "invalid json");
		const repository = createAchievementRepository();
		const achievements = repository.loadAchievements();
		
		expect(achievements).toBeDefined();
		expect(achievements.firstGame).toBeDefined();
		expect(achievements.streak5Days).toBeDefined();
	});


	it("should handle null localStorage", () => {
		localStorage.setItem("deciphraze_achievements", "null");
		const repository = createAchievementRepository();
		const achievements = repository.loadAchievements();
		
		expect(achievements).toBeDefined();
		expect(achievements.firstGame).toBeDefined();
		expect(achievements.streak5Days).toBeDefined();
	});


});
