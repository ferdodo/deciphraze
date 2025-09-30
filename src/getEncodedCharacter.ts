import { cipher } from "./cipher";

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function getEncodedCharacter(character: string) {
	const position = cipher.findIndex(c => character.toUpperCase() === c);

	if (~position) {
		return alphabet[position];
	} else {
		return character;
	}
}
