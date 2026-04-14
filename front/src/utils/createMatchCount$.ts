import { BehaviorSubject, combineLatest, map } from "rxjs";
import type { TimeService } from "@deciphraze/core";
import type { AllGamesRepository } from "../repositories/AllGamesRepository";
import type { ForcedDayRepository } from "../repositories/ForcedDayRepository";
import { getCurrentDay } from "./getCurrentDay";
import { observeCurrentDay } from "./observeCurrentDay";

export const createMatchCount$ = (
	allGamesRepository: AllGamesRepository,
	timeService: TimeService,
	forcedDayRepository: ForcedDayRepository,
): BehaviorSubject<number> => {
	const matchCountSubject = new BehaviorSubject<number>(0);
	
	const currentDay = getCurrentDay(timeService, forcedDayRepository);
	const initialAllGames = allGamesRepository.get();
	const initialPlayerCipher = initialAllGames.gameByDay[currentDay]?.playerCipher || {};
	matchCountSubject.next(Object.keys(initialPlayerCipher).length);
	
	combineLatest([
		allGamesRepository.subscribe(),
		observeCurrentDay(timeService, forcedDayRepository),
	]).pipe(
		map(([allGames, day]) => Object.keys(allGames.gameByDay[day]?.playerCipher || {}).length),
	).subscribe((count) => {
		matchCountSubject.next(count);
	});
	
	return matchCountSubject;
};
