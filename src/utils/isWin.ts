import { letterFound } from "./letterFound";
import type { PlayerCipher } from "../types/PlayerCipher";

export const isWin = (playerCipher: PlayerCipher, paragraphOfTheDay: string): boolean => {
	return [...paragraphOfTheDay].every((letter) => letterFound(letter, playerCipher));
};
