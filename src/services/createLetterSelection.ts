import { Subject, Observable } from "rxjs";
import { normalizeWord } from "../utils/normalizeWord";
import type { LetterSelection } from "../types/LetterSelection";

export function createLetterSelection(): LetterSelection {
	let letterSelection: string | null = null;

	function getLetterSelection(): string | null {
		return letterSelection;
	}

	function setLetterSelection(letter: string | null) {
		letterSelection = letter;
	}

	const selectLetter$ = new Subject<string | null>();

	function selectLetter(letter: string | null) {
		selectLetter$.next(letter);
	}

	const letterSelection$ = new Observable<string | null>((subscriber) => {
		selectLetter$.subscribe(() => {
			subscriber.next(getLetterSelection());
		});
	});

	// Subscribe to selectLetter$ to update the state
	selectLetter$.subscribe((letter) => {
		if (letter !== null) {
			setLetterSelection(normalizeWord(letter).toUpperCase());
		} else {
			setLetterSelection(null);
		}
	});

	return {
		getLetterSelection,
		setLetterSelection,
		letterSelection$,
		selectLetter,
	};
}
