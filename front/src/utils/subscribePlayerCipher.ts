import { map } from "rxjs/operators";
import type { Observable } from "rxjs";
import type { AllGamesRepository } from "../repositories/AllGamesRepository";
import type { DayRepository } from "../repositories/DayRepository";
import type { PlayerCipher } from "../entities/PlayerCipher";
import { getPlayerCipherFromAllGames } from "./getPlayerCipherFromAllGames";

export const subscribePlayerCipher = (
	allGamesRepository: AllGamesRepository,
	dayRepository: DayRepository
): Observable<PlayerCipher> => {
	return allGamesRepository.subscribe().pipe(
		map((allGames) => {
			const currentDay = dayRepository.getRealTodaysDate();
			return getPlayerCipherFromAllGames(allGames, currentDay);
		})
	);
};
