import type { AllAchievements } from "../types/AllAchievements";

export const defaultAchievements: AllAchievements = {
	computedAtDate: "2024-01-01T00:00:00.000Z",
	achievements: {
		firstGame: {
			achievementId: "first_game",
			name: "Preambule",
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
		firstLetterE: {
			achievementId: "first_letter_e",
			name: "Commencer par E",
			description: "Trouver la lettre E en premier",
			unlocked: false
		},
		firstLetterY: {
			achievementId: "first_letter_y",
			name: "Commencer par Y",
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
			name: "Commencer par Q",
			description: "Trouver la lettre Q en premier",
			unlocked: false
		},
		words1000: {
			achievementId: "words_1000",
			name: "Mille mots",
			description: "Trouver 1000 mots de manière cumulative",
			unlocked: false,
			progress: {
				current: 0,
				target: 1000
			}
		},
		completeAlphabet: {
			achievementId: "complete_alphabet",
			name: "Alphabet complet",
			description: "Trouver toutes les lettres de l'alphabet",
			unlocked: false,
			progress: {
				current: 0,
				target: 26
			}
		}
	}
};
