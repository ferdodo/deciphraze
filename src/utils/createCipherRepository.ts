import { generateRandomAlphabet } from "../utils/generateRandomAlphabet";
import type { CipherRepository } from "../types/CipherRepository";

export function createCipherRepository(): CipherRepository {
	const cipher = generateRandomAlphabet();

	return {
		getCipher: () => cipher,
	};
}
