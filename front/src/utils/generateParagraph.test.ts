import { describe, it, expect } from "vitest";
import { generateParagraph } from "./generateParagraph";

describe("generateParagraph", () => {
	it("should return a paragraph with at least 200 characters", () => {
		const result = generateParagraph("2024-01-15");
		expect(result.length).toBeGreaterThanOrEqual(200);
	});
});

