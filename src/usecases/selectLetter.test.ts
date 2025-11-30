import { describe, it, expect } from "vitest";
import { selectLetter } from "./selectLetter";
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
	});
});