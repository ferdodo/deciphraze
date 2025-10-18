import type { GameHistory } from "./GameHistory";
import type { GameSession } from "./GameSession";

export interface GameHistoryRepository {
	getHistory(): GameHistory;
	addSession(session: GameSession): void;
}
