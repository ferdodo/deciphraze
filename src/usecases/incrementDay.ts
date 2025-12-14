import type { GameContext } from "../contexts/GameContext";
import { formatDate } from "../utils/formatDate";

export const incrementDay = (context: GameContext): void => {
	const currentDay = context.dayRepository.getDay();
	const date = new Date(currentDay);
	date.setDate(date.getDate() + 1);
	const newDay = formatDate(date);
	
	// Réinitialiser les statistiques AVANT de changer de jour
	const defaultStats = {
		totalGames: 0,
		totalWordsFound: 0,
		firstGameDate: null,
		lastGameDate: null,
		averageWordsPerGame: 0,
		letterPositions: [],
		lastUpdated: new Date().toISOString()
	};
	context.statisticsRepository.saveStatistics(defaultStats);
	
	// Réinitialiser l'état du jeu pour le mode développement
	context.letterSelectionRepository.selectLetter(null);
	context.symbolSelectionRepository.selectSymbol(null);
	
	const playerCipher = context.playerCipherRepository.getPlayerCipher();
	Object.keys(playerCipher).forEach((letter) => {
		context.playerCipherRepository.removePlayerCipherEntryByLetter(letter);
	});
	
	// Réinitialiser le discoveryOrder pour le nouveau jour
	context.discoveryOrderRepository.setDiscoveryOrder(newDay, []);
	
	// Changer de jour en dernier
	context.dayRepository.setDay(newDay);
};

