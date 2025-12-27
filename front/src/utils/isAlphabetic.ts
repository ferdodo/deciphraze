import { normalizeWord } from "./normalizeWord";

export function isAlphabetic(character: string): boolean {
	return /^[a-zA-Z]$/.test(normalizeWord(character));
}
