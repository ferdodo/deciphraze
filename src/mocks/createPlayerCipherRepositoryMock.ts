import { BehaviorSubject } from "rxjs";
import type { PlayerCipherRepository } from "../types/PlayerCipherRepository";

export const createPlayerCipherRepositoryMock = (): PlayerCipherRepository => {
	const playerCipherSubject = new BehaviorSubject<Record<string, string>>({});
	
	return {
		getPlayerCipher: () => playerCipherSubject.value,
		removePlayerCipherEntryByLetter: (letter: string) => {
			const currentCipher = { ...playerCipherSubject.value };
			delete currentCipher[letter];
			playerCipherSubject.next(currentCipher);
		},
		removePlayerCipherEntryByValue: (value: string) => {
			const currentCipher = { ...playerCipherSubject.value };
			for (const [key, val] of Object.entries(currentCipher)) {
				if (val === value) {
					delete currentCipher[key];
					break;
				}
			}
			playerCipherSubject.next(currentCipher);
		},
		addPlayerCipherEntry: (letter: string, symbol: string) => {
			const currentCipher = { ...playerCipherSubject.value };
			currentCipher[letter] = symbol;
			playerCipherSubject.next(currentCipher);
		},
		playerCipher$: playerCipherSubject.asObservable()
	};
};
