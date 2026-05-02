import type { ChallengeRepository } from "@deciphraze/core";
import type { Challenge } from "@deciphraze/core";
import type { StorageLike } from "./StorageLike";

const CHALLENGE_STORAGE_KEY = "deciphraze_challenge";

function generateRandomId(): string {
	const array = new Uint8Array(16);
	crypto.getRandomValues(array);
	return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

const defaultChallenge = (playerId: string): Challenge => ({
	level: 1,
	id: playerId,
});

export function createChallengeRepository(storage: StorageLike, playerId?: string): ChallengeRepository {
	let challenge: Challenge;

	try {
		const stored: string = storage.getItem(CHALLENGE_STORAGE_KEY) ?? "";
		if (stored === "" || stored === "null") {
			challenge = defaultChallenge(playerId ?? generateRandomId());
			// Persist the newly created challenge
			storage.setItem(CHALLENGE_STORAGE_KEY, JSON.stringify(challenge));
		} else {
			const parsed = JSON.parse(stored);
			if (parsed && typeof parsed === "object" && typeof parsed.level === "number" && typeof parsed.id === "string") {
				challenge = {
					level: parsed.level,
					id: parsed.id,
				};
			} else {
				challenge = defaultChallenge(playerId ?? generateRandomId());
				// Persist the newly created challenge
				storage.setItem(CHALLENGE_STORAGE_KEY, JSON.stringify(challenge));
			}
		}
	} catch (_error) {
		challenge = defaultChallenge(playerId ?? generateRandomId());
		// Persist the newly created challenge
		storage.setItem(CHALLENGE_STORAGE_KEY, JSON.stringify(challenge));
	}

	const listeners: ((challenge: Challenge) => void)[] = [];

	function getChallenge(): Challenge {
		return { ...challenge };
	}

	function saveChallenge(newChallenge: Challenge): void {
		challenge = { ...newChallenge };
		storage.setItem(CHALLENGE_STORAGE_KEY, JSON.stringify(challenge));
		for (const listener of listeners) {
			listener({ ...challenge });
		}
	}

	function observeChallenge(listener: (challenge: Challenge) => void): () => void {
		listeners.push(listener);
		return () => {
			const index = listeners.indexOf(listener);
			if (index !== -1) {
				listeners.splice(index, 1);
			}
		};
	}

	return {
		getChallenge,
		saveChallenge,
		observeChallenge,
	};
}
