import { describe, it, expect } from "vitest";
import { scheduleActionUntilCompleted } from "./scheduleActionUntilCompleted";

describe("scheduleActionUntilCompleted", () => {
	it("calls schedule with the step and returns its handle when there is text left to reveal", () => {
		let scheduledWith: (() => void) | undefined;
		const step = (): void => {};
		const schedule = (cb: () => void): number => {
			scheduledWith = cb;
			return 42;
		};

		const rafId = scheduleActionUntilCompleted(10, 100, schedule, step);

		expect(scheduledWith).toBe(step);
		expect(rafId).toBe(42);
	});

	it("does not call schedule and returns 0 when all text is revealed", () => {
		let wasCalled = false;
		const schedule = (): number => {
			wasCalled = true;
			return 1;
		};

		const rafId = scheduleActionUntilCompleted(100, 100, schedule, (): void => {});

		expect(wasCalled).toBe(false);
		expect(rafId).toBe(0);
	});
});

