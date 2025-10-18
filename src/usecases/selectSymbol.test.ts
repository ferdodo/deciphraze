import { describe, it, expect } from "vitest";
import { selectSymbol } from "./selectSymbol";
import {
	createLetterSelectionRepositoryMock,
	createSymbolSelectionRepositoryMock,
	createPlayerCipherRepositoryMock
} from "../mocks";

describe("selectSymbol", () => {
	describe("Basic selection", () => {
		it("should select a symbol when no letter is selected", () => {
			const letterSelection = createLetterSelectionRepositoryMock();
			const symbolSelection = createSymbolSelectionRepositoryMock();
			const playerCipher = createPlayerCipherRepositoryMock();
			selectSymbol("X", letterSelection, symbolSelection, playerCipher);

			expect(symbolSelection.getSymbolSelection()).toBe("X");
			expect(letterSelection.getLetterSelection()).toBeNull();
		});

		it("should not select non-alphabetic characters", () => {
			const letterSelection = createLetterSelectionRepositoryMock();
			const symbolSelection = createSymbolSelectionRepositoryMock();
			const playerCipher = createPlayerCipherRepositoryMock();
			selectSymbol("1", letterSelection, symbolSelection, playerCipher);
			selectSymbol("0", letterSelection, symbolSelection, playerCipher);

			expect(symbolSelection.getSymbolSelection()).toBeNull();
		});

	});
});