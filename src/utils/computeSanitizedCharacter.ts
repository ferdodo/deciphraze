import { characterEquals } from "./characterEquals";
import { normalizeWord } from "./normalizeWord";
import type { PlayerCipher } from "../types/PlayerCipher";
import type { CellType } from "../types/CellType";

export const computeSanitizedCharacter = (
	character: string, 
	playerCipherMap: PlayerCipher, 
	cellType: CellType
): string => {
	if (cellType === "letter") {
		for (const [key, decodedValue] of playerCipherMap.entries()) {
			if (characterEquals(character, decodedValue)) {
				return normalizeWord(key).toUpperCase();
			}
		}
	}
	return character;
};
