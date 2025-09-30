import type { Observable } from "rxjs";

export interface LetterSelection {
	getLetterSelection(): string | null;
	setLetterSelection(letter: string | null): void;
	letterSelection$: Observable<string | null>;
	selectLetter(letter: string | null): void;
}
