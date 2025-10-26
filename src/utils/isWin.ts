import type { PlayerCipher } from "../types/PlayerCipher";
import { characterEquals } from "./characterEquals";
import { isAlphabetic } from "./isAlphabetic";
import { normalizeWord } from "./normalizeWord";

export const isWin = (playerCipher: PlayerCipher, paragraphOfTheDay: string): boolean => {
	const allLettersMatched = [...paragraphOfTheDay].every((letter) => {
		return Boolean(playerCipher[normalizeWord(letter).toUpperCase()] || !isAlphabetic(letter));
	});

	const allLettersGood =  Object.entries(playerCipher).some(([key, value]) => characterEquals(key, value));
	return allLettersMatched && allLettersGood;
};
