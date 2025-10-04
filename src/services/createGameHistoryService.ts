import { Subject } from "rxjs";
import { share } from "rxjs/operators";
import type { GameHistory } from "../types/GameHistory";
import type { GameHistoryService } from "../types/GameHistoryService";

const STORAGE_KEY = "deciphraze-game-history";

export function createGameHistoryService(): GameHistoryService {
	// Restaurer depuis localStorage ou créer une nouvelle Map
	const savedData = localStorage.getItem(STORAGE_KEY);
	let gameHistory: GameHistory;

	try {
		gameHistory = savedData
			? new Map(JSON.parse(savedData))
			: new Map<string, string[]>();
	} catch (_error) {
		// En cas d'erreur de parsing JSON, créer une Map vide
		gameHistory = new Map<string, string[]>();
	}
	const gameHistory$ = new Subject<GameHistory>();

	function getGameHistory(): GameHistory {
		return new Map(gameHistory);
	}

	function saveToStorage() {
		localStorage.setItem(STORAGE_KEY, JSON.stringify([...gameHistory]));
	}

	function setSession(date: string, lettersFound: string[]) {
		gameHistory.set(date, [...lettersFound]);
		gameHistory$.next(new Map(gameHistory));
		saveToStorage();
	}

	// Émission initiale
	gameHistory$.next(new Map(gameHistory));

	return {
		getGameHistory,
		gameHistory$: gameHistory$.asObservable().pipe(share()),
		setSession,
	};
}
