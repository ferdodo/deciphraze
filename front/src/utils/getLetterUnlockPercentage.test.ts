import { describe, it, expect } from "vitest";
import { getLetterUnlockPercentage } from "./getLetterUnlockPercentage";
import { encodeChallengeCode } from "./encodeChallengeCode";
import type { ChallengeCodes } from "../entities/ChallengeCodes";

describe("getLetterUnlockPercentage", () => {
	const playerId = "test-player-id";
	const todayDate = "2026-04-26";

	it("should return 0% when no codes are used", () => {
		const codes: ChallengeCodes = { usedCodes: new Set() };
		const percentage = getLetterUnlockPercentage(playerId, codes, todayDate, 2);
		expect(percentage).toBe(0);
	});

	it("should return 50% when 1 code used at current level (level 2)", () => {
		const code = encodeChallengeCode(playerId, todayDate, 2);
		const codes: ChallengeCodes = { usedCodes: new Set([code]) };
		const percentage = getLetterUnlockPercentage(playerId, codes, todayDate, 2);
		expect(percentage).toBe(50);
	});

	it("should ignore codes from different days", () => {
		const yesterdayDate = "2026-04-25";
		const code = encodeChallengeCode(playerId, yesterdayDate, 2);
		const codes: ChallengeCodes = { usedCodes: new Set([code]) };
		const percentage = getLetterUnlockPercentage(playerId, codes, todayDate, 2);
		expect(percentage).toBe(0);
	});
});
