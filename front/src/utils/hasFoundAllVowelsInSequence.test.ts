import { describe, it, expect } from "vitest";
import { hasFoundAllVowelsInSequence } from "./hasFoundAllVowelsInSequence";
import type { DiscoveryOrder } from "@deciphraze/core";

describe("hasFoundAllVowelsInSequence", () => {
	it("should return false if less than 6 letters discovered", () => {
		const discoveryOrder: DiscoveryOrder = ["A", "E", "I"];
		expect(hasFoundAllVowelsInSequence(discoveryOrder)).toBe(false);
	});

	it("should return true if all vowels are found consecutively", () => {
		const discoveryOrder: DiscoveryOrder = ["A", "E", "I", "O", "U", "Y"];
		expect(hasFoundAllVowelsInSequence(discoveryOrder)).toBe(true);
	});

	it("should return false if vowels are found but not consecutively", () => {
		const discoveryOrder: DiscoveryOrder = ["A", "B", "E", "C", "I", "D", "O", "E", "U", "F", "Y"];
		expect(hasFoundAllVowelsInSequence(discoveryOrder)).toBe(false);
	});
});

