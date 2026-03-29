import { BehaviorSubject } from "rxjs";
import type { Observable } from "rxjs";
import type { DayRepository } from "../repositories/DayRepository";

export function createDayRepositoryMock(): DayRepository {
	const daySubject = new BehaviorSubject<string>("2024-01-15");

	function getRealTodaysDate(): string {
		return daySubject.value;
	}

	function setRealTodaysDate(day: string): void {
		daySubject.next(day);
	}

	function observeRealTodaysDate(): Observable<string> {
		return daySubject.asObservable();
	}

	function clear(): void {
		daySubject.next("2024-01-15");
	}

	return {
		getRealTodaysDate,
		setRealTodaysDate,
		observeRealTodaysDate,
		clear,
	};
}
