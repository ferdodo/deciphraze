import { characterEquals } from "./characterEquals";
import type { PlayerCipher } from "../entities/PlayerCipher";
import type { LetterSelection } from "../entities/LetterSelection";

export const isSymbolMatched = (
	character: string,
	selectedLetter: LetterSelection,
	playerCipherMap: PlayerCipher
): boolean => {
	if (selectedLetter !== null) {
		const decodedChar = playerCipherMap[selectedLetter];

		if (decodedChar !== undefined && characterEquals(decodedChar, character)) {
			return true;
		}
	}
	return false;
};
