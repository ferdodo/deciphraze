import { normalizeWord } from "../utils/normalizeWord";
import { isAlphabetic } from "../utils/isAlphabetic";
import type { SelectionContext } from "../types/SelectionContext";

export const selectSymbol = (
	character: string,
    {
		letterSelectionRepository,
		symbolSelectionRepository,
		playerCipherRepository,
	}: SelectionContext,
): void => {
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
