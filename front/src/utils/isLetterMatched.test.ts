import { describe, it, expect } from "vitest";
import { isLetterMatched } from "./isLetterMatched";

describe("isLetterMatched", () => {
	it("should return false when no symbol is selected", () => {
		const playerCipher = { A: "X" };
		const result = isLetterMatched("A", "A", null, playerCipher);
		expect(result).toBe(false);
	});

	it("should return true when letter matches its encoded symbol", () => {
		const playerCipher = { A: "X" };
		const result = isLetterMatched("A", "A", "X", playerCipher);
		expect(result).toBe(true);
	});

	it("should return false when letter does not match its encoded symbol", () => {
		const playerCipher = { A: "X" };
		const result = isLetterMatched("A", "A", "Y", playerCipher);
		expect(result).toBe(false);
	});

});
