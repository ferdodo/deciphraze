import { describe, it, expect } from "vitest";
import { isLetterMatched } from "./isLetterMatched";
import { createPlayerCipher } from "./createPlayerCipher";

describe("isLetterMatched", () => {
	let playerCipher: ReturnType<typeof createPlayerCipher>;

	it("should return false when no symbol is selected", () => {
		playerCipher = createPlayerCipher();
		playerCipher.addPlayerCipherEntry("A", "X");
		
		const result = isLetterMatched("A", "A", null, playerCipher.getPlayerCipher());
		expect(result).toBe(false);
	});

	it("should return true when letter matches its encoded symbol", () => {
		playerCipher = createPlayerCipher();
		playerCipher.addPlayerCipherEntry("A", "X");
		
		const result = isLetterMatched("A", "A", "X", playerCipher.getPlayerCipher());
		expect(result).toBe(true);
	});

	it("should return false when letter does not match its encoded symbol", () => {
		playerCipher = createPlayerCipher();
		playerCipher.addPlayerCipherEntry("A", "X");
		
		const result = isLetterMatched("A", "A", "Y", playerCipher.getPlayerCipher());
		expect(result).toBe(false);
	});

});
