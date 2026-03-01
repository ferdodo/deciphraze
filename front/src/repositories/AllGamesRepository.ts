import type { Observable } from "rxjs";
import type { AllGames } from "../entities/AllGames";

export interface AllGamesRepository {
	get(): AllGames;
	subscribe(): Observable<AllGames>;
	upsertByDay(day: string, data: AllGames["gameByDay"][string]): void;
	clear(): void;
}
