import { describe, it, expect } from "vitest";
import { generateRandomAlphabet } from "./generateRandomAlphabet";

describe("generateRandomAlphabet", () => {
	const testDate = "2024-01-01";

	it("should return an array of 26 characters", () => {
		const result = generateRandomAlphabet(testDate);
		expect(result).toHaveLength(26);
	});

	it("should return ordered alphabet in development mode", () => {
		const result = generateRandomAlphabet(testDate, true);
		const expectedOrder = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
		expect(result).toEqual(expectedOrder);
	});
});