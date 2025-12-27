import { characterEquals } from "./characterEquals";
import { isAlphabetic } from "./isAlphabetic";
import type { PlayerCipher } from "../entities/PlayerCipher";
import type { CellType } from "../types/CellType";

export const computeCellType = (character: string, playerCipherMap: PlayerCipher): CellType => {
	if (!isAlphabetic(character)) {
		return "letter";
	}
	
	for (const [, decodedValue] of Object.entries(playerCipherMap)) {
		if (characterEquals(character, decodedValue)) {
			return "letter";
		}
	}
	return "symbol";
};
