import { BehaviorSubject } from "rxjs";
import type { Observable } from "rxjs";
import type { ForcedDayRepository } from "../repositories/ForcedDayRepository";

export function createForcedDayRepository(): ForcedDayRepository {
	const forcedVirtualDateSubject = new BehaviorSubject<string | undefined>(undefined);

	function getForcedVirtualDate(): string | undefined {
		return forcedVirtualDateSubject.value;
	}

	function forceVirtualDate(day: string): void {
		forcedVirtualDateSubject.next(day);
	}

	function removeForcedVirtualDate(): void {
		forcedVirtualDateSubject.next(undefined);
	}

	function observeForcedVirtualDate(): Observable<string | undefined> {
		return forcedVirtualDateSubject.asObservable();
	}

	function clear(): void {
		removeForcedVirtualDate();
	}

	return {
		getForcedVirtualDate,
		forceVirtualDate,
		removeForcedVirtualDate,
		observeForcedVirtualDate,
		clear,
	};
}
