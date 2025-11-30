import type { GameHistory } from "../entities/GameHistory";
import { getLettersFoundFromHistoryEntry } from "./getLettersFoundFromHistoryEntry";

export function* iterateStreaks(
	gameHistory: GameHistory,
): IterableIterator<number> {
	const sessions = Object.entries(gameHistory)
		.map(([winAt, entry]) => ({ winAt, lettersFound: getLettersFoundFromHistoryEntry(entry) }))
		.sort((a, b) => a.winAt.localeCompare(b.winAt));

	if (sessions.length === 0) {
		return;
	}

	let currentStreak = 1;

	for (let i = 1; i < sessions.length; i++) {
		const prevDate = new Date(sessions[i - 1].winAt);
		const currentDate = new Date(sessions[i].winAt);
		const dayDifference = Math.floor(
			(currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24),
		);

		if (dayDifference === 1) {
			currentStreak++;
		} else {
			yield currentStreak;
			currentStreak = 1;
		}
	}

	yield currentStreak;
}
