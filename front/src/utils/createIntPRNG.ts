import Randoma from "randoma";

export function createIntPRNG(seed: string): (min: number, max: number) => number {
	const random = new Randoma({ seed });
	return (min: number, max: number) => {
		// Utiliser Math.floor pour garantir max exclus
		return Math.floor(random.float() * (max - min) + min);
	};
}

