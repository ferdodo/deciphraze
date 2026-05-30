import { normalizeWord } from "@deciphraze/core";

export function characterEquals(a: string, b: string): boolean {
	return normalizeWord(a).toUpperCase() === normalizeWord(b).toUpperCase();
}
