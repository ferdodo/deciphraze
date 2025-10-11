import { describe, it, expect } from "vitest";
import { computeCellType } from "./computeCellType";

describe("computeCellType", () => {
	it("should return 'letter' when character matches a decoded value", () => {
		const playerCipherMap = new Map([
			["A", "X"],
			["B", "Y"]
		]);
		expect(computeCellType("X", playerCipherMap)).toBe("letter");
		expect(computeCellType("Y", playerCipherMap)).toBe("letter");
	});

	it("should return 'symbol' when character does not match any decoded value", () => {
		const playerCipherMap = new Map([
			["A", "X"],
			["B", "Y"]
		]);
		expect(computeCellType("Z", playerCipherMap)).toBe("symbol");
		expect(computeCellType("W", playerCipherMap)).toBe("symbol");
	});

});
