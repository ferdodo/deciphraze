import { BehaviorSubject } from "rxjs";
import type { Observable } from "rxjs";
import type { DayRepository } from "../repositories/DayRepository";

export function createDayRepositoryMock(): DayRepository {
	const daySubject = new BehaviorSubject<string>("2024-01-15");

	function getDay(): string {
		return daySubject.value;
	}

	function setDay(day: string): void {
		daySubject.next(day);
	}

	function observeDay(): Observable<string> {
		return daySubject.asObservable();
	}

	function clear(): void {
		daySubject.next("2024-01-15");
	}

	return {
		getDay,
		setDay,
		observeDay,
		clear,
	};
}
