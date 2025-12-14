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
	paragraphOfTheDay: string,
	existingAchievements?: AllAchievements
): AllAchievements {
	const calculatedFirstGameUnlocked = Object.keys(gameHistory).length > 0;
	const calculatedStreak5DaysUnlocked = calculateMaxStreak(gameHistory) >= 5;
	const streak5DaysProgress = {
		current: calculateCurrentStreak(gameHistory, 0),
		target: 5 as const
	};
	
	const calculatedFirstLetterAUnlocked = isFirstLetterFoundInHistory(gameHistory, "A");
	const calculatedFirstLetterEUnlocked = isFirstLetterFoundInHistory(gameHistory, "E");
	const calculatedFirstLetterYUnlocked = isFirstLetterFoundInHistory(gameHistory, "Y");
	const calculatedWordInOrderUnlocked = isWordFoundInOrder(paragraphOfTheDay, discoveryOrder);
	const calculatedAlphaAndOmegaUnlocked = isAlphaAndOmega(paragraphOfTheDay, discoveryOrder);
	const calculatedFirstLetterQUnlocked = isFirstLetterFoundInHistory(gameHistory, "Q");
	
	const totalWordsFound = calculateTotalWordsFound(gameHistory);
	const calculatedWords1000Unlocked = totalWordsFound >= 1000;
	const words1000Progress = {
		current: totalWordsFound,
		target: 1000 as const
	};
	const { unlocked: calculatedCompleteAlphabetUnlocked, progress: completeAlphabetProgress } = hasFoundAllAlphabetLetters(gameHistory);

	// Préserver les succès déjà débloqués
	const firstGameUnlocked = existingAchievements?.achievements.firstGame.unlocked || calculatedFirstGameUnlocked;
	const streak5DaysUnlocked = existingAchievements?.achievements.streak5Days.unlocked || calculatedStreak5DaysUnlocked;
	const firstLetterAUnlocked = existingAchievements?.achievements.firstLetterA.unlocked || calculatedFirstLetterAUnlocked;
	const firstLetterEUnlocked = existingAchievements?.achievements.firstLetterE.unlocked || calculatedFirstLetterEUnlocked;
	const firstLetterYUnlocked = existingAchievements?.achievements.firstLetterY.unlocked || calculatedFirstLetterYUnlocked;
	const wordInOrderUnlocked = existingAchievements?.achievements.wordInOrder.unlocked || calculatedWordInOrderUnlocked;
	const alphaAndOmegaUnlocked = existingAchievements?.achievements.alphaAndOmega.unlocked || calculatedAlphaAndOmegaUnlocked;
	const firstLetterQUnlocked = existingAchievements?.achievements.firstLetterQ.unlocked || calculatedFirstLetterQUnlocked;
	const words1000Unlocked = existingAchievements?.achievements.words1000.unlocked || calculatedWords1000Unlocked;
	const completeAlphabetUnlocked = existingAchievements?.achievements.completeAlphabet.unlocked || calculatedCompleteAlphabetUnlocked;

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
