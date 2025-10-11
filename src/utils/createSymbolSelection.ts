import { Subject, Observable } from "rxjs";
import { normalizeWord } from "../utils/normalizeWord";
import type { SymbolSelectionRepository } from "../types/SymbolSelectionRepository";

export function createSymbolSelection(): SymbolSelectionRepository {
	const selectSymbol$ = new Subject<string | null>();
	let currentSelection: string | null = null;

	function getSymbolSelection(): string | null {
		return currentSelection;
	}

	function selectSymbol(sym: string | null) {
		if (sym !== null) {
			const normalizedSymbol = normalizeWord(sym).toUpperCase();
			currentSelection = normalizedSymbol;
			selectSymbol$.next(normalizedSymbol);
		} else {
			currentSelection = null;
			selectSymbol$.next(null);
		}
	}

	const symbolSelection$ = new Observable<string | null>((subscriber) => {
		selectSymbol$.subscribe((sym) => {
			subscriber.next(sym);
		});
	});

	return {
		getSymbolSelection,
		selectSymbol,
		symbolSelection$,
	};
}
