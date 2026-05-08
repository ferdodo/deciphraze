import { decodeChallengeCode } from "@deciphraze/core";
import { getLetterIndexFromCodeDay } from "./getLetterIndexFromCodeDay";
import { areDayInSameWeek } from "./areDayInSameWeek";
import type { ChallengeCodes, RandomService } from "@deciphraze/core";

/**
 * Calculates the unlock percentage for a specific letter on a given day.
 *
 * At level N, you need N codes to unlock one letter.
 * Codes from level N or higher count towards the unlock.
 * The letter index is determined by the day of the week of the code.
 * Only codes from the current week are counted.
 * Returns the percentage of that letter unlocked based on codes used this week.
 *
 * @param playerId - The current player's ID for validating codes
 * @param usedCodes - The ChallengeCodes entity with used codes
 * @param realDay - Today's date as ISO string (YYYY-MM-DD) from timeService.getRealDay().toString()
 * @param level - The current challenge level (determines codes needed per letter)
 * @param letterIndex - The letter index we're calculating progress for (0-6)
 * @param randomService - The RandomService for decoding challenge codes
 * @returns The unlock percentage (0-100)
 */
export const getLetterUnlockPercentage = (
	playerId: string,
	usedCodes: ChallengeCodes,
	realDay: string,
	level: number,
	letterIndex: number,
	randomService: RandomService,
): number => {
	let codesUsedForThisLetter = 0;

	for (const code of usedCodes.usedCodes) {
		const decoded = decodeChallengeCode(playerId, code, randomService);

		if (decoded.result === "error") {
			continue;
		}

		if (decoded.result.level >= level && areDayInSameWeek(decoded.result.realDay, realDay)) {
			const codeLetterIndex = getLetterIndexFromCodeDay(decoded.result.realDay);

			if (codeLetterIndex === letterIndex) {
				codesUsedForThisLetter += 1;
			}
		}
	}

	const codesRequiredPerLetter = level;
	const percentage = (codesUsedForThisLetter / codesRequiredPerLetter) * 100;

	return Math.min(percentage, 100);
};
