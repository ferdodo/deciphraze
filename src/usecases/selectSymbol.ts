import { normalizeWord } from "../utils/normalizeWord";
import { isAlphabetic } from "../utils/isAlphabetic";
import { isWin } from "../utils/isWin";
import type { GameContext } from "../contexts/GameContext";

export const selectSymbol = (
	character: string,
	context: GameContext,
): void => {
	const {
		letterSelectionRepository,
		symbolSelectionRepository,
		playerCipherRepository,
		paragraphOfTheDayRepository,
	} = context;
	
	// Vérifier si la partie est gagnée avant toute action
	const paragraphOfTheDay = paragraphOfTheDayRepository.getParagraphOfTheDay();
	const playerCipher = playerCipherRepository.getPlayerCipher();
	const currentDay = context.dayRepository.getDay();
	const gameHistory = context.gameHistoryRepository.getHistory();
	if (isWin(playerCipher, paragraphOfTheDay, gameHistory, currentDay)) {
		return;
	}
	
	if (!isAlphabetic(character)) {
		return;
	}

	const normalizedCharacter = normalizeWord(character).toUpperCase();
	const currentLetter = letterSelectionRepository.getLetterSelection();
	const currentSymbol = symbolSelectionRepository.getSymbolSelection();

	if (currentSymbol === normalizedCharacter) {
		playerCipherRepository.removePlayerCipherEntryByValue(normalizedCharacter);
		symbolSelectionRepository.selectSymbol(null);
		return;
	}

	if (currentLetter !== null) {
		playerCipherRepository.addPlayerCipherEntry(currentLetter, normalizedCharacter);
		letterSelectionRepository.selectLetter(null);
		symbolSelectionRepository.selectSymbol(null);
		return;
	}

	symbolSelectionRepository.selectSymbol(normalizedCharacter);
};
