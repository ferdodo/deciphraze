import { Subject } from "rxjs";
import { share } from "rxjs/operators";
import { characterEquals } from "./characterEquals";
import type { PlayerCipher } from "./types/PlayerCipher";

export function createPlayerCipher(): PlayerCipher {
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
		for (const [key, value] of playerCipher) {
			if (characterEquals(value, removed)) {
				removePlayerCipherEntryByLetter(key);
			}
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
