const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function getEncodedCharacter(character: string, cipher: string[]) {
	const position = cipher.indexOf(character.toUpperCase());

	if (~position) {
		return alphabet[position];
	} else {
		return character;
	}
}
