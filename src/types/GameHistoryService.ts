import type { Observable } from "rxjs";
import type { GameHistory } from "./GameHistory";

export interface GameHistoryService {
	getGameHistory(): GameHistory;
	gameHistory$: Observable<GameHistory>;
	setSession(date: string, lettersFound: string[]): void;
}
