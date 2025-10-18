import { Subject } from "rxjs";
import { share } from "rxjs/operators";
import type { GameHistoryService } from "../types/GameHistoryService";
import type { GameSession } from "../types/GameSession";

export function createGameHistoryService(): GameHistoryService {
	const gameHistory: GameSession[] = [];
	const gameHistory$ = new Subject<GameSession[]>();

	function getGameHistory(): GameSession[] {
		return [...gameHistory];
	}

	function setSession(date: string, lettersFound: string[]): void {
		const existingSessionIndex = gameHistory.findIndex(session => session.winAt === date);
		
		if (existingSessionIndex >= 0) {
			gameHistory[existingSessionIndex] = { winAt: date, lettersFound };
		} else {
			gameHistory.push({ winAt: date, lettersFound });
		}
		
		gameHistory$.next([...gameHistory]);
	}

	return {
		getGameHistory,
		gameHistory$: gameHistory$.asObservable().pipe(share()),
		setSession,
	};
}
