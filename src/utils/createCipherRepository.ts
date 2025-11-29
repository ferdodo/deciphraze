import { generateRandomAlphabet } from "./generateRandomAlphabet";
import type { CipherRepository } from "../repositories/CipherRepository";

export function createCipherRepository(): CipherRepository {
	const cipher = generateRandomAlphabet();

	return {
		getCipher: () => cipher,
	};
}

