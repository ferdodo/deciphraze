import type { AllAchievements } from "@deciphraze/core";
import { defaultAchievements } from "../constants/defaultAchievements";

export function createAllAchievementsForRepositoryTest(): AllAchievements {
	return {
		computedAtDate: "2024-01-01T00:00:00.000Z",
		achievements: {
			firstGame: {
				...defaultAchievements.achievements.firstGame,
				unlocked: true
			},
			streak5Days: {
				...defaultAchievements.achievements.streak5Days,
				unlocked: false,
				progress: { current: 0, target: 3 }
			},
			firstLetterA: {
				...defaultAchievements.achievements.firstLetterA,
				unlocked: true
			},
			firstLetterE: {
				...defaultAchievements.achievements.firstLetterE,
				unlocked: false
			},
			firstLetterY: {
				...defaultAchievements.achievements.firstLetterY,
				unlocked: false
			},
			wordInOrder: {
				...defaultAchievements.achievements.wordInOrder,
				unlocked: false
			},
			alphaAndOmega: {
				...defaultAchievements.achievements.alphaAndOmega,
				unlocked: false
			},
			firstLetterQ: {
				...defaultAchievements.achievements.firstLetterQ,
				unlocked: false
			},
			words1000: {
				...defaultAchievements.achievements.words1000,
				unlocked: false,
				progress: { current: 0, target: 500 }
			},
			completeAlphabet: {
				...defaultAchievements.achievements.completeAlphabet,
				unlocked: false,
				progress: { current: 0, target: 26 }
			},
			paleographer: {
				...defaultAchievements.achievements.paleographer,
				unlocked: false
			},
			allVowelsInSequence: {
				...defaultAchievements.achievements.allVowelsInSequence,
				unlocked: false
			},
			doublet: {
				...defaultAchievements.achievements.doublet,
				unlocked: false
			},
		},
	};
}
