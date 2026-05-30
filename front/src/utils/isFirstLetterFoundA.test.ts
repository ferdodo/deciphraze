import { describe, it, expect } from "vitest";
import { isFirstLetterFoundA } from "./isFirstLetterFoundA";
import type { DiscoveryOrder } from "@deciphraze/core";

describe("isFirstLetterFoundA", () => {
	it("should return false when discovery order is empty", () => {
		const discoveryOrder: DiscoveryOrder = [];
		expect(isFirstLetterFoundA(discoveryOrder)).toBe(false);
	});

	it("should return true when first letter discovered is A", () => {
		const discoveryOrder: DiscoveryOrder = ["A", "B", "C"];
		expect(isFirstLetterFoundA(discoveryOrder)).toBe(true);
	});

	it("should return false when first letter discovered is not A", () => {
		const discoveryOrder: DiscoveryOrder = ["B", "A", "C"];
		expect(isFirstLetterFoundA(discoveryOrder)).toBe(false);
	});
});
