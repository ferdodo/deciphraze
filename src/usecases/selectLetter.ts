import { normalizeWord } from "../utils/normalizeWord";
import { isAlphabetic } from "../utils/isAlphabetic";
import { isWin } from "../utils/isWin";
import type { GameContext } from "../contexts/GameContext";

export const selectLetter = (
	character: string,
	context: GameContext,
): void => {
	const {
		letterSelectionRepository,
		symbolSelectionRepository,
		playerCipherRepository,
		paragraphOfTheDayRepository,
	} = context;
	
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

	if (currentLetter === normalizedCharacter) {
		playerCipherRepository.removePlayerCipherEntryByLetter(normalizedCharacter);
		letterSelectionRepository.selectLetter(null);
		return;
	}

	if (currentSymbol !== null) {
		playerCipherRepository.addPlayerCipherEntry(normalizedCharacter, currentSymbol);
		letterSelectionRepository.selectLetter(null);
		symbolSelectionRepository.selectSymbol(null);
		return;
	}

	letterSelectionRepository.selectLetter(normalizedCharacter);
};
