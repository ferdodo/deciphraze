import { describe, it, expect } from "vitest";
import { randomNumberForYesterday } from "./randomNumberForYesterday";

describe("randomNumberForYesterday", () => {
	it("should return a number within the specified range", () => {
		const result = randomNumberForYesterday(5, 10);
		expect(result).toBeGreaterThanOrEqual(5);
		expect(result).toBeLessThan(10);
	});
});
