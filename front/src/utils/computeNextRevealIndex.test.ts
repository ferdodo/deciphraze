import { describe, it, expect } from "vitest";
import { computeNextRevealIndex } from "./computeNextRevealIndex";

describe("computeNextRevealIndex", () => {
	it("reveals 100 words from the start of the string", () => {
		const input = Array.from({ length: 101 }, () => "a").join(" ");
		expect(computeNextRevealIndex(input, 0)).toBe(200);
	});

	it("reveals 100 words from the provided index", () => {
		const prefix = Array.from({ length: 5 }, () => "abcdefghij").join(" ");
		const suffix = Array.from({ length: 101 }, () => "a").join(" ");
		const input = `${prefix} ${suffix}`;
		const from = prefix.length + 1;

		expect(computeNextRevealIndex(input, from)).toBe(input.length - 1);
	});
});
