import { normalizeWord } from "../utils/normalizeWord";
import { isAlphabetic } from "../utils/isAlphabetic";
import { isWin } from "../utils/isWin";
import { getParagraphOfTheDay } from "../utils/getParagraphOfTheDay";
import { characterEquals } from "../utils/characterEquals";
import type { GameContext } from "../contexts/GameContext";

export const selectSymbol = (
	character: string,
	context: GameContext,
): void => {
	const {
		letterSelectionRepository,
		symbolSelectionRepository,
		playerCipherRepository,
		dayRepository,
		gameHistoryRepository,
		associationHistoryRepository,
	} = context;
	
	// Vérifier si la partie est gagnée avant toute action
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

	if (currentSymbol === normalizedCharacter) {
		playerCipherRepository.removePlayerCipherEntryByValue(normalizedCharacter);
		symbolSelectionRepository.selectSymbol(null);
		return;
	}

	if (currentLetter !== null) {
		const isCorrect = characterEquals(currentLetter, normalizedCharacter);
		playerCipherRepository.addPlayerCipherEntry(currentLetter, normalizedCharacter);
		associationHistoryRepository.addAssociation(currentDay, currentLetter, normalizedCharacter, isCorrect);
		letterSelectionRepository.selectLetter(null);
		symbolSelectionRepository.selectSymbol(null);
		return;
	}

	symbolSelectionRepository.selectSymbol(normalizedCharacter);
};
