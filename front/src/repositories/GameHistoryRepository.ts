import type { Observable } from "rxjs";
import type { GameHistory } from "../entities/GameHistory";
import type { GameSession } from "../entities/GameSession";

export interface GameHistoryRepository {
	getHistory(): GameHistory;
	addSession(session: GameSession): void;
	gameHistory$: Observable<GameHistory>;
	clear(): void;
}

