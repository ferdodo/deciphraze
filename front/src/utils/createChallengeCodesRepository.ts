import type { ChallengeCodesRepository } from "../repositories/ChallengeCodesRepository";
import type { ChallengeCodes } from "../entities/ChallengeCodes";

export function createChallengeCodesRepository(): ChallengeCodesRepository {
	let codes: ChallengeCodes = {
		usedCodes: new Set(),
	};

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
