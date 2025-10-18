import type { Observable } from "rxjs";
import type { PlayerCipher } from "./PlayerCipher";

export interface PlayerCipherRepository {
	getPlayerCipher(): PlayerCipher;
	removePlayerCipherEntryByLetter(removed: string): void;
	removePlayerCipherEntryByValue(removed: string): void;
	addPlayerCipherEntry(letter: string, symbol: string): void;
	playerCipher$: Observable<PlayerCipher>;
}
