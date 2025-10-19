import { describe, it, expect } from "vitest";
import { isWin } from "./isWin";
import type { PlayerCipher } from "../types/PlayerCipher";

describe("isWin", () => {
	it("should return true when all letters are found", () => {
		const playerCipher: PlayerCipher = {
			A: "A",
			B: "B", 
			C: "C"
		};
		const paragraph = "ABC";

		expect(isWin(playerCipher, paragraph)).toBe(true);
	});

	it("should return false when some letters are missing", () => {
		const playerCipher: PlayerCipher = {
			A: "A",
			B: "B"
		};
		const paragraph = "ABC";

		expect(isWin(playerCipher, paragraph)).toBe(false);
	});


	it("should handle non-alphabetic characters", () => {
		const playerCipher: PlayerCipher = {
			A: "A"
		};
		const paragraph = "A!@#";

		expect(isWin(playerCipher, paragraph)).toBe(true);
	});
});
