import { describe, it, expect } from "vitest";
import { getEncodedCharacter } from "./getEncodedCharacter";

describe("getEncodedCharacter", () => {
	it("should encode uppercase letter", () => {
		const result = getEncodedCharacter("A");
		expect(typeof result).toBe("string");
		expect(result.length).toBe(1);
	});

	it("should encode lowercase letter", () => {
		const result = getEncodedCharacter("a");
		expect(typeof result).toBe("string");
		expect(result.length).toBe(1);
	});

	it("should return same character for non-alphabetic", () => {
		const result = getEncodedCharacter("1");
		expect(result).toBe("1");
	});

	it("should return same character for special characters", () => {
		const result = getEncodedCharacter("@");
		expect(result).toBe("@");
	});

	it("should handle space", () => {
		const result = getEncodedCharacter(" ");
		expect(result).toBe(" ");
	});
});
