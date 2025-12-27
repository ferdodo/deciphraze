import type { GameHistory } from "../entities/GameHistory";
import { getLettersFoundFromHistoryEntry } from "./getLettersFoundFromHistoryEntry";

export function isFirstLetterFoundInHistory(
	gameHistory: GameHistory,
	letter: string
): boolean {
	return Object.values(gameHistory).some((entry) => {
		const lettersFound = getLettersFoundFromHistoryEntry(entry);
		return lettersFound.length > 0 && lettersFound[0].toUpperCase() === letter.toUpperCase();
	});
}

