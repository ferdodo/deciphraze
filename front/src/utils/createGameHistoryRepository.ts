import { BehaviorSubject } from "rxjs";
import { share } from "rxjs/operators";
import type { GameHistoryRepository } from "@deciphraze/core";
import type { GameHistory } from "@deciphraze/core";
import type { GameSession } from "@deciphraze/core";
import { checkGameHistory } from "./checkGameHistory";
import type { StorageLike } from "./StorageLike";

const GAME_HISTORY_STORAGE_KEY = "deciphraze_game_history";

export function createGameHistoryRepository(storage: StorageLike): GameHistoryRepository {
	let gameHistory: GameHistory;

	try {
		const stored: string = storage.getItem(GAME_HISTORY_STORAGE_KEY) ?? "";
		gameHistory = checkGameHistory(JSON.parse(stored), storage);
	} catch (_error) {
		gameHistory = {};
	}

	const gameHistorySubject = new BehaviorSubject<GameHistory>({ ...gameHistory });

	function getHistory(): GameHistory {
		return { ...gameHistory };
	}

	function addSession(session: GameSession): void {
		gameHistory[session.winAt] = session;
		storage.setItem(GAME_HISTORY_STORAGE_KEY, JSON.stringify(gameHistory));
		gameHistorySubject.next({ ...gameHistory });
	}

	return {
		getHistory,
		addSession,
		gameHistory$: gameHistorySubject.asObservable().pipe(share()),
	};
}
