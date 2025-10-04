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
			gameHistory = new Map();
			gameHistory.set("2024-01-15", ["A"]);

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
			gameHistory = new Map();
			const today = new Date();
			for (let i = 0; i < 5; i++) {
				const date = new Date(today);
				date.setDate(date.getDate() - i);
				gameHistory.set(date.toISOString().split("T")[0], ["A"]);
			}

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

		it("should not return streak achievement with less than 5 consecutive days", () => {
			gameHistory = new Map();
			for (let i = 0; i < 3; i++) {
				const date = new Date("2024-01-15");
				date.setDate(date.getDate() + i);
				gameHistory.set(date.toISOString().split("T")[0], ["A"]);
			}

			const achievements = calculateAchievements(gameHistory);
			const streakAchievement = achievements.find(
				(ach) => ach.achievementId === "streak_5_days",
			);

			expect(achievements).toHaveLength(1);
			expect(streakAchievement).toBeUndefined();
		});

		it("should not count non-consecutive days as streak", () => {
			gameHistory = new Map();
			gameHistory.set("2024-01-15", ["A"]);
			gameHistory.set("2024-01-17", ["B"]);

			const achievements = calculateAchievements(gameHistory);
			const streakAchievement = achievements.find(
				(ach) => ach.achievementId === "streak_5_days",
			);

			expect(achievements).toHaveLength(1);
			expect(streakAchievement).toBeUndefined();
		});

		it("should handle single day", () => {
			gameHistory = new Map();
			gameHistory.set("2024-01-15", ["A"]);

			const achievements = calculateAchievements(gameHistory);
			const streakAchievement = achievements.find(
				(ach) => ach.achievementId === "streak_5_days",
			);

			expect(achievements).toHaveLength(1);
			expect(streakAchievement).toBeUndefined();
		});
	});
});
