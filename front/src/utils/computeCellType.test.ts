import { describe, it, expect } from "vitest";
import { computeCellType } from "./computeCellType";

describe("computeCellType", () => {
	it("should return 'letter' when character matches a decoded value", () => {
		const playerCipherMap = {
			"A": "X",
			"B": "Y"
		};
		expect(computeCellType("X", playerCipherMap, false)).toBe("letter");
		expect(computeCellType("Y", playerCipherMap, false)).toBe("letter");
	});

	it("should return 'symbol' when character does not match any decoded value and isWin is false", () => {
		const playerCipherMap = {
			"A": "X",
			"B": "Y"
		};
		expect(computeCellType("Z", playerCipherMap, false)).toBe("symbol");
		expect(computeCellType("W", playerCipherMap, false)).toBe("symbol");
	});

	it("should return 'letter' when character does not match any decoded value but isWin is true", () => {
		const playerCipherMap = {
			"A": "X",
			"B": "Y"
		};
		expect(computeCellType("Z", playerCipherMap, true)).toBe("letter");
		expect(computeCellType("W", playerCipherMap, true)).toBe("letter");
	});

	it("should return 'letter' for non-alphabetic characters", () => {
		const playerCipherMap = {
			"A": "X",
			"B": "Y"
		};
		expect(computeCellType("1", playerCipherMap, false)).toBe("letter");
		expect(computeCellType("@", playerCipherMap, false)).toBe("letter");
		expect(computeCellType(" ", playerCipherMap, false)).toBe("letter");
		expect(computeCellType("!", playerCipherMap, false)).toBe("letter");
	});

});
