/**
 * Formate une date au format YYYY-MM-DD
 * @param date - Objet Date à formater
 * @returns Date formatée au format YYYY-MM-DD
 */
export const formatDate = (date: Date): string => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	
	return `${year}-${month}-${day}`;
};

