import { describe, it, expect } from "vitest";
import { getEncodedCharacter } from "./getEncodedCharacter";

describe("getEncodedCharacter", () => {
	it("should encode uppercase letter", () => {
		const result = getEncodedCharacter("A");
		expect(typeof result).toBe("string");
		expect(result.length).toBe(1);
	});


	it("should handle special characters", () => {
		const result = getEncodedCharacter("é");
		expect(typeof result).toBe("string");
		expect(result.length).toBe(1);
	});
});
