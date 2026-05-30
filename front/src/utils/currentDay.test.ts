import { describe, expect, it } from "vitest";
import { firstValueFrom } from "rxjs";
import { skip } from "rxjs/operators";
import { Temporal } from "temporal-polyfill";
import type { TimeService } from "@deciphraze/core";
import { createForcedDayRepository } from "./createForcedDayRepository";
import { getCurrentDay } from "./getCurrentDay";
import { observeCurrentDay } from "./observeCurrentDay";

interface TimeServiceTestDouble {
	setRealDay(realDay: string): void;
	timeService: TimeService;
}

function createTimeServiceTestDouble(initialRealDay: string): TimeServiceTestDouble {
	let currentRealDay = Temporal.PlainDate.from(initialRealDay);
	const listeners = new Set<(realDay: Temporal.PlainDate) => void>();

	return {
		setRealDay(realDay: string): void {
			currentRealDay = Temporal.PlainDate.from(realDay);

			for (const listener of listeners) {
				listener(currentRealDay);
			}
		},
		timeService: {
			getRealDay(): Temporal.PlainDate {
				return currentRealDay;
			},
			observeRealDay(listener: (realDay: Temporal.PlainDate) => void): () => void {
				listeners.add(listener);
				listener(currentRealDay);

				return (): void => {
					listeners.delete(listener);
				};
			},
		},
	};
}

describe("current day", () => {
	it("should return the real day when no forced day is set", () => {
		const { timeService } = createTimeServiceTestDouble("2024-01-15");
		const forcedDayRepository = createForcedDayRepository();

		expect(getCurrentDay(timeService, forcedDayRepository)).toBe("2024-01-15");
	});

	it("should return the forced day when it is set", () => {
		const { timeService } = createTimeServiceTestDouble("2024-01-15");
		const forcedDayRepository = createForcedDayRepository();

		forcedDayRepository.forceVirtualDate("2024-01-16");

		expect(getCurrentDay(timeService, forcedDayRepository)).toBe("2024-01-16");
	});

	it("should follow the real day when no forced day is set", async () => {
		const { setRealDay, timeService } = createTimeServiceTestDouble("2024-01-15");
		const forcedDayRepository = createForcedDayRepository();
		const currentDayPromise = firstValueFrom(observeCurrentDay(timeService, forcedDayRepository).pipe(skip(1)));

		setRealDay("2024-01-16");

		await expect(currentDayPromise).resolves.toBe("2024-01-16");
	});

	it("should keep the forced day when the real day changes", () => {
		const { setRealDay, timeService } = createTimeServiceTestDouble("2024-01-15");
		const forcedDayRepository = createForcedDayRepository();

		forcedDayRepository.forceVirtualDate("2024-01-10");
		setRealDay("2024-01-16");

		expect(getCurrentDay(timeService, forcedDayRepository)).toBe("2024-01-10");
	});

	it("should return to the real day when the forced day is removed", async () => {
		const { setRealDay, timeService } = createTimeServiceTestDouble("2024-01-15");
		const forcedDayRepository = createForcedDayRepository();

		forcedDayRepository.forceVirtualDate("2024-01-10");
		setRealDay("2024-01-16");

		const currentDayPromise = firstValueFrom(observeCurrentDay(timeService, forcedDayRepository).pipe(skip(1)));
		forcedDayRepository.removeForcedVirtualDate();

		await expect(currentDayPromise).resolves.toBe("2024-01-16");
	});
});
