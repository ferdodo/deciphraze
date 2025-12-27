import { describe, it, expect } from "vitest";
import { computeCellType } from "./computeCellType";

describe("computeCellType", () => {
	it("should return 'letter' when character matches a decoded value", () => {
		const playerCipherMap = {
			"A": "X",
			"B": "Y"
		};
		expect(computeCellType("X", playerCipherMap)).toBe("letter");
		expect(computeCellType("Y", playerCipherMap)).toBe("letter");
	});

	it("should return 'symbol' when character does not match any decoded value", () => {
		const playerCipherMap = {
			"A": "X",
			"B": "Y"
		};
		expect(computeCellType("Z", playerCipherMap)).toBe("symbol");
		expect(computeCellType("W", playerCipherMap)).toBe("symbol");
	});

	it("should return 'letter' for non-alphabetic characters", () => {
		const playerCipherMap = {
			"A": "X",
			"B": "Y"
		};
		expect(computeCellType("1", playerCipherMap)).toBe("letter");
		expect(computeCellType("@", playerCipherMap)).toBe("letter");
		expect(computeCellType(" ", playerCipherMap)).toBe("letter");
		expect(computeCellType("!", playerCipherMap)).toBe("letter");
	});

});
