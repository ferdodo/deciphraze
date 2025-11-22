import { describe, it, expect } from "vitest";
import { isAlphaAndOmega } from "./isAlphaAndOmega";
import type { DiscoveryOrder } from "../types/DiscoveryOrder";

describe("isAlphaAndOmega", () => {
	it("should return false when paragraph has no letters", () => {
		const paragraph = "!@#$%";
		const discoveryOrder: DiscoveryOrder = ["A"];
		expect(isAlphaAndOmega(paragraph, discoveryOrder)).toBe(false);
	});
});

