import { Observable, Subject, share } from "rxjs";
import { letterSelection$, selectLetter$, getLetterSelection } from "./letterSelection";
import { symbolSelection$, selectSymbol$, getSymbolSelection } from "./symbolSelection";
import { characterEquals } from "./characterEquals";

let playerCipher = new Map<string, string>();

export function getPlayerCipher() {
	return new Map(playerCipher);
}

const removePlayerCipherEntryByLetter$: Subject<string> = new Subject();

export function removePlayerCipherEntryByLetter(removed: string) {
	removePlayerCipherEntryByLetter$.next(removed);
}

export function removePlayerCipherEntryByValue(removed: string) {
	for (const [key, value] of playerCipher) {
		if (characterEquals(value, removed)) {
			removePlayerCipherEntryByLetter(key);
		}
	}
}

export const playerCipher$ = new Observable<Map<string, string>>(function(subscriber) {
	let letterSelection = getLetterSelection();
	let symbolSelection = getSymbolSelection();

	removePlayerCipherEntryByLetter$.subscribe(function(removed: string) {
		playerCipher.delete(removed);
		subscriber.next(playerCipher);
	});

	letterSelection$.subscribe(function(letter) {
		letterSelection = letter;

		if (letterSelection !== null && symbolSelection !== null) {
			playerCipher = new Map(playerCipher)
				.set(letterSelection, symbolSelection);


			setTimeout(function() {
				selectLetter$.next(null);
				selectSymbol$.next(null);	
			}, 1);

			subscriber.next(playerCipher);
		}
	});

	symbolSelection$.subscribe(function(sym) {
		symbolSelection = sym;

		if (letterSelection !== null && symbolSelection !== null) {
			playerCipher = new Map(playerCipher)
				.set(letterSelection, symbolSelection);

			setTimeout(function() {
				selectLetter$.next(null);
				selectSymbol$.next(null);	
			}, 1);

			subscriber.next(playerCipher);
		}
	});
}).pipe(share());
