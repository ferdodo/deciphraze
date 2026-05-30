import { unobfuscateChallengeCode } from "./unobfuscateChallengeCode";
import type { DecodedChallengeCode } from "../entities/DecodedChallengeCode";
import type { RandomService } from "../services/RandomService";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/**
 * Decode a challenge code to extract level and realDay.
 * First unobfuscates the code, then validates signature using playerId.
 * Format: [levelChars(2)][dayChars(8)][signatureChars(4)] = 14 chars (before obfuscation)
 */
export function decodeChallengeCode(
	playerId: string,
	code: string,
	randomService: RandomService
): DecodedChallengeCode {
	// First unobfuscate the code
	const unobfuscateResult = unobfuscateChallengeCode(code, randomService);
	if (unobfuscateResult.result === "error") {
		return { result: "error", hint: unobfuscateResult.hint };
	}

	const unobfuscated = unobfuscateResult.result.code;

	try {
		// Extract parts from unobfuscated code
		const levelStr = unobfuscated.substring(0, 2);
		const dayStr = unobfuscated.substring(2, 10);
		const signature = unobfuscated.substring(10, 14);

		// Parse level
		const level = parseInt(levelStr, 10);
		if (level < 1 || level > 99) {
			return { result: "error", hint: "Le niveau n'est pas valide" };
		}

		// Parse day (reconstruct YYYY-MM-DD format)
		if (dayStr.length !== 8) {
			return { result: "error", hint: "La date n'est pas valide" };
		}
		const realDay = `${dayStr.substring(0, 4)}-${dayStr.substring(4, 6)}-${dayStr.substring(6, 8)}`;

		// Verify signature
		const seed = `${playerId}:${levelStr}:${dayStr}`;
		const randomInt = randomService.createIntPRNG(seed);

		let expectedSignature = "";
		for (let i = 0; i < 4; i++) {
			const index = randomInt(0, CHARSET.length - 1);
			expectedSignature += CHARSET[index];
		}

		if (signature !== expectedSignature) {
			return { result: "error", hint: "Ce code n'est pas valide ou a été altéré" };
		}

		return { result: { level, realDay } };
	} catch {
		return { result: "error", hint: "Erreur lors du décodage du code" };
	}
}
