import { Subject, Observable } from "rxjs";
import { normalizeWord } from "./normalizeWord";
import type { SymbolSelection } from "./types/SymbolSelection";

export function createSymbolSelection(): SymbolSelection {
	let symbolSelection: string | null = null;

	function getSymbolSelection(): string | null {
		return symbolSelection;
	}

	const selectSymbol$ = new Subject<string | null>();

	function selectSymbol(sym: string | null) {
		selectSymbol$.next(sym);
	}

	const symbolSelection$ = new Observable<string | null>(function (subscriber) {
		selectSymbol$.subscribe(function (sym) {
			if (sym !== null) {
				symbolSelection = normalizeWord(sym).toUpperCase();
			} else {
				symbolSelection = null;
			}

			subscriber.next(symbolSelection);
		});
	});

	return {
		getSymbolSelection,
		selectSymbol,
		symbolSelection$,
	};
}
