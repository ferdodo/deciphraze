import { isAlphabetic } from "./isAlphabetic";
import { normalizeWord } from "./normalizeWord";
import type { PlayerCipher } from "../types/PlayerCipher";

export function letterFound(letter: string, playerCipher: PlayerCipher): boolean {
	if (!isAlphabetic(letter)) {
		return true;
	}

	let encodedWithPlayerCipher = null;

	for (const [key, value] of Object.entries(playerCipher)) {
		if (
			normalizeWord(value).toUpperCase() === normalizeWord(letter).toUpperCase()
		) {
			encodedWithPlayerCipher = key;
		}
	}

	return normalizeWord(letter).toUpperCase() === encodedWithPlayerCipher;
}
