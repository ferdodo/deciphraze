import { describe, it, expect } from "vitest";
import { selectLetter } from "./selectLetter";
import { selectSymbol } from "./selectSymbol";
import { withGameStarted } from "../fixtures/withGameStarted";

describe("selectLetter", () => {

	describe("Basic selection", () => {
		it("should deselect letter if already selected", () => {
			const [cleanup, context] = withGameStarted();
			context.letterSelectionRepository.selectLetter("A");
			context.playerCipherRepository.addPlayerCipherEntry("A", "X");
			selectLetter("A", context);
			expect(context.letterSelectionRepository.getLetterSelection()).toBeNull();
			expect(context.playerCipherRepository.getPlayerCipher().A).toBeUndefined();
			cleanup();
		});

		it("should not select non-alphabetic characters", () => {
			const [cleanup, context] = withGameStarted();
			selectLetter("1", context);
			selectLetter("@", context);
			selectLetter(" ", context);
			expect(context.letterSelectionRepository.getLetterSelection()).toBeNull();
			cleanup();
		});

		it("should replace previous symbol association when associating letter to a different symbol", () => {
			const [cleanup, context] = withGameStarted();
			// Créer association A->X
			selectSymbol("X", context);
			selectLetter("A", context);
			expect(context.playerCipherRepository.getPlayerCipher().A).toBe("X");
			
			// Créer association A->Y (remplace A->X)
			selectSymbol("Y", context);
			selectLetter("A", context);
			const cipher = context.playerCipherRepository.getPlayerCipher();
			expect(cipher.A).toBe("Y");
			expect(cipher.A).not.toBe("X");
			cleanup();
		});
	});
});