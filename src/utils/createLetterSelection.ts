import { Subject, Observable } from "rxjs";
import { normalizeWord } from "../utils/normalizeWord";
import type { LetterSelectionRepository } from "../types/LetterSelectionRepository";

export function createLetterSelection(): LetterSelectionRepository {
	const selectLetter$ = new Subject<string | null>();
	let currentSelection: string | null = null;

	function getLetterSelection(): string | null {
		return currentSelection;
	}

	function setLetterSelection(letter: string | null) {
		currentSelection = letter;
		selectLetter$.next(letter);
	}

	function selectLetter(letter: string | null) {
		if (letter !== null) {
			const normalizedLetter = normalizeWord(letter).toUpperCase();
			currentSelection = normalizedLetter;
			selectLetter$.next(normalizedLetter);
		} else {
			currentSelection = null;
			selectLetter$.next(null);
		}
	}

	const letterSelection$ = new Observable<string | null>((subscriber) => {
		selectLetter$.subscribe((letter) => {
			subscriber.next(letter);
		});
	});

	return {
		getLetterSelection,
		setLetterSelection,
		letterSelection$,
		selectLetter,
	};
}
