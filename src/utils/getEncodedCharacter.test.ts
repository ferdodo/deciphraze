import { describe, it, expect } from "vitest";
import { getEncodedCharacter } from "./getEncodedCharacter";
import { createCipherService } from "../services/createCipherService";

describe("getEncodedCharacter", () => {
	const cipherService = createCipherService();
	const cipher = cipherService.getCipher();

	it("should encode uppercase letter", () => {
		const result = getEncodedCharacter("A", cipher);
		expect(typeof result).toBe("string");
		expect(result.length).toBe(1);
	});

	it("should handle special characters", () => {
		const result = getEncodedCharacter("é", cipher);
		expect(typeof result).toBe("string");
		expect(result.length).toBe(1);
	});

	it("should work with custom cipher", () => {
		const customCipher = ["Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A"];
		const result = getEncodedCharacter("A", customCipher);
		expect(result).toBe("Z"); // A is at position 25 in cipher, so returns alphabet[25] = Z
	});
});
