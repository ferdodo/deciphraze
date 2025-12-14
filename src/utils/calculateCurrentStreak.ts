import type { GameHistory } from "../entities/GameHistory";
import { getLettersFoundFromHistoryEntry } from "./getLettersFoundFromHistoryEntry";

export function calculateCurrentStreak(gameHistory: GameHistory, currentDay: string): number {
	const sessions = Object.entries(gameHistory)
		.map(([winAt, entry]) => ({ winAt, lettersFound: getLettersFoundFromHistoryEntry(entry) }))
		.sort((a, b) => a.winAt.localeCompare(b.winAt));

	if (sessions.length === 0) {
		return 0;
	}

	// Partir de la dernière session (la plus récente)
	const lastSession = sessions[sessions.length - 1];
	const lastSessionDate = new Date(lastSession.winAt);
	const currentDate = new Date(currentDay);
	
	// Calculer l'écart en jours entre la dernière session et aujourd'hui
	const dayDifference = Math.floor(
		(currentDate.getTime() - lastSessionDate.getTime()) / (1000 * 60 * 60 * 24),
	);

	// Si la dernière victoire est à plus d'un jour, la streak est cassée
	if (dayDifference > 1) {
		return 0;
	}

	// Calculer la streak en partant de la dernière session et en remontant dans le temps
	let currentStreak = 1;

	for (let i = sessions.length - 2; i >= 0; i--) {
		const prevDate = new Date(sessions[i].winAt);
		const currentDate = new Date(sessions[i + 1].winAt);
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
