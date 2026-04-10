import { describe, it, expect } from "vitest";
import { getAlphabetLettersInText } from "./getAlphabetLettersInText";

describe("getAlphabetLettersInText", () => {
	it("should return sorted unique letters from a simple text", () => {
		const result = getAlphabetLettersInText("abc");
		expect(result).toEqual(["A", "B", "C"]);
	});

	it("should return letters in alphabetical order", () => {
		const result = getAlphabetLettersInText("cba");
		expect(result).toEqual(["A", "B", "C"]);
	});

	it("should ignore non-alphabetic characters", () => {
		const result = getAlphabetLettersInText("a1b2c3!?");
		expect(result).toEqual(["A", "B", "C"]);
	});
});
