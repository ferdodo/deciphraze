import { describe, it, expect } from "vitest";
import { isWordFoundInOrder } from "./isWordFoundInOrder";
import type { DiscoveryOrder } from "../types/DiscoveryOrder";

describe("isWordFoundInOrder", () => {
	it("should return false when no word of 5+ letters is found in order", () => {
		const paragraph = "Hello world";
		const discoveryOrder: DiscoveryOrder = ["H", "W", "O", "R", "L"];
		expect(isWordFoundInOrder(paragraph, discoveryOrder)).toBe(false);
	});

	it("should ignore punctuation and case", () => {
		const paragraph = "Hello, world!";
		const discoveryOrder: DiscoveryOrder = ["H", "E", "L", "L", "O"];
		expect(isWordFoundInOrder(paragraph, discoveryOrder)).toBe(true);
	});
});

