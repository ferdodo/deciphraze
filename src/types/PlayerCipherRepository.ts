import type { Observable } from "rxjs";

export interface PlayerCipherRepository {
	getPlayerCipher(): Map<string, string>;
	removePlayerCipherEntryByLetter(removed: string): void;
	removePlayerCipherEntryByValue(removed: string): void;
	addPlayerCipherEntry(letter: string, symbol: string): void;
	playerCipher$: Observable<Map<string, string>>;
}
