import { normalizeWord } from "./normalizeWord";

export function getAlphabetLettersInText(text: string): string[] {
	const normalized = normalizeWord(text).toUpperCase();
	const letters = new Set<string>();
	for (const char of normalized) {
		if (/^[A-Z]$/.test(char)) {
			letters.add(char);
		}
	}
	return [...letters].sort();
}
