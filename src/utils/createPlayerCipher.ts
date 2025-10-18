import { BehaviorSubject } from "rxjs";
import { share } from "rxjs/operators";
import { characterEquals } from "../utils/characterEquals";
import type { PlayerCipherRepository } from "../types/PlayerCipherRepository";
import type { PlayerCipher } from "../types/PlayerCipher";
import { checkPlayerCipher } from "./checkPlayerCipher";

const PLAYER_CIPHER_STORAGE_KEY = "deciphraze_player_cipher";

export function createPlayerCipher(): PlayerCipherRepository {
	let playerCipher: PlayerCipher;

	try {
		const stored: string = localStorage.getItem(PLAYER_CIPHER_STORAGE_KEY) ?? "{}";
		playerCipher = checkPlayerCipher(JSON.parse(stored));
	} catch (_error) {
		playerCipher = {};
	}

	const playerCipherSubject = new BehaviorSubject<PlayerCipher>({ ...playerCipher });

	function getPlayerCipher(): PlayerCipher {
		return { ...playerCipher };
	}

	const removePlayerCipherEntryByLetter = (removed: string): void => {
		delete playerCipher[removed];
		localStorage.setItem(PLAYER_CIPHER_STORAGE_KEY, JSON.stringify(playerCipher));
		playerCipherSubject.next({ ...playerCipher });
	};

	const removePlayerCipherEntryByValue = (removed: string): void => {
		for (const [key, value] of Object.entries(playerCipher)) {
			if (characterEquals(value, removed)) {
				delete playerCipher[key];
			}
		}
		localStorage.setItem(PLAYER_CIPHER_STORAGE_KEY, JSON.stringify(playerCipher));
		playerCipherSubject.next({ ...playerCipher });
	};

	const addPlayerCipherEntry = (letter: string, symbol: string): void => {
		playerCipher[letter] = symbol;
		localStorage.setItem(PLAYER_CIPHER_STORAGE_KEY, JSON.stringify(playerCipher));
		playerCipherSubject.next({ ...playerCipher });
	};

	return {
		getPlayerCipher,
		removePlayerCipherEntryByLetter,
		removePlayerCipherEntryByValue,
		addPlayerCipherEntry,
		playerCipher$: playerCipherSubject.asObservable().pipe(share()),
	};
}
