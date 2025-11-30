import { describe, it, expect } from "vitest";
import { isWordFoundInOrder } from "./isWordFoundInOrder";
import type { DiscoveryOrder } from "../entities/DiscoveryOrder";

describe("isWordFoundInOrder", () => {
	it("should ignore punctuation and case", () => {
		const paragraph = "Hello, world!";
		const discoveryOrder: DiscoveryOrder = ["H", "E", "L", "L", "O"];
		expect(isWordFoundInOrder(paragraph, discoveryOrder)).toBe(true);
	});
});

