import type { GameHistoryRepository } from "../types/GameHistoryRepository";
import type { GameHistory } from "../types/GameHistory";
import type { GameSession } from "../types/GameSession";

export function createGameHistoryRepositoryMock(): GameHistoryRepository {
	const gameHistory: GameHistory = {};

	function getHistory(): GameHistory {
		return gameHistory;
	}

	function addSession(session: GameSession): void {
		gameHistory[session.winAt] = session.lettersFound;
	}

	return { getHistory, addSession };
}
