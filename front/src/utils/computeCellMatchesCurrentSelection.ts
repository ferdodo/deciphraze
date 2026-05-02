import { characterEquals } from "./characterEquals";
import type { PlayerCipher } from "@deciphraze/core";
import type { LetterSelection } from "@deciphraze/core";
import type { SymbolSelection } from "@deciphraze/core";
import type { CellType } from "../types/CellType";

export const computeCellMatchesCurrentSelection = (
	character: string,
	_playerCipherMap: PlayerCipher,
	selectedLetter: LetterSelection,
	selectedSymbol: SymbolSelection,
	cellType: CellType,
	sanitizedCharacter: string
): boolean => {
	if (cellType === "letter") {
		if (selectedLetter !== null) {
			return characterEquals(sanitizedCharacter, selectedLetter);
		}
	} else if (cellType === "symbol") {
		if (selectedSymbol !== null) {
			return characterEquals(character, selectedSymbol);
		}
	}
	
	return false;
};
