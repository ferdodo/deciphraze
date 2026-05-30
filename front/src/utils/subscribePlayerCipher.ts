import { combineLatest, type Observable } from "rxjs";
import { map } from "rxjs/operators";
import type { TimeService, AllGamesRepository, PlayerCipher, ForcedDayRepository } from "@deciphraze/core";
import { getPlayerCipherFromAllGames } from "./getPlayerCipherFromAllGames";
import { observeCurrentDay } from "./observeCurrentDay";

export const subscribePlayerCipher = (
	allGamesRepository: AllGamesRepository,
	timeService: TimeService,
	forcedDayRepository: ForcedDayRepository,
): Observable<PlayerCipher> => {
	return combineLatest([
		allGamesRepository.subscribe(),
		observeCurrentDay(timeService, forcedDayRepository),
	]).pipe(
		map(([allGames, currentDay]) => {
			return getPlayerCipherFromAllGames(allGames, currentDay);
		}),
	);
};
