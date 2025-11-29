import { describe, it, expect } from "vitest";
import { calculatePreferredLetters } from "./calculatePreferredLetters";

describe("calculatePreferredLetters", () => {
	it("should return empty array when letterPositions is empty", () => {
		const result = calculatePreferredLetters([], 10);
		expect(result).toEqual([]);
	});

	it("should calculate score for a single game with 5 letters", () => {
		const letterPositions = [["A", "B", "C", "D", "E"]];
		const result = calculatePreferredLetters(letterPositions, 10);

		expect(result).toHaveLength(5);
		expect(result[0].letter).toBe("A");
		expect(result[0].score).toBe(1.4); // Position 1
		expect(result[1].letter).toBe("B");
		expect(result[1].score).toBe(1.3); // Position 2
		expect(result[2].letter).toBe("C");
		expect(result[2].score).toBe(1.2); // Position 3
		expect(result[3].letter).toBe("D");
		expect(result[3].score).toBe(1.1); // Position 4
		expect(result[4].letter).toBe("E");
		expect(result[4].score).toBe(1.0); // Position 5
	});

	it("should calculate score correctly for multiple games", () => {
		const letterPositions = [
			["A", "B", "C"],
			["A", "D", "E"],
			["B", "A", "F"]
		];
		const result = calculatePreferredLetters(letterPositions, 10);

		// A appears at position 1 twice (1.4 + 1.4 = 2.8) and position 2 once (1.3) = 4.1
		// B appears at position 2 once (1.3) and position 1 once (1.4) = 2.7
		// C appears at position 3 once (1.2) = 1.2
		// D appears at position 2 once (1.3) = 1.3
		// E appears at position 3 once (1.2) = 1.2
		// F appears at position 3 once (1.2) = 1.2

		expect(result[0].letter).toBe("A");
		expect(result[0].score).toBeCloseTo(4.1, 10); // 1.4 + 1.4 + 1.3
		expect(result[1].letter).toBe("B");
		expect(result[1].score).toBeCloseTo(2.7, 10); // 1.3 + 1.4
	});

	it("should only consider first 5 letters of each game", () => {
		const letterPositions = [["A", "B", "C", "D", "E", "F", "G"]];
		const result = calculatePreferredLetters(letterPositions, 10);

		// Only A, B, C, D, E should be included
		expect(result).toHaveLength(5);
		expect(result.map((r) => r.letter)).toEqual(["A", "B", "C", "D", "E"]);
		expect(result.some((r) => r.letter === "F")).toBe(false);
		expect(result.some((r) => r.letter === "G")).toBe(false);
	});

	it("should normalize letters to uppercase", () => {
		const letterPositions = [["a", "b", "C", "d", "E"]];
		const result = calculatePreferredLetters(letterPositions, 10);

		expect(result).toHaveLength(5);
		expect(result[0].letter).toBe("A");
		expect(result[1].letter).toBe("B");
		expect(result[2].letter).toBe("C");
		expect(result[3].letter).toBe("D");
		expect(result[4].letter).toBe("E");
	});

	it("should limit results to topN", () => {
		const letterPositions = [
			["A", "B", "C", "D", "E"],
			["F", "G", "H", "I", "J"],
			["K", "L", "M", "N", "O"]
		];
		const result = calculatePreferredLetters(letterPositions, 3);

		expect(result).toHaveLength(3);
		// Should be sorted by score descending
		expect(result[0].score).toBeGreaterThanOrEqual(result[1].score);
		expect(result[1].score).toBeGreaterThanOrEqual(result[2].score);
	});

	it("should sort letters by score in descending order", () => {
		const letterPositions = [
			["Z", "Y", "X"], // Z=1.4, Y=1.3, X=1.2
			["A", "Z", "B"], // A=1.4, Z=1.3, B=1.2
			["Y", "A", "C"]  // Y=1.4, A=1.3, C=1.2
		];
		const result = calculatePreferredLetters(letterPositions, 10);

		// Z: 1.4 + 1.3 = 2.7
		// A: 1.4 + 1.3 = 2.7
		// Y: 1.3 + 1.4 = 2.7
		// X: 1.2
		// B: 1.2
		// C: 1.2

		// All top 3 should have score 2.7
		expect(result[0].score).toBeCloseTo(2.7, 10);
		expect(result[1].score).toBeCloseTo(2.7, 10);
		expect(result[2].score).toBeCloseTo(2.7, 10);
		
		// Scores should be in descending order
		for (let i = 0; i < result.length - 1; i++) {
			expect(result[i].score).toBeGreaterThanOrEqual(result[i + 1].score);
		}
	});

	it("should handle games with less than 5 letters", () => {
		const letterPositions = [
			["A", "B"], // Only 2 letters: A=1.4, B=1.3
			["C", "D", "E"] // Only 3 letters: C=1.4, D=1.3, E=1.2
		];
		const result = calculatePreferredLetters(letterPositions, 10);

		expect(result).toHaveLength(5);
		// Results are sorted by score descending
		// A and C both have score 1.4, B and D both have score 1.3, E has 1.2
		expect(result[0].score).toBe(1.4); // A or C
		expect(result[1].score).toBe(1.4); // A or C (the other one)
		expect(result[2].score).toBe(1.3); // B or D
		expect(result[3].score).toBe(1.3); // B or D (the other one)
		expect(result[4].letter).toBe("E");
		expect(result[4].score).toBe(1.2);
		
		// Verify all letters are present
		const letters = result.map((r) => r.letter);
		expect(letters).toContain("A");
		expect(letters).toContain("B");
		expect(letters).toContain("C");
		expect(letters).toContain("D");
		expect(letters).toContain("E");
	});

	it("should handle empty game arrays", () => {
		const letterPositions = [[], ["A", "B"], []];
		const result = calculatePreferredLetters(letterPositions, 10);

		expect(result).toHaveLength(2);
		expect(result[0].letter).toBe("A");
		expect(result[1].letter).toBe("B");
	});

	it("should accumulate scores for same letter across multiple games", () => {
		const letterPositions = [
			["A", "B", "C"],
			["A", "B", "C"],
			["A", "B", "C"]
		];
		const result = calculatePreferredLetters(letterPositions, 10);

		// A: 1.4 * 3 = 4.2
		// B: 1.3 * 3 = 3.9
		// C: 1.2 * 3 = 3.6
		expect(result[0].letter).toBe("A");
		expect(result[0].score).toBeCloseTo(4.2, 10);
		expect(result[1].letter).toBe("B");
		expect(result[1].score).toBeCloseTo(3.9, 10);
		expect(result[2].letter).toBe("C");
		expect(result[2].score).toBeCloseTo(3.6, 10);
	});
});

