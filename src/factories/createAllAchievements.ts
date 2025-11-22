import type { AllAchievements } from "../types/AllAchievements";
import { defaultAchievements } from "../constants/defaultAchievements";

export function createAllAchievements(
	firstGameUnlocked: boolean = false,
	streak5DaysUnlocked: boolean = false,
	streak5DaysProgress: { current: number; target: 5 } = { current: 0, target: 5 },
	firstLetterAUnlocked: boolean = false,
	wordInOrderUnlocked: boolean = false,
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
			wordInOrder: {
				...defaultAchievements.achievements.wordInOrder,
				unlocked: wordInOrderUnlocked
			}
		}
	};
}
