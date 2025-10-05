import { Observable } from "rxjs";
import type { PlayerCipher } from "../types/PlayerCipher";

export const createMatchCount$ = (playerCipher: PlayerCipher) => {
	return new Observable<number>((subscriber) => {
		playerCipher.playerCipher$.subscribe((playerCipherMap: Map<string, string>) => {
			const totalMatches = new Set();
			for (const [k, v] of playerCipherMap) {
				totalMatches.add(`${k}${v}`);
			}
			subscriber.next(totalMatches.size);
		});
	});
};
