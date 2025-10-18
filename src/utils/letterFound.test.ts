import { describe, it, expect } from "vitest";
import { letterFound } from "./letterFound";

describe("letterFound", () => {

	it("should return true for non-alphabetic characters", () => {
		const playerCipher = {};
		expect(letterFound("1", playerCipher)).toBe(true);
		expect(letterFound("!", playerCipher)).toBe(true);
		expect(letterFound(" ", playerCipher)).toBe(true);
		expect(letterFound("", playerCipher)).toBe(true);
	});

	it("should return true when letter matches its encoded value", () => {
		const playerCipher = { "A": "A" };
		expect(letterFound("A", playerCipher)).toBe(true);
	});

	it("should return false when letter does not match its encoded value", () => {
		const playerCipher = { "A": "B" };
		expect(letterFound("A", playerCipher)).toBe(false);
	});


});
