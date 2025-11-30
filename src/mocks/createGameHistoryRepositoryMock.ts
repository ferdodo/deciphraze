import type { GameHistoryRepository } from "../repositories/GameHistoryRepository";
import type { GameHistory } from "../entities/GameHistory";
import type { GameSession } from "../entities/GameSession";

export function createGameHistoryRepositoryMock(): GameHistoryRepository {
	const gameHistory: GameHistory = {};

	function getHistory(): GameHistory {
		return gameHistory;
	}

	function addSession(session: GameSession): void {
		gameHistory[session.winAt] = session;
	}

	return { getHistory, addSession };
}
