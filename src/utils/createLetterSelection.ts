import { BehaviorSubject } from "rxjs";
import { normalizeWord } from "../utils/normalizeWord";
import type { LetterSelectionRepository } from "../types/LetterSelectionRepository";
import type { LetterSelection } from "../types/LetterSelection";

export function createLetterSelection(): LetterSelectionRepository {
	let currentSelection: LetterSelection = null;

	const letterSelectionSubject = new BehaviorSubject<LetterSelection>(currentSelection);

	function getLetterSelection(): LetterSelection {
		return currentSelection;
	}

	function setLetterSelection(letter: LetterSelection): void {
		currentSelection = letter;
		letterSelectionSubject.next(letter);
	}

	function selectLetter(letter: string | null): void {
		if (letter !== null) {
			const normalizedLetter = normalizeWord(letter).toUpperCase();
			setLetterSelection(normalizedLetter);
		} else {
			setLetterSelection(null);
		}
	}

	return {
		getLetterSelection,
		setLetterSelection,
		letterSelection$: letterSelectionSubject.asObservable(),
		selectLetter,
	};
}
