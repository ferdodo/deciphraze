import { describe, it, expect } from "vitest";
import { startRevealAnimation } from "./startRevealAnimation";

const makeScheduler = (): {
	schedule: (cb: () => void) => number;
	runFrames: (count: number) => void;
	callCount: () => number;
} => {
	let latestStep: () => void = (): void => {};
	let calls = 0;
	const schedule = (cb: () => void): number => {
		latestStep = cb;
		calls++;
		return calls;
	};
	const runFrames = (count: number): void => {
		for (let i = 0; i < count; i++) latestStep();
	};
	return { schedule, runFrames, callCount: (): number => calls };
};

describe("startRevealAnimation", () => {
	it("immediately schedules the first animation frame", () => {
		const { schedule, callCount } = makeScheduler();
		startRevealAnimation("hello world", (): void => {}, schedule, (): void => {});
		expect(callCount()).toBe(1);
	});

	it("returns a cancel function that stops the animation", () => {
		let cancelledId: number | undefined;
		const schedule = (_cb: () => void): number => 42;
		const cancelSchedule = (id: number): void => { cancelledId = id; };

		const cancel = startRevealAnimation("hello world", (): void => {}, schedule, cancelSchedule);
		cancel();

		expect(cancelledId).toBe(42);
	});

	it("does not call onCount during the initial delay period", () => {
		const { schedule, runFrames } = makeScheduler();
		let wasCalled = false;
		const onCount = (): void => { wasCalled = true; };

		startRevealAnimation("one two three four five", onCount, schedule, (): void => {});
		runFrames(60); // delay is 60 frames

		expect(wasCalled).toBe(false);
	});

	it("calls onCount with the revealed index once the delay elapses", () => {
		const { schedule, runFrames } = makeScheduler();
		let reportedCount: number | undefined;
		const onCount = (count: number): void => { reportedCount = count; };

		startRevealAnimation("one two three four five six seven", onCount, schedule, (): void => {});
		runFrames(62);

		expect(reportedCount).toBeGreaterThan(0);
	});

});
