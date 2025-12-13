import type { GameContext } from "../contexts/GameContext";
import { formatDate } from "../utils/formatDate";

export const incrementDay = (context: GameContext): void => {
	const currentDay = context.dayRepository.getDay();
	const date = new Date(currentDay);
	date.setDate(date.getDate() + 1);
	const newDay = formatDate(date);
	context.dayRepository.setDay(newDay);
	context.discoveryOrderRepository.setDiscoveryOrder(newDay, []);
	
	// Réinitialiser l'état du jeu pour le mode développement
	context.letterSelectionRepository.selectLetter(null);
	context.symbolSelectionRepository.selectSymbol(null);
	
	const playerCipher = context.playerCipherRepository.getPlayerCipher();
	Object.keys(playerCipher).forEach((letter) => {
		context.playerCipherRepository.removePlayerCipherEntryByLetter(letter);
	});
};

