import type { GameSession } from "./GameSession";

export interface GameHistory {
	[date: string]: string[] | GameSession;
}