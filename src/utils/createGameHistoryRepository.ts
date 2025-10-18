import type { GameHistoryRepository } from "../types/GameHistoryRepository";
import type { GameHistory } from "../types/GameHistory";
import type { GameSession } from "../types/GameSession";
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

	function getHistory(): GameHistory {
		return gameHistory;
	}

	function addSession(session: GameSession): void {
		gameHistory[session.winAt] = session.lettersFound;
		localStorage.setItem(GAME_HISTORY_STORAGE_KEY, JSON.stringify(gameHistory));
	}

	return { getHistory, addSession };
}
