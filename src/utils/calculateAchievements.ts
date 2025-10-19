import type { GameHistory } from "../types/GameHistory";
import type { AllAchievements } from "../types/AllAchievements";
import { calculateMaxStreak } from "./calculateMaxStreak";
import { calculateCurrentStreak } from "./calculateCurrentStreak";
import { defaultAchievements } from "../constants/defaultAchievements";

export function calculateAchievements(gameHistory: GameHistory): AllAchievements {
	const computedAtDate = new Date().toISOString();
	
	const achievements: AllAchievements = {
		computedAtDate,
		achievements: {
			firstGame: {
				...defaultAchievements.achievements.firstGame,
				unlocked: Object.keys(gameHistory).length > 0
			},
			streak5Days: {
				...defaultAchievements.achievements.streak5Days,
				unlocked: calculateMaxStreak(gameHistory) >= 5,
				progress: {
					current: calculateCurrentStreak(gameHistory, 0),
					target: 5
				}
			}
		}
	};

	return achievements;
}
