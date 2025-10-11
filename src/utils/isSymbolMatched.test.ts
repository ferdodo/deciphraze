import { describe, it, expect } from "vitest";
import { isSymbolMatched } from "./isSymbolMatched";
import { createPlayerCipher } from "./createPlayerCipher";

describe("isSymbolMatched", () => {
	let playerCipher: ReturnType<typeof createPlayerCipher>;

	it("should return false when no letter is selected", () => {
		playerCipher = createPlayerCipher();
		playerCipher.addPlayerCipherEntry("A", "X");
		
		const result = isSymbolMatched("X", null, playerCipher.getPlayerCipher());
		expect(result).toBe(false);
	});

	it("should return true when symbol matches its decoded letter", () => {
		playerCipher = createPlayerCipher();
		playerCipher.addPlayerCipherEntry("A", "X");
		
		const result = isSymbolMatched("X", "A", playerCipher.getPlayerCipher());
		expect(result).toBe(true);
	});

	it("should return false when symbol does not match its decoded letter", () => {
		playerCipher = createPlayerCipher();
		playerCipher.addPlayerCipherEntry("A", "X");
		
		const result = isSymbolMatched("Y", "A", playerCipher.getPlayerCipher());
		expect(result).toBe(false);
	});

	it("should return false when letter is not in cipher", () => {
		playerCipher = createPlayerCipher();
		playerCipher.addPlayerCipherEntry("B", "X");
		
		const result = isSymbolMatched("X", "A", playerCipher.getPlayerCipher());
		expect(result).toBe(false);
	});
});
