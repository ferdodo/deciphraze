import { BehaviorSubject } from "rxjs";
import { normalizeWord } from "../utils/normalizeWord";
import type { SymbolSelectionRepository } from "../types/SymbolSelectionRepository";
import type { SymbolSelection } from "../types/SymbolSelection";
import { checkSymbolSelection } from "./checkSymbolSelection";

const SYMBOL_SELECTION_STORAGE_KEY = "deciphraze_symbol_selection";

export function createSymbolSelection(): SymbolSelectionRepository {
	let currentSelection: SymbolSelection;

	try {
		const stored: string = localStorage.getItem(SYMBOL_SELECTION_STORAGE_KEY) ?? "null";
		currentSelection = checkSymbolSelection(JSON.parse(stored));
	} catch (_error) {
		currentSelection = null;
	}

	const symbolSelectionSubject = new BehaviorSubject<SymbolSelection>(currentSelection);

	function getSymbolSelection(): SymbolSelection {
		return currentSelection;
	}

	function selectSymbol(sym: string | null): void {
		if (sym !== null && sym !== "") {
			const normalizedSymbol = normalizeWord(sym).toUpperCase();
			currentSelection = normalizedSymbol;
			localStorage.setItem(SYMBOL_SELECTION_STORAGE_KEY, JSON.stringify(normalizedSymbol));
			symbolSelectionSubject.next(normalizedSymbol);
		} else {
			currentSelection = null;
			localStorage.setItem(SYMBOL_SELECTION_STORAGE_KEY, JSON.stringify(null));
			symbolSelectionSubject.next(null);
		}
	}

	return {
		getSymbolSelection,
		selectSymbol,
		symbolSelection$: symbolSelectionSubject.asObservable(),
	};
}
