import { BehaviorSubject } from "rxjs";
import type { AllGamesRepository } from "../repositories/AllGamesRepository";
import type { AllGames } from "../entities/AllGames";

export const createAllGamesRepositoryMock = (initialGames: AllGames = { gameByDay: {} }): AllGamesRepository => {
	const allGamesSubject = new BehaviorSubject<AllGames>(initialGames);

	return {
		get: () => allGamesSubject.value,
		subscribe: () => allGamesSubject.asObservable(),
		upsertByDay: (day: string, data: AllGames["gameByDay"][string]) => {
			const currentGames = { ...allGamesSubject.value };
			currentGames.gameByDay = { ...currentGames.gameByDay, [day]: data };
			allGamesSubject.next(currentGames);
		},
		removeByDay: (day: string) => {
			const currentGames = { ...allGamesSubject.value };
			const { [day]: _removedGame, ...remainingGames } = currentGames.gameByDay;
			allGamesSubject.next({ ...currentGames, gameByDay: remainingGames });
		}
	};
};
