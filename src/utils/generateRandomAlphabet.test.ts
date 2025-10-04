import { describe, it, expect } from "vitest";
import { generateRandomAlphabet } from "./generateRandomAlphabet";

describe("generateRandomAlphabet", () => {
	it("should return an array of 26 characters", () => {
		const result = generateRandomAlphabet();
		expect(result).toHaveLength(26);
	});
});
