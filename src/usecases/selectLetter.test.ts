import { describe, it, expect } from "vitest";
import { selectLetter } from "./selectLetter";
import { createLetterSelection } from "../createLetterSelection";
import { createSymbolSelection } from "../createSymbolSelection";
import { createPlayerCipher } from "../createPlayerCipher";

describe("selectLetter", () => {
	let letterSelection: ReturnType<typeof createLetterSelection>;
	let symbolSelection: ReturnType<typeof createSymbolSelection>;
	let playerCipher: ReturnType<typeof createPlayerCipher>;

	describe("Basic selection", () => {
		it("should select a letter when no symbol is selected", () => {
			letterSelection = createLetterSelection();
			symbolSelection = createSymbolSelection();
			playerCipher = createPlayerCipher();
			selectLetter("A", letterSelection, symbolSelection, playerCipher);

			expect(letterSelection.getLetterSelection()).toBe("A");
			expect(symbolSelection.getSymbolSelection()).toBeNull();
		});

		it("should deselect letter if already selected", () => {
			letterSelection = createLetterSelection();
			symbolSelection = createSymbolSelection();
			playerCipher = createPlayerCipher();
			letterSelection.selectLetter("A");
			playerCipher.addPlayerCipherEntry("A", "X");

			selectLetter("A", letterSelection, symbolSelection, playerCipher);

			expect(letterSelection.getLetterSelection()).toBeNull();
			expect(playerCipher.getPlayerCipher().has("A")).toBe(false);
		});

		it("should not select non-alphabetic characters", () => {
			letterSelection = createLetterSelection();
			symbolSelection = createSymbolSelection();
			playerCipher = createPlayerCipher();
			selectLetter("1", letterSelection, symbolSelection, playerCipher);
			selectLetter("@", letterSelection, symbolSelection, playerCipher);
			selectLetter(" ", letterSelection, symbolSelection, playerCipher);

			expect(letterSelection.getLetterSelection()).toBeNull();
		});
	});

	describe("Edge cases", () => {
		it("should handle empty string", () => {
			letterSelection = createLetterSelection();
			symbolSelection = createSymbolSelection();
			playerCipher = createPlayerCipher();
			selectLetter("", letterSelection, symbolSelection, playerCipher);
			expect(letterSelection.getLetterSelection()).toBeNull();
		});
	});
});
