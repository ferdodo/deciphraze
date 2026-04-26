import { createIntPRNG } from "./createIntPRNG";
import { unobfuscateChallengeCode } from "./unobfuscateChallengeCode";
import type { DecodedChallengeCode } from "../entities/DecodedChallengeCode";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/**
 * Decode a challenge code to extract level and realDay.
 * First unobfuscates the code, then validates signature using playerId.
 * Format: [levelChars(2)][dayChars(8)][signatureChars(4)] = 14 chars (before obfuscation)
 */
export function decodeChallengeCode(playerId: string, code: string): DecodedChallengeCode {
	// First unobfuscate the code
	const unobfuscated = unobfuscateChallengeCode(code);
	if (!unobfuscated) {
		return { level: 0, realDay: "", isValid: false };
	}

	try {
		// Extract parts from unobfuscated code
		const levelStr = unobfuscated.substring(0, 2);
		const dayStr = unobfuscated.substring(2, 10);
		const signature = unobfuscated.substring(10, 14);

		// Parse level
		const level = parseInt(levelStr, 10);
		if (level < 1 || level > 99) {
			return { level: 0, realDay: "", isValid: false };
		}

		// Parse day (reconstruct YYYY-MM-DD format)
		if (dayStr.length !== 8) {
			return { level: 0, realDay: "", isValid: false };
		}
		const realDay = `${dayStr.substring(0, 4)}-${dayStr.substring(4, 6)}-${dayStr.substring(6, 8)}`;

		// Verify signature
		const seed = `${playerId}:${levelStr}:${dayStr}`;
		const randomInt = createIntPRNG(seed);

		let expectedSignature = "";
		for (let i = 0; i < 4; i++) {
			const index = randomInt(0, CHARSET.length - 1);
			expectedSignature += CHARSET[index];
		}

		const isValid = signature === expectedSignature;

		return { level, realDay, isValid };
	} catch {
		return { level: 0, realDay: "", isValid: false };
	}
}
