import { Temporal } from "temporal-polyfill";
import { describe, expect, it } from "vitest";
import { createTimeService } from "./createTimeService";

describe("createTimeService", () => {
	it("should return the current real day", () => {
		const { timeService } = createTimeService({
			currentInstant: Temporal.Instant.from("2024-01-15T10:30:00Z"),
			timeZone: "UTC",
		});

		expect(timeService.getRealDay().toString()).toBe("2024-01-15");
	});

	it("should use the provided time zone to compute the real day", () => {
		const { timeService } = createTimeService({
			currentInstant: Temporal.Instant.from("2024-01-15T23:30:00Z"),
			timeZone: "Pacific/Kiritimati",
		});

		expect(timeService.getRealDay().toString()).toBe("2024-01-16");
	});

	it("should notify listeners when the real day changes", () => {
		const observedDays: string[] = [];
		const { advanceTimeMS, timeService } = createTimeService({
			currentInstant: Temporal.Instant.from("2024-12-31T23:59:00Z"),
			timeZone: "UTC",
		});
		const unsubscribe = timeService.observeRealDay((realDay) => {
			observedDays.push(realDay.toString());
		});

		advanceTimeMS(60_000);
		unsubscribe();

		expect(observedDays).toEqual(["2024-12-31", "2025-01-01"]);
	});

	it("should not notify listeners when the real day does not change", () => {
		const observedDays: string[] = [];
		const { advanceTimeMS, timeService } = createTimeService({
			currentInstant: Temporal.Instant.from("2024-01-15T10:30:00Z"),
			timeZone: "UTC",
		});

		timeService.observeRealDay((realDay) => {
			observedDays.push(realDay.toString());
		});

		advanceTimeMS(60_000);

		expect(observedDays).toEqual(["2024-01-15"]);
	});

	it("should stop notifying listeners after unsubscribe", () => {
		const observedDays: string[] = [];
		const { advanceTimeMS, timeService } = createTimeService({
			currentInstant: Temporal.Instant.from("2024-01-15T23:59:00Z"),
			timeZone: "UTC",
		});
		const unsubscribe = timeService.observeRealDay((realDay) => {
			observedDays.push(realDay.toString());
		});

		unsubscribe();
		advanceTimeMS(60_000);

		expect(observedDays).toEqual(["2024-01-15"]);
	});

	it("should trigger timeouts when time advances enough", () => {
		const observedCalls: string[] = [];
		const { advanceTimeMS, timeService } = createTimeService({
			currentInstant: Temporal.Instant.from("2024-01-15T10:30:00Z"),
			timeZone: "UTC",
		});

		timeService.setTimeout(() => {
			observedCalls.push("timeout");
		}, 5_000);

		advanceTimeMS(4_999);
		expect(observedCalls).toEqual([]);

		advanceTimeMS(1);
		expect(observedCalls).toEqual(["timeout"]);
	});

	it("should not throw and should not trigger callbacks when advancing zero milliseconds", () => {
		const observedCalls: string[] = [];
		const { advanceTimeMS, timeService } = createTimeService({
			currentInstant: Temporal.Instant.from("2024-01-15T10:30:00Z"),
			timeZone: "UTC",
		});

		timeService.setTimeout(() => {
			observedCalls.push("timeout");
		}, 1_000);

		expect(() => {
			advanceTimeMS(0);
		}).not.toThrow();
		expect(observedCalls).toEqual([]);
	});

	it("should throw when advancing a negative duration", () => {
		const { advanceTimeMS } = createTimeService({
			currentInstant: Temporal.Instant.from("2024-01-15T10:30:00Z"),
			timeZone: "UTC",
		});

		expect(() => {
			advanceTimeMS(-1);
		}).toThrow(RangeError);
	});

	it("should trigger intervals repeatedly until cancelled", () => {
		const observedCalls: string[] = [];
		const { advanceTimeMS, timeService } = createTimeService({
			currentInstant: Temporal.Instant.from("2024-01-15T10:30:00Z"),
			timeZone: "UTC",
		});

		const cancelInterval = timeService.setInterval(() => {
			observedCalls.push("interval");
		}, 1_000);

		advanceTimeMS(3_000);
		cancelInterval();
		advanceTimeMS(1_000);

		expect(observedCalls).toEqual(["interval", "interval", "interval"]);
	});

	it("should wait for the full interval duration before the first interval callback", () => {
		const observedCalls: string[] = [];
		const { advanceTimeMS, timeService } = createTimeService({
			currentInstant: Temporal.Instant.from("2024-01-15T10:30:00Z"),
			timeZone: "UTC",
		});

		timeService.setInterval(() => {
			observedCalls.push("interval");
		}, 1_000);

		advanceTimeMS(999);
		expect(observedCalls).toEqual([]);

		advanceTimeMS(1);
		expect(observedCalls).toEqual(["interval"]);
	});
});
