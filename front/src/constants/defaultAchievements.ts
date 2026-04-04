import type { AllAchievements } from "@deciphraze/core";

export const defaultAchievements: AllAchievements = {
	computedAtDate: "2024-01-01T00:00:00.000Z",
	achievements: {
		firstGame: {
			name: "Préambule",
			description: "Jouer votre première partie",
			unlocked: false
		},
		streak5Days: {
			name: "Momentum",
			description: "Réussir une partie 3 jours consécutifs",
			unlocked: false,
			progress: {
				current: 0,
				target: 3
			}
		},
		firstLetterA: {
			name: "Aperçu",
			description: "Trouver la lettre A en premier",
			unlocked: false
		},
		firstLetterE: {
			name: "Élémentaire",
			description: "Trouver la lettre E en premier",
			unlocked: false
		},
		firstLetterY: {
			name: "Mythique",
			description: "Trouver la lettre Y en premier",
			unlocked: false
		},
		firstLetterQ: {
			name: "Qualifié",
			description: "Trouver la lettre Q en premier",
			unlocked: false
		},
		words1000: {
			name: "Scribe",
			description: "Déchiffrez 500 mots",
			unlocked: false,
			progress: {
				current: 0,
				target: 500
			}
		},
		completeAlphabet: {
			name: "Lettré",
			description: "Trouver toutes les lettres de l'alphabet",
			unlocked: false,
			progress: {
				current: 0,
				target: 26
			}
		},
		paleographer: {
			name: "Paléographe",
			description: "Compléter une partie sans erreur d'association",
			unlocked: false
		},
		doublet: {
			name: "Doublet",
			description: "Trouver une double lettre en premier",
			unlocked: false
		}
	}
};
