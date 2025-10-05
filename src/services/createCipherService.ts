import { generateRandomAlphabet } from "../utils/generateRandomAlphabet";
import type { CipherService } from "../types/CipherService";

export function createCipherService(): CipherService {
	const cipher = generateRandomAlphabet();

	return {
		getCipher: () => cipher,
	};
}
