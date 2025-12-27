import type { Observable } from "rxjs";

export interface DayRepository {
	getDay(): string;
	setDay(day: string): void;
	observeDay(): Observable<string>;
}

