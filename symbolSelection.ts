import { Subject, Observable } from "rxjs";
import { normalizeWord } from "./normalizeWord";

let symbolSelection: string | null = null;

export function getSymbolSelection(): string | null {
	return symbolSelection;
}

const selectSymbol$ = new Subject<string | null>();

export function selectSymbol(sym: string | null) {
	selectSymbol$.next(sym);
}

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
