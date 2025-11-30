import { characterEquals } from "./characterEquals";
import type { PlayerCipher } from "../entities/PlayerCipher";
import type { LetterSelection } from "../entities/LetterSelection";
import type { SymbolSelection } from "../entities/SymbolSelection";

export const isLetterMatched = (
	character: string,
	_selectedLetter: LetterSelection,
	selectedSymbol: SymbolSelection,
	playerCipher: PlayerCipher
): boolean => {
	if (selectedSymbol !== null) {
		for (const [initialChar, decodedChar] of Object.entries(playerCipher)) {
			if (
				characterEquals(initialChar, character) &&
				characterEquals(decodedChar, selectedSymbol)
			) {
				return true;
			}
		}
	}
	return false;
};
