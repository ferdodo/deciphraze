// @ts-ignore
import seedrandom from "seedrandom";
const date = new Date();
const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
const rng = getRng(date);
const rngYesterday = getRng(yesterday);

export function randomNumber(min: number, max: number) {
	return Math.floor((rng() * (max - min)) + min);
}

export function randomNumberForYesterday(min: number, max: number) {
	return Math.floor((rngYesterday() * (max - min)) + min);
}

function getRng(date: Date) {
	const year = date.getFullYear();
	const month = ('0' + (date.getMonth() + 1)).slice(-2); 
	const day = ('0' + date.getDate()).slice(-2);
	const formattedDate = `${year}/${month}/${day}`;
	return seedrandom(formattedDate);
}
