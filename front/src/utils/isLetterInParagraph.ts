import { normalizeWord } from "@deciphraze/core";
import { isAlphabetic } from "./isAlphabetic";

export function isLetterInParagraph(letter: string, paragraph: string): boolean {
	const normalizedLetter = normalizeWord(letter).toUpperCase();
	return [...paragraph].some(char => {
		if (!isAlphabetic(char)) {
			return false;
		}
		const normalizedChar = normalizeWord(char).toUpperCase();
		return normalizedChar === normalizedLetter;
	});
}

