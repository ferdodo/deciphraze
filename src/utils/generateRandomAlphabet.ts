import { createIntPRNG } from "./createIntPRNG";

export function generateRandomAlphabet(date: string, isDev: boolean = false): string[] {
	if (isDev) {
		return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
	}

	const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
	const cipher = [];
	const randomInt = createIntPRNG(date);

	while (alphabet.length) {
		const position = randomInt(0, alphabet.length);
		cipher.push(alphabet[position]);
		alphabet.splice(position, 1);
	}

	return cipher;
}
