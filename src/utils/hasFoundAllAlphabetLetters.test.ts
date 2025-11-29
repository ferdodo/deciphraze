import { describe, it, expect } from "vitest";
import { hasFoundAllAlphabetLetters } from "./hasFoundAllAlphabetLetters";
import type { GameHistory } from "../types/GameHistory";

describe("hasFoundAllAlphabetLetters", () => {
	it("should return unlocked false and progress 0 when history is empty", () => {
		const gameHistory: GameHistory = {};
		const result = hasFoundAllAlphabetLetters(gameHistory);

		expect(result.unlocked).toBe(false);
		expect(result.progress.current).toBe(0);
		expect(result.progress.target).toBe(26);
	});

	it("should return unlocked false when only some letters are found", () => {
		const gameHistory: GameHistory = {
			"2024-01-15": ["A", "B", "C", "D", "E"]
		};
		const result = hasFoundAllAlphabetLetters(gameHistory);

		expect(result.unlocked).toBe(false);
		expect(result.progress.current).toBe(5);
		expect(result.progress.target).toBe(26);
	});

	it("should return unlocked true when all 26 letters are found", () => {
		const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
		const gameHistory: GameHistory = {
			"2024-01-15": alphabet
		};
		const result = hasFoundAllAlphabetLetters(gameHistory);

		expect(result.unlocked).toBe(true);
		expect(result.progress.current).toBe(26);
		expect(result.progress.target).toBe(26);
	});

	it("should count unique letters across multiple games", () => {
		const gameHistory: GameHistory = {
			"2024-01-15": ["A", "B", "C"],
			"2024-01-16": ["D", "E", "F"],
			"2024-01-17": ["A", "B", "C"] // Doublons
		};
		const result = hasFoundAllAlphabetLetters(gameHistory);

		expect(result.unlocked).toBe(false);
		expect(result.progress.current).toBe(6); // A, B, C, D, E, F (sans doublons)
		expect(result.progress.target).toBe(26);
	});

	it("should handle lowercase letters by converting to uppercase", () => {
		const gameHistory: GameHistory = {
			"2024-01-15": ["a", "b", "c"]
		};
		const result = hasFoundAllAlphabetLetters(gameHistory);

		expect(result.unlocked).toBe(false);
		expect(result.progress.current).toBe(3);
		expect(result.progress.target).toBe(26);
	});

	it("should return unlocked true when all letters are found across multiple games", () => {
		const gameHistory: GameHistory = {
			"2024-01-15": "ABCDEFGHIJKLM".split(""),
			"2024-01-16": "NOPQRSTUVWXYZ".split("")
		};
		const result = hasFoundAllAlphabetLetters(gameHistory);

		expect(result.unlocked).toBe(true);
		expect(result.progress.current).toBe(26);
		expect(result.progress.target).toBe(26);
	});
});

