import type { PlayerCipher } from "../types/PlayerCipher";
import type { GameHistory } from "../types/GameHistory";
import { characterEquals } from "./characterEquals";
import { isAlphabetic } from "./isAlphabetic";
import { normalizeWord } from "./normalizeWord";

export const isWin = (
	playerCipher: PlayerCipher,
	paragraphOfTheDay: string,
	gameHistory: GameHistory,
	currentDay: string
): boolean => {
	// Si la partie du jour est déjà dans le gameHistory, on a déjà gagné
	if (gameHistory[currentDay] !== undefined) {
		return true;
	}

	const allLettersMatched = [...paragraphOfTheDay].every((letter) => {
		return Boolean(playerCipher[normalizeWord(letter).toUpperCase()] || !isAlphabetic(letter));
	});

	const allLettersGood =  Object.entries(playerCipher).some(([key, value]) => characterEquals(key, value));
	return allLettersMatched && allLettersGood;
};
