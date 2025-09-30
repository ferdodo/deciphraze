import { describe, it, expect, beforeEach } from "vitest";
import { createLetterSelection } from "./createLetterSelection";

describe("createLetterSelection", () => {
	let letterSelection: ReturnType<typeof createLetterSelection>;

	beforeEach(() => {
		letterSelection = createLetterSelection();
	});

	describe("Initialization", () => {
		it("should start with no selection", () => {
			const selected = letterSelection.getLetterSelection();
			expect(selected).toBeNull();
		});

		it("should emit initial null selection", async () => {
			letterSelection.letterSelection$.subscribe((selected) => {
				expect(selected).toBeNull();
			});
		});
	});

	describe("selectLetter", () => {
		it("should select a letter", () => {
			letterSelection.selectLetter("A");
			const selected = letterSelection.getLetterSelection();
			expect(selected).toBe("A");
		});

		it("should normalize and uppercase letter", () => {
			letterSelection.selectLetter("a");
			const selected = letterSelection.getLetterSelection();
			expect(selected).toBe("A");
		});

		it("should handle special characters", () => {
			letterSelection.selectLetter("é");
			const selected = letterSelection.getLetterSelection();
			expect(selected).toBe("E"); // normalizeWord converts é to E
		});

		it("should clear selection with null", () => {
			letterSelection.selectLetter("A");
			letterSelection.selectLetter(null);
			const selected = letterSelection.getLetterSelection();
			expect(selected).toBeNull();
		});

		it("should emit updates when selecting letters", async () => {
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
			letterSelection.setLetterSelection("B");
			const selected = letterSelection.getLetterSelection();
			expect(selected).toBe("B");
		});

		it("should clear selection with null", () => {
			letterSelection.setLetterSelection("B");
			letterSelection.setLetterSelection(null);
			const selected = letterSelection.getLetterSelection();
			expect(selected).toBeNull();
		});
	});

	describe("Observable behavior", () => {
		it("should share observable between multiple subscribers", () => {
			const subscriber1: (string | null)[] = [];
			const subscriber2: (string | null)[] = [];

			letterSelection.letterSelection$.subscribe((selected) => {
				subscriber1.push(selected);
			});

			letterSelection.letterSelection$.subscribe((selected) => {
				subscriber2.push(selected);
			});

			letterSelection.selectLetter("A");

			// Both subscribers should receive the same updates
			expect(subscriber1.length).toBeGreaterThan(0);
			expect(subscriber2.length).toBeGreaterThan(0);
		});
	});

	describe("Edge cases", () => {
		it("should handle empty string", () => {
			letterSelection.selectLetter("");
			const selected = letterSelection.getLetterSelection();
			expect(selected).toBe("");
		});

		it("should handle whitespace", () => {
			letterSelection.selectLetter("  A  ");
			const selected = letterSelection.getLetterSelection();
			expect(selected).toBe("  A  "); // normalizeWord doesn't trim
		});

		it("should handle multiple spaces", () => {
			letterSelection.selectLetter("   ");
			const selected = letterSelection.getLetterSelection();
			expect(selected).toBe("   "); // normalizeWord doesn't trim
		});
	});

	describe("State consistency", () => {
		it("should maintain state consistency between getter and observable", async () => {
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
