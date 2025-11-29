import type { GameHistory } from "../types/GameHistory";
import { getWordsFoundFromHistoryEntry } from "./getWordsFoundFromHistoryEntry";

export function calculateTotalWordsFound(gameHistory: GameHistory): number {
	let total = 0;

	for (const entry of Object.values(gameHistory)) {
		total += getWordsFoundFromHistoryEntry(entry);
	}

	return total;
}

