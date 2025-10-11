import { describe, it, expect } from "vitest";
import { letterFound } from "./letterFound";
import { createPlayerCipher } from "./createPlayerCipher";

describe("letterFound", () => {

	it("should return true for non-alphabetic characters", () => {
		const playerCipher = createPlayerCipher();
		expect(letterFound("1", playerCipher)).toBe(true);
		expect(letterFound("!", playerCipher)).toBe(true);
		expect(letterFound(" ", playerCipher)).toBe(true);
		expect(letterFound("", playerCipher)).toBe(true);
	});

	it("should return true when letter matches its encoded value", () => {
		const playerCipher = createPlayerCipher();
		playerCipher.addPlayerCipherEntry("A", "A");
		expect(letterFound("A", playerCipher)).toBe(true);
	});

	it("should return false when letter does not match its encoded value", () => {
		const playerCipher = createPlayerCipher();
		playerCipher.addPlayerCipherEntry("A", "B");
		expect(letterFound("A", playerCipher)).toBe(false);
	});


	it("should handle normalized words", () => {
		const playerCipher = createPlayerCipher();
		playerCipher.addPlayerCipherEntry("A", "à");
		expect(letterFound("A", playerCipher)).toBe(true);
		expect(letterFound("à", playerCipher)).toBe(true);
	});

});
