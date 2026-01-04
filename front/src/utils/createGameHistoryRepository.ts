import { BehaviorSubject } from "rxjs";
import { share } from "rxjs/operators";
import type { GameHistoryRepository } from "../repositories/GameHistoryRepository";
import type { GameHistory } from "../entities/GameHistory";
import type { GameSession } from "../entities/GameSession";
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

	function clear(): void {
		gameHistory = {};
		storage.removeItem(GAME_HISTORY_STORAGE_KEY);
		gameHistorySubject.next({ ...gameHistory });
	}

	return {
		getHistory,
		addSession,
		gameHistory$: gameHistorySubject.asObservable().pipe(share()),
		clear
	};
}

