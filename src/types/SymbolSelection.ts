import { Observable } from "rxjs";

export interface SymbolSelection {
	getSymbolSelection(): string | null;
	selectSymbol(sym: string | null): void;
	symbolSelection$: Observable<string | null>;
}
