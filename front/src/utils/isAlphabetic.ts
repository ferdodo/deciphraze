import { normalizeWord } from "@deciphraze/core";

export function isAlphabetic(character: string): boolean {
	return /^[a-zA-Z]$/.test(normalizeWord(character));
}
