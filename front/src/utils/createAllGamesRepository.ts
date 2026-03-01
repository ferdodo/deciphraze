import { BehaviorSubject } from "rxjs";
import { share } from "rxjs/operators";
import type { AllGamesRepository } from "../repositories/AllGamesRepository";
import type { AllGames } from "../entities/AllGames";
import type { StorageLike } from "./StorageLike";
import type { Observable } from "rxjs";

const ALL_GAMES_STORAGE_KEY = "deciphraze_all_games";

export function createAllGamesRepository(storage: StorageLike): AllGamesRepository {
	let allGames: AllGames;

	try {
		const stored: string = storage.getItem(ALL_GAMES_STORAGE_KEY) ?? "";
		allGames = JSON.parse(stored);
	} catch (_error) {
		allGames = { gameByDay: {} };
	}

	const allGamesSubject = new BehaviorSubject<AllGames>({ ...allGames });

	function get(): AllGames {
		return { ...allGames };
	}

	function subscribe(): Observable<AllGames> {
		return allGamesSubject.asObservable().pipe(share());
	}

	function upsertByDay(day: string, data: AllGames["gameByDay"][string]): void {
		allGames = {
			...allGames,
			gameByDay: {
				...allGames.gameByDay,
				[day]: data
			}
		};
		storage.setItem(ALL_GAMES_STORAGE_KEY, JSON.stringify(allGames));
		allGamesSubject.next({ ...allGames });
	}

	function clear(): void {
		allGames = { gameByDay: {} };
		storage.removeItem(ALL_GAMES_STORAGE_KEY);
		allGamesSubject.next({ ...allGames });
	}

	return {
		get,
		subscribe,
		upsertByDay,
		clear
	};
}
