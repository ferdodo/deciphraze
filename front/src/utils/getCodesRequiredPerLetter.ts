/**
 * Calculates the number of codes required to unlock a letter at a given level.
 * Every 3 levels, one additional code is required.
 * Levels 1-3: 1 code, Levels 4-6: 2 codes, Levels 7-9: 3 codes, etc.
 *
 * @param level - The current challenge level
 * @returns The number of codes required to unlock a letter
 */
export function getCodesRequiredPerLetter(level: number): number {
	return Math.ceil(level / 3);
}
