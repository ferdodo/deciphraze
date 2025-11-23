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
			expect(achievements.achievements.firstLetterE.unlocked).toBe(false);
			expect(achievements.achievements.wordInOrder.unlocked).toBe(false);
			expect(achievements.achievements.alphaAndOmega.unlocked).toBe(false);
			expect(achievements.achievements.firstLetterY.unlocked).toBe(false);
		});
	});

	describe("First letter Y achievement", () => {
		it("should unlock when Y is the first letter found", () => {
			gameHistory = {
				"2024-01-15": ["Y"]
			};
			const discoveryOrder: DiscoveryOrder = ["Y", "E", "S"];
			const paragraphOfTheDay = "Yes world";

			const achievements = calculateAchievements(gameHistory, discoveryOrder, paragraphOfTheDay);

			expect(achievements.achievements.firstLetterY.unlocked).toBe(true);
			expect(achievements.achievements.firstLetterY.achievementId).toBe("first_letter_y");
			expect(achievements.achievements.firstLetterY.name).toBe("Commencer par Y");
			expect(achievements.achievements.firstLetterY.description).toBe(
				"Trouver la lettre Y en premier",
			);
		});

		it("should not unlock when Y is not the first letter found", () => {
			gameHistory = {
				"2024-01-15": ["Y"]
			};
			const discoveryOrder: DiscoveryOrder = ["E", "Y", "S"];
			const paragraphOfTheDay = "Yes world";

			const achievements = calculateAchievements(gameHistory, discoveryOrder, paragraphOfTheDay);

			expect(achievements.achievements.firstLetterY.unlocked).toBe(false);
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

	describe("First letter E achievement", () => {
		it("should unlock when first letter discovered is E", () => {
			gameHistory = {
				"2024-01-15": ["E", "B", "C"]
			};
			const discoveryOrder: DiscoveryOrder = ["E", "B", "C"];
			const paragraphOfTheDay = "Hello world";

			const achievements = calculateAchievements(gameHistory, discoveryOrder, paragraphOfTheDay);

			expect(achievements.achievements.firstLetterE.unlocked).toBe(true);
			expect(achievements.achievements.firstLetterE.achievementId).toBe("first_letter_e");
			expect(achievements.achievements.firstLetterE.name).toBe("Commencer par E");
			expect(achievements.achievements.firstLetterE.description).toBe(
				"Trouver la lettre E en premier",
			);
		});

		it("should not unlock when first letter discovered is not E", () => {
			gameHistory = {
				"2024-01-15": ["B", "E", "C"]
			};
			const discoveryOrder: DiscoveryOrder = ["B", "E", "C"];
			const paragraphOfTheDay = "Hello world";

			const achievements = calculateAchievements(gameHistory, discoveryOrder, paragraphOfTheDay);

			expect(achievements.achievements.firstLetterE.unlocked).toBe(false);
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
			expect(achievements.achievements.wordInOrder.name).toBe("Signature");
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

	describe("Alpha and Omega achievement", () => {
		it("should unlock when first and last letters match", () => {
			gameHistory = {
				"2024-01-15": ["H", "E", "L", "L", "O", "W", "O", "R", "L", "D"]
			};
			const discoveryOrder: DiscoveryOrder = ["H", "E", "L", "L", "O", "W", "O", "R", "L", "D"];
			const paragraphOfTheDay = "Hello world";

			const achievements = calculateAchievements(gameHistory, discoveryOrder, paragraphOfTheDay);

			expect(achievements.achievements.alphaAndOmega.unlocked).toBe(true);
			expect(achievements.achievements.alphaAndOmega.achievementId).toBe("alpha_and_omega");
			expect(achievements.achievements.alphaAndOmega.name).toBe("Alpha et Omega");
			expect(achievements.achievements.alphaAndOmega.description).toBe(
				"Trouver respectivement la première lettre en premier et la dernière en dernier",
			);
		});

		it("should not unlock when first letter does not match", () => {
			gameHistory = {
				"2024-01-15": ["E", "L", "L", "O", "W", "O", "R", "L", "D"]
			};
			const discoveryOrder: DiscoveryOrder = ["E", "L", "L", "O", "W", "O", "R", "L", "D"];
			const paragraphOfTheDay = "Hello world";

			const achievements = calculateAchievements(gameHistory, discoveryOrder, paragraphOfTheDay);

			expect(achievements.achievements.alphaAndOmega.unlocked).toBe(false);
		});

		it("should not unlock when last letter does not match", () => {
			gameHistory = {
				"2024-01-15": ["H", "E", "L", "L", "O", "W", "O", "R", "L"]
			};
			const discoveryOrder: DiscoveryOrder = ["H", "E", "L", "L", "O", "W", "O", "R", "L"];
			const paragraphOfTheDay = "Hello world";

			const achievements = calculateAchievements(gameHistory, discoveryOrder, paragraphOfTheDay);

			expect(achievements.achievements.alphaAndOmega.unlocked).toBe(false);
		});

		it("should ignore punctuation when finding first and last letters", () => {
			gameHistory = {
				"2024-01-15": ["H", "E", "L", "L", "O", "W", "O", "R", "L", "D"]
			};
			const discoveryOrder: DiscoveryOrder = ["H", "E", "L", "L", "O", "W", "O", "R", "L", "D"];
			const paragraphOfTheDay = "!Hello world!";

			const achievements = calculateAchievements(gameHistory, discoveryOrder, paragraphOfTheDay);

			expect(achievements.achievements.alphaAndOmega.unlocked).toBe(true);
		});
	});
});
