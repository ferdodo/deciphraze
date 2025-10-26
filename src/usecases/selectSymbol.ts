import { normalizeWord } from "../utils/normalizeWord";
import { isAlphabetic } from "../utils/isAlphabetic";
import type { GameContextType } from "../types/GameContextType";

export const selectSymbol = (
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
