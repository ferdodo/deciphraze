import { Observable } from "rxjs";

export interface PlayerCipher {
	getPlayerCipher(): Map<string, string>;
	removePlayerCipherEntryByLetter(removed: string): void;
	removePlayerCipherEntryByValue(removed: string): void;
	playerCipher$: Observable<Map<string, string>>;
}
