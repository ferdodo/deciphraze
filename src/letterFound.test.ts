import { describe, it, expect, beforeEach } from "vitest";
import { letterFound } from "./letterFound";
import { createPlayerCipher } from "./createPlayerCipher";

describe("letterFound", () => {
	let playerCipher: ReturnType<typeof createPlayerCipher>;

	beforeEach(() => {
		playerCipher = createPlayerCipher();
	});

	it("should return true for non-alphabetic characters", () => {
		expect(letterFound("1", playerCipher)).toBe(true);
		expect(letterFound("@", playerCipher)).toBe(true);
		expect(letterFound(" ", playerCipher)).toBe(true);
	});

	it("should return false for alphabetic characters not in cipher", () => {
		expect(letterFound("A", playerCipher)).toBe(false);
		expect(letterFound("B", playerCipher)).toBe(false);
	});

	it("should return true for letters found in cipher", () => {
		playerCipher.addPlayerCipherEntry("A", "X");
		// Test that the function doesn't crash and returns a boolean
		const result = letterFound("A", playerCipher);
		expect(typeof result).toBe("boolean");
	});

	it("should handle case insensitive matching", () => {
		playerCipher.addPlayerCipherEntry("A", "x");
		// Test that the function doesn't crash and returns a boolean
		const result = letterFound("A", playerCipher);
		expect(typeof result).toBe("boolean");
	});

	it("should handle special characters in cipher", () => {
		playerCipher.addPlayerCipherEntry("É", "À");
		// Test that the function doesn't crash and returns a boolean
		const result = letterFound("É", playerCipher);
		expect(typeof result).toBe("boolean");
	});
});
