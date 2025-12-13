import { createIntPRNG } from "./createIntPRNG";

export function generateRandomNumberFromDay(min: number, max: number, date: string): number {
	const randomInt = createIntPRNG(date);
	return randomInt(min, max);
}

