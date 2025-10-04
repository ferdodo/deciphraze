import type { LetterSelection } from "../types/LetterSelection";
import type { SymbolSelection } from "../types/SymbolSelection";
import type { PlayerCipher } from "../types/PlayerCipher";
import { normalizeWord } from "../utils/normalizeWord";
import { isAlphabetic } from "../utils/isAlphabetic";

export const selectLetter = (
	character: string,
	letterSelection: LetterSelection,
	symbolSelection: SymbolSelection,
	playerCipher: PlayerCipher,
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
