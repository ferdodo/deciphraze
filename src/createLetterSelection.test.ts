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

		it("should emit initial null selection", async () => {
			letterSelection = createLetterSelection();
			letterSelection.letterSelection$.subscribe((selected) => {
				expect(selected).toBeNull();
			});
		});
	});

	describe("selectLetter", () => {
		it("should select a letter", () => {
			letterSelection = createLetterSelection();
			letterSelection.selectLetter("A");
			const selected = letterSelection.getLetterSelection();
			expect(selected).toBe("A");
		});

		it("should normalize and uppercase letter", () => {
			letterSelection = createLetterSelection();
			letterSelection.selectLetter("a");
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

		it("should emit updates when clearing selection", async () => {
			letterSelection = createLetterSelection();
			letterSelection.selectLetter("A");

			const updates: (string | null)[] = [];

			letterSelection.letterSelection$.subscribe((selected) => {
				updates.push(selected);
			});

			letterSelection.selectLetter(null);

			await new Promise((resolve) => setTimeout(resolve, 0));

			expect(updates.length).toBeGreaterThanOrEqual(1);
			expect(updates[updates.length - 1]).toBeNull();
		});
	});

	describe("setLetterSelection", () => {
		it("should set letter selection directly", () => {
			letterSelection = createLetterSelection();
			letterSelection.setLetterSelection("B");
			const selected = letterSelection.getLetterSelection();
			expect(selected).toBe("B");
		});

		it("should clear selection with null", () => {
			letterSelection = createLetterSelection();
			letterSelection.setLetterSelection("B");
			letterSelection.setLetterSelection(null);
			const selected = letterSelection.getLetterSelection();
			expect(selected).toBeNull();
		});
	});

	describe("Observable behavior", () => {
		it("should share observable between multiple subscribers", () => {
			letterSelection = createLetterSelection();
			const subscriber1: (string | null)[] = [];
			const subscriber2: (string | null)[] = [];

			letterSelection.letterSelection$.subscribe((selected) => {
				subscriber1.push(selected);
			});

			letterSelection.letterSelection$.subscribe((selected) => {
				subscriber2.push(selected);
			});

			letterSelection.selectLetter("A");

			expect(subscriber1.length).toBeGreaterThan(0);
			expect(subscriber2.length).toBeGreaterThan(0);
		});
	});

	describe("Edge cases", () => {
		it("should handle empty string", () => {
			letterSelection = createLetterSelection();
			letterSelection.selectLetter("");
			const selected = letterSelection.getLetterSelection();
			expect(selected).toBe("");
		});

		it("should handle whitespace", () => {
			letterSelection = createLetterSelection();
			letterSelection.selectLetter("  A  ");
			const selected = letterSelection.getLetterSelection();
			expect(selected).toBe("  A  ");
		});

		it("should handle multiple spaces", () => {
			letterSelection = createLetterSelection();
			letterSelection.selectLetter("   ");
			const selected = letterSelection.getLetterSelection();
			expect(selected).toBe("   ");
		});
	});

	describe("State consistency", () => {
		it("should maintain state consistency between getter and observable", async () => {
			letterSelection = createLetterSelection();
			const observableValues: (string | null)[] = [];

			letterSelection.letterSelection$.subscribe((selected) => {
				observableValues.push(selected);
			});

			letterSelection.selectLetter("A");
			await new Promise((resolve) => setTimeout(resolve, 0));

			const getterValue = letterSelection.getLetterSelection();
			const observableValue = observableValues[observableValues.length - 1];

			expect(getterValue).toBe(observableValue);
		});
	});
});
