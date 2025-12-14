import { describe, it, expect } from "vitest";
import { calculateAchievements } from "./calculateAchievements";
import { createAllAchievements } from "../factories/createAllAchievements";
import type { GameHistory } from "../entities/GameHistory";
import type { DiscoveryOrder } from "../entities/DiscoveryOrder";
import type { GameSession } from "../entities/GameSession";
import type { AllAchievements } from "../entities/AllAchievements";

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
			expect(achievements.achievements.firstLetterY.name).toBe("Mythique");
			expect(achievements.achievements.firstLetterY.description).toBe(
				"Trouver la lettre Y en premier",
			);
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
			expect(achievements.achievements.streak5Days.name).toBe("Momentum");
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
			expect(achievements.achievements.firstLetterE.name).toBe("Élémentaire");
			expect(achievements.achievements.firstLetterE.description).toBe(
				"Trouver la lettre E en premier",
			);
		});
	});

	describe("Words 1000 achievement", () => {
		it("should not unlock when total words found is less than 500", () => {
			const session1: GameSession = {
				winAt: "2024-01-15",
				lettersFound: ["H", "E", "L", "L", "O"],
				wordsFound: 50
			};
			const session2: GameSession = {
				winAt: "2024-01-16",
				lettersFound: ["W", "O", "R", "L", "D"],
				wordsFound: 75
			};
			gameHistory = {
				"2024-01-15": session1,
				"2024-01-16": session2
			};
			const discoveryOrder: DiscoveryOrder = ["H", "E", "L", "L", "O"];
			const paragraphOfTheDay = "Hello world";

			const achievements = calculateAchievements(gameHistory, discoveryOrder, paragraphOfTheDay);

			expect(achievements.achievements.words1000.unlocked).toBe(false);
			expect(achievements.achievements.words1000.progress.current).toBe(125);
			expect(achievements.achievements.words1000.progress.target).toBe(500);
		});

		it("should unlock when total words found is exactly 500", () => {
			const session1: GameSession = {
				winAt: "2024-01-15",
				lettersFound: ["H", "E", "L", "L", "O"],
				wordsFound: 250
			};
			const session2: GameSession = {
				winAt: "2024-01-16",
				lettersFound: ["W", "O", "R", "L", "D"],
				wordsFound: 250
			};
			gameHistory = {
				"2024-01-15": session1,
				"2024-01-16": session2
			};
			const discoveryOrder: DiscoveryOrder = ["H", "E", "L", "L", "O"];
			const paragraphOfTheDay = "Hello world";

			const achievements = calculateAchievements(gameHistory, discoveryOrder, paragraphOfTheDay);

			expect(achievements.achievements.words1000.unlocked).toBe(true);
			expect(achievements.achievements.words1000.achievementId).toBe("words_1000");
			expect(achievements.achievements.words1000.name).toBe("Scribe");
			expect(achievements.achievements.words1000.description).toBe(
				"Déchiffrez 500 mots",
			);
			expect(achievements.achievements.words1000.progress.current).toBe(500);
			expect(achievements.achievements.words1000.progress.target).toBe(500);
		});

	});

	describe("First letter A achievement", () => {
		it("should unlock when A is the first letter found", () => {
			gameHistory = {
				"2024-01-15": ["A", "B", "C"]
			};
			const discoveryOrder: DiscoveryOrder = ["A", "B", "C"];
			const paragraphOfTheDay = "ABC world";

			const achievements = calculateAchievements(gameHistory, discoveryOrder, paragraphOfTheDay);

			expect(achievements.achievements.firstLetterA.unlocked).toBe(true);
			expect(achievements.achievements.firstLetterA.achievementId).toBe("first_letter_a");
			expect(achievements.achievements.firstLetterA.name).toBe("Aperçu");
		});
	});

	describe("First letter Q achievement", () => {
		it("should unlock when Q is the first letter found", () => {
			gameHistory = {
				"2024-01-15": ["Q", "U", "E", "S", "T"]
			};
			const discoveryOrder: DiscoveryOrder = ["Q", "U", "E", "S", "T"];
			const paragraphOfTheDay = "Quest world";

			const achievements = calculateAchievements(gameHistory, discoveryOrder, paragraphOfTheDay);

			expect(achievements.achievements.firstLetterQ.unlocked).toBe(true);
			expect(achievements.achievements.firstLetterQ.achievementId).toBe("first_letter_q");
			expect(achievements.achievements.firstLetterQ.name).toBe("Qualifié");
		});
	});

	describe("Alpha and Omega achievement", () => {
		it("should unlock when first and last letters match", () => {
			gameHistory = {
				"2024-01-15": ["A", "B", "C", "D", "Z"]
			};
			const discoveryOrder: DiscoveryOrder = ["A", "B", "C", "D", "Z"];
			const paragraphOfTheDay = "ABC DZ";

			const achievements = calculateAchievements(gameHistory, discoveryOrder, paragraphOfTheDay);

			expect(achievements.achievements.alphaAndOmega.unlocked).toBe(true);
		});
	});

	describe("Paleographer achievement", () => {
		it("should unlock when at least one game has no errors", () => {
			const session1: GameSession = {
				winAt: "2024-01-15",
				lettersFound: ["A", "B", "C"],
				hasErrors: true
			};
			const session2: GameSession = {
				winAt: "2024-01-16",
				lettersFound: ["D", "E", "F"],
				hasErrors: false
			};
			gameHistory = {
				"2024-01-15": session1,
				"2024-01-16": session2
			};
			const discoveryOrder: DiscoveryOrder = ["D", "E", "F"];
			const paragraphOfTheDay = "DEF";

			const achievements = calculateAchievements(gameHistory, discoveryOrder, paragraphOfTheDay);

			expect(achievements.achievements.paleographer.unlocked).toBe(true);
			expect(achievements.achievements.paleographer.achievementId).toBe("paleographer");
			expect(achievements.achievements.paleographer.name).toBe("Paléographe");
		});

		it("should not unlock when all games have errors", () => {
			const session1: GameSession = {
				winAt: "2024-01-15",
				lettersFound: ["A", "B", "C"],
				hasErrors: true
			};
			const session2: GameSession = {
				winAt: "2024-01-16",
				lettersFound: ["D", "E", "F"],
				hasErrors: true
			};
			gameHistory = {
				"2024-01-15": session1,
				"2024-01-16": session2
			};
			const discoveryOrder: DiscoveryOrder = ["D", "E", "F"];
			const paragraphOfTheDay = "DEF";

			const achievements = calculateAchievements(gameHistory, discoveryOrder, paragraphOfTheDay);

			expect(achievements.achievements.paleographer.unlocked).toBe(false);
		});

		it("should unlock for retrocompatibility when hasErrors is undefined", () => {
			const session1: GameSession = {
				winAt: "2024-01-15",
				lettersFound: ["A", "B", "C"]
			};
			gameHistory = {
				"2024-01-15": session1
			};
			const discoveryOrder: DiscoveryOrder = ["A", "B", "C"];
			const paragraphOfTheDay = "ABC";

			const achievements = calculateAchievements(gameHistory, discoveryOrder, paragraphOfTheDay);

			expect(achievements.achievements.paleographer.unlocked).toBe(true);
		});
	});

	describe("Preserving existing achievements", () => {
		it("should preserve unlocked achievements even if conditions are no longer met", () => {
			gameHistory = {};
			const discoveryOrder: DiscoveryOrder = [];
			const paragraphOfTheDay = "Hello world";

			const existingAchievements: AllAchievements = createAllAchievements(
				true, // firstGame
				true, // streak5Days
				{ current: 0, target: 5 },
				true, // firstLetterA
				true, // firstLetterE
				true, // firstLetterY
				true, // wordInOrder
				true, // alphaAndOmega
				true, // firstLetterQ
				true, // words1000
				{ current: 0, target: 500 },
				true, // completeAlphabet
				{ current: 0, target: 26 },
				true, // paleographer
				"2024-01-01T00:00:00.000Z"
			);

			const achievements = calculateAchievements(gameHistory, discoveryOrder, paragraphOfTheDay, existingAchievements);

			expect(achievements.achievements.firstGame.unlocked).toBe(true);
			expect(achievements.achievements.streak5Days.unlocked).toBe(true);
			expect(achievements.achievements.firstLetterA.unlocked).toBe(true);
			expect(achievements.achievements.firstLetterE.unlocked).toBe(true);
			expect(achievements.achievements.firstLetterY.unlocked).toBe(true);
			expect(achievements.achievements.wordInOrder.unlocked).toBe(true);
			expect(achievements.achievements.alphaAndOmega.unlocked).toBe(true);
			expect(achievements.achievements.firstLetterQ.unlocked).toBe(true);
			expect(achievements.achievements.words1000.unlocked).toBe(true);
			expect(achievements.achievements.completeAlphabet.unlocked).toBe(true);
			expect(achievements.achievements.paleographer.unlocked).toBe(true);
		});
	});
});
