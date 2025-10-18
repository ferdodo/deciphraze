import { BehaviorSubject } from "rxjs";
import type { LetterSelectionRepository } from "../types/LetterSelectionRepository";

export const createLetterSelectionRepositoryMock = (): LetterSelectionRepository => {
	const letterSelectionSubject = new BehaviorSubject<string | null>(null);
	
	return {
		getLetterSelection: () => letterSelectionSubject.value,
		setLetterSelection: (letter: string | null) => {
			letterSelectionSubject.next(letter);
		},
		selectLetter: (letter: string | null) => {
			letterSelectionSubject.next(letter);
		},
		letterSelection$: letterSelectionSubject.asObservable()
	};
};
