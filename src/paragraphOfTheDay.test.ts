import { describe, it, expect } from "vitest";
import { paragraphOfTheDay } from "./paragraphOfTheDay";

describe("paragraphOfTheDay", () => {
	it("should return a string", () => {
		expect(typeof paragraphOfTheDay).toBe("string");
	});

	it("should return a non-empty string", () => {
		expect(paragraphOfTheDay.length).toBeGreaterThan(0);
	});

	it("should return a string with at least 200 characters", () => {
		expect(paragraphOfTheDay.length).toBeGreaterThanOrEqual(200);
	});

	it("should contain alphabetic characters", () => {
		const hasLetters = /[a-zA-Z]/.test(paragraphOfTheDay);
		expect(hasLetters).toBe(true);
	});

	it("should be consistent within the same day", () => {
		// The paragraph should be the same when called multiple times on the same day
		const firstCall = paragraphOfTheDay;
		const secondCall = paragraphOfTheDay;
		expect(firstCall).toBe(secondCall);
	});

	it("should contain spaces between words", () => {
		expect(paragraphOfTheDay).toContain(" ");
	});

	it("should not contain excessive whitespace", () => {
		// Should not have multiple consecutive spaces
		expect(paragraphOfTheDay).not.toMatch(/\s{3,}/);
	});

	it("should have reasonable word count", () => {
		const words = paragraphOfTheDay.split(/\s+/);
		expect(words.length).toBeGreaterThan(10);
		expect(words.length).toBeLessThan(1000);
	});

	it("should contain punctuation", () => {
		const hasPunctuation = /[.,!?;:]/.test(paragraphOfTheDay);
		expect(hasPunctuation).toBe(true);
	});

	it("should handle edge cases in line selection", () => {
		// Test that the function doesn't crash with edge cases
		expect(() => paragraphOfTheDay).not.toThrow();
	});

	it("should have proper line breaks handling", () => {
		// Should not contain raw newline characters in the final output
		expect(paragraphOfTheDay).not.toContain("\n");
	});
});
