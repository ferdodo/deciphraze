import { BehaviorSubject } from "rxjs";
import { share } from "rxjs/operators";
import type { GameHistoryRepository } from "../repositories/GameHistoryRepository";
import type { GameHistory } from "../entities/GameHistory";
import type { GameSession } from "../entities/GameSession";
import { checkGameHistory } from "./checkGameHistory";

const GAME_HISTORY_STORAGE_KEY = "deciphraze_game_history";

export function createGameHistoryRepository(): GameHistoryRepository {
	let gameHistory: GameHistory;

	try {
		const stored: string = localStorage.getItem(GAME_HISTORY_STORAGE_KEY) ?? "";
		gameHistory = checkGameHistory(JSON.parse(stored));
	} catch (_error) {
		gameHistory = {};
	}

	const gameHistorySubject = new BehaviorSubject<GameHistory>({ ...gameHistory });

	function getHistory(): GameHistory {
		return { ...gameHistory };
	}

	function addSession(session: GameSession): void {
		gameHistory[session.winAt] = session;
		localStorage.setItem(GAME_HISTORY_STORAGE_KEY, JSON.stringify(gameHistory));
		gameHistorySubject.next({ ...gameHistory });
	}

	return {
		getHistory,
		addSession,
		gameHistory$: gameHistorySubject.asObservable().pipe(share()),
	};
}

