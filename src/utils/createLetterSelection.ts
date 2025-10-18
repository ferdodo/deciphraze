import { BehaviorSubject } from "rxjs";
import { normalizeWord } from "../utils/normalizeWord";
import type { LetterSelectionRepository } from "../types/LetterSelectionRepository";
import type { LetterSelection } from "../types/LetterSelection";
import { checkLetterSelection } from "./checkLetterSelection";

const LETTER_SELECTION_STORAGE_KEY = "deciphraze_letter_selection";

export function createLetterSelection(): LetterSelectionRepository {
	let currentSelection: LetterSelection;

	try {
		const stored: string = localStorage.getItem(LETTER_SELECTION_STORAGE_KEY) ?? "null";
		currentSelection = checkLetterSelection(JSON.parse(stored));
	} catch (_error) {
		currentSelection = null;
	}

	const letterSelectionSubject = new BehaviorSubject<LetterSelection>(currentSelection);

	function getLetterSelection(): LetterSelection {
		return currentSelection;
	}

	function setLetterSelection(letter: LetterSelection): void {
		currentSelection = letter;
		localStorage.setItem(LETTER_SELECTION_STORAGE_KEY, JSON.stringify(letter));
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
