import type { GameHistory } from "../entities/GameHistory";
import { iterateStreaks } from "./iterateStreaks";

export function calculateMaxStreak(gameHistory: GameHistory): number {
	let maxStreak = 0;
	for (const streak of iterateStreaks(gameHistory)) {
		maxStreak = Math.max(maxStreak, streak);
	}

	return maxStreak;
}
