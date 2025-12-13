import { BehaviorSubject } from "rxjs";
import type { Observable } from "rxjs";
import type { DayRepository } from "../repositories/DayRepository";
import { getCurrentDate } from "./getCurrentDate";

export function createDayRepository(): DayRepository {
	const currentDate = getCurrentDate();
	const daySubject = new BehaviorSubject<string>(currentDate);

	function getDay(): string {
		return daySubject.value;
	}

	function setDay(day: string): void {
		daySubject.next(day);
	}

	function observeDay(): Observable<string> {
		return daySubject.asObservable();
	}

	return {
		getDay,
		setDay,
		observeDay,
	};
}

