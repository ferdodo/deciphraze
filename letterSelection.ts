import { Subject, Observable } from "rxjs";
import { normalizeWord } from "./normalizeWord";

let letterSelection: string | null = null;

export function getLetterSelection(): string | null {
	return letterSelection;
}

const selectLetter$ = new Subject<string | null>();

export function selectLetter(letter: string | null) {
	selectLetter$.next(letter);
}

export const letterSelection$ = new Observable<string | null>(function(subscriber) {
	selectLetter$.subscribe(function(letter) {
		if (letter !== null) {
			letterSelection = normalizeWord(letter).toUpperCase();
		} else {
			letterSelection = null
		}

		subscriber.next(letterSelection);
	})
});
