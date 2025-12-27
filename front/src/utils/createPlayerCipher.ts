import { BehaviorSubject } from "rxjs";
import { share } from "rxjs/operators";
import { characterEquals } from "./characterEquals";
import type { PlayerCipherRepository } from "../repositories/PlayerCipherRepository";
import type { PlayerCipher } from "../entities/PlayerCipher";


export function createPlayerCipher(): PlayerCipherRepository {
	const playerCipher: PlayerCipher = {};

	const playerCipherSubject = new BehaviorSubject<PlayerCipher>({ ...playerCipher });

	function getPlayerCipher(): PlayerCipher {
		return { ...playerCipher };
	}

	const removePlayerCipherEntryByLetter = (removed: string): void => {
		delete playerCipher[removed];
		playerCipherSubject.next({ ...playerCipher });
	};

	const removePlayerCipherEntryByValue = (removed: string): void => {
		for (const [key, value] of Object.entries(playerCipher)) {
			if (characterEquals(value, removed)) {
				delete playerCipher[key];
			}
		}
		playerCipherSubject.next({ ...playerCipher });
	};

	const addPlayerCipherEntry = (letter: string, symbol: string): void => {
		// Supprimer l'association précédente du symbole s'il existe
		for (const [key, value] of Object.entries(playerCipher)) {
			if (characterEquals(value, symbol)) {
				delete playerCipher[key];
			}
		}
		// Ajouter la nouvelle association
		playerCipher[letter] = symbol;
		playerCipherSubject.next({ ...playerCipher });
	};

	return {
		getPlayerCipher,
		removePlayerCipherEntryByLetter,
		removePlayerCipherEntryByValue,
		addPlayerCipherEntry,
		playerCipher$: playerCipherSubject.asObservable().pipe(share()),
	};
}

