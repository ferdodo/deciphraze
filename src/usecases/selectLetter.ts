import { normalizeWord } from "../utils/normalizeWord";
import { isAlphabetic } from "../utils/isAlphabetic";
import { SelectionContext } from "../types/SelectionContext";

export const selectLetter = (
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
