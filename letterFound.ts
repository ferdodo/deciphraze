import { isAlphabetic } from "./isAlphabetic";
import { getPlayerCipher } from "./playerCipher";
import { normalizeWord } from "./normalizeWord";

export function letterFound(letter: string) {
	if (!isAlphabetic(letter)) {
		return true;
	};

	let encodedWithPlayerCipher = null;

	for (const [key, value] of getPlayerCipher().entries()) {
		if (normalizeWord(value).toUpperCase() === normalizeWord(letter).toUpperCase()) {
			encodedWithPlayerCipher = key;
		}
	}

	
	return normalizeWord(letter).toUpperCase() === encodedWithPlayerCipher;
}
