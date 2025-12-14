import { describe, it, expect } from "vitest";
import { isAlphaAndOmega } from "./isAlphaAndOmega";
import type { DiscoveryOrder } from "../entities/DiscoveryOrder";

describe("isAlphaAndOmega", () => {
	it("should return false when paragraph has no letters", () => {
		const paragraph = "!@#$%";
		const discoveryOrder: DiscoveryOrder = ["A"];
		expect(isAlphaAndOmega(paragraph, discoveryOrder)).toBe(false);
	});

	it("should ignore punctuation at the beginning and end", () => {
		const paragraph = "- Ah !";
		const discoveryOrder: DiscoveryOrder = ["A", "H"];
		expect(isAlphaAndOmega(paragraph, discoveryOrder)).toBe(true);
	});

	it("should return false when first letter doesn't match", () => {
		const paragraph = "- Ah !";
		const discoveryOrder: DiscoveryOrder = ["H", "A"];
		expect(isAlphaAndOmega(paragraph, discoveryOrder)).toBe(false);
	});

	it("should return false when last letter doesn't match", () => {
		const paragraph = "Hello World!";
		const discoveryOrder: DiscoveryOrder = ["H", "E", "L", "L", "O", "W", "O", "R", "L", "A"];
		expect(isAlphaAndOmega(paragraph, discoveryOrder)).toBe(false);
	});
});

