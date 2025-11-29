import type { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { isWin } from "../utils/isWin";
import type { PlayerCipher } from "../types/PlayerCipher";
import type { GameContextType } from "../types/GameContextType";
import { countWordsInParagraph } from "../utils/countWordsInParagraph";

export function updateStatistics(context: GameContextType): Subscription {
	const {
		playerCipherRepository,
		paragraphOfTheDayRepository,
		dayRepository,
		statisticsRepository,
		discoveryOrderRepository,
	} = context;

	let lastWinDate: string | null = null;

	return playerCipherRepository.playerCipher$.pipe(
		filter((playerCipher: PlayerCipher) => {
			const paragraphOfTheDay = paragraphOfTheDayRepository.getParagraphOfTheDay();
			return isWin(playerCipher, paragraphOfTheDay);
		})
	).subscribe(() => {
		const currentDay = dayRepository.getDay();
		const paragraphOfTheDay = paragraphOfTheDayRepository.getParagraphOfTheDay();
		
		// Éviter de compter plusieurs fois la même victoire dans la même journée
		if (lastWinDate === currentDay) {
			return;
		}
		lastWinDate = currentDay;

		const currentStats = statisticsRepository.getStatistics();
		const wordsInParagraph = countWordsInParagraph(paragraphOfTheDay);

		// Récupérer l'ordre de découverte des lettres pour cette partie
		const discoveryOrder = discoveryOrderRepository.getDiscoveryOrder(currentDay);
		// Prendre les 5 premières lettres
		const firstFiveLetters = discoveryOrder.slice(0, 5);

		// Calculer les nouvelles statistiques
		const newTotalGames = currentStats.totalGames + 1;
		const newTotalWordsFound = currentStats.totalWordsFound + wordsInParagraph;
		const newAverageWordsPerGame = newTotalGames > 0 ? newTotalWordsFound / newTotalGames : 0;
		
		// Mettre à jour les dates
		const newFirstGameDate = currentStats.firstGameDate || currentDay;
		const newLastGameDate = currentDay;

		// Ajouter les 5 premières lettres de cette partie
		const newLetterPositions = [...currentStats.letterPositions, firstFiveLetters];

		// Sauvegarder les nouvelles statistiques
		statisticsRepository.saveStatistics({
			totalGames: newTotalGames,
			totalWordsFound: newTotalWordsFound,
			firstGameDate: newFirstGameDate,
			lastGameDate: newLastGameDate,
			averageWordsPerGame: newAverageWordsPerGame,
			letterPositions: newLetterPositions,
			lastUpdated: new Date().toISOString()
		});
	});
}

