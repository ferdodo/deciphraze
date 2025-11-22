import type { AllAchievements } from "../types/AllAchievements";

export const defaultAchievements: AllAchievements = {
	computedAtDate: "2024-01-01T00:00:00.000Z",
	achievements: {
		firstGame: {
			achievementId: "first_game",
			name: "Premier pas",
			description: "Jouer votre première partie",
			unlocked: false
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
		wordInOrder: {
			achievementId: "word_in_order",
			name: "D'un trait",
			description: "Trouver toutes les lettres d'un mot d'au moins 5 lettres dans l'ordre",
			unlocked: false
		},
		alphaAndOmega: {
			achievementId: "alpha_and_omega",
			name: "Alpha et Omega",
			description: "Trouver respectivement la première lettre en premier et la dernière en dernier",
			unlocked: false
		}
	}
};
