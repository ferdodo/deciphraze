import { describe, it, expect } from "vitest";
import { generateRandomAlphabet } from "./generateRandomAlphabet";

describe("generateRandomAlphabet", () => {
	it("should return an array of 26 characters", () => {
		const result = generateRandomAlphabet();
		expect(result).toHaveLength(26);
	});

	it("should return ordered alphabet in development mode", () => {
		const result = generateRandomAlphabet(true);
		const expectedOrder = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
		expect(result).toEqual(expectedOrder);
	});

	it("should return different results on multiple calls in production mode", () => {
		const result1 = generateRandomAlphabet(false);
		const result2 = generateRandomAlphabet(false);
		expect(result1).not.toEqual(result2);
	});
});