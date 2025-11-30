import type { Observable } from "rxjs";
import type { SymbolSelection } from "../entities/SymbolSelection";

export interface SymbolSelectionRepository {
	getSymbolSelection(): SymbolSelection;
	selectSymbol(symbol: string | null): void;
	symbolSelection$: Observable<SymbolSelection>;
}

