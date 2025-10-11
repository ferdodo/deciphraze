import { describe, it, expect } from "vitest";
import { createLetterSelection } from "./createLetterSelection";

describe("createLetterSelection", () => {
	let letterSelection: ReturnType<typeof createLetterSelection>;


	describe("selectLetter", () => {
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

	describe("setLetterSelection", () => {
		it("should set letter selection directly", () => {
			letterSelection = createLetterSelection();
			letterSelection.setLetterSelection("B");
			const selected = letterSelection.getLetterSelection();
			expect(selected).toBe("B");
		});

	});

});
