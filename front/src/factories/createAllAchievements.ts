import type { AllAchievements } from "@deciphraze/core";
import { defaultAchievements } from "../constants/defaultAchievements";

export function createAllAchievements(
	firstGameUnlocked: boolean = false,
	streak5DaysUnlocked: boolean = false,
	streak5DaysProgress: { current: number; target: 3 } = { current: 0, target: 3 },
	firstLetterAUnlocked: boolean = false,
	firstLetterEUnlocked: boolean = false,
	firstLetterYUnlocked: boolean = false,
	firstLetterQUnlocked: boolean = false,
	words1000Unlocked: boolean = false,
	words1000Progress: { current: number; target: 500 } = { current: 0, target: 500 },
	paleographerUnlocked: boolean = false,
	doubletUnlocked: boolean = false,
	computedAtDate: string = new Date().toISOString()
): AllAchievements {
	return {
		computedAtDate,
		achievements: {
			firstGame: {
				...defaultAchievements.achievements.firstGame,
				unlocked: firstGameUnlocked
			},
			streak5Days: {
				...defaultAchievements.achievements.streak5Days,
				unlocked: streak5DaysUnlocked,
				progress: streak5DaysProgress
			},
			firstLetterA: {
				...defaultAchievements.achievements.firstLetterA,
				unlocked: firstLetterAUnlocked
			},
			firstLetterE: {
				...defaultAchievements.achievements.firstLetterE,
				unlocked: firstLetterEUnlocked
			},
			firstLetterY: {
				...defaultAchievements.achievements.firstLetterY,
				unlocked: firstLetterYUnlocked
			},
			firstLetterQ: {
				...defaultAchievements.achievements.firstLetterQ,
				unlocked: firstLetterQUnlocked
			},
			words1000: {
				...defaultAchievements.achievements.words1000,
				unlocked: words1000Unlocked,
				progress: words1000Progress
			},
			paleographer: {
				...defaultAchievements.achievements.paleographer,
				unlocked: paleographerUnlocked
			},
			doublet: {
				...defaultAchievements.achievements.doublet,
				unlocked: doubletUnlocked
			}
		}
	};
}
