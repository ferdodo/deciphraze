import { describe, it, expect } from "vitest";
import { computeSanitizedCharacter } from "./computeSanitizedCharacter";

describe("computeSanitizedCharacter", () => {
	it("should return the key when cellType is 'letter' and character matches decoded value", () => {
		const playerCipherMap = {
			"A": "X",
			"B": "Y"
		};
		expect(computeSanitizedCharacter("X", playerCipherMap, "letter")).toBe("A");
		expect(computeSanitizedCharacter("Y", playerCipherMap, "letter")).toBe("B");
	});

	it("should return original character when cellType is not 'letter'", () => {
		const playerCipherMap = {
			"A": "X",
			"B": "Y"
		};
		expect(computeSanitizedCharacter("X", playerCipherMap, "symbol")).toBe("X");
		expect(computeSanitizedCharacter("Y", playerCipherMap, "symbol")).toBe("Y");
	});

});
