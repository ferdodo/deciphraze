import { describe, it, expect } from "vitest";
import { getEncodedCharacter } from "./getEncodedCharacter";
import { generateRandomAlphabet } from "./generateRandomAlphabet";

describe("getEncodedCharacter", () => {
	const testDate = "2024-01-01";
	const cipher = generateRandomAlphabet(testDate);

	it("should encode uppercase letter", () => {
		const result = getEncodedCharacter("A", cipher);
		expect(typeof result).toBe("string");
		expect(result.length).toBe(1);
	});

	it("should work with custom cipher", () => {
		const customCipher = ["Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A"];
		const result = getEncodedCharacter("A", customCipher);
		expect(result).toBe("Z"); // A is at position 25 in cipher, so returns alphabet[25] = Z
	});

	it("should return original character when not found in cipher", () => {
		const customCipher = ["B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "A"];
		const result = getEncodedCharacter("1", customCipher); // Non-alphabetic character
		expect(result).toBe("1"); // Should return original character when not found
	});


});
