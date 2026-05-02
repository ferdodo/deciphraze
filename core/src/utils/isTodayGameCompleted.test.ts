import { describe, it, expect } from "vitest";
import { isTodayGameCompleted } from "./isTodayGameCompleted";
import type { GameHistory, GameSession } from "../entities";

describe("isTodayGameCompleted", () => {
	it("should return falsy when there is no entry for today", () => {
		const gameHistory: GameHistory = {};
		expect(isTodayGameCompleted(gameHistory, "2024-01-01")).toBeFalsy();
	});

	it("should return falsy when today's entry is a GameSession without winAt", () => {
		const session: GameSession = {
			lettersFound: [],
		} as unknown as GameSession;
		const gameHistory: GameHistory = {
			"2024-01-01": session,
		};
		expect(isTodayGameCompleted(gameHistory, "2024-01-01")).toBeFalsy();
	});

	it("should return truthy when today's entry is a completed GameSession with winAt", () => {
		const session: GameSession = {
			lettersFound: [],
			winAt: "2024-01-01",
		};
		const gameHistory: GameHistory = {
			"2024-01-01": session,
		};
		expect(isTodayGameCompleted(gameHistory, "2024-01-01")).toBeTruthy();
	});
});
