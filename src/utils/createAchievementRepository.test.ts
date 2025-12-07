import { describe, it, expect } from "vitest";
import { createAchievementRepository } from "./createAchievementRepository";
import type { AllAchievements } from "../entities/AllAchievements";

describe("createAchievementRepository", () => {

	it("should save and load achievements", () => {
		const repository = createAchievementRepository();
		const achievements: AllAchievements = {
			computedAtDate: "2024-01-01T00:00:00.000Z",
			achievements: {
				firstGame: {
					achievementId: "first_game",
					name: "Préambule",
					description: "Jouer votre première partie",
					unlocked: true
				},
				streak5Days: {
					achievementId: "streak_5_days",
					name: "Momentum",
					description: "Réussir une partie 5 jours consécutifs",
					unlocked: false,
					progress: {
						current: 0,
						target: 5
					}
				},
				firstLetterA: {
					achievementId: "first_letter_a",
					name: "Aperçu",
					description: "Trouver la lettre A en premier",
					unlocked: false
				},
				firstLetterE: {
					achievementId: "first_letter_e",
					name: "Élémentaire",
					description: "Trouver la lettre E en premier",
					unlocked: false
				},
				firstLetterY: {
					achievementId: "first_letter_y",
					name: "Mythique",
					description: "Trouver la lettre Y en premier",
					unlocked: false
				},
				wordInOrder: {
					achievementId: "word_in_order",
					name: "Signature",
					description: "Trouver toutes les lettres d'un mot d'au moins 5 lettres dans l'ordre",
					unlocked: false
				},
				alphaAndOmega: {
					achievementId: "alpha_and_omega",
					name: "Synthèse",
					description: "Trouver respectivement la première lettre en premier et la dernière en dernier",
					unlocked: false
				},
				firstLetterQ: {
					achievementId: "first_letter_q",
					name: "Qualifié",
					description: "Trouver la lettre Q en premier",
					unlocked: false
				},
				words1000: {
					achievementId: "words_1000",
					name: "Scribe",
					description: "Trouver 1000 mots de manière cumulative",
					unlocked: false,
					progress: {
						current: 0,
						target: 1000
					}
				},
				completeAlphabet: {
					achievementId: "complete_alphabet",
					name: "Lettré",
					description: "Trouver toutes les lettres de l'alphabet",
					unlocked: false,
					progress: {
						current: 0,
						target: 26
					}
				}
			}
		};

		repository.saveAchievements(achievements);
		const loaded = repository.loadAchievements();

		expect(loaded.computedAtDate).toBe("2024-01-01T00:00:00.000Z");
		expect(loaded.achievements.firstGame.unlocked).toBe(true);
		expect(loaded.achievements.streak5Days.unlocked).toBe(false);
		expect(loaded.achievements.firstLetterA).toBeDefined();
		expect(loaded.achievements.firstLetterE).toBeDefined();
		expect(loaded.achievements.firstLetterY).toBeDefined();
		expect(loaded.achievements.wordInOrder).toBeDefined();
		expect(loaded.achievements.alphaAndOmega).toBeDefined();
		expect(loaded.achievements.firstLetterQ).toBeDefined();
		expect(loaded.achievements.words1000).toBeDefined();
		expect(loaded.achievements.completeAlphabet).toBeDefined();
	});

});

