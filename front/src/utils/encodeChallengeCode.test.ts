import { describe, it, expect } from "vitest";
import { encodeChallengeCode } from "./encodeChallengeCode";

describe("encodeChallengeCode", () => {
	const playerId = "player-123";
	const realDay = "2026-04-25";
	const level = 5;

	it("should encode a challenge code with correct length", () => {
		const code = encodeChallengeCode(playerId, realDay, level);
		expect(code).toHaveLength(16);
		expect(typeof code).toBe("string");
	});

	it("should encode different levels differently", () => {
		const code1 = encodeChallengeCode(playerId, realDay, 1);
		const code2 = encodeChallengeCode(playerId, realDay, 2);
		const code5 = encodeChallengeCode(playerId, realDay, level);
		const code99 = encodeChallengeCode(playerId, realDay, 99);

		// All should be different
		expect(new Set([code1, code2, code5, code99]).size).toBe(4);
	});

	it("should reject invalid levels", () => {
		expect(() => encodeChallengeCode(playerId, realDay, 0)).toThrow();
		expect(() => encodeChallengeCode(playerId, realDay, 100)).toThrow();
		expect(() => encodeChallengeCode(playerId, realDay, -1)).toThrow();
		expect(() => encodeChallengeCode(playerId, realDay, 101)).toThrow();
	});

	it("should reject invalid date format", () => {
		expect(() => encodeChallengeCode(playerId, "2026-4-25", level)).toThrow();
		expect(() => encodeChallengeCode(playerId, "04/25/2026", level)).toThrow();
		expect(() => encodeChallengeCode(playerId, "2026/04/25", level)).toThrow();
		expect(() => encodeChallengeCode(playerId, "25-04-2026", level)).toThrow();
	});

});

