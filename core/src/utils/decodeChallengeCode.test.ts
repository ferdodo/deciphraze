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

		expect(decoded.result).not.toBe("error");
		if (decoded.result !== "error") {
			expect(decoded.result.level).toBe(level);
			expect(decoded.result.realDay).toBe(realDay);
		}
	});

	it("should reject invalid signature", () => {
		const randomService = createRandomServiceMock();
		const code = encodeChallengeCode(playerId, realDay, level, randomService);
		const decoded = decodeChallengeCode("different-player", code, randomService);

		expect(decoded.result).toBe("error");
		if (decoded.result === "error") {
			expect(decoded.hint).toContain("valide");
		}
	});

	it("should reject invalid code length", () => {
		const randomService = createRandomServiceMock();
		const decoded = decodeChallengeCode(playerId, "TOOSHORT", randomService);
		expect(decoded.result).toBe("error");
		if (decoded.result === "error") {
			expect(decoded.hint).toContain("16");
		}
	});

	it("should work with all valid level range", () => {
		const randomService = createRandomServiceMock();
		for (let testLevel = 1; testLevel <= 10; testLevel++) {
			const code = encodeChallengeCode(playerId, realDay, testLevel, randomService);
			const decoded = decodeChallengeCode(playerId, code, randomService);

			expect(decoded.result).not.toBe("error");
			if (decoded.result !== "error") {
				expect(decoded.result.level).toBe(testLevel);
				expect(decoded.result.realDay).toBe(realDay);
			}
		}
	});

	it("should work with edge case level 99", () => {
		const randomService = createRandomServiceMock();
		const code = encodeChallengeCode(playerId, realDay, 99, randomService);
		const decoded = decodeChallengeCode(playerId, code, randomService);

		expect(decoded.result).not.toBe("error");
		if (decoded.result !== "error") {
			expect(decoded.result.level).toBe(99);
			expect(decoded.result.realDay).toBe(realDay);
		}
	});
});
