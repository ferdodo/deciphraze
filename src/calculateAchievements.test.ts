import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { calculateAchievements } from "./calculateAchievements";
import type { GameHistory } from "./types/GameHistory";

describe("calculateAchievements", () => {
	let gameHistory: GameHistory;

	beforeEach(() => {
		gameHistory = new Map();
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	describe("Empty history", () => {
		it("should return no achievements", () => {
			const achievements = calculateAchievements(gameHistory);

			expect(achievements).toHaveLength(0);
		});
	});

	describe("First game achievement", () => {
		it("should return first game achievement after playing once", () => {
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
			// Set system time to a fixed date
			vi.setSystemTime(new Date("2024-01-20"));

			// Create 5 consecutive days ending today
			for (let i = 0; i < 5; i++) {
				const date = new Date("2024-01-16");
				date.setDate(date.getDate() + i);
				gameHistory.set(date.toISOString().split("T")[0], ["A"]);
			}

			const achievements = calculateAchievements(gameHistory);
			const streakAchievement = achievements.find(
				(ach) => ach.achievementId === "streak_5_days",
			);

			expect(achievements).toHaveLength(2); // First game + streak
			expect(streakAchievement).toBeDefined();
			expect(streakAchievement?.achievementId).toBe("streak_5_days");
			expect(streakAchievement?.name).toBe("Série de 5 jours");
			expect(streakAchievement?.description).toBe(
				"Réussir une partie 5 jours consécutifs",
			);
		});

		it("should not return streak achievement with less than 5 consecutive days", () => {
			// Create only 3 consecutive days
			for (let i = 0; i < 3; i++) {
				const date = new Date("2024-01-15");
				date.setDate(date.getDate() + i);
				gameHistory.set(date.toISOString().split("T")[0], ["A"]);
			}

			const achievements = calculateAchievements(gameHistory);
			const streakAchievement = achievements.find(
				(ach) => ach.achievementId === "streak_5_days",
			);

			expect(achievements).toHaveLength(1); // Only first game
			expect(streakAchievement).toBeUndefined();
		});

		it("should not count non-consecutive days as streak", () => {
			gameHistory.set("2024-01-15", ["A"]);
			gameHistory.set("2024-01-17", ["B"]); // Skip a day

			const achievements = calculateAchievements(gameHistory);
			const streakAchievement = achievements.find(
				(ach) => ach.achievementId === "streak_5_days",
			);

			expect(achievements).toHaveLength(1); // Only first game
			expect(streakAchievement).toBeUndefined();
		});

		it("should handle single day", () => {
			gameHistory.set("2024-01-15", ["A"]);

			const achievements = calculateAchievements(gameHistory);
			const streakAchievement = achievements.find(
				(ach) => ach.achievementId === "streak_5_days",
			);

			expect(achievements).toHaveLength(1); // Only first game
			expect(streakAchievement).toBeUndefined();
		});
	});
});
