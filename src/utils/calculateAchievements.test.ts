import { describe, it, expect } from "vitest";
import { calculateAchievements } from "./calculateAchievements";
import type { GameHistory } from "../types/GameHistory";
import type { DiscoveryOrder } from "../types/DiscoveryOrder";

describe("calculateAchievements", () => {
	let gameHistory: GameHistory;

	describe("Empty history", () => {
		it("should return no achievements", () => {
			gameHistory = {};
			const discoveryOrder: DiscoveryOrder = [];
			const achievements = calculateAchievements(gameHistory, discoveryOrder);

			expect(achievements.computedAtDate).toBeDefined();
			expect(achievements.achievements.firstGame.unlocked).toBe(false);
			expect(achievements.achievements.streak5Days.unlocked).toBe(false);
		});
	});

	describe("Streak achievement", () => {
		it("should return streak achievement after 5 consecutive days", () => {
			gameHistory = {
				"2024-01-15": ["A"],
				"2024-01-16": ["B"],
				"2024-01-17": ["C"],
				"2024-01-18": ["D"],
				"2024-01-19": ["E"]
			};
			const discoveryOrder: DiscoveryOrder = ["A", "B", "C", "D", "E"];

			const achievements = calculateAchievements(gameHistory, discoveryOrder);

			expect(achievements.computedAtDate).toBeDefined();
			expect(achievements.achievements.firstGame.unlocked).toBe(true);
			expect(achievements.achievements.streak5Days.unlocked).toBe(true);
			expect(achievements.achievements.streak5Days.achievementId).toBe("streak_5_days");
			expect(achievements.achievements.streak5Days.name).toBe("Série de 5 jours");
			expect(achievements.achievements.streak5Days.description).toBe(
				"Réussir une partie 5 jours consécutifs",
			);
		});

	});
});
