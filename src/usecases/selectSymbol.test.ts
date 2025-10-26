import { describe, it, expect } from "vitest";
import { selectSymbol } from "./selectSymbol";
import { withGameStarted } from "../fixtures/withGameStarted";

describe("selectSymbol", () => {
	describe("Basic selection", () => {
		it("should select a symbol when no letter is selected", () => {
			const [cleanup, context] = withGameStarted();
			selectSymbol("X", context);
			expect(context.symbolSelectionRepository.getSymbolSelection()).toBe("X");
			expect(context.letterSelectionRepository.getLetterSelection()).toBeNull();
			cleanup();
		});

		it("should not select non-alphabetic characters", () => {
			const [cleanup, context] = withGameStarted();
			selectSymbol("1", context);
			selectSymbol("0", context);
			expect(context.symbolSelectionRepository.getSymbolSelection()).toBeNull();
			cleanup();
		});
	});
});