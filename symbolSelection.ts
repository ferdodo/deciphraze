import { Subject, Observable } from "rxjs";
import { normalizeWord } from "./normalizeWord";

let symbolSelection: string | null = null;

export function getSymbolSelection(): string | null {
	return symbolSelection;
}

export const selectSymbol$ = new Subject<string | null>();

export const symbolSelection$ = new Observable<string | null>(function(subscriber) {
	selectSymbol$.subscribe(function(sym) {

		if (sym !== null) {
			symbolSelection = normalizeWord(sym).toUpperCase();
		} else {
			symbolSelection = null;
		}

		subscriber.next(symbolSelection);
	})
});
