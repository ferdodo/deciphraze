import { characterEquals } from "./characterEquals";
import { isAlphabetic } from "./isAlphabetic";
import type { PlayerCipher } from "../types/PlayerCipher";
import type { CellType } from "../types/CellType";

export const computeCellType = (character: string, playerCipherMap: PlayerCipher): CellType => {
	if (!isAlphabetic(character)) {
		return "letter";
	}
	
	for (const [, decodedValue] of playerCipherMap.entries()) {
		if (characterEquals(character, decodedValue)) {
			return "letter";
		}
	}
	return "symbol";
};
