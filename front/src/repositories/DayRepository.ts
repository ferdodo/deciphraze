import type { Observable } from "rxjs";

export interface DayRepository {
	getRealTodaysDate(): string;
	setRealTodaysDate(day: string): void;
	observeRealTodaysDate(): Observable<string>;
	clear(): void;
}

