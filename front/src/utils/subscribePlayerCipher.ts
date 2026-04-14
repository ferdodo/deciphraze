import { combineLatest, type Observable } from "rxjs";
import { map } from "rxjs/operators";
import type { TimeService } from "@deciphraze/core";
import type { AllGamesRepository } from "../repositories/AllGamesRepository";
import type { ForcedDayRepository } from "../repositories/ForcedDayRepository";
import type { PlayerCipher } from "../entities/PlayerCipher";
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
