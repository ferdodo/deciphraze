import { BehaviorSubject } from "rxjs";
import { share } from "rxjs/operators";
import type { GameHistoryRepository } from "@deciphraze/core";
import type { GameHistory } from "@deciphraze/core";
import type { GameSession } from "@deciphraze/core";

export function createGameHistoryRepositoryMock(): GameHistoryRepository {
	const gameHistory: GameHistory = {};
	const gameHistorySubject = new BehaviorSubject<GameHistory>({ ...gameHistory });

	function getHistory(): GameHistory {
		return { ...gameHistory };
	}

	function addSession(session: GameSession): void {
		gameHistory[session.winAt] = session;
		gameHistorySubject.next({ ...gameHistory });
	}

	return {
		getHistory,
		addSession,
		gameHistory$: gameHistorySubject.asObservable().pipe(share()),
	};
}
