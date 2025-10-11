import { characterEquals } from "./characterEquals";
import type { PlayerCipher } from "../types/PlayerCipher";
import type { LetterSelection } from "../types/LetterSelection";
import type { SymbolSelection } from "../types/SymbolSelection";

export const isLetterMatched = (
	character: string,
	_selectedLetter: LetterSelection,
	selectedSymbol: SymbolSelection,
	playerCipher: PlayerCipher
): boolean => {
	if (selectedSymbol !== null) {
		for (const [initialChar, decodedChar] of playerCipher.entries()) {
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
