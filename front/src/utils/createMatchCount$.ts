import { BehaviorSubject, map, switchMap, startWith } from "rxjs";
import type { AllGamesRepository } from "../repositories/AllGamesRepository";
import type { DayRepository } from "../repositories/DayRepository";

export const createMatchCount$ = (allGamesRepository: AllGamesRepository, dayRepository: DayRepository): BehaviorSubject<number> => {
	const matchCountSubject = new BehaviorSubject<number>(0);
	
	const currentDay = dayRepository.getDay();
	const initialAllGames = allGamesRepository.get();
	const initialPlayerCipher = initialAllGames.gameByDay[currentDay]?.playerCipher || {};
	matchCountSubject.next(Object.keys(initialPlayerCipher).length);
	
	dayRepository.observeDay().pipe(
		switchMap(day => 
			allGamesRepository.subscribe().pipe(
				map(allGames => Object.keys(allGames.gameByDay[day]?.playerCipher || {}).length),
				startWith(Object.keys(initialAllGames.gameByDay[day]?.playerCipher || {}).length)
			)
		)
	).subscribe((count) => {
		matchCountSubject.next(count);
	});
	
	return matchCountSubject;
};
