import type { GameHistory } from "@deciphraze/core";
import type { AllAchievements } from "@deciphraze/core";
import type { DiscoveryOrder } from "@deciphraze/core";
import type { AssociationHistoryRepository } from "@deciphraze/core";
import { calculateMaxStreak } from "./calculateMaxStreak";
import { createAllAchievements } from "../factories/createAllAchievements";
import { isFirstLetterFoundInHistory } from "./isFirstLetterFoundInHistory";
import { calculateTotalWordsFound } from "./calculateTotalWordsFound";
import { calculatePaleographerUnlocked } from "./calculatePaleographerUnlocked";
import { hasStartingLetterDoubledInParagraph } from "./hasStartingLetterDoubledInParagraph";

export function calculateAchievements(
	gameHistory: GameHistory,
	discoveryOrder: DiscoveryOrder,
	paragraphOfTheDay: string,
	associationHistoryRepository: AssociationHistoryRepository,
	existingAchievements?: AllAchievements
): AllAchievements {
	const calculatedFirstGameUnlocked = Object.keys(gameHistory).length > 0;
	const calculatedStreak5DaysUnlocked = calculateMaxStreak(gameHistory) >= 3;
	const streak5DaysProgress = {
		current: 0,
		target: 3 as const
	};
	
	const calculatedFirstLetterAUnlocked = isFirstLetterFoundInHistory(gameHistory, "A");
	const calculatedFirstLetterEUnlocked = isFirstLetterFoundInHistory(gameHistory, "E");
	const calculatedFirstLetterYUnlocked = isFirstLetterFoundInHistory(gameHistory, "Y");
	const calculatedFirstLetterQUnlocked = isFirstLetterFoundInHistory(gameHistory, "Q");
	
	const totalWordsFound = calculateTotalWordsFound(gameHistory);
	const calculatedWords1000Unlocked = totalWordsFound >= 500;
	const words1000Progress = {
		current: totalWordsFound,
		target: 500 as const
	};
	
	const calculatedPaleographerUnlocked = calculatePaleographerUnlocked(gameHistory, associationHistoryRepository);
	const calculatedDoubletUnlocked = hasStartingLetterDoubledInParagraph(paragraphOfTheDay, discoveryOrder);

	// Préserver les succès déjà débloqués
	const firstGameUnlocked = existingAchievements?.achievements.firstGame.unlocked || calculatedFirstGameUnlocked;
	const streak5DaysUnlocked = existingAchievements?.achievements.streak5Days.unlocked || calculatedStreak5DaysUnlocked;
	const firstLetterAUnlocked = existingAchievements?.achievements.firstLetterA.unlocked || calculatedFirstLetterAUnlocked;
	const firstLetterEUnlocked = existingAchievements?.achievements.firstLetterE.unlocked || calculatedFirstLetterEUnlocked;
	const firstLetterYUnlocked = existingAchievements?.achievements.firstLetterY.unlocked || calculatedFirstLetterYUnlocked;
	const firstLetterQUnlocked = existingAchievements?.achievements.firstLetterQ.unlocked || calculatedFirstLetterQUnlocked;
	const words1000Unlocked = existingAchievements?.achievements.words1000.unlocked || calculatedWords1000Unlocked;
	const paleographerUnlocked = existingAchievements?.achievements.paleographer.unlocked || calculatedPaleographerUnlocked;
	const doubletUnlocked = existingAchievements?.achievements.doublet.unlocked || calculatedDoubletUnlocked;

	return createAllAchievements(
		firstGameUnlocked,
		streak5DaysUnlocked,
		streak5DaysProgress,
		firstLetterAUnlocked,
		firstLetterEUnlocked,
		firstLetterYUnlocked,
		firstLetterQUnlocked,
		words1000Unlocked,
		words1000Progress,
		paleographerUnlocked,
		doubletUnlocked
	);
}
