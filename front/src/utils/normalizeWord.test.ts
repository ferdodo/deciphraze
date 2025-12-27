import { describe, it, expect } from "vitest";
import { normalizeWord } from "./normalizeWord";

describe("normalizeWord", () => {
	it("should normalize words", () => {
		expect(normalizeWord("Hello")).toBe("hello");
		expect(normalizeWord("World")).toBe("world");
		expect(normalizeWord("test")).toBe("test");
	});

	it("should handle accents and special characters", () => {
		expect(normalizeWord("ÉLÉPHANT")).toBe("elephant");
		expect(normalizeWord("Café")).toBe("cafe");
		expect(normalizeWord("naïve")).toBe("naive");
	});

});
