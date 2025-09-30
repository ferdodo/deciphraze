import { Observable, Subject, share } from "rxjs";
import { letterSelection } from "./letterSelection";
import { symbolSelection } from "./symbolSelection";
import { characterEquals } from "./characterEquals";
import type { PlayerCipher } from "./types/PlayerCipher";

export function createPlayerCipher(): PlayerCipher {
	let playerCipher = new Map<string, string>();

	function getPlayerCipher() {
		return new Map(playerCipher);
	}

	const removePlayerCipherEntryByLetter$: Subject<string> = new Subject();

	function removePlayerCipherEntryByLetter(removed: string) {
		removePlayerCipherEntryByLetter$.next(removed);
	}

	function removePlayerCipherEntryByValue(removed: string) {
		for (const [key, value] of playerCipher) {
			if (characterEquals(value, removed)) {
				removePlayerCipherEntryByLetter(key);
			}
		}
	}

	const playerCipher$ = new Observable<Map<string, string>>(
		function (subscriber) {
			let letterSelectionValue = letterSelection.getLetterSelection();
			let symbolSelectionValue = symbolSelection.getSymbolSelection();

			removePlayerCipherEntryByLetter$.subscribe(function (removed: string) {
				playerCipher.delete(removed);
				subscriber.next(playerCipher);
			});

			letterSelection.letterSelection$.subscribe(function (
				letter: string | null,
			) {
				letterSelectionValue = letter;

				if (letterSelectionValue !== null && symbolSelectionValue !== null) {
					playerCipher.set(letterSelectionValue, symbolSelectionValue);
					subscriber.next(playerCipher);
				}
			});

			symbolSelection.symbolSelection$.subscribe(function (sym: string | null) {
				symbolSelectionValue = sym;

				if (letterSelectionValue !== null && symbolSelectionValue !== null) {
					playerCipher.set(letterSelectionValue, symbolSelectionValue);
					subscriber.next(playerCipher);
				}
			});
		},
	).pipe(share());

	return {
		getPlayerCipher,
		removePlayerCipherEntryByLetter,
		removePlayerCipherEntryByValue,
		playerCipher$,
	};
}
