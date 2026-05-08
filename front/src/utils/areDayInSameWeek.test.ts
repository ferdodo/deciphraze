import { describe, it, expect } from "vitest";
import { areDayInSameWeek } from "./areDayInSameWeek";

describe("areDayInSameWeek", () => {
	it("should return false for days in different weeks", () => {
		// Friday of week 1 and Monday of week 2
		expect(areDayInSameWeek("2026-05-08", "2026-05-11")).toBe(false);
	});

	it("should handle week boundaries correctly", () => {
		// Sunday and Monday are in different weeks
		expect(areDayInSameWeek("2026-05-10", "2026-05-11")).toBe(false);
	});
});
