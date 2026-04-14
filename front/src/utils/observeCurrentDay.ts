import { Observable, combineLatest } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";
import type { TimeService } from "@deciphraze/core";
import type { ForcedDayRepository } from "../repositories/ForcedDayRepository";

function observeRealDay(timeService: TimeService): Observable<string> {
	return new Observable<string>((subscriber) => {
		return timeService.observeRealDay((realDay) => {
			subscriber.next(realDay.toString());
		});
	});
}

export function observeCurrentDay(timeService: TimeService, forcedDayRepository: ForcedDayRepository): Observable<string> {
	return combineLatest([
		observeRealDay(timeService),
		forcedDayRepository.observeForcedVirtualDate(),
	]).pipe(
		map(([realDay, forcedVirtualDate]) => forcedVirtualDate ?? realDay),
		distinctUntilChanged(),
	);
}
