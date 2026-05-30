import type { GameHistory } from "../entities/GameHistory";

export function isTodayGameCompleted(gameHistory: GameHistory, realTodayDate: string): boolean {
	const todaySession = gameHistory[realTodayDate];
	return todaySession && !Array.isArray(todaySession) && !!todaySession.winAt;
}
