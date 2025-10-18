import { BehaviorSubject } from "rxjs";
import type { PlayerCipherRepository } from "../types/PlayerCipherRepository";

export const createMatchCount$ = (playerCipher: PlayerCipherRepository): BehaviorSubject<number> => {
	const matchCountSubject = new BehaviorSubject<number>(0);
	
	// Calculate initial count
	const initialCipher = playerCipher.getPlayerCipher();
	matchCountSubject.next(Object.keys(initialCipher).length);
	
	// Subscribe to changes
	playerCipher.playerCipher$.subscribe((playerCipherMap: Record<string, string>) => {
		matchCountSubject.next(Object.keys(playerCipherMap).length);
	});
	
	return matchCountSubject;
};
