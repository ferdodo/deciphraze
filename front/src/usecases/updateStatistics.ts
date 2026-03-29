import type { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { isWin } from "../utils/isWin";
import { generateParagraph } from "../utils/generateParagraph";
import { subscribePlayerCipher } from "../utils/subscribePlayerCipher";
import type { PlayerCipher } from "../entities/PlayerCipher";
import type { GameContext } from "../contexts/GameContext";
import { countWordsInParagraph } from "../utils/countWordsInParagraph";
import { getCurrentGameDay } from "../utils/getCurrentGameDay";

export function updateStatistics(context: GameContext): Subscription {
	const {
		allGamesRepository,
		dayRepository,
		statisticsRepository,
		discoveryOrderRepository,
		gameHistoryRepository,
	} = context;

	let lastWinDate: string | null = null;

	return subscribePlayerCipher(allGamesRepository, dayRepository).pipe(
		filter((playerCipher: PlayerCipher) => {
			const currentDay = dayRepository.getRealTodaysDate();
			const allGames = allGamesRepository.get();
			const gameDay = getCurrentGameDay(allGames, currentDay);
			const paragraphOfTheDay = generateParagraph(gameDay);
			const gameHistory = gameHistoryRepository.getHistory();
			return isWin(playerCipher, paragraphOfTheDay, gameHistory, gameDay);
		})
	).subscribe(() => {
		const currentDay = dayRepository.getRealTodaysDate();
		const allGames = allGamesRepository.get();
		const gameDay = getCurrentGameDay(allGames, currentDay);
		const paragraphOfTheDay = generateParagraph(gameDay);
		
		// Éviter de compter plusieurs fois la même victoire dans la même journée
		if (lastWinDate === gameDay) {
			return;
		}
		lastWinDate = gameDay;

		const currentStats = statisticsRepository.getStatistics();
		const wordsInParagraph = countWordsInParagraph(paragraphOfTheDay);

		// Récupérer l'ordre de découverte des lettres pour cette partie
		const discoveryOrder = discoveryOrderRepository.getDiscoveryOrder(gameDay);
		// Prendre les 5 premières lettres
		const firstFiveLetters = discoveryOrder.slice(0, 5);

		// Calculer les nouvelles statistiques
		const newTotalGames = currentStats.totalGames + 1;
		const newTotalWordsFound = currentStats.totalWordsFound + wordsInParagraph;
		const newAverageWordsPerGame = newTotalGames > 0 ? newTotalWordsFound / newTotalGames : 0;
		
		// Mettre à jour les dates
		const newFirstGameDate = currentStats.firstGameDate || gameDay;
		const newLastGameDate = gameDay;

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
			lastUpdated: gameDay
		});
	});
}

