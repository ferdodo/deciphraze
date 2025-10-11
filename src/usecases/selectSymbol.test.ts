import { describe, it, expect } from "vitest";
import { selectSymbol } from "./selectSymbol";
import { createLetterSelection } from "../utils/createLetterSelection";
import { createSymbolSelection } from "../utils/createSymbolSelection";
import { createPlayerCipher } from "../utils/createPlayerCipher";

describe("selectSymbol", () => {
	let letterSelection: ReturnType<typeof createLetterSelection>;
	let symbolSelection: ReturnType<typeof createSymbolSelection>;
	let playerCipher: ReturnType<typeof createPlayerCipher>;

	describe("Basic selection", () => {
		it("should select a symbol when no letter is selected", () => {
			letterSelection = createLetterSelection();
			symbolSelection = createSymbolSelection();
			playerCipher = createPlayerCipher();
			selectSymbol("X", letterSelection, symbolSelection, playerCipher);

			expect(symbolSelection.getSymbolSelection()).toBe("X");
			expect(letterSelection.getLetterSelection()).toBeNull();
		});

		it("should not select non-alphabetic characters", () => {
			letterSelection = createLetterSelection();
			symbolSelection = createSymbolSelection();
			playerCipher = createPlayerCipher();
			selectSymbol("1", letterSelection, symbolSelection, playerCipher);
			selectSymbol("@", letterSelection, symbolSelection, playerCipher);
			selectSymbol(" ", letterSelection, symbolSelection, playerCipher);

			expect(symbolSelection.getSymbolSelection()).toBeNull();
		});

	});
});
