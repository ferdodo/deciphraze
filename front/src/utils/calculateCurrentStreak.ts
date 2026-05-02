import type { GameHistory } from "@deciphraze/core";
import { getLettersFoundFromHistoryEntry } from "./getLettersFoundFromHistoryEntry";

export function calculateCurrentStreak(gameHistory: GameHistory, currentDay: string): number {
	const sessions = Object.entries(gameHistory)
		.map(([dateKey, entry]) => {
			const winAt = typeof entry === 'string' || Array.isArray(entry) ? dateKey : entry.winAt;
			return { winAt, lettersFound: getLettersFoundFromHistoryEntry(entry) };
		})
		.sort((a, b) => a.winAt.localeCompare(b.winAt));

	if (sessions.length === 0) {
		return 0;
	}

	// Obtenir les jours calendaires uniques (les valeurs winAt) et les trier
	const uniqueDays = Array.from(new Set(sessions.map(s => s.winAt))).sort();

	if (uniqueDays.length === 0) {
		return 0;
	}

	// Partir du dernier jour calendaire unique
	const lastDay = uniqueDays[uniqueDays.length - 1];
	const lastDayDate = new Date(lastDay);
	const currentDate = new Date(currentDay);
	
	// Calculer l'écart en jours entre le dernier jour et aujourd'hui
	const dayDifference = Math.floor(
		(currentDate.getTime() - lastDayDate.getTime()) / (1000 * 60 * 60 * 24),
	);

	// Si le dernier jour de victoire est à plus d'un jour, la streak est cassée
	if (dayDifference > 1) {
		return 0;
	}

	// Calculer la streak en partant du dernier jour et en remontant dans le temps
	let currentStreak = 1;

	for (let i = uniqueDays.length - 2; i >= 0; i--) {
		const prevDayDate = new Date(uniqueDays[i]);
		const nextDayDate = new Date(uniqueDays[i + 1]);
		const dayDifference = Math.floor(
			(nextDayDate.getTime() - prevDayDate.getTime()) / (1000 * 60 * 60 * 24),
		);

		if (dayDifference === 1) {
			currentStreak++;
		} else {
			break;
		}
	}

	return currentStreak;
}
