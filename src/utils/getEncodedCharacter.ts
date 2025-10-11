import { normalizeWord } from "./normalizeWord";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function getEncodedCharacter(character: string, cipher: string[]) {
	const normalizedCharacter = normalizeWord(character).toUpperCase()
	const position = cipher.indexOf(normalizedCharacter);

	if (~position) {
		return alphabet[position];
	} else {
		return normalizedCharacter;
	}
}
