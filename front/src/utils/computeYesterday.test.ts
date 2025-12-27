import { describe, it, expect } from "vitest";
import { computeYesterday } from "./computeYesterday";

describe("computeYesterday", () => {
	it("should return yesterday's date", () => {
		const result = computeYesterday("2024-01-15");
		expect(result).toBe("2024-01-14");
	});
});

