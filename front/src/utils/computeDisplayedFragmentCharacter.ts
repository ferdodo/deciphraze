import type { CellType } from "../types/CellType";
import { normalizeWord } from "@deciphraze/core";
import { getEncodedCharacter } from "./getEncodedCharacter";
import { isDev } from "./isDev";

export function computeDisplayedFragmentCharacter(
	character: string,
	cellType: CellType,
	sanitizedCharacter: string,
	cipher: string[]
): string {
	if (cellType === "letter") {
		return sanitizedCharacter;
	}

	if (isDev()) {
		return normalizeWord(character).toUpperCase();
	}

	return getEncodedCharacter(character, cipher);
}


