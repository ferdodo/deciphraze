import { describe, it, expect } from "vitest";
import { createLetterSelection } from "./createLetterSelection";

describe("createLetterSelection", () => {
	describe("localStorage persistence", () => {
		it("should load from localStorage on initialization", () => {
			localStorage.setItem("deciphraze_letter_selection", '"D"');
			const newLetterSelection = createLetterSelection();
			expect(newLetterSelection.getLetterSelection()).toBe("D");
		});


		it("should handle invalid localStorage data", () => {
			localStorage.setItem("deciphraze_letter_selection", "invalid json");
			const newLetterSelection = createLetterSelection();
			expect(newLetterSelection.getLetterSelection()).toBeNull();
		});

	});
});
