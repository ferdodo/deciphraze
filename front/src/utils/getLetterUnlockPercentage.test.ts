import { describe, it, expect } from "vitest";
import { getLetterUnlockPercentage } from "./getLetterUnlockPercentage";
import { encodeChallengeCode } from "./encodeChallengeCode";
import type { ChallengeCodes } from "../entities/ChallengeCodes";

describe("getLetterUnlockPercentage", () => {
	const playerId = "test-player-id";
	const mondayDate = "2026-04-27"; // Monday = letterIndex 0

	it("should return 0% when no codes are used", () => {
		const codes: ChallengeCodes = { usedCodes: new Set() };
		const percentage = getLetterUnlockPercentage(playerId, codes, mondayDate, 1, 0);
		expect(percentage).toBe(0);
	});



	it("should return 100% when 1 valid code used at level 1", () => {
		const code = encodeChallengeCode(playerId, mondayDate, 1);
		const codes: ChallengeCodes = { usedCodes: new Set([code]) };
		const percentage = getLetterUnlockPercentage(playerId, codes, mondayDate, 1, 0);
		expect(percentage).toBe(100);
	});

	it("should return 50% when 1 valid code used at level 2", () => {
		const code = encodeChallengeCode(playerId, mondayDate, 2);
		const codes: ChallengeCodes = { usedCodes: new Set([code]) };
		const percentage = getLetterUnlockPercentage(playerId, codes, mondayDate, 2, 0);
		expect(percentage).toBe(50);
	});







	it("should ignore codes below required level", () => {
		const code1 = encodeChallengeCode(playerId, mondayDate, 1);
		const code2 = encodeChallengeCode(playerId, mondayDate, 2);
		const codes: ChallengeCodes = { usedCodes: new Set([code1, code2]) };
		// Require level 3, so only code2 is insufficient
		const percentage = getLetterUnlockPercentage(playerId, codes, mondayDate, 3, 0);
		expect(percentage).toBe(0); // Neither code is level 3+
	});






});

