import { BehaviorSubject } from "rxjs";
import { normalizeWord } from "../utils/normalizeWord";
import type { SymbolSelectionRepository } from "../types/SymbolSelectionRepository";
import type { SymbolSelection } from "../types/SymbolSelection";

export function createSymbolSelection(): SymbolSelectionRepository {
	let currentSelection: SymbolSelection = null;

	const symbolSelectionSubject = new BehaviorSubject<SymbolSelection>(currentSelection);

	function getSymbolSelection(): SymbolSelection {
		return currentSelection;
	}

	function selectSymbol(sym: string | null): void {
		if (sym !== null && sym !== "") {
			const normalizedSymbol = normalizeWord(sym).toUpperCase();
			currentSelection = normalizedSymbol;
			symbolSelectionSubject.next(normalizedSymbol);
		} else {
			currentSelection = null;
			symbolSelectionSubject.next(null);
		}
	}

	return {
		getSymbolSelection,
		selectSymbol,
		symbolSelection$: symbolSelectionSubject.asObservable(),
	};
}
