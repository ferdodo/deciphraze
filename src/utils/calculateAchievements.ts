import type { GameHistory } from "../types/GameHistory";
import type { AllAchievements } from "../types/AllAchievements";
import { calculateMaxStreak } from "./calculateMaxStreak";
import { calculateCurrentStreak } from "./calculateCurrentStreak";
import { createAllAchievements } from "../factories/createAllAchievements";

export function calculateAchievements(gameHistory: GameHistory): AllAchievements {
	const firstGameUnlocked = Object.keys(gameHistory).length > 0;
	const streak5DaysUnlocked = calculateMaxStreak(gameHistory) >= 5;
	const streak5DaysProgress = {
		current: calculateCurrentStreak(gameHistory, 0),
		target: 5 as const
	};

	return createAllAchievements(
		firstGameUnlocked,
		streak5DaysUnlocked,
		streak5DaysProgress
	);
}
