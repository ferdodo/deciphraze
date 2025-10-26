import { normalizeWord } from "../utils/normalizeWord";
import { isAlphabetic } from "../utils/isAlphabetic";
import type { GameContextType } from "../types/GameContextType";

export const selectLetter = (
	character: string,
	context: GameContextType,
): void => {
	const {
		letterSelectionRepository,
		symbolSelectionRepository,
		playerCipherRepository,
	} = context;
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
