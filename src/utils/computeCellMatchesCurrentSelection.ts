import { characterEquals } from "./characterEquals";
import type { PlayerCipher } from "../types/PlayerCipher";
import type { LetterSelection } from "../types/LetterSelection";
import type { SymbolSelection } from "../types/SymbolSelection";
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
