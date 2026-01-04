import { BehaviorSubject } from "rxjs";
import type { Observable } from "rxjs";
import type { DayRepository } from "../repositories/DayRepository";
import { formatDate } from "./formatDate";

export function createDayRepository(): DayRepository {
	const now = new Date();
	const currentDate = formatDate(now);
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

	function clear(): void {
		const now = new Date();
		const currentDate = formatDate(now);
		daySubject.next(currentDate);
	}

	return {
		getDay,
		setDay,
		observeDay,
		clear
	};
}

