import { isAlphabetic } from "./isAlphabetic";
import { normalizeWord } from "./normalizeWord";
import type { PlayerCipherRepository } from "../types/PlayerCipherRepository";

export function letterFound(letter: string, playerCipher: PlayerCipherRepository) {
	if (!isAlphabetic(letter)) {
		return true;
	}

	let encodedWithPlayerCipher = null;

	for (const [key, value] of playerCipher.getPlayerCipher().entries()) {
		if (
			normalizeWord(value).toUpperCase() === normalizeWord(letter).toUpperCase()
		) {
			encodedWithPlayerCipher = key;
		}
	}

	return normalizeWord(letter).toUpperCase() === encodedWithPlayerCipher;
}
