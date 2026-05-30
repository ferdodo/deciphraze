import type { Observable } from "rxjs";
import type { GameSession } from "@deciphraze/core";

export interface GameHistoryService {
	getGameHistory(): GameSession[];
	gameHistory$: Observable<GameSession[]>;
	setSession(date: string, lettersFound: string[]): void;
}
