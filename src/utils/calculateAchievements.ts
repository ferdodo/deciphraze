import type { GameHistory } from "../types/GameHistory";
import type { AllAchievements } from "../types/AllAchievements";
import type { DiscoveryOrder } from "../types/DiscoveryOrder";
import { calculateMaxStreak } from "./calculateMaxStreak";
import { calculateCurrentStreak } from "./calculateCurrentStreak";
import { createAllAchievements } from "../factories/createAllAchievements";
import { isFirstLetterFoundA } from "./isFirstLetterFoundA";
import { isFirstLetterFoundE } from "./isFirstLetterFoundE";
import { isFirstLetterFoundY } from "./isFirstLetterFoundY";
import { isWordFoundInOrder } from "./isWordFoundInOrder";
import { isAlphaAndOmega } from "./isAlphaAndOmega";
import { isFirstLetterFoundQ } from "./isFirstLetterFoundQ";
import { calculateTotalWordsFound } from "./calculateTotalWordsFound";

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
	const firstLetterEUnlocked = isFirstLetterFoundE(discoveryOrder);
	const firstLetterYUnlocked = isFirstLetterFoundY(discoveryOrder);
	const wordInOrderUnlocked = isWordFoundInOrder(paragraphOfTheDay, discoveryOrder);
	const alphaAndOmegaUnlocked = isAlphaAndOmega(paragraphOfTheDay, discoveryOrder);
	const firstLetterQUnlocked = isFirstLetterFoundQ(discoveryOrder);
	
	const totalWordsFound = calculateTotalWordsFound(gameHistory);
	const words1000Unlocked = totalWordsFound >= 1000;
	const words1000Progress = {
		current: totalWordsFound,
		target: 1000 as const
	};

	return createAllAchievements(
		firstGameUnlocked,
		streak5DaysUnlocked,
		streak5DaysProgress,
		firstLetterAUnlocked,
		firstLetterEUnlocked,
		firstLetterYUnlocked,
		wordInOrderUnlocked,
		alphaAndOmegaUnlocked,
		firstLetterQUnlocked,
		words1000Unlocked,
		words1000Progress
	);
}
