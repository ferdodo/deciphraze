import { describe, it, expect } from "vitest";
import { normalizeWord } from "./normalizeWord";

describe("normalizeWord", () => {
	it("should convert to lowercase and remove accents", () => {
		expect(normalizeWord("hello")).toBe("hello");
		expect(normalizeWord("World")).toBe("world");
		expect(normalizeWord("test")).toBe("test");
	});
});
