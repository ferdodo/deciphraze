import { describe, it, expect } from "vitest";
import { generateRandomNumberFromDay } from "./generateRandomNumberFromDay";

describe("generateRandomNumberFromDay", () => {
	it("should return a number within the specified range", () => {
		const result = generateRandomNumberFromDay(5, 10, "2024-01-15");
		expect(result).toBeGreaterThanOrEqual(5);
		expect(result).toBeLessThan(10);
	});

});

