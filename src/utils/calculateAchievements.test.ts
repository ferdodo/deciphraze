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
			const paragraphOfTheDay = "Hello world";
			const achievements = calculateAchievements(gameHistory, discoveryOrder, paragraphOfTheDay);

			expect(achievements.computedAtDate).toBeDefined();
			expect(achievements.achievements.firstGame.unlocked).toBe(false);
			expect(achievements.achievements.streak5Days.unlocked).toBe(false);
			expect(achievements.achievements.wordInOrder.unlocked).toBe(false);
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
			const paragraphOfTheDay = "Hello world";

			const achievements = calculateAchievements(gameHistory, discoveryOrder, paragraphOfTheDay);

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

	describe("Word in order achievement", () => {
		it("should unlock when a word of 5+ letters is found in order", () => {
			gameHistory = {
				"2024-01-15": ["H", "E", "L", "L", "O"]
			};
			const discoveryOrder: DiscoveryOrder = ["H", "E", "L", "L", "O"];
			const paragraphOfTheDay = "Hello world test";

			const achievements = calculateAchievements(gameHistory, discoveryOrder, paragraphOfTheDay);

			expect(achievements.achievements.wordInOrder.unlocked).toBe(true);
			expect(achievements.achievements.wordInOrder.achievementId).toBe("word_in_order");
			expect(achievements.achievements.wordInOrder.name).toBe("D'un trait");
			expect(achievements.achievements.wordInOrder.description).toBe(
				"Trouver toutes les lettres d'un mot d'au moins 5 lettres dans l'ordre",
			);
		});

		it("should not unlock when letters are not in order", () => {
			gameHistory = {
				"2024-01-15": ["H", "E", "L", "L", "O"]
			};
			const discoveryOrder: DiscoveryOrder = ["E", "H", "L", "L", "O"];
			const paragraphOfTheDay = "Hello world test";

			const achievements = calculateAchievements(gameHistory, discoveryOrder, paragraphOfTheDay);

			expect(achievements.achievements.wordInOrder.unlocked).toBe(false);
		});

		it("should not unlock when word is less than 5 letters", () => {
			gameHistory = {
				"2024-01-15": ["T", "E", "S", "T"]
			};
			const discoveryOrder: DiscoveryOrder = ["T", "E", "S", "T"];
			const paragraphOfTheDay = "Hello world test";

			const achievements = calculateAchievements(gameHistory, discoveryOrder, paragraphOfTheDay);

			expect(achievements.achievements.wordInOrder.unlocked).toBe(false);
		});

	});
});
