import type { GameContext } from "../contexts/GameContext";
import { formatDate } from "../utils/formatDate";
import { getCurrentGameDay } from "../utils/getCurrentGameDay";

export const decrementDay = (context: GameContext): void => {
	const { allGamesRepository, dayRepository, discoveryOrderRepository } = context;
	const currentDay = dayRepository.getDay();
	const date = new Date(currentDay);
	date.setDate(date.getDate() - 1);
	const newDay = formatDate(date);
	
	// Réinitialiser l'état du jeu pour le mode développement
	const allGames = allGamesRepository.get();
	const gameDay = getCurrentGameDay(allGames, currentDay);
	const playerCipher = allGames.gameByDay[gameDay]?.playerCipher ?? {};
	
	Object.keys(playerCipher).forEach((letter) => {
		const { letterSelection, symbolSelection } = allGames.gameByDay[gameDay] ?? {};
		const updatedGameData = {
			letterSelection: letterSelection ?? null,
			symbolSelection: symbolSelection ?? null,
			playerCipher: { ...playerCipher },
		};
		delete updatedGameData.playerCipher[letter];
		allGamesRepository.upsertByDay(gameDay, updatedGameData);
	});
	
	// Clear the selections
	const gameData = allGames.gameByDay[gameDay] ?? {
		letterSelection: null,
		symbolSelection: null,
		playerCipher: {},
	};
	allGamesRepository.upsertByDay(gameDay, {
		...gameData,
		letterSelection: null,
		symbolSelection: null,
	});
	
	// Réinitialiser le discoveryOrder pour le nouveau jour
	discoveryOrderRepository.setDiscoveryOrder(newDay, []);
	
	// Changer de jour en dernier
	dayRepository.setDay(newDay);
};

