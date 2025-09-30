// @ts-ignore
import seedrandom from "seedrandom";
const date = new Date();
const rng = getRng(date);

export function randomNumber(min: number, max: number) {
	return Math.floor(rng() * (max - min) + min);
}

function getRng(date: Date) {
	const year = date.getFullYear();
	const month = ("0" + (date.getMonth() + 1)).slice(-2);
	const day = ("0" + date.getDate()).slice(-2);
	const formattedDate = `${year}/${month}/${day}`;
	return seedrandom(formattedDate);
}
