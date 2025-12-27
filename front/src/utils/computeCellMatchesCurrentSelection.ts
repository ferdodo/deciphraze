import { characterEquals } from "./characterEquals";
import type { PlayerCipher } from "../entities/PlayerCipher";
import type { LetterSelection } from "../entities/LetterSelection";
import type { SymbolSelection } from "../entities/SymbolSelection";
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
