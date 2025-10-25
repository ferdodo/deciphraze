import type { PlayerCipher } from "../types/PlayerCipher";
import type { GameSession } from "../types/GameSession";
import { letterFound } from "./letterFound";

export function createGameSession(
	day: string,
	paragraphOfTheDay: string,
	playerCipher: PlayerCipher
): GameSession {
	const lettersFound = [...paragraphOfTheDay]
		.filter(letter => letter.match(/[a-zA-Z]/)) // Seulement les lettres alphabétiques
		.filter(letter => letterFound(letter, playerCipher))
		.filter((letter, index, array) => array.indexOf(letter) === index);

	return {
		winAt: day,
		lettersFound: lettersFound
	};
}
