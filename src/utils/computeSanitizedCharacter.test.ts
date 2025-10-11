import { describe, it, expect } from "vitest";
import { computeSanitizedCharacter } from "./computeSanitizedCharacter";

describe("computeSanitizedCharacter", () => {
	it("should return the key when cellType is 'letter' and character matches decoded value", () => {
		const playerCipherMap = new Map([
			["A", "X"],
			["B", "Y"]
		]);
		expect(computeSanitizedCharacter("X", playerCipherMap, "letter")).toBe("A");
		expect(computeSanitizedCharacter("Y", playerCipherMap, "letter")).toBe("B");
	});

});
