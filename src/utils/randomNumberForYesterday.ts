import { randomFloat } from "daily-prng";

export function randomNumberForYesterday(min: number, max: number): number {
	return Math.floor(randomFloat(min, max, -1));
}
