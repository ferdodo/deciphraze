import type { AllAchievements } from "@deciphraze/core";
import { defaultAchievements } from "../constants/defaultAchievements";

export function createAllAchievementsWithSomeUnlocked(): AllAchievements {
	return {
		computedAtDate: "2023-01-01",
		achievements: {
			firstGame: {
				...defaultAchievements.achievements.firstGame,
				unlocked: true
			},
			streak5Days: {
				...defaultAchievements.achievements.streak5Days,
				unlocked: false,
				progress: { current: 3, target: 3 }
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
				unlocked: true
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
				progress: { current: 250, target: 500 }
			},
			completeAlphabet: {
				...defaultAchievements.achievements.completeAlphabet,
				unlocked: false,
				progress: { current: 15, target: 26 }
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
			}
		},
	};
}
