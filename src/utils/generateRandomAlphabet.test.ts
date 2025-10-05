import { describe, it, expect } from "vitest";
import { generateRandomAlphabet } from "./generateRandomAlphabet";

describe("generateRandomAlphabet", () => {
	it("should return an array of 26 characters", () => {
		const result = generateRandomAlphabet();
		expect(result).toHaveLength(26);
	});

	it("should return different results on multiple calls", () => {
		const result1 = generateRandomAlphabet();
		const result2 = generateRandomAlphabet();
		expect(result1).not.toEqual(result2);
	});

});
