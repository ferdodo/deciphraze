import { normalizeWord } from "../utils/normalizeWord";
import { isAlphabetic } from "../utils/isAlphabetic";
import { isWin } from "../utils/isWin";
import { getParagraphOfTheDay } from "../utils/getParagraphOfTheDay";
import type { GameContext } from "../contexts/GameContext";

export const selectLetter = (
	character: string,
	context: GameContext,
): void => {
	const {
		letterSelectionRepository,
		symbolSelectionRepository,
		playerCipherRepository,
		dayRepository,
		gameHistoryRepository,
	} = context;
	
	const currentDay = dayRepository.getDay();
	const paragraphOfTheDay = getParagraphOfTheDay(currentDay);
	const playerCipher = playerCipherRepository.getPlayerCipher();
	const gameHistory = gameHistoryRepository.getHistory();

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
