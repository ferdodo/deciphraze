import { describe, it, expect } from "vitest";
import { selectSymbol } from "./selectSymbol";
import { selectLetter } from "./selectLetter";
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

		it("should replace previous letter association when associating symbol to a different letter", () => {
			const [cleanup, context] = withGameStarted();
			// Créer association A->X
			selectLetter("A", context);
			selectSymbol("X", context);
			expect(context.playerCipherRepository.getPlayerCipher().A).toBe("X");
			
			// Créer association B->X (remplace A->X)
			selectLetter("B", context);
			selectSymbol("X", context);
			const cipher = context.playerCipherRepository.getPlayerCipher();
			expect(cipher.A).toBeUndefined();
			expect(cipher.B).toBe("X");
			cleanup();
		});
	});
});