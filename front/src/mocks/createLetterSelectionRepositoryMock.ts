import { BehaviorSubject } from "rxjs";
import type { LetterSelectionRepository } from "../repositories/LetterSelectionRepository";

export const createLetterSelectionRepositoryMock = (): LetterSelectionRepository => {
	const letterSelectionSubject = new BehaviorSubject<string | null>(null);
	
	function clear(): void {
		letterSelectionSubject.next(null);
	}

	return {
		getLetterSelection: () => letterSelectionSubject.value,
		setLetterSelection: (letter: string | null) => {
			letterSelectionSubject.next(letter);
		},
		selectLetter: (letter: string | null) => {
			letterSelectionSubject.next(letter);
		},
		letterSelection$: letterSelectionSubject.asObservable(),
		clear
	};
};
