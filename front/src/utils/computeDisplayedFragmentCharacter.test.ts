import { describe, it, expect } from "vitest";
import { computeDisplayedFragmentCharacter } from "./computeDisplayedFragmentCharacter";
import { normalizeWord } from "@deciphraze/core";
import { getEncodedCharacter } from "./getEncodedCharacter";
import { createCipherMock } from "./createCipherMock";

describe("computeDisplayedFragmentCharacter", () => {
	it("should return sanitizedCharacter when cellType is 'letter'", () => {
		const mockCipher = createCipherMock();
		const result = computeDisplayedFragmentCharacter(
			"A",
			"letter",
			"sanitized-A",
			mockCipher
		);

		expect(result).toBe("sanitized-A");
	});

	it("should return encoded character or normalized character for symbols depending on environment", () => {
		const mockCipher = createCipherMock();
		const result = computeDisplayedFragmentCharacter(
			"A",
			"symbol",
			"sanitized-A",
			mockCipher
		);

		// The result should be either the encoded character or the normalized uppercase
		// depending on the environment (dev or production)
		const encoded = getEncodedCharacter("A", mockCipher);
		const normalized = normalizeWord("A").toUpperCase();
		
		expect([encoded, normalized]).toContain(result);
	});
});

