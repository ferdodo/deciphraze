import { describe, it, expect } from "vitest";
import { createCipherMock } from "./createCipherMock";

describe("createCipherMock", () => {
	it("should return an array of 26 letters", () => {
		const cipher = createCipherMock();
		expect(cipher).toHaveLength(26);
	});

	it("should return a reversed alphabet (Z to A)", () => {
		const cipher = createCipherMock();
		const expected = ["Z", "Y", "X", "W", "V", "U", "T", "S", "R", "Q", "P", "O", "N", "M", "L", "K", "J", "I", "H", "G", "F", "E", "D", "C", "B", "A"];
		expect(cipher).toEqual(expected);
	});
});

