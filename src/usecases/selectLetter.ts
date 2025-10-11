import type { LetterSelectionRepository } from "../types/LetterSelectionRepository";
import type { SymbolSelectionRepository } from "../types/SymbolSelectionRepository";
import type { PlayerCipherRepository } from "../types/PlayerCipherRepository";
import { normalizeWord } from "../utils/normalizeWord";
import { isAlphabetic } from "../utils/isAlphabetic";

export const selectLetter = (
	character: string,
	letterSelection: LetterSelectionRepository,
	symbolSelection: SymbolSelectionRepository,
	playerCipher: PlayerCipherRepository,
) => {
	if (!isAlphabetic(character)) {
		return;
	}

	const normalizedCharacter = normalizeWord(character).toUpperCase();
	const currentLetter = letterSelection.getLetterSelection();
	const currentSymbol = symbolSelection.getSymbolSelection();

	// Si on clique sur la même lettre, on la désélectionne
	if (currentLetter === normalizedCharacter) {
		playerCipher.removePlayerCipherEntryByLetter(normalizedCharacter);
		letterSelection.selectLetter(null);
		return;
	}

	// Si un symbole est déjà sélectionné, créer l'association
	if (currentSymbol !== null) {
		playerCipher.addPlayerCipherEntry(normalizedCharacter, currentSymbol);
		letterSelection.selectLetter(null);
		symbolSelection.selectSymbol(null);
		return;
	}

	// Sinon, juste sélectionner la lettre
	letterSelection.selectLetter(normalizedCharacter);
};
