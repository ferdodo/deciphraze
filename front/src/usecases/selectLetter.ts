import { normalizeWord } from "../utils/normalizeWord";
import { isAlphabetic } from "../utils/isAlphabetic";
import { isWin } from "../utils/isWin";
import { generateParagraph } from "../utils/generateParagraph";
import { characterEquals } from "../utils/characterEquals";
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
		associationHistoryRepository,
	} = context;
	
	const currentDay = dayRepository.getDay();
	const paragraphOfTheDay = generateParagraph(currentDay);
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
		const isCorrect = characterEquals(normalizedCharacter, currentSymbol);
		playerCipherRepository.addPlayerCipherEntry(normalizedCharacter, currentSymbol);
		associationHistoryRepository.addAssociation(currentDay, normalizedCharacter, currentSymbol, isCorrect);
		letterSelectionRepository.selectLetter(null);
		symbolSelectionRepository.selectSymbol(null);
		return;
	}

	letterSelectionRepository.selectLetter(normalizedCharacter);
};
