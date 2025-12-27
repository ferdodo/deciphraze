import type { AllAchievements } from "../entities/AllAchievements";

export const defaultAchievements: AllAchievements = {
	computedAtDate: "2024-01-01T00:00:00.000Z",
	achievements: {
		firstGame: {
			achievementId: "first_game",
			name: "Préambule",
			description: "Jouer votre première partie",
			unlocked: false
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
			description: "Trouver respectivement la première lettre du paragraphe en premier et la dernière lettre en dernier",
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
			description: "Déchiffrez 500 mots",
			unlocked: false,
			progress: {
				current: 0,
				target: 500
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
		},
		paleographer: {
			achievementId: "paleographer",
			name: "Paléographe",
			description: "Compléter une partie sans erreur d'association",
			unlocked: false
		},
		allVowelsInSequence: {
			achievementId: "all_vowels_in_sequence",
			name: "Vocaliste",
			description: "Trouver toutes les voyelles à la suite",
			unlocked: false
		}
	}
};
