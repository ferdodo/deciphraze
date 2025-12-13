import { formatDate } from "./formatDate";

/**
 * Calcule la date d'hier à partir d'une date donnée au format YYYY-MM-DD
 * @param date - Date au format YYYY-MM-DD
 * @returns Date d'hier au format YYYY-MM-DD
 */
export const computeYesterday = (date: string): string => {
	const dateObj = new Date(date);
	dateObj.setDate(dateObj.getDate() - 1);
	return formatDate(dateObj);
};

