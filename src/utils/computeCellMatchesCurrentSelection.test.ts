import { describe, it, expect } from "vitest";
import { computeCellMatchesCurrentSelection } from "./computeCellMatchesCurrentSelection";

describe("computeCellMatchesCurrentSelection", () => {
	it("should return true when cellType is 'letter' and selectedLetter matches sanitizedCharacter", () => {
		const playerCipherMap = new Map();
		expect(computeCellMatchesCurrentSelection("A", playerCipherMap, "A", null, "letter", "A")).toBe(true);
	});

	it("should return true when cellType is 'symbol' and selectedSymbol matches character", () => {
		const playerCipherMap = new Map();
		expect(computeCellMatchesCurrentSelection("X", playerCipherMap, null, "X", "symbol", "X")).toBe(true);
	});

	it("should return false when selectedLetter is null and cellType is 'letter'", () => {
		const playerCipherMap = new Map();
		expect(computeCellMatchesCurrentSelection("A", playerCipherMap, null, null, "letter", "A")).toBe(false);
	});

	it("should return false when selectedSymbol is null and cellType is 'symbol'", () => {
		const playerCipherMap = new Map();
		expect(computeCellMatchesCurrentSelection("X", playerCipherMap, null, null, "symbol", "X")).toBe(false);
	});
});
