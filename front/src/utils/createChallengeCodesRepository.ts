import type { ChallengeCodesRepository } from "../repositories/ChallengeCodesRepository";
import type { ChallengeCodes } from "../entities/ChallengeCodes";
import type { StorageLike } from "./StorageLike";

const CHALLENGE_CODES_STORAGE_KEY = "deciphraze_challenge_codes";

export function createChallengeCodesRepository(storage: StorageLike): ChallengeCodesRepository {
	let codes: ChallengeCodes;

	try {
		const stored: string = storage.getItem(CHALLENGE_CODES_STORAGE_KEY) ?? "";
		if (stored === "" || stored === "null") {
			codes = { usedCodes: new Set() };
		} else {
			const parsed = JSON.parse(stored);
			if (parsed && Array.isArray(parsed.usedCodes)) {
				codes = { usedCodes: new Set(parsed.usedCodes) };
			} else {
				codes = { usedCodes: new Set() };
			}
		}
	} catch (_error) {
		codes = { usedCodes: new Set() };
	}

	const listeners: ((codes: ChallengeCodes) => void)[] = [];

	function getCodes(): ChallengeCodes {
		return {
			usedCodes: new Set(codes.usedCodes),
		};
	}

	function saveCodes(newCodes: ChallengeCodes): void {
		codes = {
			usedCodes: new Set(newCodes.usedCodes),
		};
		storage.setItem(CHALLENGE_CODES_STORAGE_KEY, JSON.stringify({
			usedCodes: Array.from(codes.usedCodes),
		}));
		for (const listener of listeners) {
			listener(getCodes());
		}
	}

	function observeCodes(listener: (codes: ChallengeCodes) => void): () => void {
		listeners.push(listener);
		return () => {
			const index = listeners.indexOf(listener);
			if (index !== -1) {
				listeners.splice(index, 1);
			}
		};
	}

	return {
		getCodes,
		saveCodes,
		observeCodes,
	};
}
