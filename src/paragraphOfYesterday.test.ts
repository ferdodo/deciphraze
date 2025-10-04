import { describe, it, expect } from "vitest";
import { paragraphOfYesterday } from "./paragraphOfYesterday";

describe("paragraphOfYesterday", () => {
	it("should return a string", () => {
		expect(typeof paragraphOfYesterday).toBe("string");
	});

	it("should return a non-empty string", () => {
		expect(paragraphOfYesterday.length).toBeGreaterThan(0);
	});

	// Les autres tests ont été supprimés car ils ne tuent aucun mutant
});
