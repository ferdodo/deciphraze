import { describe, it, expect } from "vitest";
import { getCurrentDate } from "./getCurrentDate";

describe("getCurrentDate", () => {
	it("should return current date in YYYY-MM-DD format", () => {
		const result = getCurrentDate();
		const today = new Date();
		const expectedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
		
		expect(result).toBe(expectedDate);
		expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
	});
});
