import { describe, it, expect } from "vitest";
import { createLetterSelection } from "./createLetterSelection";

describe("createLetterSelection", () => {
	let letterSelection: ReturnType<typeof createLetterSelection>;

	describe("Initialization", () => {
		it("should start with no selection", () => {
			letterSelection = createLetterSelection();
			const selected = letterSelection.getLetterSelection();
			expect(selected).toBeNull();
		});
	});

	describe("selectLetter", () => {
		it("should select a letter", () => {
			letterSelection = createLetterSelection();
			letterSelection.selectLetter("A");
			const selected = letterSelection.getLetterSelection();
			expect(selected).toBe("A");
		});

		it("should handle special characters", () => {
			letterSelection = createLetterSelection();
			letterSelection.selectLetter("é");
			const selected = letterSelection.getLetterSelection();
			expect(selected).toBe("E");
		});

		it("should clear selection with null", () => {
			letterSelection = createLetterSelection();
			letterSelection.selectLetter("A");
			letterSelection.selectLetter(null);
			const selected = letterSelection.getLetterSelection();
			expect(selected).toBeNull();
		});

		it("should emit updates when selecting letters", async () => {
			letterSelection = createLetterSelection();
			const updates: (string | null)[] = [];

			letterSelection.letterSelection$.subscribe((selected) => {
				updates.push(selected);
			});

			letterSelection.selectLetter("A");

			await new Promise((resolve) => setTimeout(resolve, 0));

			expect(updates.length).toBeGreaterThanOrEqual(1);
			expect(updates[updates.length - 1]).toBe("A");
		});
	});
});
