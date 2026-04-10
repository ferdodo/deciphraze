import type { GameHistory } from "../entities/GameHistory";
import { getAlphabetLettersInText } from "./getAlphabetLettersInText";
import { getLettersFoundFromHistoryEntry } from "./getLettersFoundFromHistoryEntry";

export function isLetterAvailableForLettre(
	paragraphOfTheDay: string,
	gameHistory: GameHistory
): boolean {
	const lettersInParagraph = getAlphabetLettersInText(paragraphOfTheDay);

	const lettersAlreadyFound = new Set<string>();
	for (const entry of Object.values(gameHistory)) {
		for (const letter of getLettersFoundFromHistoryEntry(entry)) {
			lettersAlreadyFound.add(letter.toUpperCase());
		}
	}

	return lettersInParagraph.some((letter) => !lettersAlreadyFound.has(letter));
}
