import { BehaviorSubject } from "rxjs";
import { characterEquals } from "../utils/characterEquals";
import type { PlayerCipherRepository } from "../repositories/PlayerCipherRepository";

export const createPlayerCipherRepositoryMock = (initialCipher: Record<string, string> = {}): PlayerCipherRepository & { playerCipherSubject: BehaviorSubject<Record<string, string>> } => {
	const playerCipherSubject = new BehaviorSubject<Record<string, string>>(initialCipher);
	
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
			// Supprimer l'association précédente du symbole s'il existe
			for (const [key, value] of Object.entries(currentCipher)) {
				if (characterEquals(value, symbol)) {
					delete currentCipher[key];
				}
			}
			// Ajouter la nouvelle association
			currentCipher[letter] = symbol;
			playerCipherSubject.next(currentCipher);
		},
		playerCipher$: playerCipherSubject.asObservable(),
		playerCipherSubject, // Expose the subject for testing
		clear: () => {
			playerCipherSubject.next({});
		}
	};
};
