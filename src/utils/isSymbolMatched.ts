import { characterEquals } from "./characterEquals";
import type { PlayerCipher } from "../types/PlayerCipher";
import type { LetterSelection } from "../types/LetterSelection";

export const isSymbolMatched = (
	character: string,
	selectedLetter: LetterSelection,
	playerCipherMap: PlayerCipher
): boolean => {
	if (selectedLetter !== null) {
		const decodedChar = playerCipherMap.get(selectedLetter);

		if (
			decodedChar !== undefined &&
			characterEquals(decodedChar, character)
		) {
			return true;
		}
	}
	return false;
};
