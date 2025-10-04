import { describe, it, expect } from "vitest";
import { paragraphOfTheDay } from "./paragraphOfTheDay";

describe("paragraphOfTheDay", () => {
	it("should return a string", () => {
		expect(typeof paragraphOfTheDay).toBe("string");
	});

	it("should return a non-empty string", () => {
		expect(paragraphOfTheDay.length).toBeGreaterThan(0);
	});

	// Les autres tests ont été supprimés car ils ne tuent aucun mutant
});
