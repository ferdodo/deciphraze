import { describe, it, expect } from "vitest";
import { calculateMaxStreak } from "./calculateMaxStreak";
import { calculateCurrentStreak } from "./calculateCurrentStreak";
import { iterateStreaks } from "./iterateStreaks";
import type { GameHistory } from "../types/GameHistory";

describe("calculateMaxStreak", () => {
	let gameHistory: GameHistory;

	it("should return 0 for empty history", () => {
		gameHistory = {};
		expect(calculateMaxStreak(gameHistory)).toBe(0);
	});


	it("should return 1 for non-consecutive sessions", () => {
		gameHistory = {
			"2024-01-15": ["A"],
			"2024-01-17": ["B"]
		};
		expect(calculateMaxStreak(gameHistory)).toBe(1);
	});


});

describe("calculateCurrentStreak", () => {
	let gameHistory: GameHistory;

	it("should return 1 for single session", () => {
		gameHistory = { "2024-01-15": ["A"] };
		expect(calculateCurrentStreak(gameHistory, 0)).toBe(1);
	});

	it("should return 2 for 2 consecutive days starting from first", () => {
		gameHistory = {
			"2024-01-15": ["A"],
			"2024-01-16": ["B"]
		};
		expect(calculateCurrentStreak(gameHistory, 0)).toBe(2);
	});

	it("should return 1 for non-consecutive days", () => {
		gameHistory = {
			"2024-01-15": ["A"],
			"2024-01-17": ["B"]
		};
		expect(calculateCurrentStreak(gameHistory, 0)).toBe(1);
	});

});

describe("iterateStreaks", () => {
	let gameHistory: GameHistory;


	it("should yield 1,1 for 2 non-consecutive days", () => {
		gameHistory = {
			"2024-01-15": ["A"],
			"2024-01-17": ["B"]
		};
		const streaks = [...iterateStreaks(gameHistory)];
		expect(streaks).toEqual([1, 1]);
	});

});
