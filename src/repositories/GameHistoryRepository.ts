import type { GameHistory } from "../types/GameHistory";
import type { GameSession } from "../types/GameSession";

export interface GameHistoryRepository {
	getHistory(): GameHistory;
	addSession(session: GameSession): void;
}

