import type { Observable } from "rxjs";

export interface ForcedDayRepository {
	getForcedVirtualDate(): string | undefined;
	forceVirtualDate(day: string): void;
	removeForcedVirtualDate(): void;
	observeForcedVirtualDate(): Observable<string | undefined>;
}
