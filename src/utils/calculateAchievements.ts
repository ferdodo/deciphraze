import type { GameHistory } from "../entities/GameHistory";
import type { AllAchievements } from "../entities/AllAchievements";
import type { DiscoveryOrder } from "../entities/DiscoveryOrder";
import { calculateMaxStreak } from "./calculateMaxStreak";
import { calculateCurrentStreak } from "./calculateCurrentStreak";
import { createAllAchievements } from "../factories/createAllAchievements";
import { isFirstLetterFoundInHistory } from "./isFirstLetterFoundInHistory";
import { isWordFoundInOrder } from "./isWordFoundInOrder";
import { isAlphaAndOmega } from "./isAlphaAndOmega";
import { calculateTotalWordsFound } from "./calculateTotalWordsFound";
import { hasFoundAllAlphabetLetters } from "./hasFoundAllAlphabetLetters";

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
	
	const firstLetterAUnlocked = isFirstLetterFoundInHistory(gameHistory, "A");
	const firstLetterEUnlocked = isFirstLetterFoundInHistory(gameHistory, "E");
	const firstLetterYUnlocked = isFirstLetterFoundInHistory(gameHistory, "Y");
	const wordInOrderUnlocked = isWordFoundInOrder(paragraphOfTheDay, discoveryOrder);
	const alphaAndOmegaUnlocked = isAlphaAndOmega(paragraphOfTheDay, discoveryOrder);
	const firstLetterQUnlocked = isFirstLetterFoundInHistory(gameHistory, "Q");
	
	const totalWordsFound = calculateTotalWordsFound(gameHistory);
	const words1000Unlocked = totalWordsFound >= 1000;
	const words1000Progress = {
		current: totalWordsFound,
		target: 1000 as const
	};
	const { unlocked: completeAlphabetUnlocked, progress: completeAlphabetProgress } = hasFoundAllAlphabetLetters(gameHistory);

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
		words1000Progress,
		completeAlphabetUnlocked,
		completeAlphabetProgress
	);
}
