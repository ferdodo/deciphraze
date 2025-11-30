import type { Observable } from "rxjs";
import type { GameSession } from "../entities/GameSession";

export interface GameHistoryService {
	getGameHistory(): GameSession[];
	gameHistory$: Observable<GameSession[]>;
	setSession(date: string, lettersFound: string[]): void;
}
