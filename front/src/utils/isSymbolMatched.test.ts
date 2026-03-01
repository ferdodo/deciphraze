import { describe, it, expect } from "vitest";
import { isSymbolMatched } from "./isSymbolMatched";

describe("isSymbolMatched", () => {
	it("should return false when no letter is selected", () => {
		const playerCipher = { A: "X" };
		const result = isSymbolMatched("X", null, playerCipher);
		expect(result).toBe(false);
	});

	it("should return true when symbol matches its decoded letter", () => {
		const playerCipher = { A: "X" };
		const result = isSymbolMatched("X", "A", playerCipher);
		expect(result).toBe(true);
	});

	it("should return false when symbol does not match its decoded letter", () => {
		const playerCipher = { A: "X" };
		const result = isSymbolMatched("Y", "A", playerCipher);
		expect(result).toBe(false);
	});

});
