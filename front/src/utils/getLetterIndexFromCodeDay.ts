/**
 * Calculate which letter index is unlocked based on the code's day of the week.
 * The challenge contains 7 letters, one per day of the week (Monday to Sunday).
 * Monday (day 1) = letter index 0, Tuesday (day 2) = letter index 1, etc.
 * 
 * @param codeDay - The day the code was generated (YYYY-MM-DD format)
 * @returns The letter index (0-6)
 */
export function getLetterIndexFromCodeDay(codeDay: string): number {
	const date = new Date(codeDay);
	const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
	
	// Convert to Monday = 0, Sunday = 6
	const letterIndex = (dayOfWeek + 6) % 7;
	
	return letterIndex;
}
