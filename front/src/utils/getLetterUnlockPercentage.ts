import { decodeChallengeCode } from "./decodeChallengeCode";
import type { ChallengeCodes } from "../entities/ChallengeCodes";

/**
 * Calculates the unlock percentage for a specific letter on a given day.
 *
 * At level N, you need N codes to unlock one letter.
 * Codes from level N or higher count towards the unlock.
 * Returns the percentage of that letter unlocked based on codes used today.
 *
 * @param playerId - The current player's ID for validating codes
 * @param usedCodes - The ChallengeCodes entity with used codes
 * @param realDay - Today's date as ISO string (YYYY-MM-DD) from timeService.getRealDay().toString()
 * @param level - The current challenge level (determines codes needed per letter)
 * @returns The unlock percentage (0-100)
 */
export const getLetterUnlockPercentage = (
	playerId: string,
	usedCodes: ChallengeCodes,
	realDay: string,
	level: number,
): number => {
	let codesUsedToday = 0;

	for (const code of usedCodes.usedCodes) {
		const decoded = decodeChallengeCode(playerId, code);
		if (decoded.isValid && decoded.realDay === realDay && decoded.level >= level) {
			codesUsedToday += 1;
		}
	}

	const codesRequiredPerLetter = level;
	const percentage = (codesUsedToday / codesRequiredPerLetter) * 100;

	return Math.min(percentage, 100);
};
