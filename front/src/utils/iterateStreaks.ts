import type { GameHistory } from "@deciphraze/core";
import { getLettersFoundFromHistoryEntry } from "./getLettersFoundFromHistoryEntry";

export function* iterateStreaks(
	gameHistory: GameHistory,
): IterableIterator<number> {
	const sessions = Object.entries(gameHistory)
		.map(([date, entry]) => {
			const winAt = Array.isArray(entry) ? date : entry.winAt;
			return { winAt, lettersFound: getLettersFoundFromHistoryEntry(entry) };
		})
		.sort((a, b) => a.winAt.localeCompare(b.winAt));

	if (sessions.length === 0) {
		return;
	}

	// Obtenir les jours calendaires uniques (les valeurs winAt) et les trier
	const uniqueDays = Array.from(new Set(sessions.map(s => s.winAt))).sort();

	if (uniqueDays.length === 0) {
		return;
	}

	let currentStreak = 1;

	for (let i = 1; i < uniqueDays.length; i++) {
		const prevDate = new Date(uniqueDays[i - 1]);
		const currentDate = new Date(uniqueDays[i]);
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
