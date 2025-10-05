import type { GameHistory } from "../types/GameHistory";

export function calculateCurrentStreak(gameHistory: GameHistory, startIndex: number): number {
	const sessions = Array.from(gameHistory.entries())
		.map(([winAt, lettersFound]) => ({ winAt, lettersFound }))
		.sort((a, b) => a.winAt.localeCompare(b.winAt));
	let currentStreak = 1;

	for (let i = startIndex + 1; i < sessions.length; i++) {
		const prevDate = new Date(sessions[i - 1].winAt);
		const currentDate = new Date(sessions[i].winAt);
		const dayDifference = Math.floor(
			(currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24),
		);

		if (dayDifference === 1) {
			currentStreak++;
		} else {
			break;
		}
	}

	return currentStreak;
}
