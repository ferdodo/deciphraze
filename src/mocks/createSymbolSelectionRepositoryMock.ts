import { BehaviorSubject } from "rxjs";
import type { SymbolSelectionRepository } from "../types/SymbolSelectionRepository";

export const createSymbolSelectionRepositoryMock = (): SymbolSelectionRepository => {
	const symbolSelectionSubject = new BehaviorSubject<string | null>(null);
	
	return {
		getSymbolSelection: () => symbolSelectionSubject.value,
		selectSymbol: (symbol: string | null) => {
			symbolSelectionSubject.next(symbol);
		},
		symbolSelection$: symbolSelectionSubject.asObservable()
	};
};
