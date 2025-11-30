import { BehaviorSubject } from "rxjs";
import { normalizeWord } from "./normalizeWord";
import type { SymbolSelectionRepository } from "../repositories/SymbolSelectionRepository";
import type { SymbolSelection } from "../entities/SymbolSelection";

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

