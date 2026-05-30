import { describe, it, expect } from "vitest";
import { hasStartingLetterDoubledInParagraph } from "./hasStartingLetterDoubledInParagraph";

describe("hasStartingLetterDoubledInParagraph", () => {
	it("should return false when discoveryOrder is empty", () => {
		expect(hasStartingLetterDoubledInParagraph("Hello world", [])).toBe(false);
	});

	it("should return true when the first discovered letter is doubled in the paragraph", () => {
		expect(hasStartingLetterDoubledInParagraph("Hello world", ["L"])).toBe(true);
	});
});
