import { describe, it, expect } from "vitest";
import { calculateTotalWordsFound } from "./calculateTotalWordsFound";
import type { GameHistory } from "../types/GameHistory";
import type { GameSession } from "../types/GameSession";

describe("calculateTotalWordsFound", () => {
	it("should return 0 for empty history", () => {
		const gameHistory: GameHistory = {};
		expect(calculateTotalWordsFound(gameHistory)).toBe(0);
	});

	it("should sum wordsFound from all sessions", () => {
		const session1: GameSession = {
			winAt: "2024-01-15",
			lettersFound: ["A", "B"],
			wordsFound: 50
		};
		const session2: GameSession = {
			winAt: "2024-01-16",
			lettersFound: ["C", "D"],
			wordsFound: 75
		};
		const gameHistory: GameHistory = {
			"2024-01-15": session1,
			"2024-01-16": session2
		};
		expect(calculateTotalWordsFound(gameHistory)).toBe(125);
	});

	it("should handle old format sessions (string[]) as 0", () => {
		const gameHistory: GameHistory = {
			"2024-01-15": ["A", "B"],
			"2024-01-16": ["C", "D"]
		};
		expect(calculateTotalWordsFound(gameHistory)).toBe(0);
	});

	it("should handle mixed old and new format", () => {
		const session1: GameSession = {
			winAt: "2024-01-15",
			lettersFound: ["A", "B"],
			wordsFound: 50
		};
		const gameHistory: GameHistory = {
			"2024-01-15": session1,
			"2024-01-16": ["C", "D"] // old format
		};
		expect(calculateTotalWordsFound(gameHistory)).toBe(50);
	});

	it("should handle sessions without wordsFound", () => {
		const session1: GameSession = {
			winAt: "2024-01-15",
			lettersFound: ["A", "B"]
			// wordsFound is optional
		};
		const gameHistory: GameHistory = {
			"2024-01-15": session1
		};
		expect(calculateTotalWordsFound(gameHistory)).toBe(0);
	});
});

