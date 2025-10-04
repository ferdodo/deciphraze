import type { LetterSelection } from "../types/LetterSelection";
import type { SymbolSelection } from "../types/SymbolSelection";
import type { PlayerCipher } from "../types/PlayerCipher";
import { normalizeWord } from "../utils/normalizeWord";
import { isAlphabetic } from "../utils/isAlphabetic";

export const selectSymbol = (
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

	// Si on clique sur le même symbole, on le désélectionne
	if (currentSymbol === normalizedCharacter) {
		playerCipher.removePlayerCipherEntryByValue(character);
		symbolSelection.selectSymbol(null);
		return;
	}

	// Si une lettre est déjà sélectionnée, créer l'association
	if (currentLetter !== null) {
		playerCipher.addPlayerCipherEntry(currentLetter, normalizedCharacter);
		letterSelection.selectLetter(null);
		symbolSelection.selectSymbol(null);
		return;
	}

	// Sinon, juste sélectionner le symbole
	symbolSelection.selectSymbol(normalizedCharacter);
};
