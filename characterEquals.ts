import { normalizeWord } from "./normalizeWord";

export function characterEquals(a: string, b: string) {
	return normalizeWord(a).toUpperCase()
		=== normalizeWord(b).toUpperCase()
}
