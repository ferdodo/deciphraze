import { describe, it, expect } from "vitest";
import { calculateAchievements } from "./calculateAchievements";
import type { GameHistory } from "../types/GameHistory";

describe("calculateAchievements", () => {
	let gameHistory: GameHistory;

	describe("Empty history", () => {
		it("should return no achievements", () => {
			gameHistory = new Map();
			const achievements = calculateAchievements(gameHistory);

			expect(achievements).toHaveLength(0);
		});
	});

	describe("First game achievement", () => {
		it("should return first game achievement after playing once", () => {
			gameHistory = new Map([["2024-01-15", ["A"]]]);

			const achievements = calculateAchievements(gameHistory);
			const firstGameAchievement = achievements.find(
				(ach) => ach.achievementId === "first_game",
			);

			expect(achievements).toHaveLength(1);
			expect(firstGameAchievement).toBeDefined();
			expect(firstGameAchievement?.name).toBe("Premier pas");
			expect(firstGameAchievement?.description).toBe(
				"Jouer votre première partie",
			);
		});
	});

	describe("Streak achievement", () => {
		it("should return streak achievement after 5 consecutive days", () => {
			gameHistory = new Map([
				["2024-01-15", ["A"]],
				["2024-01-16", ["B"]],
				["2024-01-17", ["C"]],
				["2024-01-18", ["D"]],
				["2024-01-19", ["E"]],
			]);

			const achievements = calculateAchievements(gameHistory);
			const streakAchievement = achievements.find(
				(ach) => ach.achievementId === "streak_5_days",
			);

			expect(achievements).toHaveLength(2);
			expect(streakAchievement).toBeDefined();
			expect(streakAchievement?.achievementId).toBe("streak_5_days");
			expect(streakAchievement?.name).toBe("Série de 5 jours");
			expect(streakAchievement?.description).toBe(
				"Réussir une partie 5 jours consécutifs",
			);
		});

	});
});
