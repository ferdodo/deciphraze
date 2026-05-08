/**
 * Determines if two dates are in the same week (Monday to Sunday).
 * Uses ISO 8601 week definition.
 *
 * @param day1 - First date in YYYY-MM-DD format
 * @param day2 - Second date in YYYY-MM-DD format
 * @returns true if both dates are in the same week
 */
export const areDayInSameWeek = (day1: string, day2: string): boolean => {
	try {
		const date1 = new Date(day1);
		const date2 = new Date(day2);

		// Get the ISO week number and year for both dates
		const getISOWeek = (date: Date): { week: number; year: number } => {
			const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
			const dayNum = d.getUTCDay() || 7;
			d.setUTCDate(d.getUTCDate() + 4 - dayNum);
			const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
			const weekNum = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
			return { week: weekNum, year: d.getUTCFullYear() };
		};

		const week1 = getISOWeek(date1);
		const week2 = getISOWeek(date2);

		return week1.week === week2.week && week1.year === week2.year;
	} catch {
		return false;
	}
};
