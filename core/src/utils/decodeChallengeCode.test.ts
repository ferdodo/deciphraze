import { describe, it, expect } from "vitest";
import { decodeChallengeCode } from "./decodeChallengeCode";
import { encodeChallengeCode } from "./encodeChallengeCode";
import { createRandomServiceMock } from "./createRandomServiceMock";

describe("decodeChallengeCode", () => {
	const playerId = "player-123";
	const realDay = "2026-04-25";
	const level = 5;

	it("should decode a valid code", () => {
		const randomService = createRandomServiceMock();
		const code = encodeChallengeCode(playerId, realDay, level, randomService);
		const decoded = decodeChallengeCode(playerId, code, randomService);

		expect(decoded.level).toBe(level);
		expect(decoded.realDay).toBe(realDay);
		expect(decoded.isValid).toBe(true);
	});

	it("should reject invalid signature", () => {
		const randomService = createRandomServiceMock();
		const code = encodeChallengeCode(playerId, realDay, level, randomService);
		const decoded = decodeChallengeCode("different-player", code, randomService);

		expect(decoded.isValid).toBe(false);
	});

	it("should reject invalid code length", () => {
		const randomService = createRandomServiceMock();
		const decoded = decodeChallengeCode(playerId, "TOOSHORT", randomService);
		expect(decoded.isValid).toBe(false);
	});

	it("should work with all valid level range", () => {
		const randomService = createRandomServiceMock();
		for (let testLevel = 1; testLevel <= 10; testLevel++) {
			const code = encodeChallengeCode(playerId, realDay, testLevel, randomService);
			const decoded = decodeChallengeCode(playerId, code, randomService);

			expect(decoded.level).toBe(testLevel);
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
			const randomService = createRandomServiceMock();
			const code = encodeChallengeCode(playerId, realDay, level, randomService);
			const decoded = decodeChallengeCode(playerId, code, randomService);

			expect(decoded.isValid).toBe(true);
			expect(decoded.level).toBe(level);
			expect(decoded.realDay).toBe(realDay);
		});
	});
});
