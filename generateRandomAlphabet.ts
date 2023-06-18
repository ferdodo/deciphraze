import { randomNumber } from "./randomNumber";

export function generateRandomAlphabet() {
 	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
 	const cipher = [];

	while(alphabet.length) {
		const position = randomNumber(0, alphabet.length);
		cipher.push(alphabet[position]);
		alphabet.splice(position, 1);
	}

	return cipher;
 }
