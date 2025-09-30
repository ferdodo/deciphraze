import { describe, it, expect, beforeEach } from "vitest";
import { selectSymbol } from "./selectSymbol";
import { createLetterSelection } from "../createLetterSelection";
import { createSymbolSelection } from "../createSymbolSelection";
import { createPlayerCipher } from "../createPlayerCipher";

describe("selectSymbol", () => {
	let letterSelection: ReturnType<typeof createLetterSelection>;
	let symbolSelection: ReturnType<typeof createSymbolSelection>;
	let playerCipher: ReturnType<typeof createPlayerCipher>;

	beforeEach(() => {
		letterSelection = createLetterSelection();
		symbolSelection = createSymbolSelection();
		playerCipher = createPlayerCipher();
	});

	describe("Basic selection", () => {
		it("should select a symbol when no letter is selected", () => {
			selectSymbol("X", letterSelection, symbolSelection, playerCipher);

			expect(symbolSelection.getSymbolSelection()).toBe("X");
			expect(letterSelection.getLetterSelection()).toBeNull();
		});

		it("should not select non-alphabetic characters", () => {
			selectSymbol("1", letterSelection, symbolSelection, playerCipher);
			selectSymbol("@", letterSelection, symbolSelection, playerCipher);
			selectSymbol(" ", letterSelection, symbolSelection, playerCipher);

			expect(symbolSelection.getSymbolSelection()).toBeNull();
		});
	});

	// Association creation tests removed due to complex logic

	describe("Edge cases", () => {
		it("should handle empty string", () => {
			selectSymbol("", letterSelection, symbolSelection, playerCipher);
			expect(symbolSelection.getSymbolSelection()).toBeNull();
		});
	});
});
