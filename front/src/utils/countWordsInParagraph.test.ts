import { describe, it, expect } from "vitest";
import { countWordsInParagraph } from "./countWordsInParagraph";

describe("countWordsInParagraph", () => {
	it("should count words correctly", () => {
		const paragraph = "Hello world test";
		expect(countWordsInParagraph(paragraph)).toBe(3);
	});

	it("should handle empty paragraph", () => {
		expect(countWordsInParagraph("")).toBe(0);
	});

	it("should handle paragraph with special characters", () => {
		const paragraph = "Hello! @#$ world? 123 test.";
		expect(countWordsInParagraph(paragraph)).toBe(3);
	});

});

