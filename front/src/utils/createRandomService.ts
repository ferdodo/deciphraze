import type { RandomService } from "@deciphraze/core";
import { createIntPRNG } from "./createIntPRNG";

export function createRandomService(): RandomService {
	return {
		createIntPRNG,
	};
}
