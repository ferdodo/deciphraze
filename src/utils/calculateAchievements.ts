import type { GameHistory } from "../types/GameHistory";
import type { AllAchievements } from "../types/AllAchievements";
import type { DiscoveryOrder } from "../types/DiscoveryOrder";
import { calculateMaxStreak } from "./calculateMaxStreak";
import { calculateCurrentStreak } from "./calculateCurrentStreak";
import { createAllAchievements } from "../factories/createAllAchievements";
import { isFirstLetterFoundA } from "./isFirstLetterFoundA";
import { isWordFoundInOrder } from "./isWordFoundInOrder";
import { isAlphaAndOmega } from "./isAlphaAndOmega";

export function calculateAchievements(
	gameHistory: GameHistory,
	discoveryOrder: DiscoveryOrder,
	paragraphOfTheDay: string
): AllAchievements {
	const firstGameUnlocked = Object.keys(gameHistory).length > 0;
	const streak5DaysUnlocked = calculateMaxStreak(gameHistory) >= 5;
	const streak5DaysProgress = {
		current: calculateCurrentStreak(gameHistory, 0),
		target: 5 as const
	};
	
	const firstLetterAUnlocked = isFirstLetterFoundA(discoveryOrder);
	const wordInOrderUnlocked = isWordFoundInOrder(paragraphOfTheDay, discoveryOrder);
	const alphaAndOmegaUnlocked = isAlphaAndOmega(paragraphOfTheDay, discoveryOrder);

	return createAllAchievements(
		firstGameUnlocked,
		streak5DaysUnlocked,
		streak5DaysProgress,
		firstLetterAUnlocked,
		wordInOrderUnlocked,
		alphaAndOmegaUnlocked
	);
}
