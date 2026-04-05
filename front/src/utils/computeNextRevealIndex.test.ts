import { describe, it, expect } from "vitest";
import { computeNextRevealIndex } from "./computeNextRevealIndex";

describe("computeNextRevealIndex", () => {
	it("advances by 5 words from the start of the string", () => {
		const input = "one two three four five six seven";
		// "one two three four five" = 23 chars, next index = 24 (start of "six")
		expect(computeNextRevealIndex(input, 0)).toBe(24);
	});

});
