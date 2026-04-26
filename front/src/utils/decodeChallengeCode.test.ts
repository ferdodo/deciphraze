import { describe, it, expect } from "vitest";
import { decodeChallengeCode } from "./decodeChallengeCode";
import { encodeChallengeCode } from "./encodeChallengeCode";

describe("decodeChallengeCode", () => {
	const playerId = "player-123";
	const realDay = "2026-04-25";
	const level = 5;

	it("should decode a valid code", () => {
		const code = encodeChallengeCode(playerId, realDay, level);
		const decoded = decodeChallengeCode(playerId, code);

		expect(decoded.level).toBe(level);
		expect(decoded.realDay).toBe(realDay);
		expect(decoded.isValid).toBe(true);
	});

	it("should reject invalid signature", () => {
		const code = encodeChallengeCode(playerId, realDay, level);
		const decoded = decodeChallengeCode("different-player", code);

		expect(decoded.isValid).toBe(false);
	});

	it("should reject invalid code length", () => {
		const decoded = decodeChallengeCode(playerId, "TOOSHORT");
		expect(decoded.isValid).toBe(false);
	});

	it("should work with all valid level range", () => {
		for (let level = 1; level <= 10; level++) {
			const code = encodeChallengeCode(playerId, realDay, level);
			const decoded = decodeChallengeCode(playerId, code);

			expect(decoded.level).toBe(level);
			expect(decoded.isValid).toBe(true);
		}
	});

	it("should perfectly roundtrip encode and decode", () => {
		const testCases = [
			{ playerId: "user-1", realDay: "2026-01-01", level: 1 },
			{ playerId: "user-999", realDay: "2026-12-31", level: 99 },
			{ playerId: "test-player", realDay: "2025-06-15", level: 42 },
		];

		testCases.forEach(({ playerId, realDay, level }) => {
			const code = encodeChallengeCode(playerId, realDay, level);
			const decoded = decodeChallengeCode(playerId, code);

			expect(decoded.isValid).toBe(true);
			expect(decoded.level).toBe(level);
			expect(decoded.realDay).toBe(realDay);
		});
	});
});
