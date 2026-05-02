import { ebook1 } from "../constants/ebook1";
import { normalizeWord } from "./normalizeWord";

export function getSevenLetterWords(): string[] {
	const words = ebook1
		.split(/\W+/)
		.filter((word) => word.length === 7)
		.map((word) => normalizeWord(word))
		.filter((word) => /^[a-z]{7}$/.test(word));

	return [...new Set(words)];
}
