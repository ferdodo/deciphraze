import type { Observable } from "rxjs";

export interface SymbolSelectionRepository {
	getSymbolSelection(): string | null;
	selectSymbol(sym: string | null): void;
	symbolSelection$: Observable<string | null>;
}
