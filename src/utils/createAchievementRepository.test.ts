import { describe, it, expect } from "vitest";
import { createAchievementRepository } from "./createAchievementRepository";
import type { AllAchievements } from "../types/AllAchievements";

describe("createAchievementRepository", () => {

	it("should save and load achievements", () => {
		const repository = createAchievementRepository();
		const achievements: AllAchievements = {
			computedAtDate: "2024-01-01T00:00:00.000Z",
			achievements: {
				firstGame: {
					achievementId: "first_game",
					name: "Preambule",
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
				},
				firstLetterA: {
					achievementId: "first_letter_a",
					name: "Commencer par A",
					description: "Trouver la lettre A en premier",
					unlocked: false
				},
				firstLetterE: {
					achievementId: "first_letter_e",
					name: "Commencer par E",
					description: "Trouver la lettre E en premier",
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
					name: "Alpha et Omega",
					description: "Trouver respectivement la première lettre en premier et la dernière en dernier",
					unlocked: false
				},
				firstLetterQ: {
					achievementId: "first_letter_q",
					name: "Commencer par Q",
					description: "Trouver la lettre Q en premier",
					unlocked: false
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
		expect(achievements.computedAtDate).toBeDefined();
		expect(achievements.achievements.firstGame).toBeDefined();
		expect(achievements.achievements.streak5Days).toBeDefined();
		expect(achievements.achievements.firstLetterA).toBeDefined();
		expect(achievements.achievements.firstLetterE).toBeDefined();
		expect(achievements.achievements.wordInOrder).toBeDefined();
		expect(achievements.achievements.alphaAndOmega).toBeDefined();
		expect(achievements.achievements.firstLetterQ).toBeDefined();
	});


	it("should handle null localStorage", () => {
		localStorage.setItem("deciphraze_achievements", "null");
		const repository = createAchievementRepository();
		const achievements = repository.loadAchievements();
		
		expect(achievements).toBeDefined();
		expect(achievements.computedAtDate).toBeDefined();
		expect(achievements.achievements.firstGame).toBeDefined();
		expect(achievements.achievements.streak5Days).toBeDefined();
		expect(achievements.achievements.firstLetterA).toBeDefined();
		expect(achievements.achievements.firstLetterE).toBeDefined();
		expect(achievements.achievements.wordInOrder).toBeDefined();
		expect(achievements.achievements.alphaAndOmega).toBeDefined();
		expect(achievements.achievements.firstLetterQ).toBeDefined();
	});


});
