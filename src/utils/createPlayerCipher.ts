import { Subject } from "rxjs";
import { share } from "rxjs/operators";
import { characterEquals } from "../utils/characterEquals";
import type { PlayerCipherRepository } from "../types/PlayerCipherRepository";

export function createPlayerCipher(): PlayerCipherRepository {
	const playerCipher = new Map<string, string>();
	const playerCipher$ = new Subject<Map<string, string>>();

	function getPlayerCipher() {
		return new Map(playerCipher);
	}

	const removePlayerCipherEntryByLetter = (removed: string) => {
		playerCipher.delete(removed);
		playerCipher$.next(new Map(playerCipher));
	};

	const removePlayerCipherEntryByValue = (removed: string) => {
		for (const [key, _value] of Array.from(playerCipher.entries()).filter(([, value]) => characterEquals(value, removed))) {
			removePlayerCipherEntryByLetter(key);
		}
	};

	const addPlayerCipherEntry = (letter: string, symbol: string) => {
		playerCipher.set(letter, symbol);
		playerCipher$.next(new Map(playerCipher));
	};

	return {
		getPlayerCipher,
		removePlayerCipherEntryByLetter,
		removePlayerCipherEntryByValue,
		addPlayerCipherEntry,
		playerCipher$: playerCipher$.asObservable().pipe(share()),
	};
}
