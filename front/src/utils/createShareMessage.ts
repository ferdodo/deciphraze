export const createShareMessage = (matchCount: number): string => {
	const date = new Date();
	const year = date.getFullYear();
	const month = `0${date.getMonth() + 1}`.slice(-2);
	const day = `0${date.getDate()}`.slice(-2);
	const formattedDate = `${year}/${month}/${day}`;
	let text = `Deciphraze ${formattedDate} - Puzzle réussi avec ${matchCount} associations de lettres.`;

	text += `\n\nhttps://deciphraze.fr`;
	return text;
};
