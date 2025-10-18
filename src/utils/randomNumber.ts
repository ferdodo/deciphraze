import { randomFloat } from "daily-prng";

export function randomNumber(min: number, max: number): number {
	return Math.floor(randomFloat(min, max));
}
