import type { Observable } from "rxjs";
import type { LetterSelection } from "../entities/LetterSelection";

export interface LetterSelectionRepository {
	getLetterSelection(): LetterSelection;
	setLetterSelection(letter: LetterSelection): void;
	selectLetter(letter: string | null): void;
	letterSelection$: Observable<LetterSelection>;
	clear(): void;
}

